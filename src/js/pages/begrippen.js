// ================= BEGRIPPEN =================
const termSubs=m=>m.terms?Object.keys(TERMS[m.terms]||{}):[];
const termCount=m=>termSubs(m).reduce((a,k)=>a+TERMS[m.terms][k].length,0);
const allTerms=()=>MODS.filter(m=>m.terms).flatMap(m=>termSubs(m).flatMap(k=>TERMS[m.terms][k].map((e,i,arr)=>tObj(e,m,k,arr))));
const TMODE={};
const slug=t=>t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function tObj(e,m,k,arr){const i=arr.indexOf(e);const rel=[1,2,-1].map(o=>arr[(i+o+arr.length)%arr.length]).filter(r=>r!==e).map(r=>r[0]);return {t:e[0],d:e[1],x:e[2],v:e[3],lo:e[4],m,sub:TERMSUB[k]||k,rel:[...new Set(rel)]}}
function termCard(x,showMod){const fk=typeof TFIG!=='undefined'&&TFIG[x.t];const more=x.lo||fk||(x.rel&&x.rel.length);
  return `<div class="tcard" id="term-${slug(x.t)}" data-s="${esc((x.t+' '+x.d+' '+(x.x||'')+' '+(x.v||'')+' '+x.m.name+' '+x.sub).toLowerCase())}"><b>${x.t}</b><span>${x.d}</span>
  ${x.x?`<p class="tc-x"><i>In de praktijk</i>${x.x}</p>`:''}${x.v?`<p class="tc-x tc-v"><i>Voorbeeld</i>${x.v}</p>`:''}
  ${more?`<details class="tc-more"><summary>${[x.lo?'let op':'',fk?'tekening':'',x.rel&&x.rel.length?'verwante begrippen':''].filter(Boolean).join(' · ')}</summary>
  ${x.lo?`<p class="tc-x tc-lo"><i>Let op</i>${x.lo}</p>`:''}${fk?BF[fk]:''}
  ${x.rel&&x.rel.length?`<div class="tc-rel"><i>Zie ook</i>${x.rel.map(r=>`<button class="relbtn" data-goto="${slug(r)}" data-term="${esc(r)}">${esc(r)}</button>`).join('')}</div>`:''}</details>`:''}
  ${showMod?`<a class="tc-m" href="#${x.m.id}">${x.m.code} · ${x.sub}</a>`:''}</div>`}
