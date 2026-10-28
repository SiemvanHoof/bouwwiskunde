// ================= VRAAGKAART =================
let uidc=0;
function mountCard(host,q,opt){
  const id='a'+(++uidc);const pips=[1,2,3].map(i=>`<i class="${i<=q.lvl?'on':''}"></i>`).join('');
  const m=MOD[q.mod];
  let ans;
  if(q.type==='mc')ans=`<div class="mc" role="group" aria-label="Antwoordopties">${q.choices.map((c,i)=>`<button type="button" class="mc-opt" data-i="${i}"><span class="mc-key">${'ABCD'[i]}</span><span class="mc-txt">${c}</span></button>`).join('')}</div>`;
  else ans=`<form class="ansrow" autocomplete="off">${q.unitPre?`<span class="unit pre">${q.unit}</span>`:''}<label class="sr" for="${id}">Jouw antwoord</label><input id="${id}" class="ans" type="text" inputmode="text" spellcheck="false" autocapitalize="off" placeholder="${q.type==='set'?'bijv. 3; −2':q.type==='frac'?'bijv. 5/12':'jouw antwoord'}">${q.unit&&!q.unitPre?`<span class="unit">${q.unit}</span>`:''}<button class="btn primary" type="submit">${opt.mode==='test'?'Volgende':'Controleer'}</button></form>`;
  const calcTag=q.calc===false?'<span class="tag nocalc">zonder rekenmachine</span>':'';
  host.innerHTML=`<article class="qcard" data-state="open">
    <header class="qhead"><span class="code">${m.code}</span><span class="qsub">${esc(q.subName)}</span>${calcTag}<span class="lvl" title="Niveau ${q.lvl}: ${LVL[q.lvl]}"><span class="sr">Niveau ${q.lvl}</span>${pips}<span class="lvl-t">${LVL[q.lvl]}</span></span></header>
    <div class="qbody">${q.q}</div>
    ${q.fig?`<div class="qfig">${q.fig}</div>`:''}
    ${opt.fade&&(q.sol||'').split('<li>').length>2?`<div class="fadebox"><b>De eerste stap staat er al:</b> ${(q.sol.match(/<li>([\s\S]*?)<\/li>/)||[])[1]} <span class="muted">Maak jij de rest af?</span></div>`:''}
    <div class="qans">${ans}<p class="decnote">${decNote(q)}</p></div>
    ${opt.mode==='test'?`<div class="qtools"><button type="button" class="link" data-act="skip">Overslaan</button></div>`:`<div class="qtools"><button type="button" class="btn ghost sm" data-act="hint">Hint</button><button type="button" class="btn ghost sm" data-act="sol">Toon uitwerking</button></div>`}
    <div class="hintbox" hidden></div>
    <div class="feedback" hidden aria-live="polite"></div>
    <div class="solbox" hidden><div class="sol-title">Uitwerking</div>${q.sol||''}</div>
    <div class="qnext" hidden><button type="button" class="btn primary" data-act="next">Volgende vraag <span aria-hidden="true">→</span></button></div>
  </article>`;
  const card=$('.qcard',host);const fb=$('.feedback',card);const input=$('input.ans',card);let attempts=0,done=false;
  const finish=(ok,showSol)=>{
    if(done)return;done=true;card.dataset.state=ok?'good':'bad';
    if(input)input.disabled=true;$$('.mc-opt',card).forEach(b=>b.disabled=true);$$('.ansrow button',card).forEach(b=>b.disabled=true);
    if(showSol)$('.solbox',card).hidden=false;
    $('.qnext',card).hidden=false;
    const solBtn=$('[data-act="sol"]',card);if(solBtn){solBtn.textContent=$('.solbox',card).hidden?'Toon uitwerking':'Verberg uitwerking';solBtn.dataset.act='toggle'}
    $('[data-act="hint"]',card)?.remove();
    opt.onResult&&opt.onResult(ok);
    setTimeout(()=>$('[data-act="next"]',card).focus({preventScroll:true}),30);
  };
  const submit=raw=>{
    if(done)return;
    if(opt.mode==='test'){if(q.type!=='mc'&&String(raw).trim()===''){fb.hidden=false;fb.className='feedback warn';fb.innerHTML='Vul een antwoord in of kies Overslaan.';return}
      const r=check(q,raw);if(r.err){fb.hidden=false;fb.className='feedback warn';fb.innerHTML=r.err;return}opt.onAnswer(raw,!!r.ok);return}
    const r=check(q,raw);
    if(r.err){fb.hidden=false;fb.className='feedback warn';fb.innerHTML=r.err;return}
    attempts++;
    if(r.ok){fb.hidden=false;fb.className='feedback good';fb.innerHTML=`<b>Goed!</b> ${r.note||''} ${attempts>1?'<span class="muted">(Telt niet mee als in één keer goed.)</span>':''}`;finish(attempts===1,false);return}
    if(q.type==='mc'){$(`.mc-opt[data-i="${raw}"]`,card)?.classList.add('wrong');}
    if(attempts===1&&q.type!=='mc'){fb.hidden=false;fb.className='feedback bad';fb.innerHTML=`<b>Nog niet goed.</b> ${r.note||'Probeer het nog een keer, of bekijk de hint.'}`;input.select();return}
    if(q.type==='mc')$(`.mc-opt[data-i="${q.answer}"]`,card)?.classList.add('right');
    fb.hidden=false;fb.className='feedback bad';fb.innerHTML=`<b>Helaas.</b> ${r.note?r.note+' ':''}Het juiste antwoord is <b>${ansText(q)}</b>.`;
    finish(false,true);
  };
  if(input){$('form',card).addEventListener('submit',e=>{e.preventDefault();submit(input.value)});setTimeout(()=>input.focus({preventScroll:true}),40)}
  $$('.mc-opt',card).forEach(b=>b.addEventListener('click',()=>{if(opt.mode==='test'){$$('.mc-opt',card).forEach(x=>x.classList.remove('picked'));b.classList.add('picked');setTimeout(()=>submit(+b.dataset.i),180)}else submit(+b.dataset.i)}));
  card.addEventListener('click',e=>{const a=e.target.closest('[data-act]')?.dataset.act;if(!a)return;
    if(a==='hint'){const h=$('.hintbox',card);h.hidden=false;h.innerHTML=`<b>Hint</b> ${subfix(q.hint||'Lees de uitleg bij dit onderwerp nog eens.')}`}
    if(a==='sol'){if(!done){fb.hidden=false;fb.className='feedback bad';fb.innerHTML=`Het antwoord is <b>${ansText(q)}</b>. Deze vraag telt als fout; probeer de volgende zelf.`;finish(false,true)}}
    if(a==='toggle'){const s=$('.solbox',card);s.hidden=!s.hidden;e.target.textContent=s.hidden?'Toon uitwerking':'Verberg uitwerking'}
    if(a==='next')opt.onNext&&opt.onNext();
    if(a==='skip')opt.onAnswer(null,false);
  });
  return card;
}
function makeQ(m,s,l){const q=s.gen(l);return {...q,mod:m.id,sub:s.id,subName:s.name,lvl:l}}

