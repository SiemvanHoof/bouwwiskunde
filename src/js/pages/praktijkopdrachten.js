// ================= PRAKTIJKOPDRACHTEN =================
const CS={};
function renderCases(m){
  const tb=$('#tabbody');const list=CASES[m.id]||[];const st=CS[m.id]||(CS[m.id]={i:0,c:null});
  if(!st.c)st.c=list[st.i]();
  const titles=list.map(f=>{const c=f();return {t:c.t,l:c.lvl}});
  tb.innerHTML=`<p class="lede small">Praktijkopdrachten zijn uitgebreide opgaven uit de bouwpraktijk. Elke opdracht heeft meerdere deelvragen die op elkaar voortbouwen. Gebruik je antwoord van de vorige vraag (onafgerond) in de volgende.</p>
  <div class="caselist">${titles.map((c,i)=>`<button class="casebtn${i===st.i?' on':''}" data-c="${i}"><span class="fc-l l${c.l}">${LVL[c.l]}</span><span>${c.t}</span></button>`).join('')}</div><div id="casehost"></div>`;
  $$('[data-c]',tb).forEach(b=>b.onclick=()=>{st.i=+b.dataset.c;st.c=list[st.i]();renderCases(m)});
  mountCase(m,st.c,()=>{st.c=list[st.i]();renderCases(m)});
}
function mountCase(m,c,onNew){
  const host=$('#casehost');const res=c.parts.map(()=>null);
  host.innerHTML=`<article class="casecard"><header class="case-h"><span class="fc-l l${c.lvl}">${LVL[c.lvl]}</span><h2>${c.t}</h2></header>
  <div class="case-intro">${c.intro}</div>${c.fig?`<div class="qfig">${c.fig}</div>`:''}
  <ol class="parts">${c.parts.map((p,i)=>`<li class="part${i?' locked':''}" data-p="${i}"><div class="part-q"><span class="part-l">${'abcdefg'[i]}</span><span>${p.q}</span></div>
    <form class="ansrow" autocomplete="off">${p.unitPre?`<span class="unit">${p.unit}</span>`:''}<label class="sr" for="cp${i}">Antwoord ${'abcdefg'[i]}</label><input id="cp${i}" class="ans" type="text" spellcheck="false" placeholder="antwoord" ${i?'disabled':''}>${p.unit&&!p.unitPre?`<span class="unit">${p.unit}</span>`:''}<button class="btn primary sm" type="submit" ${i?'disabled':''}>Controleer</button>
    <button type="button" class="btn ghost sm" data-a="hint" ${i?'disabled':''}>Hint</button><button type="button" class="btn ghost sm" data-a="sol" ${i?'disabled':''}>Uitwerking</button></form>
    <p class="decnote">${decNote({type:'num',dec:p.dec})}</p><div class="hintbox" hidden></div><div class="feedback" hidden></div><div class="solbox" hidden><div class="sol-title">Uitwerking ${'abcdefg'[i]}</div>${p.sol}</div></li>`).join('')}</ol>
  <div class="case-end" hidden></div></article>`;
  const card=$('.casecard',host);
  const unlock=i=>{const li=$(`.part[data-p="${i}"]`,card);if(!li)return finish();li.classList.remove('locked');$$('input,button',li).forEach(x=>x.disabled=false);$('input',li).focus({preventScroll:true})};
  const finish=()=>{const ok=res.filter(Boolean).length;const e=$('.case-end',card);e.hidden=false;e.innerHTML=`<div><b>${ok} van ${res.length}</b> deelvragen in één keer goed.</div><button class="btn primary" id="newCase">Zelfde opdracht, nieuwe getallen</button>`;$('#newCase').onclick=onNew};
  c.parts.forEach((p,i)=>{const li=$(`.part[data-p="${i}"]`,card);const inp=$('input',li),fb=$('.feedback',li);let tries=0,done=false;
    const q={...p,type:'num',q:`<p><b>${c.t}</b></p>${c.intro}<p><b>${'abcdefg'[i]}.</b> ${p.q}</p>`,fig:c.fig,mod:m.id,sub:'praktijk',subName:'Praktijkopdracht',lvl:c.lvl};
    const close=(ok,show)=>{done=true;res[i]=ok;li.classList.add(ok?'good':'bad');$$('input,button[type=submit],[data-a=hint]',li).forEach(x=>x.disabled=true);if(show)$('.solbox',li).hidden=false;record(q,ok);unlock(i+1)};
    $('form',li).addEventListener('submit',e=>{e.preventDefault();if(done)return;const r=check(q,inp.value);
      if(r.err){fb.hidden=false;fb.className='feedback warn';fb.innerHTML=r.err;return}tries++;
      if(r.ok){fb.hidden=false;fb.className='feedback good';fb.innerHTML=`<b>Goed!</b> ${r.note||''}`;close(tries===1,false);return}
      if(tries===1){fb.hidden=false;fb.className='feedback bad';fb.innerHTML=`<b>Nog niet goed.</b> ${r.note||'Probeer het nog eens of bekijk de hint.'}`;inp.select();return}
      fb.hidden=false;fb.className='feedback bad';fb.innerHTML=`<b>Helaas.</b> Het antwoord is <b>${ansText(q)}</b>.`;close(false,true)});
    $('[data-a=hint]',li).onclick=()=>{const h=$('.hintbox',li);h.hidden=false;h.innerHTML=`<b>Hint</b> ${subfix(p.hint||'')}`};
    $('[data-a=sol]',li).onclick=()=>{const s=$('.solbox',li);if(!done){fb.hidden=false;fb.className='feedback bad';fb.innerHTML=`Het antwoord is <b>${ansText(q)}</b>.`;close(false,true)}else s.hidden=!s.hidden};
  });
}
function switchTab(m,t){location.hash=`#${m.id}-${t}`}
function getPS(m){return PS[m.id]||(PS[m.id]={mode:'pad',sub:m.subs[0].id,lvl:1,n:0,c:0})}
function stepper(m){
  const p=prog(m.id);const n=m.subs.length;
  return `<div class="stepper">${[1,2,3].map(l=>{const base=(l-1)*n;const lvState=p.i>=base+n?'done':p.i>=base?'now':'todo';
    return `<div class="sp-lvl ${lvState}"><div class="sp-head"><span class="sp-n">${l}</span><span class="sp-t">${LVL[l]}</span>${lvState==='done'?`<span class="sp-ok">${ICON.check}</span>`:''}</div>
    <ol class="sp-steps">${m.subs.map((s,j)=>{const k=base+j;const c=k<p.i?'done':k===p.i?'now':'todo';return `<li class="${c}" title="${s.name}"><span class="sp-dot">${c==='done'?ICON.check:''}</span><span class="sp-name">${s.name}</span></li>`}).join('')}</ol></div>`}).join('')}</div>`;
}
function renderPractice(m){
  const ps=getPS(m);const tb=$('#tabbody');
  tb.innerHTML=`<div class="practice"><div class="pr-main"><div id="qhost"></div><div class="session" id="session"></div></div>
  <aside class="pr-side"><div class="modeswitch" role="group" aria-label="Oefenvorm"><button class="ms${ps.mode==='pad'?' on':''}" data-mode="pad">Leerroute</button><button class="ms${ps.mode==='vrij'?' on':''}" data-mode="vrij">Vrij oefenen</button></div><div id="pctl"></div></aside></div>`;
  $$('[data-mode]',tb).forEach(b=>b.onclick=()=>{ps.mode=b.dataset.mode;renderPractice(m)});
  if(ps.mode==='pad'){$('#pctl').innerHTML=stepper(m)}
  else{const lv=Math.max(curLevel(m.id),1);
    $('#pctl').innerHTML=`<div class="pcontrols"><div class="ctl"><span class="ctl-l">Onderdeel</span><div class="chips">${[{id:'all',name:'Alles door elkaar'},...m.subs].map(s=>`<button class="chipbtn${ps.sub===s.id?' on':''}" data-sub="${s.id}" aria-pressed="${ps.sub===s.id}">${s.name}</button>`).join('')}</div></div>
    <div class="ctl"><span class="ctl-l">Niveau</span><div class="seg" role="group">${[1,2,3].map(k=>`<button class="segbtn${ps.lvl===k?' on':''}" data-lvl="${k}" aria-pressed="${ps.lvl===k}">${k} · ${LVL[k]}</button>`).join('')}</div></div></div>`;
    $$('[data-sub]',tb).forEach(b=>b.onclick=()=>{ps.sub=b.dataset.sub;renderPractice(m)});
    $$('[data-lvl]',tb).forEach(b=>b.onclick=()=>{ps.lvl=+b.dataset.lvl;renderPractice(m)});}
  nextPractice(m);
}
function stepInfo(m){const p=prog(m.id);const steps=pathSteps(m);return {p,steps,cur:steps[p.i]}}
function sessionLine(m,ps){
  const s=$('#session');if(!s)return;
  if(ps.mode==='pad'){const {p,steps,cur}=stepInfo(m);if(!cur){s.innerHTML='';return}
    s.innerHTML=`<div class="stepprog"><span class="spg-t">Stap ${p.i+1} van ${steps.length} · <b>${cur.s.name}</b> op niveau ${cur.l}</span><span class="spg-dots" aria-label="${p.c} van ${PER_STEP} goed">${Array.from({length:PER_STEP},(_,k)=>`<i class="${k<p.c?'on':''}"></i>`).join('')}</span><span class="muted small">${PER_STEP} keer goed = volgende stap. Fout kost één punt.</span></div>`}
  else s.innerHTML=`<span>Deze sessie: <b>${ps.c}</b> van <b>${ps.n}</b> in één keer goed</span>`;
}
function celebrate(html){logEv('lvl',html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());saveDB();renderRail();const t=$('#celebrate');t.innerHTML=html;t.hidden=false;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');clearTimeout(celebrate.h);celebrate.h=setTimeout(()=>{t.hidden=true},3600)}
function nextPractice(m){
  const ps=getPS(m);let s,lvl;
  if(ps.mode==='pad'){const {cur}=stepInfo(m);
    if(!cur){$('#qhost').innerHTML=`<div class="finished"><span class="fin-ic">${ICON.check}</span><h2>${m.code} ${m.name} is afgerond</h2><p>Je hebt alle onderdelen op alle drie de niveaus gehaald. Het komt vanzelf terug op de pagina Herhalen.</p><div class="lk-acts">${nextOf(m)?`<a class="btn primary" href="#${nextOf(m).id}">Volgend hoofdstuk ${ICON.arrow}</a>`:''}<button class="btn ghost" id="toFree">Vrij oefenen</button></div></div>`;
      $('#toFree').onclick=()=>{ps.mode='vrij';ps.lvl=3;renderPractice(m)};sessionLine(m,ps);return}
    s=cur.s;lvl=cur.l;
    const sk=`${m.id}:${s.id}:${lvl}`;DB.seenEx=DB.seenEx||{};
    if(lvl<3&&!s.gen.isTerm&&!DB.seenEx[sk]&&prog(m.id).c===0){showExample(m,s,lvl,sk);return}}
  else{s=ps.sub==='all'?pick(m.subs):m.subs.find(x=>x.id===ps.sub);lvl=ps.lvl}
  const q=makeQ(m,s,lvl);sessionLine(m,ps);const fade=!!ps.fade;ps.fade=false;
  mountCard($('#qhost'),q,{mode:'practice',fade,onResult:ok=>{
    ps.n++;if(ok)ps.c++;
    if(ps.mode==='pad'){const p=prog(m.id);const n=m.subs.length;const steps=pathSteps(m);
      if(ok){p.c++;if(p.c>=PER_STEP){p.i++;p.c=0;schedule(m.id,steps[p.i-1].s.id,steps[p.i-1].l);
        if(p.i%n===0){const l=p.i/n;const nxt=nextOf(m);
          celebrate(`<b>Niveau ${l} · ${LVL[l]} afgerond!</b>${l===1&&nxt?`<span>${nxt.code} ${nxt.name} is nu open.</span>`:l<3?`<span>Nu door naar niveau ${l+1} · ${LVL[l+1]}.</span>`:'<span>Dit hoofdstuk is helemaal af.</span>'}`)}
        else toast(`Stap af: ${steps[p.i-1].s.name} ${ICON.check}`)}}
      else p.c=Math.max(0,p.c-1);
      saveDB();}
    record(q,ok);
    if(ps.mode==='pad')$('#pctl').innerHTML=stepper(m);
    sessionLine(m,ps);updateModStats(m);
  },onNext:()=>{nextPractice(m);const qh=$('#qhost');if(qh&&qh.getBoundingClientRect().top<0)qh.scrollIntoView({behavior:'smooth',block:'start'})}});
}

function showExample(m,s,lvl,sk){
  const q=makeQ(m,s,lvl);const ps=getPS(m);
  $('#qhost').innerHTML=`<article class="qcard excard"><header class="qhead"><span class="code">${m.code}</span><span class="qsub">${esc(s.name)}</span><span class="tag ex">Uitgewerkt voorbeeld</span><span class="lvl-t" style="margin-left:auto">${LVL[lvl]}</span></header>
  <div class="qbody">${q.q}</div>${q.fig?`<div class="qfig">${q.fig}</div>`:''}
  <div class="exsol"><div class="sol-title">Zo los je het op</div>${q.sol||''}<p class="exans">Antwoord: <b>${ansText(q)}</b></p></div>
  <p class="selfex"><b>Even zelf nadenken:</b> waarom is de tweede stap nodig? Zeg het in je hoofd in je eigen woorden voordat je verdergaat.</p>
  <div class="qnext"><button class="btn primary" id="exGo">Nu zelf proberen ${ICON.arrow}</button></div></article>`;
  sessionLine(m,ps);
  $('#exGo').onclick=()=>{DB.seenEx[sk]=1;saveDB();ps.fade=true;nextPractice(m)};
}

