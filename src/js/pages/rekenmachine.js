// ================= REKENMACHINE =================
const CKEY='bouwwiskunde-calc';
let CALC=Object.assign({rad:false,inv:false,tape:[]},(()=>{try{return JSON.parse(localStorage.getItem(CKEY))||{}}catch(e){return {}}})());
function saveCalc(){try{localStorage.setItem(CKEY,JSON.stringify({rad:CALC.rad,tape:CALC.tape.slice(-40)}))}catch(e){}}
function openCalc(v){const pan=$('#calc');const open=v===undefined?pan.hidden:v;pan.hidden=!open;$('#calcBtn').setAttribute('aria-expanded',open);if(open){toggleTheme(false);setTimeout(()=>$('#calcIn').focus({preventScroll:true}),30)}}
function setupCalc(){
  const inp=$('#calcIn'),res=$('#calcRes');let fresh=false;
  const fmt=v=>N(v,10);const raw=v=>N(v,10).replace(/ /g,'').replace(/^−/,'−');
  const SCI=()=>CALC.inv?[['sin⁻¹','asin('],['cos⁻¹','acos('],['tan⁻¹','atan('],['10ˣ','10^('],['eˣ','e^('],['(','('],[')',')'],['x²','^2'],['√','√('],['^','^'],['π','π'],['e','e'],['x!','!'],[CALC.rad?'Rad':'Deg','MODE'],['Inv','INV']]
    :[['sin','sin('],['cos','cos('],['tan','tan('],['log','log('],['ln','ln('],['(','('],[')',')'],['x²','^2'],['√','√('],['^','^'],['π','π'],['e','e'],['x!','!'],[CALC.rad?'Rad':'Deg','MODE'],['Inv','INV']];
  const drawSci=()=>{$('#calcSci').innerHTML=SCI().map(([t,k])=>`<button data-s="${k}" class="${(k==='INV'&&CALC.inv)||(k==='MODE'&&CALC.rad)?'on':''}" ${k==='MODE'?`aria-label="Wissel graden of radialen"`:''}>${t}</button>`).join('');$('#calcMode').textContent=CALC.rad?'Radialen':'Graden';
    $$('#calcSci button').forEach(b=>b.onclick=()=>{const k=b.dataset.s;if(k==='INV'){CALC.inv=!CALC.inv;drawSci()}else if(k==='MODE'){CALC.rad=!CALC.rad;saveCalc();drawSci();preview()}else insert(k)})};
  const setRes=(t,cls)=>{res.textContent=t;res.className='calc-res'+(cls?' '+cls:'')+(t.length>11&&!cls?' small':'')};
  const preview=()=>{const s=inp.value.trim();if(!s){setRes('0');return}const v=parseExpr(s,CALC.rad);if(!isNaN(v)&&isFinite(v))setRes(fmt(v))};
  const insert=t=>{if(fresh){fresh=false;if(/^[0-9,]$|^(sin|cos|tan|asin|acos|atan|log|ln|√|π|e|10\^|e\^|\()/.test(t))inp.value=''}
    const st=inp.selectionStart??inp.value.length,en=inp.selectionEnd??inp.value.length;inp.value=inp.value.slice(0,st)+t+inp.value.slice(en);const p=st+t.length;inp.setSelectionRange(p,p);inp.focus({preventScroll:true});preview()};
  const equals=()=>{const s=inp.value.trim();if(!s)return;const v=parseExpr(s,CALC.rad);if(isNaN(v)||!isFinite(v)){setRes('Kan ik niet lezen','err');return}
    lastAns=v;CALC.tape.push({e:s,v});if(CALC.tape.length>40)CALC.tape.shift();saveCalc();drawTape();setRes(fmt(v));inp.value=raw(v);fresh=true};
  const drawTape=()=>{const h=$('#calcHist');h.innerHTML=CALC.tape.length?CALC.tape.map((t,i)=>`<button class="tape-row" data-i="${i}"><span class="tape-e">${esc(t.e)}</span><span class="tape-v">${fmt(t.v)}</span></button>`).join(''):'<p class="tape-empty">Nog geen berekeningen.</p>';
    $$('.tape-row',h).forEach(b=>b.onclick=()=>{const t=CALC.tape[+b.dataset.i];show('calc');insert(raw(t.v))})};
  const show=v=>{$('#calcView').hidden=v!=='calc';$('#tapeView').hidden=v!=='tape';$('#navCalc').classList.toggle('on',v==='calc');$('#navTape').classList.toggle('on',v==='tape');if(v==='tape'){const tv=$('#tapeView');tv.scrollTop=tv.scrollHeight}};
  $$('#calc .ck').forEach(b=>b.onclick=()=>{const k=b.dataset.k;
    if(k==='AC'){inp.value='';fresh=false;setRes('0');inp.focus({preventScroll:true});return}
    if(k==='='){equals();return}
    if(k==='NEG'){const s=inp.value.trim();inp.value=!s?'−':/^−\(.*\)$/.test(s)?s.slice(2,-1):`−(${s})`;fresh=false;preview();return}
    if(k==='%'){fresh=false;insert('÷100');return}
    if(['÷','×','−','+'].includes(k)){fresh=false;insert(k);return}
    insert(k)});
  inp.addEventListener('input',()=>{fresh=false;preview()});
  inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();equals()}});
  $('#navCalc').onclick=()=>show('calc');$('#navTape').onclick=()=>show('tape');
  $('#tapeClear').onclick=()=>{CALC.tape=[];saveCalc();drawTape()};
  $('#calcBtn').onclick=()=>openCalc();$('#calcClose').onclick=()=>openCalc(false);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#calc').hidden)openCalc(false);toggleTheme(false)}});
  drawSci();drawTape();
}

