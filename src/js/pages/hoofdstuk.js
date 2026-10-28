// ================= HOOFDSTUK =================
const modTab={};const PS={};
function lockedView(el,m,after){const prev=MOD[m.prev];
  el.innerHTML=`<div class="locked"><div class="lk-body"><span class="lk-ic">${ICON.lock}</span><p class="eyebrow">${m.code} · ${subjectOf(m.id).name} · ${catOf(m.id).name}</p><h1>${m.name}</h1>
  <p class="lede">Dit hoofdstuk gaat open als je het <b>basisniveau</b> van ${prev.code} ${prev.name} hebt afgerond. Het bouwt daarop voort.</p>
  <div class="lk-acts"><a class="btn primary" href="#${prev.id}-oefenen">Naar ${prev.code} ${prev.name}</a><button class="btn ghost" id="forceOpen">Toch openen</button></div></div></div>`;
  $('#forceOpen').onclick=()=>{DB.open[m.id]=1;saveDB();buildNav();after()}}
function viewModule(el,m){
  if(!unlocked(m.id))return lockedView(el,m,()=>viewModule(el,m));
  const p=prog(m.id),steps=pathSteps(m),cur=steps[p.i],st=DB.mods[m.id]||{n:0,c:0},[cs,ct]=status(m.id);
  const rows=[
    ['uitleg','Lees de uitleg',`${m.theory.length} korte lessen met voorbeelden en valkuilen. Eén keer goed lezen is genoeg; daarna leer je vooral door te oefenen.`],
    m.terms?['formules','Ken de begrippen',`${termCount(m)} begrippen${(FORMULAS[m.id]||[]).length?` en ${(FORMULAS[m.id]||[]).length} formules en normen`:''}. Overhoor jezelf: eerst zelf de omschrijving geven, dan pas omdraaien.`]:['formules','Ken de formules',`${(FORMULAS[m.id]||[]).length} formules per niveau, met betekenis van elke letter. Overhoor jezelf in plaats van teruglezen.`],
    ['oefenen','Oefen tot je het beheerst',cur?`Je bent bij stap ${p.i+1} van ${steps.length}: ${cur.s.name} op niveau ${cur.l}.`:'Alle stappen zijn afgerond. Herhaal ze via de pagina Herhalen.'],
    ['praktijk','Pas het toe in de praktijk',`${(CASES[m.id]||[]).length} opdrachten uit de bouwpraktijk met meerdere deelvragen. Het beste als je niveau 2 hebt gehaald.`]].filter(r=>tabsFor(m).some(t=>t[0]===r[0]));
  el.innerHTML=`<header class="page-head"><p class="eyebrow">${subjectOf(m.id).name} · ${catOf(m.id).name} · ${m.code}</p><div class="mh-title"><h1>${m.name}</h1><span class="pill ${cs}">${ct}</span></div><p class="lede">${m.blurb}</p>
  <p class="statline">${mastery(m.id)}% afgerond · stap ${Math.min(p.i,steps.length)} van ${steps.length} · ${N(st.n)} opgaven gemaakt${st.n?` · ${Math.round(st.c/st.n*100)}% in één keer goed`:''}</p></header>
  <ol class="route4">${rows.map(([k,t,d],i)=>`<li><a href="#${m.id}-${k}"><span class="r4-n">${i+1}</span><span class="r4-b"><b>${t}</b><span>${d}</span></span><span class="r4-go">${ICON.arrow}</span></a></li>`).join('')}</ol>
  ${goalsBox(m)}`;
}
function viewModuleSub(el,m,tab){
  if(!unlocked(m.id))return lockedView(el,m,()=>viewModuleSub(el,m,tab));
  const TB=tabsFor(m);const T=TB.find(x=>x[0]===tab)[1];
  el.innerHTML=`<header class="subhead"><div class="sh-row"><a class="back" href="#${m.id}">${ICON.arrow}<span>${m.code} · ${m.name}</span></a><span id="subProg" class="subprog"></span></div>
  <div class="sh-row"><h1>${T}</h1><nav class="tabs" aria-label="Onderdelen van ${m.name}">${TB.map(([k,t])=>`<a class="tab${k===tab?' on':''}" href="#${m.id}-${k}" ${k===tab?'aria-current="page"':''}>${t}</a>`).join('')}</nav></div></header>
  <div id="tabbody"></div>`;
  modTab[m.id]=tab;updateModStats(m);renderTab(m);
}
function updateModStats(m){
  const p=prog(m.id),tot=pathSteps(m).length;
  const sp=$('#subProg');if(sp)sp.innerHTML=`<span class="sp-mini">${ring(mastery(m.id),18)}${mastery(m.id)}% · stap ${Math.min(p.i+1,tot)} van ${tot}</span>`;
}
function goalsBox(m){return `<section class="goals"><h2>Wat leer je in dit hoofdstuk?</h2><div class="goals-grid">${[1,2,3].map(l=>`<div class="goal l${l}"><div class="goal-h"><span class="sp-n">${l}</span>${LVL[l]}</div><ul>${(m.goals[l-1]||[]).map(g=>`<li>${g}</li>`).join('')}</ul></div>`).join('')}</div></section>`}
function symTable(s){return s.length?`<div class="tblwrap"><table class="symtab"><thead><tr><th>Symbool</th><th>Betekenis</th><th>Eenheid</th></tr></thead><tbody>${s.map(r=>`<tr><td class="sym">${r[0]}</td><td>${r[1]}</td><td>${r[2]||'–'}</td></tr>`).join('')}</tbody></table></div>`:''}
const GENSTEPS=['Schrijf de formule op en zet erbij wat elke letter betekent.','Zet alle gegevens in de juiste eenheden (vaak m, kN of mm).','Vul de getallen in en reken uit in de goede volgorde.','Zet de eenheid achter je antwoord en controleer met een schatting.'];
function fxBody(c){const x=c.x||{};const st=(x.st&&x.st.length)?x.st:GENSTEPS;const pv=c.p||x.p;
  return `${x.u?`<p class="fx-u">${x.u}</p>`:''}${symTable(c.s)}${c.w?`<p class="fc-w"><b>Wanneer gebruik je dit?</b> ${c.w}</p>`:''}
  <div class="fx-sec"><div class="fx-h">Zo pak je het aan</div><ol class="fx-steps">${st.map(t=>`<li>${t}</li>`).join('')}</ol></div>
  ${x.om?`<div class="fx-sec"><div class="fx-h">Omgeschreven</div><div class="fx-om">${x.om}</div></div>`:''}
  ${c.e?`<div class="example"><div class="ex-label">Voorbeeld</div><p>${c.e}</p></div>`:''}
  ${x.ex&&x.ex.length?`<div class="fx-sec fx-ex"><div class="fx-h">Stap voor stap</div><ol class="fx-steps">${x.ex.map(t=>`<li>${t}</li>`).join('')}</ol></div>`:''}
  ${pv?pit(pv):''}`}
