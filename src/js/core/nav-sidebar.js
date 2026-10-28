// ================= NAVIGATIE =================
function navIcon(id){const [st]=status(id);return st==='good'?ICON.check:st==='lock'?ICON.lock:ring(mastery(id),16)}
function buildNav(){
  const h=(location.hash||'').slice(1)||'start';const sm=/^([a-z]+)-(uitleg|formules|oefenen|praktijk)$/.exec(h);const curId=sm?sm[1]:MOD[h]?h:null;
  const curSub=curId?subjectOf(curId).id:subjectOf(currentMod().id).id;
  const due=dueItems().length;
  $('#navlist').innerHTML=`
  <a href="#start" data-r="start" class="navi top"><span class="nv-ic">${ICON.grid}</span><span class="nv-name">Home</span></a>
  <a href="#herhalen" data-r="herhalen" class="navi top"><span class="nv-ic">${ICON.redo}</span><span class="nv-name">Herhalen</span><span class="nv-count">${due||''}</span></a>
  <div class="navlabel">Vakken</div>
  ${SUBJECTS.map(S=>{const open=PREF.groups[S.id]!==undefined?PREF.groups[S.id]:S.id===curSub;const done=S.mods.filter(id=>modDone(id)).length;
    return `<div class="ngroup${open?' open':''}"><button class="ng-h" data-g="${S.id}" aria-expanded="${open}"><span class="ng-chev">${ICON.chev}</span><span class="ng-name">${S.name}</span><span class="ng-c">${done}/${S.mods.length}</span></button>
    <div class="ng-list">${S.cats.map((C,ci)=>{const ck=S.id+'|'+C.name;const cOpen=PREF.groups[ck]!==undefined?PREF.groups[ck]:(curId?C.mods.includes(curId):S.id===curSub&&C.mods.includes(currentMod().id));const cd=C.mods.filter(id=>modDone(id)).length;return `<div class="ncat${cOpen?' open':''}"><button class="nc-h" data-c="${esc(ck)}" aria-expanded="${cOpen}"><span class="ng-chev">${ICON.chev}</span><span class="nc-name">${C.name}</span><span class="ng-c">${cd}/${C.mods.length}</span></button><div class="nc-list">${C.mods.map(id=>{const m=MOD[id];const act=id===curId;return `<a href="#${id}" data-r="${id}" class="navi ch${act?' active':''}"><span class="nv-ic" data-st="${status(id)[0]}">${navIcon(id)}</span><span class="nv-name"><span class="nv-code">${m.code.slice(2)}</span>${m.name}</span></a>${act?`<div class="ch-pages">${[['', 'Overzicht'],...tabsFor(m)].map(([k,t])=>{const href=k?`#${id}-${k}`:`#${id}`;const on=k?(sm&&sm[2]===k):!sm;return `<a href="${href}" class="chp${on?' on':''}">${t}</a>`}).join('')}</div>`:''}`}).join('')}</div></div>`}).join('')}</div></div>`}).join('')}
  <div class="navlabel">Toetsen</div>
  <a href="#instaptoets" data-r="instaptoets" class="navi"><span class="nv-ic">${ICON.star}</span><span class="nv-name">Instaptoets</span></a>
  <a href="#oefentoets" data-r="oefentoets" class="navi"><span class="nv-ic">${ICON.clock}</span><span class="nv-name">Oefentoets</span></a>
  <div class="navlabel">Naslag</div>
  <a href="#formules" data-r="formules" class="navi"><span class="nv-ic">${ICON.fx}</span><span class="nv-name">Formuleblad</span></a>
  <a href="#begrippen" data-r="begrippen" class="navi"><span class="nv-ic">${ICON.doc}</span><span class="nv-name">Begrippenlijst</span></a>
  <a href="#fouten" data-r="fouten" class="navi"><span class="nv-ic">${ICON.x}</span><span class="nv-name">Fouten</span><span class="nv-count">${DB.errors.length||''}</span></a>
  <a href="#methode" data-r="methode" class="navi"><span class="nv-ic">${ICON.doc}</span><span class="nv-name">Zo leer je hier</span></a>`;
  $$('.nc-h').forEach(b=>b.onclick=()=>{const g=b.closest('.ncat');const o=!g.classList.contains('open');g.classList.toggle('open',o);b.setAttribute('aria-expanded',o);PREF.groups[b.dataset.c]=o;savePref()});
  $$('.ng-h').forEach(b=>b.onclick=()=>{const g=b.closest('.ngroup');const o=!g.classList.contains('open');g.classList.toggle('open',o);b.setAttribute('aria-expanded',o);PREF.groups[b.dataset.g]=o;savePref()});
  const key=sm?sm[1]:(MOD[h]||['herhalen','instaptoets','oefentoets','fouten','formules','begrippen','methode','account'].includes(h))?h:'start';
  $$('.navi').forEach(a=>a.classList.toggle('active',a.dataset.r===key));
}
function refreshNav(){
  MODS.forEach(m=>{const el=$(`.navi[data-r="${m.id}"] .nv-ic`);if(!el)return;el.dataset.st=status(m.id)[0];el.innerHTML=navIcon(m.id)});
  const bc=$('#bellCount');if(bc)bc.textContent=DB.errors.length?String(DB.errors.length):'';
  const nc=$('.navi[data-r="herhalen"] .nv-count');if(nc)nc.textContent=dueItems().length||'';
  const fc=$('.navi[data-r="fouten"] .nv-count');if(fc)fc.textContent=DB.errors.length||'';
}
function renderRail(){}
function setCrumbs(parts){$('#crumbs').innerHTML=parts.map((p,i)=>i<parts.length-1?`<a href="${p[1]}">${p[0]}</a><span class="sep">/</span>`:`<span class="cur">${p[0]}</span>`).join('')}
let timerH=null;function stopTimer(){clearInterval(timerH);timerH=null}
function route(){
  const ag=$('#authGate');if(ag&&!ag.hidden)return;
  const h=(location.hash||'').slice(1)||'start';document.body.classList.remove('nav-open');$('#menuBtn').setAttribute('aria-expanded','false');stopTimer();toggleTheme(false);
  const main=$('#main');const sm=/^([a-z]+)-(uitleg|formules|oefenen|praktijk)$/.exec(h);
  if(sm&&MOD[sm[1]]){const m=MOD[sm[1]];const tb=tabsFor(m).find(x=>x[0]===sm[2]);if(!tb){location.replace('#'+m.id);return}setCrumbs([[subjectOf(m.id).name,'#'+m.id],[catOf(m.id).name,'#'+m.id],[`${m.code} · ${m.name}`,`#${m.id}`],[tb[1]]]);viewModuleSub(main,m,sm[2])}
  else if(MOD[h]){setCrumbs([[subjectOf(h).name,'#'+h],[catOf(h).name,'#'+h],[`${MOD[h].code} · ${MOD[h].name}`]]);viewModule(main,MOD[h])}
  else if(h==='herhalen'){setCrumbs([['Bouwwiskunde','#start'],['Herhalen']]);viewReview(main)}
  else if(h==='methode'){setCrumbs([['Naslag','#start'],['Zo leer je hier']]);viewMethod(main)}
  else if(h==='instaptoets'){setCrumbs([['Toetsen','#start'],['Instaptoets']]);viewTestIntro(main,'intake')}
  else if(h==='oefentoets'){setCrumbs([['Toetsen','#start'],['Oefentoets']]);viewTestIntro(main,'practice')}
  else if(h==='fouten'){setCrumbs([['Naslag','#start'],['Fouten herhalen']]);viewErrors(main)}
  else if(h==='formules'){setCrumbs([['Naslag','#start'],['Formuleblad']]);viewFormulas(main)}
  else if(h==='account'){setCrumbs([['Account','#account'],['Mijn profiel']]);viewAccount(main)}
  else if(h==='begrippen'){setCrumbs([['Naslag','#start'],['Begrippenlijst']]);viewTerms(main)}
  else{setCrumbs([['Bouwwiskunde','#start'],['Home']]);viewHome(main)}
  buildNav();renderAcctChip();window.scrollTo(0,0);
}