function bindRel(root){$$('.relbtn',root).forEach(b=>b.onclick=()=>{const el=document.getElementById('term-'+b.dataset.goto);if(el&&el.offsetParent!==null){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1600)}else{TSEARCH=b.dataset.term;TFILT='';location.hash='#begrippen';if(location.hash==='#begrippen')viewTerms($('#main'))}})}
function renderTermTab(m){
  const tb=$('#tabbody');const mode=TMODE[m.id]||'lijst';const F=FORMULAS[m.id]||[];
  tb.innerHTML=`<div class="fmode"><div class="seg" role="group" aria-label="Weergave">${[['lijst','Begrippen'],['overhoren','Overhoren'],...(F.length?[['normen','Formules en normen']]:[])].map(([k,t])=>`<button class="segbtn${mode===k?' on':''}" data-tm="${k}">${t}</button>`).join('')}</div><span class="muted small">${mode==='overhoren'?'Je ziet het begrip. Geef eerst zelf de omschrijving, dan pas omdraaien.':'Lees de begrippen één keer rustig door. Daarna leer je meer van overhoren en oefenen.'}</span></div><div id="fhost"></div>`;
  $$('[data-tm]',tb).forEach(b=>b.onclick=()=>{TMODE[m.id]=b.dataset.tm;renderTermTab(m)});
  const host=$('#fhost');
  if(mode==='overhoren'){const list=termSubs(m).flatMap(k=>TERMS[m.terms][k].map((e,i,arr)=>tObj(e,m,k,arr)));quizTerms(host,list,()=>{TMODE[m.id]='lijst';renderTermTab(m)});return}
  if(mode==='normen'){host.innerHTML=`${[1,2,3].map(l=>{const cs=F.filter(c=>c.l===l);if(!cs.length)return '';return `<section class="flevel"><div class="fl-head"><span class="sp-n">${l}</span><h2>${LVL[l]}</h2></div><div class="fcards">${cs.map(fcardFull).join('')}</div></section>`}).join('')}`;return}
  host.innerHTML=termSubs(m).map(k=>`<section class="tsec"><h2>${TERMSUB[k]||k} <span class="muted small">${TERMS[m.terms][k].length} begrippen</span></h2><div class="tcards">${TERMS[m.terms][k].map((e,i,arr)=>termCard(tObj(e,m,k,arr))).join('')}</div></section>`).join('');bindRel(host);
}
function quizTerms(host,list,onExit){
  let i=0,know=0;const L=shuffle(list).slice(0,30);const rev=[];
  const draw=()=>{
    if(i>=L.length){host.innerHTML=`<div class="finished"><span class="fin-ic">${ICON.check}</span><h2>Ronde klaar</h2><p>${know} van ${L.length} wist je meteen.</p>${rev.length?`<div class="tcards left">${rev.map(x=>termCard(x)).join('')}</div><p class="muted small">Deze begrippen komen in de volgende ronde als eerste terug.</p>`:''}<div class="lk-acts"><button class="btn primary" id="tqAgain">Nog een ronde</button><button class="btn ghost" id="tqExit">Stoppen</button></div></div>`;
      $('#tqAgain').onclick=()=>{const miss=rev.slice();i=0;know=0;rev.length=0;L.splice(0,L.length,...miss,...shuffle(list.filter(x=>!miss.includes(x))).slice(0,Math.max(0,30-miss.length)));draw()};$('#tqExit').onclick=onExit;return}
    const x=L[i];
    host.innerHTML=`<article class="fquiz"><div class="fq-top"><span class="fc-code">${x.m.code} ${x.m.name} · ${x.sub}</span><span class="muted small" style="margin-left:auto">kaart ${i+1} van ${L.length}</span></div>
    <div class="th-bar"><i style="width:${i/L.length*100}%"></i></div><h2>${x.t}</h2>
    <div class="fq-hidden" id="fqH"><p>Wat betekent dit? Zeg het hardop of schrijf het op.</p><button class="btn primary" id="fqShow">Toon omschrijving</button></div>
    <div id="fqA" class="fq-ans" hidden><p class="tq-d">${x.d}</p>${x.x?`<p class="tc-x"><i>In de praktijk</i>${x.x}</p>`:''}${x.v?`<p class="tc-x tc-v"><i>Voorbeeld</i>${x.v}</p>`:''}<p class="muted small">Wist je het?</p><div class="fq-acts"><button class="btn ghost" data-k="0">Nog niet</button><button class="btn primary" data-k="1">Ja, wist ik</button></div></div>
    <button class="link" id="fqStop">Stoppen</button></article>`;
    $('#fqShow').onclick=()=>{$('#fqH').hidden=true;$('#fqA').hidden=false};
    $$('[data-k]',host).forEach(b=>b.onclick=()=>{if(+b.dataset.k)know++;else rev.push(x);i++;draw()});
    $('#fqStop').onclick=onExit;
  };draw();
}
let TSEARCH='',TFILT='';
function viewTerms(el){
  const all=allTerms();const mods=MODS.filter(m=>m.terms);
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Naslag</p><h1>Begrippenlijst</h1><p class="lede">Alle ${all.length} bouwkundige begrippen uit het vak Bouwkunde, per hoofdstuk. Zoek een woord dat je op een tekening of in een les tegenkomt, of overhoor jezelf.</p></header>
  <div class="fbar"><div class="searchrow"><label class="sr" for="tsearch2">Zoek een begrip</label><input id="tsearch2" type="search" placeholder="Zoek, bijv. latei, spouw of Wkb" autocomplete="off" value="${esc(TSEARCH)}"></div>
  <label class="sr" for="tfilt">Hoofdstuk</label><select id="tfilt" class="sel"><option value="">Alle hoofdstukken</option>${mods.map(m=>`<option value="${m.id}" ${TFILT===m.id?'selected':''}>${m.code} ${m.name}</option>`).join('')}</select>
  <button class="btn primary sm" id="tquiz">Overhoor deze begrippen</button></div>
  <div id="tlist">${mods.map(m=>`<section class="tsec" data-m="${m.id}"><h2><span class="code">${m.code}</span> ${m.name}</h2><div class="tcards">${termSubs(m).flatMap(k=>TERMS[m.terms][k].map((e,i,arr)=>termCard(tObj(e,m,k,arr),true))).join('')}</div></section>`).join('')}</div>
  <p class="empty-search muted" hidden>Geen begrippen gevonden.</p>`;
  const inp=$('#tsearch2'),sel=$('#tfilt');
  const filt=()=>{const t=inp.value.trim().toLowerCase();TSEARCH=inp.value;TFILT=sel.value;let any=false;
    $$('.tsec',el).forEach(sc=>{let vis=0;if(TFILT&&sc.dataset.m!==TFILT){sc.hidden=true;return}$$('.tcard',sc).forEach(c=>{const sh=!t||c.dataset.s.includes(t);c.hidden=!sh;if(sh)vis++});sc.hidden=!vis;if(vis)any=true});$('.empty-search',el).hidden=any};
  inp.oninput=filt;sel.onchange=filt;filt();bindRel(el);
  $('#tquiz').onclick=()=>{const t=inp.value.trim().toLowerCase();const list=all.filter(x=>(!TFILT||x.m.id===TFILT)&&(!t||(x.t+' '+x.d+' '+x.m.name+' '+x.sub).toLowerCase().includes(t)));if(!list.length)return;$('.fbar',el).hidden=true;quizTerms($('#tlist'),list,()=>viewTerms(el))};
}
