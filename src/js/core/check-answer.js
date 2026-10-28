// ================= CONTROLE =================
function closeEnough(u,a,q){
  let tol=Math.max(1e-9,Math.abs(a)*1e-6);
  if(q.dec!=null)tol=Math.max(0.5*10**-q.dec*1.0001+1e-9,Math.abs(a)*0.003);
  return Math.abs(u-a)<=tol;
}
function check(q,raw){
  if(q.type==='mc')return {ok:raw===q.answer};
  if(q.type==='set'){
    const parts=String(raw).split(/;|\||\s+en\s+|\s+of\s+/i).map(s=>s.trim()).filter(Boolean);
    if(!parts.length)return {err:'Vul een antwoord in.'};
    const vals=parts.map(parseExpr);if(vals.some(v=>isNaN(v)))return {err:'Ik kan je antwoord niet lezen. Scheid meerdere antwoorden met een puntkomma, bijvoorbeeld: 3; −2'};
    const exp=[...new Set(q.answer.map(clean))];const got=[];vals.forEach(v=>{if(!got.some(g=>closeEnough(v,g,q)))got.push(v)});
    if(got.length<exp.length&&got.every(g=>exp.some(e=>closeEnough(g,e,q))))return {ok:false,note:`Je mist nog ${exp.length-got.length===1?'een oplossing':'oplossingen'}. Er zijn er ${exp.length}.`};
    const ok=got.length===exp.length&&exp.every(e=>got.some(g=>closeEnough(g,e,q)));
    return {ok};
  }
  if(String(raw).trim()==='')return {err:'Vul een antwoord in.'};
  const u=parseExpr(raw);if(isNaN(u))return {err:'Ik kan je antwoord niet lezen. Gebruik cijfers, een komma voor decimalen en eventueel een breuk als 3/4.'};
  const a=q.type==='frac'?q.answer[0]/q.answer[1]:q.answer;
  const ok=closeEnough(u,a,q);let note='';
  if(ok&&q.type==='frac'){const m=/^\s*(-?\d+)\s*\/\s*(\d+)\s*$/.exec(String(raw).replace(/[−–]/,'-'));if(m&&gcd(+m[1],+m[2])>1)note=`Klopt! Je kunt nog vereenvoudigen tot ${F(q.answer[0],q.answer[1])}.`}
  if(!ok)note=diagnose(u,a);
  return {ok,note,u};
}
function diagnose(u,a){
  if(a===0||u===0)return '';const r=u/a;
  if(Math.abs(r+1)<0.003)return 'Je antwoord heeft het verkeerde teken (+/−).';
  const lg=Math.log10(Math.abs(r));const k=Math.round(lg);
  if(k!==0&&Math.abs(lg-k)<0.002)return `Je antwoord wijkt precies een factor ${N(10**Math.abs(k))} af. Controleer je eenheden of de plaats van de komma.`;
  if(r>0&&Math.abs(r-1)<0.05)return 'Je zit er dichtbij. Controleer je afronding of reken tussendoor met meer decimalen.';
  if(Math.abs(r-2)<0.003||Math.abs(r-0.5)<0.003)return 'Je antwoord is precies 2× te groot of te klein. Heb je met de diameter i.p.v. de straal gerekend, of de ½ vergeten?';
  return '';
}
function ansText(q){
  if(q.type==='mc')return q.choices[q.answer];
  if(q.type==='frac')return `${F(q.answer[0],q.answer[1])}${q.answer[1]!==1?` <span class="muted">(≈ ${N(q.answer[0]/q.answer[1],4)})</span>`:''}`;
  const d=q.dec!=null?q.dec:6;
  if(q.type==='set')return [...new Set(q.answer.map(clean))].map(v=>N(v,d)).join(' of ');
  const v=q.dec!=null?rnd(q.answer,q.dec):q.answer;
  return q.unitPre?`${q.unit} ${N(v,d)}`:`${N(v,d)}${q.unit?' '+q.unit:''}`;
}

