// ================= FORMULEBLAD =================
let FLVL=0,FSEARCH='';
function fcardMini(c,m){return `<details class="fcard" data-s="${esc((c.n+' '+m.name+' '+c.f.replace(/<[^>]+>/g,' ')+' '+c.w+' '+((c.x&&c.x.u)||'').replace(/<[^>]+>/g,' ')).toLowerCase())}"><summary><header><span class="fc-l l${c.l}">${LVL[c.l]}</span><span class="fc-code">${m.code}</span></header><h3>${c.n}</h3><div class="fc-f">${c.f}</div><span class="fc-more">Uitleg, stappen en voorbeeld ${ICON.chev}</span></summary><div class="fc-body">${fxBody(c)}<a class="link" href="#${m.id}">Naar ${m.code} ${m.name}</a></div></details>`}
function viewFormulas(el){
  const total=MODS.reduce((s,m)=>s+(FORMULAS[m.id]||[]).length,0);
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Hulp</p><h1>Formuleblad</h1><p class="lede">Alle ${total} formules als kaarten, gesorteerd op niveau: eerst alles voor Basis, dan wat er bij Gevorderd bijkomt, dan HBO-start. Klik op een kaart voor de betekenis van elke letter, wanneer je hem gebruikt, een voorbeeld en de valkuil.</p></header>
  <div class="fbar"><div class="seg" role="group" aria-label="Niveau">${[[0,'Alle niveaus'],[1,'Basis'],[2,'Gevorderd'],[3,'HBO-start']].map(([k,t])=>`<button class="segbtn${FLVL===k?' on':''}" data-fl="${k}">${t}</button>`).join('')}</div>
  <div class="searchrow"><label class="sr" for="fsearch">Zoek een formule</label><input id="fsearch" type="search" placeholder="Zoek, bijv. moment, cirkel of U-waarde" autocomplete="off" value="${esc(FSEARCH)}"></div>
  <button class="btn ghost sm" id="openAll">Alles openklappen</button><button class="btn primary sm" id="quizAll">Overhoor deze kaarten</button></div>
  <div id="flist">${[1,2,3].filter(l=>!FLVL||FLVL===l).map(l=>`<section class="flevel" data-l="${l}"><div class="fl-head"><span class="sp-n">${l}</span><h2>${LVL[l]}</h2><span class="muted small">${l===1?'De basis: dit moet je zonder nadenken kunnen':l===2?'Komt erbij op gemiddeld niveau':'Komt erbij voor de start van het HBO'}</span></div>
    ${MODS.map(m=>{const cs=(FORMULAS[m.id]||[]).filter(c=>c.l===l);if(!cs.length)return '';return `<div class="fgroup2"><div class="fsub"><span class="code">${m.code}</span>${m.name}</div><div class="fcards">${cs.map(c=>fcardMini(c,m)).join('')}</div></div>`}).join('')}</section>`).join('')}</div>
  <p class="empty-search muted" hidden>Geen formules gevonden.</p>`;
  $$('[data-fl]',el).forEach(b=>b.onclick=()=>{FLVL=+b.dataset.fl;FSEARCH=$('#fsearch').value;viewFormulas(el)});
  $('#openAll').onclick=e=>{const all=$$('details.fcard',el).filter(d=>!d.closest('[hidden]')&&!d.hidden);const open=!all.every(d=>d.open);all.forEach(d=>d.open=open);e.target.textContent=open?'Alles dichtklappen':'Alles openklappen'};
  const inp=$('#fsearch');const filt=()=>{const t=inp.value.trim().toLowerCase();FSEARCH=inp.value;let any=false;
    $$('.fgroup2',el).forEach(g=>{let vis=0;$$('details.fcard',g).forEach(c=>{const show=!t||c.dataset.s.includes(t);c.hidden=!show;if(show)vis++});g.hidden=!vis;if(vis)any=true});
    $$('.flevel',el).forEach(s=>s.hidden=!$$('.fgroup2',s).some(g=>!g.hidden));$('.empty-search',el).hidden=any};
  inp.oninput=filt;if(FSEARCH)filt();
  $('#quizAll').onclick=()=>{const list=[];MODS.forEach(m=>(FORMULAS[m.id]||[]).forEach(c=>{if(FLVL&&c.l!==FLVL)return;const t=inp.value.trim().toLowerCase();if(t&&!(c.n+' '+m.name+' '+c.f.replace(/<[^>]+>/g,' ')+' '+c.w).toLowerCase().includes(t))return;list.push({c,m})}));
    const fl=$('#flist');$('.fbar',el).hidden=true;quizFormulas(fl,list.slice(0,40),()=>viewFormulas(el))};
}

