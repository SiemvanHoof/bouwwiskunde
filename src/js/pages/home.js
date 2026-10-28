// ================= VANDAAG =================
function currentMod(){return MODS.find(m=>unlocked(m.id)&&!modDone(m.id))||MODS[MODS.length-1]}
function greet(){const h=new Date().getHours();return h<6?'Goedenacht':h<12?'Goedemorgen':h<18?'Goedemiddag':'Goedenavond'}
function activityChart(){const days=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dayKey(d);const v=(DB.daily||{})[k]||{n:0,c:0};days.push({k,d,n:v.n,c:v.c})}
  const max=Math.max(5,...days.map(x=>x.n));const W=560,H=150,bw=W/14;
  return `<svg class="actchart" viewBox="0 0 ${W} ${H+22}" role="img" aria-label="Opgaven per dag, laatste 14 dagen">${days.map((x,i)=>{const h=x.n/max*H,hc=x.c/max*H;const lab=x.d.toLocaleDateString('nl-NL',{weekday:'narrow'});return `<g><title>${x.d.toLocaleDateString('nl-NL',{weekday:'long',day:'numeric',month:'short'})}: ${x.n} gemaakt, ${x.c} in één keer goed</title><rect x="${i*bw+5}" y="${H-h}" width="${bw-10}" height="${Math.max(h,1)}" rx="3" class="ac-all"/><rect x="${i*bw+5}" y="${H-hc}" width="${bw-10}" height="${Math.max(hc,0)}" rx="3" class="ac-ok"/><text x="${i*bw+bw/2}" y="${H+16}" text-anchor="middle" class="ac-lab${i===13?' today':''}">${lab}</text></g>`}).join('')}</svg>`}
