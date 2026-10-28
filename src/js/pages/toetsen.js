// ================= TOETSEN =================
function fmtTime(s){s=Math.round(s||0);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
let TCFG={mods:MODS.map(m=>m.id),n:20,lvl:'mix'};
function viewTestIntro(el,kind){
  if(kind==='intake'){
    el.innerHTML=`<header class="page-head"><div class="eyebrow">Toets</div><h1>Instaptoets</h1><p class="lede">Twee vragen per rekenhoofdstuk en één per Bouwkunde-hoofdstuk, ${MODS.reduce((a,m)=>a+(m.terms?1:2),0)} in totaal. Je krijgt pas aan het eind feedback. Heb je bij een hoofdstuk beide vragen goed, dan sla je daar het basisniveau over.</p></header>
    <div class="testintro"><ul class="rules"><li>Duur: ongeveer 40 tot 50 minuten. Stoppen mag; wat je gemaakt hebt telt mee.</li><li>Houd pen, papier en een rekenmachine bij de hand (of gebruik de rekenmachine rechtsonder)</li><li>Weet je iets niet? Sla de vraag over. Gokken helpt je niet, de toets is voor jezelf.</li></ul>
    ${DB.intake?`<p class="muted">Je hebt de instaptoets al eens gemaakt op ${DB.intake.date} (${DB.intake.score}%). Je kunt hem opnieuw maken.</p>`:''}
    <button class="btn primary lg" id="startT">Start de instaptoets</button></div>`;
    $('#startT').onclick=()=>{const qs=[];MODS.forEach(m=>{const subs=shuffle(m.subs).slice(0,m.terms?1:2);subs.forEach((s,i)=>qs.push(makeQ(m,s,i===0?1:2)))});runTest(el,qs,'intake')};
    return;
  }
  el.innerHTML=`<header class="page-head"><div class="eyebrow">Toets</div><h1>Oefentoets</h1><p class="lede">Stel je eigen toets samen. Feedback en uitwerkingen krijg je aan het eind, net als bij een echte toets.</p></header>
  <div class="testintro"><fieldset class="tset"><legend>Onderwerpen</legend><div class="checks">${MODS.map(m=>`<label class="check"><input type="checkbox" id="tm-${m.id}" value="${m.id}" ${TCFG.mods.includes(m.id)?'checked':''}><span><span class="code">${m.code}</span> ${m.name}</span></label>`).join('')}</div>
  <div class="checkacts"><button class="link" data-all="1">Alles aan</button><button class="link" data-all="0">Alles uit</button></div></fieldset>
  <div class="tset2"><fieldset class="tset"><legend>Aantal vragen</legend><div class="seg">${[10,20,30].map(n=>`<button class="segbtn${TCFG.n===n?' on':''}" data-n="${n}">${n}</button>`).join('')}</div></fieldset>
  <fieldset class="tset"><legend>Niveau</legend><div class="seg">${[['mix','Gemengd'],[1,'Basis'],[2,'Gevorderd'],[3,'HBO-start']].map(([k,t])=>`<button class="segbtn${String(TCFG.lvl)===String(k)?' on':''}" data-l="${k}">${t}</button>`).join('')}</div></fieldset></div>
  <p class="warnline" id="tWarn" hidden>Kies minstens één onderwerp.</p>
  <button class="btn primary lg" id="startT">Start de oefentoets</button></div>`;
  $$('.check input',el).forEach(c=>c.onchange=()=>{TCFG.mods=$$('.check input:checked',el).map(x=>x.value)});
  $$('[data-all]',el).forEach(b=>b.onclick=()=>{$$('.check input',el).forEach(c=>c.checked=b.dataset.all==='1');TCFG.mods=$$('.check input:checked',el).map(x=>x.value)});
  $$('[data-n]',el).forEach(b=>b.onclick=()=>{TCFG.n=+b.dataset.n;$$('[data-n]',el).forEach(x=>x.classList.toggle('on',x===b))});
  $$('[data-l]',el).forEach(b=>b.onclick=()=>{TCFG.lvl=b.dataset.l==='mix'?'mix':+b.dataset.l;$$('[data-l]',el).forEach(x=>x.classList.toggle('on',x===b))});
  $('#startT').onclick=()=>{if(!TCFG.mods.length){$('#tWarn').hidden=false;return}
    const mods=TCFG.mods.map(id=>MOD[id]);const qs=[];
    for(let i=0;i<TCFG.n;i++){const m=mods[i%mods.length];const s=pick(m.subs);const l=TCFG.lvl==='mix'?pick([1,2,2,3]):TCFG.lvl;qs.push(makeQ(m,s,l))}
    runTest(el,shuffle(qs),'practice')};
}
function runTest(el,qs,kind){
  const ans=new Array(qs.length).fill(undefined);let idx=0;const t0=Date.now();
  el.innerHTML=`<header class="testhead"><div class="th-l"><span class="eyebrow">${kind==='intake'?'Instaptoets':'Oefentoets'}</span><span class="th-count" id="thc"></span></div><div class="th-r"><span class="th-time" id="tht">0:00</span><button class="btn ghost sm" id="stopT">Stoppen</button></div>
  <div class="th-bar"><i id="thb"></i></div></header><div id="qhost"></div>`;
  timerH=setInterval(()=>{const t=$('#tht');if(t)t.textContent=fmtTime((Date.now()-t0)/1000)},1000);
  $('#stopT').onclick=e=>{const b=e.target;if(b.dataset.c){finishTest(el,qs,ans,kind,(Date.now()-t0)/1000,true)}else{b.dataset.c=1;b.textContent='Nu afronden?';setTimeout(()=>{b.textContent='Stoppen';delete b.dataset.c},3000)}};
  const show=()=>{
    $('#thc').textContent=`Vraag ${idx+1} van ${qs.length}`;$('#thb').style.width=`${idx/qs.length*100}%`;
    mountCard($('#qhost'),qs[idx],{mode:'test',onAnswer:(raw,ok)=>{ans[idx]={raw,ok};idx++;if(idx>=qs.length)finishTest(el,qs,ans,kind,(Date.now()-t0)/1000);else{show();window.scrollTo({top:0})}}});
  };
  show();
}
function finishTest(el,qs,ans,kind,sec,early){
  stopTimer();
  const per={};qs.forEach((q,i)=>{const a=ans[i];if(a===undefined&&early)return;const p=per[q.mod]||(per[q.mod]={n:0,c:0});p.n++;if(a&&a.ok)p.c++;record(q,!!(a&&a.ok))});
  const answered=qs.filter((q,i)=>!(ans[i]===undefined&&early));const c=answered.filter(q=>{const a=ans[qs.indexOf(q)];return a&&a.ok}).length;const n=answered.length;
  if(!n){viewTestIntro(el,kind);return}
  const score=Math.round(c/n*100);
  DB.tests.push({date:today(),kind,n,c,sec});if(DB.tests.length>30)DB.tests.shift();
  if(kind==='intake'){Object.entries(per).forEach(([k,v])=>{if(v.c===v.n){const p=prog(k);if(p.i<MOD[k].subs.length){p.i=MOD[k].subs.length;p.c=0}}});DB.intake={date:today(),score,per:Object.fromEntries(Object.entries(per).map(([k,v])=>[k,Math.round(v.c/v.n*100)]))}}
  saveDB();refreshNav();
  const rows=MODS.filter(m=>per[m.id]).map(m=>{const p=per[m.id];const pc=Math.round(p.c/p.n*100);return {m,p,pc}});
  const weak=rows.filter(r=>r.pc<100).sort((a,b)=>a.pc-b.pc||MODS.indexOf(a.m)-MODS.indexOf(b.m));
  const verdict=score>=80?'Sterke basis. Werk de onderdelen met fouten nog bij en ga dan aan de slag op niveau 3.':score>=55?'Een redelijke basis met duidelijke gaten. Begin bij het eerste onderwerp hieronder dat niet op 100% staat.':'Er is werk aan de winkel, en dat is precies waarom je hier bent. Loop de hoofdstukken op volgorde door, te beginnen met de uitleg.';
  el.innerHTML=`<header class="page-head"><div class="eyebrow">${kind==='intake'?'Instaptoets':'Oefentoets'} · resultaat</div><h1>${c} van ${n} goed <span class="score-pct">${score}%</span></h1><p class="lede">${verdict}</p>${kind==='intake'&&rows.some(r=>r.pc===100)?`<p class="okline">${ICON.check} Bij ${rows.filter(r=>r.pc===100).length} hoofdstuk${rows.filter(r=>r.pc===100).length===1?'':'en'} had je alles goed: daar sla je het basisniveau over.</p>`:''}<p class="muted">Tijd: ${fmtTime(sec)}${early?' · toets vroegtijdig afgerond':''}</p></header>
  <section><div class="sec-head"><h2>Per onderwerp</h2></div><div class="resgrid">${rows.map(r=>`<a class="resrow" href="#${r.m.id}"><span class="code">${r.m.code}</span><span class="rr-name">${r.m.name}</span><span class="rr-score">${r.p.c}/${r.p.n}</span>${tape(r.pc)}</a>`).join('')}</div></section>
  ${weak.length?`<section class="nextstep"><div class="ns-label">Advies</div><div class="ns-body"><h2>Begin met ${weak[0].m.code} ${weak[0].m.name}</h2><p>Daarna: ${weak.slice(1,4).map(w=>w.m.name).join(', ')||'de overige hoofdstukken in volgorde'}.</p></div><a class="btn primary" href="#${weak[0].m.id}">Naar ${weak[0].m.code}</a></section>`:''}
  <section><div class="sec-head"><h2>Alle vragen nakijken</h2></div><div class="review">${qs.map((q,i)=>{const a=ans[i];if(a===undefined&&early)return '';const ok=a&&a.ok;const given=!a||a.raw===null?'<span class="muted">overgeslagen</span>':q.type==='mc'?q.choices[a.raw]:esc(a.raw);
    return `<details class="rv ${ok?'ok':'no'}"><summary><span class="rv-n">${i+1}</span><span class="rv-mark">${ok?'Goed':'Fout'}</span><span class="rv-t">${MOD[q.mod].code} · ${esc(q.subName)}</span></summary><div class="rv-body"><div class="qbody">${q.q}</div>${q.fig?`<div class="qfig">${q.fig}</div>`:''}<p><b>Jouw antwoord:</b> ${given}</p><p><b>Juist antwoord:</b> ${ansText(q)}</p><div class="sol-title">Uitwerking</div>${q.sol||''}</div></details>`}).join('')}</div></section>
  <div class="endcta"><a class="btn ghost" href="#start">Naar het overzicht</a><button class="btn primary" id="again">Nieuwe toets</button></div>`;
  $('#again').onclick=()=>viewTestIntro(el,kind);window.scrollTo(0,0);
}

