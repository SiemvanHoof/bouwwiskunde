// ================= HERHALEN =================
function viewReview(el){
  const items=dueItems();const nd=nextDue();
  if(!items.length){el.innerHTML=`<header class="page-head"><h1>Herhalen</h1><p class="lede">Elke stap die je in de leerroute afrondt, komt hier later terug: na 1 dag, dan na 3, 7, 14 en 30 dagen. Heb je hem fout, dan begint de reeks opnieuw. Zo onthoud je het voor de lange termijn.</p></header>
    <div class="empty"><h2>Niets te herhalen vandaag</h2><p>${nd?`De volgende herhaling staat op ${fmtDay(nd)}.`:'Rond eerst een paar stappen af in de leerroute.'}</p>${Object.keys(DB.rev||{}).length?'<button class="btn ghost" id="extra">Toch een gemengde ronde doen</button>':`<a class="btn primary" href="#${currentMod().id}-oefenen">Naar de leerroute</a>`}</div>`;
    const ex=$('#extra');if(ex)ex.onclick=()=>runReview(el,shuffle(Object.entries(DB.rev).map(([k,r])=>({k,...r}))).slice(0,8),true);return}
  el.innerHTML=`<header class="page-head"><h1>Herhalen</h1><p class="lede">${items.length} onderwerp${items.length===1?'':'en'} staan vandaag klaar, door elkaar gemengd. Door elkaar oefenen voelt lastiger, maar je leert er beter van herkennen welke aanpak bij welke som hoort.</p></header>
  <ul class="revlist">${items.slice(0,12).map(it=>{const [mid,sid]=it.k.split(':');const m=MOD[mid],s=m.subs.find(x=>x.id===sid);return `<li><span class="nv-code">${m.code}</span>${s?s.name:sid}<span class="muted small">niveau ${it.l}</span></li>`}).join('')}</ul>
  <button class="btn primary lg" id="startRev">Start herhaling (${Math.min(items.length,12)} opgaven)</button>`;
  $('#startRev').onclick=()=>runReview(el,shuffle(items).slice(0,12),false);
}
function runReview(el,items,extra){
  let i=0,good=0;
  const next=()=>{
    if(i>=items.length){el.innerHTML=`<div class="finished"><span class="fin-ic">${ICON.check}</span><h2>Herhaling klaar</h2><p>${good} van ${items.length} in één keer goed. ${extra?'':'Wat goed ging komt pas later terug; wat fout ging zie je morgen weer.'}</p><div class="lk-acts"><a class="btn primary" href="#start">Terug naar Home</a></div></div>`;buildNav();return}
    const it=items[i];const [mid,sid]=it.k.split(':');const m=MOD[mid],s=m.subs.find(x=>x.id===sid);if(!s){i++;return next()}
    const q=makeQ(m,s,it.l);
    el.innerHTML=`<header class="subhead"><div class="sh-row"><h1>Herhalen</h1><span class="subprog"><span class="sp-mini">opgave ${i+1} van ${items.length}</span></span></div><div class="th-bar"><i style="width:${i/items.length*100}%"></i></div></header><div id="qhost" style="margin-top:18px"></div>`;
    mountCard($('#qhost'),q,{mode:'practice',onResult:ok=>{record(q,ok);if(ok)good++;
      if(!extra){const r=DB.rev[it.k];if(ok){r.box=Math.min(INTERVALS.length-1,r.box+1);r.due=addDays(INTERVALS[r.box])}else{r.box=1;r.due=addDays(1)}saveDB()}},onNext:()=>{i++;next()}});
  };next();
}