function viewHome(el){
  const cur=currentMod(),p=prog(cur.id),step=pathSteps(cur)[p.i],due=dueItems().length,nd=nextDue();
  const td=(DB.daily||{})[today()]||{n:0,c:0};
  const todayStr=new Date().toLocaleDateString('nl-NL',{weekday:'long',day:'numeric',month:'long'});
  const doneCh=MODS.filter(m=>modDone(m.id)).length,startedCh=MODS.filter(m=>mastery(m.id)>0).length;
  const pct=DB.total?Math.round(DB.correct/DB.total*100):0;const st=streak();
  const wk=(()=>{let n=0;for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);n+=((DB.daily||{})[dayKey(d)]||{n:0}).n}return n})();
  const plan=[
    {done:due===0&&Object.keys(DB.rev||{}).length>0,t:due?`Herhaal ${due} onderwerp${due===1?'':'en'}`:'Niets te herhalen',d:due?'Korte gemengde ronde van wat je eerder hebt geleerd. Doe dit eerst: zo blijft het hangen.':nd?`Volgende herhaling: ${fmtDay(nd)}.`:'Herhalingen verschijnen hier zodra je stappen afrondt.',href:'#herhalen',b:due?'Start herhaling':null},
    {done:false,t:step?`${cur.code} ${cur.name}: ${step.s.name}`:`${cur.code} ${cur.name} afronden`,d:step?`Stap ${p.i+1} van ${pathSteps(cur).length}, niveau ${step.l} (${LVL[step.l]}). ${p.c?`${p.c} van ${PER_STEP} al goed.`:'Begint met een uitgewerkt voorbeeld.'}`:'Alle stappen gedaan.',href:`#${cur.id}-oefenen`,b:'Verder oefenen'},
    {done:false,t:`${cur.terms?'Begrippen':'Formules'} van ${cur.name} overhoren`,d:'Verborgen antwoord, jij noemt het eerst zelf. Effectiever dan teruglezen.',href:`#${cur.id}-formules`,b:'Overhoren'}];
  const kpis=[['Opgaven gemaakt',N(DB.total),wk?`${wk} deze week`:'nog niets deze week'],['In één keer goed',DB.total?pct+'%':'–',td.n?`vandaag ${td.c} van ${td.n}`:'vandaag nog niets'],['Dagen op rij',String(st),st?'blijf het volhouden':'oefen vandaag om te starten'],['Hoofdstukken af',`${doneCh}/${MODS.length}`,`${startedCh} begonnen`]];
  el.innerHTML=`<header class="page-head home-head"><p class="eyebrow">${todayStr}</p><h1>${greet()}${CLOUD.name?', '+esc(CLOUD.name.split(' ')[0]):''}</h1>
  <p class="lede">${td.n?`Je hebt vandaag ${td.n} opgave${td.n===1?'':'n'} gemaakt, ${td.c} in één keer goed.`:'Een kwartier per dag werkt beter dan een paar uur in één keer. Hieronder staat wat je vandaag kunt doen.'}</p></header>
  <div class="kpis home-kpis">${kpis.map(([l,n,d])=>`<div class="kpi"><span class="kpi-l">${l}</span><div class="kpi-row"><span class="kpi-n">${n}</span><span class="kpi-d">${d}</span></div></div>`).join('')}</div>
  <section><div class="sec-head"><h2>Vandaag</h2><span class="muted small">in deze volgorde</span></div>
  <ol class="plan">${plan.map((x,i)=>`<li class="${x.done?'done':''}"><span class="pl-n">${x.done?ICON.check:i+1}</span><div class="pl-b"><b>${x.t}</b><span>${x.d}</span></div>${x.b?`<a class="btn ${i===0&&due||i===1&&!due?'primary':'ghost'}" href="${x.href}">${x.b}</a>`:''}</li>`).join('')}</ol>
  ${!DB.intake?`<p class="note">Heb je al wat voorkennis? Met de <a href="#instaptoets">instaptoets</a> sla je het basisniveau over van hoofdstukken die je al beheerst.</p>`:''}</section>
  <section><div class="sec-head"><h2>Je vakken</h2><span class="muted small">klik om verder te gaan</span></div>
  <div class="vakgrid">${SUBJECTS.map(S=>{const pc=Math.round(S.mods.reduce((a,id)=>a+mastery(id),0)/S.mods.length);const done=S.mods.filter(id=>modDone(id)).length;const nx=S.mods.map(id=>MOD[id]).find(m=>unlocked(m.id)&&!modDone(m.id));
    return `<a class="vak" href="#${nx?nx.id:S.mods[0]}"><div class="vk-top">${ring(pc,44)}<div><b>${S.name}</b><span class="muted small">${done} van ${S.mods.length} hoofdstukken af</span></div></div>
    <div class="vk-cats">${S.cats.map(C=>{const cp=Math.round(C.mods.reduce((a,id)=>a+mastery(id),0)/C.mods.length);return `<div class="vk-cat"><span>${C.name}</span>${tape(cp)}</div>`}).join('')}</div>
    <div class="vk-next">${nx?`Volgende: <b>${nx.code} ${nx.name}</b>`:'Alles afgerond'} ${ICON.arrow}</div></a>`}).join('')}</div></section>
  <div class="home-2">
  <section><div class="sec-head"><h2>Laatste 14 dagen</h2><span class="muted small"><i class="lg-dot ok"></i>in één keer goed <i class="lg-dot all"></i>gemaakt</span></div><a class="stats-link" href="#statistieken" aria-label="Bekijk alle statistieken">${activityChart()}</a></section>
  <section><div class="sec-head"><h2>Laatst gemaakt</h2></div>
  ${(DB.log||[]).filter(e=>e.kind==='ans').length?`<ul class="actlist">${(DB.log||[]).filter(e=>e.kind==='ans').slice(0,6).map(e=>`<li><span class="mark ${e.ok?'ok':'no'}">${e.ok?ICON.check:ICON.x}</span><span>${esc(e.txt)}</span><span class="muted small">${ago(e.ts)}</span></li>`).join('')}</ul>`:'<p class="muted">Nog niets gemaakt. Begin bij “Verder oefenen” hierboven.</p>'}</section></div>
  <section><div class="sec-head"><h2>Snel naar</h2></div><div class="quick">
  <a href="#formules">${ICON.fx}<span><b>Formuleblad</b><span>alle formules met uitleg</span></span></a>
  <a href="#begrippen">${ICON.doc}<span><b>Begrippenlijst</b><span>bouwkundige vaktaal</span></span></a>
  <a href="#oefentoets">${ICON.clock}<span><b>Oefentoets</b><span>stel zelf een toets samen</span></span></a>
  <a href="#fouten">${ICON.x}<span><b>Fouten</b><span>${DB.errors.length} om te herhalen</span></span></a></div></section>`;
}