function fcardFull(c){return `<article class="fcard"><header><span class="fc-l l${c.l}">${LVL[c.l]}</span><h3>${c.n}</h3></header><div class="fc-f">${c.f}</div>${fxBody(c)}</article>`}
function renderTab(m){
  const tb=$('#tabbody');const tab=modTab[m.id];
  if(tab==='uitleg'){
    tb.innerHTML=`${goalsBox(m)}<div class="lessons">${m.theory.map((t,i)=>`<article class="lesson"><header><span class="ls-n">${i+1}</span><h2>${t.t}</h2></header><div class="ls-body">${t.h}</div></article>`).join('')}</div>
    <div class="endcta"><button class="btn ghost lg" id="toForm">Bekijk de formules</button><button class="btn primary lg" id="toPractice">Start met oefenen ${ICON.arrow}</button></div>`;
    $('#toPractice').onclick=()=>switchTab(m,'oefenen');$('#toForm').onclick=()=>switchTab(m,'formules');
  }else if(tab==='formules'&&m.terms){renderTermTab(m)
  }else if(tab==='formules'){
    const F=FORMULAS[m.id]||[];const mode=FMODE[m.id]||'kaarten';
    tb.innerHTML=`<div class="fmode"><div class="seg" role="group" aria-label="Weergave">${[['kaarten','Kaarten'],['overhoren','Overhoren']].map(([k,t])=>`<button class="segbtn${mode===k?' on':''}" data-fm="${k}">${t}</button>`).join('')}</div><span class="muted small">${mode==='kaarten'?'Lees een kaart één keer goed. Daarna leer je meer van overhoren.':'De formule is verborgen. Noem hem eerst zelf, dan pas omdraaien.'}</span></div><div id="fhost"></div>`;
    $$('[data-fm]',tb).forEach(b=>b.onclick=()=>{FMODE[m.id]=b.dataset.fm;renderTab(m)});
    if(mode==='overhoren'){quizFormulas($('#fhost'),F.map(c=>({c,m})),()=>{FMODE[m.id]='kaarten';renderTab(m)});return}
    $('#fhost').innerHTML=`${[1,2,3].map(l=>{const cs=F.filter(c=>c.l===l);if(!cs.length)return '';return `<section class="flevel" data-l="${l}"><div class="fl-head"><span class="sp-n">${l}</span><h2>${LVL[l]}</h2><span class="muted small">${l===1?'Dit moet je kennen voordat je verder gaat':l===2?'Bouwt voort op niveau 1':'Wat je aan het begin van het HBO tegenkomt'}</span></div><div class="fcards">${cs.map(fcardFull).join('')}</div></section>`}).join('')}`;
  }else if(tab==='praktijk')renderCases(m);
  else renderPractice(m);
}
const FMODE={};
function quizFormulas(host,list,onExit){
  let i=0,know=0;const L=shuffle(list);
  const draw=()=>{
    if(i>=L.length){host.innerHTML=`<div class="finished"><span class="fin-ic">${ICON.check}</span><h2>Alle kaarten gehad</h2><p>${know} van ${L.length} wist je meteen. ${know<L.length?'Overhoor de rest morgen nog een keer: na een nacht slapen blijft het beter hangen.':'Sterk. Probeer het over een paar dagen opnieuw.'}</p><div class="lk-acts"><button class="btn primary" id="fqAgain">Nog een ronde</button><button class="btn ghost" id="fqExit">Terug naar de kaarten</button></div></div>`;
      $('#fqAgain').onclick=()=>{i=0;know=0;draw()};$('#fqExit').onclick=onExit;return}
    const {c,m}=L[i];
    host.innerHTML=`<article class="fquiz"><div class="fq-top"><span class="fc-l l${c.l}">${LVL[c.l]}</span><span class="fc-code">${m.code} ${m.name}</span><span class="muted small" style="margin-left:auto">kaart ${i+1} van ${L.length}</span></div>
    <div class="th-bar"><i style="width:${i/L.length*100}%"></i></div>
    <h2>${c.n}</h2>${c.w?`<p class="fc-w">${c.w}</p>`:''}
    <div class="fq-hidden" id="fqH"><p>Schrijf de formule eerst zelf op, of zeg hem hardop.</p><button class="btn primary" id="fqShow">Toon formule</button></div>
    <div id="fqA" class="fq-ans" hidden><div class="fc-f">${c.f}</div>${c.x&&c.x.u?`<p class="fx-u">${c.x.u}</p>`:''}${symTable(c.s)}<p class="muted small">Had je hem goed?</p><div class="fq-acts"><button class="btn ghost" data-k="0">Nog niet</button><button class="btn primary" data-k="1">Ja, wist ik</button></div></div>
    <button class="link" id="fqStop">Stoppen</button></article>`;
    $('#fqShow').onclick=()=>{$('#fqH').hidden=true;$('#fqA').hidden=false};
    $$('[data-k]',host).forEach(b=>b.onclick=()=>{know+=+b.dataset.k;i++;draw()});
    $('#fqStop').onclick=onExit;
  };draw();
}
