// ================= HELPERS =================
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
const lcm=(a,b)=>Math.abs(a*b)/gcd(a,b);
const clean=x=>Number(Number(x).toPrecision(12));
const rnd=(x,d)=>{const f=10**d;return Math.round(clean(x)*f)/f};
const nz=(a,b)=>{let v=0;while(v===0)v=R(a,b);return v};
const D2R=Math.PI/180;
function N(x,maxd=6){
  if(typeof x!=='number'||!isFinite(x))return String(x);
  x=clean(x);const neg=x<0;x=Math.abs(x);
  let s=x.toFixed(maxd);
  if(s.includes('.'))s=s.replace(/0+$/,'').replace(/\.$/,'');
  let [i,d]=s.split('.');
  if(i.length>4)i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' ');
  return (neg&&Number(s)!==0?'−':'')+i+(d?','+d:'');
}
const P=x=>x<0?`(${N(x)})`:N(x);
function F(n,d){
  if(d<0){n=-n;d=-d}
  if(d===1)return N(n);
  return `${n<0?'−':''}<span class="fr"><span>${Math.abs(n)}</span><span>${d}</span></span>`;
}
const Fh=(t,b)=>`<span class="fr"><span>${t}</span><span>${b}</span></span>`;
const subfix=s=>String(s).replace(/\b([A-Za-zσΦ])_([A-Za-z]+)\b/g,'$1<sub>$2</sub>');
const steps=a=>`<ol class="steps">${a.map(s=>`<li>${subfix(s)}</li>`).join('')}</ol>`;
const sup=x=>`<sup>${x}</sup>`;
function divisors(n){const o=[];for(let i=1;i<=n;i++)if(n%i===0)o.push(i);return o}
function polyStr(c,v='x'){
  const n=c.length-1;let out='';
  c.forEach((k,i)=>{
    if(k===0)return;const p=n-i;const abs=Math.abs(k);
    const coef=(abs===1&&p>0)?'':N(abs);
    const term=coef+(p>0?v+(p>1?sup(p):''):'');
    if(out==='')out=(k<0?'−':'')+term;else out+=(k<0?' − ':' + ')+term;
  });
  return out||'0';
}
function mc(right,wrongs){
  const seen=new Set([right]);const opts=[right];
  for(const w of wrongs){if(!seen.has(w)&&opts.length<4){seen.add(w);opts.push(w)}}
  const sh=shuffle(opts);
  return {type:'mc',choices:sh,answer:sh.indexOf(right)};
}

// ================= FIGUREN (SVG) =================
const svg=(w,h,inner,label='Figuur bij de opgave')=>`<svg class="fig" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">${inner}</svg>`;
const tk=(x,y)=>`<line class="tk" x1="${x-4}" y1="${y+4}" x2="${x+4}" y2="${y-4}"/>`;
function dimH(x1,x2,y,t){return `<g class="dim"><line x1="${x1-6}" y1="${y}" x2="${x2+6}" y2="${y}"/>${tk(x1,y)}${tk(x2,y)}<text x="${(x1+x2)/2}" y="${y-6}" text-anchor="middle">${t}</text></g>`}
function dimV(x,y1,y2,t){return `<g class="dim"><line x1="${x}" y1="${y1-6}" x2="${x}" y2="${y2+6}"/>${tk(x,y1)}${tk(x,y2)}<text transform="translate(${x-6} ${(y1+y2)/2}) rotate(-90)" text-anchor="middle">${t}</text></g>`}
function figRect(w,h,tw,th){
  const s=Math.min(200/w,120/h);const W=Math.max(50,w*s),H=Math.max(36,h*s);const x0=16,y0=12;
  return svg(x0+W+44,y0+H+38,`<rect class="shape" x="${x0}" y="${y0}" width="${W}" height="${H}"/>${dimH(x0,x0+W,y0+H+24,tw)}${dimV(x0+W+30,y0,y0+H,th)}`);
}
function figBox(tl,tb,th){
  // isometrische balk
  const x0=20,y0=46,W=150,H=70,dx=60,dy=-34;
  const p=(x,y)=>`${x},${y}`;
  return svg(280,170,`<polygon class="shape" points="${p(x0,y0)} ${p(x0+W,y0)} ${p(x0+W,y0+H)} ${p(x0,y0+H)}"/>
  <polygon class="shape2" points="${p(x0,y0)} ${p(x0+dx,y0+dy)} ${p(x0+W+dx,y0+dy)} ${p(x0+W,y0)}"/>
  <polygon class="shape3" points="${p(x0+W,y0)} ${p(x0+W+dx,y0+dy)} ${p(x0+W+dx,y0+H+dy)} ${p(x0+W,y0+H)}"/>
  ${dimH(x0,x0+W,y0+H+22,tl)}
  <text class="lbl" x="${x0+W+dx/2+14}" y="${y0+H+dy/2+26}" text-anchor="start">${tb}</text>
  <text class="lbl" x="${x0-6}" y="${y0+H/2+4}" text-anchor="end">${th}</text>`);
}
function figTri(b,h,tb,th){
  const s=Math.min(220/b,110/h);const W=Math.max(80,b*s),H=Math.max(44,h*s);const x0=16,y0=12;const ax=x0+W*0.38;
  return svg(x0+W+30,y0+H+38,`<polygon class="shape" points="${x0},${y0+H} ${x0+W},${y0+H} ${ax},${y0}"/>
  <line class="dash" x1="${ax}" y1="${y0}" x2="${ax}" y2="${y0+H}"/><rect class="ra" x="${ax}" y="${y0+H-8}" width="8" height="8"/>
  <text class="lbl" x="${ax+8}" y="${y0+H/2+4}">${th}</text>${dimH(x0,x0+W,y0+H+24,tb)}`);
}
function figTrap(a,b,h,ta,tb,th){
  const s=Math.min(220/Math.max(a,b),100/h);const Wa=a*s,Wb=b*s,H=Math.max(40,h*s);const x0=16,y0=26;const off=(Wa-Wb)/2;
  return svg(x0+Wa+40,y0+H+38,`<polygon class="shape" points="${x0},${y0+H} ${x0+Wa},${y0+H} ${x0+off+Wb},${y0} ${x0+off},${y0}"/>
  <text class="lbl" x="${x0+off+Wb/2}" y="${y0-8}" text-anchor="middle">${tb}</text>
  <line class="dash" x1="${x0+Wa+14}" y1="${y0}" x2="${x0+Wa+14}" y2="${y0+H}"/><text class="lbl" x="${x0+Wa+8}" y="${y0+H/2+4}" text-anchor="end">${th}</text>
  ${dimH(x0,x0+Wa,y0+H+24,ta)}`);
}
function figCircle(t){
  return svg(200,150,`<circle class="shape" cx="90" cy="75" r="60"/><circle class="pt" cx="90" cy="75" r="3"/><line class="dash" x1="90" y1="75" x2="150" y2="75"/><text class="lbl" x="120" y="68" text-anchor="middle">${t}</text>`);
}
function figL(W,H,cw,ch,tW,tH,tTop,tRight){
  const s=Math.min(210/W,140/H);const w=W*s,h=H*s,cx=cw*s,cy=ch*s;const x0=34,y0=26;
  const pts=[[0,0],[w-cx,0],[w-cx,cy],[w,cy],[w,h],[0,h]].map(([x,y])=>`${x0+x},${y0+y}`).join(' ');
  return svg(x0+w+40,y0+h+38,`<polygon class="shape" points="${pts}"/>
  ${dimH(x0,x0+w,y0+h+24,tW)}${dimV(x0-20,y0,y0+h,tH)}${dimH(x0,x0+w-cx,y0-12,tTop)}${dimV(x0+w+26,y0+cy,y0+h,tRight)}`);
}
function figRightTri(adj,opp,L){
  let r=opp/adj;r=Math.min(1.4,Math.max(0.32,r));
  const W=r>1?150/r:190,H=W*r;const x0=26,y0=16;
  const A=[x0,y0+H],C=[x0+W,y0+H],B=[x0+W,y0];
  const th=Math.atan2(H,W);const ar=24;
  const len=Math.hypot(W,H);const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;
  const hx=mx-H/len*12,hy=my-W/len*12;
  return svg(x0+W+76,y0+H+34,`<polygon class="shape" points="${A} ${C} ${B}"/>
  <rect class="ra" x="${C[0]-10}" y="${C[1]-10}" width="10" height="10"/>
  ${L.ang?`<path class="arc" d="M${A[0]+ar} ${A[1]} A${ar} ${ar} 0 0 0 ${A[0]+ar*Math.cos(th)} ${A[1]-ar*Math.sin(th)}"/><text class="lbl sm" x="${A[0]+38*Math.cos(th/2)}" y="${A[1]-38*Math.sin(th/2)+4}">${L.ang}</text>`:''}
  <text class="lbl" x="${(A[0]+C[0])/2}" y="${A[1]+20}" text-anchor="middle">${L.adj||''}</text>
  <text class="lbl" x="${C[0]+8}" y="${(B[1]+C[1])/2+4}">${L.opp||''}</text>
  <text class="lbl" x="${hx}" y="${hy}" text-anchor="end">${L.hyp||''}</text>
  <text class="vx" x="${A[0]-12}" y="${A[1]+4}">A</text><text class="vx" x="${C[0]+5}" y="${C[1]+14}">C</text><text class="vx" x="${B[0]+5}" y="${B[1]-2}">B</text>`);
}
function figRoof(tSpan,tH,tR,tA,angle){
  const W=240,x0=20,base=150;const half=W/2;const H=Math.min(110,Math.max(30,half*Math.tan(angle*D2R)));const top=base-H;
  const th=Math.atan2(H,half);
  return svg(W+40,base+40,`<polygon class="shape" points="${x0},${base} ${x0+W},${base} ${x0+half},${top}"/>
  <line class="dash" x1="${x0+half}" y1="${top}" x2="${x0+half}" y2="${base}"/>
  <text class="lbl" x="${x0+half+6}" y="${(top+base)/2+8}">${tH}</text>
  ${tR?`<text class="lbl" x="${x0+half/2-10}" y="${(top+base)/2-10}" text-anchor="end">${tR}</text>`:''}
  <path class="arc" d="M${x0+30} ${base} A30 30 0 0 0 ${x0+30*Math.cos(th)} ${base-30*Math.sin(th)}"/>
  <text class="lbl sm" x="${x0+44}" y="${base-8}">${tA}</text>
  ${dimH(x0,x0+W,base+24,tSpan)}`);
}
function figBeam(Lm,loads,qlab,segs){
  // loads: [{a, t}] a in m from A
  const x0=30,len=260,y=78;const sx=a=>x0+a/Lm*len;
  let g=`<line class="beam" x1="${x0}" y1="${y}" x2="${x0+len}" y2="${y}"/>
  <polygon class="sup" points="${x0},${y+3} ${x0-9},${y+18} ${x0+9},${y+18}"/>
  <circle class="sup" cx="${x0+len}" cy="${y+10}" r="7"/><line class="gnd" x1="${x0+len-12}" y1="${y+18}" x2="${x0+len+12}" y2="${y+18}"/><line class="gnd" x1="${x0-12}" y1="${y+18}" x2="${x0+12}" y2="${y+18}"/>
  <text class="vx" x="${x0-4}" y="${y+34}">A</text><text class="vx" x="${x0+len-4}" y="${y+34}">B</text>`;
  if(qlab){
    g+=`<line class="load" x1="${x0}" y1="${y-26}" x2="${x0+len}" y2="${y-26}"/>`;
    for(let i=0;i<=10;i++){const x=x0+i*len/10;g+=`<line class="load" x1="${x}" y1="${y-26}" x2="${x}" y2="${y-4}"/><polygon class="loadh" points="${x},${y-2} ${x-3},${y-8} ${x+3},${y-8}"/>`}
    g+=`<text class="lbl" x="${x0+len/2}" y="${y-32}" text-anchor="middle">${qlab}</text>`;
  }
  loads.forEach(l=>{const x=sx(l.a);const top=qlab?y-66:y-52;g+=`<line class="load strong" x1="${x}" y1="${top}" x2="${x}" y2="${y-5}"/><polygon class="loadh strong" points="${x},${y-2} ${x-5},${y-11} ${x+5},${y-11}"/><text class="lbl" x="${x+7}" y="${top+10}">${l.t}</text>`});
  let pos=0;(segs||[]).forEach(s=>{g+=dimH(sx(pos),sx(pos+s.len),y+56,s.t);pos+=s.len});
  return svg(x0+len+30,y+66,g);
}
function figPlot(pts,line){
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
  let x1=Math.min(0,...xs)-1,x2=Math.max(0,...xs)+1,y1=Math.min(0,...ys)-1,y2=Math.max(0,...ys)+1;
  const W=260,H=200,pad=14;const sx=x=>pad+(x-x1)/(x2-x1)*W,sy=y=>pad+(y2-y)/(y2-y1)*H;
  let g='';const stepX=(x2-x1)>24?5:1,stepY=(y2-y1)>24?5:1;
  for(let x=Math.ceil(x1/stepX)*stepX;x<=x2;x+=stepX)g+=`<line class="grid" x1="${sx(x)}" y1="${pad}" x2="${sx(x)}" y2="${pad+H}"/>`;
  for(let y=Math.ceil(y1/stepY)*stepY;y<=y2;y+=stepY)g+=`<line class="grid" x1="${pad}" y1="${sy(y)}" x2="${pad+W}" y2="${sy(y)}"/>`;
  g+=`<line class="axis" x1="${pad}" y1="${sy(0)}" x2="${pad+W}" y2="${sy(0)}"/><line class="axis" x1="${sx(0)}" y1="${pad}" x2="${sx(0)}" y2="${pad+H}"/>
  <text class="lbl sm" x="${pad+W-4}" y="${sy(0)-5}" text-anchor="end">x</text><text class="lbl sm" x="${sx(0)+5}" y="${pad+10}">y</text>`;
  if(line){const[a,b]=line;g+=`<line class="plotline" x1="${sx(x1)}" y1="${sy(a*x1+b)}" x2="${sx(x2)}" y2="${sy(a*x2+b)}"/>`}
  pts.forEach(p=>{g+=`<circle class="ptb" cx="${sx(p[0])}" cy="${sy(p[1])}" r="4"/><text class="lbl sm" x="${sx(p[0])+7}" y="${sy(p[1])-7}">(${N(p[0])}, ${N(p[1])})</text>`});
  return `<svg class="fig" viewBox="0 0 ${W+2*pad} ${H+2*pad}" width="${W+2*pad}" height="${H+2*pad}" role="img" aria-label="Assenstelsel met punten"><defs><clipPath id="clp"><rect x="${pad}" y="${pad}" width="${W}" height="${H}"/></clipPath></defs><g clip-path="url(#clp)">${g}</g></svg>`;
}
function figStair(to,ta){
  let d='M20 150';const sx=46,sy=28;
  for(let i=0;i<4;i++){d+=` v-${sy} h${sx}`}
  return svg(260,175,`<path class="stair" d="${d} V150 Z"/>
  ${dimV(14+0*sx,150-sy,150,'')}<text class="lbl" x="${20+sx*0.5}" y="${150-sy/2+4}" text-anchor="middle">${to}</text>
  <text class="lbl" x="${20+sx*1.5}" y="${150-2*sy-6}" text-anchor="middle">${ta}</text>
  <line class="dash" x1="${20+sx}" y1="${150-2*sy}" x2="${20+2*sx}" y2="${150-2*sy}"/>`);
}
function layerTable(rows,extra=''){
  return `<div class="tblwrap"><table class="ltab"><thead><tr><th>Laag</th><th>Dikte d</th><th>λ (W/m·K)</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.n}</td><td>${r.d===null?'?':N(r.d)+' mm'}</td><td>${r.l===null?'–':N(r.l,3)}</td></tr>`).join('')}${extra}</tbody></table></div>`;
}

// ================= W-01 REKENEN =================
function genVolgorde(l){
  let e,v,st;const t=l===1?pick([1,2]):l===2?pick([3,4]):pick([5,6]);
  if(t===1){const a=R(2,20),b=R(2,9),c=R(2,9);v=a+b*c;e=`${a} + ${b} × ${c}`;st=[`Eerst vermenigvuldigen: ${b} × ${c} = ${b*c}`,`Dan optellen: ${a} + ${b*c} = ${v}`]}
  if(t===2){const a=R(2,9),b=R(2,9),d=R(2,6),k=R(2,9),c=d*k;v=a*b-k;e=`${a} × ${b} − ${c} ÷ ${d}`;st=[`× en ÷ eerst: ${a} × ${b} = ${a*b} en ${c} ÷ ${d} = ${k}`,`Dan aftrekken: ${a*b} − ${k} = ${N(v)}`]}
  if(t===3){const a=R(1,9),b=R(2,14),c=R(2,6),d=R(1,15);const p=a-b;v=p*c+d;e=`(${a} − ${b}) × ${c} + ${d}`;st=[`Haakjes eerst: ${a} − ${b} = ${N(p)}`,`Vermenigvuldigen: ${P(p)} × ${c} = ${N(p*c)}`,`Optellen: ${N(p*c)} + ${d} = ${N(v)}`]}
  if(t===4){const a=R(5,30),b=R(2,6),c=R(1,6),d=R(4,12);const p=c-d;v=a-b*p;e=`${a} − ${b} × (${c} − ${d})`;st=[`Haakjes: ${c} − ${d} = ${N(p)}`,`Vermenigvuldigen: ${b} × ${P(p)} = ${N(b*p)}`,`Aftrekken: ${a} − ${P(b*p)} = ${N(v)}`]}
  if(t===5){const s=R(2,6);const d=pick(divisors(s*s).filter(x=>x>1));const c=R(1,8),b=c+s,a=R(10,40);v=a-s*s/d;e=`${a} − (${b} − ${c})² ÷ ${d}`;st=[`Haakjes: ${b} − ${c} = ${s}`,`Macht: ${s}² = ${s*s}`,`Delen: ${s*s} ÷ ${d} = ${s*s/d}`,`Aftrekken: ${a} − ${s*s/d} = ${N(v)}`]}
  if(t===6){const a=R(2,7),b=R(2,6),c=R(2,6);v=-a*a+b*(-c);e=`−${a}² + ${b} × (−${c})`;st=[`Let op: −${a}² betekent −(${a}²) = −${a*a}. Het minteken hoort níet bij de macht.`,`${b} × (−${c}) = −${b*c}`,`−${a*a} + (−${b*c}) = ${N(v)}`]}
  return {q:`Bereken zonder rekenmachine:<div class="expr">${e}</div>`,type:'num',answer:v,hint:t>=5?'Volgorde: Haakjes, Machten, × en ÷, + en − (Hoe Meneer Van Dale Wacht Op Antwoord).':'Vermenigvuldigen en delen gaan vóór optellen en aftrekken.',sol:steps(st),calc:false};
}
function genNegatief(l){
  let e,v,st;
  if(l===1){const a=R(2,20),b=R(2,20);if(Math.random()<.5){v=a+b;e=`${a} − (−${b})`;st=[`Min min wordt plus: ${a} − (−${b}) = ${a} + ${b}`,`= ${v}`]}else{v=-a+b;e=`−${a} + ${b}`;st=[`Begin bij −${a} op de getallenlijn en ga ${b} stappen omhoog`,`= ${N(v)}`]}}
  else if(l===2){const a=R(2,12),b=R(2,12),t=R(1,3);
    if(t===1){v=a*b;e=`(−${a}) × (−${b})`;st=['Min × min = plus',`${a} × ${b} = ${v}`]}
    else if(t===2){v=-a*b;e=`(−${a}) × ${b}`;st=['Min × plus = min',`${a} × ${b} = ${a*b}, dus ${N(v)}`]}
    else{const p=a*b;v=-b;e=`${p} ÷ (−${a})`;st=['Plus ÷ min = min',`${p} ÷ ${a} = ${b}, dus ${N(v)}`]}}
  else{const a=R(2,15),b=R(2,8),c=R(2,6);if(Math.random()<.5){v=-a-(-b)*c;e=`−${a} − (−${b}) × ${c}`;st=[`Eerst vermenigvuldigen: (−${b}) × ${c} = −${b*c}`,`−${a} − (−${b*c}) = −${a} + ${b*c}`,`= ${N(v)}`]}
    else{v=(-a+b)*(-c);e=`(−${a} + ${b}) × −${c}`;st=[`Haakjes: −${a} + ${b} = ${N(-a+b)}`,`${P(-a+b)} × (−${c}) = ${N(v)}`]}}
  return {q:`Bereken zonder rekenmachine:<div class="expr">${e}</div>`,type:'num',answer:v,hint:'Gelijke tekens bij × en ÷ geven plus, ongelijke tekens geven min. Min min wordt plus.',sol:steps(st),calc:false};
}
function genBreuken(l){
  let n,d,e,st,hint;
  if(l===1){
    if(Math.random()<.5){const den=pick([4,5,6,8,10,12]);const a=R(1,den-1),b=R(1,den-1);n=a+b;d=den;e=`${F(a,den)} + ${F(b,den)}`;st=[`De noemers zijn gelijk: tel de tellers op: ${a} + ${b} = ${a+b}`,`Uitkomst: ${F(n,d)}`];hint='Bij gelijke noemers tel je alleen de tellers op.'}
    else{const a=R(1,5),b=R(2,7),c=R(1,5),dd=R(2,7);n=a*c;d=b*dd;e=`${F(a,b)} × ${F(c,dd)}`;st=[`Teller × teller: ${a} × ${c} = ${n}. Noemer × noemer: ${b} × ${dd} = ${d}`,`Uitkomst: ${F(n,d)}`];hint='Vermenigvuldig teller met teller en noemer met noemer.'}
  }else if(l===2){
    const b=pick([2,3,4,5,6]),dd=pick([3,4,6,8,10].filter(x=>x!==b));const a=R(1,b+2),c=R(1,dd);const sub=Math.random()<.5;const L=lcm(b,dd);
    n=sub?a*(L/b)-c*(L/dd):a*(L/b)+c*(L/dd);d=L;e=`${F(a,b)} ${sub?'−':'+'} ${F(c,dd)}`;
    st=[`Kleinste gemeenschappelijke noemer is ${L}`,`${F(a,b)} = ${F(a*L/b,L)} en ${F(c,dd)} = ${F(c*L/dd,L)}`,`${F(a*L/b,L)} ${sub?'−':'+'} ${F(c*L/dd,L)} = ${F(n,L)}`];hint='Maak de breuken eerst gelijknamig (zelfde noemer).';
  }else{
    if(Math.random()<.5){const a=R(1,7),b=R(2,9),c=R(1,7),dd=R(2,9);n=a*dd;d=b*c;e=`${F(a,b)} ÷ ${F(c,dd)}`;st=[`Delen door een breuk = vermenigvuldigen met het omgekeerde: ${F(a,b)} × ${F(dd,c)}`,`= ${F(n,d)}`];hint='Delen door een breuk is vermenigvuldigen met het omgekeerde.'}
    else{const w=R(1,3),b=pick([3,4,5,6]),a=R(1,b-1),dd=pick([2,3,4,6,8]),c=R(1,dd-1);const L=lcm(b,dd);const top=(w*b+a)*(L/b)-c*(L/dd);n=top;d=L;e=`${w}${F(a,b)} − ${F(c,dd)}`;
      st=[`Gemengd getal omzetten: ${w}${F(a,b)} = ${F(w*b+a,b)}`,`Gelijknamig maken (noemer ${L}): ${F((w*b+a)*L/b,L)} − ${F(c*L/dd,L)}`,`= ${F(top,L)}`];hint='Zet het gemengde getal eerst om naar een (onechte) breuk.'}
  }
  const g=gcd(n,d);const sn=n/g,sd=d/g;
  if(g>1)st.push(`Vereenvoudigen (teller en noemer delen door ${g}): ${F(sn,sd)}`);
  return {q:`Bereken en schrijf zo eenvoudig mogelijk:<div class="expr">${e}</div>`,type:'frac',answer:[sn,sd],hint,sol:steps(st),calc:false};
}
function genProcent(l){
  if(l===1){const p=pick([5,10,15,20,25,30,40,50,75]),x=pick([40,60,80,120,160,200,240,360,480,1200]);const v=p*x/100;
    return {q:`Hoeveel is <b>${p}%</b> van ${N(x)}?`,type:'num',answer:v,dec:2,hint:`1% van ${N(x)} is ${N(x/100)}. Vermenigvuldig dat met ${p}.`,sol:steps([`1% van ${N(x)} = ${N(x)} ÷ 100 = ${N(x/100)}`,`${p}% = ${p} × ${N(x/100)} = ${N(v)}`])}}
  if(l===2){const t=R(1,3);
    if(t===1){const x=R(12,95)*25;const v=x*1.21;return {q:`Een offerte voor kozijnen bedraagt € ${N(x)} exclusief 21% btw. Wat is het bedrag inclusief btw?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Inclusief 21% btw: 100% + 21% = 121%, dus vermenigvuldigen met 1,21.',sol:steps(['Groeifactor bij +21%: 1,21',`€ ${N(x)} × 1,21 = € ${N(v,2)}`])}}
    if(t===2){const o=R(9,19)*10,pct=pick([4,6,8,12,15,18,24,35]);const n=rnd(o*(1+pct/100),2);const v=(n-o)/o*100;
      return {q:`De prijs van een m³ beton steeg van € ${N(o)} naar € ${N(n,2)}. Met hoeveel procent is de prijs gestegen?`,type:'num',answer:v,dec:1,unit:'%',hint:'Procentuele verandering = (nieuw − oud) ÷ oud × 100%.',sol:steps([`Verschil: ${N(n,2)} − ${N(o)} = ${N(n-o,2)}`,`${N(n-o,2)} ÷ ${N(o)} × 100% = ${N(v,1)}%`])}}
    const x=R(20,80)*10,p=pick([10,15,20,25,30]);const v=x*(1-p/100);
    return {q:`Een bouwmarkt geeft ${p}% korting op een partij gipsplaten van € ${N(x)}. Wat betaal je na korting?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:`${p}% korting betekent dat je ${100-p}% betaalt.`,sol:steps([`Je betaalt ${100-p}% = factor ${N(1-p/100)}`,`€ ${N(x)} × ${N(1-p/100)} = € ${N(v,2)}`])}}
  if(Math.random()<.5){const incl=R(150,2400)+pick([0,.5,.95]);const v=incl/1.21;
    return {q:`Op een factuur staat een totaal van € ${N(incl,2)} <b>inclusief</b> 21% btw. Hoeveel is het bedrag exclusief btw?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Het bedrag inclusief btw is 121%. Deel dus door 1,21 (niet 21% eraf halen!).',sol:steps([`Inclusief btw = 121% van het bedrag exclusief`,`€ ${N(incl,2)} ÷ 1,21 = € ${N(v,2)}`,'Valkuil: 21% van het totaal aftrekken geeft een verkeerd antwoord.'])}}
  const p1=pick([10,15,20,25,30]),p2=pick([10,15,20,25]);const f=(1+p1/100)*(1-p2/100);const v=(f-1)*100;
  return {q:`De prijs van hout stijgt eerst met ${p1}% en daalt daarna met ${p2}%. Wat is de totale procentuele verandering? <span class="muted">(Gebruik een minteken bij een daling.)</span>`,type:'num',answer:v,dec:1,unit:'%',hint:'Vermenigvuldig de groeifactoren: 1 + p/100 bij een stijging, 1 − p/100 bij een daling.',sol:steps([`Groeifactoren: ${N(1+p1/100)} en ${N(1-p2/100)}`,`Totaal: ${N(1+p1/100)} × ${N(1-p2/100)} = ${N(f,4)}`,`Verandering: (${N(f,4)} − 1) × 100% = ${N(v,1)}%`,`Let op: je mag de percentages niet gewoon optellen (${p1} − ${p2} = ${p1-p2}%).`])};
}

// ================= W-02 MACHTEN =================
function genMachtwaarde(l){
  if(l===1){if(Math.random()<.3){const n=R(2,6);return {q:`Bereken:<div class="expr">10${sup(n)}</div>`,type:'num',answer:10**n,hint:`10${sup(n)} is een 1 met ${n} nullen.`,sol:steps([`10${sup(n)} = ${N(10**n)}`]),calc:false}}
    const a=R(2,5),n=a===2?R(3,6):R(2,4);return {q:`Bereken:<div class="expr">${a}${sup(n)}</div>`,type:'num',answer:a**n,hint:`${a}${sup(n)} betekent ${Array(n).fill(a).join(' × ')}.`,sol:steps([`${Array(n).fill(a).join(' × ')} = ${a**n}`]),calc:false}}
  if(l===2){const t=R(1,3);
    if(t===1){const a=R(2,4),n=R(2,4);return {q:`Bereken:<div class="expr">(−${a})${sup(n)}</div>`,type:'num',answer:(-a)**n,hint:'Het minteken staat binnen de haakjes, dus het doet mee met de macht.',sol:steps([`(−${a})${sup(n)} = ${Array(n).fill(`(−${a})`).join(' × ')}`,`${n%2===0?'Even':'Oneven'} aantal mintekens, dus ${n%2===0?'positief':'negatief'}: ${N((-a)**n)}`]),calc:false}}
    if(t===2){const a=R(2,4),n=R(2,4);return {q:`Bereken:<div class="expr">−${a}${sup(n)}</div>`,type:'num',answer:-(a**n),hint:'Zonder haakjes hoort het minteken niet bij de macht.',sol:steps([`−${a}${sup(n)} = −(${a}${sup(n)}) = −${a**n}`]),calc:false}}
    const [a,n]=pick([[2,1],[2,2],[2,3],[4,1],[4,2],[5,1],[5,2],[10,1],[10,2],[10,3]]);const v=1/a**n;
    return {q:`Bereken als decimaal getal:<div class="expr">${a}${sup('−'+n)}</div>`,type:'num',answer:v,hint:`Een negatieve exponent betekent 1 gedeeld door de macht: ${a}${sup('−'+n)} = 1 / ${a}${sup(n)}.`,sol:steps([`${a}${sup('−'+n)} = ${Fh(1,a+(n>1?sup(n):''))} = ${Fh(1,a**n)}`,`= ${N(v)}`]),calc:false}}
  const [b,p,q]=pick([[4,1,2],[9,1,2],[25,1,2],[8,1,3],[27,1,3],[8,2,3],[16,3,4],[9,3,2],[100,3,2],[1000,2,3],[16,1,4],[32,2,5]]);const v=Math.round(b**(p/q));
  return {q:`Bereken zonder rekenmachine:<div class="expr">${b}${sup(`${p}/${q}`)}</div>`,type:'num',answer:v,hint:`a${sup('p/q')} = (ᵠ√a)${sup('p')}: neem eerst de ${q===2?'wortel':q+'e-machtswortel'}, dan de macht ${p}.`,sol:steps([`${q===2?'√':q+'√'}${b} = ${Math.round(b**(1/q))}`,`${Math.round(b**(1/q))}${sup(p)} = ${v}`]),calc:false};
}
function genRekenregels(l){
  let e,v,st;const p=R(2,7),q=R(2,6),r=R(2,5);
  if(l===1){if(Math.random()<.5){e=`x${sup(p)} · x${sup(q)}`;v=p+q;st=[`Bij vermenigvuldigen tel je exponenten op: ${p} + ${q} = ${v}`]}else{const pp=p+q;e=`${Fh('x'+sup(pp),'x'+sup(q))}`;v=pp-q;st=[`Bij delen trek je exponenten af: ${pp} − ${q} = ${v}`]}}
  else if(l===2){const t=R(1,3);
    if(t===1){e=`(x${sup(p)})${sup(q)}`;v=p*q;st=[`Macht van een macht: exponenten vermenigvuldigen: ${p} × ${q} = ${v}`]}
    else if(t===2){e=`x${sup(p)} · x${sup('−'+q)}`;v=p-q;st=[`Exponenten optellen: ${p} + (−${q}) = ${v}`]}
    else{e=Fh(1,'x'+sup(p));v=-p;st=[`${Fh(1,'x'+sup('a'))} = x${sup('−a')}, dus de exponent is −${p}`]}}
  else{const t=R(1,3);
    if(t===1){e=Fh(`x${sup(p)} · x${sup(q)}`,`x${sup(r)}`);v=p+q-r;st=[`Teller: x${sup(p+q)}`,`Delen: ${p+q} − ${r} = ${v}`]}
    else if(t===2){e=`√x · x${sup(q)}`;v=q+0.5;st=[`√x = x${sup('½')}`,`Optellen: ½ + ${q} = ${N(v)}`]}
    else{e=Fh(`(x${sup(p)})${sup(2)}`,`x${sup(q)}`);v=2*p-q;st=[`Teller: (x${sup(p)})² = x${sup(2*p)}`,`Delen: ${2*p} − ${q} = ${N(v)}`]}}
  return {q:`Schrijf als één macht van x. Welk getal komt op de plaats van het vraagteken?<div class="expr">${e} = x${sup('?')}</div>`,type:'num',answer:v,hint:'a^p · a^q = a^(p+q) · a^p / a^q = a^(p−q) · (a^p)^q = a^(p·q)',sol:steps(st),calc:false};
}
function genWortels(l){
  if(l===1){const k=R(2,15);return {q:`Bereken zonder rekenmachine:<div class="expr">√${k*k}</div>`,type:'num',answer:k,hint:'Welk getal keer zichzelf geeft dit getal?',sol:steps([`${k} × ${k} = ${k*k}, dus √${k*k} = ${k}`]),calc:false}}
  if(l===2){if(Math.random()<.5){let n;do{n=R(2,150)}while(Number.isInteger(Math.sqrt(n)));const v=Math.sqrt(n);return {q:`Bereken met de rekenmachine en rond af op 2 decimalen:<div class="expr">√${n}</div>`,type:'num',answer:v,dec:2,hint:`Controle: √${n} ligt tussen ${Math.floor(v)} en ${Math.ceil(v)}.`,sol:steps([`√${n} = ${N(v,5)}…`,`Afgerond: ${N(v,2)}`])}}
    const s=pick([2,3,5,6,7]),a=R(2,6);const b=s*a*a;return {q:`Bereken zonder rekenmachine:<div class="expr">√${s} · √${b}</div>`,type:'num',answer:s*a,hint:'√a · √b = √(a · b)',sol:steps([`√${s} · √${b} = √${s*b}`,`√${s*b} = ${s*a}`]),calc:false}}
  const s=pick([2,3,5,6,7]),k=R(2,9);return {q:`Vereenvoudig. Welk getal komt op de plaats van het vraagteken?<div class="expr">√${k*k*s} = ? · √${s}</div>`,type:'num',answer:k,hint:`Zoek het grootste kwadraat dat in ${k*k*s} past.`,sol:steps([`${k*k*s} = ${k*k} × ${s}`,`√${k*k*s} = √${k*k} · √${s} = ${k}√${s}`]),calc:false};
}
function genWetnot(l){
  if(l===1){const n=R(3,7);const m=rnd(R(11,99)/10,1);const x=clean(m*10**n);return {q:`Schrijf in wetenschappelijke notatie: <b>${N(x)}</b> = ${N(m)} × 10${sup('?')}. Wat is de exponent?`,type:'num',answer:n,hint:`Tel hoeveel plaatsen de komma naar links moet om ${N(m)} te krijgen.`,sol:steps([`${N(x)} = ${N(m)} × 10${sup(n)}`,`De komma schuift ${n} plaatsen naar links`]),calc:false}}
  if(l===2){const n=R(2,6);const m=rnd(R(11,99)/10,1);const x=clean(m*10**-n);return {q:`Schrijf in wetenschappelijke notatie: <b>${N(x,10)}</b> = ${N(m)} × 10${sup('?')}. Wat is de exponent?`,type:'num',answer:-n,hint:'Bij getallen kleiner dan 1 is de exponent negatief.',sol:steps([`De komma schuift ${n} plaatsen naar rechts`,`${N(x,10)} = ${N(m)} × 10${sup('−'+n)}`]),calc:false}}
  const a=R(2,9),b=R(2,9),p=R(2,6),q=R(-4,5);const prod=a*b;let m=prod,ex=p+q;if(m>=10){m=m/10;ex+=1}
  return {q:`Bereken en schrijf het antwoord als ${'c × 10<sup>n</sup>'} met 1 ≤ c &lt; 10. Wat is n?<div class="expr">(${a} × 10${sup(p)}) × (${b} × 10${sup(q<0?'−'+(-q):q)})</div>`,type:'num',answer:ex,hint:'Vermenigvuldig de getallen voor de tienmachten, en tel de exponenten op.',sol:steps([`${a} × ${b} = ${prod}; 10${sup(p)} × 10${sup(q<0?'−'+(-q):q)} = 10${sup(p+q)}`,`${prod} × 10${sup(p+q)}${prod>=10?` = ${N(m)} × 10${sup(ex)}`:''}`,`n = ${ex}`]),calc:false};
}

// ================= W-03 EENHEDEN =================
function convQ(units,l,kind,picker){
  const keys=Object.keys(units);let a,b;
  do{[a,b]=picker()}while(a===b||units[a]===units[b]&&!(kind==='spanning'));
  return [a,b];
}
function genLengte(l){
  const U={mm:-3,cm:-2,dm:-1,m:0,km:3};
  let pairs=l===1?[['m','cm'],['cm','m'],['m','mm'],['mm','m'],['cm','mm']]:l===2?[['mm','m'],['m','mm'],['dm','mm'],['cm','m'],['m','dm'],['km','m'],['mm','cm']]:null;
  if(l<3){const [a,b]=pick(pairs);const v=a==='km'?rnd(R(11,95)/10,1):b==='m'||b==='cm'&&a==='mm'?R(15,9500):rnd(R(12,999)/(l===1?10:100),2);const ans=clean(v*10**(U[a]-U[b]));
    return {q:`Reken om: <b>${N(v)} ${a}</b> = ? ${b}`,type:'num',answer:ans,unit:b,hint:'Trapje: km → (×1000) → m → (×10) → dm → (×10) → cm → (×10) → mm.',sol:steps([`1 ${a} = ${N(10**(U[a]-U[b]),9)} ${b}`,`${N(v)} × ${N(10**(U[a]-U[b]),9)} = ${N(ans,9)} ${b}`]),calc:false}}
  const m=rnd(R(12,48)/10,1),mm=R(5,95)*10,cm=R(3,40);const ans=m*1000+mm+cm*10;
  return {q:`Een kozijn bestaat uit delen van <b>${N(m)} m</b>, <b>${mm} mm</b> en <b>${cm} cm</b>. Wat is de totale lengte in mm?`,type:'num',answer:ans,unit:'mm',hint:'Reken eerst alles om naar dezelfde eenheid (mm).',sol:steps([`${N(m)} m = ${N(m*1000)} mm`,`${cm} cm = ${cm*10} mm`,`${N(m*1000)} + ${mm} + ${cm*10} = ${N(ans)} mm`]),calc:false};
}
function genOppervlak(l){
  const U={'mm²':-6,'cm²':-4,'dm²':-2,'m²':0,'ha':4};
  const pairs=l===1?[['m²','dm²'],['m²','cm²'],['dm²','m²'],['cm²','m²']]:l===2?[['mm²','cm²'],['cm²','mm²'],['m²','mm²'],['mm²','m²'],['cm²','m²']]:[['ha','m²'],['m²','ha'],['mm²','m²'],['m²','mm²']];
  const [a,b]=pick(pairs);const v=(U[a]<U[b])?R(2,99)*(a==='mm²'?1000:a==='cm²'?100:a==='dm²'?10:1):rnd(R(12,980)/100,2);
  const f=10**(U[a]-U[b]);const ans=clean(v*f);
  if(l===3&&Math.random()<.5){const lm=R(12,60)*100,bm=R(8,40)*100;const a2=lm*bm/1e6;return {q:`Een plaat heeft de afmetingen <b>${N(lm)} mm × ${N(bm)} mm</b>. Wat is de oppervlakte in m²?`,type:'num',answer:a2,unit:'m²',hint:'Reken de maten eerst om naar meters en vermenigvuldig dan.',sol:steps([`${N(lm)} mm = ${N(lm/1000)} m en ${N(bm)} mm = ${N(bm/1000)} m`,`${N(lm/1000)} × ${N(bm/1000)} = ${N(a2,6)} m²`]),fig:figRect(lm,bm,`${N(lm)}`,`${N(bm)}`),calc:true}}
  return {q:`Reken om: <b>${N(v)} ${a}</b> = ? ${b}`,type:'num',answer:ans,unit:b,hint:'Bij oppervlakte is de stap tussen m², dm², cm² en mm² telkens ×100 (want 10 × 10). 1 ha = 10 000 m².',sol:steps([`1 ${a} = ${N(f,9)} ${b}`,`${N(v)} × ${N(f,9)} = ${N(ans,9)} ${b}`]),calc:false};
}
function genInhoud(l){
  const U={'mm³':-9,'cm³':-6,'mL':-6,'dm³':-3,'L':-3,'m³':0};
  if(l===3&&Math.random()<.6){const a=R(4,15)*10,b=R(3,10)*10,c=R(3,12)*10;const L=a*b*c/1000;return {q:`Een waterreservoir is binnenwerks <b>${a} cm × ${b} cm × ${c} cm</b>. Hoeveel liter water past erin?`,type:'num',answer:L,unit:'L',hint:'Reken in dm: dan krijg je dm³, en 1 dm³ = 1 liter.',sol:steps([`In dm: ${N(a/10)} × ${N(b/10)} × ${N(c/10)} dm`,`Inhoud = ${N(L)} dm³ = ${N(L)} L`]),calc:true}}
  const pairs=l===1?[['m³','L'],['L','m³'],['dm³','L'],['m³','dm³']]:[['cm³','L'],['L','cm³'],['mL','L'],['m³','cm³'],['cm³','m³'],['mm³','cm³'],['L','mL']];
  const [a,b]=pick(pairs);const v=U[a]<U[b]?R(2,95)*100:rnd(R(12,980)/100,2);const f=10**(U[a]-U[b]);const ans=clean(v*f);
  return {q:`Reken om: <b>${N(v)} ${a}</b> = ? ${b}`,type:'num',answer:ans,unit:b,hint:'Bij inhoud is de stap ×1000 (10 × 10 × 10). Onthoud: 1 L = 1 dm³ en 1 mL = 1 cm³.',sol:steps([`1 ${a} = ${N(f,10)} ${b}`,`${N(v)} × ${N(f,10)} = ${N(ans,10)} ${b}`]),calc:false};
}
function genMassa(l){
  if(l===1){if(Math.random()<.5){const m=R(5,120)*5;return {q:`Een zak cement heeft een massa van <b>${m} kg</b>. Hoe groot is de zwaartekracht in N? (Gebruik g = 10 N/kg.)`,type:'num',answer:m*10,unit:'N',hint:'F = m · g',sol:steps([`F = m · g = ${m} × 10 = ${m*10} N`]),calc:false}}
    const k=rnd(R(5,250)/10,1);return {q:`Reken om: <b>${N(k)} kN</b> = ? N`,type:'num',answer:k*1000,unit:'N',hint:'k (kilo) = 1000',sol:steps([`${N(k)} × 1000 = ${N(k*1000)} N`]),calc:false}}
  if(l===2){if(Math.random()<.5){const m=R(15,980)*10;return {q:`Een stalen ligger heeft een massa van <b>${N(m)} kg</b>. Hoe groot is het gewicht in kN? (g = 10 N/kg)`,type:'num',answer:m*10/1000,unit:'kN',hint:'Eerst F = m · g in N, daarna delen door 1000.',sol:steps([`F = ${N(m)} × 10 = ${N(m*10)} N`,`${N(m*10)} N = ${N(m/100)} kN`,'Snelregel: 1 kN ≈ 100 kg'])}}
    const k=rnd(R(5,400)/10,1);return {q:`Een hijskraan tilt een last van <b>${N(k)} kN</b>. Wat is de massa in kg? (g = 10 N/kg)`,type:'num',answer:k*100,unit:'kg',hint:'m = F / g, met F in N.',sol:steps([`${N(k)} kN = ${N(k*1000)} N`,`m = ${N(k*1000)} / 10 = ${N(k*100)} kg`])}}
  const b=pick([200,250,300,350]),h=pick([400,450,500,600]),L=rnd(R(30,90)/10,1);const V=b/1000*h/1000*L;const G=V*2400*10/1000;
  return {q:`Een betonnen balk is ${b} × ${h} mm en <b>${N(L)} m</b> lang. Beton heeft een volumieke massa van 2400 kg/m³. Wat is het eigen gewicht van de balk in kN? (g = 10 N/kg)`,type:'num',answer:G,dec:2,unit:'kN',hint:'Volume (in m³) × 2400 geeft de massa in kg. Daarna × 10 / 1000 voor kN.',sol:steps([`V = ${N(b/1000)} × ${N(h/1000)} × ${N(L)} = ${N(V,4)} m³`,`m = ${N(V,4)} × 2400 = ${N(V*2400,1)} kg`,`G = ${N(V*2400,1)} × 10 = ${N(V*24000,0)} N = ${N(G,2)} kN`,'Snelweg: beton weegt 24 kN/m³, dus G = V × 24']),calc:true};
}
function genSpanningEenh(l){
  const U={'N/m²':0,'kN/m²':3,'N/mm²':6,'MPa':6,'kN/mm²':9,'GPa':9};
  const pairs=l===1?[['N/mm²','kN/m²'],['kN/m²','N/mm²'],['N/mm²','MPa']]:l===2?[['N/mm²','N/m²'],['kN/mm²','N/mm²'],['MPa','kN/m²'],['kN/m²','MPa']]:[['kN/m²','N/mm²'],['GPa','N/mm²'],['N/mm²','kN/mm²']];
  const [a,b]=pick(pairs);
  if(l===3&&Math.random()<.4){const E=pick([210000,200000,70000,11000,30000]);const nm={210000:'staal',200000:'roestvast staal',70000:'aluminium',11000:'naaldhout',30000:'beton'}[E];return {q:`De elasticiteitsmodulus van ${nm} is <b>${N(E)} N/mm²</b>. Hoeveel is dat in kN/mm²?`,type:'num',answer:E/1000,unit:'kN/mm²',hint:'1 kN = 1000 N',sol:steps([`${N(E)} N/mm² ÷ 1000 = ${N(E/1000)} kN/mm²`])}}
  const v=U[a]<U[b]?R(2,95)*pick([10,100,1000]):rnd(R(12,980)/10,1);const f=10**(U[a]-U[b]);const ans=clean(v*f);
  return {q:`Reken om: <b>${N(v)} ${a}</b> = ? ${b}`,type:'num',answer:ans,unit:b,hint:'1 N/mm² = 1 MPa = 1000 kN/m² = 1 000 000 N/m²',sol:steps([`1 ${a} = ${N(f,9)} ${b}`,`${N(v)} × ${N(f,9)} = ${N(ans,9)} ${b}`]),calc:false};
}

// ================= W-04 ALGEBRA =================
function genHaakjes(l){
  let q,right,wr;
  if(l===1){const a=R(2,9),b=nz(-9,9);q=`${a}(${polyStr([1,b])})`;right=polyStr([a,a*b]);wr=[polyStr([a,b]),polyStr([a,-a*b]),polyStr([1,a*b]),polyStr([a,a+b])]}
  else if(l===2){if(Math.random()<.5){const a=R(2,9),b=R(1,9);q=`−${a}(${polyStr([1,-b])})`;right=polyStr([-a,a*b]);wr=[polyStr([-a,-a*b]),polyStr([-a,-b]),polyStr([a,-a*b]),polyStr([-a,b])]}
    else{const p=nz(-7,7),r=nz(-7,7);q=`(${polyStr([1,p])})(${polyStr([1,r])})`;right=polyStr([1,p+r,p*r]);wr=[polyStr([1,0,p*r]),polyStr([1,p*r,p+r]),polyStr([1,p+r,p+r]),polyStr([1,p-r,p*r]),polyStr([2,p+r,p*r])]}}
  else{if(Math.random()<.5){const a=R(2,5),b=nz(-6,6);q=`(${polyStr([a,b])})²`;right=polyStr([a*a,2*a*b,b*b]);wr=[polyStr([a*a,0,b*b]),polyStr([a*a,a*b,b*b]),polyStr([a,2*a*b,b*b]),polyStr([2*a,2*a*b,2*b])]}
    else{const a=R(2,5),b=R(1,6),c=R(2,4),d=R(1,6);q=`(${polyStr([a,b])})(${polyStr([c,-d])})`;right=polyStr([a*c,-a*d+b*c,-b*d]);wr=[polyStr([a*c,0,-b*d]),polyStr([a*c,a*d+b*c,-b*d]),polyStr([a*c,-a*d+b*c,b*d]),polyStr([a+c,-a*d+b*c,-b*d])]}}
  return {q:`Werk de haakjes weg. Welke uitkomst is juist?<div class="expr">${q}</div>`,...mc(right,wr),hint:l===3?'(a + b)² = a² + 2ab + b². Vergeet de middelste term niet!':'Vermenigvuldig elke term binnen de haakjes met wat ervoor staat. Let op de tekens.',sol:steps([`Werk elke term uit en tel gelijksoortige termen op`,`${q} = ${right}`])};
}
function genVergelijking(l){
  let e,x,st;
  if(l===1){x=nz(-9,9);const a=R(2,9),b=nz(-15,15);const c=a*x+b;e=`${polyStr([a,b])} = ${N(c)}`;st=[`${b>0?'Haal '+b+' aan beide kanten eraf':'Tel '+(-b)+' aan beide kanten op'}: ${a}x = ${N(c-b)}`,`Deel door ${a}: x = ${N(x)}`]}
  else if(l===2){x=nz(-8,8);let a,c;do{a=nz(-6,9);c=nz(-6,9)}while(a===c);const b=nz(-12,12);const d=a*x+b-c*x;e=`${polyStr([a,b])} = ${polyStr([c,d])}`;
    st=[`Breng de x-termen naar links: ${polyStr([a-c,b])} = ${N(d)}`,`Constante naar rechts: ${polyStr([a-c,0])} = ${N(d-b)}`,`Deel door ${N(a-c)}: x = ${N(x)}`]}
  else{if(Math.random()<.5){x=nz(-8,8);const a=R(2,5),b=nz(-5,5);let c;do{c=R(2,6)}while(c===a);const d=(a*(x-b))/c-x;
      if(!Number.isInteger(d))return genVergelijking(l);
      e=`${a}(${polyStr([1,-b])}) = ${c}(${polyStr([1,d])})`;st=[`Haakjes wegwerken: ${polyStr([a,-a*b])} = ${polyStr([c,c*d])}`,`x-termen links, getallen rechts: ${polyStr([a-c,0])} = ${N(c*d+a*b)}`,`x = ${N(c*d+a*b)} ÷ ${P(a-c)} = ${N(x)}`]}
    else{const a=pick([2,3,4,5]);const b=nz(-6,6);const c=b+nz(-6,6);x=a*(c-b);e=`${Fh('x',a)} ${b<0?'−':'+'} ${Math.abs(b)} = ${N(c)}`;st=[`${b<0?'Tel '+(-b)+' op':'Haal '+b+' eraf'}: ${Fh('x',a)} = ${N(c-b)}`,`Vermenigvuldig met ${a}: x = ${N(x)}`]}}
  return {q:`Los op:<div class="expr">${e}</div>`,type:'num',answer:x,hint:'Balansmethode: doe aan beide kanten van het =-teken hetzelfde, tot x alleen staat.',sol:steps(st),calc:false};
}
function genInvullen(l){
  const T1=[
    ()=>{const lv=rnd(R(25,90)/10,1),b=rnd(R(20,60)/10,1);const v=lv*b;return {f:'A = l · b',g:`l = ${N(lv)} m en b = ${N(b)} m`,v,u:'m²',st:[`A = ${N(lv)} × ${N(b)} = ${N(v,2)} m²`]}},
    ()=>{const b=rnd(R(20,80)/10,1),h=rnd(R(15,50)/10,1);const v=0.5*b*h;return {f:'A = ½ · b · h',g:`b = ${N(b)} m en h = ${N(h)} m`,v,u:'m²',st:[`A = 0,5 × ${N(b)} × ${N(h)} = ${N(v,3)} m²`]}},
    ()=>{const d=pick([100,120,140,160,180,200]),lam=pick([0.022,0.035,0.036]);const v=d/1000/lam;return {f:'R = d / λ',g:`d = ${N(d/1000)} m en λ = ${N(lam)} W/(m·K)`,v,u:'m²K/W',st:[`R = ${N(d/1000)} / ${N(lam)} = ${N(v,3)} m²K/W`]}}];
  const T2=[
    ()=>{const Fk=R(20,400),b=pick([100,150,200,250]),h=pick([100,150,200,300]);const v=Fk*1000/(b*h);return {f:'σ = F / A',g:`F = ${N(Fk*1000)} N en A = ${N(b*h)} mm²`,v,u:'N/mm²',st:[`σ = ${N(Fk*1000)} / ${N(b*h)} = ${N(v,3)} N/mm²`]}},
    ()=>{const r=rnd(R(10,40)/100,2),h=rnd(R(25,40)/10,1);const v=Math.PI*r*r*h;return {f:'V = π · r² · h',g:`r = ${N(r)} m en h = ${N(h)} m`,v,u:'m³',st:[`V = π × ${N(r)}² × ${N(h)}`,`= π × ${N(r*r,4)} × ${N(h)} = ${N(v,4)} m³`]}},
    ()=>{const a=rnd(R(20,60)/10,1),b=rnd(R(20,60)/10,1);const v=(a+b)/2*rnd(R(15,30)/10,1);return null}];
  const T3=[
    ()=>{const q=rnd(R(30,150)/10,1),L=rnd(R(40,90)/10,1);const v=q*L*L/8;return {f:'M = ⅛ · q · L²',g:`q = ${N(q)} kN/m en L = ${N(L)} m`,v,u:'kNm',st:[`L² = ${N(L)}² = ${N(L*L,2)}`,`M = ${N(q)} × ${N(L*L,2)} / 8 = ${N(v,3)} kNm`]}},
    ()=>{const a=rnd(R(20,60)/10,1),b=rnd(R(20,60)/10,1);const v=Math.sqrt(a*a+b*b);return {f:'c = √(a² + b²)',g:`a = ${N(a)} m en b = ${N(b)} m`,v,u:'m',st:[`a² + b² = ${N(a*a,2)} + ${N(b*b,2)} = ${N(a*a+b*b,2)}`,`c = √${N(a*a+b*b,2)} = ${N(v,3)} m`]}},
    ()=>{const Rc=pick([3.7,4.7,5.0,6.3]);const v=1/(0.17+Rc);return {f:'U = 1 / (0,17 + R<sub>c</sub>)',g:`R<sub>c</sub> = ${N(Rc)} m²K/W`,v,u:'W/(m²K)',st:[`0,17 + ${N(Rc)} = ${N(0.17+Rc)}`,`U = 1 / ${N(0.17+Rc)} = ${N(v,4)} W/(m²K)`]}}];
  let o=null;while(!o)o=pick(l===1?T1:l===2?T2:T3)();
  return {q:`Gegeven de formule <span class="formula">${o.f}</span> met ${o.g}. Bereken de uitkomst en rond af op 2 decimalen.`,type:'num',answer:o.v,dec:2,unit:o.u,hint:'Vul de getallen in en reken stap voor stap. Let op de volgorde van bewerkingen.',sol:steps(o.st)};
}
const OMWERK=[
  {l:1,f:'F = m · a',t:'m',r:`m = ${Fh('F','a')}`,w:['m = F · a',`m = ${Fh('a','F')}`,'m = F − a']},
  {l:1,f:`σ = ${Fh('F','A')}`,t:'A',r:`A = ${Fh('F','σ')}`,w:['A = σ · F',`A = ${Fh('σ','F')}`,'A = F − σ']},
  {l:1,f:'V = l · b · h',t:'h',r:`h = ${Fh('V','l · b')}`,w:['h = V − l − b','h = V · l · b',`h = ${Fh('l · b','V')}`]},
  {l:1,f:`R = ${Fh('d','λ')}`,t:'d',r:'d = R · λ',w:[`d = ${Fh('R','λ')}`,`d = ${Fh('λ','R')}`,'d = R − λ']},
  {l:1,f:'M = F · a',t:'a',r:`a = ${Fh('M','F')}`,w:['a = M · F',`a = ${Fh('F','M')}`,'a = M − F']},
  {l:2,f:'P = 2(l + b)',t:'l',r:`l = ${Fh('P','2')} − b`,w:[`l = ${Fh('P','2')} + b`,'l = 2P − b',`l = ${Fh('P − b','2')}`]},
  {l:2,f:'A = ½ · b · h',t:'h',r:`h = ${Fh('2A','b')}`,w:[`h = ${Fh('A','2b')}`,`h = ${Fh('2b','A')}`,'h = A − ½b']},
  {l:2,f:'y = ax + b',t:'x',r:`x = ${Fh('y − b','a')}`,w:[`x = ${Fh('y','a')} − b`,`x = ${Fh('y + b','a')}`,'x = a(y − b)']},
  {l:2,f:`U = ${Fh('1','R')}`,t:'R',r:`R = ${Fh('1','U')}`,w:['R = U','R = 1 − U','R = U − 1']},
  {l:2,f:'Φ = U · A · ΔT',t:'ΔT',r:`ΔT = ${Fh('Φ','U · A')}`,w:['ΔT = Φ − U − A',`ΔT = ${Fh('U · A','Φ')}`,'ΔT = Φ · U · A']},
  {l:3,f:'V = π r² h',t:'r',r:`r = √${'('+Fh('V','π h')+')'}`,w:[`r = ${Fh('V','π h')}`,`r = (${Fh('V','π h')})²`,`r = √(V − π h)`]},
  {l:3,f:`M = ${Fh('q L²','8')}`,t:'L',r:`L = √${'('+Fh('8M','q')+')'}`,w:[`L = ${Fh('8M','q')}`,`L = √${'('+Fh('M q','8')+')'}`,`L = (${Fh('8M','q')})²`]},
  {l:3,f:'c² = a² + b²',t:'a',r:'a = √(c² − b²)',w:['a = c − b','a = √(c² + b²)','a = c² − b²']},
  {l:3,f:`U = ${Fh('1','R<sub>si</sub> + R<sub>c</sub> + R<sub>se</sub>')}`,t:'R<sub>c</sub>',r:`R<sub>c</sub> = ${Fh('1','U')} − R<sub>si</sub> − R<sub>se</sub>`,w:['R<sub>c</sub> = U − R<sub>si</sub> − R<sub>se</sub>',`R<sub>c</sub> = ${Fh('1','U − R<sub>si</sub> − R<sub>se</sub>')}`,`R<sub>c</sub> = ${Fh('1','U')} + R<sub>si</sub> + R<sub>se</sub>`]},
];
function genOmwerken(l){
  const it=pick(OMWERK.filter(o=>o.l===l));
  return {q:`Schrijf de formule om zodat <b>${it.t}</b> vrij komt te staan.<div class="expr">${it.f}</div>`,...mc(it.r,it.w),hint:'Doe aan beide kanten hetzelfde. Gebruik de omgekeerde bewerking: × wordt ÷, + wordt −, ² wordt √.',sol:steps([`Werk de bewerkingen rond ${it.t} één voor één weg met de omgekeerde bewerking`,`Uitkomst: ${it.r}`])};
}

// ================= W-05 LINEAIR =================
function genRc(l){
  if(l===1){const a=nz(-4,4),x1=R(-5,2),x2=x1+R(1,4),y1=R(-6,6),y2=y1+a*(x2-x1);
    return {q:`Een lijn gaat door de punten (${x1}, ${y1}) en (${x2}, ${y2}). Bereken de richtingscoëfficiënt a.`,type:'num',answer:a,hint:'a = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)',sol:steps([`Δy = ${y2} − ${P(y1)} = ${N(y2-y1)}`,`Δx = ${x2} − ${P(x1)} = ${N(x2-x1)}`,`a = ${N(y2-y1)} / ${N(x2-x1)} = ${N(a)}`]),fig:figPlot([[x1,y1],[x2,y2]],[a,y1-a*x1]),calc:false}}
  if(l===2){const x1=R(-4,2),x2=x1+R(2,5),y1=R(-5,5);let dy;do{dy=nz(-9,9)}while(dy%(x2-x1)===0);const y2=y1+dy;const a=dy/(x2-x1);
    return {q:`Een lijn gaat door de punten (${x1}, ${y1}) en (${x2}, ${y2}). Bereken de richtingscoëfficiënt a. Rond af op 2 decimalen.`,type:'num',answer:a,dec:2,hint:'a = Δy / Δx',sol:steps([`Δy = ${N(dy)}, Δx = ${x2-x1}`,`a = ${N(dy)} / ${x2-x1} = ${N(a,2)}`]),fig:figPlot([[x1,y1],[x2,y2]],[a,y1-a*x1])}}
  const a=nz(-4,4),b=nz(-8,8),x1=R(-4,1),x2=x1+R(1,4);const y1=a*x1+b,y2=a*x2+b;
  return {q:`Een lijn gaat door (${x1}, ${y1}) en (${x2}, ${y2}). De formule is y = ax + b. Bereken <b>b</b>.`,type:'num',answer:b,hint:'Bereken eerst a. Vul daarna één punt in: y₁ = a · x₁ + b.',sol:steps([`a = (${y2} − ${P(y1)}) / (${x2} − ${P(x1)}) = ${N(a)}`,`Punt (${x1}, ${y1}) invullen: ${y1} = ${N(a)} × ${P(x1)} + b`,`b = ${y1} − ${P(a*x1)} = ${N(b)}`]),fig:figPlot([[x1,y1],[x2,y2]],[a,b]),calc:false};
}
function genLinFormule(l){
  if(l===1){const a=pick([65,75,85,95,110]),b=pick([150,200,250,300]),x=R(3,20);const v=a*x+b;
    return {q:`De huur van een steiger kost K = ${a} · d + ${b} euro, met d het aantal dagen. Wat kost ${x} dagen huur?`,type:'num',answer:v,unit:'€',unitPre:true,hint:'Vul d in in de formule.',sol:steps([`K = ${a} × ${x} + ${b}`,`= ${a*x} + ${b} = € ${N(v)}`])}}
  if(l===2){const a=pick([65,75,85,95,110]),b=pick([150,200,250,300]),budget=R(8,30)*100;const x=(budget-b)/a;
    return {q:`De huur van een steiger kost K = ${a} · d + ${b} euro. Hoeveel dagen kun je huren voor € ${N(budget)}? Rond af op 1 decimaal.`,type:'num',answer:x,dec:1,unit:'dagen',hint:'Stel de formule gelijk aan het budget en los d op.',sol:steps([`${a}d + ${b} = ${budget}`,`${a}d = ${budget-b}`,`d = ${budget-b} / ${a} = ${N(x,2)} dagen`])}}
  let a1,a2;do{a1=nz(-5,5);a2=nz(-5,5)}while(a1===a2);const b1=nz(-10,10),b2=nz(-10,10);const x=(b2-b1)/(a1-a2);
  return {q:`Bereken de x-coördinaat van het snijpunt van de lijnen <span class="formula">y = ${polyStr([a1,b1])}</span> en <span class="formula">y = ${polyStr([a2,b2])}</span>. Rond af op 2 decimalen.`,type:'num',answer:x,dec:2,hint:'In het snijpunt is y gelijk. Stel de twee formules aan elkaar gelijk.',sol:steps([`${polyStr([a1,b1])} = ${polyStr([a2,b2])}`,`${polyStr([a1-a2,0])} = ${N(b2-b1)}`,`x = ${N(b2-b1)} / ${P(a1-a2)} = ${N(x,3)}`])};
}
function genAfschot(l){
  if(l===1){const L=rnd(R(40,150)/10,1);const p=pick([1,1.5,1.6,2,2.5]);const h=Math.round(L*p*10);const v=h/(L*1000)*100;
    return {q:`Een plat dak is <b>${N(L)} m</b> diep. Het hoogteverschil tussen de hoge en de lage kant is <b>${h} mm</b>. Hoe groot is het afschot in procenten?`,type:'num',answer:v,dec:2,unit:'%',hint:'Afschot (%) = hoogteverschil / horizontale lengte × 100%. Zet beide in dezelfde eenheid!',sol:steps([`${h} mm = ${N(h/1000)} m`,`${N(h/1000)} / ${N(L)} × 100% = ${N(v,2)}%`])}}
  if(l===2){const L=rnd(R(40,140)/10,1),p=pick([1.6,2,1.5,1.8]);const v=L*1000*p/100;
    return {q:`Een plat dak krijgt een afschot van <b>${N(p)}%</b> over een lengte van <b>${N(L)} m</b>. Hoeveel mm hoogteverschil is dat?`,type:'num',answer:v,dec:0,unit:'mm',hint:`${N(p)}% betekent ${N(p*10)} mm per meter.`,sol:steps([`${N(p)}% = ${N(p*10)} mm per m`,`${N(p*10)} × ${N(L)} = ${N(v,1)} mm`])}}
  const n=pick([50,100,200]),L=R(6,30);const v=L*1000/n;
  return {q:`Een rioolbuis ligt onder een afschot van <b>1 : ${n}</b> en is <b>${L} m</b> lang. Hoeveel mm hoger ligt het begin dan het eind?`,type:'num',answer:v,dec:0,unit:'mm',hint:`1 : ${n} betekent 1 mm hoogteverschil per ${n} mm lengte.`,sol:steps([`Lengte in mm: ${L*1000} mm`,`${L*1000} / ${n} = ${N(v,1)} mm`,`Ter vergelijking: 1 : ${n} = ${N(100/n)}% = ${N(1000/n)} mm/m`])};
}
function genTrap(l){
  const h=R(255,300)*10;
  if(l===1){const n=R(14,16);const v=h/n;return {q:`Een verdiepingshoogte (vloer tot vloer) is <b>${N(h)} mm</b>. De trap krijgt <b>${n}</b> optredes. Hoe hoog is één optrede? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'mm',hint:'Alle optredes samen overbruggen de verdiepingshoogte.',sol:steps([`optrede = ${N(h)} / ${n} = ${N(v,2)} mm`]),fig:figStair('o','a')}}
  const n=Math.ceil(h/188);
  if(l===2){return {q:`Een verdiepingshoogte is <b>${N(h)} mm</b>. Een optrede mag in een woning maximaal <b>188 mm</b> zijn. Hoeveel optredes heb je minimaal nodig?`,type:'num',answer:n,unit:'optredes',hint:'Deel en rond altijd naar boven af: anders wordt de optrede te hoog.',sol:steps([`${N(h)} / 188 = ${N(h/188,2)}`,`Naar boven afronden: ${n} optredes`,`Controle: ${N(h)} / ${n} = ${N(h/n,1)} mm ≤ 188 mm ✓`]),fig:figStair('o','a')}}
  const o=h/n;const a=630-2*o;
  return {q:`Een trap overbrugt <b>${N(h)} mm</b> met <b>${n}</b> optredes. Gebruik de stapmaatregel <span class="formula">2o + a = 630 mm</span>. Hoe groot wordt de aantrede a? Rond af op 1 decimaal.`,type:'num',answer:a,dec:1,unit:'mm',hint:'Bereken eerst de optrede o, vul dan in: a = 630 − 2o.',sol:steps([`o = ${N(h)} / ${n} = ${N(o,2)} mm`,`a = 630 − 2 × ${N(o,2)} = ${N(a,1)} mm`,`Controle: a ≥ 220 mm (eis woning) ${a>=220?'✓':'✗'}`]),fig:figStair('o','a')};
}

// ================= W-06 MEETKUNDE =================
function genOpp(l){
  if(l===1){if(Math.random()<.5){const a=rnd(R(25,90)/10,1),b=rnd(R(20,60)/10,1);const v=a*b;return {q:`Een kamer is <b>${N(a)} m</b> lang en <b>${N(b)} m</b> breed. Hoeveel m² vloer heeft de kamer?`,type:'num',answer:v,dec:2,unit:'m²',hint:'A = l × b',sol:steps([`A = ${N(a)} × ${N(b)} = ${N(v,2)} m²`]),fig:figRect(a,b,`${N(a)} m`,`${N(b)} m`)}}
    const b=rnd(R(30,90)/10,1),h=rnd(R(15,40)/10,1);const v=b*h/2;return {q:`Een driehoekige geveltop heeft een basis van <b>${N(b)} m</b> en een hoogte van <b>${N(h)} m</b>. Bereken de oppervlakte.`,type:'num',answer:v,dec:2,unit:'m²',hint:'A = ½ × basis × hoogte',sol:steps([`A = ½ × ${N(b)} × ${N(h)} = ${N(v,3)} m²`]),fig:figTri(b,h,`${N(b)} m`,`${N(h)} m`)}}
  if(l===2){const t=R(1,3);
    if(t===1){const d=R(30,120)*10;const r=d/2/1000;const v=Math.PI*r*r;return {q:`Een ronde kolom heeft een diameter van <b>${d} mm</b>. Bereken het doorsnede-oppervlak in m². Rond af op 4 decimalen.`,type:'num',answer:v,dec:4,unit:'m²',hint:'A = π · r². Let op: r is de helft van de diameter, en reken eerst om naar m.',sol:steps([`r = ${d} / 2 = ${d/2} mm = ${N(r)} m`,`A = π × ${N(r)}² = ${N(v,5)} m²`]),fig:figCircle(`d = ${d} mm`)}}
    if(t===2){const a=rnd(R(40,90)/10,1),b=rnd(R(20,a*10-5)/10,1),h=rnd(R(20,50)/10,1);const v=(a+b)/2*h;return {q:`Bereken de oppervlakte van dit trapeziumvormige perceel.`,type:'num',answer:v,dec:2,unit:'m²',hint:'A = ½ × (a + b) × h',sol:steps([`A = ½ × (${N(a)} + ${N(b)}) × ${N(h)}`,`= ${N((a+b)/2,2)} × ${N(h)} = ${N(v,3)} m²`]),fig:figTrap(a,b,h,`${N(a)} m`,`${N(b)} m`,`${N(h)} m`)}}
    const a=R(18,60)*100,b=R(12,40)*100;const v=a*b/1e6;return {q:`Op een tekening staat een vloerveld van <b>${N(a)} × ${N(b)}</b> (maten in mm). Wat is de oppervlakte in m²?`,type:'num',answer:v,dec:2,unit:'m²',hint:'Reken de maten eerst om naar meters.',sol:steps([`${N(a)} mm = ${N(a/1000)} m; ${N(b)} mm = ${N(b/1000)} m`,`A = ${N(a/1000)} × ${N(b/1000)} = ${N(v,3)} m²`]),fig:figRect(a,b,N(a),N(b))}}
  const W=R(70,120)*100,H=R(50,90)*100,cw=R(20,Math.floor(W/200))*100,ch=R(15,Math.floor(H/200))*100;const v=(W*H-cw*ch)/1e6;
  return {q:`Bereken de vloeroppervlakte van deze L-vormige plattegrond in m² (maten in mm).`,type:'num',answer:v,dec:2,unit:'m²',hint:'Neem de omhullende rechthoek en trek het ontbrekende hoekstuk af. De maten van het hoekstuk volgen uit de gegeven maten.',sol:steps([`Omhullende rechthoek: ${N(W/1000)} × ${N(H/1000)} = ${N(W*H/1e6,3)} m²`,`Hoekstuk: (${N(W/1000)} − ${N((W-cw)/1000)}) × (${N(H/1000)} − ${N((H-ch)/1000)}) = ${N(cw/1000)} × ${N(ch/1000)} = ${N(cw*ch/1e6,3)} m²`,`A = ${N(W*H/1e6,3)} − ${N(cw*ch/1e6,3)} = ${N(v,3)} m²`]),fig:figL(W,H,cw,ch,N(W),N(H),N(W-cw),N(H-ch))};
}
function genOmtrek(l){
  if(l===1){const a=rnd(R(25,90)/10,1),b=rnd(R(20,60)/10,1);const v=2*(a+b);return {q:`Rondom een kamer van <b>${N(a)} × ${N(b)} m</b> komt een plint. Hoeveel meter plint is nodig (zonder deuropening)?`,type:'num',answer:v,dec:2,unit:'m',hint:'Omtrek rechthoek = 2 × (l + b)',sol:steps([`O = 2 × (${N(a)} + ${N(b)}) = ${N(v,2)} m`]),fig:figRect(a,b,`${N(a)} m`,`${N(b)} m`)}}
  if(l===2){const d=rnd(R(10,60)/10,1);const v=Math.PI*d;return {q:`Een rond plantvak heeft een diameter van <b>${N(d)} m</b>. Hoe lang wordt de opsluitband eromheen? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m',hint:'Omtrek cirkel = π × d = 2 × π × r',sol:steps([`O = π × ${N(d)} = ${N(v,3)} m`]),fig:figCircle(`d = ${N(d)} m`)}}
  const W=R(70,120)*100,H=R(50,90)*100,cw=R(20,Math.floor(W/200))*100,ch=R(15,Math.floor(H/200))*100;const v=2*(W+H)/1000;
  return {q:`Bereken de omtrek van deze L-vormige plattegrond in meter (maten in mm).`,type:'num',answer:v,dec:2,unit:'m',hint:'Truc: schuif de ingesprongen zijden naar buiten. De omtrek van een L-vorm is gelijk aan die van de omhullende rechthoek.',sol:steps([`De twee ingesprongen zijden zijn samen even lang als de ontbrekende stukken van de rechthoek`,`O = 2 × (${N(W/1000)} + ${N(H/1000)}) = ${N(v,2)} m`]),fig:figL(W,H,cw,ch,N(W),N(H),N(W-cw),N(H-ch))};
}
function genInhoudM(l){
  if(l===1){const a=rnd(R(10,40)/10,1),b=rnd(R(5,20)/10,1),c=rnd(R(5,20)/10,1);const v=a*b*c;return {q:`Een bouwput is <b>${N(a)} m</b> lang, <b>${N(b)} m</b> breed en <b>${N(c)} m</b> diep. Hoeveel m³ grond moet worden afgegraven?`,type:'num',answer:v,dec:3,unit:'m³',hint:'V = l × b × h',sol:steps([`V = ${N(a)} × ${N(b)} × ${N(c)} = ${N(v,3)} m³`]),fig:figBox(`${N(a)} m`,`${N(b)} m`,`${N(c)} m`)}}
  if(l===2){const a=rnd(R(50,120)/10,1),b=rnd(R(40,90)/10,1),d=pick([120,150,180,200,220,250]);const v=a*b*d/1000;return {q:`Een betonvloer is <b>${N(a)} × ${N(b)} m</b> en <b>${d} mm</b> dik. Hoeveel m³ beton is nodig? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m³',hint:'Zet de dikte om naar meters!',sol:steps([`${d} mm = ${N(d/1000)} m`,`V = ${N(a)} × ${N(b)} × ${N(d/1000)} = ${N(v,3)} m³`]),fig:figBox(`${N(a)} m`,`${N(b)} m`,`${d} mm`)}}
  const d=pick([250,300,350,400,450]),h=rnd(R(26,40)/10,1),n=R(4,12);const r=d/2000;const v=n*Math.PI*r*r*h;
  return {q:`Er worden <b>${n}</b> ronde betonkolommen gestort met een diameter van <b>${d} mm</b> en een hoogte van <b>${N(h)} m</b>. Hoeveel m³ beton is nodig in totaal? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m³',hint:'V cilinder = π · r² · h. Vermenigvuldig daarna met het aantal kolommen.',sol:steps([`r = ${d}/2 mm = ${N(r)} m`,`V per kolom = π × ${N(r)}² × ${N(h)} = ${N(Math.PI*r*r*h,4)} m³`,`Totaal: ${n} × ${N(Math.PI*r*r*h,4)} = ${N(v,3)} m³`]),fig:figCircle(`d = ${d} mm`)};
}
function genPyth(l){
  if(l===1){let a,b;if(Math.random()<.5){const [p,q]=pick([[3,4],[5,12],[6,8],[8,15]]);const k=pick([1,1,2]);a=p*k/(p>5?1:1);b=q*k;}else{a=rnd(R(15,60)/10,1);b=rnd(R(15,60)/10,1)}const v=Math.hypot(a,b);
    return {q:`In een rechthoekige driehoek zijn de rechthoekszijden <b>${N(a)} m</b> en <b>${N(b)} m</b>. Bereken de schuine zijde. Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m',hint:'a² + b² = c²',sol:steps([`c² = ${N(a)}² + ${N(b)}² = ${N(a*a,2)} + ${N(b*b,2)} = ${N(a*a+b*b,2)}`,`c = √${N(a*a+b*b,2)} = ${N(v,3)} m`]),fig:figRightTri(a,b,{adj:`${N(a)} m`,opp:`${N(b)} m`,hyp:'?'})}}
  if(l===2){const c=rnd(R(40,80)/10,1),a=rnd(R(8,Math.floor(c*10*0.45))/10,1);const v=Math.sqrt(c*c-a*a);
    return {q:`Een ladder van <b>${N(c)} m</b> staat tegen een gevel. De voet staat <b>${N(a)} m</b> van de gevel. Hoe hoog reikt de ladder tegen de gevel? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m',hint:'De ladder is de schuine zijde: b = √(c² − a²)',sol:steps([`h² = ${N(c)}² − ${N(a)}² = ${N(c*c,2)} − ${N(a*a,2)} = ${N(c*c-a*a,2)}`,`h = √${N(c*c-a*a,2)} = ${N(v,3)} m`]),fig:figRightTri(a,v,{adj:`${N(a)} m`,opp:'?',hyp:`${N(c)} m`})}}
  if(Math.random()<.5){const a=R(40,90)*100,b=R(30,70)*100;const v=Math.hypot(a,b);
    return {q:`Je zet op de bouwplaats een rechthoekige fundering uit van <b>${N(a)} × ${N(b)} mm</b>. Hoe lang moet de diagonaal zijn als de hoeken precies haaks zijn? Rond af op hele mm.`,type:'num',answer:v,dec:0,unit:'mm',hint:'Een haakse rechthoek heeft diagonaal √(l² + b²). Zo controleer je haaksheid (ook de 3-4-5-methode).',sol:steps([`d = √(${N(a)}² + ${N(b)}²)`,`= √${N(a*a+b*b)} = ${N(v,1)} mm`]),fig:figRect(a,b,N(a),N(b))}}
  const a=rnd(R(30,70)/10,1),b=rnd(R(25,50)/10,1),h=rnd(R(24,30)/10,1);const v=Math.sqrt(a*a+b*b+h*h);
  return {q:`Een kamer is <b>${N(a)} × ${N(b)} m</b> en <b>${N(h)} m</b> hoog. Hoe lang is de ruimtediagonaal (van hoek op de vloer naar de tegenoverliggende hoek aan het plafond)? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m',hint:'Eerst de vloerdiagonaal, dan nog een keer Pythagoras met de hoogte. Of direct: √(l² + b² + h²).',sol:steps([`Vloerdiagonaal² = ${N(a*a,2)} + ${N(b*b,2)} = ${N(a*a+b*b,2)}`,`Ruimtediagonaal = √(${N(a*a+b*b,2)} + ${N(h*h,2)}) = ${N(v,3)} m`]),fig:figBox(`${N(a)} m`,`${N(b)} m`,`${N(h)} m`)};
}

// ================= W-07 GONIOMETRIE =================
const SNAME={hyp:'schuine zijde (AB)',opp:'overstaande rechthoekszijde (BC)',adj:'aanliggende rechthoekszijde (AC)'};
function genGonioZijde(l){
  const a=R(20,70),t=a*D2R;
  const combos=l===1?[['hyp','opp'],['hyp','adj']]:l===2?[['adj','opp'],['opp','hyp'],['adj','hyp']]:[['opp','adj'],['hyp','opp'],['adj','hyp'],['opp','hyp'],['hyp','adj']];
  const [known,want]=pick(combos);const kv=rnd(R(20,120)/10,1);
  let hyp,opp,adj;
  if(known==='hyp'){hyp=kv;opp=hyp*Math.sin(t);adj=hyp*Math.cos(t)}
  if(known==='opp'){opp=kv;hyp=opp/Math.sin(t);adj=opp/Math.tan(t)}
  if(known==='adj'){adj=kv;hyp=adj/Math.cos(t);opp=adj*Math.tan(t)}
  const val={hyp,opp,adj}[want];
  const lab=s=>s===known?`${N(kv)} m`:s===want?'?':'';
  const pair=[known,want].sort().join('-');const fn=pair==='adj-hyp'?'cos':pair==='hyp-opp'?'sin':'tan';
  const def={sin:`sin α = ${Fh('O','S')}`,cos:`cos α = ${Fh('A','S')}`,tan:`tan α = ${Fh('O','A')}`}[fn];
  const S={hyp:'S',opp:'O',adj:'A'};let calc;
  const k=S[known],w=S[want];
  if((fn==='sin'&&want==='opp')||(fn==='cos'&&want==='adj')||(fn==='tan'&&want==='opp'))calc=`${w} = ${k} · ${fn} α = ${N(kv)} × ${fn}(${a}°)`;
  else calc=`${w} = ${Fh(k,fn+' α')} = ${N(kv)} / ${fn}(${a}°)`;
  return {q:`In driehoek ABC is hoek C recht en hoek <b>α = ${a}°</b> (bij A). De ${SNAME[known]} is <b>${N(kv)} m</b>. Bereken de ${SNAME[want]}. Rond af op 2 decimalen.`,type:'num',answer:val,dec:2,unit:'m',hint:`Welke twee zijden ken je / zoek je, gezien vanuit α? SOS · CAS · TOA. Hier gebruik je ${fn}.`,sol:steps([`Bekend: ${k}, gezocht: ${w} → ${fn.toUpperCase()} (${def})`,calc,`= ${N(val,3)} m`]),fig:figRightTri(adj,opp,{adj:lab('adj'),opp:lab('opp'),hyp:lab('hyp'),ang:`${a}°`})};
}
function genGonioHoek(l){
  const combos=l===1?[['opp','adj']]:l===2?[['opp','hyp'],['adj','hyp']]:[['opp','adj'],['opp','hyp'],['adj','hyp']];
  const [s1,s2]=pick(combos);let opp,adj,hyp;
  if(s1==='opp'&&s2==='adj'){opp=rnd(R(10,60)/10,1);adj=rnd(R(10,60)/10,1);hyp=Math.hypot(opp,adj)}
  else{hyp=rnd(R(40,90)/10,1);const o=rnd(R(10,Math.floor(hyp*10-5))/10,1);if(s1==='opp'){opp=o;adj=Math.sqrt(hyp*hyp-o*o)}else{adj=o;opp=Math.sqrt(hyp*hyp-o*o)}}
  const ang=Math.atan2(opp,adj)/D2R;const v={opp,adj,hyp};
  const fn=s2==='adj'?'tan':s1==='opp'?'sin':'cos';const S={hyp:'S',opp:'O',adj:'A'};
  const lab=s=>s===s1||s===s2?`${N(v[s])} m`:'';
  return {q:`In de rechthoekige driehoek ABC (hoek C recht) is de ${SNAME[s1]} <b>${N(v[s1])} m</b> en de ${SNAME[s2]} <b>${N(v[s2])} m</b>. Bereken hoek α bij A in graden. Rond af op 1 decimaal.`,type:'num',answer:ang,dec:1,unit:'°',hint:`Gebruik de inverse functie (${fn}⁻¹). Zet je rekenmachine op graden (DEG).`,sol:steps([`${fn} α = ${Fh(S[s1],S[s2])} = ${N(v[s1])} / ${N(v[s2])} = ${N(v[s1]/v[s2],4)}`,`α = ${fn}⁻¹(${N(v[s1]/v[s2],4)}) = ${N(ang,2)}°`]),fig:figRightTri(adj,opp,{adj:lab('adj'),opp:lab('opp'),hyp:lab('hyp'),ang:'α = ?'})};
}
function genDak(l){
  const b=rnd(R(60,120)/10,1),a=R(25,55);const half=b/2;
  if(l===1){const h=half*Math.tan(a*D2R);return {q:`Een zadeldak overspant <b>${N(b)} m</b> (van muurplaat tot muurplaat) en heeft een dakhelling van <b>${a}°</b>. Hoe hoog ligt de nok boven de muurplaat? Rond af op 2 decimalen.`,type:'num',answer:h,dec:2,unit:'m',hint:'Kijk naar de halve overspanning: tan α = h / (½b).',sol:steps([`Halve overspanning: ${N(b)} / 2 = ${N(half)} m`,`h = ${N(half)} × tan(${a}°) = ${N(h,3)} m`]),fig:figRoof(`${N(b)} m`,'h = ?','',`${a}°`,a)}}
  if(l===2){const s=half/Math.cos(a*D2R);return {q:`Een zadeldak overspant <b>${N(b)} m</b> met een helling van <b>${a}°</b>. Hoe lang wordt een dakspant (spar) van muurplaat tot nok, zonder overstek? Rond af op 2 decimalen.`,type:'num',answer:s,dec:2,unit:'m',hint:'De spar is de schuine zijde: cos α = (½b) / spar.',sol:steps([`½b = ${N(half)} m`,`spar = ${N(half)} / cos(${a}°) = ${N(s,3)} m`]),fig:figRoof(`${N(b)} m`,'','spar = ?',`${a}°`,a)}}
  if(Math.random()<.5){const p=R(10,120);const v=Math.atan(p/100)/D2R;return {q:`Een helling is <b>${p}%</b>. Hoeveel graden is dat? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'°',hint:'Een helling van p% betekent tan α = p / 100.',sol:steps([`tan α = ${p}/100 = ${N(p/100)}`,`α = tan⁻¹(${N(p/100)}) = ${N(v,2)}°`,'Let op: 100% is 45°, niet 90°!'])}}
  const g=R(5,60);const v=Math.tan(g*D2R)*100;return {q:`Een hellingbaan of dak heeft een hoek van <b>${g}°</b>. Hoeveel procent is die helling? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'%',hint:'Helling in % = tan α × 100',sol:steps([`tan(${g}°) = ${N(Math.tan(g*D2R),4)}`,`× 100 = ${N(v,2)}%`])};
}

// ================= W-08 SCHAAL =================
function genSchaalTW(l){
  if(l<3){const n=l===1?100:pick([20,50,200,50]);const mm=rnd(R(150,2400)/10,1);const v=mm*n/1000;
    return {q:`Op een tekening met schaal <b>1:${n}</b> meet je een wand van <b>${N(mm)} mm</b>. Hoe lang is de wand in werkelijkheid (in meter)?`,type:'num',answer:v,dec:3,unit:'m',hint:`1:${n} betekent: 1 mm op papier = ${n} mm in het echt.`,sol:steps([`Werkelijk = ${N(mm)} × ${n} = ${N(mm*n)} mm`,`= ${N(v,4)} m`])}}
  const n=pick([50,100,200]),cm2=R(12,180);const v=cm2*n*n/1e4;
  return {q:`Op een plattegrond met schaal <b>1:${n}</b> heeft een ruimte een oppervlakte van <b>${cm2} cm²</b>. Hoe groot is de ruimte in werkelijkheid (in m²)?`,type:'num',answer:v,dec:2,unit:'m²',hint:`Lengtes zijn ${n}× zo groot, oppervlaktes dus ${n}² = ${N(n*n)}× zo groot.`,sol:steps([`Factor voor oppervlakte: ${n}² = ${N(n*n)}`,`${cm2} cm² × ${N(n*n)} = ${N(cm2*n*n)} cm²`,`${N(cm2*n*n)} cm² ÷ 10 000 = ${N(v,3)} m²`])};
}
function genSchaalWT(l){
  const n=l===1?100:pick([20,50,200]);const m=l===1?rnd(R(20,150)/10,1):rnd(R(80,4000)/1000,3);const v=m*1000/n;
  return {q:`Een kozijn is in werkelijkheid <b>${N(m)} m</b> breed. Hoe breed teken je het op schaal <b>1:${n}</b> (in mm)? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'mm',hint:'Tekenmaat = werkelijke maat ÷ schaalgetal. Werk in mm.',sol:steps([`${N(m)} m = ${N(m*1000)} mm`,`${N(m*1000)} / ${n} = ${N(v,2)} mm`])};
}
function genSchaalBep(l){
  const n=pick(l===1?[50,100]:[20,50,100,200,250,500]);const mm=R(25,180);const real=mm*n/1000;
  return {q:`Op een tekening meet een gevel <b>${mm} mm</b>. In werkelijkheid is de gevel <b>${N(real)} m</b>. Wat is de schaal 1 : n? Geef n.`,type:'num',answer:n,hint:'Zet beide maten in mm en deel de werkelijke maat door de tekenmaat.',sol:steps([`${N(real)} m = ${N(real*1000)} mm`,`n = ${N(real*1000)} / ${mm} = ${n}`,`Schaal 1:${n}`])};
}
function genMeng(l){
  if(l===1){const [c,z,g]=pick([[1,2,3],[1,2,4],[1,3,5]]);const tot=rnd(R(5,40)/10,1);const parts=c+z+g;const v=tot*z/parts;
    return {q:`Beton wordt gemengd in de volumeverhouding cement : zand : grind = <b>${c} : ${z} : ${g}</b>. Hoeveel m³ zand heb je nodig voor <b>${N(tot)} m³</b> mengsel? (Ga uit van optelbare volumes.) Rond af op 3 decimalen.`,type:'num',answer:v,dec:3,unit:'m³',hint:'Tel eerst alle delen op. Bereken dan hoeveel één deel is.',sol:steps([`Totaal: ${c} + ${z} + ${g} = ${parts} delen`,`1 deel = ${N(tot)} / ${parts} = ${N(tot/parts,4)} m³`,`Zand = ${z} × ${N(tot/parts,4)} = ${N(v,4)} m³`])}}
  if(l===2){const r=pick([3,4,5]);const cem=R(2,8)*25;const v=cem*r;
    return {q:`Metselmortel wordt gemaakt in de verhouding cement : zand = <b>1 : ${r}</b> (op gewicht). Je hebt <b>${cem} kg</b> cement. Hoeveel kg zand heb je nodig?`,type:'num',answer:v,unit:'kg',hint:`Voor elk deel cement gaan er ${r} delen zand in.`,sol:steps([`Zand = ${r} × ${cem} = ${v} kg`])}}
  const wcf=pick([0.45,0.5,0.55,0.6]),cem=pick([280,300,320,340,360]),V=rnd(R(10,80)/10,1);const v=wcf*cem*V;
  return {q:`Een betonmengsel heeft <b>${cem} kg cement per m³</b> en een water-cementfactor van <b>${N(wcf)}</b>. Hoeveel liter water is nodig voor <b>${N(V)} m³</b> beton? (1 kg water = 1 L)`,type:'num',answer:v,dec:0,unit:'L',hint:'wcf = massa water / massa cement. Bereken eerst de totale hoeveelheid cement.',sol:steps([`Cement: ${cem} × ${N(V)} = ${N(cem*V)} kg`,`Water = ${N(wcf)} × ${N(cem*V)} = ${N(v,1)} kg = ${N(v,1)} L`])};
}

// ================= W-09 KWADRATISCH =================
function genKwOpl(l){
  if(l===1){if(Math.random()<.5){const k=R(2,12);return {q:`Los op:<div class="expr">x² = ${k*k}</div>`,type:'set',answer:[k,-k],hint:'Vergeet de negatieve oplossing niet!',sol:steps([`x = √${k*k} of x = −√${k*k}`,`x = ${k} of x = −${k}`]),calc:false}}
    const p=nz(-9,9),q=nz(-9,9);if(p===-q)return genKwOpl(l);return {q:`Los op:<div class="expr">(${polyStr([1,p])})(${polyStr([1,q])}) = 0</div>`,type:'set',answer:[-p,-q],hint:'Een product is 0 als één van de factoren 0 is.',sol:steps([`${polyStr([1,p])} = 0 of ${polyStr([1,q])} = 0`,`x = ${N(-p)} of x = ${N(-q)}`]),calc:false}}
  if(l===2){let r1,r2;do{r1=nz(-9,9);r2=nz(-9,9)}while(r1===r2);const b=-(r1+r2),c=r1*r2;
    return {q:`Los op door te ontbinden:<div class="expr">${polyStr([1,b,c])} = 0</div>`,type:'set',answer:[r1,r2],hint:`Zoek twee getallen met product ${N(c)} en som ${N(b)}.`,sol:steps([`Product ${N(c)}, som ${N(b)}: dat zijn ${N(-r1)} en ${N(-r2)}`,`(${polyStr([1,-r1])})(${polyStr([1,-r2])}) = 0`,`x = ${N(r1)} of x = ${N(r2)}`]),calc:false}}
  let a,b,c,D;do{a=nz(-4,4);b=R(-9,9);c=R(-9,9);D=b*b-4*a*c}while(D<=0||Number.isInteger(Math.sqrt(D)));
  const x1=(-b+Math.sqrt(D))/(2*a),x2=(-b-Math.sqrt(D))/(2*a);
  return {q:`Los op met de abc-formule. Rond af op 2 decimalen.<div class="expr">${polyStr([a,b,c])} = 0</div>`,type:'set',answer:[x1,x2],dec:2,hint:'D = b² − 4ac, en x = (−b ± √D) / 2a',sol:steps([`a = ${a}, b = ${b}, c = ${c}`,`D = ${P(b)}² − 4 × ${P(a)} × ${P(c)} = ${D}`,`x = (${N(-b)} ± √${D}) / ${N(2*a)}`,`x ≈ ${N(x1,3)} of x ≈ ${N(x2,3)}`])};
}
function genDiscr(l){
  if(l===1){const a=nz(-4,5),b=R(-9,9),c=R(-9,9);const D=b*b-4*a*c;return {q:`Bereken de discriminant D van:<div class="expr">${polyStr([a,b,c])} = 0</div>`,type:'num',answer:D,hint:'D = b² − 4ac',sol:steps([`D = ${P(b)}² − 4 × ${P(a)} × ${P(c)}`,`= ${b*b} − ${P(4*a*c)} = ${D}`]),calc:false}}
  if(l===2){const t=R(0,2);let a,b,c,D;do{a=nz(-3,4);b=R(-8,8);c=R(-8,8);D=b*b-4*a*c}while((t===0&&D>=0)||(t===1&&D!==0)||(t===2&&D<=0));
    if(t===1&&Math.random()<.5){}
    const right=['Geen oplossingen','Precies één oplossing','Twee oplossingen'][t];
    return {q:`Hoeveel oplossingen heeft deze vergelijking?<div class="expr">${polyStr([a,b,c])} = 0</div>`,...mc(right,['Geen oplossingen','Precies één oplossing','Twee oplossingen','Oneindig veel oplossingen']),hint:'D > 0: twee oplossingen · D = 0: één · D < 0: geen.',sol:steps([`D = ${P(b)}² − 4 × ${P(a)} × ${P(c)} = ${D}`,`${D>0?'D > 0':D===0?'D = 0':'D < 0'} → ${right.toLowerCase()}`]),calc:false}}
  const k=R(2,9);const c=k*k;return {q:`Voor welke waarden van p heeft <span class="formula">x² + px + ${c} = 0</span> precies één oplossing?`,type:'set',answer:[2*k,-2*k],hint:'Precies één oplossing betekent D = 0.',sol:steps([`D = p² − 4 × 1 × ${c} = p² − ${4*c}`,`D = 0 → p² = ${4*c}`,`p = ${2*k} of p = −${2*k}`]),calc:false};
}
function genTop(l){
  if(l===1){const a=nz(-3,3),xt=nz(-5,5),b=-2*a*xt,c=R(-9,9);return {q:`Bereken de x-coördinaat van de top van de parabool:<div class="expr">y = ${polyStr([a,b,c])}</div>`,type:'num',answer:xt,hint:'x_top = −b / (2a)',sol:steps([`x_top = −(${N(b)}) / (2 × ${P(a)}) = ${N(xt)}`]),calc:false}}
  if(l===2){const a=nz(-3,3),xt=nz(-5,5),b=-2*a*xt,c=R(-9,9);const yt=a*xt*xt+b*xt+c;return {q:`Bereken de y-coördinaat van de top van:<div class="expr">y = ${polyStr([a,b,c])}</div>`,type:'num',answer:yt,hint:'Bereken eerst x_top = −b/(2a), vul die daarna in.',sol:steps([`x_top = −(${N(b)}) / ${N(2*a)} = ${N(xt)}`,`y_top = ${P(a)} × ${P(xt)}² + ${P(b)} × ${P(xt)} + ${P(c)} = ${N(yt)}`]),calc:false}}
  const a=-rnd(R(2,8)/100,2),b=rnd(R(6,14)/10,1);const xt=-b/(2*a),yt=a*xt*xt+b*xt;
  return {q:`De vorm van een betonnen boog wordt beschreven door <span class="formula">h = ${N(a)}x² + ${N(b)}x</span> (h en x in meter). Hoe hoog is de boog op het hoogste punt? Rond af op 2 decimalen.`,type:'num',answer:yt,dec:2,unit:'m',hint:'Het hoogste punt is de top van de bergparabool.',sol:steps([`x_top = −${N(b)} / (2 × ${P(a)}) = ${N(xt,3)} m`,`h = ${N(a)} × ${N(xt,3)}² + ${N(b)} × ${N(xt,3)} = ${N(yt,3)} m`,`De overspanning is 2 × ${N(xt,2)} = ${N(2*xt,2)} m`])};
}
function genOntbind(l){
  let r1,r2;do{r1=nz(-9,9);r2=nz(-9,9)}while(r1===r2||r1===-r2);const b=-(r1+r2),c=r1*r2;
  const right=`(${polyStr([1,-r1])})(${polyStr([1,-r2])})`;
  const wr=[`(${polyStr([1,r1])})(${polyStr([1,r2])})`,`(${polyStr([1,-r1])})(${polyStr([1,r2])})`,`(${polyStr([1,r1])})(${polyStr([1,-r2])})`,`(x − ${Math.abs(c)})(x + 1)`];
  return {q:`Ontbind in factoren:<div class="expr">${polyStr([1,b,c])}</div>`,...mc(right,wr),hint:`Zoek twee getallen met product ${N(c)} en som ${N(b)}.`,sol:steps([`Product ${N(c)} en som ${N(b)}: ${N(-r1)} en ${N(-r2)}`,`${polyStr([1,b,c])} = ${right}`,'Controle: haakjes weer uitwerken'])};
}

// ================= W-10 MECHANICA =================
function genKrachten(l){
  if(l===1){const F1=R(2,40),F2=R(2,40),same=Math.random()<.5;const v=same?F1+F2:Math.abs(F1-F2);
    return {q:`Op een kolom werken twee krachten langs dezelfde lijn: <b>${F1} kN</b> en <b>${F2} kN</b>, ${same?'in dezelfde richting':'in tegengestelde richting'}. Hoe groot is de resultante?`,type:'num',answer:v,unit:'kN',hint:same?'Zelfde richting: optellen.':'Tegengestelde richting: aftrekken.',sol:steps([same?`R = ${F1} + ${F2} = ${v} kN`:`R = |${F1} − ${F2}| = ${v} kN`])}}
  if(l===2){const Fh=rnd(R(10,80)/10,1),Fv=rnd(R(10,80)/10,1);const v=Math.hypot(Fh,Fv);const ang=Math.atan2(Fv,Fh)/D2R;
    return {q:`Een horizontale kracht van <b>${N(Fh)} kN</b> en een verticale kracht van <b>${N(Fv)} kN</b> grijpen aan in hetzelfde punt. Hoe groot is de resultante? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'kN',hint:'Loodrechte krachten: gebruik Pythagoras.',sol:steps([`R = √(${N(Fh)}² + ${N(Fv)}²) = ${N(v,3)} kN`,`(De richting: tan α = ${N(Fv)}/${N(Fh)} → α = ${N(ang,1)}° met de horizontaal)`]),fig:figRightTri(Fh,Fv,{adj:`${N(Fh)} kN`,opp:`${N(Fv)} kN`,hyp:'R = ?'})}}
  const F=R(10,80),a=R(15,75),hor=Math.random()<.5;const v=hor?F*Math.cos(a*D2R):F*Math.sin(a*D2R);
  return {q:`Een trekstang brengt een kracht van <b>${F} kN</b> over onder een hoek van <b>${a}°</b> met de horizontaal. Hoe groot is de ${hor?'horizontale':'verticale'} component? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'kN',hint:'Horizontaal: F · cos α · Verticaal: F · sin α (α t.o.v. de horizontaal)',sol:steps([`F_${hor?'h':'v'} = ${F} × ${hor?'cos':'sin'}(${a}°) = ${N(v,3)} kN`]),fig:figRightTri(F*Math.cos(a*D2R),F*Math.sin(a*D2R),{adj:hor?'F<tspan font-size="9">h</tspan> = ?':'',opp:hor?'':'F<tspan font-size="9">v</tspan> = ?',hyp:`${F} kN`,ang:`${a}°`})};
}
function genSpanning(l){
  if(l===1){const F=R(50,600),b=pick([100,150,200,250,300]),h=pick([100,150,200,250,300]);const v=F*1000/(b*h);
    return {q:`Een vierkante/rechthoekige kolom van <b>${b} × ${h} mm</b> draagt een drukkracht van <b>${F} kN</b>. Bereken de drukspanning in N/mm². Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'N/mm²',hint:'σ = F / A, met F in N en A in mm².',sol:steps([`F = ${F} kN = ${N(F*1000)} N`,`A = ${b} × ${h} = ${N(b*h)} mm²`,`σ = ${N(F*1000)} / ${N(b*h)} = ${N(v,3)} N/mm²`])}}
  if(l===2){const F=R(100,900),d=pick([200,250,300,350,400]);const A=Math.PI*(d/2)**2;const v=F*1000/A;
    return {q:`Een ronde betonkolom met diameter <b>${d} mm</b> draagt <b>${F} kN</b>. Bereken de drukspanning in N/mm². Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'N/mm²',hint:'A = π · r². Reken met N en mm.',sol:steps([`A = π × ${d/2}² = ${N(A,1)} mm²`,`σ = ${N(F*1000)} / ${N(A,1)} = ${N(v,3)} N/mm²`]),fig:figCircle(`d = ${d} mm`)}}
  const F=R(200,1500),s=pick([5,6,8,10,12]);const A=F*1000/s;const z=Math.sqrt(A);
  return {q:`Een vierkante kolom moet <b>${F} kN</b> dragen. De toelaatbare spanning is <b>${s} N/mm²</b>. Hoe groot moet de zijde van de kolom minimaal zijn (in mm)? Rond af op hele mm.`,type:'num',answer:z,dec:0,unit:'mm',hint:'A = F / σ geeft de benodigde oppervlakte. De zijde is √A.',sol:steps([`A = ${N(F*1000)} / ${s} = ${N(A,1)} mm²`,`zijde = √${N(A,1)} = ${N(z,1)} mm`,'In de praktijk kies je de eerstvolgende gangbare maat'])};
}
function genMoment(l){
  if(l===1){const F=R(2,30),a=rnd(R(5,40)/10,1);const v=F*a;return {q:`Een kracht van <b>${F} kN</b> werkt op een arm van <b>${N(a)} m</b> ten opzichte van een draaipunt. Hoe groot is het moment?`,type:'num',answer:v,dec:2,unit:'kNm',hint:'M = F × a (arm loodrecht op de kracht)',sol:steps([`M = ${F} × ${N(a)} = ${N(v,2)} kNm`])}}
  if(l===2){const F1=R(2,20),a1=rnd(R(5,30)/10,1),a2=rnd(R(5,30)/10,1);const v=F1*a1/a2;
    return {q:`Een balk ligt als wip op een steunpunt. Links hangt <b>${F1} kN</b> op <b>${N(a1)} m</b> van het steunpunt. Welke kracht moet je rechts op <b>${N(a2)} m</b> zetten voor evenwicht? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'kN',hint:'Evenwicht: linksdraaiend moment = rechtsdraaiend moment.',sol:steps([`F₁ · a₁ = F₂ · a₂`,`${F1} × ${N(a1)} = F₂ × ${N(a2)}`,`F₂ = ${N(F1*a1,2)} / ${N(a2)} = ${N(v,3)} kN`])}}
  const F1=R(5,30),a1=rnd(R(10,40)/10,1),F2=R(5,30),a2=rnd(R(10,40)/10,1);const v=F1*a1-F2*a2;
  return {q:`Om punt O werken twee krachten: <b>${F1} kN</b> op <b>${N(a1)} m</b> (rechtsom, met de klok mee) en <b>${F2} kN</b> op <b>${N(a2)} m</b> (linksom). Hoe groot is het resulterende moment? Rechtsom is positief. Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'kNm',hint:'Tel de momenten op met een teken: rechtsom +, linksom −.',sol:steps([`ΣM = ${F1} × ${N(a1)} − ${F2} × ${N(a2)}`,`= ${N(F1*a1,2)} − ${N(F2*a2,2)} = ${N(v,2)} kNm (${v>=0?'rechtsom':'linksom'})`])};
}
function genOpleg(l){
  const L=rnd(R(40,90)/10,1);
  if(l===1){const F=R(4,40)*2;return {q:`Een ligger op twee steunpunten (A en B) heeft een overspanning van <b>${N(L)} m</b>. Precies in het midden staat een puntlast van <b>${F} kN</b>. Hoe groot is de oplegreactie in A?`,type:'num',answer:F/2,unit:'kN',hint:'Bij een symmetrische belasting dragen beide steunpunten evenveel.',sol:steps([`Symmetrisch: R_A = R_B = ${F} / 2 = ${F/2} kN`]),fig:figBeam(L,[{a:L/2,t:`${F} kN`}],null,[{len:L/2,t:`${N(L/2)} m`},{len:L/2,t:`${N(L/2)} m`}])}}
  if(l===2){const F=R(5,60),a=rnd(R(5,Math.floor(L*10)-5)/10,1);const RB=F*a/L,RA=F-RB;const askA=Math.random()<.5;
    return {q:`Een ligger AB van <b>${N(L)} m</b> draagt een puntlast van <b>${F} kN</b> op <b>${N(a)} m</b> van A. Bereken de oplegreactie in <b>${askA?'A':'B'}</b>. Rond af op 2 decimalen.`,type:'num',answer:askA?RA:RB,dec:2,unit:'kN',hint:'Momentevenwicht om A geeft R_B. Daarna: R_A = F − R_B.',sol:steps([`ΣM om A = 0: R_B × ${N(L)} = ${F} × ${N(a)}`,`R_B = ${N(F*a,2)} / ${N(L)} = ${N(RB,3)} kN`,`ΣF_v = 0: R_A = ${F} − ${N(RB,3)} = ${N(RA,3)} kN`]),fig:figBeam(L,[{a,t:`${F} kN`}],null,[{len:a,t:`${N(a)} m`},{len:L-a,t:`${N(L-a)} m`}])}}
  if(Math.random()<.5){const F1=R(5,40),F2=R(5,40);let a1=rnd(R(5,Math.floor(L*5))/10,1),a2=rnd(R(Math.floor(L*5)+5,Math.floor(L*10)-5)/10,1);const RB=(F1*a1+F2*a2)/L,RA=F1+F2-RB;
    return {q:`Een ligger AB van <b>${N(L)} m</b> draagt <b>${F1} kN</b> op ${N(a1)} m en <b>${F2} kN</b> op ${N(a2)} m van A. Bereken de oplegreactie in <b>A</b>. Rond af op 2 decimalen.`,type:'num',answer:RA,dec:2,unit:'kN',hint:'Momenten om B (of om A, dan eerst R_B) en daarna verticaal evenwicht.',sol:steps([`ΣM om A: R_B × ${N(L)} = ${F1} × ${N(a1)} + ${F2} × ${N(a2)} = ${N(F1*a1+F2*a2,2)}`,`R_B = ${N(RB,3)} kN`,`R_A = ${F1} + ${F2} − ${N(RB,3)} = ${N(RA,3)} kN`]),fig:figBeam(L,[{a:a1,t:`${F1} kN`},{a:a2,t:`${F2} kN`}],null,[{len:a1,t:`${N(a1)}`},{len:a2-a1,t:`${N(a2-a1)}`},{len:L-a2,t:`${N(L-a2)}`}])}}
  const q=rnd(R(20,120)/10,1),F=R(5,40),a=rnd(R(5,Math.floor(L*10)-5)/10,1);const RA=q*L/2+F*(L-a)/L;
  return {q:`Een ligger AB van <b>${N(L)} m</b> draagt een gelijkmatig verdeelde belasting van <b>${N(q)} kN/m</b> én een puntlast van <b>${F} kN</b> op ${N(a)} m van A. Bereken R<sub>A</sub>. Rond af op 2 decimalen.`,type:'num',answer:RA,dec:2,unit:'kN',hint:'Splits op: de q-last geeft ½qL aan elke kant; de puntlast geeft F·(L−a)/L aan A.',sol:steps([`Door q-last: ½ × ${N(q)} × ${N(L)} = ${N(q*L/2,3)} kN`,`Door puntlast: ${F} × ${N(L-a)} / ${N(L)} = ${N(F*(L-a)/L,3)} kN`,`R_A = ${N(RA,3)} kN`]),fig:figBeam(L,[{a,t:`${F} kN`}],`q = ${N(q)} kN/m`,[{len:a,t:`${N(a)} m`},{len:L-a,t:`${N(L-a)} m`}])};
}
function genQlast(l){
  if(l===1){const q=rnd(R(20,150)/10,1),L=rnd(R(30,90)/10,1);const v=q*L;return {q:`Een ligger van <b>${N(L)} m</b> draagt een gelijkmatig verdeelde belasting van <b>${N(q)} kN/m</b>. Hoe groot is de totale belasting?`,type:'num',answer:v,dec:2,unit:'kN',hint:'Totaal = q × L',sol:steps([`Q = ${N(q)} × ${N(L)} = ${N(v,2)} kN`]),fig:figBeam(L,[],`q = ${N(q)} kN/m`,[{len:L,t:`${N(L)} m`}])}}
  if(l===2){if(Math.random()<.5){const d=pick([150,180,200,220,250,280,320]);const v=d/1000*24;return {q:`Een betonvloer is <b>${d} mm</b> dik. Beton weegt <b>24 kN/m³</b>. Hoe groot is het eigen gewicht van de vloer in kN/m²?`,type:'num',answer:v,dec:2,unit:'kN/m²',hint:'Eigen gewicht = dikte (m) × volumiek gewicht (kN/m³)',sol:steps([`${d} mm = ${N(d/1000)} m`,`${N(d/1000)} × 24 = ${N(v,2)} kN/m²`])}}
    const p=rnd(R(25,80)/10,1),h=pick([0.6,1.2,1.8,2.4,3.0,3.6,4.8,5.4]);const v=p*h;return {q:`Een vloer met een belasting van <b>${N(p)} kN/m²</b> rust op balken met een hart-op-hartafstand van <b>${N(h)} m</b>. Hoe groot is de lijnlast op één balk?`,type:'num',answer:v,dec:2,unit:'kN/m',hint:'Elke balk draagt een strook vloer zo breed als de h.o.h.-afstand.',sol:steps([`q = ${N(p)} kN/m² × ${N(h)} m = ${N(v,2)} kN/m`])}}
  const q=rnd(R(30,200)/10,1),L=rnd(R(40,90)/10,1);const v=q*L*L/8;
  return {q:`Bereken het maximale buigend moment in het midden van een ligger op twee steunpunten met <b>q = ${N(q)} kN/m</b> en <b>L = ${N(L)} m</b>. Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'kNm',hint:'M_max = ⅛ · q · L²',sol:steps([`M = ⅛ × ${N(q)} × ${N(L)}²`,`= ⅛ × ${N(q)} × ${N(L*L,2)} = ${N(v,3)} kNm`]),fig:figBeam(L,[],`q = ${N(q)} kN/m`,[{len:L,t:`${N(L)} m`}])};
}

// ================= W-11 BOUWFYSICA =================
const MAT={glaswol:0.035,steenwol:0.036,PIR:0.022,EPS:0.036,'kalkzandsteen':1.0,'baksteen (metselwerk)':0.9,beton:2.0,'vuren hout':0.13,gipsplaat:0.25};
function genR(l){
  if(l<3){const m=pick(l===1?['glaswol','steenwol','PIR','EPS']:['kalkzandsteen','beton','vuren hout','gipsplaat','PIR']);const d=m==='beton'?pick([150,200,250]):m==='kalkzandsteen'?pick([100,120,150]):m==='gipsplaat'?pick([12.5,15]):m==='vuren hout'?pick([18,22,44]):R(6,24)*10;const v=d/1000/MAT[m];
    return {q:`Bereken de warmteweerstand R van een laag <b>${m}</b> van <b>${N(d)} mm</b> dik (λ = ${N(MAT[m],3)} W/(m·K)). Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m²K/W',hint:'R = d / λ, met d in METER.',sol:steps([`d = ${N(d)} mm = ${N(d/1000,4)} m`,`R = ${N(d/1000,4)} / ${N(MAT[m],3)} = ${N(v,3)} m²K/W`])}}
  const m=pick(['glaswol','PIR','EPS','steenwol']);const Rt=pick([2.5,3,3.5,4,4.5,5]);const v=Rt*MAT[m]*1000;
  return {q:`Hoe dik moet een laag <b>${m}</b> (λ = ${N(MAT[m],3)}) zijn om een warmteweerstand van <b>${N(Rt)} m²K/W</b> te halen? Geef het antwoord in mm (hele mm).`,type:'num',answer:v,dec:0,unit:'mm',hint:'Omwerken: d = R · λ (uitkomst in m).',sol:steps([`d = R × λ = ${N(Rt)} × ${N(MAT[m],3)} = ${N(v/1000,4)} m`,`= ${N(v,1)} mm`])};
}
function layersFor(l){
  const opts=[['kalkzandsteen',pick([100,120])],['glaswol',R(10,20)*10],['baksteen (metselwerk)',100]];
  if(l===1)return [['beton',pick([150,200])],['PIR',R(8,16)*10]];
  if(l===2)return [['gipsplaat',12.5],['vuren hout',18],['glaswol',R(14,22)*10]];
  return opts;
}
function genRc(l){
  const L=layersFor(l);const rs=L.map(([m,d])=>d/1000/MAT[m]);let sum=rs.reduce((a,b)=>a+b,0);const sp=l===3?0.17:0;sum+=sp;
  return {q:`Bereken de R<sub>c</sub>-waarde van deze constructie (som van de laagweerstanden${l===3?', inclusief een spouw met R = 0,17 m²K/W':''}). Rond af op 2 decimalen.${layerTable(L.map(([m,d])=>({n:m,d,l:MAT[m]})),l===3?'<tr><td>luchtspouw</td><td>–</td><td>R = 0,17</td></tr>':'')}`,type:'num',answer:sum,dec:2,unit:'m²K/W',hint:'Bereken voor elke laag R = d/λ (d in m!) en tel alles op.',sol:steps([...L.map(([m,d],i)=>`${m}: ${N(d/1000,4)} / ${N(MAT[m],3)} = ${N(rs[i],3)}`),...(sp?['spouw: 0,17']:[]),`R<sub>c</sub> = ${N(sum,3)} m²K/W`])};
}
function genU(l){
  if(l===1){const Rt=pick([2,2.5,4,5,6.25,8]);const v=1/Rt;return {q:`Een constructie heeft een totale warmteweerstand R<sub>T</sub> = <b>${N(Rt)} m²K/W</b>. Bereken de U-waarde. Rond af op 3 decimalen.`,type:'num',answer:v,dec:3,unit:'W/(m²K)',hint:'U = 1 / R_T',sol:steps([`U = 1 / ${N(Rt)} = ${N(v,4)} W/(m²K)`])}}
  if(l===2){const Rc=pick([3.7,4.7,5.0,6.3]);const RT=0.13+Rc+0.04;const v=1/RT;return {q:`Een gevel heeft R<sub>c</sub> = <b>${N(Rc)} m²K/W</b>. Gebruik R<sub>si</sub> = 0,13 en R<sub>se</sub> = 0,04. Bereken de U-waarde. Rond af op 3 decimalen.`,type:'num',answer:v,dec:3,unit:'W/(m²K)',hint:'U = 1 / (R_si + R_c + R_se)',sol:steps([`R_T = 0,13 + ${N(Rc)} + 0,04 = ${N(RT)}`,`U = 1 / ${N(RT)} = ${N(v,4)} W/(m²K)`])}}
  const L=layersFor(2);const rc=L.reduce((s,[m,d])=>s+d/1000/MAT[m],0);const RT=0.13+rc+0.04;const v=1/RT;
  return {q:`Bereken de U-waarde van deze wand. Gebruik R<sub>si</sub> = 0,13 en R<sub>se</sub> = 0,04. Rond af op 3 decimalen.${layerTable(L.map(([m,d])=>({n:m,d,l:MAT[m]})))}`,type:'num',answer:v,dec:3,unit:'W/(m²K)',hint:'Eerst R_c (som van d/λ), dan R_T = 0,13 + R_c + 0,04, dan U = 1/R_T.',sol:steps([`R_c = ${L.map(([m,d])=>N(d/1000/MAT[m],3)).join(' + ')} = ${N(rc,3)}`,`R_T = 0,13 + ${N(rc,3)} + 0,04 = ${N(RT,3)}`,`U = 1 / ${N(RT,3)} = ${N(v,4)}`])};
}
function genIsol(l){
  const [eis,naam]=pick([[4.7,'gevel'],[3.7,'vloer'],[6.3,'dak']]);const m=pick(['glaswol','PIR','EPS','steenwol']);
  let other,ostr;
  if(l===1){other=0;ostr='De overige lagen mag je verwaarlozen.'}
  else{const [om,od]=naam==='vloer'?['beton',pick([200,250])]:naam==='dak'?['vuren hout',18]:['kalkzandsteen',pick([100,120])];other=od/1000/MAT[om]+(l===3&&naam==='gevel'?0.17+0.1/0.9:0);
    ostr=`De overige lagen: ${od} mm ${om} (λ = ${N(MAT[om],3)})${l===3&&naam==='gevel'?', een spouw (R = 0,17) en 100 mm baksteen (λ = 0,9)':''}.`}
  const d=(eis-other)*MAT[m]*1000;
  return {q:`Een ${naam} in de nieuwbouw moet minimaal R<sub>c</sub> = <b>${N(eis)} m²K/W</b> halen. Je isoleert met <b>${m}</b> (λ = ${N(MAT[m],3)}). ${ostr} Hoe dik moet de isolatie minimaal zijn? Geef het antwoord in hele mm.`,type:'num',answer:d,dec:0,unit:'mm',hint:'R_isolatie = R_c,eis − R_overige lagen. Daarna d = R × λ.',sol:steps([...(other?[`R overige lagen = ${N(other,3)} m²K/W`]:[]),`R isolatie = ${N(eis)} − ${N(other,3)} = ${N(eis-other,3)} m²K/W`,`d = ${N(eis-other,3)} × ${N(MAT[m],3)} = ${N(d/1000,4)} m = ${N(d,1)} mm`,'In de praktijk kies je de eerstvolgende leverbare dikte'])};
}
function genWarmte(l){
  if(l<3){const U=pick([0.21,0.2,0.26,0.16,1.0,1.1]),A=rnd(R(50,400)/10,1),Ti=20,Te=l===1?R(-5,5):R(-10,0);const dT=Ti-Te;const v=U*A*dT;
    return {q:`Een ${U>=1?'raampartij':'wand'} heeft een U-waarde van <b>${N(U)} W/(m²K)</b> en een oppervlakte van <b>${N(A)} m²</b>. Binnen is het ${Ti} °C, buiten ${Te} °C. Hoeveel warmte stroomt er doorheen (in W)? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'W',hint:'Φ = U · A · ΔT',sol:steps([`ΔT = ${Ti} − ${P(Te)} = ${dT} K`,`Φ = ${N(U)} × ${N(A)} × ${dT} = ${N(v,2)} W`])}}
  const Uw=pick([0.21,0.2,0.16]),Ug=pick([1.0,1.1,1.4]),At=rnd(R(200,450)/10,1),Ag=rnd(R(40,Math.floor(At*3))/10,1),dT=pick([20,25,30]);const v=(Uw*(At-Ag)+Ug*Ag)*dT;
  return {q:`Een gevel van <b>${N(At)} m²</b> bevat <b>${N(Ag)} m²</b> glas (U = ${N(Ug)}). De rest is dichte gevel (U = ${N(Uw)}). Bereken het totale warmteverlies bij ΔT = ${dT} K. Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'W',hint:'Bereken dicht en glas apart: Φ = U·A·ΔT, en tel op. Vergeet niet het glas van de geveloppervlakte af te trekken.',sol:steps([`Dicht: ${N(At)} − ${N(Ag)} = ${N(At-Ag,2)} m²`,`Φ_dicht = ${N(Uw)} × ${N(At-Ag,2)} × ${dT} = ${N(Uw*(At-Ag)*dT,2)} W`,`Φ_glas = ${N(Ug)} × ${N(Ag)} × ${dT} = ${N(Ug*Ag*dT,2)} W`,`Totaal = ${N(v,2)} W`,'Let op hoeveel warmte via het glas weglekt'])};
}
if(typeof module!=='undefined')module.exports={};

// ================= W-01 BASISREKENEN =================
function genOptellen(l){
  if(l===1){const a=R(11,89),b=R(11,89),plus=Math.random()<.6;const [x,y]=plus?[a,b]:[Math.max(a,b),Math.min(a,b)];const v=plus?x+y:x-y;
    return {q:`Bereken uit je hoofd:<div class="expr">${x} ${plus?'+':'−'} ${y}</div>`,type:'num',answer:v,hint:plus?'Tel eerst de tientallen op, dan de eenheden.':'Trek eerst de tientallen af, dan de eenheden.',sol:steps(plus?[`${x} + ${Math.floor(y/10)*10} = ${x+Math.floor(y/10)*10}`,`${x+Math.floor(y/10)*10} + ${y%10} = ${v}`]:[`${x} − ${Math.floor(y/10)*10} = ${x-Math.floor(y/10)*10}`,`${x-Math.floor(y/10)*10} − ${y%10} = ${v}`]),calc:false}}
  if(l===2){const a=R(520,2400),b=R(45,480);const plus=Math.random()<.5;const v=plus?a+b:a-b;
    return {q:plus?`Je hebt ${N(a)} bakstenen en er worden er nog ${b} bezorgd. Hoeveel stenen heb je dan?`:`Er liggen ${N(a)} bakstenen op de bouwplaats. Je metselt er ${b}. Hoeveel blijven er over?`,type:'num',answer:v,unit:'stenen',hint:'Zet de getallen onder elkaar: eenheden onder eenheden, tientallen onder tientallen.',sol:steps([`${N(a)} ${plus?'+':'−'} ${b} = ${N(v)}`]),calc:false}}
  const a=rnd(R(105,2995)/100,2),b=rnd(R(15,995)/100,2),plus=Math.random()<.5;const [x,y]=plus||a>=b?[a,b]:[b,a];const v=plus?x+y:x-y;
  return {q:`Bereken zonder rekenmachine:<div class="expr">${N(x)} ${plus?'+':'−'} ${N(y)}</div>`,type:'num',answer:v,hint:'Zet de komma’s precies onder elkaar. Vul zo nodig aan met nullen (3,5 = 3,50).',sol:steps([`Zet de komma’s onder elkaar: ${x.toFixed(2).replace('.',',')} ${plus?'+':'−'} ${y.toFixed(2).replace('.',',')}`,`= ${N(v,2)}`]),calc:false};
}
function genTafels(l){
  if(l===1){const a=R(2,10),b=R(2,10);return {q:`Bereken uit je hoofd:<div class="expr">${a} × ${b}</div>`,type:'num',answer:a*b,hint:`Ken je de tafel van ${a}? Tel anders ${b} keer ${a} op.`,sol:steps([`${a} × ${b} = ${a*b}`]),calc:false}}
  if(l===2){const a=R(12,95),b=R(3,9);return {q:`Een stelling kost € ${a} per dag. Wat kost ${b} dagen?`,type:'num',answer:a*b,unit:'€',unitPre:true,hint:`Splits ${a} in tientallen en eenheden: ${Math.floor(a/10)*10} en ${a%10}.`,sol:steps([`${Math.floor(a/10)*10} × ${b} = ${Math.floor(a/10)*10*b}`,`${a%10} × ${b} = ${a%10*b}`,`Samen: € ${a*b}`]),calc:false}}
  if(Math.random()<.5){const a=R(12,49),b=R(11,25);return {q:`Bereken zonder rekenmachine:<div class="expr">${a} × ${b}</div>`,type:'num',answer:a*b,hint:`Splits het tweede getal: ${a} × ${Math.floor(b/10)*10} + ${a} × ${b%10}.`,sol:steps([`${a} × ${Math.floor(b/10)*10} = ${a*Math.floor(b/10)*10}`,`${a} × ${b%10} = ${a*(b%10)}`,`Samen: ${a*b}`]),calc:false}}
  const x=rnd(R(12,999)/100,2),f=pick([10,100,1000]);return {q:`Bereken:<div class="expr">${N(x)} × ${N(f)}</div>`,type:'num',answer:x*f,hint:`Vermenigvuldigen met ${N(f)}: de komma schuift ${String(f).length-1} plaats${f>10?'en':''} naar rechts.`,sol:steps([`Komma ${String(f).length-1} plaats${f>10?'en':''} naar rechts: ${N(clean(x*f))}`]),calc:false};
}
function genDelen(l){
  if(l===1){const a=R(2,10),b=R(2,10);return {q:`Bereken uit je hoofd:<div class="expr">${a*b} ÷ ${a}</div>`,type:'num',answer:b,hint:`Welk getal keer ${a} geeft ${a*b}?`,sol:steps([`${a} × ${b} = ${a*b}, dus ${a*b} ÷ ${a} = ${b}`]),calc:false}}
  if(l===2){const b=R(3,9),v=R(14,120);const a=b*v;return {q:`Een balk van ${N(a)} cm wordt in ${b} gelijke stukken gezaagd. Hoe lang is elk stuk? (Zaagsnede verwaarlozen.)`,type:'num',answer:v,unit:'cm',hint:'Delen in stappen: eerst de honderdtallen/tientallen, dan de rest.',sol:steps([`${N(a)} ÷ ${b} = ${v} cm`,`Controle: ${v} × ${b} = ${N(a)}`]),calc:false}}
  if(Math.random()<.5){const x=rnd(R(12,9999)/10,1),f=pick([10,100,1000]);return {q:`Bereken:<div class="expr">${N(x)} ÷ ${N(f)}</div>`,type:'num',answer:clean(x/f),hint:`Delen door ${N(f)}: de komma schuift ${String(f).length-1} plaats${f>10?'en':''} naar links.`,sol:steps([`Komma naar links: ${N(clean(x/f),6)}`]),calc:false}}
  const b=pick([0.5,0.25,2.5,1.5,0.2]),v=R(2,24);const a=clean(b*v);return {q:`Bereken zonder rekenmachine:<div class="expr">${N(a)} ÷ ${N(b)}</div>`,type:'num',answer:v,hint:'Maak de deler een heel getal: vermenigvuldig beide getallen met 10 of 100.',sol:steps([`Beide × ${b<1&&b!==0.5&&b!==0.2?100:10}: ${N(clean(a*(b<1&&b!==0.5&&b!==0.2?100:10)))} ÷ ${N(clean(b*(b<1&&b!==0.5&&b!==0.2?100:10)))}`,`= ${v}`]),calc:false};
}
function genDecimaal(l){
  if(l===1){const a=pick([0.5,0.25,0.75,0.1,0.2]),b=R(2,12);return {q:`Bereken uit je hoofd:<div class="expr">${b} × ${N(a)}</div>`,type:'num',answer:clean(a*b),hint:`${N(a)} is ${a===0.5?'de helft':a===0.25?'een kwart':a===0.75?'driekwart':a===0.1?'een tiende':'een vijfde'}.`,sol:steps([`${b} × ${N(a)} = ${N(clean(a*b))}`]),calc:false}}
  if(l===2){const a=rnd(R(11,99)/10,1),b=R(2,9);return {q:`Een plank is ${N(a)} m lang. Hoeveel meter hout is ${b} van die planken?`,type:'num',answer:clean(a*b),unit:'m',hint:'Reken eerst zonder komma, zet die er daarna weer in (1 cijfer achter de komma).',sol:steps([`${N(a*10)} × ${b} = ${N(a*10*b)}`,`Komma terug: ${N(clean(a*b))} m`]),calc:false}}
  const a=rnd(R(2,9)/10,1),b=rnd(R(11,49)/100,2);return {q:`Bereken zonder rekenmachine:<div class="expr">${N(a)} × ${N(b)}</div>`,type:'num',answer:clean(a*b),hint:'Vermenigvuldig zonder komma’s. Tel daarna het totaal aantal cijfers achter de komma.',sol:steps([`${N(a*10)} × ${N(Math.round(b*100))} = ${N(Math.round(a*10)*Math.round(b*100))}`,`1 + 2 = 3 cijfers achter de komma: ${N(clean(a*b))}`]),calc:false};
}
function genAfronden(l){
  if(l===1){const x=rnd(R(1001,99999)/100,2);return {q:`Rond af op een <b>geheel getal</b>:<div class="expr">${N(x)}</div>`,type:'num',answer:Math.round(x),hint:'Kijk naar het eerste cijfer achter de komma: 5 of hoger → naar boven.',sol:steps([`Eerste cijfer achter de komma is ${Math.floor(x*10)%10} → ${Math.floor(x*10)%10>=5?'omhoog':'omlaag'}`,`= ${N(Math.round(x))}`]),calc:false}}
  if(l===2){let x;do{x=rnd(R(10001,999999)/1000,3)}while(Math.round(x*1000)%100===50);return {q:`Rond af op <b>1 decimaal</b>:<div class="expr">${N(x)}</div>`,type:'num',answer:rnd(x,1),hint:'Kijk naar het tweede cijfer achter de komma.',sol:steps([`Tweede cijfer achter de komma: ${Math.floor(Math.round(x*1000)/10)%10}`,`= ${N(rnd(x,1))}`]),calc:false}}
  const n=R(1210,9890);const st=pick([10,100]);const v=Math.round(n/st)*st;return {q:`Een kozijn is ${N(n)} mm breed. Rond af op hele ${st===10?'centimeters':'decimeters'} (dus op ${st===10?'tientallen':'honderdtallen'} mm).`,type:'num',answer:v,unit:'mm',hint:`Kijk naar het cijfer rechts van de ${st===10?'tientallen':'honderdtallen'}.`,sol:steps([`${N(n)} → ${N(v)} mm`]),calc:false};
}

// ================= NIEUWE ONDERDELEN (extra standaardopgaven) =================
const ceil=Math.ceil;
function figGevel(W,H,ht,openings){
  // openings: [{x,y,w,h}] in m vanaf linksonder
  const tot=H+ht;const s=Math.min(240/W,150/tot);const x0=26,y0=12;const w=W*s,h=H*s,t=ht*s;const base=y0+t+h;
  let g=`<polygon class="shape" points="${x0},${base} ${x0+w},${base} ${x0+w},${y0+t} ${x0+w/2},${y0} ${x0},${y0+t}"/>`;
  openings.forEach(o=>{g+=`<rect class="shape2" x="${x0+o.x*s}" y="${base-(o.y+o.h)*s}" width="${o.w*s}" height="${o.h*s}"/>`});
  g+=dimH(x0,x0+w,base+24,`${N(W)} m`)+dimV(x0+w+26,y0+t,base,`${N(H)} m`);
  if(ht>0)g+=`<line class="dash" x1="${x0+w/2}" y1="${y0}" x2="${x0+w/2}" y2="${y0+t}"/><text class="lbl sm" x="${x0+w/2+6}" y="${y0+t/2+8}">${N(ht)} m</text>`;
  return svg(x0+w+44,base+38,g);
}

// W-01 basis: verhaaltjessommen
function genPraktisch(l){
  if(l===1){const n=R(3,9),k=pick([12,20,24,25,50]);const t=pick(['dozen schroeven','pakken tegels','zakken zand','bundels latten']);const v=n*k;
    return {q:`Je hebt ${n} ${t}. In elke ${t.split(' ')[0].replace(/en$/,'').replace(/s$/,'')} zitten er ${k}. Hoeveel stuks heb je in totaal?`,type:'num',answer:v,unit:'stuks',hint:'Aantal verpakkingen × aantal per verpakking.',sol:steps([`${n} × ${k} = ${v}`]),calc:false}}
  if(l===2){const A=rnd(R(80,350)/10,1),p=pick([1.5,2,2.2,2.4,2.5]);const v=ceil(A/p-1e-9);
    return {q:`Een vloer van <b>${N(A)} m²</b> krijgt laminaat. Eén pak dekt <b>${N(p)} m²</b>. Hoeveel pakken moet je minimaal kopen?`,type:'num',answer:v,unit:'pakken',hint:'Deel de oppervlakte door wat één pak dekt. Je kunt geen half pak kopen: rond altijd naar boven af.',sol:steps([`${N(A)} ÷ ${N(p)} = ${N(A/p,3)}`,`Naar boven afronden: ${v} pakken`,'Ook als er 4,1 uitkomt, koop je 5 pakken.'])}}
  const A=rnd(R(100,400)/10,1),p=pick([1.5,2,2.4]),prijs=pick([18.95,24.5,29.95,32]),verlies=pick([5,10]);const nodig=A*(1+verlies/100);const n=ceil(nodig/p-1e-9);const v=n*prijs;
  return {q:`Een vloer van <b>${N(A)} m²</b> krijgt laminaat. Reken <b>${verlies}% snijverlies</b>. Eén pak dekt ${N(p)} m² en kost € ${N(prijs,2)}. Wat kost het laminaat in totaal?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Stap 1: oppervlakte + snijverlies. Stap 2: aantal pakken (naar boven afronden). Stap 3: × prijs.',sol:steps([`Met snijverlies: ${N(A)} × ${N(1+verlies/100)} = ${N(nodig,3)} m²`,`Pakken: ${N(nodig,3)} ÷ ${N(p)} = ${N(nodig/p,3)} → ${n} pakken`,`Kosten: ${n} × € ${N(prijs,2)} = € ${N(v,2)}`])};
}
// W-02 rekenen: gemiddelde
function genGemiddelde(l){
  if(l===1){const k=R(4,5);const xs=Array.from({length:k},()=>R(10,60));const s=xs.reduce((a,b)=>a+b,0);const v=s/k;
    return {q:`Op een bouwplaats worden ${k} dagen lang de gemetselde meters geteld: <b>${xs.join(', ')}</b>. Wat is het gemiddelde per dag? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'m',hint:'Gemiddelde = som van alle waarden ÷ aantal waarden.',sol:steps([`Som: ${xs.join(' + ')} = ${s}`,`Gemiddelde: ${s} ÷ ${k} = ${N(v,2)}`]),calc:false}}
  if(l===2){const c=[R(4,9)+pick([0,.5]),R(4,9)+pick([0,.5]),R(4,9)+pick([0,.5])],w=[1,1,2];const v=(c[0]+c[1]+2*c[2])/4;
    return {q:`Voor een vak haal je een <b>${N(c[0])}</b> en een <b>${N(c[1])}</b> voor twee opdrachten (weging 1) en een <b>${N(c[2])}</b> voor het tentamen (weging 2). Wat is je gewogen gemiddelde? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,hint:'Vermenigvuldig elk cijfer met zijn weging, tel op en deel door de som van de wegingen.',sol:steps([`${N(c[0])} × 1 + ${N(c[1])} × 1 + ${N(c[2])} × 2 = ${N(c[0]+c[1]+2*c[2])}`,`Som wegingen: 1 + 1 + 2 = 4`,`Gemiddelde: ${N(c[0]+c[1]+2*c[2])} ÷ 4 = ${N(v,3)}`])}}
  const k=4,xs=Array.from({length:k-1},()=>R(55,95));const doel=R(70,85);const v=doel*k-xs.reduce((a,b)=>a+b,0);
  if(v<0||v>150)return genGemiddelde(l);
  return {q:`De druksterkte van ${k} betonkubussen moet gemiddeld <b>${doel} N/mm²</b> zijn. Drie kubussen geven ${xs.join(', ')} N/mm². Welke waarde moet de vierde kubus minimaal hebben?`,type:'num',answer:v,unit:'N/mm²',hint:'Het totaal moet gemiddelde × aantal zijn. Trek daar de bekende waarden van af.',sol:steps([`Benodigd totaal: ${doel} × ${k} = ${doel*k}`,`Al bekend: ${xs.join(' + ')} = ${xs.reduce((a,b)=>a+b,0)}`,`Vierde kubus: ${doel*k} − ${xs.reduce((a,b)=>a+b,0)} = ${v} N/mm²`])};
}
// W-03 eenheden: tijd, snelheid, debiet
function genTijd(l){
  if(l===1){if(Math.random()<.5){const u=pick([0.25,0.5,0.75,1.5,2.25,2.5,3.75]);return {q:`Hoeveel minuten is <b>${N(u)} uur</b>?`,type:'num',answer:u*60,unit:'min',hint:'1 uur = 60 minuten. ¼ uur = 15 min.',sol:steps([`${N(u)} × 60 = ${N(u*60)} min`]),calc:false}}
    const m=pick([15,30,45,90,105,135,150,210]);return {q:`Hoeveel uur is <b>${m} minuten</b>? Geef een decimaal getal.`,type:'num',answer:m/60,dec:2,unit:'uur',hint:'Deel door 60. 30 min = 0,5 uur (níet 0,30!).',sol:steps([`${m} ÷ 60 = ${N(m/60,3)} uur`,'Let op: 1 uur en 30 minuten = 1,5 uur, niet 1,3 uur.']),calc:false}}
  if(l===2){if(Math.random()<.5){const V=pick([200,500,1000,1500,2000]),Q=pick([10,12,15,20,25,40]);const v=V/Q;return {q:`Een waterreservoir van <b>${V} liter</b> wordt gevuld met een slang die <b>${Q} liter per minuut</b> geeft. Hoe lang duurt het vullen? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'min',hint:'tijd = hoeveelheid ÷ debiet',sol:steps([`t = ${V} ÷ ${Q} = ${N(v,2)} min`])}}
    const s=R(15,180),v0=pick([60,80,90,100,120]);const v=s/v0*60;return {q:`Een vrachtwagen met prefab elementen rijdt <b>${s} km</b> met een gemiddelde snelheid van <b>${v0} km/h</b>. Hoeveel minuten duurt de rit? Rond af op hele minuten.`,type:'num',answer:v,dec:0,unit:'min',hint:'t = s / v geeft uren. Vermenigvuldig met 60 voor minuten.',sol:steps([`t = ${s} ÷ ${v0} = ${N(s/v0,4)} uur`,`× 60 = ${N(v,1)} min`])}}
  if(Math.random()<.5){const kmh=pick([18,36,54,72,90,108]);const ms=kmh/3.6;return {q:`Windsnelheid bij een storm is <b>${kmh} km/h</b>. Hoeveel m/s is dat?`,type:'num',answer:ms,dec:1,unit:'m/s',hint:'1 m/s = 3,6 km/h. Van km/h naar m/s: delen door 3,6.',sol:steps(['1 km/h = 1000 m / 3600 s = 1/3,6 m/s',`${kmh} ÷ 3,6 = ${N(ms,2)} m/s`])}}
  const Q=pick([6,9,12,18,24,36]);const v=Q*1000/3600;return {q:`Een bemalingspomp verpompt <b>${Q} m³ per uur</b>. Hoeveel liter per seconde is dat? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'L/s',hint:'1 m³ = 1000 L en 1 uur = 3600 s.',sol:steps([`${Q} m³/h = ${Q*1000} L per 3600 s`,`${Q*1000} ÷ 3600 = ${N(v,3)} L/s`])};
}
// W-04 machten: wortels in de praktijk
function genWortelVgl(l){
  if(l===1){const z=R(3,12);return {q:`Een vierkante ruimte heeft een vloeroppervlak van <b>${z*z} m²</b>. Hoe lang is één zijde?`,type:'num',answer:z,unit:'m',hint:'A = z², dus z = √A.',sol:steps([`z = √${z*z} = ${z} m`]),calc:false}}
  if(l===2){const V=pick([2,5,8,10,12,20,27,30,50,64]);const v=Math.cbrt(V);return {q:`Een kubusvormige opslagtank moet <b>${V} m³</b> bevatten. Hoe lang is een ribbe? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m',hint:'V = z³, dus z = ∛V (= V^(1/3)). In de rekenmachine: V^(1/3).',sol:steps([`z = ∛${V} = ${V}^(1/3) = ${N(v,4)} m`])}}
  const A=rnd(R(20,300)/1000,3);const d=Math.sqrt(4*A/Math.PI);return {q:`Een ronde kolom moet een doorsnede-oppervlak hebben van <b>${N(A)} m²</b>. Hoe groot is de diameter? Rond af op 3 decimalen.`,type:'num',answer:d,dec:3,unit:'m',hint:'A = ¼ · π · d², dus d = √(4A / π).',sol:steps([`d² = 4 × ${N(A)} / π = ${N(4*A/Math.PI,5)}`,`d = √${N(4*A/Math.PI,5)} = ${N(d,4)} m`])};
}
// W-05 schaal: evenredigheid
function genEvenredig(l){
  if(l===1){const a=R(2,6),p=pick([12,15,18,24,35]),b=R(7,15);const v=p*b;return {q:`<b>${a} m²</b> tegelwerk kost € ${a*p}. Wat kost <b>${b} m²</b> bij dezelfde prijs per m²?`,type:'num',answer:v,unit:'€',unitPre:true,hint:'Reken eerst de prijs voor 1 m² uit.',sol:steps([`1 m²: € ${a*p} ÷ ${a} = € ${p}`,`${b} m²: ${b} × € ${p} = € ${v}`]),calc:false}}
  if(l===2){const m=pick([2,3,4,6]),d=pick([6,8,9,12]),m2=pick([2,3,4,6,8].filter(x=>x!==m));const v=m*d/m2;return {q:`<b>${m} metselaars</b> doen <b>${d} dagen</b> over een muur. Hoeveel dagen doen <b>${m2} metselaars</b> erover (zelfde tempo)? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'dagen',hint:'Dit is omgekeerd evenredig: meer mensen = minder dagen. Reken eerst het totaal aantal mandagen uit.',sol:steps([`Totaal werk: ${m} × ${d} = ${m*d} mandagen`,`${m*d} ÷ ${m2} = ${N(v,2)} dagen`])}}
  const st=pick([55,60,65,70]),L=rnd(R(80,250)/10,1),H=rnd(R(20,30)/10,1),per=pick([400,450,500]);const n=st*L*H;const v=n/per;
  return {q:`In 1 m² halfsteens metselwerk gaan ongeveer <b>${st} stenen</b>. Een muur is ${N(L)} m lang en ${N(H)} m hoog. Een metselaar legt <b>${per} stenen per dag</b>. Hoeveel dagen is hij bezig? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'dagen',hint:'Oppervlak → aantal stenen → dagen.',sol:steps([`A = ${N(L)} × ${N(H)} = ${N(L*H,2)} m²`,`Stenen: ${N(L*H,2)} × ${st} = ${N(n,0)}`,`Dagen: ${N(n,0)} ÷ ${per} = ${N(v,2)}`])};
}
// W-06 meetkunde: samengestelde vlakken (gevels)
function genGevel(l){
  if(l===1){const W=rnd(R(30,60)/10,1),H=rnd(R(24,28)/10,1),dw=0.93,dh=2.3;const v=W*H-dw*dh;
    return {q:`Een binnenwand is <b>${N(W)} m</b> breed en <b>${N(H)} m</b> hoog. Er zit een deur in van <b>0,93 × 2,30 m</b>. Hoeveel m² wand moet geschilderd worden? Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m²',hint:'Bruto oppervlak min de opening.',sol:steps([`Wand: ${N(W)} × ${N(H)} = ${N(W*H,3)} m²`,`Deur: 0,93 × 2,30 = 2,139 m²`,`Netto: ${N(v,3)} m²`]),fig:figGevel(W,H,0,[{x:W*0.6,y:0,w:dw,h:dh}])}}
  if(l===2){const W=rnd(R(55,90)/10,1),H=rnd(R(25,30)/10,1),ht=rnd(R(18,35)/10,1),rw=rnd(R(10,16)/10,1),rh=rnd(R(10,14)/10,1);const bruto=W*H+0.5*W*ht;const v=bruto-2*rw*rh;
    return {q:`Een kopgevel bestaat uit een rechthoek van <b>${N(W)} × ${N(H)} m</b> met daarboven een driehoekige geveltop van <b>${N(ht)} m</b> hoog. Er zitten twee ramen in van <b>${N(rw)} × ${N(rh)} m</b>. Bereken het netto geveloppervlak. Rond af op 2 decimalen.`,type:'num',answer:v,dec:2,unit:'m²',hint:'Rechthoek + driehoek (½ · b · h) − openingen.',sol:steps([`Rechthoek: ${N(W)} × ${N(H)} = ${N(W*H,3)} m²`,`Geveltop: ½ × ${N(W)} × ${N(ht)} = ${N(0.5*W*ht,3)} m²`,`Ramen: 2 × ${N(rw)} × ${N(rh)} = ${N(2*rw*rh,3)} m²`,`Netto: ${N(bruto,3)} − ${N(2*rw*rh,3)} = ${N(v,3)} m²`]),fig:figGevel(W,H,ht,[{x:W*0.15,y:H*0.35,w:rw,h:rh},{x:W*0.85-rw,y:H*0.35,w:rw,h:rh}])}}
  const B=rnd(R(12,24)/10,1),Hr=rnd(R(18,24)/10,1);const r=B/2;const v=B*Hr+0.5*Math.PI*r*r;
  return {q:`Een poortopening is <b>${N(B)} m</b> breed met rechte zijden van <b>${N(Hr)} m</b> hoog, afgesloten met een <b>halve cirkel</b> (rondboog). Bereken het oppervlak van de opening. Rond af op 3 decimalen.`,type:'num',answer:v,dec:3,unit:'m²',hint:'Rechthoek + halve cirkel met r = ½ × breedte.',sol:steps([`Rechthoek: ${N(B)} × ${N(Hr)} = ${N(B*Hr,4)} m²`,`Halve cirkel: ½ × π × ${N(r)}² = ${N(0.5*Math.PI*r*r,4)} m²`,`Totaal: ${N(v,4)} m²`])};
}
// W-07 algebra: stelsels
function genStelsel(l){
  if(l===1){const x=R(2,15),y=R(1,x-1>0?x-1:1);return {q:`Twee balken zijn samen <b>${x+y} m</b> lang. De ene is <b>${x-y} m</b> langer dan de andere. Hoe lang is de langste balk?`,type:'num',answer:x,unit:'m',hint:'x + y = som en x − y = verschil. Tel de vergelijkingen op: 2x = som + verschil.',sol:steps([`x + y = ${x+y} en x − y = ${x-y}`,`Optellen: 2x = ${2*x}`,`x = ${x} m (en y = ${y} m)`]),calc:false}}
  if(l===2){const x=nz(-6,8),m=nz(-4,4),n=nz(-8,8),a=R(2,5),b=nz(-4,4);const y=m*x+n;const c=a*x+b*y;
    return {q:`Los het stelsel op door substitutie. Geef <b>x</b>.<div class="expr">y = ${polyStr([m,n])}<br>${polyStr([a,0])} ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}y = ${N(c)}</div>`,type:'num',answer:x,hint:'Vul de eerste vergelijking in voor y in de tweede.',sol:steps([`${a}x ${b<0?'−':'+'} ${Math.abs(b)}(${polyStr([m,n])}) = ${N(c)}`,`${polyStr([a+b*m,0])} ${b*n<0?'−':'+'} ${N(Math.abs(b*n))} = ${N(c)}`,`${polyStr([a+b*m,0])} = ${N(c-b*n)}`,`x = ${N(x)} (en y = ${N(y)})`]),calc:false}}
  let a,b,c,d,x,y;do{x=nz(-6,6);y=nz(-6,6);a=nz(-5,5);b=nz(-5,5);c=nz(-5,5);d=nz(-5,5)}while(a*d-b*c===0);const e=a*x+b*y,f=c*x+d*y;
  return {q:`Los het stelsel op (bijvoorbeeld door eliminatie). Geef <b>y</b>.<div class="expr">${polyStr([a,0])} ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}y = ${N(e)}<br>${polyStr([c,0])} ${d<0?'−':'+'} ${Math.abs(d)===1?'':Math.abs(d)}y = ${N(f)}</div>`,type:'num',answer:y,hint:'Maak de x-coëfficiënten gelijk door de vergelijkingen met een getal te vermenigvuldigen, en trek ze dan van elkaar af.',sol:steps([`Vergelijking 1 × ${c} en vergelijking 2 × ${a}:`,`${N(a*c)}x + ${P(b*c)}y = ${N(e*c)} en ${N(a*c)}x + ${P(a*d)}y = ${N(a*f)}`,`Aftrekken: ${P(b*c-a*d)}y = ${N(e*c-a*f)}`,`y = ${N(y)} (en x = ${N(x)})`]),calc:false};
}
// W-08 lineair: interpoleren
function genInterp(l){
  if(l===1){const x1=pick([10,20,100,200]),dx=x1,y1=R(20,60),dy=R(2,20)*2;const xm=x1+dx/2;const v=y1+dy/2;
    return {q:`In een tabel staat: bij ${x1} hoort ${y1}, bij ${x1+dx} hoort ${y1+dy}. Wat hoort er (lineair) bij <b>${xm}</b>, precies in het midden?`,type:'num',answer:v,hint:'Precies in het midden: neem het gemiddelde van de twee tabelwaarden.',sol:steps([`(${y1} + ${y1+dy}) ÷ 2 = ${N(v)}`]),calc:false}}
  const x1=pick([0,10,20,30]),x2=x1+10,y1=rnd(R(150,400)/100,2),y2=rnd(y1+(Math.random()<.5?-1:1)*R(10,90)/100,2),x=x1+R(1,9)+(l===3?pick([.5,.25,0]):0);const v=y1+(y2-y1)*(x-x1)/(x2-x1);
  return {q:`Uit een tabel met materiaalgegevens: bij <b>${x1} °C</b> is de waarde <b>${N(y1)}</b> en bij <b>${x2} °C</b> is de waarde <b>${N(y2)}</b>. Bepaal door lineair interpoleren de waarde bij <b>${N(x)} °C</b>. Rond af op ${l===3?3:2} decimalen.`,type:'num',answer:v,dec:l===3?3:2,hint:'y = y₁ + (y₂ − y₁) × (x − x₁) / (x₂ − x₁)',sol:steps([`Helling: (${N(y2)} − ${N(y1)}) / (${x2} − ${x1}) = ${N((y2-y1)/10,4)} per °C`,`Afstand vanaf x₁: ${N(x)} − ${x1} = ${N(x-x1)}`,`y = ${N(y1)} + ${N((y2-y1)/10,4)} × ${N(x-x1)} = ${N(v,4)}`])};
}
// W-09 gonio: willekeurige driehoeken
function genCosregel(l){
  if(l===1){const a=R(25,80),b=R(25,150-a);return {q:`In een driehoekig dakspant is één hoek <b>${a}°</b> en een andere hoek <b>${b}°</b>. Hoe groot is de derde hoek?`,type:'num',answer:180-a-b,unit:'°',hint:'De hoeken van een driehoek zijn samen 180°.',sol:steps([`180 − ${a} − ${b} = ${180-a-b}°`]),calc:false}}
  if(l===2){const A=R(30,80),B=R(30,150-A-10),a=rnd(R(30,90)/10,1);const b=a*Math.sin(B*D2R)/Math.sin(A*D2R);
    return {q:`In driehoek ABC is ∠A = <b>${A}°</b>, ∠B = <b>${B}°</b> en zijde a (tegenover A) = <b>${N(a)} m</b>. Bereken zijde b (tegenover B) met de sinusregel. Rond af op 2 decimalen.`,type:'num',answer:b,dec:2,unit:'m',hint:'Sinusregel: a / sin A = b / sin B',sol:steps([`${Fh('a','sin A')} = ${Fh('b','sin B')}`,`b = ${N(a)} × sin(${B}°) / sin(${A}°)`,`b = ${N(a)} × ${N(Math.sin(B*D2R),4)} / ${N(Math.sin(A*D2R),4)} = ${N(b,3)} m`])}}
  const b=rnd(R(30,80)/10,1),c=rnd(R(30,80)/10,1),A=R(35,140);const a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*D2R));
  return {q:`Twee schuine spantbenen van <b>${N(b)} m</b> en <b>${N(c)} m</b> maken een hoek van <b>${A}°</b> met elkaar. Hoe lang is de verbindingsbalk tussen de uiteinden? Rond af op 2 decimalen.`,type:'num',answer:a,dec:2,unit:'m',hint:'Cosinusregel: a² = b² + c² − 2bc · cos A',sol:steps([`a² = ${N(b)}² + ${N(c)}² − 2 × ${N(b)} × ${N(c)} × cos(${A}°)`,`a² = ${N(b*b,2)} + ${N(c*c,2)} − ${N(2*b*c,2)} × ${N(Math.cos(A*D2R),4)} = ${N(a*a,3)}`,`a = ${N(a,3)} m`,A>90?'Let op: cos van een stompe hoek is negatief, dus je telt hier eigenlijk op.':''].filter(Boolean))};
}
// W-10 kwadratisch: toepassingen
function genKwToep(l){
  if(l===1){const b=R(3,9),k=R(1,5);const L=b+k;return {q:`Een rechthoekige kamer is <b>${k} m langer</b> dan breed. Het oppervlak is <b>${b*L} m²</b>. Hoe breed is de kamer?`,type:'num',answer:b,unit:'m',hint:`Stel b = breedte: b(b + ${k}) = ${b*L} → b² + ${k}b − ${b*L} = 0. Ontbind of probeer gehele getallen.`,sol:steps([`b(b + ${k}) = ${b*L}`,`b² + ${k}b − ${b*L} = 0`,`(b − ${b})(b + ${L}) = 0 → b = ${b} (b = −${L} kan niet)`]),calc:false}}
  if(l===2){const b=R(3,10),L=b+R(1,8);const P=2*(b+L),A=b*L;return {q:`Een terras heeft een omtrek van <b>${P} m</b> en een oppervlak van <b>${A} m²</b>. Hoe lang is de kortste zijde?`,type:'num',answer:b,unit:'m',hint:`l + b = ${P/2}, dus l = ${P/2} − b. Vul in: b(${P/2} − b) = ${A}.`,sol:steps([`l + b = ${P/2} → l = ${P/2} − b`,`b(${P/2} − b) = ${A} → b² − ${P/2}b + ${A} = 0`,`(b − ${b})(b − ${L}) = 0 → b = ${b} of ${L}`,`Kortste zijde: ${b} m`]),calc:false}}
  const Lv=R(4,10),Bv=R(3,8),A=Lv*Bv+rnd(R(20,60),0);const tot=A+Lv*Bv;
  const x=(-(2*Lv+2*Bv)+Math.sqrt((2*Lv+2*Bv)**2+16*A))/8;
  return {q:`Rond een vijver van <b>${Lv} × ${Bv} m</b> komt een pad met overal dezelfde breedte x. Pad en vijver samen beslaan <b>${N(tot)} m²</b>. Hoe breed is het pad? Rond af op 2 decimalen.`,type:'num',answer:x,dec:2,unit:'m',hint:`(${Lv} + 2x)(${Bv} + 2x) = ${N(tot)}. Werk uit en gebruik de abc-formule.`,sol:steps([`(${Lv} + 2x)(${Bv} + 2x) = ${N(tot)}`,`4x² + ${2*Lv+2*Bv}x + ${Lv*Bv} − ${N(tot)} = 0 → 4x² + ${2*Lv+2*Bv}x − ${N(A)} = 0`,`D = ${(2*Lv+2*Bv)**2} + 16 × ${N(A)} = ${N((2*Lv+2*Bv)**2+16*A)}`,`x = (−${2*Lv+2*Bv} + √D) / 8 = ${N(x,3)} m (de negatieve oplossing vervalt)`])};
}
// W-11 mechanica: gronddruk / fundering
function genFundering(l){
  if(l===1){const q=R(40,160),b=pick([0.4,0.5,0.6,0.8,1.0]);const v=q/b;return {q:`Een strokenfundering draagt een lijnlast van <b>${q} kN/m</b> en is <b>${N(b)} m</b> breed. Hoe groot is de gronddruk in kN/m²?`,type:'num',answer:v,dec:1,unit:'kN/m²',hint:'Per strekkende meter: p = q / b (de belaste oppervlakte is b × 1 m).',sol:steps([`p = ${q} / ${N(b)} = ${N(v,2)} kN/m²`])}}
  if(l===2){const F=R(200,1200),a=pick([1.0,1.2,1.5,1.8,2.0]);const v=F/(a*a);return {q:`Een kolom staat op een vierkante poer van <b>${N(a)} × ${N(a)} m</b> en brengt <b>${F} kN</b> over. Bereken de gronddruk onder de poer. Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'kN/m²',hint:'p = F / A met A = a²',sol:steps([`A = ${N(a)}² = ${N(a*a,2)} m²`,`p = ${F} / ${N(a*a,2)} = ${N(v,2)} kN/m²`])}}
  const F=R(300,1500),pt=pick([150,200,250,300]);const a=Math.sqrt(F/pt);return {q:`Een kolom brengt <b>${F} kN</b> over. De grond mag maximaal <b>${pt} kN/m²</b> belast worden. Hoe groot moet de zijde van een vierkante poer minimaal zijn? Rond af op 2 decimalen.`,type:'num',answer:a,dec:2,unit:'m',hint:'A = F / p_toelaatbaar, daarna zijde = √A.',sol:steps([`A = ${F} / ${pt} = ${N(F/pt,3)} m²`,`a = √${N(F/pt,3)} = ${N(a,3)} m`,'Je kiest dan een maat naar boven, bijv. op 0,1 m afgerond'])};
}
// W-12 bouwfysica: temperatuurverloop
function genTemp(l){
  if(l===1){const Ti=pick([18,20,21]),Te=R(-10,8);return {q:`Binnen is het <b>${Ti} °C</b> en buiten <b>${Te} °C</b>. Hoe groot is het temperatuurverschil ΔT?`,type:'num',answer:Ti-Te,unit:'K',hint:'ΔT = T_binnen − T_buiten. Een verschil van 1 °C = 1 K.',sol:steps([`ΔT = ${Ti} − ${P(Te)} = ${Ti-Te} K`]),calc:false}}
  if(l===2){const U=pick([0.16,0.2,0.21,0.3,1.1,2.8]),dT=pick([15,20,25,30]);const v=U*dT;return {q:`Een constructie heeft U = <b>${N(U)} W/(m²K)</b>. Bij ΔT = <b>${dT} K</b>: hoeveel warmte gaat er per m² doorheen?`,type:'num',answer:v,dec:2,unit:'W/m²',hint:'Warmtestroomdichtheid q = U · ΔT (per m²).',sol:steps([`q = ${N(U)} × ${dT} = ${N(v,3)} W/m²`])}}
  const Ti=20,Te=pick([-10,-5,0]),RT=pick([0.3,0.5,0.8,2.0,5.0]);const Rsi=0.13;const v=Ti-Rsi/RT*(Ti-Te);
  return {q:`Een wand heeft een totale warmteweerstand R<sub>T</sub> = <b>${N(RT)} m²K/W</b> (inclusief R<sub>si</sub> = 0,13). Binnen is het 20 °C, buiten ${Te} °C. Bereken de binnenoppervlaktetemperatuur θ<sub>si</sub>. Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'°C',hint:'Het temperatuurverschil verdeelt zich naar verhouding van de weerstanden: θsi = Ti − (Rsi / RT) × (Ti − Te).',sol:steps([`ΔT = 20 − ${P(Te)} = ${20-Te} K`,`Verlies over R_si: ${N(Rsi)} / ${N(RT)} × ${20-Te} = ${N(Rsi/RT*(20-Te),2)} K`,`θ_si = 20 − ${N(Rsi/RT*(20-Te),2)} = ${N(v,2)} °C`,v<12?'Zo’n lage oppervlaktetemperatuur geeft kans op condensatie en schimmel.':'Een warme binnenzijde: weinig kans op condensatie.'])};
}

// ================= PRAKTIJKOPDRACHTEN (meerdelig) =================
// elk case: {t, lvl, intro, fig?, parts:[{q, answer, dec, unit, unitPre, hint, sol}]}
const CASES={
basis:[
()=>{const L=rnd(R(20,35)/10,1),B=rnd(R(15,25)/10,1),t=pick([0.3,0.25]),per=pick([10,12,16]),prijs=pick([24.95,32.5,39.95]);
  const A=L*B,tegel=t*t,n=ceil(A*1.1/tegel-1e-9),d=ceil(n/per-1e-9);
  return {t:'Badkamervloer betegelen',lvl:2,intro:`Een badkamervloer is <b>${N(L)} × ${N(B)} m</b>. Je gebruikt tegels van <b>${t*100} × ${t*100} cm</b>. Er zitten <b>${per} tegels</b> in een doos van € ${N(prijs,2)}. Je rekent <b>10% snijverlies</b>.`,fig:figRect(L,B,`${N(L)} m`,`${N(B)} m`),
  parts:[{q:'Hoeveel m² vloer moet worden betegeld?',answer:A,dec:2,unit:'m²',hint:'A = l × b',sol:steps([`${N(L)} × ${N(B)} = ${N(A,3)} m²`])},
  {q:'Hoeveel tegels heb je nodig, inclusief 10% snijverlies? (Naar boven afronden.)',answer:n,unit:'tegels',hint:`Eén tegel is ${N(t)} × ${N(t)} = ${N(tegel,4)} m². Tel 10% op bij het oppervlak.`,sol:steps([`Met verlies: ${N(A,3)} × 1,1 = ${N(A*1.1,3)} m²`,`Per tegel ${N(tegel,4)} m²: ${N(A*1.1,3)} ÷ ${N(tegel,4)} = ${N(A*1.1/tegel,2)}`,`Naar boven: ${n} tegels`])},
  {q:'Hoeveel dozen moet je kopen?',answer:d,unit:'dozen',hint:'Tegels ÷ tegels per doos, naar boven afronden.',sol:steps([`${n} ÷ ${per} = ${N(n/per,2)} → ${d} dozen`])},
  {q:'Wat kosten de tegels?',answer:d*prijs,dec:2,unit:'€',unitPre:true,hint:'Dozen × prijs per doos.',sol:steps([`${d} × € ${N(prijs,2)} = € ${N(d*prijs,2)}`])}]}},
()=>{const L=rnd(R(30,60)/10,1),hoh=0.6,H=2.6,pr=pick([3.25,4.1,4.75]);const n=Math.floor(L/hoh+1e-9)+1;const m=n*H;
  return {t:'Houten regelwerk voor een wand',lvl:1,intro:`Voor een voorzetwand van <b>${N(L)} m</b> lang en <b>${N(H)} m</b> hoog plaats je verticale stijlen op <b>60 cm</b> hart-op-hart, met aan beide uiteinden een stijl. Hout kost € ${N(pr,2)} per strekkende meter.`,
  parts:[{q:'Hoeveel stijlen heb je nodig?',answer:n,unit:'stijlen',hint:'Aantal tussenruimtes = lengte ÷ 0,6 (naar beneden afronden). Aantal stijlen = tussenruimtes + 1.',sol:steps([`${N(L)} ÷ 0,6 = ${N(L/0.6,2)} → ${n-1} volle tussenruimtes`,`Stijlen: ${n-1} + 1 = ${n}`,`(Is het restant niet nul, dan komt de laatste stijl iets dichter bij de vorige.)`])},
  {q:'Hoeveel meter hout is dat voor de stijlen?',answer:m,dec:1,unit:'m',hint:'Aantal × hoogte.',sol:steps([`${n} × ${N(H)} = ${N(m,1)} m`])},
  {q:'Voeg een boven- en onderregel toe over de volle lengte. Hoeveel meter hout in totaal?',answer:m+2*L,dec:1,unit:'m',hint:'Stijlen + 2 × wandlengte.',sol:steps([`${N(m,1)} + 2 × ${N(L)} = ${N(m+2*L,1)} m`])},
  {q:'Wat kost het hout?',answer:(m+2*L)*pr,dec:2,unit:'€',unitPre:true,hint:'Meters × prijs per meter.',sol:steps([`${N(m+2*L,1)} × € ${N(pr,2)} = € ${N((m+2*L)*pr,2)}`])}]}}],
rekenen:[
()=>{const mat=R(18,60)*100,u=R(16,60),t=pick([52.5,58,62.5,65]),kort=pick([3,5]);const arb=u*t,sub=mat+arb,btw=sub*0.21,tot=(sub+btw)*(1-kort/100);
  return {t:'Offerte voor een verbouwing',lvl:2,intro:`Een aannemer maakt een offerte. Materiaal kost <b>€ ${N(mat)}</b> (excl. btw). De klus kost <b>${u} uur</b> arbeid à <b>€ ${N(t,2)}</b> per uur (excl. btw). Over alles komt <b>21% btw</b>. Bij directe opdracht geeft de aannemer <b>${kort}% korting</b> op het totaalbedrag.`,
  parts:[{q:'Wat kost de arbeid?',answer:arb,dec:2,unit:'€',unitPre:true,hint:'Uren × uurtarief.',sol:steps([`${u} × € ${N(t,2)} = € ${N(arb,2)}`])},
  {q:'Wat is het subtotaal exclusief btw?',answer:sub,dec:2,unit:'€',unitPre:true,hint:'Materiaal + arbeid.',sol:steps([`€ ${N(mat)} + € ${N(arb,2)} = € ${N(sub,2)}`])},
  {q:'Hoeveel btw komt erbij?',answer:btw,dec:2,unit:'€',unitPre:true,hint:'21% van het subtotaal = × 0,21.',sol:steps([`€ ${N(sub,2)} × 0,21 = € ${N(btw,2)}`])},
  {q:`Wat is het eindbedrag inclusief btw, na ${kort}% korting?`,answer:tot,dec:2,unit:'€',unitPre:true,hint:`Totaal incl. btw × ${N(1-kort/100)}.`,sol:steps([`Incl. btw: € ${N(sub+btw,2)}`,`× ${N(1-kort/100)} = € ${N(tot,2)}`])}]}},
()=>{const p0=R(80,140)*10,a=pick([8,12,15,20]),b=pick([5,6,10]);const p1=p0*(1+a/100),p2=p1*(1-b/100),tot=(p2/p0-1)*100;
  return {t:'Staalprijs door de jaren',lvl:2,intro:`Een ton constructiestaal kostte in jaar 1 <b>€ ${N(p0)}</b>. In jaar 2 steeg de prijs met <b>${a}%</b>. In jaar 3 daalde de prijs weer met <b>${b}%</b>.`,
  parts:[{q:'Wat kostte een ton in jaar 2?',answer:p1,dec:2,unit:'€',unitPre:true,hint:`Groeifactor 1 + ${a}/100.`,sol:steps([`€ ${N(p0)} × ${N(1+a/100)} = € ${N(p1,2)}`])},
  {q:'Wat kostte een ton in jaar 3?',answer:p2,dec:2,unit:'€',unitPre:true,hint:`Groeifactor 1 − ${b}/100, toegepast op de prijs van jaar 2.`,sol:steps([`€ ${N(p1,2)} × ${N(1-b/100)} = € ${N(p2,2)}`])},
  {q:'Wat is de totale procentuele verandering van jaar 1 naar jaar 3? (Rond af op 1 decimaal.)',answer:tot,dec:1,unit:'%',hint:'(nieuw − oud) / oud × 100%, of: (factor − 1) × 100%.',sol:steps([`Totale factor: ${N(1+a/100)} × ${N(1-b/100)} = ${N((1+a/100)*(1-b/100),4)}`,`(${N((1+a/100)*(1-b/100),4)} − 1) × 100% = ${N(tot,2)}%`,`Niet ${a} − ${b} = ${a-b}%!`])}]}}],
eenheden:[
()=>{const L=rnd(R(60,140)/10,1),B=rnd(R(50,100)/10,1),d=pick([180,200,220,250]);const V=L*B*d/1000,m=V*2400,G=m*10/1000,n=ceil(V/8-1e-9);
  return {t:'Betonvloer storten',lvl:2,intro:`Een begane grondvloer van <b>${N(L)} × ${N(B)} m</b> wordt <b>${d} mm</b> dik gestort. Beton heeft een volumieke massa van <b>2400 kg/m³</b>. Een truckmixer vervoert maximaal <b>8 m³</b>. Gebruik g = 10 N/kg.`,fig:figBox(`${N(L)} m`,`${N(B)} m`,`${d} mm`),
  parts:[{q:'Hoeveel m³ beton is nodig?',answer:V,dec:2,unit:'m³',hint:'Dikte eerst naar meter!',sol:steps([`${d} mm = ${N(d/1000)} m`,`V = ${N(L)} × ${N(B)} × ${N(d/1000)} = ${N(V,3)} m³`])},
  {q:'Wat is de massa van de vloer in kg?',answer:m,dec:0,unit:'kg',hint:'m = V × ρ',sol:steps([`${N(V,3)} × 2400 = ${N(m,0)} kg`])},
  {q:'Hoe groot is het eigen gewicht in kN?',answer:G,dec:1,unit:'kN',hint:'G = m × g, daarna ÷ 1000 voor kN.',sol:steps([`${N(m,0)} × 10 = ${N(m*10,0)} N = ${N(G,1)} kN`])},
  {q:'Hoeveel truckmixers zijn er nodig?',answer:n,unit:'mixers',hint:'Volume ÷ 8, naar boven afronden.',sol:steps([`${N(V,3)} ÷ 8 = ${N(V/8,2)} → ${n}`])}]}},
()=>{const A=R(60,200),mm=pick([20,30,40,50]),T=pick([3000,5000,10000]);const V=A*mm/1000,Ls=V*1000/3600,t=T/(V*1000)*60;
  return {t:'Regenwater van een plat dak',lvl:3,intro:`Een plat dak van <b>${A} m²</b> krijgt een stevige bui van <b>${mm} mm per uur</b>. Al het water loopt naar een opvangtank van <b>${N(T)} liter</b>.`,
  parts:[{q:'Hoeveel m³ water valt er per uur op het dak?',answer:V,dec:2,unit:'m³',hint:'1 mm neerslag = 1 liter per m². Of: V = A × hoogte (in m).',sol:steps([`${mm} mm = ${N(mm/1000)} m`,`V = ${A} × ${N(mm/1000)} = ${N(V,3)} m³`])},
  {q:'Hoeveel liter per seconde moet de afvoer verwerken?',answer:Ls,dec:2,unit:'L/s',hint:'m³ → L (× 1000), per uur → per seconde (÷ 3600).',sol:steps([`${N(V,3)} m³ = ${N(V*1000)} L per uur`,`÷ 3600 = ${N(Ls,3)} L/s`])},
  {q:'Na hoeveel minuten is de tank vol (als de bui aanhoudt)?',answer:t,dec:0,unit:'min',hint:'Tankinhoud ÷ liters per uur, × 60.',sol:steps([`${N(T)} ÷ ${N(V*1000)} = ${N(T/(V*1000),3)} uur`,`× 60 = ${N(t,1)} min`])}]}}],
machten:[
()=>{const L=R(20,60),dT=pick([30,40,50,60]);const a=1.2e-5;const dL=a*L*dT;
  return {t:'Uitzetting van een stalen ligger',lvl:3,intro:`Een stalen ligger is <b>${L} m</b> lang. In de zomer wordt hij <b>${dT} K</b> warmer dan bij montage. De lineaire uitzettingscoëfficiënt van staal is <b>α = 1,2 × 10<sup>−5</sup> per K</b>. Formule: ΔL = α · L · ΔT.`,
  parts:[{q:'Schrijf α als decimaal getal.',answer:a,unit:'per K',hint:'10^−5 betekent: komma 5 plaatsen naar links.',sol:steps(['1,2 × 10<sup>−5</sup> = 0,000012'])},
  {q:'Hoeveel meter zet de ligger uit? (Geef het antwoord als decimaal getal.)',answer:dL,unit:'m',hint:'ΔL = α × L × ΔT',sol:steps([`ΔL = 1,2 × 10<sup>−5</sup> × ${L} × ${dT}`,`= ${N(dL,6)} m`])},
  {q:'Hoeveel millimeter is dat?',answer:dL*1000,dec:1,unit:'mm',hint:'m → mm: × 1000',sol:steps([`${N(dL,6)} × 1000 = ${N(dL*1000,2)} mm`,'Daarom krijgen lange stalen constructies dilatatievoegen of glijdende opleggingen.'])}]}},
()=>{const z=R(5,12);const V=z*z*z;const r=Math.cbrt(2*V);
  return {t:'Kubusvormige opslagruimte',lvl:2,intro:`Een opslagruimte heeft een vierkante vloer van <b>${z*z} m²</b> en is net zo hoog als breed.`,
  parts:[{q:'Hoe lang is één zijde van de vloer?',answer:z,unit:'m',hint:'z = √A',sol:steps([`√${z*z} = ${z} m`])},
  {q:'Wat is de inhoud van de ruimte?',answer:V,unit:'m³',hint:'V = z³',sol:steps([`${z}³ = ${V} m³`])},
  {q:'Er komt een tweede kubusvormige ruimte met twee keer zoveel inhoud. Hoe lang wordt een ribbe? (2 decimalen)',answer:r,dec:2,unit:'m',hint:'z = ∛(2V). Twee keer de inhoud is níet twee keer de ribbe!',sol:steps([`2V = ${2*V} m³`,`z = ∛${2*V} = ${N(r,3)} m`,`Dat is maar ${N(r/z,3)}× zo lang (= ∛2).`])}]}}],
schaal:[
()=>{const n=50;const a=R(70,140),b=R(50,100);const la=a*n/1000,lb=b*n/1000;
  return {t:'Plattegrond 1:50 lezen',lvl:2,intro:`Op een bestektekening met schaal <b>1:50</b> meet je een woonkamer van <b>${a} × ${b} mm</b>.`,fig:figRect(a,b,`${a} mm`,`${b} mm`),
  parts:[{q:'Hoe lang is de kamer in werkelijkheid (in m)?',answer:la,dec:2,unit:'m',hint:'Tekenmaat × 50, dan mm → m.',sol:steps([`${a} × 50 = ${a*50} mm = ${N(la)} m`])},
  {q:'Hoe breed is de kamer in werkelijkheid (in m)?',answer:lb,dec:2,unit:'m',hint:'Zelfde aanpak.',sol:steps([`${b} × 50 = ${b*50} mm = ${N(lb)} m`])},
  {q:'Wat is het werkelijke vloeroppervlak?',answer:la*lb,dec:2,unit:'m²',hint:'l × b met de werkelijke maten.',sol:steps([`${N(la)} × ${N(lb)} = ${N(la*lb,3)} m²`])},
  {q:'Hoeveel mm wordt de lengte als je de kamer op schaal 1:100 tekent?',answer:a/2,dec:1,unit:'mm',hint:'Werkelijke maat ÷ 100, of: de helft van de tekenmaat op 1:50.',sol:steps([`${N(la*1000)} mm ÷ 100 = ${N(a/2)} mm`])}]}},
()=>{const V=rnd(R(20,60)/10,1);const [c,z,g]=[1,2,3];const d=V/6;
  return {t:'Beton mengen op de bouwplaats',lvl:2,intro:`Voor een fundering is <b>${N(V)} m³</b> beton nodig. Je mengt zelf in de volumeverhouding cement : zand : grind = <b>1 : 2 : 3</b>. Cement weegt ca. <b>1400 kg/m³</b> en zit in zakken van <b>25 kg</b>.`,
  parts:[{q:'Hoeveel m³ is één deel?',answer:d,dec:3,unit:'m³',hint:'Totaal aantal delen = 1 + 2 + 3.',sol:steps([`6 delen: ${N(V)} ÷ 6 = ${N(d,4)} m³`])},
  {q:'Hoeveel m³ grind is nodig?',answer:3*d,dec:3,unit:'m³',hint:'Grind = 3 delen.',sol:steps([`3 × ${N(d,4)} = ${N(3*d,4)} m³`])},
  {q:'Hoeveel kg cement is nodig?',answer:d*1400,dec:0,unit:'kg',hint:'Cement = 1 deel; massa = volume × 1400.',sol:steps([`${N(d,4)} × 1400 = ${N(d*1400,1)} kg`])},
  {q:'Hoeveel zakken cement koop je?',answer:ceil(d*1400/25-1e-9),unit:'zakken',hint:'÷ 25, naar boven afronden.',sol:steps([`${N(d*1400,1)} ÷ 25 = ${N(d*1400/25,2)} → ${ceil(d*1400/25-1e-9)} zakken`])}]}}],
meetkunde:[
()=>{const W=rnd(R(60,90)/10,1),H=rnd(R(25,30)/10,1),ht=rnd(R(20,35)/10,1),rw=1.2,rh=1.4,dw=1.0,dh=2.3,dek=pick([6,8,10]);
  const bruto=W*H+0.5*W*ht,open=2*rw*rh+dw*dh,netto=bruto-open,L=ceil(netto*2/dek-1e-9);
  return {t:'Kopgevel schilderen',lvl:2,intro:`Een kopgevel is <b>${N(W)} m</b> breed, <b>${N(H)} m</b> hoog tot de dakvoet en heeft een driehoekige geveltop van <b>${N(ht)} m</b>. Er zitten twee ramen van <b>1,2 × 1,4 m</b> en een deur van <b>1,0 × 2,3 m</b> in. De verf dekt <b>${dek} m² per liter</b> en je schildert <b>twee lagen</b>.`,fig:figGevel(W,H,ht,[{x:W*0.1,y:H*0.35,w:rw,h:rh},{x:W*0.9-rw,y:H*0.35,w:rw,h:rh},{x:W/2-dw/2,y:0,w:dw,h:dh}]),
  parts:[{q:'Wat is het bruto geveloppervlak (rechthoek + geveltop)?',answer:bruto,dec:2,unit:'m²',hint:'W × H + ½ × W × h_top',sol:steps([`${N(W)} × ${N(H)} = ${N(W*H,3)}`,`½ × ${N(W)} × ${N(ht)} = ${N(0.5*W*ht,3)}`,`Samen: ${N(bruto,3)} m²`])},
  {q:'Hoeveel m² zijn de openingen samen?',answer:open,dec:2,unit:'m²',hint:'2 ramen + 1 deur.',sol:steps([`2 × 1,2 × 1,4 = 3,36`,`1,0 × 2,3 = 2,3`,`Samen 5,66 m²`])},
  {q:'Wat is het netto te schilderen oppervlak?',answer:netto,dec:2,unit:'m²',hint:'Bruto − openingen.',sol:steps([`${N(bruto,3)} − 5,66 = ${N(netto,3)} m²`])},
  {q:'Hoeveel liter verf heb je minimaal nodig (hele liters)?',answer:L,unit:'L',hint:'Twee lagen: oppervlak × 2, delen door dekking, naar boven afronden.',sol:steps([`${N(netto,3)} × 2 = ${N(netto*2,2)} m²`,`÷ ${dek} = ${N(netto*2/dek,2)} → ${L} liter`])}]}},
()=>{const l=R(80,140)/10,b=R(60,100)/10,sb=pick([0.4,0.5,0.6]),sh=pick([0.4,0.5]);const d=Math.hypot(l,b),O=2*(l+b),V=O*sb*sh;
  return {t:'Fundering uitzetten en storten',lvl:2,intro:`Je zet een rechthoekige strokenfundering uit van <b>${N(l)} × ${N(b)} m</b> (hartmaten). De strook is <b>${N(sb)} m breed</b> en <b>${N(sh)} m hoog</b>.`,fig:figRect(l,b,`${N(l)} m`,`${N(b)} m`),
  parts:[{q:'Hoe lang moet de diagonaal zijn als alle hoeken haaks zijn? (2 decimalen)',answer:d,dec:2,unit:'m',hint:'Pythagoras: d = √(l² + b²)',sol:steps([`d = √(${N(l)}² + ${N(b)}²) = √${N(l*l+b*b,2)} = ${N(d,3)} m`,'Meet beide diagonalen: als ze gelijk zijn, is de rechthoek haaks.'])},
  {q:'Wat is de totale hartlengte van de strook?',answer:O,dec:2,unit:'m',hint:'Omtrek = 2(l + b)',sol:steps([`2 × (${N(l)} + ${N(b)}) = ${N(O,2)} m`])},
  {q:'Hoeveel m³ beton gaat er in de strook? (Hartlengte × doorsnede, 2 decimalen.)',answer:V,dec:2,unit:'m³',hint:'V = lengte × breedte × hoogte van de strook.',sol:steps([`Doorsnede: ${N(sb)} × ${N(sh)} = ${N(sb*sh,3)} m²`,`V = ${N(O,2)} × ${N(sb*sh,3)} = ${N(V,3)} m³`])}]}}],
algebra:[
()=>{const a1=pick([75,85,95]),b1=pick([150,200]),a2=a1+pick([15,20,25]),b2=pick([0,25,50]);const d=(b1-b2)/(a2-a1);
  return {t:'Steigerverhuur vergelijken',lvl:2,intro:`Verhuurder A rekent <b>K = ${a1}d + ${b1}</b> euro, verhuurder B rekent <b>K = ${a2}d + ${b2}</b> euro (d = aantal dagen).`,
  parts:[{q:'Wat kost 5 dagen bij A?',answer:5*a1+b1,unit:'€',unitPre:true,hint:'Vul d = 5 in.',sol:steps([`${a1} × 5 + ${b1} = € ${5*a1+b1}`])},
  {q:'Wat kost 5 dagen bij B?',answer:5*a2+b2,unit:'€',unitPre:true,hint:'Vul d = 5 in.',sol:steps([`${a2} × 5 + ${b2} = € ${5*a2+b2}`])},
  {q:'Na hoeveel dagen zijn ze even duur? (1 decimaal)',answer:d,dec:1,unit:'dagen',hint:'Stel de formules gelijk en los d op.',sol:steps([`${a1}d + ${b1} = ${a2}d + ${b2}`,`${b1-b2} = ${a2-a1}d`,`d = ${N(d,2)} dagen`,`Korter huren: B is goedkoper. Langer: A is goedkoper.`])}]}},
()=>{const F=R(300,1200),s=pick([5,6,8]);const A=F*1000/s,z=Math.sqrt(A),zk=ceil(z/10-1e-9)*10,sk=F*1000/(zk*zk);
  return {t:'Kolom dimensioneren',lvl:3,intro:`Een betonkolom moet <b>${F} kN</b> dragen. De toelaatbare drukspanning is <b>${s} N/mm²</b>. Formule: σ = F / A.`,
  parts:[{q:'Schrijf de formule om naar A en bereken het benodigde oppervlak in mm².',answer:A,dec:0,unit:'mm²',hint:'A = F / σ, met F in N.',sol:steps([`A = F / σ = ${N(F*1000)} / ${s} = ${N(A,0)} mm²`])},
  {q:'Hoe groot moet de zijde van een vierkante kolom minimaal zijn? (1 decimaal)',answer:z,dec:1,unit:'mm',hint:'z = √A',sol:steps([`√${N(A,0)} = ${N(z,2)} mm`])},
  {q:`Je kiest een zijde van ${zk} mm. Wat is dan de werkelijke spanning? (2 decimalen)`,answer:sk,dec:2,unit:'N/mm²',hint:'σ = F / A met de gekozen maat.',sol:steps([`A = ${zk}² = ${N(zk*zk)} mm²`,`σ = ${N(F*1000)} / ${N(zk*zk)} = ${N(sk,3)} N/mm² ≤ ${s} ✓`])}]}}],
lineair:[
()=>{const h=R(30,90)*10,n=pick([12,16,20]);const L=h*n/1000,p=100/n,ang=Math.atan(1/n)/D2R;
  return {t:'Hellingbaan bij een entree',lvl:2,intro:`Een entree ligt <b>${h} mm</b> hoger dan het maaiveld. De hellingbaan mag maximaal <b>1 : ${n}</b> steil zijn.`,
  parts:[{q:'Hoe lang moet de hellingbaan (horizontaal) minimaal zijn? (2 decimalen)',answer:L,dec:2,unit:'m',hint:`1 : ${n} betekent: per mm hoogte ${n} mm lengte.`,sol:steps([`${h} × ${n} = ${h*n} mm = ${N(L,3)} m`])},
  {q:'Hoeveel procent is deze helling? (2 decimalen)',answer:p,dec:2,unit:'%',hint:'1/n × 100%',sol:steps([`1 / ${n} × 100% = ${N(p,3)}%`])},
  {q:'Hoeveel graden is deze helling? (2 decimalen)',answer:ang,dec:2,unit:'°',hint:'tan α = 1/n',sol:steps([`α = tan⁻¹(1/${n}) = ${N(ang,3)}°`])}]}},
()=>{const h=R(260,300)*10;const n=ceil(h/188-1e-9),o=h/n,a=630-2*o,L=(n-1)*a;
  return {t:'Een trap ontwerpen',lvl:3,intro:`Een woning heeft een verdiepingshoogte van <b>${N(h)} mm</b>. De optrede mag maximaal <b>188 mm</b> zijn. Je gebruikt de stapmaatregel <b>2o + a = 630 mm</b>.`,fig:figStair('o','a'),
  parts:[{q:'Hoeveel optredes heb je minimaal nodig?',answer:n,unit:'optredes',hint:'h ÷ 188 en naar boven afronden.',sol:steps([`${N(h)} ÷ 188 = ${N(h/188,2)} → ${n}`])},
  {q:'Hoe hoog wordt één optrede? (1 decimaal)',answer:o,dec:1,unit:'mm',hint:'h ÷ aantal optredes',sol:steps([`${N(h)} ÷ ${n} = ${N(o,2)} mm`])},
  {q:'Hoe diep wordt de aantrede? (1 decimaal)',answer:a,dec:1,unit:'mm',hint:'a = 630 − 2o',sol:steps([`630 − 2 × ${N(o,2)} = ${N(a,2)} mm`])},
  {q:'Hoe lang wordt de trap in de plattegrond? (Aantal aantredes is optredes − 1; hele mm.)',answer:L,dec:0,unit:'mm',hint:'(n − 1) × a',sol:steps([`(${n} − 1) × ${N(a,2)} = ${N(L,1)} mm`])}]}}],
gonio:[
()=>{const b=rnd(R(70,110)/10,1),a=R(30,50),o=pick([0.3,0.4,0.5]),Lg=R(8,15);const h=b/2*Math.tan(a*D2R),s=b/2/Math.cos(a*D2R),so=(b/2+o)/Math.cos(a*D2R),A=2*so*Lg;
  return {t:'Zadeldak doorrekenen',lvl:3,intro:`Een woning is <b>${N(b)} m</b> breed (muurplaat tot muurplaat) en <b>${Lg} m</b> lang. Het zadeldak heeft een helling van <b>${a}°</b> en aan beide kanten een horizontaal overstek van <b>${N(o)} m</b>.`,fig:figRoof(`${N(b)} m`,'h','spar',`${a}°`,a),
  parts:[{q:'Hoe hoog ligt de nok boven de muurplaat? (2 decimalen)',answer:h,dec:2,unit:'m',hint:'h = ½b × tan α',sol:steps([`${N(b/2)} × tan(${a}°) = ${N(h,3)} m`])},
  {q:'Hoe lang is de spar van muurplaat tot nok? (2 decimalen)',answer:s,dec:2,unit:'m',hint:'s = ½b / cos α',sol:steps([`${N(b/2)} / cos(${a}°) = ${N(s,3)} m`])},
  {q:'Hoe lang is de spar inclusief overstek? (2 decimalen)',answer:so,dec:2,unit:'m',hint:'Horizontaal is het nu ½b + overstek.',sol:steps([`(${N(b/2)} + ${N(o)}) / cos(${a}°) = ${N(so,3)} m`])},
  {q:'Wat is het totale dakoppervlak (twee dakschilden)? (1 decimaal)',answer:A,dec:1,unit:'m²',hint:'2 × sparlengte incl. overstek × lengte woning.',sol:steps([`2 × ${N(so,3)} × ${Lg} = ${N(A,2)} m²`])}]}},
()=>{const F=R(20,80),a=R(25,60);const Fh=F*Math.cos(a*D2R),Fv=F*Math.sin(a*D2R);const Fv2=R(20,60);const F2=Fv2/Math.sin(a*D2R);
  return {t:'Schuine trekstang',lvl:2,intro:`Een trekstang hangt onder een hoek van <b>${a}°</b> met de horizontaal en trekt met <b>${F} kN</b>.`,fig:figRightTri(F*Math.cos(a*D2R),F*Math.sin(a*D2R),{adj:'F<tspan font-size="9">h</tspan>',opp:'F<tspan font-size="9">v</tspan>',hyp:`${F} kN`,ang:`${a}°`}),
  parts:[{q:'Hoe groot is de horizontale component? (2 decimalen)',answer:Fh,dec:2,unit:'kN',hint:'F_h = F · cos α',sol:steps([`${F} × cos(${a}°) = ${N(Fh,3)} kN`])},
  {q:'Hoe groot is de verticale component? (2 decimalen)',answer:Fv,dec:2,unit:'kN',hint:'F_v = F · sin α',sol:steps([`${F} × sin(${a}°) = ${N(Fv,3)} kN`])},
  {q:`De stang moet ${Fv2} kN verticaal kunnen opnemen. Hoe groot wordt dan de kracht in de stang? (2 decimalen)`,answer:F2,dec:2,unit:'kN',hint:'F = F_v / sin α',sol:steps([`F = ${Fv2} / sin(${a}°) = ${N(F2,3)} kN`,'Hoe vlakker de stang, hoe groter de kracht.'])}]}}],
kwadratisch:[
()=>{const h=pick([3,3.5,4,4.5,5]),k=pick([0.25,0.3,0.4,0.5]);const w=2*Math.sqrt(h/k),y1=h-k,w2=2*Math.sqrt((h-2)/k);
  return {t:'Paraboolvormige poort',lvl:3,intro:`De bovenkant van een poort volgt de parabool <b>y = ${N(h)} − ${N(k)}x²</b>, met x de afstand tot het midden en y de hoogte (beide in m).`,
  parts:[{q:'Hoe hoog is de poort in het midden?',answer:h,dec:2,unit:'m',hint:'Vul x = 0 in.',sol:steps([`y = ${N(h)} − ${N(k)} × 0² = ${N(h)} m`])},
  {q:'Hoe hoog is de poort op 1 m uit het midden?',answer:y1,dec:2,unit:'m',hint:'Vul x = 1 in.',sol:steps([`y = ${N(h)} − ${N(k)} × 1² = ${N(y1)} m`])},
  {q:'Hoe breed is de poort op de grond? (2 decimalen)',answer:w,dec:2,unit:'m',hint:'Los y = 0 op: x² = h / k. De breedte is 2x.',sol:steps([`0 = ${N(h)} − ${N(k)}x² → x² = ${N(h/k,3)}`,`x = ±${N(Math.sqrt(h/k),3)}`,`Breedte = 2 × ${N(Math.sqrt(h/k),3)} = ${N(w,3)} m`])},
  {q:'Hoe breed is de doorgang op 2 m hoogte? (2 decimalen)',answer:w2,dec:2,unit:'m',hint:'Los y = 2 op.',sol:steps([`2 = ${N(h)} − ${N(k)}x² → x² = ${N((h-2)/k,3)}`,`Breedte = 2 × ${N(Math.sqrt((h-2)/k),3)} = ${N(w2,3)} m`])}]}},
()=>{const b=R(4,9),l=b+R(2,7);const P=2*(l+b),A=l*b;
  return {t:'Terras met vaste omtrek',lvl:2,intro:`Een rechthoekig terras krijgt een opsluitband van in totaal <b>${P} m</b> en moet precies <b>${A} m²</b> groot worden.`,
  parts:[{q:'Hoeveel is lengte + breedte samen?',answer:P/2,unit:'m',hint:'Omtrek = 2(l + b).',sol:steps([`${P} ÷ 2 = ${P/2} m`])},
  {q:'Hoe lang is de kortste zijde?',answer:b,unit:'m',hint:`b(${P/2} − b) = ${A}. Schrijf als b² − ${P/2}b + ${A} = 0.`,sol:steps([`b² − ${P/2}b + ${A} = 0`,`D = ${(P/2)**2} − ${4*A} = ${(P/2)**2-4*A}`,`b = (${P/2} ± ${Math.sqrt((P/2)**2-4*A)}) / 2 → ${b} of ${l}`])},
  {q:'Hoe lang is de langste zijde?',answer:l,unit:'m',hint:`${P/2} − kortste zijde.`,sol:steps([`${P/2} − ${b} = ${l} m`])}]}}],
mechanica:[
()=>{const p=rnd(R(30,70)/10,1),hoh=pick([0.6,1.2,1.8,2.4,3.6]),L=rnd(R(40,70)/10,1);const q=p*hoh,Q=q*L,Ra=Q/2,M=q*L*L/8;
  return {t:'Vloerbalk doorrekenen',lvl:3,intro:`Een houten vloer met een totale belasting van <b>${N(p)} kN/m²</b> rust op balken met een h.o.h.-afstand van <b>${N(hoh)} m</b>. Een balk overspant <b>${N(L)} m</b> en ligt op twee steunpunten.`,fig:figBeam(L,[],'q = ?',[{len:L,t:`${N(L)} m`}]),
  parts:[{q:'Hoe groot is de lijnlast op één balk?',answer:q,dec:2,unit:'kN/m',hint:'q = p × h.o.h.',sol:steps([`${N(p)} × ${N(hoh)} = ${N(q,3)} kN/m`])},
  {q:'Hoe groot is de totale belasting op de balk?',answer:Q,dec:2,unit:'kN',hint:'q × L',sol:steps([`${N(q,3)} × ${N(L)} = ${N(Q,3)} kN`])},
  {q:'Hoe groot is de oplegreactie per steunpunt?',answer:Ra,dec:2,unit:'kN',hint:'Symmetrisch: de helft per kant.',sol:steps([`${N(Q,3)} / 2 = ${N(Ra,3)} kN`])},
  {q:'Hoe groot is het maximale moment?',answer:M,dec:2,unit:'kNm',hint:'M = ⅛ q L²',sol:steps([`⅛ × ${N(q,3)} × ${N(L)}² = ${N(M,3)} kNm`])}]}},
()=>{const F=R(400,1400),b=pick([250,300,350,400]),a=pick([1.2,1.5,1.8,2.0]),pt=pick([150,200,250]);const s=F*1000/(b*b),p=F/(a*a),amin=Math.sqrt(F/pt);
  return {t:'Kolom op een poer',lvl:3,intro:`Een vierkante betonkolom van <b>${b} × ${b} mm</b> draagt <b>${F} kN</b>. Hij staat op een vierkante poer van <b>${N(a)} × ${N(a)} m</b>. De grond mag <b>${pt} kN/m²</b> hebben. (Eigen gewicht poer verwaarlozen.)`,
  parts:[{q:'Hoe groot is de drukspanning in de kolom? (2 decimalen)',answer:s,dec:2,unit:'N/mm²',hint:'σ = F / A in N en mm².',sol:steps([`${N(F*1000)} / ${N(b*b)} = ${N(s,3)} N/mm²`])},
  {q:'Hoe groot is de gronddruk onder de poer? (1 decimaal)',answer:p,dec:1,unit:'kN/m²',hint:'p = F / A_poer in kN en m².',sol:steps([`${F} / ${N(a*a,2)} = ${N(p,2)} kN/m²`,p>pt?`Dat is méér dan ${pt}: de poer is te klein!`:`Kleiner dan ${pt}: voldoet.`])},
  {q:'Wat is de minimale zijde van de poer? (2 decimalen)',answer:amin,dec:2,unit:'m',hint:'a = √(F / p_toel)',sol:steps([`A = ${F} / ${pt} = ${N(F/pt,3)} m²`,`a = √${N(F/pt,3)} = ${N(amin,3)} m`])}]}}],
bouwfysica:[
()=>{const ks=pick([100,120]),iso=R(12,20)*10,m=pick(['glaswol','PIR']);const R1=ks/1000/1.0,R2=iso/1000/MAT[m],Rb=0.1/0.9,Rc=R1+R2+0.17+Rb,U=1/(0.13+Rc+0.04);
  return {t:'Spouwmuur doorrekenen',lvl:3,intro:`Een spouwmuur bestaat van binnen naar buiten uit: <b>${ks} mm kalkzandsteen</b> (λ = 1,0), <b>${iso} mm ${m}</b> (λ = ${N(MAT[m],3)}), een luchtspouw (R = 0,17) en <b>100 mm baksteen</b> (λ = 0,9). R<sub>si</sub> = 0,13 en R<sub>se</sub> = 0,04.`,
  parts:[{q:'R van de kalkzandsteen? (3 decimalen)',answer:R1,dec:3,unit:'m²K/W',hint:'R = d / λ, d in m.',sol:steps([`${N(ks/1000)} / 1,0 = ${N(R1,3)}`])},
  {q:'R van de isolatie? (2 decimalen)',answer:R2,dec:2,unit:'m²K/W',hint:'R = d / λ',sol:steps([`${N(iso/1000)} / ${N(MAT[m],3)} = ${N(R2,3)}`])},
  {q:'R<sub>c</sub> van de hele muur? (2 decimalen)',answer:Rc,dec:2,unit:'m²K/W',hint:'Tel alle lagen op, inclusief spouw en baksteen (0,1 / 0,9).',sol:steps([`${N(R1,3)} + ${N(R2,3)} + 0,17 + ${N(Rb,3)} = ${N(Rc,3)}`,Rc>=4.7?'≥ 4,7: voldoet aan de eis voor nieuwbouw.':'< 4,7: voldoet níet aan de eis voor nieuwbouw.'])},
  {q:'U-waarde van de muur? (3 decimalen)',answer:U,dec:3,unit:'W/(m²K)',hint:'U = 1 / (R_si + R_c + R_se)',sol:steps([`R_T = 0,13 + ${N(Rc,3)} + 0,04 = ${N(Rc+0.17,3)}`,`U = 1 / ${N(Rc+0.17,3)} = ${N(U,4)}`])}]}},
()=>{const A=R(80,140),Ag=R(15,35),Uw=0.21,Ug=pick([1.0,1.1,1.6]),dT=pick([20,25]);const Pd=Uw*(A-Ag)*dT,Pg=Ug*Ag*dT,Pt=Pd+Pg,E=Pt*24/1000;
  return {t:'Warmteverlies door de gevels',lvl:3,intro:`De gevels van een woning zijn samen <b>${A} m²</b>, waarvan <b>${Ag} m²</b> glas (U = ${N(Ug)}). Het dichte deel heeft U = 0,21. Op een koude dag is ΔT = <b>${dT} K</b>, de hele dag door.`,
  parts:[{q:'Warmteverlies door het dichte deel? (1 decimaal)',answer:Pd,dec:1,unit:'W',hint:'Φ = U · A · ΔT, met A = gevel − glas.',sol:steps([`A = ${A} − ${Ag} = ${A-Ag} m²`,`Φ = 0,21 × ${A-Ag} × ${dT} = ${N(Pd,2)} W`])},
  {q:'Warmteverlies door het glas? (1 decimaal)',answer:Pg,dec:1,unit:'W',hint:'Φ = U · A · ΔT',sol:steps([`${N(Ug)} × ${Ag} × ${dT} = ${N(Pg,2)} W`])},
  {q:'Hoeveel procent van het verlies gaat door het glas? (1 decimaal)',answer:Pg/Pt*100,dec:1,unit:'%',hint:'Φ_glas / Φ_totaal × 100%',sol:steps([`Totaal: ${N(Pt,2)} W`,`${N(Pg,2)} / ${N(Pt,2)} × 100% = ${N(Pg/Pt*100,2)}%`,`Terwijl glas maar ${N(Ag/A*100,1)}% van het oppervlak is!`])},
  {q:'Hoeveel energie (kWh) gaat er die dag verloren? (2 decimalen)',answer:E,dec:2,unit:'kWh',hint:'Energie = vermogen × tijd. W × uren ÷ 1000 = kWh.',sol:steps([`${N(Pt,2)} W × 24 h = ${N(Pt*24,1)} Wh`,`÷ 1000 = ${N(E,3)} kWh`])}]}}]
};

// ================= NIEUWE BLADEN: natuurkunde, installaties, geluid & vocht, bouweconomie =================
const RHO={hout:500,water:1000,beton:2400,metselwerk:1900,staal:7850,aluminium:2700,glas:2500};
const lg=Math.log10;

// ---- Natuurkunde basis ----
function genDichtheid(l){
  if(l===1){const V=pick([0.2,0.25,0.4,0.5,0.8,1.5,2]),mat=pick(['beton','staal','hout','glas']);const m=V*RHO[mat];
    return {q:`Een blok ${mat} heeft een volume van <b>${N(V)} m³</b> en een massa van <b>${N(m)} kg</b>. Wat is de dichtheid (volumieke massa)?`,type:'num',answer:RHO[mat],unit:'kg/m³',hint:'ρ = m / V',sol:steps([`ρ = ${N(m)} / ${N(V)} = ${N(RHO[mat])} kg/m³`])}}
  if(l===2){const mat=pick(['staal','beton','hout','aluminium']),L=pick([20,50,80,120,250]);const m=L/1000*RHO[mat];
    return {q:`Hoeveel kg weegt <b>${L} dm³</b> ${mat}? (ρ = ${N(RHO[mat])} kg/m³)`,type:'num',answer:m,dec:1,unit:'kg',hint:'Zet dm³ eerst om naar m³ (÷ 1000). m = ρ · V',sol:steps([`${L} dm³ = ${N(L/1000)} m³`,`m = ${N(RHO[mat])} × ${N(L/1000)} = ${N(m,2)} kg`])}}
  const A=pick([28.5,39.1,53.8,72.7,98.8]),mpm=A/1e4*7850,m=R(150,900);const L=m/mpm;
  return {q:`Een stalen profiel heeft een doorsnede van <b>${N(A)} cm²</b> (ρ = 7850 kg/m³). Op de bouwplaats ligt <b>${m} kg</b> van dit profiel. Hoeveel meter is dat? Rond af op 2 decimalen.`,type:'num',answer:L,dec:2,unit:'m',hint:'Bereken eerst de massa per meter: A (in m²) × 1 m × ρ.',sol:steps([`A = ${N(A)} cm² = ${N(A/1e4,5)} m²`,`Massa per meter: ${N(A/1e4,5)} × 7850 = ${N(mpm,3)} kg/m`,`L = ${m} / ${N(mpm,3)} = ${N(L,3)} m`])};
}
function genDruk(l){
  if(l===1){const F=R(2,40)*50,A=pick([0.02,0.05,0.1,0.25,0.5]);const p=F/A;return {q:`Een kracht van <b>${N(F)} N</b> werkt op een oppervlak van <b>${N(A)} m²</b>. Hoe groot is de druk in Pa (N/m²)?`,type:'num',answer:p,unit:'Pa',hint:'p = F / A',sol:steps([`p = ${N(F)} / ${N(A)} = ${N(p)} Pa`])}}
  if(l===2){const h=rnd(R(10,60)/10,1);const p=1000*10*h/1000;return {q:`Een bouwput staat vol water tot <b>${N(h)} m</b> diep. Hoe groot is de waterdruk op de bodem in kPa? (ρ = 1000 kg/m³, g = 10 N/kg)`,type:'num',answer:p,dec:1,unit:'kPa',hint:'p = ρ · g · h (in Pa), daarna ÷ 1000 voor kPa.',sol:steps([`p = 1000 × 10 × ${N(h)} = ${N(p*1000)} Pa`,`= ${N(p)} kPa (= ${N(p)} kN/m²)`])}}
  const h=rnd(R(10,30)/10,1),L=R(8,15),B=R(6,10);const p=10*h,F=p*L*B;
  return {q:`Een kelder van <b>${L} × ${B} m</b> ligt met de onderkant <b>${N(h)} m</b> onder de grondwaterstand. Hoe groot is de totale opwaartse waterkracht op de keldervloer in kN? (Water: 10 kN/m³)`,type:'num',answer:F,dec:0,unit:'kN',hint:'Waterdruk p = 10 × h (kN/m²). Kracht = p × oppervlak.',sol:steps([`p = 10 × ${N(h)} = ${N(p)} kN/m²`,`A = ${L} × ${B} = ${L*B} m²`,`F = ${N(p)} × ${L*B} = ${N(F,1)} kN`,'Is de kelder lichter dan deze kracht, dan drijft hij op!'])};
}
function genArbeid(l){
  if(l===1){const F=R(5,80)*10,s=rnd(R(5,50)/10,1);const W=F*s;return {q:`Je duwt een kruiwagen met een kracht van <b>${F} N</b> over <b>${N(s)} m</b>. Hoeveel arbeid verricht je?`,type:'num',answer:W,dec:0,unit:'J',hint:'W = F · s',sol:steps([`W = ${F} × ${N(s)} = ${N(W)} J`])}}
  if(l===2){const m=R(5,80)*25,h=R(6,40);const E=m*10*h/1000;return {q:`Een kraan hijst een pallet van <b>${m} kg</b> <b>${h} m</b> omhoog. Hoeveel potentiële energie krijgt de pallet erbij in kJ? (g = 10 N/kg)`,type:'num',answer:E,dec:1,unit:'kJ',hint:'E = m · g · h (in J), daarna ÷ 1000.',sol:steps([`E = ${m} × 10 × ${h} = ${N(m*10*h)} J`,`= ${N(E)} kJ`])}}
  const m=R(10,60)*50,h=R(10,30),eta=pick([0.6,0.7,0.75,0.8]);const Wn=m*10*h/1000;const Wt=Wn/eta;
  return {q:`Een bouwlift brengt <b>${m} kg</b> materiaal <b>${h} m</b> omhoog. Het rendement van de lift is <b>${N(eta*100)}%</b>. Hoeveel energie (in kJ) moet de motor leveren? (g = 10 N/kg)`,type:'num',answer:Wt,dec:1,unit:'kJ',hint:'Nuttige energie = m·g·h. Toegevoerd = nuttig ÷ rendement.',sol:steps([`Nuttig: ${m} × 10 × ${h} = ${N(Wn*1000)} J = ${N(Wn)} kJ`,`Toegevoerd: ${N(Wn)} / ${N(eta)} = ${N(Wt,2)} kJ`])};
}
function genVermogen(l){
  if(l===1){const W=R(6,60)*1000,t=pick([10,20,30,60,120]);const P=W/t;return {q:`Een machine verricht <b>${N(W)} J</b> arbeid in <b>${t} s</b>. Hoe groot is het vermogen?`,type:'num',answer:P,dec:1,unit:'W',hint:'P = W / t',sol:steps([`P = ${N(W)} / ${t} = ${N(P,2)} W`])}}
  if(l===2){const m=R(10,60)*20,h=R(5,25),t=R(10,60);const P=m*10*h/t/1000;return {q:`Een bouwlift tilt <b>${m} kg</b> in <b>${t} s</b> naar <b>${h} m</b> hoogte. Welk (nuttig) vermogen levert hij in kW? (g = 10 N/kg)`,type:'num',answer:P,dec:2,unit:'kW',hint:'P = m·g·h / t',sol:steps([`W = ${m} × 10 × ${h} = ${N(m*10*h)} J`,`P = ${N(m*10*h)} / ${t} = ${N(m*10*h/t,1)} W = ${N(P,3)} kW`])}}
  const P=pick([0.8,1.2,1.5,2,2.5,3.5]),u=R(2,10),d=R(5,22),pr=pick([0.28,0.32,0.35,0.4]);const E=P*u*d;const K=E*pr;
  return {q:`Een bouwdroger van <b>${N(P)} kW</b> draait <b>${u} uur per dag</b>, <b>${d} dagen</b> lang. Stroom kost € ${N(pr,2)} per kWh. Wat kost dat?`,type:'num',answer:K,dec:2,unit:'€',unitPre:true,hint:'E (kWh) = P (kW) × t (h). Kosten = E × prijs.',sol:steps([`t = ${u} × ${d} = ${u*d} h`,`E = ${N(P)} × ${u*d} = ${N(E,2)} kWh`,`Kosten: ${N(E,2)} × € ${N(pr,2)} = € ${N(K,2)}`])};
}

// ---- Installaties ----
function genOhm(l){
  if(l===1){const I=rnd(R(5,100)/10,1),Rr=R(2,100);const U=I*Rr;return {q:`Door een weerstand van <b>${Rr} Ω</b> loopt een stroom van <b>${N(I)} A</b>. Hoe groot is de spanning?`,type:'num',answer:U,dec:1,unit:'V',hint:'Wet van Ohm: U = I · R',sol:steps([`U = ${N(I)} × ${Rr} = ${N(U,2)} V`])}}
  if(l===2){const U=pick([12,24,230]),Rr=pick([4,6,8,12,23,46,92,115]);const I=U/Rr;return {q:`Een apparaat met een weerstand van <b>${Rr} Ω</b> wordt aangesloten op <b>${U} V</b>. Hoe groot is de stroom? Rond af op 2 decimalen.`,type:'num',answer:I,dec:2,unit:'A',hint:'I = U / R',sol:steps([`I = ${U} / ${Rr} = ${N(I,3)} A`])}}
  const a=R(10,60),b=R(10,60),c=R(10,60),par=Math.random()<.5;const v=par?1/(1/a+1/b):a+b+c;
  return {q:par?`Twee weerstanden van <b>${a} Ω</b> en <b>${b} Ω</b> staan <b>parallel</b>. Wat is de vervangingsweerstand? Rond af op 2 decimalen.`:`Drie weerstanden van <b>${a}</b>, <b>${b}</b> en <b>${c} Ω</b> staan <b>in serie</b>. Wat is de vervangingsweerstand?`,type:'num',answer:v,dec:par?2:undefined,unit:'Ω',hint:par?'Parallel: 1/R = 1/R₁ + 1/R₂ (de totale weerstand is kleiner dan de kleinste).':'Serie: R = R₁ + R₂ + R₃',sol:steps(par?[`1/R = 1/${a} + 1/${b} = ${N(1/a+1/b,5)}`,`R = 1 / ${N(1/a+1/b,5)} = ${N(v,3)} Ω`]:[`R = ${a} + ${b} + ${c} = ${v} Ω`])};
}
function genElVermogen(l){
  if(l===1){const I=rnd(R(2,160)/10,1);const P=230*I;return {q:`Een apparaat op <b>230 V</b> trekt <b>${N(I)} A</b>. Hoe groot is het vermogen?`,type:'num',answer:P,dec:0,unit:'W',hint:'P = U · I',sol:steps([`P = 230 × ${N(I)} = ${N(P,1)} W`])}}
  if(l===2){const P=pick([800,1200,1500,2000,2200,3000,3500]);const I=P/230;return {q:`Een waterkoker van <b>${P} W</b> zit op 230 V. Hoeveel stroom trekt hij? Rond af op 2 decimalen.`,type:'num',answer:I,dec:2,unit:'A',hint:'I = P / U',sol:steps([`I = ${P} / 230 = ${N(I,3)} A`])}}
  const ps=[pick([1200,1500,2000]),pick([700,900,1100]),pick([1800,2200,2500])];const I=ps.reduce((a,b)=>a+b,0)/230;
  return {q:`Op één groep (230 V, zekering 16 A) staan tegelijk aan: een ${ps[0]} W kachel, een ${ps[1]} W boormachine en een ${ps[2]} W bouwdroger. Hoeveel stroom loopt er door de groep? Rond af op 1 decimaal.`,type:'num',answer:I,dec:1,unit:'A',hint:'Tel de vermogens op, deel door 230 V. Vergelijk met 16 A.',sol:steps([`P = ${ps.join(' + ')} = ${ps.reduce((a,b)=>a+b,0)} W`,`I = ${ps.reduce((a,b)=>a+b,0)} / 230 = ${N(I,2)} A`,I>16?'Meer dan 16 A: de zekering springt eruit!':'Minder dan 16 A: dit kan.'])};
}
function genEnergie(l){
  if(l===1){const P=pick([60,100,500,1000,2000]),t=pick([2,4,5,8,10]);const E=P*t/1000;return {q:`Een apparaat van <b>${P} W</b> staat <b>${t} uur</b> aan. Hoeveel kWh verbruikt het?`,type:'num',answer:E,dec:2,unit:'kWh',hint:'E = P × t. Zet W eerst om in kW (÷ 1000).',sol:steps([`${P} W = ${N(P/1000)} kW`,`E = ${N(P/1000)} × ${t} = ${N(E)} kWh`])}}
  if(l===2){const E=R(1500,4500),pr=pick([0.28,0.3,0.34,0.4]);const K=E*pr;return {q:`Een huishouden verbruikt <b>${N(E)} kWh</b> per jaar. Stroom kost <b>€ ${N(pr,2)}</b> per kWh. Wat zijn de jaarkosten?`,type:'num',answer:K,dec:2,unit:'€',unitPre:true,hint:'Kosten = kWh × prijs per kWh',sol:steps([`${N(E)} × € ${N(pr,2)} = € ${N(K,2)}`])}}
  const Q=R(6,14)*1000,cop=pick([3,3.5,4,4.5]),pr=pick([0.3,0.34]);const E=Q/cop,K=E*pr;
  return {q:`Een woning heeft per jaar <b>${N(Q)} kWh</b> warmte nodig. Een warmtepomp heeft een COP van <b>${N(cop)}</b>. Wat kost de stroom voor de warmtepomp per jaar bij € ${N(pr,2)}/kWh?`,type:'num',answer:K,dec:2,unit:'€',unitPre:true,hint:'COP = geleverde warmte ÷ gebruikte stroom. Dus stroom = warmte ÷ COP.',sol:steps([`Stroom: ${N(Q)} / ${N(cop)} = ${N(E,1)} kWh`,`Kosten: ${N(E,1)} × € ${N(pr,2)} = € ${N(K,2)}`])};
}
function genDebiet(l){
  if(l===1){const V=R(5,60)*10,t=pick([2,4,5,10,20]);const Q=V/t;return {q:`Een kraan vult in <b>${t} minuten</b> een bak van <b>${V} liter</b>. Wat is het debiet in liter per minuut?`,type:'num',answer:Q,dec:1,unit:'L/min',hint:'Q = V / t',sol:steps([`Q = ${V} / ${t} = ${N(Q)} L/min`])}}
  if(l===2){const d=pick([15,22,28,40,50,75,110]),v=pick([0.5,1,1.5,2]);const A=Math.PI*(d/2000)**2;const Q=A*v*1000;
    return {q:`Water stroomt met <b>${N(v)} m/s</b> door een leiding met een binnendiameter van <b>${d} mm</b>. Hoeveel liter per seconde stroomt er? Rond af op 3 decimalen.`,type:'num',answer:Q,dec:3,unit:'L/s',hint:'Q = A · v (m³/s). A = ¼πd² met d in meter. Daarna × 1000 voor L/s.',sol:steps([`d = ${d} mm = ${N(d/1000)} m`,`A = ¼ × π × ${N(d/1000)}² = ${N(A,7)} m²`,`Q = ${N(A,7)} × ${N(v)} = ${N(A*v,7)} m³/s = ${N(Q,4)} L/s`])}}
  const Q=pick([0.3,0.5,0.8,1.2,2,3]),v=pick([1,1.5,2]);const d=Math.sqrt(4*Q/1000/(Math.PI*v))*1000;
  return {q:`Een leiding moet <b>${N(Q)} L/s</b> afvoeren. De stroomsnelheid mag maximaal <b>${N(v)} m/s</b> zijn. Hoe groot moet de binnendiameter minimaal zijn in mm? Rond af op 1 decimaal.`,type:'num',answer:d,dec:1,unit:'mm',hint:'A = Q / v (in m³/s en m/s), daarna d = √(4A/π).',sol:steps([`Q = ${N(Q)} L/s = ${N(Q/1000)} m³/s`,`A = ${N(Q/1000)} / ${N(v)} = ${N(Q/1000/v,6)} m²`,`d = √(4 × ${N(Q/1000/v,6)} / π) = ${N(d/1000,5)} m = ${N(d,2)} mm`])};
}

// ---- Geluid en vocht ----
const PSAT=[[0,611],[2,706],[4,813],[6,935],[8,1072],[10,1228],[12,1402],[14,1598],[16,1817],[18,2063],[20,2339],[22,2645],[24,2985]];
const psatTable=()=>`<div class="tblwrap"><table class="ltab"><thead><tr><th>θ (°C)</th>${PSAT.map(r=>`<th>${r[0]}</th>`).join('')}</tr></thead><tbody><tr><td>p<sub>sat</sub> (Pa)</td>${PSAT.map(r=>`<td>${r[1]}</td>`).join('')}</tr></tbody></table></div>`;
function dauwpunt(pw){for(let i=0;i<PSAT.length-1;i++){const[a,pa]=PSAT[i],[b,pb]=PSAT[i+1];if(pw>=pa&&pw<=pb)return a+(pw-pa)/(pb-pa)*(b-a)}return NaN}
function genDbOptellen(l){
  if(l===1){const L=R(60,90);return {q:`Twee even luide machines produceren elk <b>${L} dB</b>. Hoe hard is het samen?`,type:'num',answer:L+3,dec:0,unit:'dB',hint:'Twee gelijke bronnen: +3 dB (niet het dubbele!).',sol:steps([`L = ${L} + 10·log(2) ≈ ${L} + 3 = ${L+3} dB`])}}
  if(l===2){const L=R(60,85),n=pick([3,4,5,8,10]);const v=L+10*lg(n);return {q:`Op een bouwplaats draaien <b>${n}</b> gelijke trilplaten van elk <b>${L} dB</b>. Hoe hoog is het totale geluidsniveau? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'dB',hint:'n gelijke bronnen: L_tot = L + 10·log(n)',sol:steps([`10·log(${n}) = ${N(10*lg(n),2)}`,`L = ${L} + ${N(10*lg(n),2)} = ${N(v,2)} dB`])}}
  const a=R(65,90),b=a-R(0,10);const v=10*lg(10**(a/10)+10**(b/10));
  return {q:`Twee bronnen van <b>${a} dB</b> en <b>${b} dB</b> klinken tegelijk. Wat is het totale niveau? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'dB',hint:'L = 10·log(10^(L₁/10) + 10^(L₂/10))',sol:steps([`10^(${a}/10) + 10^(${b}/10) = ${N(10**(a/10),0)} + ${N(10**(b/10),0)}`,`L = 10 · log(${N(10**(a/10)+10**(b/10),0)}) = ${N(v,2)} dB`,'Scheelt het meer dan 10 dB, dan hoor je de zachte bron nauwelijks terug.'])};
}
function genDbAfstand(l){
  if(l===1){const L=R(70,100),r=pick([5,10,20]);return {q:`Een heistelling geeft op <b>${r} m</b> afstand <b>${L} dB</b>. Hoeveel dB meet je op <b>${2*r} m</b>? (Puntbron)`,type:'num',answer:L-6,dec:0,unit:'dB',hint:'Bij een puntbron: elke verdubbeling van de afstand geeft −6 dB.',sol:steps([`Afstand ×2 → −6 dB`,`${L} − 6 = ${L-6} dB`])}}
  if(l===2){const L=R(75,100),r1=pick([5,10,25]),r2=r1*pick([3,5,8,10]);const v=L-20*lg(r2/r1);return {q:`Een puntbron geeft <b>${L} dB</b> op <b>${r1} m</b>. Wat is het niveau op <b>${r2} m</b>? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'dB',hint:'L₂ = L₁ − 20·log(r₂ / r₁)',sol:steps([`20·log(${r2}/${r1}) = ${N(20*lg(r2/r1),2)}`,`L₂ = ${L} − ${N(20*lg(r2/r1),2)} = ${N(v,2)} dB`])}}
  const L=R(65,80),r1=pick([10,20,25]),r2=r1*pick([2,4,8]);const v=L-10*lg(r2/r1);
  return {q:`Een drukke weg (lijnbron) geeft <b>${L} dB</b> op <b>${r1} m</b>. Wat is het niveau op <b>${r2} m</b>? Rond af op 1 decimaal.`,type:'num',answer:v,dec:1,unit:'dB',hint:'Bij een lijnbron: L₂ = L₁ − 10·log(r₂/r₁), dus −3 dB per verdubbeling.',sol:steps([`10·log(${r2/r1}) = ${N(10*lg(r2/r1),2)}`,`L₂ = ${L} − ${N(10*lg(r2/r1),2)} = ${N(v,2)} dB`])};
}
function genRV(l){
  if(l===1){const [T,ps]=pick(PSAT.slice(5));const rv=pick([40,50,60,70,80]);const pw=Math.round(ps*rv/100);return {q:`Bij ${T} °C is de verzadigingsdruk <b>${ps} Pa</b>. De werkelijke dampdruk is <b>${pw} Pa</b>. Wat is de relatieve vochtigheid? Rond af op hele procenten.`,type:'num',answer:pw/ps*100,dec:0,unit:'%',hint:'RV = p_w / p_sat × 100%',sol:steps([`RV = ${pw} / ${ps} × 100% = ${N(pw/ps*100,1)}%`])}}
  if(l===2){const [T,ps]=pick(PSAT.slice(5));const rv=pick([45,55,65,75]);const pw=ps*rv/100;return {q:`In een badkamer is het <b>${T} °C</b> (p<sub>sat</sub> = ${ps} Pa) en de relatieve vochtigheid is <b>${rv}%</b>. Hoe groot is de dampdruk? Rond af op hele Pa.`,type:'num',answer:pw,dec:0,unit:'Pa',hint:'p_w = RV × p_sat',sol:steps([`p_w = ${N(rv/100)} × ${ps} = ${N(pw,1)} Pa`])}}
  const i=R(9,12),[T,ps]=PSAT[i],rv=pick([50,60,70]),j=R(3,i-3),[T2,ps2]=PSAT[j];const pw=ps*rv/100;const rv2=pw/ps2*100;
  return {q:`Lucht van <b>${T} °C</b> en <b>${rv}%</b> RV koelt af tegen een koud raam tot <b>${T2} °C</b>. Wat wordt de relatieve vochtigheid bij het raam? Rond af op hele procenten. (Gebruik de tabel.)${psatTable()}`,type:'num',answer:rv2,dec:0,unit:'%',hint:'De dampdruk blijft gelijk; alleen p_sat wordt kleiner. Boven 100% condenseert er water.',sol:steps([`p_w = ${N(rv/100)} × ${ps} = ${N(pw,1)} Pa`,`Bij ${T2} °C: p_sat = ${ps2} Pa`,`RV = ${N(pw,1)} / ${ps2} × 100% = ${N(rv2,1)}%`,rv2>=100?'Meer dan 100%: er ontstaat condens op het raam!':'Onder 100%: (nog) geen condens.'])};
}
function genDauw(l){
  if(l===1){const [T,ps]=pick(PSAT.slice(3,11));return {q:`Lucht heeft een dampdruk van <b>${ps} Pa</b>. Bij welke temperatuur gaat deze lucht condenseren (dauwpunt)? Gebruik de tabel.${psatTable()}`,type:'num',answer:T,unit:'°C',hint:'Het dauwpunt is de temperatuur waarbij p_sat gelijk is aan de dampdruk.',sol:steps([`Zoek ${ps} Pa in de tabel → ${T} °C`])}}
  const i=R(8,12),[T,ps]=PSAT[i],rv=pick(l===2?[50,60,70]:[45,55,65,75]);const pw=ps*rv/100;const d=dauwpunt(pw);
  return {q:`Binnenlucht is <b>${T} °C</b> met <b>${rv}%</b> RV. Bepaal het dauwpunt door te interpoleren in de tabel. Rond af op 1 decimaal.${psatTable()}`,type:'num',answer:d,dec:1,unit:'°C',hint:'Bereken p_w = RV × p_sat(T). Zoek tussen welke twee tabelwaarden p_w ligt en interpoleer lineair.',sol:steps([`p_w = ${N(rv/100)} × ${ps} = ${N(pw,1)} Pa`,`Ligt tussen ${PSAT.filter(r=>r[1]<=pw).slice(-1)[0].join(' °C: ')} Pa en ${PSAT.find(r=>r[1]>pw).join(' °C: ')} Pa`,`Dauwpunt ≈ ${N(d,2)} °C`,'Oppervlakken kouder dan het dauwpunt worden nat.'])};
}

// ---- Bouweconomie ----
function genKostprijs(l){
  if(l===1){const A=R(80,250),K=A*pick([1450,1650,1850,2100,2400]);return {q:`De bouwkosten van een woning met <b>${A} m²</b> bruto vloeroppervlak (BVO) zijn <b>€ ${N(K)}</b>. Wat is de prijs per m² BVO?`,type:'num',answer:K/A,dec:2,unit:'€/m²',hint:'Prijs per m² = totale kosten ÷ oppervlak',sol:steps([`€ ${N(K)} ÷ ${A} = € ${N(K/A,2)} per m²`])}}
  if(l===2){const A=R(400,2500),p=pick([1650,1800,1950,2200]),st=pick([5,8,10]);const K=A*p*(1+st/100);return {q:`Een kantoor krijgt <b>${N(A)} m²</b> BVO. Kengetal: <b>€ ${N(p)}</b> per m². Er komt <b>${st}% onvoorzien</b> bij. Wat is de raming?`,type:'num',answer:K,dec:0,unit:'€',unitPre:true,hint:'Oppervlak × kengetal × (1 + onvoorzien).',sol:steps([`${N(A)} × € ${N(p)} = € ${N(A*p)}`,`× ${N(1+st/100)} = € ${N(K,0)}`])}}
  const BVO=R(1000,4000),f=pick([0.75,0.8,0.82,0.85]),K=BVO*pick([1800,2000,2300]);const GO=BVO*f;
  return {q:`Een appartementengebouw heeft <b>${N(BVO)} m² BVO</b>. De verhouding GO/BVO is <b>${N(f)}</b>. De bouwkosten zijn <b>€ ${N(K)}</b>. Wat kost een m² gebruiksoppervlak (GO)?`,type:'num',answer:K/GO,dec:2,unit:'€/m²',hint:'GO = BVO × verhouding. Daarna kosten ÷ GO.',sol:steps([`GO = ${N(BVO)} × ${N(f)} = ${N(GO,1)} m²`,`€ ${N(K)} ÷ ${N(GO,1)} = € ${N(K/GO,2)} per m² GO`,'Per m² GO is altijd duurder dan per m² BVO.'])};
}
function genRente(l){
  const K=R(10,200)*1000,p=pick([2,3,3.5,4,4.5,5]),n=R(2,15);
  if(l===1)return {q:`Je leent <b>€ ${N(K)}</b> tegen <b>${N(p)}% enkelvoudige rente</b> per jaar. Hoeveel rente betaal je in totaal na <b>${n} jaar</b>?`,type:'num',answer:K*p/100*n,dec:2,unit:'€',unitPre:true,hint:'Enkelvoudig: elk jaar dezelfde rente: K × p/100 × n',sol:steps([`Per jaar: € ${N(K)} × ${N(p/100)} = € ${N(K*p/100,2)}`,`× ${n} jaar = € ${N(K*p/100*n,2)}`])};
  if(l===2){const v=K*(1+p/100)**n;return {q:`Je zet <b>€ ${N(K)}</b> vast tegen <b>${N(p)}% samengestelde rente</b>. Hoeveel staat er na <b>${n} jaar</b>?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Samengesteld: K_n = K × (1 + p/100)^n',sol:steps([`Groeifactor: ${N(1+p/100)}`,`€ ${N(K)} × ${N(1+p/100)}^${n} = € ${N(v,2)}`])}}
  const Kn=R(50,500)*1000;const v=Kn/(1+p/100)**n;return {q:`Over <b>${n} jaar</b> moet er <b>€ ${N(Kn)}</b> zijn voor groot onderhoud. Hoeveel moet je nu storten bij <b>${N(p)}%</b> samengestelde rente? (Contante waarde)`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'K = K_n / (1 + p/100)^n',sol:steps([`(1 + ${N(p/100)})^${n} = ${N((1+p/100)**n,5)}`,`K = € ${N(Kn)} / ${N((1+p/100)**n,5)} = € ${N(v,2)}`])};
}
function genAfschr(l){
  const A=R(20,200)*1000,Rw=Math.round(A*pick([0,0.05,0.1])/100)*100,n=pick([5,8,10,12,15,20]);const a=(A-Rw)/n;
  if(l===1)return {q:`Een hijskraan kost <b>€ ${N(A)}</b>, gaat <b>${n} jaar</b> mee en heeft daarna een restwaarde van <b>€ ${N(Rw)}</b>. Hoeveel is de lineaire afschrijving per jaar?`,type:'num',answer:a,dec:2,unit:'€',unitPre:true,hint:'(aanschafwaarde − restwaarde) ÷ levensduur',sol:steps([`(€ ${N(A)} − € ${N(Rw)}) ÷ ${n} = € ${N(a,2)} per jaar`])};
  if(l===2){const k=R(2,n-1);return {q:`Een machine kost <b>€ ${N(A)}</b>, restwaarde <b>€ ${N(Rw)}</b>, levensduur <b>${n} jaar</b>, lineaire afschrijving. Wat is de boekwaarde na <b>${k} jaar</b>?`,type:'num',answer:A-k*a,dec:2,unit:'€',unitPre:true,hint:'Boekwaarde = aanschaf − k × afschrijving per jaar',sol:steps([`Afschrijving per jaar: € ${N(a,2)}`,`€ ${N(A)} − ${k} × € ${N(a,2)} = € ${N(A-k*a,2)}`])}}
  const p=pick([15,20,25,30]),k=R(2,6);const v=A*(1-p/100)**k;return {q:`Een bouwbus van <b>€ ${N(A)}</b> wordt elk jaar <b>${p}%</b> van de boekwaarde afgeschreven (degressief). Wat is de boekwaarde na <b>${k} jaar</b>?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Boekwaarde = A × (1 − p/100)^k',sol:steps([`Factor per jaar: ${N(1-p/100)}`,`€ ${N(A)} × ${N(1-p/100)}^${k} = € ${N(v,2)}`])};
}
function genBegroting(l){
  const DK=R(50,900)*1000,ak=pick([6,8,10]),wr=pick([3,5,6]);
  if(l===1)return {q:`De directe bouwkosten zijn <b>€ ${N(DK)}</b>. De aannemer rekent <b>${ak}%</b> algemene kosten (AK) erbovenop. Wat zijn de kosten inclusief AK?`,type:'num',answer:DK*(1+ak/100),dec:0,unit:'€',unitPre:true,hint:`× ${N(1+ak/100)}`,sol:steps([`€ ${N(DK)} × ${N(1+ak/100)} = € ${N(DK*(1+ak/100),0)}`])};
  const v2=DK*(1+ak/100)*(1+wr/100);
  if(l===2)return {q:`Directe kosten <b>€ ${N(DK)}</b>. Daarover <b>${ak}% AK</b>, en over het totaal daarvan <b>${wr}% winst & risico</b>. Wat is de aanneemsom (excl. btw)?`,type:'num',answer:v2,dec:0,unit:'€',unitPre:true,hint:'Opslagen stapelen: eerst AK erbij, dan W&R over dat nieuwe bedrag.',sol:steps([`Incl. AK: € ${N(DK)} × ${N(1+ak/100)} = € ${N(DK*(1+ak/100),0)}`,`Incl. W&R: × ${N(1+wr/100)} = € ${N(v2,0)}`])};
  const A=R(100,600);const v=v2*1.21/A;
  return {q:`Directe kosten <b>€ ${N(DK)}</b>, <b>${ak}% AK</b>, daarna <b>${wr}% W&R</b>, daarna <b>21% btw</b>. Het gebouw heeft <b>${A} m² BVO</b>. Wat is de prijs per m² BVO inclusief btw?`,type:'num',answer:v,dec:2,unit:'€/m²',hint:'Stapel alle opslagen (× 1,0… × 1,0… × 1,21) en deel door het oppervlak.',sol:steps([`€ ${N(DK)} × ${N(1+ak/100)} × ${N(1+wr/100)} × 1,21 = € ${N(v2*1.21,0)}`,`÷ ${A} m² = € ${N(v,2)} per m²`])};
}

const CASES2={
natuurkunde:[
()=>{const L=R(8,14),B=R(6,10),d=pick([0.3,0.35,0.4]),h=rnd(R(10,25)/10,1);const Fw=10*h*L*B,G=24*L*B*d;
  return {t:'Drijft de kelderbak?',lvl:3,intro:`Een betonnen kelderbak van <b>${L} × ${B} m</b> heeft een vloer van <b>${N(d)} m</b> dik. Tijdens de bouw (nog zonder wanden en bovenbouw) staat het grondwater <b>${N(h)} m</b> boven de onderkant van de vloer. Water: 10 kN/m³, beton: 24 kN/m³.`,
  parts:[{q:'Hoe groot is de waterdruk onder de vloer?',answer:10*h,dec:1,unit:'kN/m²',hint:'p = γ_water × h',sol:steps([`10 × ${N(h)} = ${N(10*h)} kN/m²`])},
  {q:'Hoe groot is de totale opwaartse kracht?',answer:Fw,dec:0,unit:'kN',hint:'F = p × A',sol:steps([`${N(10*h)} × ${L*B} = ${N(Fw,1)} kN`])},
  {q:'Hoe zwaar is de vloer zelf?',answer:G,dec:0,unit:'kN',hint:'G = volume × 24',sol:steps([`V = ${L} × ${B} × ${N(d)} = ${N(L*B*d,2)} m³`,`G = ${N(L*B*d,2)} × 24 = ${N(G,1)} kN`])},
  {q:'Hoeveel kN moet er minimaal extra gewicht (of verankering) bij om opdrijven te voorkomen? (0 als het niet nodig is)',answer:Math.max(0,Fw-G),dec:0,unit:'kN',hint:'Opwaarts − eigen gewicht.',sol:steps([`${N(Fw,1)} − ${N(G,1)} = ${N(Fw-G,1)} kN`,Fw>G?'De vloer drijft op zonder maatregelen: bemaling, ballast of trekpalen nodig.':'Het eigen gewicht is groot genoeg.'])}]}},
()=>{const m=R(20,60)*25,h=R(12,30),t=R(20,60),eta=pick([0.65,0.7,0.8]),pr=0.35,n=R(40,120);const W=m*10*h,P=W/t,Pm=P/eta,E=Pm*t*n/3.6e6;
  return {t:'Bouwlift: energie en vermogen',lvl:3,intro:`Een bouwlift brengt telkens <b>${m} kg</b> materiaal <b>${h} m</b> omhoog in <b>${t} s</b>. Het rendement is <b>${N(eta*100)}%</b>. Op een dag maakt hij <b>${n} ritten</b> omhoog. g = 10 N/kg, stroom € 0,35 per kWh.`,
  parts:[{q:'Hoeveel nuttige arbeid per rit (in kJ)?',answer:W/1000,dec:1,unit:'kJ',hint:'W = m · g · h',sol:steps([`${m} × 10 × ${h} = ${N(W)} J = ${N(W/1000)} kJ`])},
  {q:'Welk nuttig vermogen levert de lift (in kW)?',answer:P/1000,dec:2,unit:'kW',hint:'P = W / t',sol:steps([`${N(W)} / ${t} = ${N(P,1)} W = ${N(P/1000,3)} kW`])},
  {q:'Welk vermogen neemt de motor op (in kW)?',answer:Pm/1000,dec:2,unit:'kW',hint:'P_motor = P_nuttig / rendement',sol:steps([`${N(P/1000,3)} / ${N(eta)} = ${N(Pm/1000,3)} kW`])},
  {q:'Hoeveel kost de stroom voor een dag ritten omhoog?',answer:E*pr,dec:2,unit:'€',unitPre:true,hint:'Energie per dag = P_motor × totale tijd. 1 kWh = 3 600 000 J.',sol:steps([`Tijd: ${n} × ${t} s = ${n*t} s = ${N(n*t/3600,3)} h`,`E = ${N(Pm/1000,3)} kW × ${N(n*t/3600,3)} h = ${N(E,3)} kWh`,`€ ${N(E*pr,2)}`])}]}}],
installaties:[
()=>{const ps=[pick([2000,2200]),pick([1500,1800]),pick([800,1100]),pick([600,750])];const tot=ps.reduce((a,b)=>a+b,0),I=tot/230,u=pick([6,8]),E=tot/1000*u*5,K=E*0.34;
  return {t:'Bouwstroom op één groep',lvl:2,intro:`Op een bouwkeet-groep (230 V, 16 A zekering) staan: een kachel van <b>${ps[0]} W</b>, een bouwdroger van <b>${ps[1]} W</b>, een waterkoker van <b>${ps[2]} W</b> en verlichting van <b>${ps[3]} W</b>. Stroom kost € 0,34/kWh.`,
  parts:[{q:'Wat is het totale vermogen?',answer:tot,unit:'W',hint:'Optellen.',sol:steps([`${ps.join(' + ')} = ${tot} W`])},
  {q:'Hoeveel stroom loopt er als alles tegelijk aanstaat? (1 decimaal)',answer:I,dec:1,unit:'A',hint:'I = P / U',sol:steps([`${tot} / 230 = ${N(I,2)} A`,I>16?'Boven 16 A: zekering slaat door. Verdeel over twee groepen.':'Onder 16 A: dat past.'])},
  {q:`Alles staat ${u} uur per dag aan, 5 dagen per week. Hoeveel kWh per week?`,answer:E,dec:1,unit:'kWh',hint:'kW × uren',sol:steps([`${N(tot/1000)} kW × ${u*5} h = ${N(E,1)} kWh`])},
  {q:'Wat kost dat per week?',answer:K,dec:2,unit:'€',unitPre:true,hint:'kWh × prijs',sol:steps([`${N(E,1)} × € 0,34 = € ${N(K,2)}`])}]}},
()=>{const n=R(4,12),Qp=pick([0.1,0.15,0.2]),v=1.5;const Q=n*Qp,A=Q/1000/v,d=Math.sqrt(4*A/Math.PI)*1000;
  return {t:'Waterleiding dimensioneren',lvl:3,intro:`Een sanitaire groep heeft <b>${n} tappunten</b> die elk <b>${N(Qp)} L/s</b> vragen. Ga uit van gelijktijdig gebruik. De stroomsnelheid in de leiding mag maximaal <b>1,5 m/s</b> zijn.`,
  parts:[{q:'Wat is het totale debiet?',answer:Q,dec:2,unit:'L/s',hint:'n × debiet per tappunt',sol:steps([`${n} × ${N(Qp)} = ${N(Q,2)} L/s`])},
  {q:'Wat is dat in m³/s? (Geef als decimaal getal.)',answer:Q/1000,unit:'m³/s',hint:'1 L = 0,001 m³',sol:steps([`${N(Q,2)} / 1000 = ${N(Q/1000,6)} m³/s`])},
  {q:'Welk doorstroomoppervlak is minimaal nodig (in mm²)? (hele mm²)',answer:A*1e6,dec:0,unit:'mm²',hint:'A = Q / v (in m²), daarna × 10⁶ voor mm².',sol:steps([`A = ${N(Q/1000,6)} / 1,5 = ${N(A,8)} m²`,`= ${N(A*1e6,1)} mm²`])},
  {q:'Welke binnendiameter is minimaal nodig? (1 decimaal)',answer:d,dec:1,unit:'mm',hint:'d = √(4A/π)',sol:steps([`d = √(4 × ${N(A*1e6,1)} / π) = ${N(d,2)} mm`,'Kies de eerstvolgende handelsmaat.'])}]}}],
geluid:[
()=>{const L=R(85,95),n=pick([2,4]),r1=10,r2=pick([40,80,160]);const Lt=L+10*lg(n),Lr=Lt-20*lg(r2/r1);
  return {t:'Geluid van een bouwplaats',lvl:3,intro:`Op een bouwplaats draaien <b>${n}</b> gelijke trilplaten. Elke trilplaat geeft <b>${L} dB</b> op <b>10 m</b> afstand. De dichtstbijzijnde woning staat op <b>${r2} m</b>. Beschouw de machines als één puntbron.`,
  parts:[{q:'Wat is het totale niveau op 10 m? (1 decimaal)',answer:Lt,dec:1,unit:'dB',hint:'L + 10·log(n)',sol:steps([`${L} + 10·log(${n}) = ${N(Lt,2)} dB`])},
  {q:'Hoeveel dB neemt het geluid af tussen 10 m en de woning? (1 decimaal)',answer:20*lg(r2/r1),dec:1,unit:'dB',hint:'20·log(r₂/r₁)',sol:steps([`20·log(${r2}/10) = ${N(20*lg(r2/r1),2)} dB`])},
  {q:'Welk niveau komt er bij de woning aan? (1 decimaal)',answer:Lr,dec:1,unit:'dB',hint:'Trek de afname af.',sol:steps([`${N(Lt,2)} − ${N(20*lg(r2/r1),2)} = ${N(Lr,2)} dB`])},
  {q:'Hoeveel machines mogen er maximaal draaien als bij de woning hooguit 70 dB mag aankomen? (Rond naar beneden af op een geheel aantal.)',answer:Math.max(0,Math.floor(10**((70-(L-20*lg(r2/r1)))/10)+1e-9)),unit:'machines',hint:'Eén machine geeft L₁ = L − 20·log(r₂/10) bij de woning. Los op: L₁ + 10·log(n) ≤ 70.',sol:steps([`Eén machine bij de woning: ${N(L-20*lg(r2/r1),2)} dB`,`10·log(n) ≤ 70 − ${N(L-20*lg(r2/r1),2)} = ${N(70-(L-20*lg(r2/r1)),2)}`,`n ≤ 10^(${N((70-(L-20*lg(r2/r1)))/10,3)}) = ${N(10**((70-(L-20*lg(r2/r1)))/10),2)}`,`Maximaal ${Math.max(0,Math.floor(10**((70-(L-20*lg(r2/r1)))/10)+1e-9))}`])}]}},
()=>{const [T,ps]=PSAT[10],rv=pick([55,60,65]),pw=ps*rv/100,d=dauwpunt(pw),Te=pick([-5,0]),RT=pick([0.35,0.5,0.8]);const tsi=20-0.13/RT*(20-Te);
  return {t:'Condens op een koude wand',lvl:3,intro:`In een woonkamer is het <b>20 °C</b> met <b>${rv}%</b> RV. Buiten is het <b>${Te} °C</b>. Een slecht geïsoleerde wand heeft R<sub>T</sub> = <b>${N(RT)} m²K/W</b> (incl. R<sub>si</sub> = 0,13).${psatTable()}`,
  parts:[{q:'Hoe groot is de dampdruk binnen? (hele Pa)',answer:pw,dec:0,unit:'Pa',hint:'p_w = RV × p_sat(20 °C)',sol:steps([`${N(rv/100)} × 2339 = ${N(pw,1)} Pa`])},
  {q:'Wat is het dauwpunt? (1 decimaal)',answer:d,dec:1,unit:'°C',hint:'Interpoleer in de tabel.',sol:steps([`p_w = ${N(pw,1)} Pa → dauwpunt ≈ ${N(d,2)} °C`])},
  {q:'Wat is de binnenoppervlaktetemperatuur van de wand? (1 decimaal)',answer:tsi,dec:1,unit:'°C',hint:'θ_si = 20 − (0,13 / R_T) × (20 − T_e)',sol:steps([`0,13 / ${N(RT)} × ${20-Te} = ${N(0.13/RT*(20-Te),2)} K`,`θ_si = ${N(tsi,2)} °C`])},
  {q:'Hoeveel graden ligt het wandoppervlak boven het dauwpunt? (Negatief = condens; 1 decimaal)',answer:tsi-d,dec:1,unit:'K',hint:'θ_si − dauwpunt',sol:steps([`${N(tsi,2)} − ${N(d,2)} = ${N(tsi-d,2)} K`,tsi<d?'Negatief: de wand wordt nat. Kans op schimmel!':'Positief: geen condens, maar hoe kleiner het verschil, hoe groter het risico.'])}]}}],
economie:[
()=>{const DK=R(300,900)*1000,ak=8,wr=5,A=R(150,400);const a1=DK*1.08,a2=a1*1.05,a3=a2*1.21;
  return {t:'Van begroting naar m²-prijs',lvl:2,intro:`De directe bouwkosten van een kleinschalig appartementengebouw zijn <b>€ ${N(DK)}</b>. Opslagen: <b>8% AK</b>, daarna <b>5% W&R</b>, daarna <b>21% btw</b>. Het gebouw heeft <b>${A} m² BVO</b>.`,
  parts:[{q:'Kosten inclusief AK?',answer:a1,dec:0,unit:'€',unitPre:true,hint:'× 1,08',sol:steps([`€ ${N(DK)} × 1,08 = € ${N(a1,0)}`])},
  {q:'Aanneemsom (incl. AK en W&R, excl. btw)?',answer:a2,dec:0,unit:'€',unitPre:true,hint:'× 1,05 over het vorige bedrag',sol:steps([`€ ${N(a1,0)} × 1,05 = € ${N(a2,0)}`])},
  {q:'Totaal inclusief btw?',answer:a3,dec:0,unit:'€',unitPre:true,hint:'× 1,21',sol:steps([`€ ${N(a2,0)} × 1,21 = € ${N(a3,0)}`])},
  {q:'Prijs per m² BVO inclusief btw?',answer:a3/A,dec:2,unit:'€/m²',hint:'Totaal ÷ BVO',sol:steps([`€ ${N(a3,0)} ÷ ${A} = € ${N(a3/A,2)} per m²`])}]}},
()=>{const A=R(60,200)*1000,n=10,Rw=A*0.1,p=pick([3,4,5]);const a=(A-Rw)/n,bw5=A-5*a,ren=A*p/100;
  return {t:'Investering in een kraan',lvl:3,intro:`Een bouwbedrijf koopt een kraan van <b>€ ${N(A)}</b>. Levensduur <b>10 jaar</b>, restwaarde <b>10%</b> van de aanschaf. Het geld wordt geleend tegen <b>${p}%</b> rente per jaar.`,
  parts:[{q:'Lineaire afschrijving per jaar?',answer:a,dec:2,unit:'€',unitPre:true,hint:'(A − R) / n',sol:steps([`Restwaarde: € ${N(Rw)}`,`(€ ${N(A)} − € ${N(Rw)}) / 10 = € ${N(a,2)}`])},
  {q:'Boekwaarde na 5 jaar?',answer:bw5,dec:2,unit:'€',unitPre:true,hint:'A − 5 × afschrijving',sol:steps([`€ ${N(A)} − 5 × € ${N(a,2)} = € ${N(bw5,2)}`])},
  {q:'Rente in het eerste jaar (over het hele bedrag)?',answer:ren,dec:2,unit:'€',unitPre:true,hint:'A × p/100',sol:steps([`€ ${N(A)} × ${N(p/100)} = € ${N(ren,2)}`])},
  {q:'De kraan draait 1200 uur per jaar. Wat zijn de kapitaalkosten (afschrijving + rente jaar 1) per draaiuur?',answer:(a+ren)/1200,dec:2,unit:'€/uur',hint:'(afschrijving + rente) / uren',sol:steps([`(€ ${N(a,2)} + € ${N(ren,2)}) / 1200 = € ${N((a+ren)/1200,2)} per uur`])}]}}]
};

// ================= BOUWKUNDE: BEGRIPPEN =================
// TERMS[chapter][sub] = [[begrip, uitleg], ...]
const TERMS={
bouwdelen:{
 onderbouw:[['Fundering','Het deel van het gebouw dat alle belastingen overbrengt naar de draagkrachtige grond.'],['Funderingsbalk','Betonnen balk die op palen rust en waarop de muren staan.'],['Poer','Blok beton op een of meer palen, onder een kolom of waar funderingsbalken samenkomen.'],['Heipaal','Lange paal die tot in een draagkrachtige zandlaag wordt geheid of geschroefd.'],['Kruipruimte','Lage ruimte onder de begane grondvloer, bereikbaar via een luik, voor leidingen en ventilatie.'],['Begane grondvloer','De vloer op het niveau van de begane grond, vaak een geïsoleerde systeemvloer boven de kruipruimte.'],['Dekvloer','Afwerklaag van zand-cement of anhydriet op de constructieve vloer, vaak met vloerverwarming erin.'],['Peil','Het vaste referentieniveau op een tekening, meestal bovenkant afgewerkte begane grondvloer (P = 0).'],['Maaiveld','Het niveau van het omliggende terrein.'],['Kanaalplaatvloer','Prefab betonnen vloerelement met holle kanalen in de lengterichting; licht en grote overspanning.']],
 gevel:[['Spouwmuur','Muur van twee bladen met daartussen isolatie en een luchtspouw.'],['Binnenblad','Het dragende, binnenste blad van een spouwmuur, vaak kalkzandsteen of beton.'],['Buitenblad','Het niet-dragende buitenste blad van een spouwmuur, vaak baksteen, dat regen tegenhoudt.'],['Spouwanker','RVS-anker dat het buitenblad aan het binnenblad koppelt.'],['Luchtspouw','Ruimte tussen isolatie en buitenblad waardoor binnengedrongen vocht weg kan lopen en kan drogen.'],['Latei','Draagbalk boven een opening in een muur, die het metselwerk erboven draagt.'],['Open stootvoeg','Vrijgelaten verticale voeg onderin het buitenblad voor ventilatie en afvoer van vocht uit de spouw.'],['Dilatatievoeg','Voeg die uitzetten en krimpen van een bouwdeel mogelijk maakt zonder scheuren.'],['Borstwering','Het deel van de muur onder een raam, tussen vloer en raam.'],['Gevelaanzicht','Tekening van de buitenkant van een gebouw, recht van voren gezien.']],
 dak:[['Nok','De hoogste lijn van een hellend dak, waar de dakvlakken samenkomen.'],['Dakvoet','De onderste rand van een hellend dak, bij de goot.'],['Muurplaat','Houten balk boven op de muur waarop de sporen of spanten rusten.'],['Gording','Horizontale balk evenwijdig aan de nok die de dakbeschotten of sporen draagt.'],['Spant','Driehoekige dragende constructie die het dak over de breedte draagt.'],['Dakbeschot','Plaatmateriaal of dakelementen die het dakvlak vormen, vaak met isolatie.'],['Panlat','Horizontale lat waaraan de dakpannen haken.'],['Tengel','Verticale lat onder de panlatten, zodat water onder de pannen kan weglopen.'],['Boeideel','Plank aan de dakrand die de kopse kant van het dak afwerkt.'],['Hemelwaterafvoer','Pijp die regenwater van de goot naar het riool of de grond voert (HWA).']],
 openingen:[['Kozijn','Vaste omlijsting in een muuropening waarin ramen of deuren zitten.'],['Stijl','Verticaal onderdeel van een kozijn.'],['Onderdorpel','Onderste horizontale deel van een kozijn, met afwatering naar buiten.'],['Bovendorpel','Bovenste horizontale deel van een kozijn.'],['Tussendorpel','Horizontaal kozijnonderdeel dat een opening in hoogte verdeelt.'],['Draaiend deel','Beweegbaar raam of deur in een kozijn.'],['Glaslat','Lat die de glasruit in het kozijn of raam vastzet.'],['Waterslag','Afgeschuinde onderkant van een raam of strip die regenwater naar buiten leidt.'],['Negge','Het stuk muur tussen buitenkant gevel en kozijn in een opening.'],['Triple glas','Isolatieglas met drie glasbladen en twee spouwen, met een lage U-waarde.']]},
tekeningen:{
 soorten:[['Situatietekening','Tekening van het perceel met gebouw, erfgrenzen en omgeving; schaal 1:500 of 1:1000.'],['Plattegrond','Horizontale doorsnede op ongeveer 1 m boven de vloer, van bovenaf gezien.'],['Doorsnede','Verticale snede door het gebouw; toont hoogtes, vloeren en het dak.'],['Detail','Grote schaal (1:5 of 1:10) van een aansluiting, bijvoorbeeld kozijn in spouwmuur.'],['Bestektekening','Tekening bij het bestek waarop de aannemer prijs geeft; vaak 1:50.'],['Werktekening','Uitgewerkte tekening waarmee op de bouwplaats of in de fabriek gemaakt wordt.'],['Stramien','Raster van hartlijnen (A, B, C en 1, 2, 3) waarop het ontwerp is opgebouwd.'],['Arcering','Patroon in een doorsnede dat aangeeft welk materiaal er getekend is.'],['Renvooi','Legenda op een tekening die symbolen en arceringen verklaart.'],['Maatlijn','Lijn met maatstreepjes en een getal die een afstand op de tekening aangeeft.']]},
materialen:{
 betonstaal:[['Gewapend beton','Beton met stalen wapening: beton neemt druk op, staal neemt trek op.'],['Wapening','Staven of netten van staal in beton die trekkrachten opnemen.'],['Betondekking','Laag beton tussen wapening en buitenkant, die het staal tegen roest en brand beschermt.'],['Sterkteklasse C20/25','Betonsterkte: 20 N/mm² op een cilinder en 25 N/mm² op een kubus (karakteristiek).'],['Prefab beton','Beton dat in een fabriek wordt gestort en als element naar de bouw gaat.'],['In het werk gestort','Beton dat op de bouwplaats in een bekisting wordt gestort.'],['Voorgespannen beton','Beton waarin staal al onder trekspanning is gezet, zodat het meer kan overspannen.'],['S235','Constructiestaal met een vloeigrens van 235 N/mm².'],['HE-profiel','Breedflens stalen profiel (H-vorm), veel gebruikt als kolom.'],['IPE-profiel','Stalen I-profiel met smalle flenzen, veel gebruikt als ligger.']],
 hout:[['Naaldhout','Hout van naaldbomen zoals vuren en grenen; licht en veel gebruikt voor constructies.'],['Loofhout','Hout van loofbomen zoals eiken; vaak harder en duurzamer.'],['Sterkteklasse C24','Sterkteklasse voor naaldhout met een buigsterkte van 24 N/mm².'],['Krimpen en zwellen','Hout wordt kleiner of groter als het vochtgehalte verandert.'],['Houtvochtgehalte','Hoeveelheid water in hout als percentage van het droge gewicht.'],['Gelamineerd hout','Lamellen hout op elkaar gelijmd tot grote liggers (glulam).'],['CLT','Kruislaaghout: houten lagen kruislings verlijmd tot massieve wand- en vloerplaten.'],['Houtskeletbouw','Bouwmethode met een dragend skelet van houten stijlen en regels (HSB).'],['FSC','Keurmerk voor hout uit verantwoord beheerd bos.'],['Verduurzamen','Hout behandelen zodat het langer bestand is tegen schimmels en insecten.']],
 steen:[['Baksteen','Gebakken klei; veel gebruikt als buitenblad van gevels.'],['Kalkzandsteen','Steen van kalk en zand, onder stoom gehard; vaak het dragende binnenblad.'],['Cellenbeton','Licht, poreus beton met goede isolatie, maar lage sterkte.'],['Mortel','Mengsel van cement, zand en water waarmee stenen worden verbonden.'],['Halfsteens muur','Muur met de dikte van een halve steen, zoals een buitenblad van 100 mm.'],['Metselverband','Patroon waarin stenen verspringend gemetseld worden, zoals halfsteensverband.'],['Lijmwerk','Stenen verlijmd met een dunne lijmlaag in plaats van een mortelvoeg.'],['Voegwerk','Het afwerken van de voegen tussen metselwerk.']],
 isolatie:[['Minerale wol','Isolatie van glas- of steenwol; onbrandbaar en dampopen.'],['PIR','Hardschuim isolatie met een zeer lage λ (circa 0,022), vaak met folie bekleed.'],['EPS','Geëxpandeerd polystyreen: wit piepschuim als isolatie.'],['XPS','Geëxtrudeerd polystyreen: drukvast en waterbestendig, bijvoorbeeld onder vloeren en op omgekeerde daken.'],['Dampremmende folie','Folie aan de warme binnenzijde die voorkomt dat vochtige binnenlucht in de constructie condenseert.'],['Waterkerende dampopen folie','Folie aan de koude buitenzijde die water tegenhoudt maar damp doorlaat.'],['Koudebrug','Plek waar warmte makkelijker naar buiten weglekt dan ernaast, met kans op condens.'],['Lambda (λ)','Warmtegeleidingscoëfficiënt van een materiaal; hoe lager, hoe beter het isoleert.']]},
bouwmethoden:{
 funderingen:[['Fundering op staal','Fundering direct op een draagkrachtige laag dicht onder het maaiveld, zonder palen.'],['Strokenfundering','Doorlopende strook beton onder dragende muren.'],['Plaatfundering','Eén betonplaat onder het hele gebouw die de last over een groot oppervlak verdeelt.'],['Paalfundering','Fundering op palen die de last naar een diepe draagkrachtige laag brengen.'],['Prefab betonpaal','Paal die in de fabriek gemaakt en de grond in geheid wordt.'],['Schroefpaal','Paal die trillingsarm de grond in wordt gedraaid; geschikt naast bestaande gebouwen.'],['Sondering','Grondonderzoek waarbij een conus de grond in wordt gedrukt om de draagkracht te meten.'],['Negatieve kleef','Grond die inklinkt en zo aan een paal naar beneden trekt, wat extra belasting geeft.']],
 systemen:[['Stapelbouw','Traditioneel bouwen met gestapelde stenen of blokken.'],['Gietbouw','Wanden en vloeren worden met bekistingen ter plaatse in beton gestort, zoals tunnelbouw.'],['Tunnelbouw','Gietbouw met tunnelvormige stalen bekisting waarmee wand en vloer tegelijk worden gestort.'],['Prefab bouw','Bouwen met in de fabriek gemaakte elementen die op de bouwplaats worden gemonteerd.'],['Staalskeletbouw','Draagconstructie van stalen kolommen en liggers; flexibel en snel.'],['Modulair bouwen','Bouwen met complete ruimtemodules uit de fabriek.'],['Casco','De ruwbouw: draagconstructie, vloeren, dak en gevel, zonder afbouw.'],['Afbouw','Alles na het casco: binnenwanden, afwerking, installaties.']],
 daken:[['Plat dak','Dak met een kleine helling (vaak 1,6% of meer) voor de waterafvoer.'],['Hellend dak','Dak met een duidelijke helling, meestal met pannen of leien.'],['Warm dak','Plat dak met de isolatie boven de constructie en de dakbedekking op de isolatie.'],['Omgekeerd dak','Plat dak met de dakbedekking onder de isolatie; isolatie (XPS) ligt bovenop, afgedekt met grind of tegels.'],['Groen dak','Dak met beplanting (zoals sedum) dat water vasthoudt en hitte dempt.'],['Zadeldak','Dak met twee hellende vlakken die in de nok samenkomen.'],['Lessenaarsdak','Dak met één hellend vlak.'],['Schilddak','Dak met vier hellende vlakken, ook aan de korte zijden.']]},
bouwproces:{
 fasen:[['Initiatief','Fase waarin de opdrachtgever een behoefte of idee voor een bouwproject heeft.'],['Programma van eisen','Document met alle eisen en wensen waaraan het gebouw moet voldoen.'],['Structuurontwerp','Eerste ruimtelijke opzet van het gebouw op hoofdlijnen.'],['Voorlopig ontwerp','Ontwerp met plattegronden, gevels en doorsneden op hoofdlijnen (VO).'],['Definitief ontwerp','Ontwerp met vastgelegde maten, materialen en installatieconcept (DO).'],['Technisch ontwerp','Volledig technisch uitgewerkt ontwerp waarop gecalculeerd en aanbesteed kan worden (TO).'],['Aanbesteding','Het uitvragen van prijzen bij aannemers en het kiezen van een aannemer.'],['Uitvoeringsgereed ontwerp','Werktekeningen en details waarmee daadwerkelijk gebouwd wordt.'],['Uitvoering','Het bouwen zelf, op de bouwplaats.'],['Oplevering','Het overdragen van het gereed gebouw aan de opdrachtgever, met controle op gebreken.']],
 partijen:[['Opdrachtgever','Partij die het gebouw laat bouwen en betaalt.'],['Architect','Ontwerper van het gebouw, verantwoordelijk voor vorm, indeling en vaak de regie van het ontwerp.'],['Constructeur','Rekent de draagconstructie door, zodat het gebouw sterk en stijf genoeg is.'],['Aannemer','Partij die het werk voor een afgesproken prijs uitvoert.'],['Onderaannemer','Bedrijf dat een deel van het werk voor de hoofdaannemer uitvoert.'],['Uitvoerder','Leidt het werk op de bouwplaats: planning, mensen en materiaal.'],['Werkvoorbereider','Bereidt de uitvoering voor: werktekeningen, bestellingen, planning.'],['Calculator','Berekent wat het werk gaat kosten.'],['Kwaliteitsborger','Onafhankelijke partij die onder de Wkb controleert of het bouwwerk aan het Bbl voldoet.'],['Bevoegd gezag','De overheid die vergunningen verleent en toezicht houdt, meestal de gemeente.']],
 contracten:[['Bestek','Technische omschrijving van het werk waarop de aannemer zijn prijs baseert.'],['UAV 2012','Standaardvoorwaarden voor de traditionele bouw, waarbij de opdrachtgever het ontwerp levert.'],['UAV-GC','Voorwaarden voor geïntegreerde contracten, waarbij de opdrachtnemer ook (een deel van) het ontwerp maakt.'],['Bouwteam','Samenwerkingsvorm waarin de aannemer al tijdens het ontwerp meedenkt.'],['Meerwerk','Werk dat buiten de afgesproken opdracht valt en extra wordt betaald.'],['Stelpost','Bedrag in de begroting voor iets dat nog niet precies bekend is; later verrekend.'],['Omgevingsvergunning','Toestemming van het bevoegd gezag om te bouwen.'],['Bouwmelding','Melding aan de gemeente voor bouwwerken die onder de Wkb vallen, vóór de start van de bouw.']]},
regels:{
 stelsel:[['Omgevingswet','Wet die sinds 1 januari 2024 de regels voor de fysieke leefomgeving bundelt, waaronder bouwen.'],['Bbl','Besluit bouwwerken leefomgeving: de technische bouwregels sinds 2024; opvolger van het Bouwbesluit 2012.'],['Omgevingsplan','Gemeentelijk plan met ruimtelijke regels, zoals waar en hoe hoog je mag bouwen.'],['Technische bouwactiviteit','Bouwen waarbij getoetst wordt aan de technische eisen uit het Bbl.'],['Omgevingsplanactiviteit','Bouwen waarbij getoetst wordt aan het omgevingsplan (ruimtelijk) en welstand.'],['Wkb','Wet kwaliteitsborging voor het bouwen: sinds 1 januari 2024 voor gevolgklasse 1 controleert een kwaliteitsborger in plaats van de gemeente.'],['Gevolgklasse 1','Laagste risicoklasse onder de Wkb, zoals eengezinswoningen.'],['Welstand','Beoordeling van het uiterlijk van een bouwwerk aan redelijke eisen.']],
 energie:[['BENG','Bijna Energieneutraal Gebouw: energie-eisen voor nieuwbouw.'],['BENG 1','Maximale energiebehoefte voor verwarming en koeling, in kWh per m² per jaar.'],['BENG 2','Maximaal primair fossiel energiegebruik, in kWh per m² per jaar.'],['BENG 3','Minimaal aandeel hernieuwbare energie, in procenten.'],['MPG','Milieuprestatie Gebouwen: de milieubelasting van de gebruikte materialen over de levensduur.'],['Rc-waarde','Warmteweerstand van een constructie; nieuwbouweis gevel 4,7, vloer 3,7, dak 6,3 m²K/W.'],['Verblijfsgebied','Gebied in een woning voor verblijf van mensen, zoals woonkamer en slaapkamers samen.'],['Verblijfsruimte','Afzonderlijke ruimte binnen een verblijfsgebied, zoals één slaapkamer.'],['BVO','Bruto vloeroppervlakte: gemeten langs de buitenkant van de gevels (NEN 2580).'],['GO','Gebruiksoppervlakte: de bruikbare oppervlakte tussen de wanden (NEN 2580).']]}
};
const TERMSUB={onderbouw:'Onderbouw en vloeren',gevel:'Gevel en wanden',dak:'Daken',openingen:'Kozijnen en openingen',soorten:'Soorten tekeningen',betonstaal:'Beton en staal',hout:'Hout',steen:'Steenachtig',isolatie:'Isolatie en folies',funderingen:'Funderingen',systemen:'Bouwsystemen',daken:'Daktypen',fasen:'Fasen in het bouwproces',partijen:'Partijen en rollen',contracten:'Contracten en documenten',stelsel:'Wetten en stelsel',energie:'Energie, milieu en oppervlakten'};
// scenario-vragen (niveau 3)
const SCEN={
 onderbouw:[['Een gebouw staat op slappe klei; de vaste zandlaag ligt op 14 m diepte. Welke fundering ligt voor de hand?','Paalfundering',['Fundering op staal','Strokenfundering op 0,8 m','Dekvloer']],['Op een doorsnede staat bij de bovenkant van een verdiepingsvloer "+2.700". Wat betekent dit?','De vloer ligt 2,70 m boven peil',['De vloer is 2,70 m dik','De vloer ligt 2,70 m boven NAP','De verdieping is 2,70 m breed']]],
 gevel:[['Onderin het buitenblad zijn verticale voegen leeggelaten. Waarvoor?','Afvoer van water en ventilatie van de spouw',['Om materiaal te besparen','Voor de elektriciteitsleidingen','Om geluid te dempen']],['Welk blad van een spouwmuur draagt meestal de vloeren?','Het binnenblad',['Het buitenblad','De isolatie','De luchtspouw']]],
 dak:[['Waarom zitten er tengels onder de panlatten?','Zodat water dat onder de pannen komt naar de goot kan weglopen',['Om de pannen vast te schroeven','Voor extra isolatie','Om de nok te dragen']]],
 openingen:[['Welk onderdeel boven een raamopening draagt het metselwerk erboven?','Latei',['Onderdorpel','Glaslat','Negge']]],
 soorten:[['Je wilt weten hoe de vloer aansluit op de gevel. Welke tekening pak je?','Een detail (1:5 of 1:10)',['De situatietekening','Het gevelaanzicht 1:100','De plattegrond 1:100']],['Je wilt de hoogte van de nok ten opzichte van peil weten. Welke tekening?','Een doorsnede',['De plattegrond','De situatietekening','Het renvooi']]],
 betonstaal:[['Waarom zit de wapening in een balk vooral aan de onderkant?','Daar ontstaat trek bij doorbuigen en beton kan slecht trek opnemen',['Daar is het beton het zwakst bij druk','Om het staal tegen brand te beschermen','Om de balk lichter te maken']]],
 isolatie:[['Aan welke kant van de isolatie hoort de dampremmende folie?','Aan de warme binnenkant',['Aan de koude buitenkant','Midden in de isolatie','Het maakt niet uit']]],
 funderingen:[['Naast een oud pand moet gefundeerd worden zonder trillingen. Welke paal is geschikt?','Schroefpaal',['Geheide prefab betonpaal','Fundering op staal','Damwand']]],
 systemen:[['Bij welke bouwmethode worden wanden en vloer in één keer gestort met stalen bekisting?','Tunnelbouw',['Houtskeletbouw','Staalskeletbouw','Stapelbouw']]],
 daken:[['Bij welk plat dak ligt de isolatie bóven de dakbedekking?','Omgekeerd dak',['Warm dak','Koud dak','Groen dak zonder isolatie']]],
 fasen:[['Wat komt eerst?','Programma van eisen',['Definitief ontwerp','Technisch ontwerp','Aanbesteding']],['In welke fase wordt de aannemer meestal gekozen bij een traditioneel contract?','Na het technisch ontwerp, bij de aanbesteding',['Bij het initiatief','Na de oplevering','Tijdens het structuurontwerp']]],
 partijen:[['Wie controleert onder de Wkb (gevolgklasse 1) of het bouwwerk aan het Bbl voldoet?','De kwaliteitsborger',['De architect','De gemeente vooraf','De onderaannemer']]],
 contracten:[['De aannemer maakt ook het ontwerp. Welke voorwaarden passen?','UAV-GC',['UAV 2012','Alleen een bestek','Geen contract nodig']]],
 stelsel:[['Je wilt weten of je een dakkapel van 4 m hoog mag plaatsen gezien het straatbeeld en de maximale bouwhoogte. Waar kijk je?','In het omgevingsplan van de gemeente',['In het Bbl','In de UAV 2012','In NEN 2580']],['Welke regeling bevat sinds 2024 de technische eisen aan nieuwbouw, zoals ventilatie en daglicht?','Het Bbl',['Het Bouwbesluit 2012','Het omgevingsplan','De UAV-GC']]],
 energie:[['Welke BENG-indicator gaat over hoe goed de schil isoleert (energiebehoefte)?','BENG 1',['BENG 2','BENG 3','MPG']],['Je meet langs de buitenkant van de gevels. Welke oppervlakte bepaal je?','BVO',['GO','Verblijfsgebied','Verblijfsruimte']]]
};
function genTerm(ch,sub){
  const f=function(l){
    const list=TERMS[ch][sub];const all=Object.values(TERMS[ch]).flat();
    if(l===3&&SCEN[sub]&&SCEN[sub].length){const [q,r,w]=pick(SCEN[sub]);return {q:`<p>${q}</p>`,...mc(r,shuffle(w)),hint:'Denk aan de functie van het onderdeel, niet alleen aan de naam.',sol:steps([`Juist: <b>${r}</b>`])}}
    const [t,d,x,v]=pick(list);const pool=shuffle((list.length>=4?list:all).filter(x=>x[0]!==t));
    if(l===1){return {q:`<p>Wat betekent <b>${t}</b>?</p>`,...mc(d,pool.slice(0,3).map(x=>x[1])),hint:'Sluit eerst de opties uit die zeker niet kloppen.',sol:steps([`<b>${t}</b>: ${d}`,...(x?[`In de praktijk: ${x}`]:[]),...(v?[`Voorbeeld: ${v}`]:[])])}}
    return {q:`<p>Welk begrip hoort bij deze omschrijving?</p><blockquote class="defq">${d}</blockquote>`,...mc(t,pool.slice(0,3).map(x=>x[0])),hint:'Let op de sleutelwoorden in de omschrijving.',sol:steps([`<b>${t}</b>: ${d}`,...(x?[`In de praktijk: ${x}`]:[]),...(v?[`Voorbeeld: ${v}`]:[])])};
  };
  f.isTerm=true;return f;
}

// ---- rekenkundige bouwkunde-onderdelen ----
const mm=v=>(v>=0?'+':'−')+(Math.abs(v)/1000).toFixed(3).replace('.',',');
function genPeil(l){
  if(l===1){const h=pick([2600,2700,2800,2850,2900,3000]),n=R(1,3);return {q:`Op een doorsnede staat de bovenkant van de begane grondvloer op <b>P = 0</b> en de bovenkant van de ${n}e verdiepingsvloer op <b>${mm(h*n)}</b>. Elke verdieping is even hoog. Hoe groot is de verdiepingshoogte in mm?`,type:'num',answer:h,unit:'mm',hint:'Hoogtematen op tekeningen staan in meters met drie decimalen t.o.v. peil. Deel door het aantal verdiepingen.',sol:steps([`${mm(h*n)} = ${h*n} mm boven peil`,`${h*n} ÷ ${n} = ${h} mm`])}}
  if(l===2){const a=-R(5,12)*100,b=R(26,95)*100;return {q:`De onderkant van de fundering ligt op <b>${mm(a)}</b> en de bovenkant van de dakrand op <b>${mm(b)}</b> (t.o.v. peil). Hoe groot is het hoogteverschil in meter?`,type:'num',answer:(b-a)/1000,dec:3,unit:'m',hint:'Tel de afstand onder peil en boven peil bij elkaar op.',sol:steps([`${N(b/1000,3)} − (${N(a/1000,3)}) = ${N((b-a)/1000,3)} m`])}}
  const nap=rnd(R(-200,350)/100,2),p=-R(1,9)*100;const v=nap+p/1000;return {q:`Peil ligt op <b>NAP ${nap>=0?'+':'−'}${N(Math.abs(nap),2)} m</b>. De bovenkant van de kruipruimtebodem ligt op <b>${mm(p)}</b> t.o.v. peil. Op welke hoogte t.o.v. NAP ligt die bodem? (Negatief = onder NAP, 2 decimalen)`,type:'num',answer:v,dec:2,unit:'m',hint:'NAP-hoogte = NAP-hoogte van peil + hoogte t.o.v. peil.',sol:steps([`${N(nap,2)} + (${N(p/1000,3)}) = ${N(v,3)} m`,'NAP is het landelijke referentievlak; peil is per gebouw gekozen.'])};
}
function genMaatvoering(l){
  if(l===1){const parts=Array.from({length:R(3,4)},()=>R(6,42)*100);const tot=parts.reduce((a,b)=>a+b,0);return {q:`Een gevel heeft deze deelmaten (mm): <b>${parts.join(' + ')}</b>. Hoe groot is de totaalmaat in mm?`,type:'num',answer:tot,unit:'mm',hint:'Deelmaten opgeteld vormen de totaalmaat op de buitenste maatlijn.',sol:steps([`${parts.join(' + ')} = ${N(tot)} mm`]),calc:false}}
  if(l===2){const B=R(45,90)*100,d=pick([300,350,365,400]);return {q:`Een woning is <b>${N(B)} mm</b> breed, buitenwerks gemeten. De spouwmuren zijn <b>${d} mm</b> dik. Hoe breed is de woning binnenwerks?`,type:'num',answer:B-2*d,unit:'mm',hint:'Binnenwerks = buitenwerks min twee keer de wanddikte.',sol:steps([`${N(B)} − 2 × ${d} = ${N(B-2*d)} mm`])}}
  const L=R(18,40)*600,hoh=pick([3600,5400,6000,7200]);const n=Math.floor(L/hoh);const k=n+1;return {q:`Langs een gevel van <b>${N(L)} mm</b> komen kolommen op een stramien van <b>${N(hoh)} mm</b> h.o.h., met een kolom aan het begin. Hoeveel kolommen passen er (de laatste mag niet voorbij het einde)?`,type:'num',answer:k,unit:'kolommen',hint:'Aantal volle vakken = lengte ÷ h.o.h. (naar beneden). Kolommen = vakken + 1.',sol:steps([`${N(L)} ÷ ${N(hoh)} = ${N(L/hoh,2)} → ${n} volle vakken`,`Kolommen: ${n} + 1 = ${k}`])};
}
function genBruikbaar(l){
  if(l===1){const GO=R(70,160);const v=GO*0.55;return {q:`Een nieuwbouwwoning heeft <b>${GO} m²</b> gebruiksoppervlakte. Het Bbl eist dat ten minste <b>55%</b> daarvan verblijfsgebied is. Hoeveel m² verblijfsgebied is minimaal nodig?`,type:'num',answer:v,dec:1,unit:'m²',hint:'55% van de gebruiksoppervlakte.',sol:steps([`${GO} × 0,55 = ${N(v,2)} m²`])}}
  if(l===2){const A=rnd(R(200,550)/10,1);const v=A*0.10;return {q:`Een verblijfsgebied van <b>${N(A)} m²</b> in een nieuwbouwwoning moet een equivalente daglichtoppervlakte hebben van ten minste <b>10%</b> van de vloeroppervlakte. Hoeveel m² is dat?`,type:'num',answer:v,dec:2,unit:'m²',hint:'10% van de vloeroppervlakte. (Elke verblijfsruimte daarbinnen moet bovendien minstens 0,5 m² hebben.)',sol:steps([`${N(A)} × 0,10 = ${N(v,2)} m² equivalente daglichtoppervlakte`,'Dat is níet hetzelfde als glasoppervlak: NEN 2057 rekent met reductiefactoren voor belemmeringen en positie.'])}}
  const type=pick(['vg','vr','vgk']);const A=rnd(R(60,400)/10,1);
  if(type==='vr'){const v=Math.max(7,0.7*A);return {q:`Een slaapkamer (verblijfsruimte) in een nieuwbouwwoning is <b>${N(A)} m²</b>. De luchtverversing moet minimaal <b>0,7 dm³/s per m²</b> zijn, met een minimum van 7 dm³/s. Welke capaciteit is nodig?`,type:'num',answer:v,dec:2,unit:'dm³/s',hint:'Bereken 0,7 × A en neem de grootste van die waarde en 7.',sol:steps([`0,7 × ${N(A)} = ${N(0.7*A,2)} dm³/s`,`Minimaal 7 → ${N(v,2)} dm³/s`])}}
  const kook=type==='vgk';const v=Math.max(kook?21:7,0.9*A);
  return {q:`Een verblijfsgebied in een nieuwbouwwoning is <b>${N(A)} m²</b>${kook?' en heeft een opstelplaats voor een kooktoestel':''}. De luchtverversing moet minimaal <b>0,9 dm³/s per m²</b> zijn, met een minimum van 7 dm³/s${kook?' (met kooktoestel minimaal 21 dm³/s)':''}. Welke capaciteit is nodig?`,type:'num',answer:v,dec:2,unit:'dm³/s',hint:'Bereken 0,9 × A en vergelijk met het minimum.',sol:steps([`0,9 × ${N(A)} = ${N(0.9*A,2)} dm³/s`,`Minimum ${kook?21:7} dm³/s → ${N(v,2)} dm³/s`])};
}

// ================= EXTRA HOOFDSTUKKEN =================
// Schatten en controleren
function genSchat(l){
  if(l===1){const a=R(18,98),b=R(18,98);const ra=Math.round(a/10)*10,rb=Math.round(b/10)*10;const e=ra*rb;const right=N(e);
    return {q:`Schat zonder rekenmachine:<div class="expr">${a} × ${b} ≈ ?</div>`,...mc(right,[N(e*10),N(Math.round(e/10)),N(e+ra*5*4)]),hint:'Rond beide getallen af op tientallen en vermenigvuldig.',sol:steps([`${a} ≈ ${ra} en ${b} ≈ ${rb}`,`${ra} × ${rb} = ${N(e)} (precies: ${N(a*b)})`]),calc:false}}
  if(l===2){const L=rnd(R(30,120)/10,1),B=rnd(R(30,90)/10,1),d=pick([0.2,0.25,0.15]);const V=L*B*d;const right=`ongeveer ${N(Math.round(V))} m³`;
    return {q:`Een vloer is ${N(L)} × ${N(B)} m en ${N(d*1000)} mm dik. Welke schatting van het betonvolume is realistisch?`,...mc(right,[`ongeveer ${N(Math.round(V*10))} m³`,`ongeveer ${N(Math.round(V*1000))} m³`,`ongeveer ${N(Math.round(V/10*10)/10)} L`]),hint:'Rond af: lengte × breedte ≈ ? m², × dikte in meter.',sol:steps([`${N(L)} × ${N(B)} ≈ ${N(Math.round(L*B))} m²`,`× ${N(d)} m ≈ ${N(V,1)} m³`]),calc:false}}
  const items=[['De drukspanning in een betonkolom is 5 000 N/mm².','Niet plausibel: beton haalt orde 20–50 N/mm²'],['Een woonkamer van 6 × 4 m heeft een oppervlak van 2,4 m².','Niet plausibel: dat is 24 m²'],['Een stalen ligger van 6 m weegt 300 kg.','Plausibel'],['Een buitendeur is 2 315 mm hoog.','Plausibel'],['Een woning verbruikt 30 000 kWh stroom per jaar.','Niet plausibel: gemiddeld ca. 2 500–3 500 kWh'],['Een betonvloer van een rijtjeshuis bevat 9 m³ beton.','Plausibel'],['Een trapoptrede is 31 cm.','Niet plausibel: max. 188 mm in een woning'],['De U-waarde van een nieuwbouwgevel is 0,2 W/(m²K).','Plausibel']];
  const [s,r]=pick(items);const ok=r==='Plausibel';
  return {q:`Is deze uitkomst plausibel?<blockquote class="defq">${s}</blockquote>`,...mc(r,ok?['Niet plausibel: veel te groot','Niet plausibel: veel te klein','Niet te zeggen zonder rekenmachine']:['Plausibel','Niet te zeggen zonder rekenmachine','Plausibel, maar alleen bij staal']),hint:'Vergelijk met waarden die je kent: kamers 10–40 m², beton 20–50 N/mm², trap max 188 mm.',sol:steps([r,'Een snelle plausibiliteitscheck vangt de meeste reken- en eenheidsfouten.'])};
}
function genOrde(l){
  if(l===1){const v=pick([[0.00042,'tienduizendsten'],[3600,'duizenden'],[72000,'tienduizenden'],[0.035,'honderdsten'],[0.6,'tienden']]);const right=v[1];return {q:`In welke orde van grootte ligt <b>${N(v[0],6)}</b>?`,...mc(right,['honderden','miljoenen','duizendsten','tienduizenden','tienden'].filter(x=>x!==right).slice(0,3)),hint:'Kijk naar de plaats van het eerste cijfer dat geen nul is.',sol:steps([`${N(v[0],6)} → ${right}`]),calc:false}}
  const pairs=[['1 m³ water','1000 kg'],['1 m³ beton','2400 kg'],['1 kN','ongeveer 100 kg'],['1 N/mm²','1000 kN/m²'],['1 kWh','3,6 × 10⁶ J'],['1 m² in mm²','10⁶ mm²']];const [a,b]=pick(pairs);
  return {q:`Waaraan is <b>${a}</b> (ongeveer) gelijk?`,...mc(b,shuffle(pairs.map(p=>p[1]).filter(x=>x!==b)).slice(0,3)),hint:'Dit zijn ankerwaarden die je uit je hoofd moet kennen.',sol:steps([`${a} ≈ ${b}`]),calc:false};
}
// Statistiek
function genCentraal(l){
  const n=l===1?5:l===2?6:7;const xs=Array.from({length:n},()=>R(18,45));const srt=[...xs].sort((a,b)=>a-b);
  const t=l===1?'gem':pick(['med','gem','mod']);
  if(t==='mod'){const v=pick(xs);xs.push(v,v);}
  const S=[...xs].sort((a,b)=>a-b);const k=S.length;
  if(t==='gem'){const v=xs.reduce((a,b)=>a+b,0)/k;return {q:`Betonkubussen geven deze druksterktes (N/mm²): <b>${xs.join(', ')}</b>. Wat is het gemiddelde? (1 decimaal)`,type:'num',answer:v,dec:1,unit:'N/mm²',hint:'Som ÷ aantal.',sol:steps([`Som: ${xs.reduce((a,b)=>a+b,0)}`,`÷ ${k} = ${N(v,2)}`])}}
  if(t==='med'){const v=k%2?S[(k-1)/2]:(S[k/2-1]+S[k/2])/2;return {q:`Meetwaarden: <b>${xs.join(', ')}</b>. Wat is de mediaan?`,type:'num',answer:v,dec:1,hint:'Zet de waarden op volgorde. De middelste (bij een even aantal: het gemiddelde van de twee middelste) is de mediaan.',sol:steps([`Op volgorde: ${S.join(', ')}`,`Mediaan: ${N(v)}`])}}
  const cnt={};xs.forEach(x=>cnt[x]=(cnt[x]||0)+1);const mx=Math.max(...Object.values(cnt));const mods=Object.keys(cnt).filter(x=>cnt[x]===mx);if(mods.length>1)return genCentraal(l);
  return {q:`Meetwaarden: <b>${xs.join(', ')}</b>. Wat is de modus?`,type:'num',answer:+mods[0],hint:'De waarde die het vaakst voorkomt.',sol:steps([`${mods[0]} komt ${mx} keer voor`])};
}
function genSpreiding(l){
  const xs=Array.from({length:l===1?6:5},()=>R(20,48));
  if(l===1){return {q:`Meetwaarden: <b>${xs.join(', ')}</b>. Wat is de spreidingsbreedte (bereik)?`,type:'num',answer:Math.max(...xs)-Math.min(...xs),hint:'Grootste min kleinste waarde.',sol:steps([`${Math.max(...xs)} − ${Math.min(...xs)} = ${Math.max(...xs)-Math.min(...xs)}`]),calc:false}}
  const m=xs.reduce((a,b)=>a+b,0)/xs.length;const ss=xs.reduce((a,x)=>a+(x-m)**2,0);const s=Math.sqrt(ss/(xs.length-1));
  return {q:`Meetwaarden: <b>${xs.join(', ')}</b>. Bereken de standaardafwijking s van de steekproef (delen door n − 1). Rond af op 2 decimalen.`,type:'num',answer:s,dec:2,hint:'s = √( Σ(x − x̄)² / (n − 1) ). Je rekenmachine kan dit ook (statistiek-modus).',sol:steps([`Gemiddelde: ${N(m,3)}`,`Σ(x − x̄)² = ${N(ss,3)}`,`s = √(${N(ss,3)} / ${xs.length-1}) = ${N(s,3)}`])};
}
function genKarak(l){
  const fm=R(28,48),s=rnd(R(20,60)/10,1);const fk=fm-1.64*s;
  if(l<3)return {q:`Een partij beton heeft een gemiddelde druksterkte van <b>${fm} N/mm²</b> en een standaardafwijking van <b>${N(s)} N/mm²</b>. Wat is de karakteristieke druksterkte (5%-ondergrens)? Gebruik f<sub>k</sub> = f<sub>m</sub> − 1,64 · s. (1 decimaal)`,type:'num',answer:fk,dec:1,unit:'N/mm²',hint:'5% van de waarden ligt onder de karakteristieke waarde.',sol:steps([`f_k = ${fm} − 1,64 × ${N(s)} = ${N(fk,2)} N/mm²`,'Constructeurs rekenen met deze ondergrens, niet met het gemiddelde.'])};
  const need=pick([25,30,35]);const s2=rnd(R(25,50)/10,1);const v=need+1.64*s2;
  return {q:`De kubussterkte moet karakteristiek minimaal <b>${need} N/mm²</b> zijn. De standaardafwijking van de productie is <b>${N(s2)} N/mm²</b>. Welke gemiddelde sterkte moet de centrale minimaal leveren? (1 decimaal)`,type:'num',answer:v,dec:1,unit:'N/mm²',hint:'Werk f_k = f_m − 1,64 s om naar f_m.',sol:steps([`f_m = f_k + 1,64 × s = ${need} + 1,64 × ${N(s2)} = ${N(v,2)} N/mm²`])};
}
// Exponenten en logaritmen
function genGroei(l){
  if(l===1){const K=R(10,80)*1000,p=pick([2,3,4,5]),n=R(2,8);const v=K*(1+p/100)**n;return {q:`De bouwkosten van € ${N(K)} stijgen elk jaar met <b>${p}%</b>. Wat zijn de kosten na <b>${n} jaar</b>? (2 decimalen)`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Exponentiële groei: K · g^t met g = 1 + p/100.',sol:steps([`g = ${N(1+p/100)}`,`${N(K)} × ${N(1+p/100)}^${n} = ${N(v,2)}`])}}
  if(l===2){const p=pick([2,3,4,5,6,8]);const t=Math.log(2)/Math.log(1+p/100);return {q:`Na hoeveel jaar is een bedrag verdubbeld bij <b>${p}%</b> groei per jaar? (2 decimalen)`,type:'num',answer:t,dec:2,unit:'jaar',hint:'Los g^t = 2 op: t = log(2) / log(g).',sol:steps([`${N(1+p/100)}^t = 2`,`t = log 2 / log ${N(1+p/100)} = ${N(t,3)} jaar`,`(Vuistregel: 72 / ${p} ≈ ${N(72/p,1)})`])}}
  const T=pick([5,10,20,30]),A0=R(100,800),t=R(5,60);const v=A0*0.5**(t/T);return {q:`De concentratie van een stof halveert elke <b>${T} jaar</b>. Nu is die <b>${A0}</b>. Hoeveel is er over na <b>${t} jaar</b>? (2 decimalen)`,type:'num',answer:v,dec:2,hint:'A = A₀ · 0,5^(t / T)',sol:steps([`t/T = ${N(t/T,4)}`,`${A0} × 0,5^${N(t/T,4)} = ${N(v,3)}`])};
}
function genLog(l){
  if(l===1){const b=pick([2,3,10]),n=R(1,b===10?6:6);return {q:`Bereken zonder rekenmachine:<div class="expr">${b===10?'log':'<sup></sup>'+b+'log'} ${N(b**n)}</div>`,type:'num',answer:n,hint:`Tot welke macht moet je ${b} verheffen om ${N(b**n)} te krijgen?`,sol:steps([`${b}${sup(n)} = ${N(b**n)}, dus het antwoord is ${n}`]),calc:false}}
  if(l===2){const a=pick([2,3,5,10]),b=pick([2,3,4,5]);const right=pick(['som','verschil','macht']);
    if(right==='som')return {q:`Schrijf als één logaritme: log ${a} + log ${b} = log ?`,type:'num',answer:a*b,hint:'log a + log b = log(a · b)',sol:steps([`log ${a} + log ${b} = log(${a} × ${b}) = log ${a*b}`]),calc:false};
    if(right==='verschil')return {q:`Schrijf als één logaritme: log ${a*b} − log ${b} = log ?`,type:'num',answer:a,hint:'log a − log b = log(a / b)',sol:steps([`log ${a*b} − log ${b} = log(${a*b} / ${b}) = log ${a}`]),calc:false};
    return {q:`Schrijf als één logaritme: ${b} · log ${a} = log ?`,type:'num',answer:a**b,hint:'n · log a = log(aⁿ)',sol:steps([`${b} · log ${a} = log(${a}${sup(b)}) = log ${a**b}`]),calc:false}}
  const g=pick([1.03,1.05,1.08,2,3]),c=pick([2,5,10,50]);const x=Math.log(c)/Math.log(g);return {q:`Los op:<div class="expr">${N(g)}${sup('x')} = ${c}</div>Rond af op 2 decimalen.`,type:'num',answer:x,dec:2,hint:'Neem aan beide kanten de log: x = log c / log g.',sol:steps([`x · log ${N(g)} = log ${c}`,`x = ${N(Math.log10(c),4)} / ${N(Math.log10(g),4)} = ${N(x,3)}`])};
}
// Afgeleiden
function polyEval(c,x){return c.reduce((a,k,i)=>a+k*x**(c.length-1-i),0)}
function polyDer(c){const n=c.length-1;return c.slice(0,-1).map((k,i)=>k*(n-i))}
function genAfg(l){
  if(l===1){const a=nz(-6,8),n=R(2,5);return {q:`Bepaal de afgeleide. Welk getal komt op de plaats van het vraagteken?<div class="expr">f(x) = ${polyStr([a,...Array(n).fill(0)])} &nbsp;→&nbsp; f′(x) = ?·x${n-1>1?sup(n-1):''}</div>`,type:'num',answer:a*n,hint:'Machtsregel: (a·xⁿ)′ = n·a·xⁿ⁻¹',sol:steps([`f′(x) = ${n} × ${P(a)} · x${sup(n-1)} = ${polyStr([a*n,...Array(n-1).fill(0)])}`]),calc:false}}
  if(l===2){const c=[nz(-3,3),nz(-6,6),R(-9,9)],x0=R(-3,4);const d=polyDer(c);const v=polyEval(d,x0);return {q:`Gegeven <span class="formula">f(x) = ${polyStr(c)}</span>. Bereken de helling van de grafiek in x = ${x0}, dus f′(${x0}).`,type:'num',answer:v,hint:'Bepaal eerst f′(x) met de machtsregel en vul dan x in.',sol:steps([`f′(x) = ${polyStr(d)}`,`f′(${x0}) = ${N(v)}`]),calc:false}}
  if(Math.random()<.5){const P=R(10,40)*2;const b=P/4;return {q:`Je hebt <b>${P} m</b> hekwerk voor een rechthoekig terrein. Bij welke breedte b is het oppervlak maximaal? (A = b · (${P/2} − b))`,type:'num',answer:b,unit:'m',hint:"Stel A′(b) = 0 op.",sol:steps([`A(b) = ${P/2}b − b²`,`A′(b) = ${P/2} − 2b = 0`,`b = ${N(b)} m (een vierkant)`])}}
  const q=rnd(R(30,150)/10,1),L=rnd(R(40,90)/10,1);const x=L/2,M=q*L*L/8;return {q:`Het moment in een ligger is <span class="formula">M(x) = ½·${N(q)}·x·(${N(L)} − x)</span>. Bepaal met de afgeleide waar M maximaal is en geef het maximale moment. (2 decimalen)`,type:'num',answer:M,dec:2,unit:'kNm',hint:"M′(x) = 0 geeft de plaats van het maximum. Vul die x in M(x) in.",sol:steps([`M(x) = ${N(q/2,3)}·(${N(L)}x − x²)`,`M′(x) = ${N(q/2,3)}·(${N(L)} − 2x) = 0 → x = ${N(x,3)} m`,`M = ½ × ${N(q)} × ${N(x,3)} × ${N(L-x,3)} = ${N(M,3)} kNm (= ⅛qL²)`])};
}
// Warmte en uitzetting
const ALPHA={staal:12e-6,beton:10e-6,aluminium:23e-6,glas:9e-6,'PVC':80e-6};
function genUitzet(l){
  const m=pick(Object.keys(ALPHA)),L=R(3,60),dT=R(20,60);const v=ALPHA[m]*L*dT*1000;
  if(l<3)return {q:`Een ${m} element is <b>${L} m</b> lang en warmt <b>${dT} K</b> op. α = ${N(ALPHA[m]*1e6)} × 10<sup>−6</sup> /K. Hoeveel mm zet het uit? (2 decimalen)`,type:'num',answer:v,dec:2,unit:'mm',hint:'ΔL = α · L · ΔT. Reken L in mm of reken om aan het eind.',sol:steps([`ΔL = ${N(ALPHA[m]*1e6)}×10⁻⁶ × ${L} × ${dT} = ${N(v/1000,6)} m`,`= ${N(v,3)} mm`])};
  const gap=R(5,20);const Lmax=gap/1000/(ALPHA[m]*dT);return {q:`Tussen ${m} gevelplaten zit een voeg die <b>${gap} mm</b> mag inklemmen. De temperatuur kan <b>${dT} K</b> stijgen. Hoe lang mag een plaat maximaal zijn? (2 decimalen) α = ${N(ALPHA[m]*1e6)} × 10<sup>−6</sup> /K.`,type:'num',answer:Lmax,dec:2,unit:'m',hint:'Werk ΔL = α · L · ΔT om naar L.',sol:steps([`L = ΔL / (α · ΔT) = ${N(gap/1000,3)} / (${N(ALPHA[m]*1e6)}×10⁻⁶ × ${dT})`,`= ${N(Lmax,3)} m`])};
}
function genWarmteQ(l){
  if(l===1){const C=R(-20,40);return Math.random()<.5?{q:`Hoeveel kelvin is <b>${C} °C</b>?`,type:'num',answer:C+273,unit:'K',hint:'T(K) = T(°C) + 273',sol:steps([`${C} + 273 = ${C+273} K`]),calc:false}:{q:`De temperatuur stijgt van ${C} °C naar ${C+R(5,30)} °C. Hoe groot is ΔT in kelvin?`,type:'num',answer:0,unit:'K',hint:'Een verschil van 1 °C is precies 1 K.',sol:steps(['ΔT in K = ΔT in °C'])}}
  const mat=pick([['water',4180,'L'],['beton',880,'kg'],['staal',460,'kg']]);const m=R(5,200)*(mat[0]==='water'?10:20),dT=R(5,40);const Q=m*mat[1]*dT/1000;
  return {q:`Hoeveel warmte is nodig om <b>${N(m)} ${mat[2]==='L'?'liter water':'kg '+mat[0]}</b> <b>${dT} K</b> op te warmen? c = ${N(mat[1])} J/(kg·K). Geef het antwoord in kJ.${mat[2]==='L'?' (1 L water = 1 kg)':''}`,type:'num',answer:Q,dec:0,unit:'kJ',hint:'Q = m · c · ΔT (in J), daarna ÷ 1000.',sol:steps([`Q = ${N(m)} × ${N(mat[1])} × ${dT} = ${N(Q*1000)} J`,`= ${N(Q,1)} kJ`])};
}
// fix: ΔT question for level 1 second variant
function genWarmteQfix(l){if(l===1&&Math.random()<.5){const C=R(-20,30),d=R(5,30);return {q:`De temperatuur stijgt van <b>${C} °C</b> naar <b>${C+d} °C</b>. Hoe groot is ΔT in kelvin?`,type:'num',answer:d,unit:'K',hint:'Een verschil van 1 °C is precies 1 K.',sol:steps([`ΔT = ${C+d} − ${P(C)} = ${d} K`]),calc:false}}if(l===1){const C=R(-20,40);return {q:`Hoeveel kelvin is <b>${C} °C</b>?`,type:'num',answer:C+273,unit:'K',hint:'T(K) = T(°C) + 273',sol:steps([`${C} + 273 = ${C+273} K`]),calc:false}}return genWarmteQ(l)}
// Sterkteleer
function genWeerstand(l){
  const b=pick([50,75,100,150,200]),h=pick([150,200,250,300,400]);
  if(l===1){const W=b*h*h/6;return {q:`Bereken het weerstandsmoment W van een rechthoekige doorsnede van <b>${b} × ${h} mm</b> (b × h, h is de hoogte).`,type:'num',answer:W,dec:0,unit:'mm³',hint:'W = b · h² / 6',sol:steps([`W = ${b} × ${h}² / 6 = ${N(W,0)} mm³`])}}
  if(l===2){const I=b*h**3/12;return {q:`Bereken het traagheidsmoment I van een doorsnede van <b>${b} × ${h} mm</b>.`,type:'num',answer:I,dec:0,unit:'mm⁴',hint:'I = b · h³ / 12',sol:steps([`I = ${b} × ${h}³ / 12 = ${N(I,0)} mm⁴`,`(${N(I,0)} = ${N(I/1e6,2)} × 10⁶ mm⁴)`])}}
  const W1=b*h*h/6,W2=h*b*b/6;return {q:`Een plank van <b>${b} × ${h} mm</b> kun je staand (h = ${h}) of plat (h = ${b}) gebruiken. Hoeveel keer zo groot is W staand vergeleken met plat? (2 decimalen)`,type:'num',answer:W1/W2,dec:2,unit:'×',hint:'Bereken W = b·h²/6 voor beide standen.',sol:steps([`Staand: ${b} × ${h}² / 6 = ${N(W1,0)}`,`Plat: ${h} × ${b}² / 6 = ${N(W2,0)}`,`Verhouding: ${N(W1/W2,3)} (= h/b). Daarom leg je balken op hun kant!`])};
}
function genBuig(l){
  const b=pick([75,100,150,200]),h=pick([200,250,300,400]);const W=b*h*h/6;
  if(l<3){const M=rnd(R(20,400)/10,1);const s=M*1e6/W;return {q:`Een houten balk van <b>${b} × ${h} mm</b> krijgt een moment van <b>${N(M)} kNm</b>. Bereken de buigspanning. (2 decimalen)`,type:'num',answer:s,dec:2,unit:'N/mm²',hint:'σ = M / W, met M in Nmm (kNm × 10⁶) en W in mm³.',sol:steps([`W = ${b} × ${h}² / 6 = ${N(W,0)} mm³`,`M = ${N(M)} kNm = ${N(M*1e6,0)} Nmm`,`σ = ${N(M*1e6,0)} / ${N(W,0)} = ${N(s,3)} N/mm²`])}}
  const q=rnd(R(20,60)/10,1),L=rnd(R(30,60)/10,1),f=pick([10,12,14]);const M=q*L*L/8;const Wn=M*1e6/f;const hmin=Math.sqrt(6*Wn/b);
  return {q:`Een balk met breedte <b>${b} mm</b> overspant <b>${N(L)} m</b> met q = <b>${N(q)} kN/m</b>. De toelaatbare buigspanning is <b>${f} N/mm²</b>. Hoe hoog moet de balk minimaal zijn? (hele mm)`,type:'num',answer:hmin,dec:0,unit:'mm',hint:'M = ⅛qL² → benodigde W = M / σ → h = √(6W / b).',sol:steps([`M = ⅛ × ${N(q)} × ${N(L)}² = ${N(M,3)} kNm`,`W = ${N(M*1e6,0)} / ${f} = ${N(Wn,0)} mm³`,`h = √(6 × ${N(Wn,0)} / ${b}) = ${N(hmin,1)} mm`])};
}
// Licht en ventilatie
function genLux(l){
  if(l===1){const F=R(8,60)*100,A=R(8,40);return {q:`Lampen geven samen <b>${N(F)} lumen</b> die gelijkmatig op een werkvlak van <b>${A} m²</b> vallen. Hoe groot is de verlichtingssterkte? (hele lux)`,type:'num',answer:F/A,dec:0,unit:'lux',hint:'E = Φ / A (lux = lumen per m²)',sol:steps([`E = ${N(F)} / ${A} = ${N(F/A,1)} lux`])}}
  if(l===2){const I=R(200,2000),r=rnd(R(10,40)/10,1);return {q:`Een lamp met lichtsterkte <b>${I} cd</b> hangt <b>${N(r)} m</b> recht boven een tafel. Hoe groot is de verlichtingssterkte op de tafel? (hele lux)`,type:'num',answer:I/r/r,dec:0,unit:'lux',hint:'Kwadratenwet: E = I / r²',sol:steps([`E = ${I} / ${N(r)}² = ${N(I/r/r,1)} lux`,'Twee keer zo ver weg = vier keer minder licht.'])}}
  const E=pick([300,500,750]),A=R(20,80),eta=pick([0.5,0.6,0.7]),lm=pick([3000,4000,5000]);const n=Math.ceil(E*A/(eta*lm)-1e-9);return {q:`Een lokaal van <b>${A} m²</b> moet <b>${E} lux</b> krijgen. Een armatuur geeft <b>${lm} lm</b>, en door verliezen komt <b>${N(eta*100)}%</b> op het werkvlak. Hoeveel armaturen zijn minimaal nodig?`,type:'num',answer:n,unit:'armaturen',hint:'Benodigd: E · A lumen op het werkvlak. Per armatuur: lm × rendement. Naar boven afronden.',sol:steps([`Nodig: ${E} × ${A} = ${N(E*A)} lm`,`Per armatuur: ${lm} × ${N(eta)} = ${N(lm*eta)} lm`,`${N(E*A)} / ${N(lm*eta)} = ${N(E*A/(lm*eta),2)} → ${n}`])};
}
function genDF(l){
  const Eo=pick([5000,8000,10000,15000]),DFp=rnd(R(10,60)/10,1);const Ei=Eo*DFp/100;
  if(l<3)return {q:`Buiten is het (bewolkt) <b>${N(Eo)} lux</b>. Op een punt in de kamer meet je <b>${N(Ei,0)} lux</b>. Hoe groot is de daglichtfactor? (1 decimaal)`,type:'num',answer:Ei/Eo*100,dec:1,unit:'%',hint:'DF = E_binnen / E_buiten × 100%',sol:steps([`DF = ${N(Ei,0)} / ${N(Eo)} × 100% = ${N(Ei/Eo*100,2)}%`])};
  return {q:`De daglichtfactor op een bureau is <b>${N(DFp)}%</b>. Buiten is het <b>${N(Eo)} lux</b>. Hoeveel lux valt er op het bureau? (hele lux)`,type:'num',answer:Ei,dec:0,unit:'lux',hint:'E_binnen = DF/100 × E_buiten',sol:steps([`${N(DFp/100,4)} × ${N(Eo)} = ${N(Ei,1)} lux`])};
}
function genVentVoud(l){
  const L=rnd(R(30,80)/10,1),B=rnd(R(25,50)/10,1),H=2.6;const V=L*B*H;
  if(l===1){const q=R(20,80);return {q:`Hoeveel m³/h is <b>${q} dm³/s</b>?`,type:'num',answer:q*3.6,dec:1,unit:'m³/h',hint:'1 dm³/s = 3,6 m³/h (want 3600 s/h ÷ 1000 dm³/m³).',sol:steps([`${q} × 3,6 = ${N(q*3.6,1)} m³/h`]),calc:false}}
  const q=R(14,60);const n=q*3.6/V;
  if(l===2)return {q:`Een kamer van <b>${N(L)} × ${N(B)} m</b> en 2,6 m hoog krijgt <b>${q} dm³/s</b> verse lucht. Wat is het ventilatievoud (keer per uur)? (2 decimalen)`,type:'num',answer:n,dec:2,unit:'h⁻¹',hint:'n = luchtdebiet (m³/h) / volume (m³)',sol:steps([`V = ${N(L)} × ${N(B)} × 2,6 = ${N(V,2)} m³`,`q = ${q} × 3,6 = ${N(q*3.6,1)} m³/h`,`n = ${N(q*3.6,1)} / ${N(V,2)} = ${N(n,3)} per uur`])};
  const p=R(2,30),pp=pick([7,8,10]);const v=p*pp;return {q:`In een vergaderruimte zitten <b>${p} personen</b>. Per persoon is <b>${pp} dm³/s</b> verse lucht nodig. Hoeveel m³/h moet het ventilatiesysteem leveren? (1 decimaal)`,type:'num',answer:v*3.6,dec:1,unit:'m³/h',hint:'Totaal in dm³/s, daarna × 3,6.',sol:steps([`${p} × ${pp} = ${v} dm³/s`,`× 3,6 = ${N(v*3.6,1)} m³/h`])};
}
// Calculatie
function genHoev(l){
  if(l===1){const q=rnd(R(15,300)/10,1),p=pick([12.5,18,24.95,32,45]);const u=pick(['m²','m¹','m³']);return {q:`Post in een begroting: <b>${N(q)} ${u}</b> à <b>€ ${N(p,2)}</b> per ${u}. Wat is het bedrag van de post?`,type:'num',answer:q*p,dec:2,unit:'€',unitPre:true,hint:'Hoeveelheid × eenheidsprijs.',sol:steps([`${N(q)} × € ${N(p,2)} = € ${N(q*p,2)}`])}}
  if(l===2){const L=rnd(R(30,90)/10,1),H=rnd(R(25,30)/10,1),open=rnd(R(10,40)/10,1),p=pick([45,55,65]);const A=L*H-open;return {q:`Een binnenwand van <b>${N(L)} × ${N(H)} m</b> met <b>${N(open)} m²</b> aan openingen wordt gestukt à <b>€ ${p} per m²</b>. Wat kost het stukwerk? (2 decimalen)`,type:'num',answer:A*p,dec:2,unit:'€',unitPre:true,hint:'Netto oppervlak × eenheidsprijs.',sol:steps([`Netto: ${N(L)} × ${N(H)} − ${N(open)} = ${N(A,3)} m²`,`× € ${p} = € ${N(A*p,2)}`])}}
  const st=R(30,90),pst=pick([0.62,0.75,0.85]),m=R(2,8),pm=pick([1.25,1.5,1.8]);const A=st*1;const stenen=A*60,mortel=A*0.025;return {q:`Je calculeert <b>${st} m²</b> halfsteens metselwerk. Per m² gaan 60 stenen à € ${N(pst,2)} en 0,025 m³ mortel à € ${N(pm*100,2)} per m³. Wat kost het materiaal? (2 decimalen)`,type:'num',answer:stenen*pst+mortel*pm*100,dec:2,unit:'€',unitPre:true,hint:'Stenen: aantal × prijs. Mortel: volume × prijs. Tel op.',sol:steps([`Stenen: ${st} × 60 = ${N(stenen)} × € ${N(pst,2)} = € ${N(stenen*pst,2)}`,`Mortel: ${st} × 0,025 = ${N(mortel,3)} m³ × € ${N(pm*100,2)} = € ${N(mortel*pm*100,2)}`,`Totaal: € ${N(stenen*pst+mortel*pm*100,2)}`])};
}
function genNormuren(l){
  const q=rnd(R(20,200)/1,0),nt=pick([0.25,0.35,0.5,0.8,1.2]),loon=pick([48,52,55,58]);const u=q*nt;
  if(l===1)return {q:`Voor ${q} m² tegelwerk geldt een normtijd van <b>${N(nt)} uur per m²</b>. Hoeveel uur werk is dat?`,type:'num',answer:u,dec:1,unit:'uur',hint:'Hoeveelheid × normtijd.',sol:steps([`${q} × ${N(nt)} = ${N(u,2)} uur`])};
  if(l===2)return {q:`${q} m² × normtijd <b>${N(nt)} u/m²</b>, uurloon <b>€ ${loon}</b>. Wat zijn de arbeidskosten? (2 decimalen)`,type:'num',answer:u*loon,dec:2,unit:'€',unitPre:true,hint:'Uren × uurloon.',sol:steps([`${q} × ${N(nt)} = ${N(u,2)} uur`,`× € ${loon} = € ${N(u*loon,2)}`])};
  const ploeg=pick([2,3,4]);const dagen=u/(ploeg*8);return {q:`${q} m² × normtijd <b>${N(nt)} u/m²</b>. Een ploeg van <b>${ploeg}</b> man werkt 8 uur per dag. Hoeveel werkdagen duurt het? (1 decimaal)`,type:'num',answer:dagen,dec:1,unit:'dagen',hint:'Totaal uren ÷ (mensen × uren per dag).',sol:steps([`Uren: ${N(u,2)}`,`Per dag: ${ploeg} × 8 = ${ploeg*8} uur`,`${N(u,2)} / ${ploeg*8} = ${N(dagen,2)} dagen`])};
}
function genRendement(l){
  if(l<3){const I=R(150,600)*1000,H=Math.round(I*pick([0.045,0.05,0.055,0.06,0.07])/100)*100;return {q:`Een appartement kost <b>€ ${N(I)}</b> en levert <b>€ ${N(H)}</b> huur per jaar op. Wat is het bruto aanvangsrendement (BAR)? (2 decimalen)`,type:'num',answer:H/I*100,dec:2,unit:'%',hint:'BAR = jaarhuur / investering × 100%',sol:steps([`${N(H)} / ${N(I)} × 100% = ${N(H/I*100,3)}%`])}}
  const I=R(4,30)*1000,B=R(400,2400);return {q:`Zonnepanelen kosten <b>€ ${N(I)}</b> en besparen <b>€ ${N(B)}</b> per jaar. Wat is de eenvoudige terugverdientijd? (1 decimaal)`,type:'num',answer:I/B,dec:1,unit:'jaar',hint:'Investering / jaarlijkse besparing.',sol:steps([`${N(I)} / ${N(B)} = ${N(I/B,2)} jaar`,'Eenvoudig: zonder rente en prijsstijgingen.'])};
}

const CASES3={
statistiek:[()=>{const xs=Array.from({length:6},()=>R(30,44));const m=xs.reduce((a,b)=>a+b,0)/6;const s=Math.sqrt(xs.reduce((a,x)=>a+(x-m)**2,0)/5);const fk=m-1.64*s;const eis=pick([30,35]);
  return {t:'Betonkubussen keuren',lvl:3,intro:`Van een stort zijn zes kubussen getest. Druksterktes (N/mm²): <b>${xs.join(', ')}</b>. Het bestek eist een karakteristieke kubusdruksterkte van <b>${eis} N/mm²</b>.`,
  parts:[{q:'Wat is de gemiddelde druksterkte? (2 decimalen)',answer:m,dec:2,unit:'N/mm²',hint:'Som ÷ 6',sol:steps([`${xs.reduce((a,b)=>a+b,0)} / 6 = ${N(m,3)}`])},
  {q:'Wat is de standaardafwijking s (delen door n − 1)? (2 decimalen)',answer:s,dec:2,unit:'N/mm²',hint:'s = √(Σ(x − x̄)² / 5)',sol:steps([`s = ${N(s,3)}`])},
  {q:'Wat is de karakteristieke sterkte f_k = f_m − 1,64 s? (2 decimalen)',answer:fk,dec:2,unit:'N/mm²',hint:'Gebruik de onafgeronde waarden.',sol:steps([`${N(m,3)} − 1,64 × ${N(s,3)} = ${N(fk,3)}`])},
  {q:`Hoeveel N/mm² ligt f_k boven (+) of onder (−) de eis van ${eis}? (2 decimalen)`,answer:fk-eis,dec:2,unit:'N/mm²',hint:'f_k − eis',sol:steps([`${N(fk,3)} − ${eis} = ${N(fk-eis,3)}`,fk>=eis?'Voldoet.':'Voldoet niet: extra onderzoek of afkeuren.'])}]}}],
tekeningen:[()=>{const h=pick([2700,2800,2900]),vl=pick([200,220,250]),dak=pick([3200,3500,3800]);const p1=h,p2=2*h,nok=2*h+dak;const nap=rnd(R(-150,250)/100,2);
  return {t:'Een doorsnede lezen',lvl:2,intro:`Een doorsnede van een rijwoning: peil (P = 0) is bovenkant afgewerkte begane grondvloer. De verdiepingshoogte is <b>${h} mm</b>, de vloeren zijn <b>${vl} mm</b> dik (inclusief afwerking). De nok ligt <b>${dak} mm</b> boven de bovenkant van de 2e verdiepingsvloer. Peil ligt op <b>NAP ${nap>=0?'+':'−'}${N(Math.abs(nap),2)} m</b>.`,
  parts:[{q:'Welke peilmaat (in mm) hoort bij de bovenkant van de 1e verdiepingsvloer?',answer:p1,unit:'mm',hint:'Eén verdiepingshoogte boven peil.',sol:steps([`+${N(p1)} mm, op tekening: ${mm(p1)}`])},
  {q:'Hoe groot is de vrije hoogte tussen bovenkant begane grondvloer en onderkant 1e verdiepingsvloer (mm)?',answer:h-vl,unit:'mm',hint:'Verdiepingshoogte min vloerdikte.',sol:steps([`${h} − ${vl} = ${h-vl} mm`,h-vl>=2600?'≥ 2600 mm: voldoet aan het Bbl voor nieuwbouw.':'< 2600 mm: te laag voor een nieuwbouw-verblijfsgebied.'])},
  {q:'Op welke peilmaat ligt de nok (mm)?',answer:nok,unit:'mm',hint:'Twee verdiepingshoogtes plus de hoogte van het dak.',sol:steps([`2 × ${h} + ${dak} = ${N(nok)} mm`])},
  {q:'Op welke hoogte t.o.v. NAP ligt de nok (m, 2 decimalen)?',answer:nap+nok/1000,dec:2,unit:'m',hint:'NAP-hoogte van peil + nokhoogte in meter.',sol:steps([`${N(nap,2)} + ${N(nok/1000,3)} = ${N(nap+nok/1000,3)} m`])}]}}],
regels:[()=>{const GO=R(85,140),VG=Math.round(GO*rnd(R(48,66)/100,2)),wk=rnd(R(28,45)/10,1)*10;const A=rnd(R(280,420)/10,1);
  return {t:'Een woning toetsen aan het Bbl',lvl:2,intro:`Een nieuwbouwwoning heeft <b>${GO} m²</b> gebruiksoppervlakte, waarvan <b>${VG} m²</b> verblijfsgebied. De woonkamer met open keuken (met kooktoestel) is <b>${N(A)} m²</b>.`,
  parts:[{q:'Hoeveel m² verblijfsgebied is minimaal nodig (55% van de GO)? (1 decimaal)',answer:GO*0.55,dec:1,unit:'m²',hint:'GO × 0,55',sol:steps([`${GO} × 0,55 = ${N(GO*0.55,2)} m²`,VG>=GO*0.55?`${VG} m² is voldoende.`:`${VG} m² is te weinig.`])},
  {q:'Welk percentage van de GO is verblijfsgebied? (1 decimaal)',answer:VG/GO*100,dec:1,unit:'%',hint:'VG / GO × 100%',sol:steps([`${VG} / ${GO} × 100% = ${N(VG/GO*100,2)}%`])},
  {q:'Hoeveel m² equivalente daglichtoppervlakte heeft de woonkamer minimaal nodig (10%)? (2 decimalen)',answer:A*0.1,dec:2,unit:'m²',hint:'10% van de vloeroppervlakte.',sol:steps([`${N(A)} × 0,10 = ${N(A*0.1,2)} m²`])},
  {q:'Welke ventilatiecapaciteit is minimaal nodig voor de woonkamer (dm³/s)? Gebruik 0,9 dm³/s per m² en minimaal 21 dm³/s met kooktoestel. (2 decimalen)',answer:Math.max(21,0.9*A),dec:2,unit:'dm³/s',hint:'Grootste van 0,9·A en 21.',sol:steps([`0,9 × ${N(A)} = ${N(0.9*A,2)}`,`Minimaal 21 → ${N(Math.max(21,0.9*A),2)} dm³/s`])}]}}]
};

// ---- extra bouwkunde-begrippen: architectuur, BIM, duurzaam ----
Object.assign(TERMS,{
architectuur:{
 ontwerp:[['Programma van eisen','Lijst van ruimtes, oppervlakten en eisen waarmee de architect ontwerpt.'],['Massa','De hoofdvorm en het volume van een gebouw in zijn omgeving.'],['Ritme','Herhaling van gevelelementen, zoals ramen of penanten, in een regelmatig patroon.'],['Proportie','De verhouding tussen maten, bijvoorbeeld hoogte en breedte van een gevel of raam.'],['Rooilijn','Lijn op het perceel tot waar de voorgevel mag of moet staan.'],['Routing','Hoe mensen zich door een gebouw bewegen: entree, gangen, trappen.'],['Zonering','Het groeperen van ruimtes met een vergelijkbare functie of mate van privacy.'],['Oriëntatie','De ligging van een gebouw ten opzichte van zon, wind en omgeving.'],['Context','De bestaande omgeving waarin een ontwerp moet passen.'],['Maquette','Schaalmodel van een gebouw om het ontwerp ruimtelijk te tonen.']],
 stijlen:[['Amsterdamse School','Expressieve baksteenarchitectuur (ca. 1910–1930) met golvende gevels en veel ambachtelijke details.'],['De Stijl','Kunst- en architectuurbeweging (vanaf 1917) met rechte lijnen, vlakken en primaire kleuren; Rietveld Schröderhuis.'],['Nieuwe Bouwen','Functionalistische architectuur (ca. 1920–1940) met glas, staal, beton, platte daken en veel licht.'],['Delftse School','Traditionele stroming (ca. 1925–1955) met baksteen en hellende daken als reactie op het Nieuwe Bouwen.'],['Wederopbouw','Architectuur na de Tweede Wereldoorlog (ca. 1945–1965), sober en vaak in grote aantallen gebouwd.'],['Structuralisme','Stroming (ca. 1960–1980) die gebouwen opbouwt uit herhaalde eenheden; Hertzberger, Van Eyck.'],['Functionalisme','Uitgangspunt dat de vorm van een gebouw voortkomt uit de functie.'],['Monument','Gebouw dat vanwege zijn cultuurhistorische waarde beschermd is.']]},
bim:{
 bim:[['BIM','Bouwwerkinformatiemodel: digitaal 3D-model met informatie over alle onderdelen van het gebouw.'],['IFC','Open bestandsformaat om BIM-modellen tussen verschillende software uit te wisselen.'],['Clashcontrole','Automatisch zoeken naar botsingen tussen modellen, zoals een leiding door een balk.'],['BIM-protocol','Afspraken over hoe partijen in een project met BIM-modellen werken.'],['Informatieniveau (LOD)','Hoe gedetailleerd een object in het model is uitgewerkt, van grof naar compleet.'],['CDE','Gezamenlijke digitale omgeving waarin alle projectinformatie wordt gedeeld.'],['NL-SfB','Nederlandse codering om bouwdelen in te delen, bijvoorbeeld 21 voor buitenwanden.'],['Parametrisch ontwerpen','Ontwerpen met regels en variabelen, zodat het model zich aanpast als een waarde verandert.']],
 conventies:[['Zichtlijn','Doorgetrokken lijn voor zichtbare randen van een object.'],['Verborgen lijn','Gestreepte lijn voor randen die achter iets anders liggen.'],['Hartlijn','Streep-stiplijn door het midden van een element of op het stramien.'],['Snijvlak','Het vlak dat je in een doorsnede of plattegrond doorsnijdt; dikker getekend en gearceerd.'],['Titelhoek','Vak op een tekening met project, tekeningnummer, schaal, datum en tekenaar.'],['Revisie','Gewijzigde versie van een tekening, aangegeven met een letter of nummer en een omschrijving.'],['Noordpijl','Pijl op een situatie of plattegrond die het noorden aangeeft.'],['Peilmaat','Hoogtemaat ten opzichte van peil, aangegeven met een driehoekje en bijv. +2.700.']]},
duurzaam:{
 circulair:[['Circulair bouwen','Bouwen zo dat materialen na gebruik opnieuw ingezet kunnen worden, zonder waardeverlies.'],['R-ladder','Rangorde van circulaire strategieën, van weigeren en verminderen tot hergebruik, recyclen en als laatste terugwinnen van energie.'],['Losmaakbaar bouwen','Onderdelen zo verbinden (bijvoorbeeld schroeven in plaats van lijmen) dat ze later los kunnen.'],['Materialenpaspoort','Overzicht van welke materialen waar in een gebouw zitten, voor later hergebruik.'],['LCA','Levenscyclusanalyse: de milieu-impact van een product van grondstof tot afval.'],['Biobased bouwen','Bouwen met materialen uit planten, zoals hout, vlas, stro en hennep.'],['CO2-opslag','Hout en andere biobased materialen leggen koolstof vast zolang ze gebruikt worden.'],['Hergebruik','Een product of onderdeel opnieuw gebruiken voor hetzelfde doel, zonder het om te smelten of te vermalen.']],
 energie2:[['Aardgasvrij','Een gebouw dat geen aardgas gebruikt voor verwarming, warm water of koken.'],['Warmtepomp','Installatie die warmte uit lucht, bodem of water oppompt naar een hogere temperatuur.'],['WTW','Warmteterugwinning: de warmte uit afgevoerde lucht verwarmt de toegevoerde verse lucht.'],['Nul-op-de-meter','Woning die over een jaar netto evenveel energie opwekt als ze gebruikt (NOM).'],['TOjuli','Indicator voor het risico op oververhitting van een woning in de zomer.'],['Zonwering','Voorziening, bij voorkeur buiten, die zonlicht en warmte tegenhoudt.'],['Kierdichting','Het dichten van naden en kieren zodat er geen ongewenste luchtstroom is.'],['Lage-temperatuurverwarming','Verwarming met water van ongeveer 35–45 °C, geschikt voor warmtepompen; vraagt goede isolatie.']]}
});
Object.assign(TERMSUB,{ontwerp:'Ontwerpbegrippen',stijlen:'Bouwstijlen in Nederland',bim:'BIM en samenwerken',conventies:'Tekenconventies',circulair:'Circulair bouwen',energie2:'Energie en comfort'});
Object.assign(SCEN,{
 ontwerp:[['Waar staat vastgelegd tot waar de voorgevel van een nieuw huis mag komen?','De rooilijn in het omgevingsplan',['Het programma van eisen','De titelhoek','Het BIM-protocol']]],
 stijlen:[['Een woonblok uit 1925 met golvende bakstenen gevels en veel versieringen. Welke stijl?','Amsterdamse School',['Nieuwe Bouwen','Structuralisme','Wederopbouw']],['Een wit gebouw uit 1930 met plat dak, stalen ramen en lange raamstroken. Welke stijl?','Nieuwe Bouwen',['Delftse School','Amsterdamse School','Wederopbouw']]],
 bim:[['De installateur en de constructeur werken in verschillende software. Hoe wisselen ze hun modellen uit?','Via IFC',['Via een PDF van de plattegrond','Via de titelhoek','Dat kan niet']]],
 conventies:[['Hoe teken je een hartlijn?','Als streep-stiplijn',['Doorgetrokken en dik','Gestippeld','Met een arcering']]],
 circulair:[['Welke verbinding maakt een gevelbekleding het best losmaakbaar?','Schroeven of klemmen',['Lijmen','Inmetselen','Instorten in beton']]],
 energie2:[['Waarom past vloerverwarming goed bij een warmtepomp?','Ze werkt met lage watertemperaturen, waarbij een warmtepomp efficiënt is',['Ze verbruikt geen energie','Ze heeft geen isolatie nodig','Ze werkt alleen met aardgas']]]
});

// ================= UITBREIDING 3: ontbrekende basis Bouwkunde =================
Object.assign(TERMS,{
constructie:{
 krachtsafdracht:[['Draagconstructie','Alle onderdelen die samen de belastingen naar de fundering brengen: vloeren, balken, kolommen, wanden.'],['Krachtsafdracht','De weg die een belasting aflegt door het gebouw: van vloer via balk of wand naar kolom en fundering.'],['Ligger','Horizontaal constructiedeel dat op buiging wordt belast, zoals een balk of latei.'],['Kolom','Verticaal staafvormig constructiedeel dat vooral op druk wordt belast.'],['Dragende wand','Wand die vloeren of daken draagt en de belasting naar beneden afvoert.'],['Overspanning','De vrije afstand tussen twee steunpunten die een vloer of balk overbrugt.'],['Oplegging','Plek waar een ligger of vloer op een ander constructiedeel rust.'],['Scharnier','Verbinding die wel kracht maar geen moment overbrengt; het deel kan draaien.'],['Inklemming','Verbinding die ook een moment overbrengt; het deel kan niet draaien.'],['Uitkraging','Constructiedeel dat aan één kant is ingeklemd en aan de andere kant vrij uitsteekt, zoals een balkon.']],
 belastingen:[['Permanente belasting','Belasting die altijd aanwezig is: het eigen gewicht van de constructie en de afbouw (g).'],['Veranderlijke belasting','Belasting die kan wisselen, zoals mensen, meubels, sneeuw en wind (q).'],['Eigen gewicht','Gewicht van het constructiedeel zelf, bijvoorbeeld beton circa 24 kN/m³.'],['Gebruiksbelasting','Veranderlijke belasting door het gebruik van een ruimte; bij woningvloeren circa 1,75 kN/m².'],['Windbelasting','Druk en zuiging van wind op gevels en daken; horizontaal en hoger aan de kust en bij hoge gebouwen.'],['Sneeuwbelasting','Veranderlijke belasting van sneeuw op een dak, in Nederland in de orde van 0,5–0,7 kN/m².'],['Puntlast','Belasting die op één punt aangrijpt, in kN.'],['Lijnlast','Belasting verdeeld over een lengte, in kN/m; bijvoorbeeld een muur op een balk.'],['Vlaklast','Belasting verdeeld over een oppervlak, in kN/m².'],['Belastingfactor','Veiligheidsfactor waarmee je belastingen vermenigvuldigt voor de sterkte-controle (orde 1,2–1,5).']],
 stabiliteit:[['Stabiliteit','Het vermogen van een gebouw om horizontale krachten (wind, scheefstand) op te nemen zonder om te vallen of te vervormen.'],['Schijfwerking','Een stijve vloer of wand die als één plaat horizontale krachten doorgeeft.'],['Stabiliteitswand','Stijve wand (beton of metselwerk) die het gebouw in zijn vlak stabiel houdt.'],['Windverband','Schuine staven (kruisen) in een staalskelet die de constructie stabiliseren.'],['Portaal','Raamwerk van kolommen en ligger met stijve hoekverbindingen dat zichzelf stabiel houdt.'],['Kern','Stijve betonnen schacht (trappenhuis, liften) die een hoog gebouw stabiliseert.'],['Knik','Zijdelings uitbuigen van een slanke kolom onder druk, al bij een lagere kracht dan de materiaalsterkte.'],['Kip','Zijdelings uitwijken en verdraaien van een slanke ligger bij buiging.'],['Doorbuiging','Hoeveel een ligger of vloer doorzakt onder belasting; begrensd voor comfort en schade aan afwerking.'],['Scheurvorming','Ontstaan van scheuren door trek, krimp, zetting of temperatuur.']]},
details:{
 aansluitingen:[['Bouwknoop','Plek waar twee of meer bouwdelen samenkomen, zoals gevel en dak of kozijn en muur.'],['Waterkering','Laag of strook die voorkomt dat water de constructie in loopt, bijvoorbeeld een DPC-strook of loodslab.'],['DPC-folie','Waterkerende strook in de spouw boven kozijnen en lateien die water naar buiten leidt.'],['Loodslab','Strook lood (of loodvervanger) die een aansluiting waterdicht maakt, bijvoorbeeld bij een schoorsteen.'],['Dakrand','Afwerking aan de rand van een plat dak, met daktrim of boeideel.'],['Dakopstand','Opstaande rand van de dakbedekking, minstens circa 15 cm hoog, zodat water niet over de rand loopt.'],['Kimfixatie','Bevestiging van dakbedekking op de overgang van dakvlak naar opstand.'],['Luchtdichting','Laag of kit die voorkomt dat lucht door naden en kieren lekt.'],['Kozijnaansluiting','Detail van de overgang tussen kozijn en gevel: waterkering, luchtdichting, isolatie en afwerking.'],['Lineaire warmtedoorgangscoëfficiënt (ψ)','Extra warmteverlies per meter bouwknoop, in W/(m·K).']],
 vochtdetail:[['Optrekkend vocht','Grondvocht dat door capillaire werking omhoog trekt in muren.'],['Doorslaand vocht','Regenwater dat door een muur heen naar binnen dringt.'],['Inwendige condensatie','Waterdamp die ín de constructie condenseert, vaak door een ontbrekende dampremmer aan de warme kant.'],['Oppervlaktecondensatie','Condens op een koud oppervlak, bijvoorbeeld in een hoek bij een koudebrug.'],['Temperatuurfactor (f-factor)','Maat voor hoe warm een binnenoppervlak blijft; het Bbl eist voor woningen minimaal 0,65.'],['Capillair','Het opzuigen van water door fijne poriën, zoals in baksteen en mortel.'],['Ventilatie kruipruimte','Ventilatieroosters in de gevel die vochtige lucht uit de kruipruimte afvoeren.'],['Bodemafsluiting','Laag op de bodem van de kruipruimte (folie, schelpen, isolatie) die vochtverdamping beperkt.'],['Spouwventilatie','Open stootvoegen onder en boven in het buitenblad, zodat de spouw kan ventileren en drogen.'],['Schimmel','Groei op vochtige, koele oppervlakken bij langdurig hoge relatieve vochtigheid (boven circa 80%).']]},
uitvoering:{
 planning:[['Bouwplanning','Overzicht van alle activiteiten met duur, volgorde en afhankelijkheden.'],['Strokenplanning','Planning met balken (stroken) per activiteit langs een tijdas; ook Gantt-chart genoemd.'],['Kritiek pad','De reeks activiteiten zonder speling; vertraging daarop vertraagt het hele project.'],['Mijlpaal','Belangrijk moment in de planning, zoals “casco gereed” of “wind- en waterdicht”.'],['Doorlooptijd','Totale tijd van start tot einde van een activiteit of project.'],['Speling (float)','Hoeveel een activiteit kan uitlopen zonder dat het project later klaar is.'],['Werkvoorbereiding','Alles wat vóór de uitvoering geregeld moet worden: tekeningen, bestellingen, planning, inkoop.'],['Bouwstroom','Herhalende reeks woningen die in vaste volgorde door dezelfde ploegen wordt gebouwd.'],['Wind- en waterdicht','Moment waarop dak, gevels en kozijnen dicht zijn en de afbouw binnen kan beginnen.'],['Oplevering','Overdracht van het gebouw aan de opdrachtgever, met een proces-verbaal en opleverpunten.']],
 bouwplaats:[['Bouwplaatsinrichting','Indeling van de bouwplaats: keten, opslag, kraan, toegang, afval en verkeersroutes.'],['V&G-plan','Veiligheids- en gezondheidsplan: hoe risico’s in ontwerp en uitvoering worden beheerst (Arbobesluit).'],['Arbowet','Wet die gezond en veilig werken regelt, ook op de bouwplaats.'],['Valbeveiliging','Maatregelen tegen vallen van hoogte, zoals hekwerken, randbeveiliging en harnassen; verplicht vanaf 2,5 m.'],['Steiger','Tijdelijke werkvloer langs een gevel om veilig op hoogte te werken.'],['Bouwkeet','Tijdelijk onderkomen voor schaft, kantoor en sanitair op de bouwplaats.'],['Persoonlijke beschermingsmiddelen','Helm, veiligheidsschoenen, hesje, bril en gehoorbescherming.'],['Toolboxmeeting','Kort veiligheidsoverleg op de bouwplaats over een specifiek risico.'],['Bouwafval scheiden','Verplicht scheiden van afvalstromen zoals hout, steen, metaal en gips.'],['Opleverpunt','Gebrek of onafgewerkt onderdeel dat bij de oplevering wordt genoteerd en hersteld.']]},
veiligheid:{
 brand:[['Brandcompartiment','Deel van een gebouw dat brand een bepaalde tijd binnen houdt; bij nieuwbouw maximaal 1000 m².'],['Subbrandcompartiment','Kleiner deel binnen een brandcompartiment, met een eigen scheiding, zodat vluchten langer veilig is.'],['WBDBO','Weerstand tegen branddoorslag en brandoverslag: hoe lang (in minuten) brand niet van de ene ruimte naar de andere kan.'],['Branddoorslag','Brand die door een scheidingsconstructie heen gaat.'],['Brandoverslag','Brand die via buiten (gevel, dak) naar een andere ruimte overslaat.'],['Brandwerendheid','Hoe lang een constructiedeel blijft dragen of scheiden bij brand, bijvoorbeeld 30 of 60 minuten.'],['Euroklassen','Brandklassen voor materialen van A1 (onbrandbaar) tot F; extra s (rook) en d (druppels).'],['Rookmelder','Melder die bij rook alarm geeft; bij nieuwbouw op het elektriciteitsnet aangesloten.'],['Rookcompartiment','Ruimte waarin rook een tijd binnen blijft, zodat de vluchtroute rookvrij blijft.'],['Brandwerende deur','Deur met een bepaalde brandwerendheid, bijvoorbeeld 30 minuten, die vanzelf sluit.']],
 vluchten:[['Vluchtroute','Route van een plek in het gebouw naar een veilige plaats buiten.'],['Beschermde vluchtroute','Vluchtroute door een rookcompartiment, beschermd tegen rook en brand.'],['Extra beschermde vluchtroute','Vluchtroute met nog hogere bescherming, zoals een trappenhuis in een hoog gebouw.'],['Veilige plaats','Plek buiten het gebouw waar je niet meer door brand bedreigd wordt.'],['Loopafstand','Afstand die je moet lopen tot een uitgang of beschermde route; het Bbl begrenst deze.'],['Toegankelijkheidssector','Deel van een gebouw dat ook voor mensen in een rolstoel bereikbaar en bruikbaar moet zijn.'],['Vrije doorgang','Minimale breedte en hoogte van een deur of doorgang; bij nieuwbouw circa 0,85 m breed en 2,3 m hoog.'],['Vloerafscheiding','Hek of balustrade bij een hoogteverschil van meer dan 1 m; minimaal 1 m hoog (bij meer dan 13 m: 1,2 m).'],['Klimlijn','Denkbeeldige looplijn over een trap, waar de aantrede wordt gemeten.'],['Trapleuning','Leuning op 0,8–1,0 m hoogte, verplicht aan minstens één kant bij een trap met hoogteverschil vanaf 1 m.']]},
installsys:{
 klimaat:[['Ventilatiesysteem A','Natuurlijke toevoer (roosters) en natuurlijke afvoer (kanalen, schacht).'],['Ventilatiesysteem B','Mechanische toevoer en natuurlijke afvoer; komt weinig voor.'],['Ventilatiesysteem C','Natuurlijke toevoer via roosters en mechanische afvoer met een ventilatiebox; veel in woningen.'],['Ventilatiesysteem D','Mechanische toevoer én afvoer, meestal met warmteterugwinning (WTW).'],['Warmteterugwinning (WTW)','Warmte uit de afgevoerde lucht wordt overgedragen aan de verse toevoerlucht.'],['CV-ketel','Toestel dat water verwarmt (meestal op gas) voor radiatoren en warm tapwater.'],['Lucht-waterwarmtepomp','Warmtepomp die warmte uit de buitenlucht haalt en aan het cv-water afgeeft.'],['Bodemwarmtepomp','Warmtepomp die warmte uit de bodem haalt via een bron; hoog rendement en kan koelen.'],['Vloerverwarming','Verwarming met leidingen in de dekvloer; werkt goed op lage temperatuur.'],['COP','Rendement van een warmtepomp: geleverde warmte gedeeld door gebruikte elektriciteit.']],
 water:[['Drinkwaterinstallatie','Leidingen van watermeter naar tappunten, met koud en warm water.'],['DWA','Droogweerafvoer: vuil water van toilet, keuken, douche.'],['HWA','Hemelwaterafvoer: regenwater van daken.'],['Gescheiden stelsel','Riolering waarin vuil water en regenwater apart worden afgevoerd.'],['Stankafsluiter (sifon)','Bocht met water in een afvoer die rioollucht tegenhoudt.'],['Ontspanningsleiding','Leiding boven het dak die de riolering belucht, zodat sifons niet leeggezogen worden.'],['Afschot','Helling van een afvoerleiding of plat dak zodat water wegloopt; leidingen circa 1:50 tot 1:200.'],['Legionella','Bacterie die groeit in stilstaand lauw water (25–50 °C); daarom warm water heet genoeg houden.'],['Infiltratie','Regenwater in de bodem laten wegzakken in plaats van afvoeren naar het riool.'],['Ontstoppingsstuk','Afsluitbaar stuk in een afvoer om verstoppingen te kunnen verhelpen.']],
 elektra:[['Meterkast','Kast met aansluitingen voor elektra, gas, water en data, bij de voordeur.'],['Groepenkast','Verdeelkast die de elektrische installatie in groepen verdeelt, elk met een eigen beveiliging.'],['Aardlekschakelaar','Schakelaar die de stroom uitschakelt bij een lekstroom naar aarde, om elektrocutie te voorkomen.'],['Installatieautomaat','Beveiliging die een groep uitschakelt bij overbelasting of kortsluiting.'],['Aarding','Verbinding met de aarde zodat een fout veilig wegloopt.'],['Krachtgroep','Aparte groep voor zware apparaten, zoals een inductiekookplaat (vaak 2 × 230 V of 400 V).'],['NEN 1010','Norm met de veiligheidseisen voor elektrische installaties.'],['Zonnepanelen (PV)','Panelen die zonlicht omzetten in elektriciteit.'],['Omvormer','Apparaat dat de gelijkstroom van zonnepanelen omzet in wisselstroom.'],['Laadpunt','Aansluiting om een elektrische auto op te laden.']]},
bfbegrip:{
 warmtevocht:[['Rc-waarde','Warmteweerstand van een hele constructie (m²K/W); hoe hoger, hoe beter.'],['U-waarde','Warmtedoorgangscoëfficiënt van een constructie of raam (W/m²K); hoe lager, hoe beter.'],['λ-waarde','Warmtegeleiding van een materiaal (W/mK).'],['Relatieve vochtigheid','Hoeveel waterdamp de lucht bevat ten opzichte van het maximum bij die temperatuur, in %.'],['Dauwpunt','Temperatuur waarbij waterdamp in de lucht gaat condenseren.'],['Dampdiffusie','Transport van waterdamp door een materiaal van hoge naar lage dampspanning.'],['μ-waarde','Dampdiffusieweerstandsgetal: hoeveel keer meer weerstand een materiaal heeft dan lucht.'],['Thermische massa','Vermogen van zware materialen om warmte op te slaan en temperatuurschommelingen te dempen.'],['Transmissieverlies','Warmteverlies door de schil (muren, dak, vloer, ramen).'],['Infiltratie (lucht)','Ongewenste luchtstroom door kieren en naden; kost energie.']],
 geluidb:[['Decibel (dB)','Eenheid voor geluidsniveau op een logaritmische schaal; +3 dB is twee keer zoveel geluidsenergie.'],['Luchtgeluid','Geluid dat via de lucht wordt overgedragen, zoals stemmen en muziek.'],['Contactgeluid','Geluid dat ontstaat door aanstoten van de constructie, zoals voetstappen.'],['Luchtgeluidisolatie','Hoe goed een scheiding luchtgeluid tegenhoudt; zware en ontkoppelde constructies werken het best.'],['Contactgeluidisolatie','Hoe goed een vloer loopgeluid tegenhoudt, bijvoorbeeld met een zwevende dekvloer.'],['Zwevende dekvloer','Dekvloer op een veerkrachtige laag, los van wanden, die contactgeluid dempt.'],['Nagalmtijd','Tijd waarin geluid in een ruimte 60 dB afneemt; bepaalt hoe galmend een ruimte klinkt.'],['Geluidabsorptie','Opnemen van geluid door zachte of poreuze materialen, zodat er minder weerkaatst.'],['Flankerende geluidoverdracht','Geluid dat via aansluitende constructies om een scheiding heen loopt.'],['Massawet','Hoe zwaarder een enkelvoudige wand, hoe beter de luchtgeluidisolatie (circa +6 dB per verdubbeling van de massa).']]}
});
Object.assign(TERMSUB,{krachtsafdracht:'Krachtsafdracht',belastingen:'Belastingen',stabiliteit:'Stabiliteit',aansluitingen:'Aansluitingen en waterkering',vochtdetail:'Vocht in gebouwen',planning:'Planning',bouwplaats:'Bouwplaats en veiligheid',brand:'Brandveiligheid',vluchten:'Vluchten en toegankelijkheid',klimaat:'Ventilatie en verwarming',water:'Water en riolering',elektra:'Elektra en energie',warmtevocht:'Warmte en vocht',geluidb:'Geluid'});
Object.assign(SCEN,{
 krachtsafdracht:[['Een vloer rust op een balk, de balk op twee kolommen. Waar gaat de belasting van de kolommen naartoe?','Naar de fundering en dan de grond in',['Naar het dak','Naar de buitengevel','Nergens: de kolom neemt alles op']],['Een balkon steekt vrij uit de gevel. Wat voor verbinding met het gebouw is nodig?','Een inklemming',['Een scharnier','Een glijdende oplegging','Geen verbinding nodig']]],
 belastingen:[['Welke belasting is permanent?','Het eigen gewicht van een betonvloer',['Mensen op een feestje','Sneeuw op het dak','Wind op de gevel']],['Een metselwerk muur staat over de hele lengte op een stalen balk. Hoe noem je die belasting op de balk?','Een lijnlast',['Een puntlast','Een vlaklast','Een windlast']]],
 stabiliteit:[['Een staalskelet van een hal wiebelt in de lengterichting. Wat is een gangbare oplossing?','Windverbanden (kruisen) aanbrengen',['Meer isolatie aanbrengen','De kolommen zwaarder schilderen','Een dikkere dakbedekking']],['Waarom is een slanke, hoge kolom gevoelig?','Hij kan knikken bij een kleinere drukkracht',['Hij roest sneller','Hij kan niet op trek','Hij geleidt warmte']]],
 aansluitingen:[['Boven een kozijn in een spouwmuur komt vocht naar binnen. Wat ontbreekt waarschijnlijk?','Een waterkering (DPC-strook) boven het kozijn die water naar buiten leidt',['Een dampremmende folie aan de buitenkant','Extra stucwerk binnen','Een bredere vensterbank']],['Waarom moet de dakbedekking bij een dakrand omhoog doorlopen?','Zodat water niet over of onder de rand loopt',['Voor de looks','Om geluid te dempen','Om het dak lichter te maken']]],
 vochtdetail:[['In een slaapkamer groeit schimmel in de hoek bij de buitenmuur. Wat is de meest waarschijnlijke oorzaak?','Oppervlaktecondensatie door een koudebrug en te weinig ventilatie',['Optrekkend vocht uit de nok','Te veel isolatie','Te droge lucht']],['Wat doe je tegen vocht uit een natte kruipruimte?','Bodemafsluiting en goede ventilatie van de kruipruimte',['De roosters dichtmaken','Een dampremmer aan de buitenkant van de gevel','Meer verwarmen in de kruipruimte']]],
 planning:[['De ruwbouw loopt een week uit en de oplevering schuift ook een week op. Waar lag de ruwbouw dus?','Op het kritieke pad',['Buiten de planning','In de speling','Na de oplevering']],['Wanneer kan de afbouw binnen goed beginnen?','Als het gebouw wind- en waterdicht is',['Direct na het heien','Voordat de vloeren er liggen','Na de oplevering']]],
 bouwplaats:[['Een timmerman werkt op 3 m hoogte op een plat dak zonder rand. Wat is verplicht?','Valbeveiliging, zoals randbeveiliging',['Alleen een helm','Niets, onder 4 m hoeft dat niet','Een toolboxmeeting achteraf']],['Welk document beschrijft hoe veiligheidsrisico’s op een bouwproject worden beheerst?','Het V&G-plan',['Het bestek','De UAV 2012','Het omgevingsplan']]],
 brand:[['Twee woningen in een rij grenzen aan elkaar. Wat moet de woningscheidende wand vooral hebben?','Voldoende WBDBO, zodat brand niet naar de buren gaat',['Een hoge Rc-waarde','Een open stootvoeg','Zo licht mogelijk materiaal']],['Welke euroklasse is onbrandbaar?','A1',['B','D','F']]],
 vluchten:[['Een vide in een woning heeft een hoogteverschil van 2,8 m. Wat is nodig?','Een vloerafscheiding van minimaal 1 m hoog',['Niets','Een vloerafscheiding van 0,6 m','Alleen een trapleuning']],['Waarom moet een deur in de toegankelijkheidssector minimaal circa 0,85 m vrije breedte hebben?','Zodat een rolstoel erdoor kan',['Voor de brandweer','Voor de ventilatie','Om meubels te kunnen verhuizen']]],
 klimaat:[['Een woning heeft roosters in de kozijnen en een ventilatiebox die lucht uit keuken, toilet en badkamer zuigt. Welk systeem is dit?','Systeem C',['Systeem A','Systeem B','Systeem D']],['Waarom past vloerverwarming goed bij een warmtepomp?','Omdat vloerverwarming werkt met lage watertemperatuur',['Omdat het geen stroom gebruikt','Omdat het sneller opwarmt dan radiatoren','Omdat je dan geen isolatie nodig hebt']]],
 water:[['Uit het afvoerputje in de badkamer komt rioollucht. Wat is waarschijnlijk het probleem?','De stankafsluiter is leeg of ontbreekt',['De drinkwaterdruk is te hoog','De HWA is verstopt','Het gescheiden stelsel']],['Waar gaat het regenwater van het dak heen?','Via de HWA naar het regenwaterriool of infiltratie',['Via de DWA naar de zuivering','In de drinkwaterleiding','In de cv-ketel']]],
 elektra:[['Je raakt een kapotte wasmachine aan en de stroom valt meteen uit. Welke beveiliging deed dat?','De aardlekschakelaar',['De watermeter','De omvormer','Het ontstoppingsstuk']],['Voor een inductiekookplaat is vaak nodig:','Een aparte krachtgroep',['Een extra sifon','Een ventilatiesysteem B','Een loodslab']]],
 warmtevocht:[['Welk raam isoleert het best?','U = 0,7 W/m²K',['U = 1,1 W/m²K','U = 2,8 W/m²K','U = 5,8 W/m²K']],['Waarom zet je een dampremmer aan de warme binnenkant van de isolatie?','Zodat vochtige binnenlucht niet in de koude constructie condenseert',['Om de constructie sterker te maken','Om regen tegen te houden','Om geluid te dempen']]],
 geluidb:[['De bovenburen lopen hoorbaar rond. Welke maatregel helpt het meest?','Een zwevende dekvloer bij de bovenburen',['Meer gordijnen bij jou','Een dikkere voordeur','Isolatie in de spouw']],['Een betonwand wordt twee keer zo zwaar. Wat gebeurt er ongeveer met de luchtgeluidisolatie?','Die neemt circa 6 dB toe',['Die halveert','Die verdubbelt in dB','Er verandert niets']]]
});

// ---- rekenen: belastingen ----
function genLasten(l){
  if(l===1){const d=pick([0.16,0.2,0.22,0.25,0.28]);const v=d*24;return {q:`Een betonvloer is <b>${N(d*1000)} mm</b> dik. Beton weegt <b>24 kN/m³</b>. Wat is het eigen gewicht van de vloer per m²?`,type:'num',answer:v,dec:2,unit:'kN/m²',hint:'Gewicht per m² = dikte (in m) × volumiek gewicht.',sol:steps([`${N(d*1000)} mm = ${N(d)} m`,`${N(d)} × 24 = ${N(v,2)} kN/m²`])}}
  if(l===2){const p=pick([5,5.5,6,6.5,7,7.5]),b=pick([2.4,3,3.6,4.2,4.8,5.4]);const v=p*b;return {q:`Een vloer met een totale belasting van <b>${N(p)} kN/m²</b> ligt op balken die <b>${N(b)} m</b> uit elkaar liggen (h.o.h.). Hoe groot is de lijnlast op één balk?`,type:'num',answer:v,dec:2,unit:'kN/m',hint:'Elke balk draagt een strook vloer zo breed als de h.o.h.-afstand.',sol:steps([`belastingbreedte = ${N(b)} m`,`q = ${N(p)} × ${N(b)} = ${N(v,2)} kN/m`])}}
  const g=rnd(R(30,60)/10,1),qv=1.75,b=pick([3,3.6,4.2,4.8]),L=pick([4.2,4.8,5.4,6,6.6]);const q=(g+qv)*b;const Rr=q*L/2;
  return {q:`Een woningvloer heeft een permanente belasting van <b>${N(g)} kN/m²</b> en een gebruiksbelasting van <b>1,75 kN/m²</b>. De vloer ligt op balken met een h.o.h.-afstand van <b>${N(b)} m</b>. Eén balk overspant <b>${N(L)} m</b> tussen twee opleggingen. Hoe groot is de oplegreactie aan één kant (zonder belastingfactoren)?`,type:'num',answer:Rr,dec:1,unit:'kN',hint:'Tel g en q op, maak er een lijnlast van, en verdeel de totale last over twee opleggingen.',sol:steps([`belasting = ${N(g)} + 1,75 = ${N(g+qv,2)} kN/m²`,`lijnlast = ${N(g+qv,2)} × ${N(b)} = ${N(q,2)} kN/m`,`totaal = ${N(q,2)} × ${N(L)} = ${N(q*L,2)} kN`,`per oplegging: ${N(q*L,2)} / 2 = ${N(Rr,1)} kN`])};
}
// ---- rekenen: trap toetsen aan het Bbl ----
function genTrapBbl(l){
  const h=pick([2600,2650,2700,2750,2800,2850,2900,2950,3000]);
  if(l===1){const n=Math.ceil(h/188);return {q:`Een verdiepingshoogte is <b>${N(h)} mm</b>. Een optrede mag volgens het Bbl maximaal <b>188 mm</b> zijn. Hoeveel optredes zijn minimaal nodig?`,type:'num',answer:n,dec:0,unit:'optredes',hint:'Deel de hoogte door 188 en rond altijd naar boven af.',sol:steps([`${N(h)} / 188 = ${N(h/188,2)}`,`Naar boven afronden: <b>${n}</b> optredes (anders wordt een optrede hoger dan 188 mm)`])}}
  if(l===2){const n=Math.ceil(h/188)+pick([0,1]);const o=h/n;const a=630-2*o;return {q:`Een trap overbrugt <b>${N(h)} mm</b> met <b>${n}</b> optredes. Bereken de aantrede met de stapmaatregel <b>2o + a = 630 mm</b>. Voldoet hij aan de Bbl-eis van minimaal 220 mm?`,type:'num',answer:a,dec:1,unit:'mm',hint:'Eerst o = h / n, dan a = 630 − 2o.',sol:steps([`o = ${N(h)} / ${n} = ${N(o,2)} mm`,`a = 630 − 2 × ${N(o,2)} = ${N(a,1)} mm`,`${a>=220?'≥ 220 mm: voldoet':'< 220 mm: voldoet niet'}`])}}
  const n=Math.ceil(h/188)+pick([0,1]);const o=h/n;const a=Math.round(630-2*o);const Lt=(n-1)*a;
  return {q:`Een rechte trap overbrugt <b>${N(h)} mm</b> met <b>${n}</b> optredes en een aantrede van <b>${a} mm</b>. Een trap heeft één trede minder dan optredes (de bovenste optrede komt uit op de vloer). Hoe lang is de trap in de plattegrond?`,type:'num',answer:Lt,dec:0,unit:'mm',hint:'Aantal treden = aantal optredes − 1; lengte = treden × aantrede.',sol:steps([`treden = ${n} − 1 = ${n-1}`,`lengte = ${n-1} × ${a} = ${N(Lt)} mm`])};
}
// ---- rekenen: planning ----
function genPlanning(l){
  if(l===1){const m2=R(8,20)*10,norm=pick([0.4,0.5,0.6,0.8]),men=pick([2,3,4]);const u=m2*norm;const d=u/(men*8);return {q:`Een ploeg van <b>${men}</b> metselaars metselt <b>${m2} m²</b> gevel. De normtijd is <b>${N(norm)} uur per m²</b>, en ze werken 8 uur per dag. Hoeveel werkdagen kost dit? Rond af op 1 decimaal.`,type:'num',answer:d,dec:1,unit:'dagen',hint:'Eerst het totaal aantal uren, dan delen door (mensen × 8).',sol:steps([`uren = ${m2} × ${N(norm)} = ${N(u)} uur`,`dagen = ${N(u)} / (${men} × 8) = ${N(d,2)}`])}}
  const a=R(3,8),b=R(4,10),c=R(2,7),d=R(3,9),e=R(2,5);
  if(l===2){const t=a+Math.max(b,c)+e;return {q:`Activiteit A duurt <b>${a}</b> dagen. Daarna kunnen B (<b>${b}</b> dagen) en C (<b>${c}</b> dagen) tegelijk. E (<b>${e}</b> dagen) kan pas als B én C klaar zijn. Wat is de totale doorlooptijd?`,type:'num',answer:t,dec:0,unit:'dagen',hint:'Bij activiteiten naast elkaar telt de langste.',sol:steps([`A: ${a}`,`B en C parallel: max(${b}, ${c}) = ${Math.max(b,c)}`,`E: ${e}`,`totaal = ${a} + ${Math.max(b,c)} + ${e} = ${t} dagen`])}}
  const p1=b+d,p2=c;const t=a+Math.max(p1,p2)+e;const fl=Math.abs(p1-p2);const crit=p1>=p2?'B → D':'C';
  return {q:`Na A (<b>${a}</b> d) lopen twee routes parallel: route 1 is B (<b>${b}</b> d) gevolgd door D (<b>${d}</b> d); route 2 is C (<b>${c}</b> d). Daarna volgt E (<b>${e}</b> d). Hoeveel dagen speling heeft de route die níet kritiek is?`,type:'num',answer:fl,dec:0,unit:'dagen',hint:'Bereken de duur van beide routes; het verschil is de speling van de kortste.',sol:steps([`route 1: ${b} + ${d} = ${p1} d`,`route 2: ${c} d`,`kritiek: ${crit}; totale doorlooptijd ${t} d`,`speling = |${p1} − ${p2}| = ${fl} dagen`])};
}

// praktijkopdrachten
const CASES4={
 constructie:[()=>{const d=pick([0.2,0.22,0.25]),af=pick([1,1.2,1.5]),b=pick([3.6,4.2,4.8]),L=pick([4.8,5.4,6]);const g=d*24+af;const p=g+1.75;const q=p*b;const Rr=q*L/2;const M=q*L*L/8;
  return {t:'Een stalen ligger onder een woningvloer',lvl:3,intro:`<p>Een kanaalplaat-achtige betonvloer van <b>${N(d*1000)} mm</b> (24 kN/m³) heeft een afwerking van <b>${N(af)} kN/m²</b> en een gebruiksbelasting van <b>1,75 kN/m²</b>. De vloer ligt op stalen liggers met een h.o.h.-afstand van <b>${N(b)} m</b>; elke ligger overspant <b>${N(L)} m</b>. Reken zonder belastingfactoren.</p>`,parts:[
  {q:'Hoe groot is de permanente belasting g (vloer + afwerking)?',answer:g,dec:2,unit:'kN/m²',hint:'dikte × 24 + afwerking',sol:steps([`${N(d)} × 24 + ${N(af)} = ${N(g,2)} kN/m²`])},
  {q:'Hoe groot is de lijnlast op één ligger (g + q)?',answer:q,dec:2,unit:'kN/m',hint:'(g + 1,75) × h.o.h.',sol:steps([`(${N(g,2)} + 1,75) × ${N(b)} = ${N(q,2)} kN/m`])},
  {q:'Hoe groot is de oplegreactie aan één kant?',answer:Rr,dec:1,unit:'kN',hint:'q × L / 2',sol:steps([`${N(q,2)} × ${N(L)} / 2 = ${N(Rr,1)} kN`])},
  {q:'Hoe groot is het maximale moment in de ligger (M = qL²/8)?',answer:M,dec:1,unit:'kNm',hint:'Gebruik de formule uit Mechanica.',sol:steps([`${N(q,2)} × ${N(L)}² / 8 = ${N(M,1)} kNm`])}]}}],
 veiligheid:[()=>{const h=pick([2700,2800,2900,3000]);const n=Math.ceil(h/188);const o=h/n;const a=Math.round(630-2*o);const Lt=(n-1)*a;
  return {t:'Een trap ontwerpen voor een nieuwbouwwoning',lvl:2,intro:`<p>De verdiepingshoogte is <b>${N(h)} mm</b>. De trap moet voldoen aan het Bbl (optrede ≤ 188 mm, aantrede ≥ 220 mm) en je gebruikt de stapmaatregel 2o + a = 630 mm.</p>`,parts:[
  {q:'Hoeveel optredes zijn minimaal nodig?',answer:n,dec:0,unit:'',hint:'h / 188, naar boven afronden',sol:steps([`${N(h)} / 188 = ${N(h/188,2)} → ${n}`])},
  {q:'Hoe hoog wordt één optrede?',answer:o,dec:1,unit:'mm',hint:'h / n',sol:steps([`${N(h)} / ${n} = ${N(o,2)} mm`])},
  {q:'Welke aantrede volgt uit de stapmaatregel? Rond af op hele mm.',answer:a,dec:0,unit:'mm',hint:'630 − 2o',sol:steps([`630 − 2 × ${N(o,2)} = ${N(630-2*o,1)} → ${a} mm`])},
  {q:'Hoe lang wordt de trap in de plattegrond?',answer:Lt,dec:0,unit:'mm',hint:'(n − 1) × a',sol:steps([`(${n} − 1) × ${a} = ${N(Lt)} mm`])}]}}],
 uitvoering:[()=>{const m2=R(12,20)*10,norm=pick([0.5,0.6]),men=3;const u=m2*norm;const d=Math.ceil(u/(men*8));const b=R(5,9),c=R(3,8);const t=d+Math.max(b,c)+3;
  return {t:'Planning van een rijtjeshuis',lvl:2,intro:`<p>Het buitenblad (<b>${m2} m²</b>, normtijd <b>${N(norm)} u/m²</b>) wordt gemetseld door 3 metselaars die 8 uur per dag werken. Daarna lopen het dak (<b>${b}</b> dagen) en de kozijnen afwerken (<b>${c}</b> dagen) parallel. Tot slot 3 dagen opruimen en controleren.</p>`,parts:[
  {q:'Hoeveel manuren kost het metselwerk?',answer:u,dec:0,unit:'uur',hint:'m² × normtijd',sol:steps([`${m2} × ${N(norm)} = ${N(u)} uur`])},
  {q:'Hoeveel hele werkdagen duurt het metselwerk (naar boven afronden)?',answer:d,dec:0,unit:'dagen',hint:'uren / (3 × 8), naar boven',sol:steps([`${N(u)} / 24 = ${N(u/24,2)} → ${d} dagen`])},
  {q:'Wat is de totale doorlooptijd?',answer:t,dec:0,unit:'dagen',hint:'metselwerk + langste parallelle activiteit + 3',sol:steps([`${d} + max(${b}, ${c}) + 3 = ${t} dagen`])}]}}]
};

// ================= UITBREIDING 4: extra onderdelen na curriculumonderzoek =================
// begrip, omschrijving, toelichting (in de praktijk)
const addSub=(ch,sub,name,list,scen)=>{TERMS[ch]=TERMS[ch]||{};TERMS[ch][sub]=list;TERMSUB[sub]=name;if(scen)SCEN[sub]=scen};
addSub('bouwdelen','afbouw','Afbouw en binnenafwerking',[
 ['Natte ruimte','Ruimte waar water op vloer en wanden komt, zoals badkamer en toilet.','Vraagt vochtbestendige materialen, een waterdichte laag onder het tegelwerk en goede ventilatie (badkamer 14 dm³/s).'],
 ['Metal-stud wand','Lichte scheidingswand van stalen profielen, aan beide kanten bekleed met gipsplaat.','Snel te plaatsen, makkelijk leidingen in weg te werken, en met minerale wol erin redelijk geluidisolerend.'],
 ['Gipsplaat','Plaat van gips tussen twee lagen karton voor wanden en plafonds.','Er zijn varianten voor natte ruimtes (groen) en brandwerende toepassingen (rood/roze).'],
 ['Systeemplafond','Verlaagd plafond van losse platen in een metalen raster.','Veel in kantoren: boven het plafond lopen leidingen die bereikbaar blijven.'],
 ['Stucwerk','Afwerklaag van gips of kalk op wanden en plafonds.','Sausklaar stucwerk is glad genoeg om direct te schilderen; behangklaar laat kleine oneffenheden toe.'],
 ['Spachtelputz','Grove, gestructureerde pleisterlaag op wanden.','Verdoezelt oneffenheden, maar is lastig weer glad te krijgen.'],
 ['Tegelwerk','Wand- of vloerafwerking met keramische tegels in lijm of mortel.','In natte ruimtes hoort er een waterdichte laag (tegelkit, afdichting) onder.'],
 ['Plint','Strook langs de onderkant van een wand die de aansluiting met de vloer afwerkt.','Beschermt de wand tegen stoten en verbergt de kier tussen vloer en wand.'],
 ['Vloerafwerking','Bovenste laag van de vloer: tegels, laminaat, parket, pvc, gietvloer of tapijt.','Laat bij vloerverwarming de warmteweerstand meewegen: dik tapijt isoleert de vloerverwarming.'],
 ['Kozijn binnendeur','Stalen of houten kozijn waarin een binnendeur draait.','Stalen montagekozijnen worden vaak al tijdens de ruwbouw geplaatst.']],
 [['Een badkamerwand wordt betegeld. Wat moet er onder de tegels zeker aanwezig zijn?','Een waterdichte afdichtingslaag',['Een dampopen folie','Spachtelputz','Een systeemplafond']],['Waarom kiest men in een kantoor vaak een systeemplafond?','Leidingen erboven blijven bereikbaar',['Het isoleert het best tegen kou','Het is verplicht volgens de Wkb','Het is dragend']]]);
addSub('materialen','beton','Betontechnologie',[
 ['Cement','Bindmiddel dat met water reageert en uithardt; het "lijm" in beton.','Portlandcement en hoogovencement zijn de meest gebruikte soorten; hoogovencement heeft een lagere CO₂-uitstoot.'],
 ['Toeslagmateriaal','Zand en grind die samen het grootste deel van het betonvolume vormen.','De grootste korrelafmeting (bijv. 16 of 32 mm) moet passen tussen de wapening.'],
 ['Betonspecie','Vers, nog niet uitgehard beton zoals het uit de mixer komt.','Specie moet binnen een beperkte tijd verwerkt worden, anders begint het al op te stijven.'],
 ['Consistentieklasse','Maat voor hoe vloeibaar betonspecie is, bijvoorbeeld S1 (stijf) tot S5 (zeer vloeibaar).','Wordt gemeten met de zetmaat (slump-test); vloeibaarder beton is makkelijker te storten maar mag niet met extra water verkregen worden.'],
 ['Milieuklasse','Aanduiding van de omgeving waartegen beton bestand moet zijn, zoals XC (carbonatatie), XD (chloride), XS (zeewater), XF (vorst).','Een balkon krijgt vaak meerdere klassen, bijvoorbeeld XC4 en XF; dat bepaalt onder meer de betondekking.'],
 ['Verdichten','Lucht uit verse betonspecie verwijderen met een triller.','Slecht verdicht beton krijgt grindnesten: holtes die zwakker zijn en roest van de wapening veroorzaken.'],
 ['Nabehandeling','Beton na het storten beschermen tegen te snel uitdrogen.','Afdekken met folie of nat houden voorkomt krimpscheuren aan het oppervlak.'],
 ['Kubusdruksterkte','Druksterkte van een betonkubus van 150 mm na 28 dagen.','Het tweede getal in C20/25 is de kubussterkte; met proefkubussen controleer je of het geleverde beton goed is.'],
 ['Krimp','Het kleiner worden van beton tijdens het uitharden en drogen.','Krimp is de reden voor krimpvoegen in grote vloeren en wanden.'],
 ['Bekisting','Tijdelijke mal waarin beton wordt gestort.','Systeembekisting (stalen panelen) is herbruikbaar; tunnelbekisting stort wanden en vloer in één keer.']],
 [['Een aannemer wil beton makkelijker laten vloeien en giet er water bij. Wat is het gevolg?','Het beton wordt zwakker door een hogere water-cementfactor',['Het beton wordt sterker','Er gebeurt niets','Het beton hardt sneller uit']],['Een vloer is op een warme, winderige dag gestort en krijgt kleine scheurtjes. Wat is er waarschijnlijk vergeten?','Nabehandeling (afdekken of nathouden)',['Verdichten met een triller','Wapening aanbrengen','Een milieuklasse kiezen']]]);
addSub('materialen','glasmetaal','Glas, metaal en kunststof',[
 ['HR++-glas','Dubbel glas met een coating en edelgasvulling; U-waarde circa 1,0–1,2 W/m²K.','Was jarenlang de standaard in woningen; nu wordt in nieuwbouw vaak triple glas gekozen.'],
 ['Gelaagd glas','Twee of meer glasplaten met een folie ertussen die de scherven bij elkaar houdt.','Verplicht op plekken waar mensen tegen glas kunnen vallen, zoals in balustrades en lage ramen.'],
 ['Gehard glas','Glas dat door verhitting en snel afkoelen sterker is en in kleine korrels breekt.','Wordt gebruikt in glazen deuren en douchewanden.'],
 ['Zonwerend glas','Glas met een coating die een deel van de zonnewarmte tegenhoudt.','Helpt tegen oververhitting, maar laat ook minder daglicht door dan helder glas.'],
 ['Aluminium','Licht, corrosiebestendig metaal voor kozijnen, gevelbekleding en profielen.','Geleidt warmte sterk; daarom hebben aluminium kozijnen een thermische onderbreking.'],
 ['Zink','Metaal voor goten, hemelwaterafvoeren en dakbedekking.','Zet sterk uit bij warmte, dus lange zinken goten krijgen expansiestukken.'],
 ['Verzinken','Staal beschermen tegen roest met een laag zink, bijvoorbeeld thermisch verzinken in een zinkbad.','Stalen lateien, balkons en hekwerken worden vaak verzinkt en daarna eventueel gecoat (duplex).'],
 ['Corrosie','Aantasting van metaal door een chemische reactie met water en zuurstof, zoals roest.','Bij contact tussen verschillende metalen (bijv. koper en zink) kan galvanische corrosie optreden.'],
 ['PVC','Kunststof voor afvoerbuizen, kozijnen en dakbanen.','Licht en goedkoop; pvc-kozijnen vragen weinig onderhoud.'],
 ['EPDM','Rubberen dakbedekking die als één doek wordt aangebracht.','Gaat lang mee en is veel gebruikt op platte daken van aanbouwen en dakkapellen.']],
 [['Een balustrade van glas bij een vide. Welk glas is hier nodig?','Gelaagd glas',['Enkel floatglas','Zonwerend glas zonder folie','Draadglas zonder eisen']],['Waarom hebben aluminium kozijnen een kunststof onderbreking in het profiel?','Om de koudebrug te onderbreken, want aluminium geleidt warmte sterk',['Om ze lichter te maken','Om corrosie door regen te voorkomen','Voor de kleur']]]);
addSub('bouwmethoden','grondwerk','Grondwerk en bouwput',[
 ['Grondwerk','Het ontgraven, aanvullen en verdichten van grond voor een bouwproject.','Grondwerk komt aan het begin (bouwput, sleuven) en aan het einde (aanvullen, bestrating).'],
 ['Bouwput','Uitgegraven ruimte waarin een kelder of fundering wordt gebouwd.','In slappe grond en bij hoog grondwater moet de bouwput gestut en drooggehouden worden.'],
 ['Damwand','Wand van in elkaar grijpende stalen planken die in de grond wordt getrild of gedrukt.','Houdt grond en water tegen rond een diepe bouwput, vooral in de stad naast bestaande panden.'],
 ['Bemaling','Tijdelijk verlagen van het grondwater met pompen.','Bemaling kan zetting veroorzaken bij buurpanden; daarom wordt dit vaak gemonitord.'],
 ['Grondwaterstand','Hoogte tot waar de grond met water verzadigd is.','Bepaalt of je een kelder waterdicht moet maken en of bemaling nodig is.'],
 ['Zetting','Het inklinken van de grond onder een belasting.','Ongelijke zetting veroorzaakt scheuren in muren; daarom fundeer je op palen in slappe grond.'],
 ['Ophogen','Het aanbrengen van zand om het maaiveld hoger te maken.','Nieuwbouwwijken op klei of veen worden vaak eerst opgehoogd en krijgen tijd om te zetten.'],
 ['Talud','Schuin afgegraven wand van een bouwput of sloot.','Een talud is goedkoper dan een damwand maar heeft meer ruimte nodig.'],
 ['Grondmechanisch onderzoek','Onderzoek naar de opbouw en draagkracht van de bodem, met sonderingen en boringen.','Op basis hiervan kiest de constructeur het funderingstype en de paallengte.'],
 ['Bouwrijp maken','Een terrein geschikt maken voor de bouw: ophogen, riolering en bouwwegen aanleggen.','Gebeurt door de gemeente of ontwikkelaar voordat de woningbouw begint.']],
 [['Naast een oud pand moet een kelder worden gemaakt. Wat is een gangbare manier om de bouwput te begrenzen?','Een damwand, eventueel trillingsvrij aangebracht',['Een talud tot tegen het buurpand','Geen begrenzing nodig','Een systeemplafond']],['Waarom kan bemaling schade geven aan buurpanden?','De grondwaterdaling kan zetting en droogstand van houten palen veroorzaken',['Het water spoelt de gevels schoon','Het verhoogt de grondwaterstand','Het maakt de grond sterker']]]);
addSub('tekeningen','projecties','Tekentechniek en projecties',[
 ['Orthogonale projectie','Tekenwijze waarbij je een object recht van voren, boven of opzij bekijkt, zonder perspectief.','Plattegronden, gevels en doorsneden zijn allemaal orthogonale projecties: je kunt er maten op meten.'],
 ['Aanzicht','Tekening van de buitenkant van een object vanuit één richting, zoals een gevelaanzicht.','Op bouwtekeningen benoem je gevels vaak naar de windrichting: noordgevel, zuidgevel.'],
 ['Isometrie','3D-tekening waarbij de assen onder 120° staan en alle maten op ware grootte blijven.','Handig voor details en leidingschema’s: je ziet het in 3D, maar kunt nog steeds maten afmeten.'],
 ['Perspectief','Tekening met verdwijnpunten, waarbij verre dingen kleiner worden, zoals het oog het ziet.','Gebruikt voor impressies en presentaties; maten zijn er niet uit af te lezen.'],
 ['Verdwijnpunt','Punt op de horizon waar evenwijdige lijnen in een perspectieftekening samenkomen.','Eénpuntsperspectief voor een straat of gang, tweepuntsperspectief voor een gebouw op de hoek.'],
 ['Lijndikte','Dikte van een lijn op tekening, die aangeeft hoe belangrijk een lijn is.','Doorsneden lijnen (wat je doorsnijdt) teken je dik, aanzichtlijnen dun.'],
 ['Schets','Snelle tekening uit de hand om een idee vast te leggen.','In de ontwerpfase test je met schetsen snel varianten voordat je gaat uitwerken.'],
 ['Tekenblad en formaat','Standaardformaten van tekenpapier: A0 is 1 m², A1 is de helft, enzovoort.','Bouwtekeningen worden vaak op A1 of A2 geplot, details op A3.'],
 ['Doorsnedelijn','Lijn op de plattegrond die aangeeft waar een doorsnede is genomen, met pijlen voor de kijkrichting.','Doorsneden worden genummerd (A-A, B-B) zodat je ze op de plattegrond terugvindt.'],
 ['Detailverwijzing','Symbool op een tekening dat verwijst naar een uitgewerkt detail op een ander blad.','Zo blijft de hoofdtekening overzichtelijk en staat de uitwerking op een grotere schaal.']],
 [['Je wilt een klant een sfeerbeeld van het ontwerp geven. Welke tekenwijze past het best?','Perspectief',['Orthogonale doorsnede','Situatietekening 1:1000','Leidingschema']],['Op welke tekening kun je maten direct opmeten?','Een orthogonale projectie zoals een plattegrond',['Een perspectieftekening','Een moodboard','Een foto']]]);
addSub('architectuur','presenteren','Ontwerpen en presenteren',[
 ['Concept','De centrale ontwerpgedachte die alle keuzes in een ontwerp verbindt.','Een sterk concept kun je in één zin of één schets uitleggen.'],
 ['Referentieproject','Bestaand gebouw dat als inspiratie of vergelijking dient.','Met referenties laat je zien dat een idee al ergens werkt.'],
 ['Moodboard','Collage van beelden, kleuren en materialen die de sfeer van een ontwerp laat zien.','Handig in gesprek met een opdrachtgever om te checken of je dezelfde sfeer voor ogen hebt.'],
 ['Variantenstudie','Het uitwerken en vergelijken van meerdere ontwerpoplossingen.','Je laat de opdrachtgever kiezen of je onderbouwt zelf waarom één variant beter is.'],
 ['Multicriteria-analyse','Methode om varianten te vergelijken op meerdere criteria met weegfactoren.','Bijvoorbeeld: kosten (30%), duurzaamheid (40%), uitstraling (30%) en per variant scores geven.'],
 ['Render','Computergegenereerde, fotorealistische afbeelding van een ontwerp.','Wordt gemaakt vanuit een 3D-model en vaak gebruikt voor verkoop en presentatie.'],
 ['Presentatiepanel','Groot vel (poster) met de belangrijkste tekeningen, beelden en uitleg van een ontwerp.','Een goed panel heeft een duidelijke leesvolgorde en één hoofdbeeld.'],
 ['Ontwerpcyclus','Herhalend proces van analyseren, ontwerpen, toetsen en verbeteren.','Ontwerpen is nooit in één keer klaar: elke ronde wordt het ontwerp scherper.'],
 ['Functieschema','Schema met bollen of vlakken dat de ruimten en hun onderlinge relaties weergeeft.','Een eerste stap van programma van eisen naar plattegrond.'],
 ['Locatieanalyse','Onderzoek naar de plek: zon, wind, geluid, uitzicht, routes, omgeving.','Bepaalt bijvoorbeeld waar de woonkamer (zon) en de entree (straat) komen.']],
 [['Je moet drie gevelvarianten objectief vergelijken op kosten, duurzaamheid en uitstraling. Welke methode past?','Een multicriteria-analyse',['Een render','Een sondering','Een strokenplanning']],['Waar begin je het best als je de plattegrond van een woning gaat ontwerpen?','Met een functieschema en een locatieanalyse',['Met de kleur van de voordeur','Met een render','Met de bestektekening']]]);
addSub('duurzaam','klimaat','Klimaatadaptief en natuurinclusief',[
 ['Klimaatadaptief bouwen','Bouwen zodat een gebouw en zijn omgeving bestand zijn tegen hitte, droogte en hevige regen.','Denk aan groene daken, waterberging, minder verharding en schaduw.'],
 ['Natuurinclusief bouwen','Bouwen met ruimte voor planten en dieren, zoals nestkasten in de gevel en groene daken.','Veel gemeenten stellen hier inmiddels eisen aan bij nieuwbouw.'],
 ['Hittestress','Gezondheidsklachten en ongemak door langdurige hitte, vooral in steden.','Verharde, stenige wijken worden warmer (hitte-eiland); groen en water koelen.'],
 ['Hitte-eilandeffect','Het verschijnsel dat steden warmer zijn dan het omringende platteland.','Komt door verharding, weinig groen en warmte die gebouwen ’s nachts afgeven.'],
 ['Waterberging','Tijdelijke opslag van regenwater, bijvoorbeeld in een wadi, krat of op een retentiedak.','Voorkomt dat het riool overstroomt bij een hevige bui.'],
 ['Wadi','Verlaagde, begroeide strook waarin regenwater wordt opgevangen en langzaam de grond in zakt.','Een veelgebruikte oplossing in nieuwbouwwijken.'],
 ['Retentiedak','Plat dak dat regenwater tijdelijk vasthoudt en vertraagd afvoert.','Vaak gecombineerd met een groen dak; het water koelt ook het dak.'],
 ['Groene gevel','Gevel begroeid met klimplanten of met plantenbakken.','Koelt in de zomer, vangt fijnstof en biedt plek voor insecten en vogels.'],
 ['Neststenen','Inbouwstenen in de gevel waarin vogels of vleermuizen kunnen nestelen.','Gierzwaluwen en huismussen zijn afhankelijk van gebouwen om te nestelen.'],
 ['Verharding','Bestrating en andere ondoorlatende oppervlakken.','Minder verharding betekent dat meer regenwater de grond in kan zakken.']],
 [['Na een hevige bui staat de straat van een nieuwbouwwijk blank. Welke maatregel helpt?','Waterberging zoals wadi’s en minder verharding',['Een extra spouwmuur','Triple glas','Een damwand']],['Welke maatregel helpt zowel tegen hittestress als voor de natuur?','Een groen dak of groene gevel',['Een donkere dakbedekking','Meer bestrating','Een zwaardere fundering']]]);
addSub('uitvoering','begroting','Begroting en kosten',[
 ['Begroting','Overzicht van alle verwachte kosten van een project, per post.','Wordt steeds nauwkeuriger naarmate het ontwerp verder is uitgewerkt.'],
 ['Directe kosten','Kosten die direct aan het werk toe te rekenen zijn: materiaal, arbeid, materieel, onderaannemers.','Deze staan per post in de begroting.'],
 ['Indirecte kosten','Kosten die niet aan één post hangen, zoals bouwplaatsvoorzieningen en uitvoering.','Worden vaak als "staartkosten" onderaan de begroting toegevoegd.'],
 ['AK (algemene kosten)','Opslag voor de kosten van het bedrijf zelf: kantoor, directie, administratie.','Meestal een percentage van de bouwkosten, bijvoorbeeld 6–8%.'],
 ['W&R (winst en risico)','Opslag voor de winst van de aannemer en onvoorziene risico’s.','Meestal een paar procent; bij krappe markten lager.'],
 ['Aanneemsom','De totale prijs waarvoor de aannemer het werk aanneemt.','Ligt vast in het contract; wijzigingen worden verrekend als meer- of minderwerk.'],
 ['Eenheidsprijs','Prijs per eenheid, bijvoorbeeld per m² metselwerk of per m³ beton.','Hoeveelheid × eenheidsprijs = kosten van een post.'],
 ['Kengetal','Gemiddelde prijs per m² of per woning uit eerdere projecten.','Gebruikt in de vroege fasen, als er nog geen tekeningen zijn.'],
 ['Levensduurkosten (LCC)','Alle kosten van een gebouw over de hele levensduur: bouw, energie, onderhoud en sloop.','Een duurdere maar zuinigere oplossing kan over de levensduur goedkoper zijn.'],
 ['Onvoorzien','Post in de begroting voor kosten die je nu nog niet kunt voorzien.','In een vroege fase groter (bijv. 10%) dan vlak voor de uitvoering.']],
 [['Een opdrachtgever wil al bij het eerste idee weten wat een woning van 120 m² ongeveer kost. Wat gebruik je?','Een kengetal per m²',['Een gedetailleerde begroting met normuren','De aanneemsom van de buren','De LCC na 50 jaar']],['Waarom kan duurzame installatietechniek met hogere bouwkosten toch voordeliger zijn?','De levensduurkosten (energie en onderhoud) zijn lager',['De aanneemsom wordt altijd lager','Er hoeft geen btw betaald te worden','De AK-opslag vervalt']]]);

// ---- nieuwe hoofdstukken ----
TERMS.bestaand={};TERMS.stedenbouw={};
addSub('bestaand','onderhoud','Onderhoud en beheer',[
 ['Meerjarenonderhoudsplan (MJOP)','Planning van het onderhoud van een gebouw voor de komende jaren, met kosten per jaar.','VvE’s en corporaties gebruiken een MJOP om te bepalen hoeveel ze per jaar moeten reserveren.'],
 ['NEN 2767','Norm voor het objectief meten van de conditie van gebouwdelen, op een schaal van 1 tot 6.','Score 1 is als nieuw, score 6 is de slechtst mogelijke staat.'],
 ['Conditiemeting','Inspectie waarbij elk bouwdeel een conditiescore krijgt op basis van de gebreken.','Vormt de basis voor een MJOP en voor afspraken over het onderhoudsniveau.'],
 ['Planmatig onderhoud','Onderhoud dat volgens een vaste cyclus wordt uitgevoerd, zoals elke 6 jaar schilderen.','Voorkomt dat kleine gebreken uitgroeien tot grote schade.'],
 ['Correctief onderhoud','Onderhoud pas als er iets kapot is.','Goedkoop op korte termijn, maar vaak duurder door gevolgschade.'],
 ['Conditiegestuurd onderhoud','Onderhoud op basis van de gemeten conditie in plaats van een vaste termijn.','Je schildert pas als de conditie onder een afgesproken niveau zakt.'],
 ['Onderhoudscyclus','Het aantal jaren tussen twee onderhoudsbeurten van een bouwdeel.','Bijvoorbeeld: buitenschilderwerk 6–8 jaar, dakbedekking 20–25 jaar.'],
 ['Levensduur','Hoe lang een bouwdeel meegaat voordat het vervangen moet worden.','Technische levensduur (kapot) en economische levensduur (niet meer rendabel) kunnen verschillen.'],
 ['Beheerder','Persoon of organisatie die het gebouw na oplevering onderhoudt en exploiteert.','Bij woningcorporaties en kantoren is dat vaak een vastgoedbeheerder.'],
 ['Opleverdossier','Dossier met tekeningen, gebruikte materialen en onderhoudsinstructies dat bij oplevering wordt overgedragen.','Onder de Wkb is het consumentendossier verplicht bij nieuwbouw.']],
 [['Een VvE wil weten hoeveel geld ze de komende 10 jaar moet reserveren voor onderhoud. Wat hebben ze nodig?','Een meerjarenonderhoudsplan (MJOP)',['Een sondering','Een V&G-plan','Een moodboard']],['Een bouwdeel krijgt bij een NEN 2767-inspectie score 1. Wat betekent dat?','Het is in uitstekende staat (als nieuw)',['Het moet direct vervangen worden','Er is ernstige schade','Het is niet geïnspecteerd']]]);
addSub('bestaand','renovatie','Renovatie en transformatie',[
 ['Renovatie','Het grondig vernieuwen en verbeteren van een bestaand gebouw.','Bijvoorbeeld een jaren-70-woning isoleren, nieuwe kozijnen en installaties geven.'],
 ['Transformatie','Een gebouw een andere functie geven, zoals een kantoor ombouwen tot woningen.','Bij transformatie moet het gebouw voldoen aan de eisen van de nieuwe functie.'],
 ['Restauratie','Het herstellen van een (historisch) gebouw in zijn oorspronkelijke staat.','Gebeurt vooral bij monumenten, met traditionele materialen en technieken.'],
 ['Herbestemming','Een leegstaand gebouw met een nieuwe bestemming hergebruiken.','Kerken, fabrieken en scholen krijgen zo een nieuw leven.'],
 ['Rijksmonument','Gebouw dat vanwege cultuurhistorische waarde door het Rijk wordt beschermd.','Voor wijzigingen is vaak een vergunning nodig en er gelden extra eisen.'],
 ['Rechtens verkregen niveau','Het kwaliteitsniveau dat een bestaand gebouw legaal heeft, ook als dat onder de nieuwbouweisen ligt.','Bij verbouw hoef je vaak niet terug naar nieuwbouwniveau, maar niet onder dit niveau te komen.'],
 ['Bouwhistorisch onderzoek','Onderzoek naar de geschiedenis, bouwfasen en waarden van een bestaand gebouw.','Helpt bepalen wat behouden moet blijven bij een verbouwing.'],
 ['Asbest','Vezelig mineraal dat vroeger veel in bouwmaterialen zat en bij inademing kanker kan veroorzaken.','Sinds 1993 verboden; vóór een renovatie of sloop is een asbestinventarisatie verplicht.'],
 ['Na-isolatie','Een bestaand gebouw achteraf isoleren, bijvoorbeeld de spouw vullen of de vloer isoleren.','Spouwmuurisolatie met korrels of schuim is een snelle maatregel bij woningen uit 1920–1975.'],
 ['Slopen en circulair demonteren','Een gebouw afbreken, bij voorkeur zo dat materialen hergebruikt kunnen worden.','Bij circulair slopen worden eerst onderdelen geoogst voordat de rest wordt afgebroken.']],
 [['Een kantoorgebouw wordt omgebouwd tot appartementen. Hoe heet dat?','Transformatie',['Restauratie','Correctief onderhoud','Nieuwbouw']],['Een woning uit 1975 wordt verbouwd. Wat moet je vóór de sloopwerkzaamheden laten doen?','Een asbestinventarisatie',['Een sondering','Een NEN 2580-meting','Een windtunneltest']]]);
addSub('bestaand','gebreken','Bouwgebreken herkennen',[
 ['Betonrot','Aantasting van gewapend beton door roestende wapening die het beton wegdrukt.','Herken je aan afgebrokkeld beton en roestbruine wapening, vaak bij balkons en galerijen.'],
 ['Houtrot','Aantasting van hout door schimmels bij langdurig hoge vochtigheid.','Vooral aan de onderkant van kozijnen en bij slecht onderhouden schilderwerk.'],
 ['Paalrot','Aantasting van houten funderingspalen als het grondwater daalt en ze droog komen te staan.','Leidt tot verzakkingen en scheuren; een groot probleem in oude binnensteden.'],
 ['Zettingsscheur','Scheur in metselwerk door ongelijke zakking van de fundering.','Vaak schuin en trapvormig door de voegen, wijder aan één kant.'],
 ['Krimpscheur','Fijne scheur door krimp van een materiaal tijdens het drogen.','Meestal onschuldig, bijvoorbeeld in stucwerk of een dekvloer.'],
 ['Scheefstand','Een gebouw of muur die niet meer loodrecht staat.','Kan duiden op funderingsproblemen; wordt gemeten met een waterpas of laser.'],
 ['Vochtplek','Verkleuring of natte plek in een wand of plafond.','Zoek de oorzaak: lekkage, condensatie, doorslaand of optrekkend vocht.'],
 ['Uitbloei','Witte zoutafzetting op metselwerk door water dat zouten naar buiten transporteert.','Vaak bij nieuw metselwerk en meestal onschuldig; verdwijnt na een tijd.'],
 ['Vorstschade','Schade aan steenachtige materialen doordat water in poriën bevriest en uitzet.','Afspringende stukjes baksteen of voegwerk na een strenge winter.'],
 ['Lekkage','Water dat op een ongewenste plek binnenkomt, bijvoorbeeld via dak, kozijn of leiding.','Bij een plat dak zit de oorzaak vaak niet recht boven de vochtplek.']],
 [['Bij een galerijflat brokkelt het beton van de balkonranden af en je ziet roestbruine staven. Wat is dit?','Betonrot',['Uitbloei','Paalrot','Krimpscheur']],['Een gevel heeft een schuine, trapvormige scheur door de voegen die naar boven wijder wordt. Wat is de meest waarschijnlijke oorzaak?','Ongelijke zetting van de fundering',['Krimp van de verf','Te veel isolatie','Condensatie']]]);
addSub('stedenbouw','stad','Stedenbouwkundige begrippen',[
 ['Stedenbouw','Het ontwerpen en inrichten van steden, wijken en de openbare ruimte.','Stedenbouwkundigen bepalen waar gebouwen, straten, groen en water komen.'],
 ['Openbare ruimte','Alle ruimte die vrij toegankelijk is: straten, pleinen, parken.','Een goed ingerichte openbare ruimte maakt een wijk leefbaar en veilig.'],
 ['Verkaveling','De indeling van een gebied in kavels, straten en blokken.','Een strokenverkaveling geeft rijen, een blokverkaveling gesloten bouwblokken.'],
 ['Bouwblok','Groep gebouwen omringd door straten.','Een gesloten bouwblok heeft een binnenterrein met tuinen of een binnenhof.'],
 ['Kavel','Stuk grond waarop één gebouw of woning staat.','Bij een vrije kavel mag de koper zelf een woning laten ontwerpen binnen de regels.'],
 ['Bouwvlak','Deel van een kavel waarbinnen volgens het omgevingsplan gebouwd mag worden.','Buiten het bouwvlak mag alleen beperkt gebouwd worden, zoals een schuur.'],
 ['Functiemenging','Het combineren van wonen, werken en voorzieningen in één gebied.','Maakt wijken levendiger en verkort afstanden; tegenhanger van monofunctionele wijken.'],
 ['Mobiliteit','Hoe mensen zich verplaatsen: lopen, fiets, ov, auto.','Parkeernormen bepalen hoeveel parkeerplaatsen een nieuw project moet hebben.'],
 ['Parkeernorm','Aantal parkeerplaatsen dat per woning of per m² moet worden aangelegd.','Staat in het omgevingsplan of gemeentelijk beleid; lager in centra met goed ov.'],
 ['Groenstructuur','Samenhangend netwerk van parken, bomen en groenstroken in een stad.','Belangrijk voor klimaatadaptatie, biodiversiteit en recreatie.']],
 [['In een nieuwe wijk komen woningen, kantoren en winkels door elkaar. Hoe heet dat principe?','Functiemenging',['Verkaveling in stroken','Monofunctionaliteit','Herbestemming']],['Waar zie je binnen welk deel van een kavel je mag bouwen?','In het bouwvlak in het omgevingsplan',['In het bestek','In de UAV 2012','In NEN 2767']]]);
addSub('stedenbouw','gebied','Dichtheid en kengetallen',[
 ['Woningdichtheid','Aantal woningen per hectare.','Een rijtjeswijk heeft circa 30–40 woningen per hectare; een binnenstad veel meer.'],
 ['FSI (bebouwingsintensiteit)','Totaal bruto vloeroppervlak gedeeld door het oppervlak van het terrein.','Een FSI van 2 betekent twee keer zoveel vloeroppervlak als grondoppervlak.'],
 ['GSI (bebouwingsgraad)','Bebouwd grondoppervlak gedeeld door het oppervlak van het terrein.','Ligt tussen 0 en 1; FSI ÷ GSI geeft het gemiddelde aantal bouwlagen.'],
 ['Hectare','Oppervlakte van 100 × 100 m = 10 000 m².','Stedenbouwkundige kengetallen worden vaak per hectare uitgedrukt.'],
 ['Bruto en netto plangebied','Bruto is het hele gebied inclusief wegen en groen; netto alleen de kavels.','Dichtheden zijn bruto veel lager dan netto; zeg dus altijd welke je bedoelt.'],
 ['Bouwhoogte','Hoogte van een gebouw, gemeten vanaf peil tot het hoogste punt.','Het omgevingsplan geeft vaak een maximale bouwhoogte en goothoogte.'],
 ['Goothoogte','Hoogte van de dakgoot of dakrand boven peil.','Bepaalt mede het straatbeeld; staat vaak naast de bouwhoogte in het omgevingsplan.'],
 ['Erfgrens','Grens tussen twee kavels of tussen een kavel en de openbare ruimte.','Dicht bij de erfgrens gelden extra regels, bijvoorbeeld voor ramen (burenrecht) en brandoverslag.'],
 ['Zonlichttoetreding','Hoeveel direct zonlicht gevels en buitenruimte krijgen.','Hoge gebouwen kunnen schaduw werpen op buren; dat wordt met bezonningsstudies onderzocht.'],
 ['Bezonningsstudie','Onderzoek naar schaduwwerking van een gebouw op verschillende momenten van het jaar.','Wordt vaak gevraagd bij hoogbouw in bestaande wijken.']],
 [['Een terrein van 1 ha krijgt gebouwen met samen 15 000 m² BVO. Wat is de FSI?','1,5',['15','0,15','150']],['Een plan heeft FSI 2,4 en GSI 0,4. Hoeveel bouwlagen zijn er gemiddeld?','6',['2,8','0,96','10']]]);

// ---- rekenen: stedenbouw ----
function genDichtheid(l){
  if(l===1){const ha=rnd(R(15,60)/10,1),n=R(60,400);const v=n/ha;return {q:`Een woonwijk van <b>${N(ha)} ha</b> krijgt <b>${n}</b> woningen. Wat is de woningdichtheid?`,type:'num',answer:v,dec:1,unit:'won/ha',hint:'Woningen gedeeld door hectare.',sol:steps([`${n} / ${N(ha)} = ${N(v,2)} woningen per hectare`])}}
  if(l===2){const A=R(20,80)*100,bvo=R(30,150)*100;const v=bvo/A;return {q:`Een terrein van <b>${N(A)} m²</b> wordt bebouwd met in totaal <b>${N(bvo)} m²</b> BVO. Wat is de FSI?`,type:'num',answer:v,dec:2,unit:'',hint:'FSI = totaal vloeroppervlak / terreinoppervlak.',sol:steps([`FSI = ${N(bvo)} / ${N(A)} = ${N(v,2)}`])}}
  const A=R(40,120)*100,gsi=pick([0.25,0.3,0.35,0.4,0.5]),lagen=R(3,8);const bebouwd=A*gsi,bvo=bebouwd*lagen;const fsi=bvo/A;
  return {q:`Een kavel van <b>${N(A)} m²</b> heeft een bebouwingsgraad (GSI) van <b>${N(gsi)}</b>. Het gebouw krijgt <b>${lagen}</b> bouwlagen. Wat wordt de FSI?`,type:'num',answer:fsi,dec:2,unit:'',hint:'Bebouwd oppervlak = GSI × kavel; BVO = bebouwd × lagen; FSI = BVO / kavel. Of direct: FSI = GSI × lagen.',sol:steps([`bebouwd = ${N(gsi)} × ${N(A)} = ${N(bebouwd)} m²`,`BVO = ${N(bebouwd)} × ${lagen} = ${N(bvo)} m²`,`FSI = ${N(bvo)} / ${N(A)} = ${N(fsi,2)} (= GSI × lagen)`])};
}
// ---- rekenen: onderhoud ----
function genOnderhoud(l){
  if(l===1){const k=R(30,120)*100,c=pick([5,6,7,8,10]);const v=k/c;return {q:`Het buitenschilderwerk van een blok woningen kost <b>€ ${N(k)}</b> per beurt en gebeurt elke <b>${c}</b> jaar. Hoeveel moet er per jaar gereserveerd worden?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Kosten per beurt gedeeld door de cyclus.',sol:steps([`${N(k)} / ${c} = € ${N(v,2)} per jaar`])}}
  if(l===2){const items=[['schilderwerk',R(8,20)*1000,pick([6,7,8])],['dakbedekking',R(20,50)*1000,pick([20,25])],['kozijnen',R(40,90)*1000,pick([30,40])]];const v=items.reduce((a,x)=>a+x[1]/x[2],0);
    return {q:`Een MJOP bevat: ${items.map(x=>`${x[0]} € ${N(x[1])} elke ${x[2]} jaar`).join('; ')}. Hoeveel moet er gemiddeld per jaar gereserveerd worden?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Bereken per onderdeel kosten / cyclus en tel op.',sol:steps([...items.map(x=>`${x[0]}: ${N(x[1])} / ${x[2]} = ${N(x[1]/x[2],2)}`),`totaal € ${N(v,2)} per jaar`])}}
  const k=R(20,60)*1000,c=pick([20,25,30]),n=R(20,80);const v=k/c/n/12;return {q:`De dakbedekking van een complex met <b>${n}</b> appartementen kost <b>€ ${N(k)}</b> en gaat <b>${c}</b> jaar mee. Hoeveel moet elke eigenaar per maand reserveren voor alleen het dak?`,type:'num',answer:v,dec:2,unit:'€',unitPre:true,hint:'Per jaar = kosten / levensduur; per eigenaar per maand = per jaar / eigenaren / 12.',sol:steps([`per jaar: ${N(k)} / ${c} = € ${N(k/c,2)}`,`per eigenaar per maand: ${N(k/c,2)} / ${n} / 12 = € ${N(v,2)}`])};
}

// ================= TOELICHTING BIJ BEGRIPPEN (in de praktijk) =================
const TX={
// bouwdelen
'Fundering':'In Nederland meestal op palen in het westen en op staal (direct op zand) in het oosten en zuiden. Een goede fundering voorkomt scheuren en scheefstand.',
'Funderingsbalk':'Vaak prefab geleverd en op de paalkoppen gelegd; de muren van de woning worden er direct op gemetseld.',
'Poer':'Onder een kolom of op de kruising van funderingsbalken; bij paalfunderingen verbindt een poer meerdere palen.',
'Heipaal':'Prefab betonpalen worden geheid (lawaai, trillingen); in de stad kiest men vaak voor geschroefde of geboorde palen.',
'Kruipruimte':'Moet geventileerd worden om vocht te voorkomen; hier lopen vaak de riolering en waterleidingen.',
'Begane grondvloer':'Een geïsoleerde systeemvloer (bijv. met EPS-tussenstukken) ligt op de funderingsbalken boven de kruipruimte.',
'Dekvloer':'Wordt zwevend of hechtend aangebracht, ongeveer 50–70 mm dik; vloerverwarmingsleidingen liggen erin.',
'Peil':'Op tekeningen staat P = 0 of ±0; alle hoogtes worden hiervan afgemeten, ook de fundering (minpeilen).',
'Maaiveld':'De begane grondvloer ligt meestal enkele centimeters tot een paar decimeter boven maaiveld om regenwater buiten te houden.',
'Kanaalplaatvloer':'Overspant 6 tot 12 meter zonder tussensteunen en wordt met een kraan gelegd; veel gebruikt in woning- en utiliteitsbouw.',
'Spouwmuur':'Sinds circa 1920 in Nederland gangbaar; tegenwoordig is de spouw grotendeels gevuld met isolatie en blijft er een luchtspouw van ca. 40 mm.',
'Binnenblad':'Draagt de vloeren en het dak; vaak kalksandsteen of beton, 100–150 mm dik.',
'Buitenblad':'Meestal halfsteens baksteen (ca. 100 mm). Het houdt regen tegen maar wordt nooit helemaal waterdicht verondersteld.',
'Spouwanker':'RVS-draad die beide bladen koppelt, ongeveer 4 per m², zodat het buitenblad niet bij wind wegwaait.',
'Luchtspouw':'Water dat door het buitenblad dringt, loopt in de spouw naar beneden en wordt via open stootvoegen afgevoerd.',
'Latei':'Van staal, beton of metselwerk op een stalen strip; boven de latei hoort een waterkering in de spouw.',
'Open stootvoeg':'Onderin het buitenblad om water af te voeren en bovenin om de spouw te ventileren, ongeveer elke meter.',
'Dilatatievoeg':'In metselwerk ongeveer elke 8–12 m, en waar gebouwdelen anders kunnen bewegen, zoals tussen hoog- en laagbouw.',
'Borstwering':'Het muurdeel tussen vloer en onderkant raam; bij een lage borstwering is vaak gelaagd glas of een hek nodig.',
'Gevelaanzicht':'Hierop zie je materialen, kozijnindeling en hoogtes van de gevel; benoemd naar windrichting of straat.',
'Nok':'Bij een zadeldak ligt hier vaak een nokvorst of nokprofiel dat het dak afsluit en ventileert.',
'Dakvoet':'Hier sluit het dak aan op de gevel, met de goot; een kwetsbaar detail voor lekkage en koudebruggen.',
'Muurplaat':'Houten balk bovenop het binnenblad waarop de sporen of dakelementen rusten; verdeelt de belasting.',
'Gording':'Horizontale balk tussen de spanten of muren die de dakplaten of sporen ondersteunt.',
'Spant':'Driehoekige dragende constructie van balken die een dak over een grotere breedte draagt.',
'Dakbeschot':'Planken of platen op de sporen; in moderne woningen vaak vervangen door geïsoleerde prefab dakelementen.',
'Panlat':'Horizontale lat waar de dakpannen aan haken; de afstand hangt af van het pannentype.',
'Tengel':'Verticale lat tussen dakbeschot en panlat, waardoor water en lucht onder de pannen weg kunnen.',
'Boeideel':'Plank die de dakrand afwerkt; moet regelmatig geschilderd worden of is van onderhoudsarm materiaal.',
'Hemelwaterafvoer':'Voert regenwater van de goot naar het riool of een infiltratievoorziening; ook wel regenpijp.',
'Kozijn':'Van hout, kunststof of aluminium; moet water- en luchtdicht aansluiten op de gevel.',
'Stijl':'De verticale delen van een kozijn; tussenstijlen verdelen een kozijn in vakken.',
'Onderdorpel':'Vaak van hardsteen of kunststeen bij deuren; moet water naar buiten afvoeren.',
'Bovendorpel':'Hierboven komt een waterkering die water uit de spouw naar buiten leidt.',
'Tussendorpel':'Verdeelt een kozijn in een bovenlicht en een onderste deel.',
'Draaiend deel':'Een raam of deur die open kan; draai-kiepramen zijn in Nederland heel gangbaar.',
'Glaslat':'Houdt het glas op zijn plek in het kozijn en wordt aan de binnenzijde geplaatst tegen inbraak.',
'Waterslag':'Steekt minstens enkele centimeters buiten de gevel uit met een druiprand, zodat water niet langs de muur loopt.',
'Negge':'De diepte waarmee een kozijn terugligt in de gevel; een diepe negge geeft schaduw en beschermt het kozijn.',
'Triple glas':'U-waarde circa 0,5–0,8 W/m²K; zwaarder dan dubbel glas, dus kozijn en beslag moeten dat aankunnen.',
// tekeningen
'Situatietekening':'Toont het gebouw op de kavel met erfgrenzen, noordpijl, peil t.o.v. NAP en aansluiting op de straat.',
'Plattegrond':'Een horizontale doorsnede op ongeveer 1 m boven de vloer; per bouwlaag één plattegrond.',
'Doorsnede':'Laat de opbouw van vloeren, dak en hoogtes zien; essentieel om peilmaten te controleren.',
'Detail':'Op schaal 1:5 of 1:10 met alle lagen, materialen en bevestigingen van een aansluiting.',
'Bestektekening':'Hoort bij het bestek en wordt gebruikt voor de aanbesteding en prijsvorming.',
'Werktekening':'Gemaakt door aannemer of leverancier; bevat alle maten om een onderdeel te kunnen maken of plaatsen.',
'Stramien':'Kolommen en dragende wanden staan op de stramienlijnen, aangeduid met cijfers en letters (1, 2, 3 / A, B, C).',
'Arcering':'Elk materiaal heeft een eigen arcering, zodat je in een doorsnede direct ziet wat beton, isolatie of metselwerk is.',
'Renvooi':'Een legenda op de tekening die uitlegt welke arceringen, symbolen en afkortingen zijn gebruikt.',
'Maatlijn':'Met hulplijnen en maatpijlen of schuine streepjes; maten staan in mm zonder eenheid.',
// materialen
'Gewapend beton':'Het meest gebruikte constructiemateriaal in Nederland voor vloeren, wanden en funderingen.',
'Wapening':'Betonstaal B500 (vloeigrens 500 N/mm²); staven en netten worden volgens wapeningstekeningen gelegd.',
'Betondekking':'Binnen meestal 20–30 mm, buiten 30–40 mm of meer; te weinig dekking leidt tot betonrot.',
'Sterkteklasse C20/25':'In de woningbouw is C20/25 of C30/37 gangbaar; voorgespannen elementen hebben vaak hogere klassen.',
'Prefab beton':'Snel te monteren en goede kwaliteit door fabrieksomstandigheden, maar transport en kraan bepalen de maximale grootte.',
'In het werk gestort':'Flexibel in vorm en monoliet (één geheel), maar gevoelig voor weer en vraagt bekisting en uithardingstijd.',
'Voorgespannen beton':'Kanaalplaten en lange liggers zijn vaak voorgespannen, waardoor ze slanker kunnen zijn.',
'S235':'Het meest gebruikte constructiestaal; S355 is sterker en wordt bij zwaardere constructies gebruikt.',
'HE-profiel':'Varianten HEA (lichter), HEB en HEM (zwaarder); veel gebruikt als kolom of zware ligger.',
'IPE-profiel':'Efficiënt op buiging om de sterke as; bijvoorbeeld IPE 200 als stalen latei of vloerligger.',
'Naaldhout':'Vuren en grenen zijn de meest gebruikte constructiehoutsoorten in Nederland.',
'Loofhout':'Hardhout zoals eiken of meranti is duurzamer buiten en wordt gebruikt voor kozijnen en drempels.',
'Sterkteklasse C24':'De standaard voor constructief naaldhout in balken en sporen.',
'Krimpen en zwellen':'Hout werkt vooral dwars op de vezel; daarom moet je hout laten acclimatiseren en ruimte geven.',
'Houtvochtgehalte':'Constructiehout binnen moet onder ca. 20% zitten; hoger geeft kans op schimmels en vervorming.',
'Gelamineerd hout':'Lamellen verlijmd tot grote balken (glulam); daarmee kun je grote overspanningen maken.',
'CLT':'Kruislaaghout: kruislings verlijmde houten platen voor wanden en vloeren, ook voor hogere gebouwen.',
'Houtskeletbouw':'Licht, snel en goed te isoleren; veel gebruikt voor aanbouwen, eengezinswoningen en optoppingen.',
'FSC':'Keurmerk voor hout uit verantwoord beheerd bos; ook PEFC is een veelgebruikt keurmerk.',
'Verduurzamen':'Bijvoorbeeld met impregneren of thermisch modificeren, zodat goedkoop naaldhout buiten langer meegaat.',
'Baksteen':'Gebakken klei, in Nederland het traditionele gevelmateriaal; verkrijgbaar in vele kleuren en formaten (waalformaat, dikformaat).',
'Kalkzandsteen':'Wit, maatvast en sterk; vaak als lijmblokken of elementen voor dragend binnenblad en woningscheidende wanden.',
'Cellenbeton':'Licht en goed isolerend, makkelijk te zagen; minder sterk en geluidsisolerend dan kalkzandsteen.',
'Mortel':'Mengsel van zand, cement (en kalk) en water; de sterkte moet passen bij de steen.',
'Halfsteens muur':'Ongeveer 100 mm dik (een halve steen); het buitenblad van een spouwmuur is meestal halfsteens.',
'Metselverband':'Bijvoorbeeld halfsteens verband, kruisverband of wildverband; zorgt dat stootvoegen niet boven elkaar liggen.',
'Lijmwerk':'Dunne lijmlaag van enkele millimeters in plaats van een dikke mortelvoeg; sneller en maatvaster.',
'Voegwerk':'Bepaalt het uiterlijk van een gevel en beschermt tegen water; een terugliggende voeg geeft meer schaduw.',
'Minerale wol':'Glaswol of steenwol, vaak in de spouw en in daken; ook goed tegen geluid en brand.',
'PIR':'Heel dun voor een hoge Rc, daarom populair op daken en in vloeren waar weinig ruimte is.',
'EPS':'Goedkoop en licht; veel toegepast in systeemvloeren en als gevelisolatie onder pleisterwerk.',
'XPS':'Neemt weinig water op, daarom geschikt onder de grond en op omgekeerde daken.',
'Dampremmende folie':'Moet naadloos en luchtdicht worden aangebracht, met afgeplakte naden en aansluitingen.',
'Waterkerende dampopen folie':'Wordt bijvoorbeeld bij houtskeletbouw aan de buitenzijde toegepast, achter de gevelbekleding.',
'Koudebrug':'Bijvoorbeeld een betonnen balkon dat doorloopt van binnen naar buiten; oplossing: thermische onderbreking.',
'Lambda (λ)':'Goede isolatie heeft λ ≈ 0,020–0,040 W/mK; beton ≈ 2, staal ≈ 50.',
// bouwmethoden
'Fundering op staal':'"Staal" betekent hier niet het metaal, maar een vaste zandlaag waar direct op gefundeerd wordt.',
'Strokenfundering':'Doorgaande betonnen strook onder dragende muren; toegepast als het draagkrachtige zand ondiep ligt.',
'Plaatfundering':'Eén doorgaande betonplaat onder het hele gebouw; verdeelt de belasting over een groot oppervlak.',
'Paalfundering':'Palen tot in de draagkrachtige zandlaag, in West-Nederland vaak 10–20 m of dieper.',
'Prefab betonpaal':'Vierkante palen van circa 220–450 mm die in de fabriek gemaakt en op de bouw geheid worden.',
'Schroefpaal':'Trillingsarm aangebracht, daardoor geschikt naast bestaande gebouwen.',
'Sondering':'Een conus wordt de grond in gedrukt en meet de weerstand; uit de grafiek lees je de zandlagen af.',
'Negatieve kleef':'Zakkende klei- en veenlagen trekken aan de paal en belasten hem extra; constructeurs rekenen dit mee.',
'Stapelbouw':'Traditioneel metselen of lijmen van stenen en blokken; flexibel maar arbeidsintensief.',
'Gietbouw':'Wanden en vloeren worden met bekisting ter plaatse gestort; gangbaar bij woningbouw in grote series.',
'Tunnelbouw':'Een stalen tunnelbekisting stort wanden en vloer tegelijk; snel bij veel gelijke woningen.',
'Prefab bouw':'Elementen of complete modules worden in de fabriek gemaakt en op de bouwplaats gemonteerd.',
'Staalskeletbouw':'Stalen kolommen en liggers met vloeren en gevels ertussen; veel bij kantoren, hallen en hoogbouw.',
'Modulair bouwen':'Complete ruimtemodules uit de fabriek; snelle bouwtijd en weinig overlast op de bouwplaats.',
'Casco':'Het ruwe gebouw zonder afwerking; bij casco-oplevering doet de koper zelf de afbouw.',
'Afbouw':'Alles na het casco: wanden, plafonds, afwerking en installaties.',
'Plat dak':'Heeft wel een klein afschot (minimaal ca. 1,6%) zodat water afloopt.',
'Hellend dak':'Water loopt snel af; de zolderruimte kan als woonruimte of opslag gebruikt worden.',
'Warm dak':'De meest gebruikte opbouw: dampremmer, isolatie en daarop de dakbedekking.',
'Omgekeerd dak':'De isolatie (XPS) ligt boven de dakbedekking en wordt met grind of tegels verzwaard.',
'Groen dak':'Sedum is het lichtst; intensieve daktuinen zijn zwaarder en vragen een sterkere constructie.',
'Zadeldak':'Twee dakvlakken die in de nok samenkomen; de meest voorkomende daksoort bij Nederlandse woningen.',
'Lessenaarsdak':'Eén schuin dakvlak; veel bij aanbouwen en moderne woningen.',
'Schilddak':'Vier dakvlakken, ook aan de kopse kanten schuin; geeft een rustig silhouet.',
// bouwproces
'Initiatief':'De opdrachtgever onderzoekt de haalbaarheid: locatie, budget, wensen en regels.',
'Programma van eisen':'Beschrijft wat het gebouw moet kunnen: ruimtes, oppervlakten, kwaliteit en budget; de basis voor het ontwerp.',
'Structuurontwerp':'Eerste ruimtelijke opzet met massa en indeling, vaak in schetsen en maquettes.',
'Voorlopig ontwerp':'Plattegronden, gevels en doorsneden op 1:200 of 1:100 met een eerste kostenraming.',
'Definitief ontwerp':'Het ontwerp ligt vast, inclusief materialen en hoofdmaten; basis voor de vergunningsaanvraag.',
'Technisch ontwerp':'Alles technisch uitgewerkt: details, constructie en installaties; vaak samen met het bestek.',
'Aanbesteding':'Aannemers geven een prijs; de opdrachtgever kiest op prijs of op prijs en kwaliteit (EMVI/BPKV).',
'Uitvoeringsgereed ontwerp':'Werktekeningen en productietekeningen van aannemer en leveranciers, klaar om te bouwen.',
'Uitvoering':'De bouwfase op de bouwplaats, geleid door de uitvoerder.',
'Oplevering':'Het werk wordt gecontroleerd; opleverpunten worden vastgelegd in een proces-verbaal en daarna hersteld.',
'Opdrachtgever':'Bijvoorbeeld een particulier, een woningcorporatie, een gemeente of een projectontwikkelaar.',
'Architect':'Ontwerpt het gebouw en bewaakt vaak de architectonische kwaliteit tijdens de bouw.',
'Constructeur':'Berekent en ontwerpt de draagconstructie: fundering, vloeren, kolommen, stabiliteit.',
'Aannemer':'Voert het werk uit en is verantwoordelijk voor de bouw volgens contract en regels.',
'Onderaannemer':'Specialist die een deel van het werk doet voor de aannemer, zoals de installateur of de dakdekker.',
'Uitvoerder':'De baas op de bouwplaats: plant, coördineert vakmensen en bewaakt kwaliteit en veiligheid.',
'Werkvoorbereider':'Bereidt de uitvoering voor: werktekeningen, bestellingen, planning en afstemming met leveranciers.',
'Calculator':'Maakt de begroting op basis van tekeningen en bestek: hoeveelheden, prijzen en normuren.',
'Kwaliteitsborger':'Onder de Wkb onafhankelijk ingeschakeld; geeft aan het einde een verklaring af aan de gemeente.',
'Bevoegd gezag':'Meestal de gemeente; verleent vergunningen en houdt toezicht op de regels.',
'Bestek':'Beschrijft materialen, uitvoering en kwaliteit; in Nederland vaak opgesteld volgens STABU-systematiek.',
'UAV 2012':'Uniforme Administratieve Voorwaarden voor traditionele bouwcontracten; regelen o.a. meerwerk en oplevering.',
'UAV-GC':'Voor geïntegreerde contracten waarbij de opdrachtnemer ook (een deel van) het ontwerp maakt.',
'Bouwteam':'De aannemer denkt al in de ontwerpfase mee over uitvoerbaarheid en kosten.',
'Meerwerk':'Extra werk dat niet in het contract stond; wordt apart verrekend en moet vooraf worden afgesproken.',
'Stelpost':'Een geschat bedrag voor iets dat nog niet precies vastligt, zoals de keuken; achteraf verrekend.',
'Omgevingsvergunning':'Nodig voor bouwen dat niet vergunningvrij is; wordt aangevraagd via het Omgevingsloket.',
'Bouwmelding':'Onder de Wkb meld je het bouwen van gevolgklasse 1-werk minimaal vier weken vooraf bij de gemeente.',
// regels
'Omgevingswet':'Bundelt sinds 2024 wetten over ruimte, milieu, natuur en bouwen tot één stelsel.',
'Bbl':'Bevat technische eisen voor nieuwbouw, verbouw en bestaande bouw; per gebruiksfunctie verschillend.',
'Omgevingsplan':'Eén plan per gemeente met regels over waar en wat je mag bouwen, als opvolger van het bestemmingsplan.',
'Technische bouwactiviteit':'Het bouwen zelf toetsen aan de technische regels; onder de Wkb gebeurt dat door een kwaliteitsborger.',
'Omgevingsplanactiviteit':'Toetsen of een bouwplan past binnen het omgevingsplan (bijv. hoogte, functie).',
'Wkb':'Wet kwaliteitsborging voor het bouwen; eerst alleen voor gevolgklasse 1, later uit te breiden.',
'Gevolgklasse 1':'Eenvoudige bouwwerken zoals eengezinswoningen en kleine bedrijfshallen.',
'Welstand':'Toets of het uiterlijk van een bouwwerk past in de omgeving; gemeenten leggen dit vast in welstandsbeleid.',
'BENG':'Bijna Energieneutrale Gebouwen; geldt sinds 2021 voor alle nieuwbouw.',
'BENG 1':'Energiebehoefte in kWh/m²·jaar; hangt af van isolatie, kierdichting, oriëntatie en compactheid.',
'BENG 2':'Primair fossiel energiegebruik; daalt met zuinige installaties en zonnepanelen.',
'BENG 3':'Aandeel hernieuwbare energie in procenten, bijvoorbeeld via warmtepomp en zonnepanelen.',
'MPG':'Milieuprestatie Gebouwen in euro per m² per jaar; lager is beter. De grenswaarde voor woningen is aangescherpt.',
'Rc-waarde':'Bbl-eisen nieuwbouw: gevel 4,7, vloer 3,7 en dak 6,3 m²K/W.',
'Verblijfsgebied':'Bij woningen moet minimaal 55% van de gebruiksoppervlakte verblijfsgebied zijn.',
'Verblijfsruimte':'Een afzonderlijke kamer binnen het verblijfsgebied, zoals een slaapkamer of woonkamer.',
'BVO':'Bruto vloeroppervlak: buitenwerks gemeten per bouwlaag, volgens NEN 2580.',
'GO':'Gebruiksoppervlakte: binnenwerks, zonder dragende muren en schachten; staat in woningadvertenties.',
// architectuur
'Massa':'De hoofdvorm en het volume van een gebouw; de eerste stap in een ontwerp.',
'Ritme':'Herhaling van ramen, kolommen of materialen in een gevel; geeft rust of juist spanning.',
'Proportie':'De verhoudingen tussen hoogte, breedte en diepte; bijvoorbeeld de gulden snede.',
'Rooilijn':'Bepaalt waar de voorgevels staan, zodat de straat een samenhangend beeld heeft.',
'Routing':'Hoe mensen door een gebouw bewegen: van entree naar trap naar kamers.',
'Zonering':'Ruimtes groeperen naar gebruik, zoals een privé-zone en een gemeenschappelijke zone.',
'Oriëntatie':'De ligging ten opzichte van de zon: woonkamer op het zuiden geeft veel zon.',
'Context':'De omgeving: bebouwing, straat, landschap en geschiedenis waar het ontwerp op reageert.',
'Maquette':'Schaalmodel van karton, hout of 3D-print om de vorm en verhoudingen te laten zien.',
'Amsterdamse School':'Ca. 1910–1930: expressieve baksteenarchitectuur met golvende vormen, bijvoorbeeld Het Schip in Amsterdam.',
'De Stijl':'Ca. 1917–1931: rechte lijnen en primaire kleuren; bekend voorbeeld is het Rietveld Schröderhuis.',
'Nieuwe Bouwen':'Ca. 1920–1940: functioneel, licht, met staal, glas en beton; bijvoorbeeld de Van Nellefabriek.',
'Delftse School':'Ca. 1925–1955: traditionele vormen en materialen, als reactie op het Nieuwe Bouwen.',
'Wederopbouw':'Na 1945: snel, sober en seriematig bouwen, bijvoorbeeld de wederopbouw van Rotterdam.',
'Structuralisme':'Jaren 60–70: herhaalbare bouwstenen en menselijke maat, bijvoorbeeld Centraal Beheer in Apeldoorn.',
'Functionalisme':'"Vorm volgt functie": het gebruik bepaalt de vorm, zonder overbodige versiering.',
'Monument':'Rijks- of gemeentelijk monument; wijzigingen vragen een vergunning en respect voor de waarden.',
// bim
'BIM':'Bij BIM bevat het model niet alleen geometrie maar ook informatie zoals materiaal, brandwerendheid en kosten.',
'IFC':'Open bestandsformaat waarmee modellen uit verschillende programma’s (Revit, ArchiCAD, Tekla) uitgewisseld worden.',
'Clashcontrole':'Botsingen tussen bijvoorbeeld een leiding en een balk worden al in het model gevonden in plaats van op de bouwplaats.',
'BIM-protocol':'Afspraken over wie wat modelleert, welke informatie erin moet en hoe bestanden worden uitgewisseld.',
'Informatieniveau (LOD)':'Hoe gedetailleerd en betrouwbaar een object in het model is, oplopend per ontwerpfase.',
'CDE':'Common Data Environment: gedeelde online omgeving waar alle partijen de actuele modellen en documenten vinden.',
'NL-SfB':'Codering van bouwdelen (bijv. 21 = buitenwanden, 27 = daken) om modellen en begrotingen te ordenen.',
'Parametrisch ontwerpen':'Een ontwerp dat met regels en parameters wordt opgebouwd, zodat varianten snel te genereren zijn.',
'Zichtlijn':'Doorgetrokken lijn voor zichtbare randen van een object.',
'Verborgen lijn':'Streepjeslijn voor randen die achter iets liggen, zoals een fundering onder de vloer.',
'Hartlijn':'Streep-punt-lijn door het midden van een wand of kolom; stramienlijnen zijn hartlijnen.',
'Snijvlak':'Het deel dat in een doorsnede wordt doorgesneden; dik aangezet en gearceerd.',
'Titelhoek':'Rechtsonder op de tekening met projectnaam, tekeningnummer, schaal, datum en revisie.',
'Revisie':'Een gewijzigde versie van een tekening; aangegeven met een letter of cijfer en omschrijving van de wijziging.',
'Noordpijl':'Laat zien waar het noorden is; belangrijk voor bezonning en gevelbenaming.',
'Peilmaat':'Hoogtemaat ten opzichte van peil, bijvoorbeeld +2.700 of −0.600.',
// duurzaam
'Circulair bouwen':'Het doel is dat in 2050 de bouw in Nederland volledig circulair is.',
'R-ladder':'Van refuse (niet gebruiken) en reduce tot recycle en recover; hoe hoger op de ladder, hoe beter.',
'Losmaakbaar bouwen':'Schroeven en klikverbindingen in plaats van lijm en kit, zodat onderdelen later herbruikbaar zijn.',
'Materialenpaspoort':'Registreert welke materialen waar in het gebouw zitten, zodat ze later hergebruikt kunnen worden.',
'LCA':'Levenscyclusanalyse: berekent de milieu-impact van winning tot sloop; basis voor de MPG.',
'Biobased bouwen':'Bijvoorbeeld houtvezel-, hennep- of strovezelisolatie en houten constructies.',
'CO2-opslag':'Hout en andere plantaardige materialen slaan CO₂ op zolang ze in het gebouw zitten.',
'Hergebruik':'Bijvoorbeeld gebruikte bakstenen, kozijnen of stalen liggers uit een sloopproject opnieuw toepassen.',
'Aardgasvrij':'Nieuwbouw krijgt sinds 2018 in principe geen gasaansluiting meer.',
'Warmtepomp':'Haalt warmte uit lucht, bodem of water en werkt het best in goed geïsoleerde woningen.',
'WTW':'Haalt tot ca. 90% van de warmte uit afgevoerde lucht terug; hoort bij ventilatiesysteem D.',
'Nul-op-de-meter':'Woning die over een jaar evenveel energie opwekt als ze gebruikt voor verwarming, warm water en huishouden.',
'TOjuli':'BENG-indicator voor het risico op oververhitting in de zomer; moet onder een grenswaarde blijven.',
'Zonwering':'Buitenzonwering is veel effectiever dan binnenzonwering, omdat de warmte dan buiten blijft.',
'Kierdichting':'Een luchtdichte woning verliest minder warmte; dan is goede ventilatie extra belangrijk.',
'Lage-temperatuurverwarming':'Werkt met watertemperaturen van ca. 35–55 °C, passend bij warmtepompen en vloerverwarming.'
};

Object.assign(TX,{
// constructie
'Draagconstructie':'Wordt ontworpen door de constructeur; de architect houdt in het ontwerp al rekening met waar kolommen en dragende wanden kunnen staan.',
'Krachtsafdracht':'Controleer bij elk ontwerp of elke last een doorgaande weg naar de fundering heeft; verspringende wanden kosten vaak extra balken.',
'Ligger':'Kan van hout, staal of beton zijn; hoe groter de overspanning, hoe hoger de ligger moet worden.',
'Kolom':'Slanke kolommen moeten op knik worden gecontroleerd, niet alleen op druksterkte.',
'Dragende wand':'In woningbouw meestal de woningscheidende wanden en het binnenblad van de gevel.',
'Overspanning':'Houten balken zijn rendabel tot ca. 5 m, kanaalplaten tot ca. 12 m en staal of voorgespannen beton daarboven.',
'Oplegging':'Moet groot genoeg zijn om de kracht door te geven, bijvoorbeeld 100 mm voor een kanaalplaat op een wand.',
'Scharnier':'In de praktijk veel stalen verbindingen met enkele bouten; ze dragen wel, maar stabiliseren niet.',
'Inklemming':'Bijvoorbeeld een betonnen balkon dat met wapening doorloopt in de vloer.',
'Uitkraging':'Het moment is aan de ingeklemde kant het grootst; daar zit dus de meeste wapening of het zwaarste profiel.',
'Permanente belasting':'Wordt in berekeningen aangeduid met g of G; vermenigvuldigd met een kleinere factor dan veranderlijke belasting.',
'Veranderlijke belasting':'Wordt aangeduid met q of Q; de waarden staan in de Eurocode (NEN-EN 1991).',
'Eigen gewicht':'Een betonvloer van 200 mm weegt al 4,8 kN/m², meer dan twee keer de gebruiksbelasting van een woning.',
'Gebruiksbelasting':'Voor kantoren en scholen hoger dan voor woningen, en voor bibliotheken en opslag nog hoger.',
'Windbelasting':'Werkt horizontaal en bepaalt bij hoge en lange gebouwen de stabiliteitsconstructie.',
'Sneeuwbelasting':'Bij platte daken met opstaande randen kan sneeuw ophopen; daar rekent men extra belasting.',
'Puntlast':'Bijvoorbeeld een kolom die op een balk staat of een zware machine op een vloer.',
'Lijnlast':'Ontstaat ook als een vloer op een balk afdraagt: vlaklast × belastingbreedte.',
'Vlaklast':'Vloer- en dakbelastingen worden altijd eerst als vlaklast bepaald.',
'Belastingfactor':'Voor uiterste grenstoestand ongeveer 1,2 voor permanent en 1,5 voor veranderlijk (orde van grootte).',
'Stabiliteit':'Een kaartenhuis staat verticaal, maar valt bij de eerste zuchtje wind om: dat is gebrek aan stabiliteit.',
'Schijfwerking':'Kanaalplaatvloeren worden met een druklaag of voegvulling tot één schijf gekoppeld.',
'Stabiliteitswand':'Moet in beide richtingen van het gebouw aanwezig zijn en mag niet te veel openingen hebben.',
'Windverband':'Herken je aan de kruisen in de gevel of het dak van een staalhal.',
'Portaal':'Geeft vrije gevels zonder kruisen, maar vraagt zwaardere profielen en stijve verbindingen.',
'Kern':'Bevat vaak trappenhuis, liften en schachten; in hoogbouw de ruggengraat van de stabiliteit.',
'Knik':'Probeer een lange liniaal in te drukken: hij buigt opzij lang voordat het materiaal breekt.',
'Kip':'Wordt voorkomen door de bovenflens van een ligger zijdelings te steunen, bijvoorbeeld door de vloer.',
'Doorbuiging':'Vaak begrensd op een fractie van de overspanning, bijvoorbeeld L/250, om scheuren in afwerking te voorkomen.',
'Scheurvorming':'Kleine scheuren in beton zijn normaal; grote of groeiende scheuren wijzen op een constructief probleem.',
// details
'Bouwknoop':'Bouwknopen zijn de plekken waar de meeste lekkages, tocht en koudebruggen ontstaan.',
'Waterkering':'Moet altijd water van binnen naar buiten afvoeren, met overlap in de goede richting.',
'DPC-folie':'DPC staat voor damp proof course; de strook ligt schuin in de spouw en eindigt boven een open stootvoeg.',
'Loodslab':'Lood is goed vormbaar; tegenwoordig worden ook loodvervangers gebruikt.',
'Dakrand':'Moet water naar het dak terug leiden, niet over de gevel.',
'Dakopstand':'Bij deuren naar een dakterras is een lagere opstand mogelijk met extra voorzieningen.',
'Kimfixatie':'Voorkomt dat de dakbedekking bij de opstand loskomt of scheurt door beweging.',
'Luchtdichting':'Luchtlekken kosten energie en kunnen vocht in de constructie brengen; in nieuwbouw wordt de luchtdichtheid gemeten (qv;10).',
'Kozijnaansluiting':'Wordt vaak gedetailleerd op 1:5; een veelvoorkomende plek voor bouwfouten.',
'Lineaire warmtedoorgangscoëfficiënt (ψ)':'Goede bouwknopen hebben een lage ψ-waarde; slechte bouwknopen kunnen een flink deel van het warmteverlies veroorzaken.',
'Optrekkend vocht':'Komt vooral voor bij oude panden zonder waterkerende laag in de fundering.',
'Doorslaand vocht':'Vooral aan de westkant (regenkant) en bij slecht voegwerk of massieve muren.',
'Inwendige condensatie':'Je ziet het niet direct, maar het kan hout laten rotten en isolatie laten verslechteren.',
'Oppervlaktecondensatie':'Vaak bij ramen, achter kasten tegen een buitenmuur en in badkamers met slechte ventilatie.',
'Temperatuurfactor (f-factor)':'f = 0,65 betekent dat het binnenoppervlak bij 20 °C binnen en 0 °C buiten minimaal 13 °C is.',
'Capillair':'Een open stootvoeg of spouw onderbreekt het capillaire transport.',
'Ventilatie kruipruimte':'Roosters niet dichtmaken: dan stijgt de vochtigheid onder de vloer en ontstaan geur en schimmel.',
'Bodemafsluiting':'Vaak een laag schelpen, folie of bodemisolatie; vermindert ook kou en vocht van onderen.',
'Spouwventilatie':'Laat vocht in de spouw opdrogen; zonder ventilatie blijft het buitenblad lang nat.',
'Schimmel':'Oplossing: oorzaak wegnemen (ventileren, koudebrug oplossen), niet alleen schoonmaken.',
// uitvoering
'Bouwplanning':'Een realistische planning houdt rekening met levertijden, weer, vakanties en droogtijden.',
'Strokenplanning':'Het meest gebruikte planningsoverzicht op de bouwplaats; wordt wekelijks bijgewerkt.',
'Kritiek pad':'Werkvoorbereiders sturen vooral op activiteiten op het kritieke pad.',
'Mijlpaal':'Vaak gekoppeld aan betalingstermijnen in het contract.',
'Doorlooptijd':'Kan korter worden door meer mensen in te zetten, maar niet onbeperkt: ze lopen elkaar dan in de weg.',
'Speling (float)':'Activiteiten met speling kun je verschuiven om pieken in personeel of materieel te voorkomen.',
'Werkvoorbereiding':'Goede werkvoorbereiding voorkomt stilstand, faalkosten en wachten op materiaal.',
'Bouwstroom':'Bijvoorbeeld elke week twee woningen ruwbouw gereed; elke ploeg volgt dezelfde volgorde.',
'Wind- en waterdicht':'Een belangrijke mijlpaal: vanaf dan kunnen schilders, stukadoors en installateurs binnen werken.',
'Bouwplaatsinrichting':'Wordt getekend in een bouwplaatsinrichtingstekening met kraanbereik, opslag en looproutes.',
'V&G-plan':'Er is een V&G-plan voor de ontwerpfase (opdrachtgever) en een voor de uitvoeringsfase (aannemer).',
'Arbowet':'De Arbeidsinspectie (Nederlandse Arbeidsinspectie) controleert de naleving op bouwplaatsen.',
'Valbeveiliging':'Collectieve maatregelen zoals randbeveiliging gaan voor persoonlijke maatregelen zoals harnassen.',
'Steiger':'Mag alleen door deskundigen worden opgebouwd en moet regelmatig worden gekeurd.',
'Bouwkeet':'Er moeten voldoende sanitaire voorzieningen en een schaftruimte zijn voor het aantal werknemers.',
'Persoonlijke beschermingsmiddelen':'Op de meeste bouwplaatsen zijn helm, schoenen en hesje verplicht om toegang te krijgen.',
'Toolboxmeeting':'Meestal kort (15 minuten) en regelmatig, bijvoorbeeld over werken op hoogte of tillen.',
'Bouwafval scheiden':'Gescheiden afval kan worden gerecycled en is goedkoper om af te voeren.',
'Opleverpunt':'De aannemer moet opleverpunten binnen een afgesproken termijn herstellen.',
// veiligheid
'Brandcompartiment':'Grote gebouwen worden in meerdere compartimenten verdeeld met brandwerende wanden, vloeren en deuren.',
'Subbrandcompartiment':'Bij woongebouwen vormt een appartement vaak een (sub)brandcompartiment.',
'WBDBO':'Wordt bepaald over de hele route die vuur kan afleggen, ook via de gevel en het dak, niet alleen door de wand.',
'Branddoorslag':'Bijvoorbeeld door een leidingdoorvoer die niet brandwerend is afgedicht.',
'Brandoverslag':'Een vlam slaat via een raam naar het raam erboven; daarom hebben gevels soms brandwerende stroken.',
'Brandwerendheid':'Wordt in laboratoria getest; een deur met 30 minuten brandwerendheid houdt brand een halfuur tegen.',
'Euroklassen':'Gevelmaterialen moeten vaak minimaal klasse B of D halen, afhankelijk van de hoogte van het gebouw.',
'Rookmelder':'De meeste slachtoffers bij woningbranden vallen door rook; een melder geeft kostbare vluchttijd.',
'Rookcompartiment':'Een trappenhuis is vaak een rookcompartiment, zodat mensen er rookvrij kunnen vluchten.',
'Brandwerende deur':'Mag niet worden opengezet met een wig; dan werkt het compartiment niet meer.',
'Vluchtroute':'Moet altijd vrij zijn van obstakels en duidelijk zijn aangegeven.',
'Beschermde vluchtroute':'Bijvoorbeeld een gang met brandwerende deuren naar een trappenhuis.',
'Extra beschermde vluchtroute':'Vooral bij hoge gebouwen en gebouwen waar veel mensen zijn.',
'Veilige plaats':'Meestal de openbare weg of een terrein dat daarmee in verbinding staat.',
'Loopafstand':'Gemeten langs de werkelijke looproute, niet in een rechte lijn.',
'Toegankelijkheidssector':'Moet bereikbaar zijn via een toegankelijke route zonder drempels of trappen.',
'Vrije doorgang':'Let op: de vrije breedte is de dagmaat van de deur, niet de kozijnmaat.',
'Vloerafscheiding':'Ook bij vides, galerijen, balkons, dakterrassen en lage ramen kan een vloerafscheiding nodig zijn.',
'Klimlijn':'Ligt bij een rechte trap in het midden, bij een draaiende trap op een vaste afstand van de zijkant.',
'Trapleuning':'Moet goed te omvatten zijn en doorlopen tot het einde van de trap.',
// installsys
'Ventilatiesysteem A':'Vooral in oude woningen; afhankelijk van wind en temperatuur, dus niet altijd voldoende.',
'Ventilatiesysteem B':'Weinig toegepast omdat de afvoer dan onvoldoende gestuurd wordt.',
'Ventilatiesysteem C':'Eenvoudig en goedkoop; met CO₂-sturing ventileert hij alleen waar en wanneer dat nodig is.',
'Ventilatiesysteem D':'Vraagt kanalen naar alle ruimtes en regelmatig filters vervangen.',
'Warmteterugwinning (WTW)':'Bespaart veel energie in de winter; in de zomer schakelt een bypass de terugwinning uit.',
'CV-ketel':'Wordt in nieuwbouw nauwelijks nog toegepast door de aardgasvrije eis.',
'Lucht-waterwarmtepomp':'De buitenunit maakt enig geluid; houd daarom rekening met de plaats ten opzichte van de buren.',
'Bodemwarmtepomp':'Duurder in aanleg door de bodembron, maar efficiënter en stiller dan een luchtwarmtepomp.',
'Vloerverwarming':'Reageert traag, dus werkt het best met een constante temperatuur.',
'COP':'Een COP van 4 betekent: 1 kWh stroom levert 4 kWh warmte.',
'Drinkwaterinstallatie':'Leidingen van koper of kunststof; moet voldoen aan eisen voor waterkwaliteit en druk.',
'DWA':'Gaat via het vuilwaterriool naar de rioolwaterzuivering.',
'HWA':'Bij een gescheiden stelsel gaat regenwater apart naar oppervlaktewater of infiltratie.',
'Gescheiden stelsel':'In nieuwbouwwijken standaard; voorkomt dat de zuivering overbelast raakt bij regen.',
'Stankafsluiter (sifon)':'Als een afvoer lang niet gebruikt wordt, kan het water verdampen; dan ruik je rioollucht.',
'Ontspanningsleiding':'Zie je als pijp die boven het dak uitsteekt.',
'Afschot':'Te weinig afschot geeft verstoppingen; te veel kan juist de vaste delen achterlaten.',
'Legionella':'Daarom moet warm tapwater regelmatig boven 60 °C komen en mogen leidingen geen dode einden hebben.',
'Infiltratie':'Bijvoorbeeld met infiltratiekratten of een wadi; ontlast het riool.',
'Ontstoppingsstuk':'Moet bereikbaar blijven, dus niet wegwerken achter tegels.',
'Meterkast':'Moet voldoende ruimte hebben voor alle aansluitingen, ook voor toekomstige uitbreiding.',
'Groepenkast':'Een woning heeft meestal 4 tot 12 groepen, afhankelijk van de grootte en zware apparaten.',
'Aardlekschakelaar':'Schakelt binnen een fractie van een seconde af bij een lekstroom van 30 mA.',
'Installatieautomaat':'Een groep van 16 A schakelt af als er langdurig meer stroom loopt.',
'Aarding':'Metalen behuizingen van apparaten zijn geaard via de randaarde in het stopcontact.',
'Krachtgroep':'Een inductiekookplaat heeft vaak twee groepen of een driefasenaansluiting nodig.',
'NEN 1010':'Installateurs moeten deze norm volgen; bij oplevering wordt de installatie gecontroleerd.',
'Zonnepanelen (PV)':'Opbrengst in Nederland ongeveer 0,8–0,9 kWh per wattpiek per jaar bij een goede oriëntatie.',
'Omvormer':'Hangt vaak op zolder of in de meterkast; moet voldoende geventileerd zijn.',
'Laadpunt':'Vraagt vaak een zwaardere aansluiting of slimme laadstroomregeling.',
// bfbegrip
'Rc-waarde':'Bbl-eisen nieuwbouw: gevel 4,7, vloer 3,7 en dak 6,3 m²K/W.',
'U-waarde':'Glas: enkel ≈ 5,8, HR++ ≈ 1,1, triple ≈ 0,6 W/m²K.',
'λ-waarde':'Isolatiematerialen hebben een λ rond 0,020–0,040 W/mK.',
'Relatieve vochtigheid':'Binnen is 40–60% comfortabel; boven ca. 70–80% stijgt het risico op schimmel.',
'Dauwpunt':'Bij 20 °C en 60% RV ligt het dauwpunt rond 12 °C.',
'Dampdiffusie':'In de winter stroomt damp van binnen (warm, vochtig) naar buiten (koud, droog).',
'μ-waarde':'Minerale wol heeft een μ van ca. 1, beton ca. 100, een dampremmende folie veel hoger.',
'Thermische massa':'Zware gebouwen blijven in de zomer langer koel, maar warmen in de winter langzamer op.',
'Transmissieverlies':'Hoe hoger de Rc en hoe kleiner het verliesoppervlak, hoe lager het transmissieverlies.',
'Infiltratie (lucht)':'Wordt gemeten met een blowerdoortest.',
'Decibel (dB)':'+10 dB voelt ongeveer als twee keer zo luid aan.',
'Luchtgeluid':'Wordt tegengehouden door zware wanden of door ontkoppelde dubbele wanden.',
'Contactgeluid':'Bij appartementen bepaalt de contactgeluidisolatie van de vloer veel van het wooncomfort.',
'Luchtgeluidisolatie':'Bij woningscheidende wanden wordt een minimale isolatie geëist in het Bbl.',
'Contactgeluidisolatie':'Harde vloeren zoals laminaat of tegels vragen een goede ondervloer of zwevende dekvloer.',
'Zwevende dekvloer':'De randisolatie langs de wanden is cruciaal; één contact met de wand en het werkt veel minder.',
'Nagalmtijd':'Een klaslokaal of kantoor met veel harde vlakken galmt; absorberende plafonds lossen dat op.',
'Geluidabsorptie':'Absorptie helpt binnen een ruimte, maar houdt geluid naar de buren nauwelijks tegen.',
'Flankerende geluidoverdracht':'Daarom moeten vloeren en gevels bij een woningscheidende wand ook onderbroken of zwaar zijn.',
'Massawet':'Verklaart waarom woningscheidende wanden vaak van zware kalkzandsteen of beton zijn.'
});
// toelichting toevoegen aan begrippen die er nog geen hebben
Object.values(TERMS).forEach(ch=>Object.values(ch).forEach(list=>list.forEach(e=>{if(!e[2]&&TX[e[0]])e[2]=TX[e[0]]})));

// ================= VOORBEELD EN 'LET OP' PER BEGRIP =================
const TV={},TL={};
const V=(t,v,l)=>{TV[t]=v;if(l)TL[t]=l};
// ---- onderbouw ----
V('Fundering','Een rijtjeshuis in Gouda staat op betonpalen van 18 m lang, omdat daar pas de vaste zandlaag begint. Een vergelijkbaar huis in Enschede staat op een betonnen strook van 60 cm diep, direct op het zand.','Verwar fundering niet met de begane grondvloer: de vloer rust óp de fundering.');
V('Funderingsbalk','Onder de woningscheidende wand van een rij woningen ligt een prefab funderingsbalk van 400 × 600 mm die van paal naar paal overspant.','Een funderingsbalk ligt meestal op palen; een funderingsstrook ligt direct op de grond.');
V('Poer','Onder een stalen kolom in een bedrijfshal staat een betonnen poer van 1,5 × 1,5 m op vier palen; de kolom wordt met ankerbouten op de poer gezet.');
V('Heipaal','Een heistelling slaat een prefab paal van 290 × 290 mm met een valblok de grond in tot hij "op stuit" staat in het zand.','Heien geeft trillingen en lawaai; naast oude panden kies je vaak een schroefpaal.');
V('Kruipruimte','Onder een jaren-30-woning is een kruipruimte van 50 cm hoog met een luik in de gang, waar de loodgieter bij de afvoeren kan.','Een natte kruipruimte niet afsluiten maar ventileren en de bodem afdekken.');
V('Begane grondvloer','In nieuwbouw wordt vaak een "ribcassette" of EPS-systeemvloer gelegd met een Rc van 3,7 m²K/W of meer.');
V('Dekvloer','Een anhydriet dekvloer van 50 mm wordt vloeibaar over de vloerverwarmingsleidingen gestort en is na een paar dagen beloopbaar.','Een dekvloer is níet constructief: hij draagt niets, hij werkt de vloer af.');
V('Peil','Op een doorsnede zie je: bovenkant vloer begane grond P = 0, eerste verdieping +2.800, onderkant fundering −0.800.','Peil is níet hetzelfde als maaiveld of NAP.');
V('Maaiveld','Een woning heeft peil op +0.200 boven maaiveld: er zitten één of twee optredes voor de voordeur.');
V('Kanaalplaatvloer','In een appartementengebouw liggen kanaalplaten van 260 mm dik die 7,2 m overspannen van woningscheidende wand naar woningscheidende wand.');
// ---- gevel ----
V('Spouwmuur','Een nieuwbouwgevel van binnen naar buiten: 100 mm kalkzandsteen, 160 mm minerale wol, 40 mm luchtspouw, 100 mm baksteen. Totaal circa 400 mm.');
V('Binnenblad','In een rijtjeshuis draagt het binnenblad van kalkzandsteen de betonvloeren van de verdiepingen.','Het binnenblad zit aan de warme kant; daar hoort de luchtdichting.');
V('Buitenblad','Het buitenblad van rode waalformaatsteen in halfsteens verband bepaalt het uiterlijk van de woning.');
V('Spouwanker','Bij het metselen van het buitenblad worden RVS-spouwankers om de 50 cm in de voeg gelegd en met een isolatieclip vastgezet.');
V('Luchtspouw','Een slagregen tegen een westgevel dringt deels door het buitenblad; het water loopt in de luchtspouw naar beneden en verdwijnt via de open stootvoegen.','Specieresten in de spouw kunnen water naar het binnenblad geleiden; houd de spouw schoon.');
V('Latei','Boven een raamopening van 1,8 m in het buitenblad ligt een stalen hoeklijn als latei; in het binnenblad een betonnen latei.');
V('Open stootvoeg','Onder in het buitenblad en boven elk kozijn wordt om de ca. 1 m een stootvoeg niet gevuld, zodat water uit de spouw weg kan.');
V('Dilatatievoeg','Een gevel van 40 m lang krijgt om de 10–12 m een verticale voeg met kit, zodat het metselwerk kan uitzetten zonder te scheuren.');
V('Borstwering','In een slaapkamer zit het raam op 900 mm boven de vloer: die 900 mm muur is de borstwering.','Ligt de onderkant van een te openen raam lager dan 850 mm, dan is een valbeveiliging nodig.');
V('Gevelaanzicht','Op het noordgevelaanzicht zie je de voordeur, de kozijnen met hun indeling en de materialen, zoals baksteen en houten boeidelen.');
// ---- dak ----
V('Nok','Bij een rijwoning met zadeldak ligt de nok op +9.500; daar komen beide dakvlakken samen onder een nokvorst.');
V('Dakvoet','Bij de dakvoet van een woning zit de goot, het boeideel en de aansluiting van de dakisolatie op de spouwisolatie.','Een gat in de isolatie bij de dakvoet is een klassieke koudebrug.');
V('Muurplaat','Op het binnenblad van de eerste verdieping wordt een houten muurplaat van 70 × 170 mm verankerd; daarop rusten de prefab dakelementen.');
V('Gording','In een oude zolder lopen twee zware houten gordingen in de lengte van de woning, gedragen door de woningscheidende wanden.');
V('Spant','In een boerderij dragen houten spanten om de 4 m het dak, zodat er geen tussenmuren nodig zijn.');
V('Dakbeschot','Bij een renovatie wordt het oude houten dakbeschot vervangen door geïsoleerde sandwichpanelen met een Rc van 6,3.');
V('Panlat','Voor betonpannen liggen panlatten van 22 × 32 mm op ongeveer 330 mm hart op hart.');
V('Tengel','Tengels van 12 × 32 mm liggen van nok naar goot onder de panlatten, zodat lekwater onder de pannen naar de goot loopt.','De tengel loopt van boven naar beneden, de panlat dwars daarop.');
V('Boeideel','Het witte houten boeideel langs de dakrand moet elke 6–8 jaar geschilderd worden; daarom kiezen veel mensen bij renovatie voor kunststof.');
V('Hemelwaterafvoer','Een zinken goot voert regenwater via een HWA van 80 mm doorsnede naar het regenwaterriool.');
// ---- openingen ----
V('Kozijn','Een houten raamkozijn in een woonkamer heeft een vast deel en een draai-kiepraam, met triple glas.');
V('Stijl','Een breed kozijn van 3 m heeft twee tussenstijlen, zodat er drie vakken zijn.');
V('Onderdorpel','Bij een voordeur ligt een hardstenen onderdorpel met een afschot naar buiten en een kleine opstand tegen het inwaaien van water.');
V('Bovendorpel','Boven de bovendorpel van een kozijn in de spouwmuur ligt een DPC-strook die water uit de spouw naar buiten leidt.');
V('Tussendorpel','Een deurkozijn met een glazen bovenlicht heeft een tussendorpel op ca. 2,3 m hoogte.');
V('Draaiend deel','Een draai-kiepraam kun je kantelen voor ventilatie of helemaal openen om schoon te maken.');
V('Glaslat','Bij een houten kozijn wordt het glas aan de binnenkant met glaslatten vastgezet, zodat inbrekers het glas niet van buiten kunnen verwijderen.');
V('Waterslag','Onder een raam ligt een aluminium waterslag die 30 mm voor de gevel uitsteekt, zodat regenwater niet langs het metselwerk naar beneden loopt.');
V('Negge','Een kozijn ligt 100 mm terug in de gevel; die negge geeft schaduwwerking en beschermt het kozijn tegen regen.');
V('Triple glas','Een woning met triple glas (U = 0,6) verliest door de ramen ongeveer de helft van de warmte die door HR++-glas (U = 1,1) gaat.','Triple glas is zwaarder: controleer of het kozijn en het hang- en sluitwerk het aankunnen.');
// ---- afbouw ----
V('Natte ruimte','Een badkamer met inloopdouche krijgt een waterdichte laag onder de tegels, een vloer met afschot naar de afvoer en een ventilatie-afzuiging van 14 dm³/s.');
V('Metal-stud wand','Een kantoor wordt ingedeeld met metal-stud wanden van 100 mm met 2× 12,5 mm gipsplaat aan elke kant en minerale wol ertussen.','Een metal-stud wand is niet dragend; hang er zware kasten alleen aan met versterking.');
V('Gipsplaat','In een badkamer gebruik je vochtbestendige (groene) gipsplaat; rond een meterkast soms brandwerende plaat.');
V('Systeemplafond','In een school hangt een systeemplafond van 600 × 600 mm platen; boven het plafond lopen ventilatiekanalen en kabelgoten.');
V('Stucwerk','Een woonkamer krijgt sausklaar stucwerk, zodat de schilder direct kan sausen zonder eerst te plamuren.');
V('Spachtelputz','In veel jaren-90-woningen zit spachtelputz op de wanden; wie gladde wanden wil, moet dat eraf laten schuren of er overheen laten stucen.');
V('Tegelwerk','Een keukenwand wordt betegeld met tegels van 10 × 30 cm in tegellijm; de voegen worden achteraf gevuld met voegmiddel.');
V('Plint','Langs alle wanden van een woonkamer komt een witte MDF-plint van 70 mm hoog die de kier tussen laminaat en wand afdekt.');
V('Vloerafwerking','Op vloerverwarming wordt een pvc-vloer verlijmd, omdat die goed warmte doorlaat; dik tapijt zou de verwarming isoleren.');
V('Kozijn binnendeur','In nieuwbouw worden stalen binnendeurkozijnen al tijdens de ruwbouw geplaatst; de wanden worden er later tegenaan gezet.');
// ---- tekeningen ----
V('Situatietekening','Op de situatietekening 1:500 zie je de woning op de kavel, 3 m uit de zijdelingse erfgrens, met de oprit en de aansluiting op het riool in de straat.');
V('Plattegrond','De plattegrond van de begane grond toont woonkamer, keuken, hal, toilet en trap met alle maten en deurdraairichtingen.','Een plattegrond is een doorsnede op ca. 1 m hoogte: ramen zie je doorgesneden.');
V('Doorsnede','Doorsnede A-A laat zien: fundering op −0.800, vloer op peil, verdiepingsvloer op +2.800, nok op +9.200 en de dakhelling van 45°.');
V('Detail','Detail 3 op schaal 1:5 toont de aansluiting van het raamkozijn op de spouwmuur met DPC, isolatie, kit en waterslag.');
V('Bestektekening','Bij de aanbesteding krijgen drie aannemers de bestektekeningen en het bestek, en geven daar elk een prijs voor.');
V('Werktekening','De kozijnfabrikant maakt een werktekening van elk kozijn met exacte maten en profielen, die de architect controleert vóór productie.');
V('Stramien','Een kantoor heeft een stramien van 7,2 × 7,2 m; kolom C3 staat op het snijpunt van lijn C en lijn 3.');
V('Arcering','In een doorsnede is beton grijs met puntjes, isolatie heeft een golvende lijn en metselwerk schuine strepen.');
V('Renvooi','In de renvooi van een plattegrond staat dat "RM" rookmelder betekent en dat een gestippelde cirkel een plafondlichtpunt is.');
V('Maatlijn','Een maatlijn onder de plattegrond toont 1200 | 2400 | 1200, samen 4800 mm: de deelmaten van een gevel.','Maten op bouwtekeningen staan in mm zonder eenheid erachter.');
V('Orthogonale projectie','Een gevelaanzicht is een orthogonale projectie: een raam van 1,2 m breed is op 1:100 precies 12 mm, waar het ook in de gevel zit.');
V('Aanzicht','De zuidgevel van een woning toont de grote schuifpui van de woonkamer en de dakkapel aan de achterkant.');
V('Isometrie','Een installateur tekent het leidingschema van een badkamer in isometrie: je ziet in één beeld hoe de leidingen omhoog en opzij lopen.');
V('Perspectief','Voor de verkoopbrochure van nieuwbouwwoningen wordt een perspectief vanaf ooghoogte in de straat gemaakt.','Uit een perspectief kun je geen maten opmeten.');
V('Verdwijnpunt','In een straatperspectief lopen de dakgoten en trottoirranden allemaal naar één verdwijnpunt in het midden van de horizon.');
V('Lijndikte','In een doorsnede is de doorgesneden betonvloer dik getekend, terwijl de deur in het aanzicht erachter dun getekend is.');
V('Schets','In het eerste gesprek met een klant schets je in vijf minuten drie indelingen van de begane grond op een vel papier.');
V('Tekenblad en formaat','Een plattegrond 1:50 van een woning past op A1 (594 × 841 mm); een detailblad op A3.');
V('Doorsnedelijn','Op de plattegrond staat een streep-punt-lijn met pijlen en de letters B-B; doorsnede B-B staat op blad 04.');
V('Detailverwijzing','Bij de dakrand op de doorsnede staat een cirkel met "5 / 12": detail 5 op blad 12.');
// ---- materialen ----
V('Gewapend beton','Een betonnen balkon van 1,5 m diep heeft bovenin wapening, omdat een uitkraging aan de bovenkant op trek wordt belast.');
V('Wapening','Een vloer krijgt onderin een wapeningsnet Ø8–150: staven van 8 mm om de 150 mm in beide richtingen.');
V('Betondekking','Bij een balkon (buiten, vorst en regen) is minstens 35 mm dekking voorgeschreven; binnen is 25 mm vaak genoeg.','Te weinig dekking zie je jaren later terug als betonrot.');
V('Sterkteklasse C20/25','Een funderingsstrook wordt gestort in C20/25, de prefab kanaalplaten in een hogere klasse zoals C45/55.');
V('Prefab beton','Een prefab trap wordt in één stuk met de kraan op zijn plek gehesen; dat scheelt dagen bekisten en uitharden.');
V('In het werk gestort','Een kelder wordt in het werk gestort, zodat vloer en wanden één waterdicht geheel vormen.');
V('Voorgespannen beton','Een voorgespannen kanaalplaat van 200 mm overspant ruim 7 m; een gewone gewapende plaat van die dikte zou veel minder ver kunnen.');
V('S235','Een stalen latei boven een pui wordt uitgevoerd in S235; een zware ligger in een parkeergarage in S355.');
V('HE-profiel','In een bedrijfshal staan HEA 200-kolommen om de 6 m.');
V('IPE-profiel','Bij het weghalen van een draagmuur tussen keuken en kamer wordt een IPE 240 als vervangende ligger geplaatst.','Een IPE staat altijd rechtop (hoog en smal) om goed te dragen.');
V('Naaldhout','De vloerbalken van een jaren-30-woning zijn van vuren, 70 × 220 mm om de 60 cm.');
V('Loofhout','Een voordeurkozijn is van meranti; dat is beter bestand tegen regen dan vuren.');
V('Sterkteklasse C24','Houten balken voor een uitbouw worden gerekend met C24; de leverancier zet een stempel met de klasse op het hout.');
V('Krimpen en zwellen','Een massief eiken vloer die in de winter op een droge vloer wordt gelegd, kan in de zomer opzwellen en omhoog komen als er geen ruimte is gelaten.');
V('Houtvochtgehalte','Een houten vloerbalk met 25% vocht wordt eerst gedroogd voordat hij wordt ingebouwd en afgewerkt.');
V('Gelamineerd hout','Een sporthal krijgt gelamineerde houten liggers van 1,2 m hoog die 30 m overspannen.');
V('CLT','Een appartementengebouw van zeven lagen wordt opgebouwd met CLT-wanden en -vloeren, die in een paar weken staan.');
V('Houtskeletbouw','Een aanbouw van 4 × 3 m wordt gebouwd met houtskeletwanden die in een fabriek zijn gemaakt en in één dag worden geplaatst.');
V('FSC','Een gemeente eist in het bestek dat al het hout FSC- of PEFC-gecertificeerd is.');
V('Verduurzamen','Een tuinhuis van geïmpregneerd vuren gaat tien jaar of langer mee buiten, onbehandeld vuren veel korter.');
V('Baksteen','Een gevel in waalformaat (210 × 100 × 50 mm) heeft ongeveer 70 stenen per m².');
V('Kalkzandsteen','Woningscheidende wanden van twee keer 120 mm kalkzandsteen met een spouw ertussen geven goede geluidisolatie.');
V('Cellenbeton','Een niet-dragende binnenwand wordt van cellenbeton gemaakt omdat de blokken licht zijn en met een handzaag op maat te maken.');
V('Mortel','Voor zacht handvorm metselwerk kiest men een kalkrijke mortel, zodat de voeg niet sterker is dan de steen.','Een te harde mortel kan stenen laten scheuren bij beweging.');
V('Halfsteens muur','Het buitenblad van 100 mm baksteen is een halfsteens muur: de stenen liggen met de lange kant naar buiten.');
V('Metselverband','In halfsteens verband verspringt elke laag een halve steen, zodat de stootvoegen nooit boven elkaar liggen.');
V('Lijmwerk','Kalkzandsteen lijmblokken worden met een lijmlaag van 3 mm gestapeld; dat gaat veel sneller dan metselen.');
V('Voegwerk','Bij een renovatie wordt het oude, verweerde voegwerk 15 mm uitgehakt en opnieuw gevoegd.');
V('Minerale wol','In de spouw wordt 160 mm glaswol geplaatst; tussen de balken van een houten vloer steenwol voor geluidisolatie.');
V('PIR','Op een plat dak met weinig opbouwhoogte wordt 140 mm PIR toegepast om een Rc van 6,3 te halen.');
V('EPS','Bij gevelisolatie van buitenaf (ETICS) wordt EPS op de oude gevel geplakt en met pleisterwerk afgewerkt.');
V('XPS','Bij een omgekeerd dak ligt XPS op de dakbedekking, verzwaard met tegels, zodat de platen niet wegwaaien of gaan drijven.');
V('Dampremmende folie','Bij een houten dak wordt aan de binnenzijde een folie aangebracht met overlappende, afgeplakte naden vóór de gipsplaten.','Een gat voor een spotje kan de dampremming lokaal kapotmaken.');
V('Waterkerende dampopen folie','Een houtskeletwand krijgt aan de buitenkant een waterkerende dampopen folie achter de houten gevelbekleding.');
V('Koudebrug','Een doorlopende betonnen balkonplaat geeft in de winter een koude strook op het plafond binnen; daar kan schimmel ontstaan.');
V('Lambda (λ)','Om dezelfde Rc te halen heb je met PIR (λ 0,022) ongeveer 120 mm nodig, met minerale wol (λ 0,035) ongeveer 190 mm.','Lagere λ = beter isolerend materiaal; hogere R = beter isolerende laag.');
// ---- betontechnologie ----
V('Cement','Voor een kelder in zout grondwater kiest men hoogovencement, omdat dat beter bestand is tegen chemische aantasting.');
V('Toeslagmateriaal','Bij dicht op elkaar liggende wapening kiest men een grootste korrel van 16 mm in plaats van 32 mm, zodat het beton goed tussen de staven komt.');
V('Betonspecie','Een truckmixer brengt 9 m³ betonspecie; die moet binnen ongeveer anderhalf uur gestort zijn.');
V('Consistentieklasse','Voor een gewone vloer bestel je S3; voor een sterk gewapende wand waar je slecht kunt trillen kies je een vloeibaarder beton of zelfverdichtend beton.');
V('Milieuklasse','Een fundering in de grond krijgt XC2, een galerijvloer buiten XC4 + XF1, een parkeerdek met strooizout XD3.');
V('Verdichten','Na het storten van een wand gaat de betonwerker met een naaldtriller om de 40 cm de specie in tot er geen luchtbellen meer opkomen.');
V('Nabehandeling','Een betonvloer wordt na het afwerken met folie afgedekt en een week nat gehouden.');
V('Kubusdruksterkte','Van een stort worden proefkubussen gemaakt; na 28 dagen worden ze in een pers gebroken bij bijvoorbeeld 38 N/mm².');
V('Krimp','Een betonvloer van 30 m lang krijgt zaagsneden als krimpvoegen, zodat scheuren op een gecontroleerde plek ontstaan.');
V('Bekisting','Voor een ronde kolom wordt een kartonnen bekistingskoker gebruikt die na het uitharden wordt weggescheurd.');
// ---- glas, metaal, kunststof ----
V('HR++-glas','Een woning uit 1980 met enkel glas krijgt HR++-glas; het warmteverlies door de ramen daalt met ongeveer 80%.');
V('Gelaagd glas','Bij een vide met een glazen balustrade wordt gelaagd glas 8.8.2 gebruikt (twee platen van 8 mm met folie).');
V('Gehard glas','Een glazen douchewand is van gehard glas; als hij breekt, valt hij in kleine stompe korrels uiteen.');
V('Zonwerend glas','Een kantoor met een grote glazen zuidgevel krijgt zonwerend glas om oververhitting te beperken.');
V('Aluminium','Een appartementencomplex krijgt aluminium kozijnen die niet geschilderd hoeven te worden.');
V('Zink','De zinken goot van een jaren-30-woning moet om de 10 m een expansiestuk hebben.');
V('Verzinken','Een stalen trap buiten wordt thermisch verzinkt en daarna gepoedercoat in de gewenste kleur.');
V('Corrosie','Een gewone stalen schroef in een zinken goot gaat roesten; daarom gebruik je RVS of zinken bevestigingsmiddelen.');
V('PVC','Riolering in en rond een woning ligt meestal in grijze pvc-buizen van 110 of 125 mm.');
V('EPDM','Een dakkapel krijgt een EPDM-dakbedekking in één stuk, zonder naden waar lekkage kan ontstaan.');
// ---- funderingen ----
V('Fundering op staal','In Nijmegen, waar zand hoog zit, wordt een woning gefundeerd op een strook op ca. 80 cm diepte (vorstvrij).','"Op staal" heeft niets met het metaal staal te maken.');
V('Strokenfundering','Onder alle dragende muren van een vrijstaande woning op zandgrond loopt een betonnen strook van 600 mm breed.');
V('Plaatfundering','Een bedrijfshal op redelijke grond krijgt een gewapende betonplaat van 250 mm als fundering en vloer tegelijk.');
V('Paalfundering','Een woongebouw in Amsterdam staat op palen van ongeveer 20 m tot in de "eerste zandlaag".');
V('Prefab betonpaal','Op een bouwplaats liggen stapels betonpalen van 18 m; ze worden één voor één opgehesen en geheid.');
V('Schroefpaal','In een binnenstad wordt een nieuwe woning naast een monument op schroefpalen gezet om trillingen te voorkomen.');
V('Sondering','Uit een sondering blijkt dat de conusweerstand op −14 m NAP sterk stijgt: daar begint het draagkrachtige zand.');
V('Negatieve kleef','Een terrein wordt opgehoogd met 1 m zand; de veenlaag eronder zakt en trekt aan de palen, die daardoor zwaarder belast worden.');
// ---- bouwsystemen ----
V('Stapelbouw','Een vrijstaande villa met veel hoeken en verschillende raamhoogtes wordt in stapelbouw gemaakt, omdat dat flexibel is.');
V('Gietbouw','Een rij van 40 eengezinswoningen wordt in gietbouw gebouwd met grote wandbekistingen.');
V('Tunnelbouw','Een appartementengebouw met identieke woningen wordt in tunnelbouw gemaakt: elke dag een nieuwe "tunnel" van wanden en vloer.');
V('Prefab bouw','Een rijtjeshuis wordt in twee weken neergezet uit prefab betonnen wanden en vloeren.');
V('Staalskeletbouw','Een kantoor van zes lagen heeft een staalskelet met kanaalplaatvloeren en een betonnen kern voor de stabiliteit.');
V('Modulair bouwen','Studentenwoningen worden als complete units met badkamer in de fabriek gemaakt en per stuk op elkaar gestapeld.');
V('Casco','Een koper van een appartement krijgt het casco opgeleverd en laat zelf de keuken, badkamer en vloer aanbrengen.');
V('Afbouw','Na de ruwbouw van een woning volgen in de afbouw: leidingwerk, dekvloer, stucwerk, tegels, binnendeuren en schilderwerk.');
// ---- daken ----
V('Plat dak','Een aanbouw krijgt een plat dak met 2% afschot naar een hemelwaterafvoer in de hoek.','Een "plat" dak is nooit helemaal vlak: zonder afschot blijft er water staan.');
V('Hellend dak','Een zolder onder een dak van 45° is groot genoeg voor een extra slaapkamer.');
V('Warm dak','Een betonnen dak krijgt: dampremmer, 140 mm PIR en bitumineuze dakbedekking.');
V('Omgekeerd dak','Een dakterras wordt uitgevoerd als omgekeerd dak: dakbedekking, XPS, tegels op tegeldragers.');
V('Groen dak','Een sedumdak weegt verzadigd ongeveer 50–80 kg/m²; een daktuin met struiken kan meer dan 500 kg/m² wegen.');
V('Zadeldak','De meeste Nederlandse rijtjeshuizen hebben een zadeldak van 40–50° met pannen.');
V('Lessenaarsdak','Een moderne woning heeft een lessenaarsdak dat afloopt naar de tuin, met hoge ramen aan de straatkant.');
V('Schilddak','Een vrijstaande jaren-30-villa heeft een schilddak met aan alle vier de kanten een schuin dakvlak.');
// ---- grondwerk ----
V('Grondwerk','Voor een woning met kruipruimte wordt de grond ca. 1 m ontgraven voor de funderingsbalken en na het storten weer aangevuld.');
V('Bouwput','Voor een parkeerkelder van 3 m diep wordt een bouwput gemaakt met damwanden rondom en bemaling.');
V('Damwand','Langs een bestaande straat wordt een damwand van 12 m lang ingedrukt, zodat de weg niet in de bouwput zakt.');
V('Bemaling','Tijdens de bouw van een kelder zuigen bronnen het grondwater weg tot onder de bouwputbodem.');
V('Grondwaterstand','Uit een peilbuis blijkt dat het grondwater op 0,8 m onder maaiveld staat; een kelder moet dus waterdicht en zwaar genoeg zijn.');
V('Zetting','Een schuur zonder paalfundering op veengrond zakt in tien jaar enkele centimeters, aan één kant meer dan aan de andere.');
V('Ophogen','Een nieuwbouwwijk in een polder wordt eerst met 1,5 m zand opgehoogd en ligt dan een jaar "voor te belasten".');
V('Talud','Een bouwput van 1,5 m diep op een open terrein wordt met een talud van 1 : 1,5 afgegraven.');
V('Grondmechanisch onderzoek','Vóór het ontwerp van de fundering laat de constructeur vijf sonderingen en twee boringen doen op de bouwkavel.');
V('Bouwrijp maken','De gemeente legt eerst bouwwegen, riolering en kabels aan voordat de eerste woningen worden gebouwd.');

// ---- bouwproces fasen ----
V('Initiatief','Een woningcorporatie wil 40 sociale huurwoningen bouwen op een oud schoolterrein en laat eerst onderzoeken of dat haalbaar en betaalbaar is.');
V('Programma van eisen','Het PvE van een basisschool noemt onder meer: 8 lokalen van 55 m², een speellokaal, een BENG-score en een budget van € 4 miljoen.','Het PvE beschrijft wát het gebouw moet kunnen, niet hóe het eruitziet.');
V('Structuurontwerp','De architect maakt drie massastudies: een L-vorm, een U-vorm en een compact blok, en kiest samen met de opdrachtgever de U-vorm.');
V('Voorlopig ontwerp','In het VO staan plattegronden 1:100, gevels en een eerste kostenraming; de opdrachtgever reageert met wijzigingswensen.');
V('Definitief ontwerp','Na het DO liggen materialen en maten vast; de architect vraagt hiermee de omgevingsvergunning aan.');
V('Technisch ontwerp','In het TO worden alle details, de constructie en de installaties uitgewerkt en wordt het bestek geschreven.');
V('Aanbesteding','Vijf aannemers schrijven in; de opdracht gaat naar de aannemer met de beste combinatie van prijs en plan van aanpak.');
V('Uitvoeringsgereed ontwerp','De aannemer laat werktekeningen maken van kozijnen, prefab elementen en installaties, en de architect controleert ze.');
V('Uitvoering','Zes maanden lang staat er een bouwplaats: fundering, ruwbouw, dak, gevels, afbouw.');
V('Oplevering','Bij de oplevering lopen koper en uitvoerder samen door de woning en noteren een beschadigd kozijn en een ontbrekende plint.','Na oplevering begint de onderhoudstermijn waarin de aannemer gebreken nog moet herstellen.');
// ---- partijen ----
V('Opdrachtgever','Een gemeente is opdrachtgever voor een nieuw zwembad: zij betaalt en bepaalt het programma.');
V('Architect','De architect ontwerpt het zwembad, maakt de tekeningen en controleert tijdens de bouw of de gevel wordt uitgevoerd zoals ontworpen.');
V('Constructeur','De constructeur rekent uit hoe dik het dak over het bad moet zijn en welke liggers 25 m kunnen overspannen.');
V('Aannemer','De hoofdaannemer bouwt het zwembad en schakelt onderaannemers in voor installaties en het dak.');
V('Onderaannemer','De installateur is onderaannemer en legt de luchtbehandeling en de waterzuivering aan.');
V('Uitvoerder','De uitvoerder plant elke week wie er op de bouwplaats werkt en controleert of de wapening goed ligt vóór het storten.');
V('Werkvoorbereider','De werkvoorbereider bestelt de kozijnen twaalf weken van tevoren, zodat ze op tijd op de bouw zijn.');
V('Calculator','De calculator meet uit de tekeningen 820 m² metselwerk en berekent met normuren en prijzen wat dat kost.');
V('Kwaliteitsborger','Bij een nieuwbouwwoning controleert de kwaliteitsborger tijdens de bouw onder meer de isolatie, de brandveiligheid en de ventilatie.');
V('Bevoegd gezag','De gemeente toetst of de nieuwe woning past in het omgevingsplan en verleent de vergunning.');
// ---- contracten ----
V('Bestek','In het bestek staat bijvoorbeeld: "Buitenblad: baksteen, waalformaat, kleur rood-bruin, halfsteens verband, platvol gevoegd".');
V('UAV 2012','Onder de UAV 2012 levert de opdrachtgever het ontwerp; zit er een fout in de tekening, dan is dat in principe zijn risico.');
V('UAV-GC','Bij een nieuwe brug of school onder UAV-GC ontwerpt en bouwt de opdrachtnemer, op basis van een vraagspecificatie.');
V('Bouwteam','Bij de renovatie van een flat zit de aannemer al vanaf het VO aan tafel om mee te denken over bouwmethode en kosten.');
V('Meerwerk','De koper wil tijdens de bouw een extra dakraam; dat wordt als meerwerk geoffreerd en apart betaald.');
V('Stelpost','In de aanneemsom zit een stelpost keuken van € 8.000; kiest de koper een keuken van € 10.000, dan betaalt hij € 2.000 bij.');
V('Omgevingsvergunning','Voor een dakopbouw aan de straatkant vraagt de eigenaar een omgevingsvergunning aan via het Omgevingsloket.');
V('Bouwmelding','Vier weken vóór de start van de bouw van een vrijstaande woning dient de opdrachtgever een bouwmelding in, met het borgingsplan.');
// ---- regels ----
V('Omgevingswet','Waar vroeger aparte wetten waren voor bouwen, milieu en ruimtelijke ordening, regelt de Omgevingswet dat sinds 2024 samen.');
V('Bbl','Het Bbl eist bijvoorbeeld dat een slaapkamer in nieuwbouw minimaal 2,6 m hoog is en voldoende ventilatie en daglicht heeft.');
V('Omgevingsplan','Het omgevingsplan zegt dat je in een bepaalde straat maximaal 10 m hoog mag bouwen en alleen woningen mag maken.');
V('Technische bouwactiviteit','Voor een nieuwe woning moet worden aangetoond dat de constructie veilig is en dat de woning voldoet aan het Bbl.');
V('Omgevingsplanactiviteit','Een eigenaar wil een winkel in zijn woning beginnen; dat moet passen in het omgevingsplan of er is een vergunning nodig.');
V('Wkb','Onder de Wkb kiest de opdrachtgever een kwaliteitsborger die tijdens de bouw controleert, in plaats van alleen een papieren toets vooraf.');
V('Gevolgklasse 1','Een eengezinswoning valt in gevolgklasse 1; een ziekenhuis of hoge woontoren niet.');
V('Welstand','Een plan voor een felgroene dakkapel wordt afgewezen omdat het niet past bij het rustige straatbeeld volgens het welstandsbeleid.');
V('BENG','Een nieuwbouwwoning krijgt een BENG-berekening waaruit blijkt dat de energiebehoefte, het fossiele gebruik en het hernieuwbare aandeel binnen de eisen vallen.');
V('BENG 1','Een compacte rijwoning met goede isolatie haalt BENG 1 makkelijker dan een vrijstaande woning met veel gevel.');
V('BENG 2','Door 12 zonnepanelen op het dak daalt BENG 2 sterk, soms tot onder nul.');
V('BENG 3','Een woning met warmtepomp en zonnepanelen heeft een hoog aandeel hernieuwbare energie.');
V('MPG','Door houtskeletbouw en biobased isolatie daalt de MPG van een woning ten opzichte van een standaard betonnen woning.');
V('Rc-waarde','Een dak met Rc = 6,3 m²K/W isoleert ongeveer zes keer zo goed als een oud dak met Rc = 1.','Rc is de constructie zonder overgangsweerstanden; RT is inclusief.');
V('Verblijfsgebied','In een woning van 100 m² GO moet minstens 55 m² verblijfsgebied zitten (woonkamer, keuken, slaapkamers).');
V('Verblijfsruimte','Een slaapkamer van 3 × 4 m is een verblijfsruimte; de gang en de badkamer zijn dat niet.');
V('BVO','Een rijwoning van 6 × 9 m met twee lagen en een zolder heeft een BVO van ongeveer 150 m².');
V('GO','Diezelfde woning heeft een GO van ongeveer 125 m², omdat muren en schachten niet meetellen.','In woningadvertenties staat meestal de GO (gebruiksoppervlakte wonen).');
// ---- architectuur ----
V('Massa','Een woning bestaat uit een hoofdvolume met zadeldak en een lager volume met plat dak ernaast.');
V('Ritme','Een gevel met smalle, hoge ramen op gelijke afstand geeft een rustig ritme; afwisselend brede en smalle ramen een levendiger ritme.');
V('Proportie','Een raam van 1 m breed en 1,6 m hoog voelt "klassiek" omdat het dicht bij de gulden snede (1 : 1,618) ligt.');
V('Rooilijn','Alle voorgevels in een straat staan op 5 m van de stoeprand; een nieuwe woning moet daar ook staan.');
V('Routing','In een school leidt de route van de entree via een centrale hal naar de lokalen, zonder dat je door andere lokalen hoeft.');
V('Zonering','In een woning liggen woonkamer en keuken beneden (dag), slaapkamers boven (nacht).');
V('Oriëntatie','De woonkamer ligt aan de zuidkant voor zon, de keuken aan de noordkant omdat daar minder warmte binnenkomt.');
V('Context','In een straat met jaren-30-woningen ontwerpt de architect een nieuwe woning met dezelfde goothoogte en baksteen, maar een moderne raamindeling.');
V('Maquette','Een maquette 1:200 van een nieuwe wijk laat zien hoe hoog de gebouwen zijn ten opzichte van de bestaande huizen.');
V('Amsterdamse School','Het Schip in Amsterdam (Michel de Klerk) met zijn ronde toren en golvende baksteen is het bekendste voorbeeld.');
V('De Stijl','Het Rietveld Schröderhuis in Utrecht met vlakken in wit, grijs en primaire kleuren en schuifwanden binnen.');
V('Nieuwe Bouwen','De Van Nellefabriek in Rotterdam: glazen gevels, betonnen paddenstoelkolommen en veel daglicht.');
V('Delftse School','Veel naoorlogse dorpskerken en woningen met zadeldaken, baksteen en traditionele vormen.');
V('Wederopbouw','De Lijnbaan in Rotterdam, een van de eerste autovrije winkelstraten, gebouwd na het bombardement.');
V('Structuralisme','Het kantoor Centraal Beheer in Apeldoorn van Herman Hertzberger, opgebouwd uit herhaalde vierkante eenheden.');
V('Functionalisme','Een fabriekshal zonder versiering, waarvan de vorm volgt uit de productielijn en de lichtinval.');
V('Monument','Bij een rijksmonument mag je de originele kozijnen niet zomaar vervangen door kunststof.');
// ---- presenteren ----
V('Concept','Concept voor een bibliotheek: "een huiskamer voor de wijk" — warm hout, veel zitplekken, een open pui naar het plein.');
V('Referentieproject','Om een opdrachtgever te overtuigen van een houten gevel laat de architect foto’s zien van een vergelijkbaar project dat al tien jaar goed staat.');
V('Moodboard','Een moodboard met warm eikenhout, lichtgrijze steen en veel groen laat de klant zien welke sfeer de woning krijgt.');
V('Variantenstudie','Voor een gevel worden drie varianten uitgewerkt: baksteen, hout en stucwerk, elk met kosten en uitstraling.');
V('Multicriteria-analyse','Variant hout scoort kosten 3, duurzaamheid 5, uitstraling 4; met weegfactoren 30/40/30 wordt dat 4,0 en wint hij van baksteen (3,6).');
V('Render','Een render toont de nieuwe woning bij avondlicht met verlichte ramen, voor de verkoopbrochure.');
V('Presentatiepanel','Een A0-panel met bovenaan één groot perspectief, daaronder plattegronden, een doorsnede en drie korte uitlegteksten.');
V('Ontwerpcyclus','Na een tussenpresentatie blijkt de keuken te klein; je past het ontwerp aan, toetst opnieuw en presenteert een verbeterde versie.');
V('Functieschema','Een functieschema van een woning: entree verbonden met hal, hal met toilet, trap en woonkamer; woonkamer met keuken en tuin.');
V('Locatieanalyse','Uit de locatieanalyse blijkt dat de achterkant op het zuiden ligt en de voorkant aan een drukke straat: woonkamer achter, berging voor.');
// ---- BIM ----
V('BIM','In het BIM-model klik je op een wand en zie je direct: kalkzandsteen 150 mm, brandwerendheid 60 min, Rc 4,7.');
V('IFC','De architect werkt in Revit en de constructeur in Tekla; ze wisselen hun modellen uit via IFC-bestanden.');
V('Clashcontrole','Bij een clashcontrole blijkt een ventilatiekanaal dwars door een betonbalk te lopen; dat wordt opgelost vóór de bouw.');
V('BIM-protocol','In het BIM-protocol staat dat de installateur alle leidingen groter dan 50 mm modelleert en elke twee weken een IFC deelt.');
V('Informatieniveau (LOD)','In het VO is een raam alleen een gat in de wand; in het TO heeft het een exact profiel, glastype en U-waarde.');
V('CDE','Alle partijen werken in één online omgeving, zodat niemand bouwt van een oude tekening.');
V('NL-SfB','In de begroting staan alle buitenwanden onder code 21 en alle daken onder 27, zodat je ze makkelijk terugvindt.');
V('Parametrisch ontwerpen','Met een parametrisch model van een gevel kun je met één schuifje het aantal ramen of de hoogte veranderen.');
V('Zichtlijn','In een gevelaanzicht teken je de omtrek van de kozijnen met zichtlijnen.');
V('Verborgen lijn','Op de plattegrond van de begane grond wordt de fundering eronder met een streepjeslijn aangegeven.');
V('Hartlijn','Door het midden van elke kolom loopt een streep-punt-lijn, die aansluit op het stramien.');
V('Snijvlak','In doorsnede A-A worden de doorgesneden vloeren dik getekend en gearceerd; wat je daarachter ziet dun.');
V('Titelhoek','In de titelhoek staat: "Woning Dorpsstraat 12 – Plattegrond begane grond – 1:50 – blad 02 – revisie C".');
V('Revisie','Revisie B: "kozijn K3 breder gemaakt van 1200 naar 1500 mm, 12-05".');
V('Noordpijl','Dankzij de noordpijl weet je dat de tuin op het zuidwesten ligt en dus veel middag- en avondzon krijgt.');
V('Peilmaat','Op de doorsnede staat bij de dakrand van de aanbouw "+3.150".');
// ---- circulair ----
V('Circulair bouwen','Een paviljoen wordt gebouwd met gehuurde gevelpanelen die na 15 jaar terug naar de fabrikant gaan voor hergebruik.');
V('R-ladder','Een oud kantoor transformeren (hergebruik van het hele gebouw) staat hoger op de R-ladder dan slopen en het puin vermalen (recyclen).');
V('Losmaakbaar bouwen','Een houten gevelbekleding wordt geschroefd in plaats van genageld en gelijmd, zodat de planken later opnieuw te gebruiken zijn.');
V('Materialenpaspoort','Uit het materialenpaspoort van een kantoor blijkt dat er 200 stalen liggers in zitten die bij sloop herbruikbaar zijn.');
V('LCA','Uit een LCA blijkt dat houten vloeren een lagere milieubelasting hebben dan betonnen vloeren, vooral door de productie van cement.');
V('Biobased bouwen','Een woning wordt geïsoleerd met houtvezel en hennep in plaats van PIR en glaswol.');
V('CO2-opslag','Een houten woning slaat tientallen tonnen CO₂ op in het hout zolang het gebouw blijft staan.');
V('Hergebruik','Een nieuwe school krijgt een gevel van gebruikte bakstenen uit een gesloopte fabriek.');
// ---- energie ----
V('Aardgasvrij','Een nieuwbouwwijk krijgt geen gasleiding; woningen koken op inductie en verwarmen met een warmtepomp.');
V('Warmtepomp','Een lucht-waterwarmtepomp in de tuin verwarmt de vloerverwarming en het warme water in een boiler.');
V('WTW','De warme afgezogen lucht uit badkamer en keuken verwarmt de verse buitenlucht voor de woonkamer, zonder dat de luchtstromen mengen.');
V('Nul-op-de-meter','Een gerenoveerde rijwoning met nieuwe gevelschil, warmtepomp en zonnepanelen heeft op jaarbasis geen netto energierekening meer.');
V('TOjuli','Een woning met veel glas op het westen scoort een te hoge TOjuli; met buitenzonwering of een overstek komt hij onder de grens.');
V('Zonwering','Een uitvalscherm buiten houdt tot ca. 80% van de zonnewarmte tegen; een binnengordijn veel minder.');
V('Kierdichting','Bij een renovatie worden kozijnen nagekit en tochtstrips geplaatst; de woning voelt direct minder tochtig.');
V('Lage-temperatuurverwarming','Vloerverwarming die met water van 35 °C de kamer even warm stookt als oude radiatoren met 70 °C.');
// ---- klimaat ----
V('Klimaatadaptief bouwen','Een nieuwbouwwijk krijgt groene daken, wadi’s, bomen voor schaduw en minder verharding.');
V('Natuurinclusief bouwen','Elke woning in een nieuw project krijgt twee neststenen voor gierzwaluwen en een groen dak op de berging.');
V('Hittestress','In een hittegolf wordt het in een stenige binnenstad ’s nachts niet koeler dan 25 °C, terwijl het in een groene wijk afkoelt tot 18 °C.');
V('Hitte-eilandeffect','Op een warme zomerdag kan het in het centrum van Rotterdam enkele graden warmer zijn dan in de polder erbuiten.');
V('Waterberging','Onder een parkeerplaats liggen infiltratiekratten die bij een hevige bui het regenwater opvangen en langzaam laten wegzakken.');
V('Wadi','Langs een woonstraat ligt een verlaagde grasstrook waar na een bui een laagje water staat dat binnen een dag de grond in zakt.');
V('Retentiedak','Een plat kantoordak houdt 60 mm regenwater vast en laat het over een paar dagen langzaam weglopen.');
V('Groene gevel','Een parkeergarage krijgt een gevel van stalen kabels met klimop, die na een paar jaar helemaal groen is.');
V('Neststenen','In de kopgevel van een nieuwbouwblok zitten tien neststenen onder de dakrand, op het noorden, voor gierzwaluwen.');
V('Verharding','Een tuin die volledig betegeld wordt, zorgt dat al het regenwater het riool in gaat in plaats van de grond in.');

// ---- krachtsafdracht ----
V('Draagconstructie','In een rijwoning bestaat de draagconstructie uit de woningscheidende wanden, de betonvloeren, het dak en de fundering; de binnenwanden dragen niets.');
V('Krachtsafdracht','Een boekenkast op de eerste verdieping: gewicht → vloer → woningscheidende wand → funderingsbalk → palen → zandlaag.');
V('Ligger','Boven een doorbraak tussen keuken en woonkamer wordt een stalen ligger geplaatst die de bovenliggende muur draagt.');
V('Kolom','In een parkeergarage staan betonnen kolommen van 400 × 400 mm om de 7,5 m.');
V('Dragende wand','Bij een verbouwing mag je een dragende wand niet zomaar weghalen; eerst moet een constructeur een vervangende ligger berekenen.','Klop op een wand: hol klinkt vaak niet-dragend, maar dat is geen zekerheid; kijk naar de tekeningen.');
V('Overspanning','Een houten vloerbalk overspant 4 m tussen twee muren; voor 8 m zou je een kanaalplaat of stalen liggers nodig hebben.');
V('Oplegging','Een stalen latei boven een raam van 2 m ligt aan beide kanten minstens 150 mm op het metselwerk.');
V('Scharnier','Een houten balk die met een balkdrager aan een muur hangt, kan een beetje draaien: dat werkt als een scharnier.');
V('Inklemming','Een vlaggenmast die diep in de grond is ingegraven, staat ingeklemd: hij kan niet draaien aan de voet.');
V('Uitkraging','Een balkon van 1,8 m steekt vrij uit de gevel; het grootste moment zit bij de gevel.');
// ---- belastingen ----
V('Permanente belasting','Op een woningvloer: betonvloer 4,8 kN/m², dekvloer 1,0 kN/m², lichte scheidingswanden 0,5 kN/m².');
V('Veranderlijke belasting','Op een woningvloer rekent men 1,75 kN/m² voor mensen en meubels; op een dak sneeuw en onderhoudspersonen.');
V('Eigen gewicht','Een stalen ligger IPE 300 weegt ongeveer 42 kg per meter; voor kleine liggers is het eigen gewicht klein, voor beton groot.');
V('Gebruiksbelasting','In een klaslokaal wordt met meer belasting gerekend dan in een woonkamer, omdat er veel mensen tegelijk zijn.');
V('Windbelasting','Een hoog gebouw aan de kust krijgt een veel grotere windbelasting dan een rijtjeshuis in het binnenland.');
V('Sneeuwbelasting','Op een plat dak met een hoge dakrand kan sneeuw ophopen tot een veel grotere belasting dan het gemiddelde.');
V('Puntlast','Een kolom van de verdieping erboven staat midden op een ligger en geeft daar een puntlast van 40 kN.');
V('Lijnlast','Een halfsteens muur van 2,6 m hoog weegt ongeveer 5 kN per strekkende meter op de vloer eronder.');
V('Vlaklast','Een dakterras wordt belast met 2,5 kN/m², verspreid over het hele oppervlak.');
V('Belastingfactor','Voor de sterkteberekening wordt bijvoorbeeld 1,2 × permanente + 1,5 × veranderlijke belasting genomen, zodat er een veiligheidsmarge is.');
// ---- stabiliteit ----
V('Stabiliteit','Een rij woningen is stabiel in de lengterichting door de gevels en in de dwarsrichting door de woningscheidende wanden.');
V('Schijfwerking','Een betonvloer die aan alle wanden is gekoppeld, verdeelt de windkracht op de gevel over de stabiliteitswanden.');
V('Stabiliteitswand','In een kantoor met glazen gevels zorgen de betonnen wanden rond het trappenhuis voor de stabiliteit.');
V('Windverband','In de zijgevel van een staalhal zie je stalen kruisen tussen de kolommen; die houden de hal recht bij wind.');
V('Portaal','Een garagebox met een grote open voorkant wordt stabiel gemaakt met een stalen portaal met stijve hoeken.');
V('Kern','Een woontoren van 30 verdiepingen heeft een betonnen kern met liften en trappen die alle windkrachten opneemt.');
V('Knik','Een slanke stalen buiskolom van 4 m hoog bezwijkt eerder door knik dan door de druksterkte van het staal.');
V('Kip','Een hoge, smalle houten balk zonder zijsteun kan bij belasting opzij kantelen; daarom worden balken onderling gekoppeld.');
V('Doorbuiging','Een vloer van 6 m overspanning buigt bij volle belasting bijvoorbeeld 15 mm door; te veel doorbuiging geeft scheuren in tegels.');
V('Scheurvorming','Een diagonale scheur boven een deur in een binnenmuur ontstaat vaak door doorbuiging van de vloer erboven.');
// ---- aansluitingen ----
V('Bouwknoop','De aansluiting tussen begane grondvloer, fundering en spouwmuur is een bouwknoop waar isolatie, waterkering en luchtdichting samenkomen.');
V('Waterkering','Onder een kozijn ligt een kunststof waterkering die eventueel lekwater via de spouw naar buiten voert.');
V('DPC-folie','Boven een stalen latei in de spouw ligt een DPC-strook die aan de buitenkant over de latei heen eindigt.','De folie moet altijd naar buiten aflopen, anders loopt water juist naar binnen.');
V('Loodslab','Rond een schoorsteen op een pannendak ligt een loodslab die over de pannen heen valt.');
V('Dakrand','Op een plat dak met een aluminium daktrim loopt de dakbedekking over de opstand tot onder de trim.');
V('Dakopstand','Bij een dakkapel loopt de bitumen dakbedekking 15 cm omhoog tegen de opgaande wand.');
V('Kimfixatie','Langs de rand van een plat dak wordt de bedekking extra mechanisch bevestigd in de hoek tussen dak en opstand.');
V('Luchtdichting','Rond een kozijn wordt aan de binnenzijde een luchtdichte tape aangebracht, vóór het stucwerk.');
V('Kozijnaansluiting','Een kozijnaansluiting heeft buiten een kitvoeg en waterkering, in de spouw isolatie tot tegen het kozijn en binnen een luchtdichte tape.');
V('Lineaire warmtedoorgangscoëfficiënt (ψ)','Een balkon met thermische onderbreking heeft een veel lagere ψ dan een balkon waarvan de betonplaat doorloopt.');
// ---- vocht ----
V('Optrekkend vocht','In een woning uit 1900 zit tot 1 m hoogte een vochtige rand met afbladderende verf op de binnenmuur.');
V('Doorslaand vocht','Na een storm met slagregen ontstaat een natte plek op de binnenkant van een massieve westgevel.');
V('Inwendige condensatie','In een slecht uitgevoerd houten plat dak zonder dampremmer wordt het dakbeschot ’s winters nat en gaat het rotten.');
V('Oppervlaktecondensatie','Op een koude ochtend staat er condens op de onderkant van de ramen in de slaapkamer.');
V('Temperatuurfactor (f-factor)','Een hoek met f = 0,5 is bij 0 °C buiten maar 10 °C aan het binnenoppervlak: kans op schimmel.');
V('Capillair','Een droge baksteen die je met de onderkant in een bakje water zet, wordt na een tijdje tot halverwege nat.');
V('Ventilatie kruipruimte','In de voorgevel en achtergevel zitten kunststof roosters onder de vloer, zodat er dwarsventilatie door de kruipruimte gaat.');
V('Bodemafsluiting','Een kruipruimte krijgt een laag schelpen van 10 cm, zodat er minder vocht uit de bodem verdampt.');
V('Spouwventilatie','Bij een gevel zonder open stootvoegen blijft de spouw na regen lang vochtig; met ventilatie droogt hij sneller.');
V('Schimmel','Zwarte puntjes in de hoek van de badkamer: meer ventileren (afzuiging aan) en het oppervlak schoonmaken.');
// ---- planning ----
V('Bouwplanning','Planning van een rijwoning: fundering 2 weken, ruwbouw 4 weken, dak 1 week, gevels 3 weken, afbouw 8 weken.');
V('Strokenplanning','Op de strokenplanning zie je dat het dak en het metselwerk van het buitenblad elkaar een week overlappen.');
V('Kritiek pad','De levering van de prefab trap ligt op het kritieke pad: komt hij een week later, dan schuift de hele oplevering een week op.');
V('Mijlpaal','Mijlpaal "hoogste punt bereikt" wordt gevierd met een vlag op het dak.');
V('Doorlooptijd','Het stucwerk van tien woningen kost 300 uur; met drie stukadoors is de doorlooptijd ongeveer 12,5 werkdag.');
V('Speling (float)','Het tegelwerk heeft 5 dagen speling: het mag tot 5 dagen later beginnen zonder dat de oplevering schuift.');
V('Werkvoorbereiding','De werkvoorbereider merkt op de tekening dat een kozijn niet past op de stelmaat en lost het op vóórdat het besteld wordt.');
V('Bouwstroom','In een project van 80 woningen gaat de ruwbouwploeg elke week twee woningen verder, gevolgd door de dakploeg en de kozijnploeg.');
V('Wind- en waterdicht','Na het plaatsen van het dak en de kozijnen met glas is de woning wind- en waterdicht; de stukadoor kan beginnen.');
V('Oplevering','Na de oplevering krijgt de koper de sleutels en begint de onderhoudstermijn van drie of zes maanden.');
// ---- bouwplaats ----
V('Bouwplaatsinrichting','Op de bouwplaatsinrichtingstekening staat waar de torenkraan komt, waar de keten staan en waar vrachtwagens kunnen lossen.');
V('V&G-plan','In het V&G-plan staat dat bij het plaatsen van dakelementen randbeveiliging aanwezig moet zijn en dat de werkplek onder de kraan wordt afgezet.');
V('Arbowet','Een aannemer krijgt een boete omdat er zonder randbeveiliging op een dak op 6 m hoogte werd gewerkt.');
V('Valbeveiliging','Rond een vloerrand op de eerste verdieping staat een tijdelijke hekwerk-randbeveiliging met leuning, knieleuning en kantplank.');
V('Steiger','Langs een gevel van drie lagen staat een steiger met vloeren om de 2 m; de metselaars werken er per laag vanaf.');
V('Bouwkeet','Een bouwplaats heeft een schaftkeet, een kantoorkeet voor de uitvoerder en een sanitaire unit.');
V('Persoonlijke beschermingsmiddelen','Bij het slijpen van beton draagt een werknemer naast helm en schoenen ook een stofmasker, bril en gehoorbescherming.');
V('Toolboxmeeting','Maandagochtend bespreekt de uitvoerder in 15 minuten hoe je veilig met de bouwlift werkt.');
V('Bouwafval scheiden','Op de bouwplaats staan aparte containers voor hout, steenachtig afval, metaal, gips en restafval.');
V('Opleverpunt','Opleverpunt: "kras in kozijn slaapkamer 2, bijwerken"; de aannemer herstelt dit binnen de afgesproken termijn.');
// ---- begroting ----
V('Begroting','Een begroting voor een rijwoning bevat posten als grondwerk, fundering, metselwerk, kozijnen, daken, installaties en afbouw.');
V('Directe kosten','Post metselwerk: 85 m² × € 95 = € 8.075 directe kosten.');
V('Indirecte kosten','De kosten van de bouwkeet, de kraan en de uitvoerder voor het hele project vallen onder de indirecte kosten.');
V('AK (algemene kosten)','Een aannemer rekent 7% AK over de bouwkosten om zijn kantoor en directie te betalen.');
V('W&R (winst en risico)','Bovenop AK komt 3% W&R; in een drukke markt rekenen aannemers soms meer.');
V('Aanneemsom','De aannemer neemt de bouw van een woning aan voor € 285.000 inclusief btw.');
V('Eenheidsprijs','Een eenheidsprijs voor triple glas is bijvoorbeeld € 150 per m²; voor 18 m² glas is dat € 2.700.');
V('Kengetal','Met een kengetal van € 2.300 per m² BVO raamt de architect een woning van 150 m² op ongeveer € 345.000.');
V('Levensduurkosten (LCC)','Een warmtepomp kost meer dan een cv-ketel, maar door lagere energiekosten zijn de kosten over 20 jaar lager.');
V('Onvoorzien','In de raming bij het VO zit 10% onvoorzien; vlak voor de aanbesteding wordt dat 3%.');
// ---- brand ----
V('Brandcompartiment','Een appartementengebouw is verdeeld in compartimenten per woning; een brand in de keuken van nummer 12 mag niet binnen 60 minuten naar nummer 14.');
V('Subbrandcompartiment','Binnen een groot kantoor zijn delen afgescheiden als subbrandcompartiment, zodat mensen langer veilig kunnen vluchten.');
V('WBDBO','De wand tussen twee rijwoningen moet een WBDBO van 60 minuten hebben.','WBDBO gaat over de weg van brand van ruimte naar ruimte, niet alleen over één wand.');
V('Branddoorslag','Een niet afgedicht gat rond een rioleringsbuis in een brandwerende vloer laat vuur en rook door.');
V('Brandoverslag','Vlammen slaan uit een raam van de begane grond naar het raam van de eerste verdieping erboven.');
V('Brandwerendheid','Een stalen kolom wordt met brandwerende verf behandeld zodat hij 60 minuten blijft dragen bij brand.');
V('Euroklassen','Steenwol is klasse A1 (onbrandbaar); een houten gevelbekleding vaak D, tenzij hij brandvertragend is behandeld.');
V('Rookmelder','In een nieuwbouwwoning hangt een rookmelder op elke verdieping in de hal of overloop, gekoppeld aan het stroomnet.');
V('Rookcompartiment','In een appartementengebouw is het trappenhuis een rookcompartiment met zelfsluitende deuren, zodat bewoners rookvrij naar beneden kunnen.');
V('Brandwerende deur','De deur tussen een parkeergarage en het trappenhuis is een zelfsluitende brandwerende deur van 30 of 60 minuten.');
// ---- vluchten ----
V('Vluchtroute','Vanuit een slaapkamer op de tweede verdieping loopt de vluchtroute via de overloop en de trap naar de voordeur.');
V('Beschermde vluchtroute','Een galerij met brandwerende afscheidingen naar een trappenhuis is een beschermde vluchtroute.');
V('Extra beschermde vluchtroute','In een woontoren is het trappenhuis een extra beschermde vluchtroute met overdrukventilatie.');
V('Veilige plaats','Na het verlaten van het gebouw via de nooduitgang sta je op het trottoir: een veilige plaats.');
V('Loopafstand','In een kantoorgebouw mag de loopafstand tot de dichtstbijzijnde beschermde vluchtroute niet te groot zijn; daarom komt er een tweede trappenhuis.');
V('Toegankelijkheidssector','In een appartementengebouw met lift moet een rolstoelgebruiker vanaf de straat de voordeur van elke woning kunnen bereiken.');
V('Vrije doorgang','Een deur van 930 mm kozijnbreedte heeft een vrije doorgang van ongeveer 850 mm.');
V('Vloerafscheiding','Een dakterras op 3 m hoogte krijgt een balustrade van 1 m hoog zonder klimbare spijlen.');
V('Klimlijn','Bij een kwartdraaiende trap meet je de aantrede op de klimlijn, op ca. 300 mm uit de smalle kant.');
V('Trapleuning','Een trap van 2,8 m hoogte krijgt een leuning op 900 mm boven de voorkant van de treden.');
// ---- installsys ----
V('Ventilatiesysteem A','Een oud herenhuis met roosters in de ramen en een open schoorsteen ventileert volledig natuurlijk.');
V('Ventilatiesysteem B','Een ruimte waar met een ventilator lucht wordt ingeblazen en die via een rooster vanzelf naar buiten gaat.');
V('Ventilatiesysteem C','Een rijwoning met roosters boven de ramen en een ventilatiebox op zolder die lucht uit keuken, badkamer en toilet zuigt.');
V('Ventilatiesysteem D','Een nieuwbouwwoning met een WTW-unit op zolder en in elke kamer een toevoer- of afvoerventiel in het plafond.');
V('Warmteterugwinning (WTW)','Buiten is het 0 °C; na de WTW komt de verse lucht met ongeveer 17 °C de woonkamer in.');
V('CV-ketel','Een woning uit 1995 heeft een HR-cv-ketel op zolder die op gas radiatoren en warm water verwarmt.');
V('Lucht-waterwarmtepomp','Een buitenunit naast de woning haalt warmte uit de lucht, ook bij 0 °C, en verwarmt daarmee het water voor de vloerverwarming.');
V('Bodemwarmtepomp','Onder een nieuwbouwwoning zit een bodemlus van 100 m diep; in de zomer kan de woning er licht mee gekoeld worden.');
V('Vloerverwarming','In een nieuwbouwwoning liggen de leidingen om de 10–15 cm in de dekvloer, verdeeld over groepen per ruimte.');
V('COP','Een warmtepomp met COP 4 die 8000 kWh warmte levert, gebruikt 2000 kWh stroom.');
V('Drinkwaterinstallatie','Vanaf de watermeter in de meterkast lopen kunststof leidingen naar keuken, badkamer, toilet en wasmachine.');
V('DWA','Het water uit de douche en het toilet gaat via de DWA-leiding naar het vuilwaterriool in de straat.');
V('HWA','De regenpijp van de goot is aangesloten op de HWA, die het regenwater naar de sloot of een infiltratievoorziening brengt.');
V('Gescheiden stelsel','In een nieuwbouwwijk liggen twee rioolbuizen in de straat: één voor vuil water en één voor regenwater.','Een regenpijp op het vuilwaterriool aansluiten is in een gescheiden stelsel fout.');
V('Stankafsluiter (sifon)','Onder de wastafel zit een zwanenhals met water dat rioollucht tegenhoudt.');
V('Ontspanningsleiding','Boven het dak van een woning steekt een pvc-buis uit: de ontspanningsleiding van de riolering.');
V('Afschot','Een afvoerleiding van 4 m lang met afschot 1 : 100 loopt over die lengte 40 mm naar beneden.');
V('Legionella','In een sportcomplex met veel douches worden de leidingen regelmatig doorgespoeld en op hoge temperatuur gehouden.');
V('Infiltratie','De regenpijp van een woning loopt naar een infiltratiekrat in de tuin in plaats van naar het riool.');
V('Ontstoppingsstuk','Onder in de standleiding zit een ontstoppingsstuk met een schroefdeksel, zodat een loodgieter de leiding kan doorsteken.');
V('Meterkast','In de meterkast zitten de watermeter, de elektriciteitsmeter, de groepenkast en de glasvezelaansluiting.');
V('Groepenkast','Een nieuwbouwwoning heeft een groepenkast met bijvoorbeeld acht groepen, waaronder aparte groepen voor de kookplaat en de warmtepomp.');
V('Aardlekschakelaar','Een kapotte waterkoker veroorzaakt een lekstroom; de aardlekschakelaar schakelt de groep direct uit.');
V('Installatieautomaat','Als je een oven, waterkoker en magnetron tegelijk op één groep aanzet, slaat de automaat van 16 A uit.');
V('Aarding','Een wasmachine heeft een randaardestekker; als een draad loskomt tegen de behuizing, loopt de stroom weg via de aarde.');
V('Krachtgroep','Een inductiekookplaat van 7,4 kW wordt aangesloten op twee groepen van 16 A.');
V('NEN 1010','Volgens NEN 1010 mogen er in een badkamer alleen stopcontacten en schakelaars op een veilige afstand van het bad of de douche zitten.');
V('Zonnepanelen (PV)','Tien panelen van 400 Wp op een zuiddak leveren samen ongeveer 3400 kWh per jaar.');
V('Omvormer','De omvormer op zolder zet de gelijkstroom van de panelen om in wisselstroom voor het stopcontact.');
V('Laadpunt','Een laadpaal op de oprit laadt een elektrische auto met 11 kW via een driefasenaansluiting.');
// ---- bfbegrip ----
V('U-waarde','Een HR++-raam (U = 1,1) van 2 m² verliest bij 20 graden verschil 1,1 × 2 × 20 = 44 W.');
V('λ-waarde','Staal (λ ≈ 50) geleidt warmte duizend keer beter dan PIR (λ ≈ 0,022); daarom zijn stalen doorgangen door isolatie koudebruggen.');
V('Relatieve vochtigheid','In een badkamer na het douchen stijgt de RV tot 90%; met goede afzuiging is hij binnen een halfuur weer onder de 70%.');
V('Dauwpunt','Een koud bierflesje uit de koelkast beslaat in een warme kamer, omdat het glas kouder is dan het dauwpunt van de lucht.');
V('Dampdiffusie','In de winter trekt waterdamp van de warme badkamer door het plafond naar de koude zolder als daar geen dampremmer zit.');
V('μ-waarde','Een dampremmende folie heeft een veel hogere μ-waarde dan gipsplaat; daarom zit hij aan de warme kant.');
V('Thermische massa','Een betonnen woning blijft op een hete dag langer koel dan een houten woning, maar koelt ’s nachts ook langzamer af.');
V('Transmissieverlies','Een woning met dunne spouwisolatie verliest de meeste warmte via ramen en dak; na-isoleren verlaagt het transmissieverlies sterk.');
V('Infiltratie (lucht)','Bij een blowerdoortest wordt de woning onder druk gezet om te meten hoeveel lucht er door kieren lekt.');
V('Decibel (dB)','Een normaal gesprek is ongeveer 60 dB, een drukke straat 70–80 dB, een drilboor 100 dB.','+3 dB is twee keer zoveel geluidsenergie, maar klinkt niet twee keer zo hard.');
V('Luchtgeluid','Je hoort de televisie van de buren door de woningscheidende wand: dat is luchtgeluid.');
V('Contactgeluid','Je hoort de bovenburen lopen op hun laminaatvloer: dat is contactgeluid.');
V('Luchtgeluidisolatie','Een ontkoppelde woningscheidende wand van twee bladen kalkzandsteen met een spouw houdt veel meer geluid tegen dan één enkel blad.');
V('Contactgeluidisolatie','Een zwevende dekvloer op een isolatieplaat dempt loopgeluid naar de woning eronder sterk.');
V('Zwevende dekvloer','Bij appartementen ligt de dekvloer op een veerkrachtige laag met randstroken langs alle wanden, zodat hij nergens de constructie raakt.');
V('Nagalmtijd','Een lege sporthal heeft een lange nagalmtijd; door absorberende wandpanelen wordt de ruimte veel minder galmend.');
V('Geluidabsorptie','Akoestische plafondplaten in een kantoor zorgen dat gesprekken niet door de hele ruimte weerkaatsen.');
V('Flankerende geluidoverdracht','Een goede woningscheidende wand helpt weinig als de doorlopende houten vloer erboven het geluid toch naar de buren geleidt.');
V('Massawet','Een wand van 100 mm kalkzandsteen isoleert minder dan een wand van 200 mm, omdat de massa verdubbelt (ongeveer +6 dB).');
// ---- bestaand ----
V('Meerjarenonderhoudsplan (MJOP)','Het MJOP van een VvE laat zien dat over 4 jaar de dakbedekking (€ 45.000) en over 7 jaar het buitenschilderwerk (€ 30.000) gepland staan.');
V('NEN 2767','Een inspecteur geeft het buitenschilderwerk score 4 (matig, met flinke gebreken) en de dakbedekking score 2 (goed).');
V('Conditiemeting','Bij een conditiemeting worden alle onderdelen van een school bekeken en krijgt elk onderdeel een score van 1 tot 6.');
V('Planmatig onderhoud','Een corporatie schildert al haar woningen elke 7 jaar, of het nu nodig is of niet.');
V('Correctief onderhoud','De dakgoot wordt pas vervangen als hij lekt en er een vochtplek op het plafond verschijnt.');
V('Conditiegestuurd onderhoud','Het schilderwerk wordt pas opnieuw gedaan als de conditie bij een inspectie onder score 3 zakt.');
V('Onderhoudscyclus','Een bitumen dakbedekking heeft een cyclus van ongeveer 20–25 jaar, kitvoegen ongeveer 10 jaar.');
V('Levensduur','Een cv-ketel gaat ongeveer 15 jaar mee; een betonnen fundering meer dan 100 jaar.');
V('Beheerder','Een vastgoedbeheerder van een winkelcentrum regelt het onderhoud, de schoonmaak en de contacten met huurders.');
V('Opleverdossier','In het opleverdossier van een nieuwbouwwoning staat welk merk dakpannen en kozijnen is gebruikt en hoe je de WTW-filters vervangt.');
V('Renovatie','Een flat uit 1965 krijgt nieuwe gevels, isolatie, ventilatie en badkamers, terwijl de betonnen draagconstructie blijft staan.');
V('Transformatie','Een leegstaand kantoor uit 1980 wordt omgebouwd tot 60 appartementen.');
V('Restauratie','De houten kozijnen van een monumentaal grachtenpand worden hersteld met hetzelfde profiel en dezelfde houtsoort.');
V('Herbestemming','Een oude kerk wordt een boekhandel, met behoud van het gewelf en de glas-in-loodramen.');
V('Rijksmonument','Het Rietveld Schröderhuis en veel grachtenpanden in Amsterdam zijn rijksmonument.');
V('Rechtens verkregen niveau','Een oude woning heeft een verdiepingshoogte van 2,4 m; bij een verbouwing hoeft die niet naar 2,6 m, zolang je niet onder de 2,4 m komt.');
V('Bouwhistorisch onderzoek','Uit bouwhistorisch onderzoek blijkt dat achter het stucwerk nog een originele 17e-eeuwse balklaag zit.');
V('Asbest','In een woning uit 1975 zit asbest in de golfplaten van de schuur en mogelijk in de vensterbanken; die worden eerst door een gecertificeerd bedrijf verwijderd.','Nooit zelf zagen, boren of breken in materiaal waarvan je vermoedt dat er asbest in zit.');
V('Na-isolatie','Een woning uit 1960 met een lege spouw krijgt via kleine gaatjes in de voegen isolatiekorrels in de spouw geblazen.');
V('Slopen en circulair demonteren','Voordat een kantoor wordt gesloopt, worden de kozijnen, de systeemplafonds en de stalen trappen gedemonteerd voor hergebruik.');
V('Betonrot','De onderkant van een galerijvloer uit 1970 brokkelt af; de roestige wapening wordt schoongemaakt, behandeld en het beton hersteld.');
V('Houtrot','De onderdorpel van een houten kozijn is zacht als je er met een schroevendraaier in prikt: houtrot.');
V('Paalrot','In een oude Amsterdamse straat zakken huizen scheef omdat de houten palen boven de gezakte grondwaterstand zijn gaan rotten.');
V('Zettingsscheur','Een schuine scheur van 5 mm breed door de voegen van een gevel, die boven bij het raam het breedst is.');
V('Krimpscheur','Fijne haarscheurtjes in een nieuwe dekvloer of in vers stucwerk, die niet verder groeien.');
V('Scheefstand','Een deur in een oud pand sluit niet meer omdat de muur 3 cm uit het lood staat.');
V('Vochtplek','Een bruine kring op het plafond onder de badkamer wijst op een lekkende afvoer of slechte kitvoegen.');
V('Uitbloei','Een nieuwe baksteengevel krijgt na de eerste natte maanden een witte waas, die na een jaar of twee verdwijnt.');
V('Vorstschade','Na een strenge winter zijn bij een tuinmuur de buitenkanten van de stenen afgesprongen.');
V('Lekkage','Water lekt op het plafond van de woonkamer; de oorzaak blijkt een losgeraakte dakbedekking 2 m verderop bij de dakrand.');
// ---- stedenbouw ----
V('Stedenbouw','De stedenbouwkundige van een nieuwe wijk bepaalt waar de hoofdweg, het park, de school en de woonstraten komen.');
V('Openbare ruimte','Een plein met bomen, bankjes en een speelplaats is openbare ruimte.');
V('Verkaveling','In een nieuwbouwwijk zijn de kavels zo verkaveld dat alle tuinen op het zuiden of westen liggen.');
V('Bouwblok','In een negentiende-eeuwse wijk vormen de woningen gesloten bouwblokken met tuinen aan de binnenkant.');
V('Kavel','Een kavel van 12 × 30 m = 360 m² wordt verkocht aan iemand die er zelf een woning op laat bouwen.');
V('Bouwvlak','Op een kavel van 30 m diep mag alleen binnen een bouwvlak van 12 m diep aan de straatkant een woning worden gebouwd.');
V('Functiemenging','In een stadswijk zitten winkels op de begane grond, kantoren op de eerste laag en woningen erboven.');
V('Mobiliteit','Een nieuwe woonwijk bij een station krijgt brede fietspaden en weinig parkeerplaatsen.');
V('Parkeernorm','Bij een appartementencomplex van 50 woningen met een parkeernorm van 1,2 moeten 60 parkeerplaatsen worden aangelegd.');
V('Groenstructuur','Een lange groene zone met water en bomen verbindt het park in het centrum met het buitengebied.');
V('Woningdichtheid','Een vinexwijk heeft ongeveer 30–35 woningen per hectare; een binnenstedelijk appartementencomplex soms meer dan 150.');
V('FSI (bebouwingsintensiteit)','Een kavel van 2000 m² met een gebouw van 4 lagen van 500 m² (samen 2000 m²) heeft een FSI van 1.');
V('GSI (bebouwingsgraad)','Datzelfde gebouw beslaat 500 m² van de 2000 m² grond: GSI = 0,25.');
V('Hectare','Een voetbalveld is ongeveer 0,7 ha; een hectare is 100 × 100 m.');
V('Bruto en netto plangebied','Een wijk van 20 ha bruto heeft na aftrek van wegen, groen en water ongeveer 12 ha netto kavels.');
V('Bouwhoogte','Het omgevingsplan staat een bouwhoogte van 12 m toe; de nok van een nieuwe woning komt op 11,5 m.');
V('Goothoogte','In een straat met een maximale goothoogte van 6 m kan een woning twee lagen plus een kap krijgen.');
V('Erfgrens','Een raam in een zijgevel op minder dan 2 m van de erfgrens van de buren mag volgens het burenrecht alleen met toestemming.');
V('Zonlichttoetreding','Een nieuwe toren van 40 m mag de tuinen van bestaande rijwoningen ten noorden ervan niet de hele middag in de schaduw zetten.');
V('Bezonningsstudie','Een bezonningsstudie toont de schaduw van een nieuw gebouw op 21 maart, 21 juni en 21 december om 9, 12 en 15 uur.');
// koppelen
Object.values(TERMS).forEach(ch=>Object.values(ch).forEach(list=>list.forEach(e=>{if(TV[e[0]])e[3]=TV[e[0]];if(TL[e[0]])e[4]=TL[e[0]]})));

// extra 'let op' bij begrippen die vaak verward worden
Object.assign(TL,{
'Poer':'Een poer is een blok onder een kolom; een funderingsbalk is langwerpig onder een muur.',
'Maaiveld':'Maaiveld is het terrein; peil is de vloer van het gebouw. Op tekening staat het maaiveld vaak op bijv. −0.200.',
'Kanaalplaatvloer':'Boren of zagen in een kanaalplaat mag alleen in overleg: je kunt de voorspanstrengen raken.',
'Luchtspouw':'De luchtspouw is níet de isolatie: het is de open ruimte tussen isolatie en buitenblad.',
'Latei':'Een latei draagt de muur boven een opening; een waterslag zit onder een raam.',
'Dilatatievoeg':'Een dilatatievoeg is een bewuste, flexibele voeg; een scheur is een ongewenste.',
'Gording':'Een gording loopt evenwijdig aan de nok (in de lengte); een spoor of spant loopt van nok naar goot.',
'Panlat':'Panlatten liggen horizontaal en dragen de pannen; tengels liggen eronder, van nok naar goot.',
'Onderdorpel':'Onderdorpel = onderkant van het kozijn; vensterbank = afwerking aan de binnenkant.',
'Negge':'Negge is de terugligging van het kozijn; borstwering is de muur onder het raam.',
'Stucwerk':'Stucwerk is een afwerklaag op een wand; spachtelputz is een grove variant met structuur.',
'Situatietekening':'Een situatietekening toont de omgeving van het gebouw, niet de indeling erbinnen.',
'Bestektekening':'Een bestektekening is van de ontwerper; een werktekening is van de uitvoerende partij.',
'Werktekening':'Een werktekening wordt gecontroleerd door de architect, maar de maker blijft verantwoordelijk voor de maten.',
'Stramien':'Stramienmaten zijn hart-op-hartmaten, geen binnenmaten tussen wanden.',
'Isometrie':'In isometrie blijven maten langs de assen op ware grootte; in perspectief niet.',
'Wapening':'Wapening neemt trek op; beton neemt druk op. Zonder wapening scheurt beton aan de trekzijde.',
'Prefab beton':'Prefab is niet automatisch beter: aansluitingen en toleranties tussen elementen vragen extra aandacht.',
'S235':'Het getal (235) is de vloeigrens in N/mm², niet de profielhoogte.',
'HE-profiel':'Een HE-profiel is breed (flens ≈ hoogte); een IPE is smal en hoog.',
'Loofhout':'Loofhout is niet altijd hardhout: balsa is ook loofhout, maar heel zacht.',
'Gelamineerd hout':'Gelamineerd hout (glulam) is een balk; CLT is een plaat met kruislings verlijmde lagen.',
'Kalkzandsteen':'Kalkzandsteen is geen baksteen: het wordt niet gebakken, maar onder stoomdruk verhard.',
'Cellenbeton':'Cellenbeton isoleert beter, maar is minder geschikt voor zware dragende wanden en geluidsscheidingen.',
'EPS':'EPS en XPS lijken op elkaar, maar XPS is drukvaster en neemt veel minder water op.',
'XPS':'Gebruik onder de grond of op een omgekeerd dak XPS, geen EPS.',
'Waterkerende dampopen folie':'Deze folie hoort aan de buitenkant; een dampremmende folie aan de binnenkant. Omgedraaid geeft vochtproblemen.',
'Consistentieklasse':'Vloeibaarder beton (hogere S-klasse) is niet zwakker, zolang het met hulpstoffen en niet met extra water wordt bereikt.',
'Milieuklasse':'Milieuklasse gaat over de omgeving en duurzaamheid; sterkteklasse over hoeveel het beton kan dragen.',
'Kubusdruksterkte':'In C30/37 is 30 de cilindersterkte en 37 de kubussterkte; constructeurs rekenen met de eerste.',
'Gelaagd glas':'Gelaagd glas blijft heel na breuk (folie); gehard glas valt uiteen in korrels.',
'Zink':'Zink en koper niet zomaar combineren: water van een koperen dak tast een zinken goot aan.',
'Paalfundering':'Een paal draagt door de punt (stuit) en door wrijving langs de schacht; in slappe lagen kan wrijving juist negatief werken.',
'Sondering':'Een sondering geeft de weerstand van de grond, geen grondmonster; daarvoor is een boring nodig.',
'Tunnelbouw':'Tunnelbouw en gietbouw zijn allebei in het werk gestort; bij tunnelbouw gaan wanden en vloer in één keer.',
'Casco':'Casco betekent zonder afwerking, niet zonder installaties: leidingen en aansluitpunten zitten er meestal wel in.',
'Warm dak':'Een "warm dak" is geen dak dat warm wordt: de constructie ligt aan de warme kant van de isolatie.',
'Groen dak':'Controleer altijd of de dakconstructie het extra (natte) gewicht van een groen dak kan dragen.',
'Bemaling':'Voor bemaling is vaak een melding of vergunning nodig bij het waterschap.',
'Zetting':'Zetting is een langzaam proces: soms nog jaren na de bouw.',
'Voorlopig ontwerp':'VO en DO verschillen in detail: in het VO kan nog veel veranderen, in het DO ligt het ontwerp vast.',
'Aanbesteding':'De laagste prijs is niet altijd de beste keuze; let ook op kwaliteit en risico’s.',
'Architect':'De architect is niet automatisch verantwoordelijk voor de constructie; dat is de constructeur.',
'Uitvoerder':'Uitvoerder (op de bouwplaats) en werkvoorbereider (op kantoor, vooraf) zijn verschillende rollen.',
'Kwaliteitsborger':'De kwaliteitsborger is onafhankelijk: niet in dienst van aannemer of opdrachtgever voor het bouwen zelf.',
'Meerwerk':'Meerwerk zonder schriftelijke afspraak leidt vaak tot discussie bij de eindafrekening.',
'Stelpost':'Een stelpost is geen exacte prijs maar een schatting die achteraf wordt verrekend.',
'Bbl':'Het Bbl vervangt het Bouwbesluit 2012; oude bronnen met "Bouwbesluit" kloppen inhoudelijk vaak nog, maar de artikelnummers niet.',
'Omgevingsplan':'Het omgevingsplan gaat over waar en wat (ruimtelijk); het Bbl over hoe (technisch).',
'Welstand':'Welstand gaat over uiterlijk, niet over veiligheid of techniek.',
'BENG 2':'BENG 2 kan negatief worden als een woning meer duurzaam opwekt dan ze fossiel gebruikt.',
'Verblijfsgebied':'Verblijfsgebied is het geheel van verblijfsruimten (plus wat ruimte eromheen); de gang telt niet mee.',
'BVO':'BVO (buitenwerks) is altijd groter dan GO (binnenwerks); vergelijk prijzen per m² dus met dezelfde maat.',
'Ritme':'Ritme gaat over herhaling; proportie over verhoudingen.',
'Maquette':'Een maquette op schaal 1:200 toont massa en context, geen details.',
'Wederopbouw':'Wederopbouw is een periode (na 1945), geen stijl met vaste kenmerken; er werd zowel traditioneel als modern gebouwd.',
'Render':'Een render is een presentatiebeeld, geen bouwtekening; maten haal je er niet uit.',
'IFC':'IFC is een uitwisselformaat, geen tekenprogramma.',
'Clashcontrole':'Een clashcontrole werkt alleen als alle partijen hun model goed en actueel aanleveren.',
'Circulair bouwen':'Recyclen is het laagste niveau van circulair; hergebruik van hele onderdelen is beter.',
'Warmtepomp':'Een warmtepomp werkt slecht in een slecht geïsoleerde woning met kleine radiatoren.',
'Zonwering':'Binnenzonwering houdt licht tegen, maar de warmte is dan al binnen.',
'Kierdichting':'Dichtmaken zonder goede ventilatie geeft vochtproblemen en slechte lucht.',
'Wadi':'Een wadi is meestal droog en alleen na een bui tijdelijk nat; het is geen vijver.',
'Ligger':'Een ligger ligt horizontaal (buiging); een kolom staat verticaal (druk).',
'Scharnier':'Een scharnier in de constructie betekent niet dat iets kan bewegen zoals een deur; het kan alleen een klein beetje roteren.',
'Uitkraging':'Bij een uitkraging zit de wapening bovenin, niet onderin zoals bij een gewone vloer.',
'Puntlast':'Een puntlast is in kN; een lijnlast in kN/m; een vlaklast in kN/m².',
'Belastingfactor':'Belastingfactoren gebruik je voor sterkte; voor doorbuiging reken je meestal zonder.',
'Knik':'Knik hangt sterk af van de lengte: een twee keer zo lange kolom knikt al bij een kwart van de kracht.',
'Schijfwerking':'Losse houten planken zonder koppeling vormen geen schijf.',
'Waterkering':'Een waterkering moet water van boven naar beneden en van binnen naar buiten leiden, met overlappen in die richting.',
'Optrekkend vocht':'Optrekkend vocht komt van onderen (tot ca. 1 m); doorslaand vocht van opzij (regen).',
'Oppervlaktecondensatie':'Condens is geen lekkage: de oplossing is ventileren en isoleren, niet kitten.',
'Kritiek pad':'Het kritieke pad kan veranderen als andere activiteiten uitlopen.',
'Valbeveiliging':'Een harnas is de laatste optie; eerst collectieve maatregelen zoals hekken en steigers.',
'Directe kosten':'Directe kosten zijn niet hetzelfde als materiaalkosten: arbeid en materieel horen er ook bij.',
'Aanneemsom':'Controleer altijd of een aanneemsom inclusief of exclusief btw is.',
'Brandwerendheid':'Brandwerendheid (hoe lang een constructie het houdt) is iets anders dan brandklasse (hoe brandbaar een materiaal is).',
'Euroklassen':'Een onbrandbaar materiaal (A1) kan toch onveilig zijn als het snel bezwijkt bij hitte, zoals onbeschermd staal.',
'Vrije doorgang':'De vrije doorgang is kleiner dan de kozijnmaat en de deurbreedte.',
'Ventilatiesysteem C':'Bij systeem C komt de verse lucht via roosters; als bewoners die dichtzetten, werkt het systeem niet goed.',
'COP':'De COP daalt als de buitenlucht kouder is of als de verwarming een hogere watertemperatuur vraagt.',
'Afschot':'1% afschot = 10 mm per meter, niet 1 mm.',
'Groepenkast':'Meer groepen betekent niet meer vermogen voor de hele woning: dat bepaalt de hoofdaansluiting.',
'Decibel (dB)':'Decibellen tel je niet gewoon op: 60 dB + 60 dB = 63 dB.',
'Geluidabsorptie':'Absorptie (in de ruimte zelf) is niet hetzelfde als isolatie (tussen ruimtes).',
'Dauwpunt':'Het dauwpunt is een temperatuur, geen vochtigheid.',
'Restauratie':'Restauratie (terug naar origineel) is iets anders dan renovatie (verbeteren en vernieuwen).',
'Transformatie':'Bij transformatie gelden de eisen van de nieuwe functie, bijvoorbeeld voor daglicht en geluid bij wonen.',
'Uitbloei':'Uitbloei is meestal onschuldig, maar langdurige uitbloei kan wijzen op een vochtprobleem.',
'Krimpscheur':'Krimpscheuren zijn meestal fijn en stabiel; zettingsscheuren groeien en lopen vaak schuin.',
'FSI (bebouwingsintensiteit)':'FSI kan groter zijn dan 1; GSI nooit.',
'Bouwhoogte':'Bouwhoogte (hoogste punt) en goothoogte (dakrand of goot) zijn twee verschillende maten in het omgevingsplan.',
'Kavel':'Een kavel is grond; een bouwvlak is het deel van die grond waar je mag bouwen.'
});
Object.values(TERMS).forEach(ch=>Object.values(ch).forEach(list=>list.forEach(e=>{if(!e[4]&&TL[e[0]])e[4]=TL[e[0]]})));

// ================= MODULES, UITLEG, FORMULES =================
const ex=(t,body)=>`<div class="example"><div class="ex-label">${t}</div>${body}</div>`;
const pit=t=>`<div class="pitfall"><span class="pf-label">Valkuil</span> ${t}</div>`;
const MODS=[
{id:'rekenen',code:'W-01',name:'Rekenvaardigheid',blurb:'Volgorde van bewerkingen, negatieve getallen, breuken en procenten. De basis onder alles wat volgt.',
 subs:[{id:'volgorde',name:'Volgorde van bewerkingen',gen:genVolgorde},{id:'negatief',name:'Negatieve getallen',gen:genNegatief},{id:'breuken',name:'Breuken',gen:genBreuken},{id:'procent',name:'Procenten & btw',gen:genProcent}],
 theory:[
  {t:'Volgorde van bewerkingen',sub:'volgorde',h:`<p>Een berekening reken je altijd in een vaste volgorde uit. Het ezelsbruggetje is <b>Hoe Meneer Van Dale Wacht Op Antwoord</b>:</p>
  <ol class="mnemonic"><li><b>H</b>aakjes</li><li><b>M</b>achten en wortels</li><li><b>V</b>ermenigvuldigen en <b>D</b>elen, van links naar rechts</li><li><b>O</b>ptellen en <b>A</b>ftrekken, van links naar rechts</li></ol>
  ${ex('Voorbeeld',`<p class="calcline">18 − 3 × (7 − 4)² ÷ 9</p><p class="calcline">= 18 − 3 × 3² ÷ 9 = 18 − 3 × 9 ÷ 9 = 18 − 27 ÷ 9 = 18 − 3 = <b>15</b></p>`)}
  ${pit('12 ÷ 3 × 2 = 8 en niet 2. Vermenigvuldigen en delen zijn gelijkwaardig: je werkt ze van links naar rechts af.')}`},
  {t:'Negatieve getallen',sub:'negatief',h:`<p>Bij optellen en aftrekken helpt een getallenlijn. <b>Min min wordt plus</b>: 5 − (−3) = 5 + 3 = 8.</p>
  <p>Bij vermenigvuldigen en delen kijk je naar de tekens:</p>
  <div class="tblwrap"><table class="rtab"><tr><th></th><th>×/÷ plus</th><th>×/÷ min</th></tr><tr><th>plus</th><td>plus</td><td>min</td></tr><tr><th>min</th><td>min</td><td>plus</td></tr></table></div>
  ${pit('−3² = −9, maar (−3)² = 9. Zonder haakjes hoort het minteken niet bij de macht. Een rekenmachine doet dit ook zo!')}`},
  {t:'Breuken',sub:'breuken',h:`<ul class="rules"><li><b>Optellen/aftrekken:</b> maak eerst gelijknamig. ${F(1,4)} + ${F(2,3)} = ${F(3,12)} + ${F(8,12)} = ${F(11,12)}</li>
  <li><b>Vermenigvuldigen:</b> teller × teller, noemer × noemer. ${F(2,3)} × ${F(3,5)} = ${F(6,15)} = ${F(2,5)}</li>
  <li><b>Delen:</b> vermenigvuldig met het omgekeerde. ${F(3,4)} ÷ ${F(1,2)} = ${F(3,4)} × ${F(2,1)} = ${F(6,4)} = ${F(3,2)}</li>
  <li><b>Vereenvoudigen:</b> deel teller en noemer door hun grootste gemeenschappelijke deler.</li>
  <li><b>Gemengd getal:</b> 2${F(1,3)} = ${F(7,3)} (2 × 3 + 1 = 7).</li></ul>
  <p>In de bouw kom je breuken tegen bij verhoudingen, hellingen (1:50) en mengsels.</p>`},
  {t:'Procenten, groeifactor en btw',sub:'procent',h:`<p>Procent betekent "per honderd". 1% van een getal is dat getal gedeeld door 100.</p>
  <p>Handiger is rekenen met de <b>groeifactor</b>: bij +p% vermenigvuldig je met 1 + p/100, bij −p% met 1 − p/100.</p>
  <div class="formula-box">procentuele verandering = ${Fh('nieuw − oud','oud')} × 100%</div>
  ${ex('Voorbeeld btw',`<p>Bedrag exclusief € 800, btw 21%: inclusief = 800 × 1,21 = <b>€ 968</b>.</p><p>Terug: € 968 ÷ 1,21 = € 800. Niet 968 − 21% (dat geeft € 764,72).</p>`)}
  ${pit('Twee procentuele veranderingen achter elkaar mag je niet optellen. +20% en daarna −20% geeft 1,2 × 0,8 = 0,96, dus 4% minder.')}`}
 ],
 formulas:[['Volgorde','H · M · V/D · O/A'],['Groeifactor','g = 1 + p/100'],['Procentuele verandering',`${Fh('nieuw − oud','oud')} × 100%`],['Inclusief 21% btw','× 1,21'],['Delen door breuk',`${Fh('a','b')} ÷ ${Fh('c','d')} = ${Fh('a','b')} × ${Fh('d','c')}`]]},

{id:'machten',code:'W-02',name:'Machten en wortels',blurb:'Rekenregels voor machten, wortels en de wetenschappelijke notatie die je terugziet bij materiaalconstanten.',
 subs:[{id:'waarde',name:'Machten berekenen',gen:genMachtwaarde},{id:'regels',name:'Rekenregels',gen:genRekenregels},{id:'wortels',name:'Wortels',gen:genWortels},{id:'wetnot',name:'Wetenschappelijke notatie',gen:genWetnot}],
 theory:[
  {t:'Wat is een macht?',sub:'waarde',h:`<p>a${sup('n')} betekent: a, n keer met zichzelf vermenigvuldigd. 2${sup(5)} = 2 × 2 × 2 × 2 × 2 = 32. Het getal a is het <b>grondtal</b>, n de <b>exponent</b>.</p>
  <ul class="rules"><li>a${sup(0)} = 1 (voor a ≠ 0)</li><li>a${sup('−n')} = ${Fh(1,'a'+sup('n'))}, dus 10${sup('−3')} = 0,001</li><li>a${sup('1/n')} = ⁿ√a, dus 8${sup('1/3')} = 2</li></ul>
  <p>Je ziet machten overal: m² en m³, maar ook in formules als M = ⅛qL².</p>`},
  {t:'Rekenregels',sub:'regels',h:`<div class="formula-grid"><div>a${sup('p')} · a${sup('q')} = a${sup('p+q')}</div><div>${Fh('a'+sup('p'),'a'+sup('q'))} = a${sup('p−q')}</div><div>(a${sup('p')})${sup('q')} = a${sup('p·q')}</div><div>(a · b)${sup('n')} = a${sup('n')} · b${sup('n')}</div></div>
  ${ex('Voorbeeld',`<p>x${sup(3)} · x${sup(5)} = x${sup(8)} &nbsp;·&nbsp; (x${sup(2)})${sup(4)} = x${sup(8)} &nbsp;·&nbsp; ${Fh('x'+sup(7),'x'+sup(2))} = x${sup(5)}</p>`)}
  ${pit('a² + a³ is géén a⁵. De rekenregels gelden alleen voor vermenigvuldigen en delen van machten met hetzelfde grondtal.')}`},
  {t:'Wortels',sub:'wortels',h:`<p>√a is het positieve getal dat met zichzelf vermenigvuldigd a geeft. √49 = 7. Een wortel is een macht met exponent ½.</p>
  <ul class="rules"><li>√a · √b = √(a · b)</li><li>√(a²) = a (voor a ≥ 0)</li><li>Vereenvoudigen: √72 = √(36 · 2) = 6√2</li></ul>
  ${pit('√(a² + b²) is níet a + b. √(9 + 16) = √25 = 5, terwijl 3 + 4 = 7. Dit is precies waarom je Pythagoras nodig hebt.')}`},
  {t:'Wetenschappelijke notatie',sub:'wetnot',h:`<p>Heel grote en heel kleine getallen schrijf je als <b>c × 10${sup('n')}</b> met 1 ≤ c &lt; 10.</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Grootheid</th><th>Waarde</th><th>Notatie</th></tr><tr><td>E-modulus staal</td><td>210 000 N/mm²</td><td>2,1 × 10${sup(5)} N/mm²</td></tr><tr><td>Uitzettingscoëfficiënt staal</td><td>0,000012 per K</td><td>1,2 × 10${sup('−5')} /K</td></tr><tr><td>1 mm² in m²</td><td>0,000001 m²</td><td>1 × 10${sup('−6')} m²</td></tr></table></div>
  <p>Op een rekenmachine voer je dit in met de toets <b>EXP</b> of <b>×10ˣ</b>. In de rekenmachine van deze app typ je <span class="mono">2.1*10^5</span>.</p>`}
 ],
 formulas:[['Product',`a${sup('p')} · a${sup('q')} = a${sup('p+q')}`],['Quotiënt',`a${sup('p')} / a${sup('q')} = a${sup('p−q')}`],['Macht van macht',`(a${sup('p')})${sup('q')} = a${sup('pq')}`],['Negatieve exponent',`a${sup('−n')} = 1 / a${sup('n')}`],['Wortel als macht',`√a = a${sup('½')}`],['Wetenschappelijke notatie',`c × 10${sup('n')}, 1 ≤ c &lt; 10`]]},

{id:'eenheden',code:'W-03',name:'Eenheden omrekenen',blurb:'mm, m², m³, liters, kN en N/mm². Tekeningen zijn in mm, berekeningen in m: hier gaat het vaak mis.',
 subs:[{id:'lengte',name:'Lengte',gen:genLengte},{id:'opp',name:'Oppervlakte',gen:genOppervlak},{id:'inhoud',name:'Inhoud',gen:genInhoud},{id:'massa',name:'Massa en kracht',gen:genMassa},{id:'spanning',name:'Spanning en druk',gen:genSpanningEenh}],
 theory:[
  {t:'Voorvoegsels',sub:'lengte',h:`<div class="tblwrap"><table class="rtab"><tr><th>Voorvoegsel</th><th>Symbool</th><th>Factor</th><th>Voorbeeld</th></tr><tr><td>giga</td><td>G</td><td>10${sup(9)}</td><td>GPa</td></tr><tr><td>mega</td><td>M</td><td>10${sup(6)}</td><td>MPa</td></tr><tr><td>kilo</td><td>k</td><td>10${sup(3)}</td><td>kN, km</td></tr><tr><td>deci</td><td>d</td><td>10${sup('−1')}</td><td>dm</td></tr><tr><td>centi</td><td>c</td><td>10${sup('−2')}</td><td>cm</td></tr><tr><td>milli</td><td>m</td><td>10${sup('−3')}</td><td>mm</td></tr></table></div>
  <p>Lengte-trapje: km → m: ×1000, m → dm → cm → mm: telkens ×10. Naar een grotere eenheid deel je.</p>
  <p>Op bouwtekeningen staan maten standaard in <b>millimeters</b> zonder eenheid erbij. Een maat "3600" is dus 3,6 m.</p>`},
  {t:'Oppervlakte en inhoud',sub:'opp',h:`<p>Omdat oppervlakte lengte × lengte is, wordt de omrekenfactor <b>gekwadrateerd</b>. Bij inhoud wordt hij <b>tot de derde macht</b> verheven.</p>
  <div class="formula-grid"><div>1 m² = 100 dm² = 10 000 cm² = 1 000 000 mm²</div><div>1 m³ = 1000 dm³ = 1000 L</div><div>1 dm³ = 1 L</div><div>1 cm³ = 1 mL</div><div>1 ha = 10 000 m²</div></div>
  ${ex('Voorbeeld',`<p>Een plaat van 2400 × 1200 mm = 2,4 × 1,2 m = <b>2,88 m²</b>.</p><p>Fout: 2400 × 1200 = 2 880 000 mm² en dan ÷ 1000 = 2880 m². De factor moet 1 000 000 zijn.</p>`)}
  ${pit('Reken maten eerst om naar meters en vermenigvuldig daarna. Dan kan de factor niet misgaan.')}`},
  {t:'Massa, gewicht en kracht',sub:'massa',h:`<p>Massa (kg) is iets anders dan kracht (N). De zwaartekracht op een massa is <b>F = m · g</b>. In de bouwpraktijk reken je vaak met g ≈ 10 N/kg (exact 9,81). In deze app gebruiken we 10.</p>
  <ul class="rules"><li>1 kN = 1000 N ≈ het gewicht van 100 kg</li><li>Beton: volumieke massa 2400 kg/m³ → volumiek gewicht 24 kN/m³</li><li>Staal: 7850 kg/m³ → ca. 78,5 kN/m³</li><li>Naaldhout: ca. 500 kg/m³ → ca. 5 kN/m³</li></ul>`},
  {t:'Spanning en druk',sub:'spanning',h:`<p>Spanning is kracht per oppervlakte. In de constructieleer gebruik je bijna altijd <b>N/mm²</b>, wat gelijk is aan MPa.</p>
  <div class="formula-grid"><div>1 N/mm² = 1 MPa</div><div>1 N/mm² = 1000 kN/m²</div><div>1 kN/m² = 1 kPa</div><div>1 kN/mm² = 1 GPa = 1000 N/mm²</div></div>
  <p>Belastingen op vloeren geef je in kN/m² (bijvoorbeeld 1,75 kN/m² voor een woningvloer), spanningen in materialen in N/mm².</p>`}
 ],
 formulas:[['Oppervlakte',`1 m² = 10${sup(6)} mm²`],['Inhoud',`1 m³ = 1000 L = 10${sup(9)} mm³`],['Liter','1 L = 1 dm³'],['Gewicht','F = m · g (g ≈ 10 N/kg)'],['Spanning','1 N/mm² = 1 MPa = 1000 kN/m²'],['Beton','24 kN/m³']]},

{id:'algebra',code:'W-04',name:'Algebra en formules',blurb:'Haakjes wegwerken, vergelijkingen oplossen en formules omwerken. Dagelijkse kost in mechanica en bouwfysica.',
 subs:[{id:'haakjes',name:'Haakjes wegwerken',gen:genHaakjes},{id:'verg',name:'Vergelijkingen oplossen',gen:genVergelijking},{id:'invullen',name:'Formules invullen',gen:genInvullen},{id:'omwerken',name:'Formules omwerken',gen:genOmwerken}],
 theory:[
  {t:'Haakjes wegwerken',sub:'haakjes',h:`<ul class="rules"><li>a(b + c) = ab + ac</li><li>−(a − b) = −a + b</li><li>(a + b)(c + d) = ac + ad + bc + bd</li></ul>
  <p><b>Merkwaardige producten</b> komen zo vaak voor dat je ze uit je hoofd moet kennen:</p>
  <div class="formula-grid"><div>(a + b)² = a² + 2ab + b²</div><div>(a − b)² = a² − 2ab + b²</div><div>(a + b)(a − b) = a² − b²</div></div>
  ${pit('(x + 3)² is níet x² + 9. Je mist dan de middelste term 6x.')}`},
  {t:'Vergelijkingen: de balansmethode',sub:'verg',h:`<p>Een vergelijking is een balans. Zolang je links en rechts precies hetzelfde doet, blijft hij in evenwicht.</p>
  ${ex('Voorbeeld',`<p class="calcline">5x − 7 = 2x + 8</p><p class="calcline">5x − 2x − 7 = 8 &nbsp;&nbsp;<span class="muted">(−2x aan beide kanten)</span></p><p class="calcline">3x = 15 &nbsp;&nbsp;<span class="muted">(+7 aan beide kanten)</span></p><p class="calcline">x = 5 &nbsp;&nbsp;<span class="muted">(÷3 aan beide kanten)</span></p>`)}
  <p>Controleer altijd door je antwoord in te vullen: 5 × 5 − 7 = 18 en 2 × 5 + 8 = 18 ✓</p>`},
  {t:'Formules invullen',sub:'invullen',h:`<p>Een formule invullen gaat in drie stappen:</p><ol class="steps plain"><li>Schrijf de formule op.</li><li>Zet alle gegevens in passende eenheden (meestal m, kN of N en mm).</li><li>Vul in en reken uit in de juiste volgorde.</li></ol>
  ${ex('Voorbeeld',`<p>σ = F / A met F = 120 kN en een kolom van 200 × 200 mm.</p><p>F = 120 000 N, A = 40 000 mm² → σ = 120 000 / 40 000 = <b>3 N/mm²</b></p>`)}`},
  {t:'Formules omwerken',sub:'omwerken',h:`<p>Je wilt een andere grootheid vrij maken. Pak de bewerkingen rond die grootheid één voor één af met de <b>omgekeerde bewerking</b>, in omgekeerde volgorde.</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Bewerking</th><th>Omgekeerd</th></tr><tr><td>+</td><td>−</td></tr><tr><td>×</td><td>÷</td></tr><tr><td>kwadraat</td><td>wortel</td></tr><tr><td>1 / …</td><td>1 / …</td></tr></table></div>
  ${ex('Voorbeeld',`<p>M = ${Fh('qL²','8')} → 8M = qL² → ${Fh('8M','q')} = L² → L = √(${Fh('8M','q')})</p>`)}
  <p>Truc: test je omgewerkte formule met makkelijke getallen. Vul bijvoorbeeld 2 = 6 / 3 in bij σ = F/A en kijk of A = F/σ klopt: 6/2 = 3 ✓</p>`}
 ],
 formulas:[['Distributief','a(b + c) = ab + ac'],['Kwadraat som','(a + b)² = a² + 2ab + b²'],['Kwadraat verschil','(a − b)² = a² − 2ab + b²'],['Somverschil','(a + b)(a − b) = a² − b²']]},

{id:'lineair',code:'W-05',name:'Lineaire verbanden en hellingen',blurb:'Rechte lijnen, richtingscoëfficiënt, afschot van daken en riolering, en trappen berekenen.',
 subs:[{id:'rc',name:'Richtingscoëfficiënt',gen:genRc},{id:'formule',name:'Lineaire formules',gen:genLinFormule},{id:'afschot',name:'Afschot',gen:genAfschot},{id:'trap',name:'Trappen',gen:genTrap}],
 theory:[
  {t:'De formule y = ax + b',sub:'formule',h:`<p>Een lineair verband geeft een rechte lijn. <b>a</b> is de richtingscoëfficiënt (hoeveel y verandert als x één stap toeneemt), <b>b</b> is het startgetal (de waarde bij x = 0).</p>
  ${ex('Voorbeeld',`<p>Steigerhuur K = 85d + 250: elke dag kost € 85 extra, € 250 is een vast bedrag (opbouw en afbouw).</p>`)}
  <p>Het snijpunt van twee lijnen vind je door de formules gelijk te stellen.</p>`},
  {t:'Richtingscoëfficiënt uit twee punten',sub:'rc',h:`<div class="formula-box">a = ${Fh('Δy','Δx')} = ${Fh('y₂ − y₁','x₂ − x₁')}</div><p>Daarna vind je b door één punt in te vullen: b = y₁ − a · x₁.</p>
  ${pit('Haal Δy en Δx in dezelfde volgorde: (y₂ − y₁)/(x₂ − x₁). Anders krijg je het verkeerde teken.')}`},
  {t:'Afschot en hellingen',sub:'afschot',h:`<p>Een helling (afschot) is een richtingscoëfficiënt in de praktijk. Je kunt hem op drie manieren schrijven:</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Procent</th><th>mm per m</th><th>Verhouding</th><th>Toepassing</th></tr><tr><td>1,6%</td><td>16 mm/m</td><td>±1 : 62</td><td>plat dak (veelgebruikt minimum)</td></tr><tr><td>1%</td><td>10 mm/m</td><td>1 : 100</td><td>vuilwaterriool</td></tr><tr><td>0,5%</td><td>5 mm/m</td><td>1 : 200</td><td>grote rioolbuizen</td></tr></table></div>
  <div class="formula-box">afschot (%) = ${Fh('hoogteverschil','horizontale lengte')} × 100%</div>
  ${pit('Zet hoogte en lengte in dezelfde eenheid. 120 mm over 8 m is 120/8000 = 1,5%, niet 15%.')}`},
  {t:'Trappen',sub:'trap',h:`<p>Een trap overbrugt de verdiepingshoogte (bovenkant vloer tot bovenkant vloer) met een aantal <b>optredes</b> (o, de hoogte van een stap). De <b>aantrede</b> (a) is de diepte van een stap.</p>
  <ul class="rules"><li>optrede = verdiepingshoogte ÷ aantal optredes</li><li>Eis voor een woningtrap: optrede ≤ 188 mm en aantrede ≥ 220 mm</li><li>Comfortabele trap volgens de stapmaatregel: 2o + a ≈ 570 tot 630 mm</li><li>Het aantal aantredes is één minder dan het aantal optredes (de bovenste stap is de vloer)</li></ul>
  ${ex('Voorbeeld',`<p>Hoogte 2700 mm, max. 188 mm: 2700 / 188 = 14,4 → <b>15 optredes</b> van 180 mm. Aantrede volgens 2o + a = 630: a = 630 − 360 = 270 mm.</p>`)}`}
 ],
 formulas:[['Lijn','y = ax + b'],['Richtingscoëfficiënt',`a = ${Fh('y₂ − y₁','x₂ − x₁')}`],['Afschot',`% = ${Fh('Δh','L')} × 100`],['Optrede','o = h / n'],['Stapmaat','2o + a ≈ 630 mm']]},

{id:'meetkunde',code:'W-06',name:'Meetkunde',blurb:'Oppervlakte, omtrek en inhoud van bouwdelen, en de stelling van Pythagoras voor haaksheid en diagonalen.',
 subs:[{id:'opp',name:'Oppervlakte',gen:genOpp},{id:'omtrek',name:'Omtrek',gen:genOmtrek},{id:'inhoud',name:'Inhoud',gen:genInhoudM},{id:'pyth',name:'Pythagoras',gen:genPyth}],
 theory:[
  {t:'Oppervlakte',sub:'opp',h:`<div class="tblwrap"><table class="rtab"><tr><th>Figuur</th><th>Oppervlakte</th></tr><tr><td>Rechthoek</td><td>A = l × b</td></tr><tr><td>Driehoek</td><td>A = ½ × b × h</td></tr><tr><td>Trapezium</td><td>A = ½ × (a + b) × h</td></tr><tr><td>Cirkel</td><td>A = π × r² = ¼ × π × d²</td></tr></table></div>
  <p><b>Samengestelde figuren</b> (zoals een L-vormige plattegrond) splits je op in rechthoeken, óf je neemt de omhullende rechthoek en trekt het ontbrekende stuk af.</p>
  ${pit('Bij een driehoek is h de loodrechte hoogte, niet de schuine zijde.')}`},
  {t:'Omtrek',sub:'omtrek',h:`<ul class="rules"><li>Rechthoek: O = 2 × (l + b)</li><li>Cirkel: O = π × d = 2 × π × r</li><li>L-vorm en andere "trapvormen" met alleen rechte hoeken: de omtrek is gelijk aan die van de omhullende rechthoek</li></ul><p>Omtrek gebruik je voor plinten, kitvoegen, randisolatie en bekisting.</p>`},
  {t:'Inhoud',sub:'inhoud',h:`<p>Voor elk prisma (een vorm met overal dezelfde doorsnede) geldt: <b>V = oppervlakte grondvlak × hoogte</b>.</p>
  <ul class="rules"><li>Balk: V = l × b × h</li><li>Cilinder (ronde kolom): V = π × r² × h</li><li>Strokenfundering: V = doorsnede × totale lengte</li></ul>
  ${ex('Voorbeeld',`<p>Betonvloer 8 × 6 m, 200 mm dik: V = 8 × 6 × 0,2 = <b>9,6 m³</b>. In de praktijk bestel je iets meer.</p>`)}`},
  {t:'De stelling van Pythagoras',sub:'pyth',h:`<div class="formula-box">a² + b² = c² &nbsp;&nbsp;(c is de schuine zijde, tegenover de rechte hoek)</div>
  <p>Toepassingen: diagonalen, lengte van dakspanten, ladders en het <b>haaks uitzetten</b> op de bouwplaats. Met de 3-4-5-methode zet je een rechte hoek uit: meet 3 m langs de ene lijn, 4 m langs de andere, dan moet de diagonaal precies 5 m zijn.</p>
  <p>De ruimtediagonaal van een balk: d = √(l² + b² + h²).</p>`}
 ],
 formulas:[['Rechthoek','A = l · b'],['Driehoek','A = ½ · b · h'],['Trapezium','A = ½(a + b) · h'],['Cirkel','A = π r², O = π d'],['Cilinder','V = π r² h'],['Pythagoras','a² + b² = c²']]},

{id:'gonio',code:'W-07',name:'Goniometrie',blurb:'Sinus, cosinus en tangens voor dakhellingen, sparlengtes en krachten onder een hoek.',
 subs:[{id:'zijde',name:'Zijde berekenen',gen:genGonioZijde},{id:'hoek',name:'Hoek berekenen',gen:genGonioHoek},{id:'dak',name:'Daken en hellingen',gen:genDak}],
 theory:[
  {t:'SOS · CAS · TOA',sub:'zijde',h:`<p>In een rechthoekige driehoek benoem je de zijden vanuit de hoek α die je bekijkt:</p>
  <ul class="rules"><li><b>S</b>chuine zijde: tegenover de rechte hoek (de langste)</li><li><b>O</b>verstaande zijde: tegenover α</li><li><b>A</b>anliggende zijde: de rechthoekszijde die aan α grenst</li></ul>
  <div class="formula-grid"><div>sin α = ${Fh('O','S')}</div><div>cos α = ${Fh('A','S')}</div><div>tan α = ${Fh('O','A')}</div></div>
  <p>Kies de verhouding met de zijde die je kent én de zijde die je zoekt.</p>`},
  {t:'Een hoek berekenen',sub:'hoek',h:`<p>Ken je twee zijden, dan vind je de hoek met de <b>inverse</b> functie: sin⁻¹, cos⁻¹ of tan⁻¹ (op rekenmachines vaak via SHIFT).</p>
  ${ex('Voorbeeld',`<p>O = 2,4 m en A = 4,0 m: tan α = 2,4 / 4,0 = 0,6 → α = tan⁻¹(0,6) = <b>31,0°</b></p>`)}
  ${pit('Staat je rekenmachine op RAD in plaats van DEG, dan klopt er niets van je antwoorden. Controle: sin(30) moet 0,5 geven. De rekenmachine in deze app rekent altijd in graden.')}`},
  {t:'Dakhellingen',sub:'dak',h:`<p>Bij een symmetrisch zadeldak werk je met de halve overspanning:</p>
  <ul class="rules"><li>Nokhoogte: h = ½b × tan α</li><li>Sparlengte (zonder overstek): s = ½b / cos α</li></ul>
  <p>Een helling kan in graden of in procenten staan. Het verband is <b>tan α = p / 100</b>.</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Graden</th><th>Procent</th></tr><tr><td>5°</td><td>8,7%</td></tr><tr><td>30°</td><td>57,7%</td></tr><tr><td>45°</td><td>100%</td></tr><tr><td>60°</td><td>173,2%</td></tr></table></div>`}
 ],
 formulas:[['Sinus','sin α = O / S'],['Cosinus','cos α = A / S'],['Tangens','tan α = O / A'],['Helling','tan α = p / 100'],['Nokhoogte','h = ½b · tan α'],['Sparlengte','s = ½b / cos α']]},

{id:'schaal',code:'W-08',name:'Schaal en verhoudingen',blurb:'Bouwtekeningen lezen op schaal, oppervlaktes op schaal en mengverhoudingen van beton en mortel.',
 subs:[{id:'tw',name:'Tekening → werkelijk',gen:genSchaalTW},{id:'wt',name:'Werkelijk → tekening',gen:genSchaalWT},{id:'bepalen',name:'Schaal bepalen',gen:genSchaalBep},{id:'meng',name:'Mengverhoudingen',gen:genMeng}],
 theory:[
  {t:'Wat betekent 1:n?',sub:'tw',h:`<p>Schaal 1:50 betekent: 1 mm op de tekening is 50 mm in het echt. Gangbare schalen:</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Schaal</th><th>Gebruik</th></tr><tr><td>1:1000 – 1:500</td><td>situatietekening</td></tr><tr><td>1:100</td><td>plattegronden, gevels (ontwerp)</td></tr><tr><td>1:50</td><td>bestektekeningen</td></tr><tr><td>1:20 – 1:5</td><td>details (aansluitingen)</td></tr><tr><td>1:1</td><td>profielen op ware grootte</td></tr></table></div>
  <div class="formula-grid"><div>werkelijk = tekening × n</div><div>tekening = werkelijk ÷ n</div><div>n = werkelijk ÷ tekening</div></div>`},
  {t:'Oppervlakte op schaal',sub:'tw',h:`<p>Lengtes schalen met factor n, oppervlaktes met <b>n²</b>. Op 1:100 is 1 cm² op papier dus 100 × 100 = 10 000 cm² = 1 m² in het echt.</p>${pit('Op schaal 1:50 is de oppervlaktefactor 2500, niet 50.')}`},
  {t:'Mengverhoudingen',sub:'meng',h:`<p>Een verhouding als cement : zand : grind = 1 : 2 : 3 rekent met <b>delen</b>. Tel alle delen op (6), bereken hoeveel één deel is, en vermenigvuldig.</p>
  ${ex('Voorbeeld',`<p>1,8 m³ mengsel in 1:2:3 → 1 deel = 1,8 / 6 = 0,3 m³ → zand = 2 × 0,3 = <b>0,6 m³</b>.</p>`)}
  <p>De <b>water-cementfactor</b> (wcf) is massa water ÷ massa cement. Een lagere wcf geeft sterker en dichter beton, maar slechter verwerkbaar.</p>`}
 ],
 formulas:[['Schaal 1:n','werkelijk = tekening × n'],['Oppervlakte op schaal','factor n²'],['Delen','1 deel = totaal / som van delen'],['Water-cementfactor','wcf = m_water / m_cement']]},

{id:'kwadratisch',code:'W-09',name:'Kwadratische vergelijkingen',blurb:'Ontbinden, de abc-formule en parabolen. Nodig voor o.a. momentenlijnen en boogvormen.',
 subs:[{id:'oplossen',name:'Vergelijkingen oplossen',gen:genKwOpl},{id:'discr',name:'Discriminant',gen:genDiscr},{id:'top',name:'Top van de parabool',gen:genTop},{id:'ontbinden',name:'Ontbinden in factoren',gen:genOntbind}],
 theory:[
  {t:'Snelle gevallen',sub:'oplossen',h:`<ul class="rules"><li>x² = c → x = √c of x = −√c (twee oplossingen!)</li><li>Product nul: (x − 2)(x + 5) = 0 → x = 2 of x = −5</li><li>Geen constante: x² − 4x = 0 → x(x − 4) = 0 → x = 0 of x = 4</li></ul>`},
  {t:'Ontbinden: product-som',sub:'ontbinden',h:`<p>Voor x² + bx + c zoek je twee getallen p en q met <b>p · q = c</b> en <b>p + q = b</b>. Dan is x² + bx + c = (x + p)(x + q).</p>
  ${ex('Voorbeeld',`<p>x² − x − 12: product −12, som −1 → −4 en 3. Dus (x − 4)(x + 3) = 0 → x = 4 of x = −3.</p>`)}`},
  {t:'De abc-formule',sub:'oplossen',h:`<p>Werkt altijd, voor ax² + bx + c = 0:</p><div class="formula-box">D = b² − 4ac &nbsp;&nbsp;&nbsp; x = ${Fh('−b ± √D','2a')}</div>
  <ul class="rules"><li>D &gt; 0: twee oplossingen</li><li>D = 0: één oplossing</li><li>D &lt; 0: geen oplossingen</li></ul>
  ${pit('Let op tekens bij negatieve b of c. Zet ze tussen haakjes bij het invullen: b² met b = −3 is (−3)² = 9.')}`},
  {t:'Parabolen',sub:'top',h:`<p>De grafiek van y = ax² + bx + c is een parabool. Bij a &gt; 0 een dalparabool (laagste punt), bij a &lt; 0 een bergparabool (hoogste punt).</p>
  <div class="formula-box">x<sub>top</sub> = ${Fh('−b','2a')}</div>
  <p>In de bouw: de momentenlijn van een gelijkmatig belaste ligger is een parabool met de top in het midden (M = ⅛qL²). Ook boogbruggen en kabels volgen vaak deze vorm.</p>`}
 ],
 formulas:[['Discriminant','D = b² − 4ac'],['abc-formule',`x = ${Fh('−b ± √D','2a')}`],['Top',`x_top = −b / 2a`],['Product-som','pq = c, p + q = b']]},

{id:'mechanica',code:'W-10',name:'Mechanica basis',blurb:'Krachten, spanning, momenten, oplegreacties en belastingen. Voorbereiding op constructieleer.',
 subs:[{id:'krachten',name:'Krachten en componenten',gen:genKrachten},{id:'spanning',name:'Spanning σ = F/A',gen:genSpanning},{id:'moment',name:'Momenten',gen:genMoment},{id:'opleg',name:'Oplegreacties',gen:genOpleg},{id:'qlast',name:'Belastingen',gen:genQlast}],
 theory:[
  {t:'Krachten',sub:'krachten',h:`<p>Een kracht heeft een grootte, een richting en een aangrijpingspunt (een vector). Eenheid in de bouw: <b>kN</b>.</p>
  <ul class="rules"><li>Krachten op één lijn tel je op (met teken)</li><li>Twee loodrechte krachten: resultante R = √(F<sub>h</sub>² + F<sub>v</sub>²)</li><li>Een schuine kracht F onder hoek α met de horizontaal ontbind je in F<sub>h</sub> = F cos α en F<sub>v</sub> = F sin α</li></ul>`},
  {t:'Spanning',sub:'spanning',h:`<div class="formula-box">σ = ${Fh('F','A')} &nbsp;&nbsp; (N/mm²)</div><p>Reken met F in N en A in mm². Vergelijk de spanning met wat het materiaal mag hebben. Ter indicatie:</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Materiaal</th><th>Orde van grootte sterkte</th></tr><tr><td>Metselwerk</td><td>enkele N/mm²</td></tr><tr><td>Naaldhout</td><td>ca. 10–20 N/mm²</td></tr><tr><td>Beton (druk)</td><td>ca. 20–50 N/mm²</td></tr><tr><td>Staal S235</td><td>235 N/mm²</td></tr></table></div>`},
  {t:'Moment en evenwicht',sub:'moment',h:`<p>Een moment is een draaiende werking: <b>M = F × a</b>, met a de loodrechte afstand (arm) van de kracht tot het draaipunt. Eenheid: kNm.</p>
  <p>Een constructie is in evenwicht als geldt:</p><div class="formula-grid"><div>ΣF<sub>h</sub> = 0</div><div>ΣF<sub>v</sub> = 0</div><div>ΣM = 0</div></div>
  <p>Kies een vaste afspraak voor de draairichting, bijvoorbeeld rechtsom positief.</p>`},
  {t:'Oplegreacties',sub:'opleg',h:`<p>Een ligger op twee steunpunten (A scharnier, B rol) heeft twee verticale oplegreacties. Je vindt ze zo:</p>
  <ol class="steps plain"><li>Neem momenten om A: R<sub>B</sub> × L = Σ(F × afstand tot A)</li><li>Verticaal evenwicht: R<sub>A</sub> = ΣF − R<sub>B</sub></li></ol>
  ${ex('Voorbeeld',`<p>L = 6 m, F = 30 kN op 2 m van A: R<sub>B</sub> = 30 × 2 / 6 = 10 kN, R<sub>A</sub> = 30 − 10 = <b>20 kN</b>. De last staat dichter bij A, dus A draagt meer.</p>`)}`},
  {t:'Belastingen',sub:'qlast',h:`<ul class="rules"><li><b>Puntlast</b> F (kN): bijvoorbeeld een kolom die op een balk staat</li><li><b>Lijnlast</b> q (kN/m): gelijkmatig verdeeld over de lengte</li><li><b>Vlaklast</b> p (kN/m²): op een vloer</li></ul>
  <p>Vlaklast → lijnlast: q = p × h.o.h.-afstand. Eigen gewicht van een vloer = dikte × volumiek gewicht (beton 24 kN/m³).</p>
  <div class="formula-box">M<sub>max</sub> = ⅛ q L² &nbsp;&nbsp; (ligger op twee steunpunten, gelijkmatige belasting)</div>`}
 ],
 formulas:[['Gewicht','F = m · g'],['Spanning','σ = F / A'],['Moment','M = F · a'],['Evenwicht','ΣF = 0, ΣM = 0'],['Oplegreactie','R_B = F · a / L'],['Max. moment','M = ⅛ q L²'],['Componenten','F_h = F cos α, F_v = F sin α']]},

{id:'bouwfysica',code:'W-11',name:'Bouwfysica: warmte',blurb:'Warmteweerstand, Rc- en U-waarde, isolatiedikte en warmteverlies door gevels en daken.',
 subs:[{id:'r',name:'Warmteweerstand R',gen:genR},{id:'rc',name:'Rc-waarde',gen:genRc},{id:'u',name:'U-waarde',gen:genU},{id:'isol',name:'Isolatiedikte',gen:genIsol},{id:'warmte',name:'Warmteverlies',gen:genWarmte}],
 theory:[
  {t:'Warmtegeleiding λ',sub:'r',h:`<p>De warmtegeleidingscoëfficiënt <b>λ</b> (lambda, in W/(m·K)) zegt hoe goed een materiaal warmte doorlaat. Hoe lager, hoe beter het isoleert.</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Materiaal</th><th>λ (W/m·K)</th></tr>${Object.entries(MAT).map(([k,v])=>`<tr><td>${k}</td><td>${N(v,3)}</td></tr>`).join('')}</table></div><p class="muted small">Rekenwaarden voor deze oefeningen; in de praktijk gebruik je de waarde van de fabrikant of de norm.</p>`},
  {t:'Warmteweerstand R en Rc',sub:'rc',h:`<div class="formula-box">R = ${Fh('d','λ')} &nbsp;&nbsp; (d in meter!)</div>
  <p>Bij een constructie met meerdere lagen tel je de weerstanden op: <b>R<sub>c</sub> = R₁ + R₂ + R₃ + …</b>. Een niet-geventileerde luchtspouw telt ook mee (ca. 0,17 m²K/W).</p>
  ${pit('100 mm glaswol: R = 0,1 / 0,035 = 2,86. Wie 100 / 0,035 invult krijgt 2857: een factor 1000 te groot.')}`},
  {t:'U-waarde',sub:'u',h:`<p>De U-waarde (warmtedoorgangscoëfficiënt) zegt hoeveel watt er per m² per graad temperatuurverschil doorheen gaat. Lager is beter.</p>
  <div class="formula-box">U = ${Fh('1','R<sub>T</sub>')} &nbsp;&nbsp; R<sub>T</sub> = R<sub>si</sub> + R<sub>c</sub> + R<sub>se</sub></div>
  <p>R<sub>si</sub> en R<sub>se</sub> zijn de overgangsweerstanden aan binnen- en buitenzijde. Voor een wand: R<sub>si</sub> = 0,13 en R<sub>se</sub> = 0,04 m²K/W.</p>`},
  {t:'Eisen en warmteverlies',sub:'isol',h:`<p>Minimale R<sub>c</sub>-waarden voor nieuwbouw (Besluit bouwwerken leefomgeving):</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Bouwdeel</th><th>R<sub>c</sub> ≥ (m²K/W)</th></tr><tr><td>Gevel</td><td>4,7</td></tr><tr><td>Vloer</td><td>3,7</td></tr><tr><td>Dak</td><td>6,3</td></tr></table></div>
  <div class="formula-box">Φ = U · A · ΔT &nbsp;&nbsp; (W)</div>
  <p>Benodigde isolatiedikte: d = (R<sub>c,eis</sub> − R<sub>overige lagen</sub>) × λ.</p>`}
 ],
 formulas:[['Weerstand laag','R = d / λ'],['Constructie','R_c = ΣR'],['Totaal','R_T = R_si + R_c + R_se'],['U-waarde','U = 1 / R_T'],['Warmtestroom','Φ = U · A · ΔT'],['Isolatiedikte','d = R · λ'],['Eisen nieuwbouw','gevel 4,7 · vloer 3,7 · dak 6,3']]}
];
const MOD=Object.fromEntries(MODS.map(m=>[m.id,m]));

// ---- W-01 Basisrekenen + volgorde van makkelijk naar moeilijk ----
MODS.unshift({id:'basis',name:'Basisrekenen',blurb:'Optellen, aftrekken, tafels, delen, kommagetallen en afronden. Zonder rekenmachine. Hier begin je.',
 subs:[{id:'optellen',name:'Optellen en aftrekken',gen:genOptellen},{id:'tafels',name:'Vermenigvuldigen',gen:genTafels},{id:'delen',name:'Delen',gen:genDelen},{id:'decimaal',name:'Kommagetallen',gen:genDecimaal},{id:'afronden',name:'Afronden',gen:genAfronden}],
 theory:[
  {t:'Handig optellen en aftrekken',sub:'optellen',h:`<p>Splits getallen in tientallen en eenheden. Dat gaat sneller en je maakt minder fouten.</p>
  ${ex('Voorbeeld',`<p class="calcline">47 + 38 = 47 + 30 + 8 = 77 + 8 = <b>85</b></p><p class="calcline">92 − 57 = 92 − 50 − 7 = 42 − 7 = <b>35</b></p>`)}
  <p>Bij kommagetallen zet je de komma’s precies onder elkaar. Vul aan met nullen: 12,5 + 3,75 = 12,50 + 3,75 = 16,25.</p>
  ${pit('Aftrekken is niet omkeerbaar: 30 − 12 is iets anders dan 12 − 30.')}`},
  {t:'Vermenigvuldigen',sub:'tafels',h:`<p>De tafels van 1 tot en met 10 moet je zonder nadenken kennen. Grotere getallen splits je:</p>
  ${ex('Voorbeeld',`<p class="calcline">34 × 6 = 30 × 6 + 4 × 6 = 180 + 24 = <b>204</b></p><p class="calcline">23 × 15 = 23 × 10 + 23 × 5 = 230 + 115 = <b>345</b></p>`)}
  <p>Vermenigvuldigen met 10, 100 of 1000: de komma schuift 1, 2 of 3 plaatsen naar rechts. 2,45 × 100 = 245.</p>`},
  {t:'Delen',sub:'delen',h:`<p>Delen is het omgekeerde van vermenigvuldigen: 56 ÷ 7 = 8, want 7 × 8 = 56. Controleer een deling altijd met een vermenigvuldiging.</p>
  <p>Delen door 10, 100 of 1000: de komma schuift naar links. 3450 ÷ 1000 = 3,45. Dit gebruik je steeds bij mm → m.</p>
  ${ex('Delen door een kommagetal',`<p>7,5 ÷ 2,5: vermenigvuldig beide met 10 → 75 ÷ 25 = <b>3</b>. De uitkomst verandert niet.</p>`)}`},
  {t:'Kommagetallen vermenigvuldigen',sub:'decimaal',h:`<p>Reken eerst zonder komma's. Tel daarna hoeveel cijfers er in totaal achter de komma stonden; zoveel krijgt je antwoord ook.</p>
  ${ex('Voorbeeld',`<p>0,4 × 0,25 → 4 × 25 = 100. Er stonden 1 + 2 = 3 cijfers achter de komma → 0,100 = <b>0,1</b></p>`)}
  <p>Handige getallen om te kennen: 0,5 = ½ · 0,25 = ¼ · 0,75 = ¾ · 0,2 = ⅕ · 0,1 = ⅒</p>`},
  {t:'Afronden',sub:'afronden',h:`<p>Kijk naar het cijfer direct rechts van de plek waarop je afrondt. Is dat 5 of hoger, dan rond je naar boven af; anders naar beneden.</p>
  <div class="tblwrap"><table class="rtab"><tr><th>Getal</th><th>Op geheel</th><th>Op 1 decimaal</th><th>Op 2 decimalen</th></tr><tr><td>3,4682</td><td>3</td><td>3,5</td><td>3,47</td></tr><tr><td>12,951</td><td>13</td><td>13,0</td><td>12,95</td></tr></table></div>
  ${pit('Rond pas af aan het eind van een berekening. Tussentijds afronden geeft afwijkingen in je eindantwoord.')}`}
 ],
 formulas:[['Komma bij × 10, 100, 1000','schuift 1, 2, 3 plaatsen naar rechts'],['Komma bij ÷ 10, 100, 1000','schuift 1, 2, 3 plaatsen naar links'],['Afronden','5 of hoger → omhoog'],['Controle delen','a ÷ b = c ↔ b × c = a']]});
(function(){
  const order=['basis','rekenen','eenheden','machten','schaal','meetkunde','algebra','lineair','gonio','kwadratisch','mechanica','bouwfysica'];
  const subOrder={rekenen:['negatief','volgorde','breuken','procent'],machten:['waarde','wortels','regels','wetnot'],meetkunde:['omtrek','opp','inhoud','pyth'],algebra:['invullen','verg','haakjes','omwerken'],lineair:['formule','rc','afschot','trap'],kwadratisch:['oplossen','ontbinden','discr','top'],mechanica:['krachten','spanning','moment','qlast','opleg']};
  MODS.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
  MODS.forEach((m,i)=>{m.code='W-'+String(i+1).padStart(2,'0');if(subOrder[m.id])m.subs.sort((a,b)=>subOrder[m.id].indexOf(a.id)-subOrder[m.id].indexOf(b.id));
    const firstIdx=s=>m.subs.findIndex(x=>x.id===s);m.theory.sort((a,b)=>(a.sub?firstIdx(a.sub):99)-(b.sub?firstIdx(b.sub):99));});
  MODS.forEach(m=>MOD[m.id]=m);
})();

// ================= UITBREIDING: extra onderdelen, nieuwe bladen, leerdoelen =================
(function(){
const add=(id,sub,lesson)=>{const m=MOD[id];m.subs.push(sub);if(lesson)m.theory.push({...lesson,sub:sub.id})};
add('basis',{id:'praktisch',name:'Verhaaltjessommen',gen:genPraktisch},{t:'Verhaaltjessommen aanpakken',h:`<p>Bij een verhaaltjessom is het rekenen meestal niet het probleem; het lastige is bepalen <b>wát</b> je moet uitrekenen. Gebruik dit stappenplan:</p>
<ol class="steps plain"><li><b>Wat wordt er gevraagd?</b> Onderstreep de vraag en noteer de eenheid van het antwoord.</li><li><b>Wat is gegeven?</b> Schrijf alle getallen met eenheid op een rij.</li><li><b>Welke tussenstappen?</b> Bijvoorbeeld: oppervlak → aantal → kosten.</li><li><b>Reken uit</b> en rond pas aan het eind af.</li><li><b>Controleer:</b> is het antwoord logisch? 400 pakken laminaat voor één kamer klopt niet.</li></ol>
${ex('Voorbeeld',`<p>Een vloer van 23 m², pakken van 2,2 m². 23 ÷ 2,2 = 10,45 → je koopt <b>11 pakken</b>.</p>`)}
${pit('Materiaal koop je in hele verpakkingen. Rond dan altijd <b>naar boven</b> af, ook bij 10,05.')}`});
add('rekenen',{id:'gemiddelde',name:'Gemiddelde',gen:genGemiddelde},{t:'Gemiddelde en gewogen gemiddelde',h:`<div class="formula-box">gemiddelde = ${Fh('som van alle waarden','aantal waarden')}</div>
<p>Bij een <b>gewogen gemiddelde</b> telt niet elke waarde even zwaar. Vermenigvuldig elke waarde met zijn weging, tel op en deel door de som van de wegingen.</p>
${ex('Voorbeeld',`<p>Cijfers 6 (weging 1), 7 (weging 1) en 8 (weging 2): (6 + 7 + 2 × 8) ÷ 4 = 29 ÷ 4 = <b>7,25</b></p>`)}
<p>In de bouw: gemiddelde productie per dag, gemiddelde druksterkte van betonproefkubussen, gemiddelde prijs per m².</p>`});
add('eenheden',{id:'tijd',name:'Tijd, snelheid en debiet',gen:genTijd},{t:'Tijd, snelheid en debiet',h:`<ul class="rules"><li>1 uur = 60 min = 3600 s. Let op: 1,5 uur = 1 uur en 30 minuten (níet 1 uur en 50 min).</li><li><b>Snelheid</b> v = s / t. Omrekenen: km/h ÷ 3,6 = m/s.</li><li><b>Debiet</b> (hoeveelheid per tijd) Q = V / t, bijv. L/min of m³/h.</li></ul>
${ex('Voorbeeld',`<p>Pomp 18 m³/h = 18 000 L / 3600 s = <b>5 L/s</b>.</p>`)}`});
add('machten',{id:'wortelvgl',name:'Wortels in de praktijk',gen:genWortelVgl},{t:'Terugrekenen met wortels',h:`<p>Ken je een oppervlak of inhoud en zoek je een maat, dan gebruik je een wortel:</p>
<div class="formula-grid"><div>Vierkant: z = √A</div><div>Kubus: z = ∛V</div><div>Cirkel: d = √(4A / π)</div></div>
${pit('Twee keer zoveel oppervlak betekent níet twee keer zo lange zijden, maar √2 ≈ 1,41 keer.')}`});
add('schaal',{id:'evenredig',name:'Evenredigheid',gen:genEvenredig},{t:'Recht en omgekeerd evenredig',h:`<p><b>Recht evenredig:</b> twee keer zoveel van het een geeft twee keer zoveel van het ander (m² en kosten). Reken via "1 eenheid".</p>
<p><b>Omgekeerd evenredig:</b> twee keer zoveel van het een geeft de helft van het ander (aantal mensen en aantal dagen). Het product blijft gelijk: 4 man × 6 dagen = 24 mandagen = 3 man × 8 dagen.</p>
${pit('Controleer altijd of meer = meer (recht) of meer = minder (omgekeerd).')}`});
add('meetkunde',{id:'gevel',name:'Samengestelde vlakken',gen:genGevel},{t:'Gevels en samengestelde vlakken',h:`<p>Een gevel bestaat meestal uit eenvoudige vormen. Werk zo:</p>
<ol class="steps plain"><li>Bruto: tel de vormen op (rechthoek + driehoekige geveltop).</li><li>Openingen: bereken ramen en deuren.</li><li>Netto = bruto − openingen.</li></ol>
<p>Rondboog: halve cirkel met r = ½ × breedte: A = ½ πr².</p>`});
add('algebra',{id:'stelsel',name:'Stelsels van vergelijkingen',gen:genStelsel},{t:'Twee vergelijkingen, twee onbekenden',h:`<p>Een stelsel heeft twee onbekenden (x en y) en twee vergelijkingen. Twee methoden:</p>
<ul class="rules"><li><b>Substitutie:</b> schrijf één vergelijking als y = …, en vul dat in de andere in.</li><li><b>Eliminatie:</b> vermenigvuldig de vergelijkingen zodat x (of y) dezelfde coëfficiënt krijgt en trek ze van elkaar af.</li></ul>
${ex('Voorbeeld',`<p>x + y = 10 en x − y = 4 → optellen: 2x = 14 → x = 7, y = 3.</p>`)}
<p>Toepassing: break-even van twee offertes, het snijpunt van twee lijnen.</p>`});
add('lineair',{id:'interp',name:'Interpoleren in tabellen',gen:genInterp},{t:'Lineair interpoleren',h:`<p>Tabellen in normen en bouwfysica geven waarden bij vaste stappen. Ligt jouw waarde ertussen, dan interpoleer je: je doet alsof het verband tussen twee tabelregels een rechte lijn is.</p>
<div class="formula-box">y = y₁ + (y₂ − y₁) × ${Fh('x − x₁','x₂ − x₁')}</div>
${ex('Voorbeeld',`<p>Bij 10 °C: 1228 Pa, bij 12 °C: 1402 Pa. Bij 11 °C: 1228 + 174 × ½ = <b>1315 Pa</b>.</p>`)}`});
add('gonio',{id:'cosregel',name:'Schuine driehoeken',gen:genCosregel},{t:'Sinusregel en cosinusregel',h:`<p>SOS-CAS-TOA werkt alleen bij een rechte hoek. Voor willekeurige driehoeken (zoals dakspanten) gebruik je:</p>
<div class="formula-grid"><div>Hoekensom: ∠A + ∠B + ∠C = 180°</div><div>Sinusregel: ${Fh('a','sin A')} = ${Fh('b','sin B')} = ${Fh('c','sin C')}</div><div>Cosinusregel: a² = b² + c² − 2bc · cos A</div></div>
<p>Kleine letters zijn zijden, de hoofdletter is de hoek <b>tegenover</b> die zijde.</p>
<ul class="rules"><li>Ken je 2 hoeken en 1 zijde → sinusregel</li><li>Ken je 2 zijden en de hoek ertussen → cosinusregel</li><li>Ken je 3 zijden → cosinusregel omgewerkt naar cos A</li></ul>`});
add('kwadratisch',{id:'toepassing',name:'Toepassingen',gen:genKwToep},{t:'Kwadratische vergelijkingen in de praktijk',h:`<p>Een kwadratische vergelijking ontstaat vaak als je twee onbekende maten met elkaar vermenigvuldigt (oppervlak). Stappenplan:</p>
<ol class="steps plain"><li>Kies een variabele (bijv. b = breedte).</li><li>Druk de andere maat in b uit (l = b + 3).</li><li>Stel de vergelijking op (b(b + 3) = 40).</li><li>Herschrijf naar ax² + bx + c = 0 en los op.</li><li>Kies de oplossing die past: een negatieve lengte vervalt.</li></ol>`});
add('mechanica',{id:'fundering',name:'Gronddruk en funderingen',gen:genFundering},{t:'Gronddruk',h:`<p>Een fundering verdeelt de last over de grond. De druk op de grond mag niet groter zijn dan wat de grond kan dragen.</p>
<div class="formula-grid"><div>Poer: p = F / (a × b)</div><div>Strokenfundering: p = q / b</div><div>Benodigd: A = F / p<sub>toel</sub></div></div>
<p>Ter indicatie: slappe klei draagt ca. 50–100 kN/m², vast zand 200–400 kN/m². Op slappe grond in Nederland wordt daarom vaak op palen gefundeerd.</p>`});
add('bouwfysica',{id:'temp',name:'Temperatuurverloop',gen:genTemp},{t:'Temperatuurverloop in een constructie',h:`<p>Het temperatuurverschil tussen binnen en buiten verdeelt zich over de lagen <b>naar verhouding van hun weerstand</b>. Een laag met grote R krijgt een grote temperatuursprong.</p>
<div class="formula-box">θ = T<sub>i</sub> − ${Fh('R tot dat punt','R<sub>T</sub>')} × (T<sub>i</sub> − T<sub>e</sub>)</div>
<p>De binnenoppervlaktetemperatuur θ<sub>si</sub> (met R = R<sub>si</sub> = 0,13) bepaalt of er condens en schimmel kan ontstaan. Hoe beter geïsoleerd, hoe warmer de binnenkant.</p>`});

// ---- nieuwe bladen ----
MODS.push(
{id:'natuurkunde',name:'Natuurkunde basis',blurb:'Dichtheid, druk, waterdruk, arbeid, energie en vermogen. De natuurkunde onder mechanica en installaties.',
 subs:[{id:'dichtheid',name:'Dichtheid',gen:genDichtheid},{id:'druk',name:'Druk en waterdruk',gen:genDruk},{id:'arbeid',name:'Arbeid en energie',gen:genArbeid},{id:'vermogen',name:'Vermogen',gen:genVermogen}],
 theory:[
 {t:'Massa, volume en dichtheid',sub:'dichtheid',h:`<p>De <b>dichtheid</b> (volumieke massa) ρ zegt hoeveel kilogram er in één kubieke meter van een stof zit.</p><div class="formula-box">ρ = ${Fh('m','V')} &nbsp;&nbsp; m = ρ · V &nbsp;&nbsp; V = ${Fh('m','ρ')}</div>
 <div class="tblwrap"><table class="rtab"><tr><th>Materiaal</th><th>ρ (kg/m³)</th><th>gewicht (kN/m³)</th></tr>${Object.entries(RHO).map(([k,v])=>`<tr><td>${k}</td><td>${N(v)}</td><td>${N(v/100)}</td></tr>`).join('')}</table></div>
 <p>Volumiek gewicht γ (kN/m³) = ρ × g / 1000 ≈ ρ / 100.</p>`},
 {t:'Druk en waterdruk',sub:'druk',h:`<p>Druk is kracht per oppervlak: <b>p = F / A</b>. Eenheid: pascal (Pa = N/m²). 1 kPa = 1 kN/m².</p>
 <p>In water (of grond) neemt de druk toe met de diepte:</p><div class="formula-box">p = ρ · g · h</div>
 <p>Water: elke meter diepte geeft ongeveer <b>10 kPa</b> extra. Dat is belangrijk voor kelders, bouwputten en damwanden: grondwater duwt een keldervloer omhoog (opdrijven).</p>
 ${pit('Waterdruk werkt naar alle kanten, ook omhoog en opzij.')}`},
 {t:'Arbeid en energie',sub:'arbeid',h:`<p><b>Arbeid</b> W (joule) verricht je als een kracht iets verplaatst: W = F · s. Energie is het vermogen om arbeid te verrichten.</p>
 <div class="formula-grid"><div>Arbeid: W = F · s</div><div>Zwaarte-energie: E = m · g · h</div><div>Rendement: η = E<sub>nuttig</sub> / E<sub>in</sub></div></div>
 ${ex('Voorbeeld',`<p>Een pallet van 500 kg 20 m hijsen: E = 500 × 10 × 20 = 100 000 J = <b>100 kJ</b>.</p>`)}`},
 {t:'Vermogen',sub:'vermogen',h:`<p><b>Vermogen</b> P (watt) is energie per seconde: P = W / t. 1 kW = 1000 W.</p>
 <p>Energie op je rekening staat in <b>kWh</b>: het vermogen in kW maal de tijd in uren. 1 kWh = 3 600 000 J.</p>
 ${ex('Voorbeeld',`<p>Bouwdroger 2 kW, 8 uur: E = 2 × 8 = 16 kWh. Bij € 0,35: € 5,60.</p>`)}`}],
 formulas:[]},
{id:'installaties',name:'Installaties: elektriciteit en water',blurb:'Wet van Ohm, elektrisch vermogen, energiekosten en debiet in leidingen.',
 subs:[{id:'ohm',name:'Wet van Ohm',gen:genOhm},{id:'elvermogen',name:'Elektrisch vermogen',gen:genElVermogen},{id:'energie',name:'Energie en kosten',gen:genEnergie},{id:'debiet',name:'Debiet in leidingen',gen:genDebiet}],
 theory:[
 {t:'Spanning, stroom en weerstand',sub:'ohm',h:`<p>Spanning U (volt) duwt een stroom I (ampère) door een weerstand R (ohm). In Nederland is de netspanning <b>230 V</b>.</p>
 <div class="formula-box">U = I · R</div>
 <ul class="rules"><li>Serie (achter elkaar): R = R₁ + R₂ + …</li><li>Parallel (naast elkaar): 1/R = 1/R₁ + 1/R₂ + …</li></ul>
 <p>Alle stopcontacten in een huis zijn parallel geschakeld: elk apparaat krijgt 230 V.</p>`},
 {t:'Elektrisch vermogen en groepen',sub:'elvermogen',h:`<div class="formula-box">P = U · I &nbsp;&nbsp; I = ${Fh('P','U')}</div>
 <p>Een groep in de meterkast heeft meestal een zekering van <b>16 A</b>. Op 230 V is dat maximaal 230 × 16 ≈ <b>3680 W</b> per groep. Zware apparaten (oven, inductie, warmtepomp) krijgen een eigen groep.</p>`},
 {t:'Energieverbruik en kosten',sub:'energie',h:`<div class="formula-box">E (kWh) = P (kW) × t (h) &nbsp;&nbsp; kosten = E × prijs</div>
 <p>Een warmtepomp levert meer warmte dan hij aan stroom gebruikt. De <b>COP</b> (coefficient of performance) is de verhouding: COP 4 betekent 4 kWh warmte uit 1 kWh stroom.</p>`},
 {t:'Debiet en leidingen',sub:'debiet',h:`<div class="formula-box">Q = V / t &nbsp;&nbsp; Q = A · v</div>
 <p>Q in m³/s, A (doorsnede) in m², v (stroomsnelheid) in m/s. Een te kleine leiding geeft een hoge snelheid: lawaai en drukverlies. Daarom wordt een maximale snelheid aangehouden (drinkwater ca. 1,5–2 m/s).</p>
 ${pit('Diameter in mm eerst naar m. A = ¼πd² met d in meter.')}`}],
 formulas:[]},
{id:'geluid',name:'Bouwfysica: geluid en vocht',blurb:'Decibellen optellen, geluid over afstand, relatieve vochtigheid, dauwpunt en condensatie.',
 subs:[{id:'dbsom',name:'Decibellen optellen',gen:genDbOptellen},{id:'dbafstand',name:'Geluid en afstand',gen:genDbAfstand},{id:'rv',name:'Relatieve vochtigheid',gen:genRV},{id:'dauw',name:'Dauwpunt',gen:genDauw}],
 theory:[
 {t:'De decibelschaal',sub:'dbsom',h:`<p>Geluidsniveau L wordt uitgedrukt in decibel (dB). De schaal is <b>logaritmisch</b>: +10 dB is tien keer zoveel geluidsenergie (en klinkt ongeveer twee keer zo hard).</p>
 <div class="formula-grid"><div>Twee gelijke bronnen: +3 dB</div><div>n gelijke bronnen: L + 10·log(n)</div><div>Verschillende bronnen: L = 10·log(Σ 10<sup>L/10</sup>)</div></div>
 ${pit('dB tel je níet gewoon op. 80 dB + 80 dB = 83 dB, niet 160 dB.')}`},
 {t:'Geluid en afstand',sub:'dbafstand',h:`<ul class="rules"><li><b>Puntbron</b> (machine): −6 dB per verdubbeling van de afstand: L₂ = L₁ − 20·log(r₂/r₁)</li><li><b>Lijnbron</b> (drukke weg, spoor): −3 dB per verdubbeling: L₂ = L₁ − 10·log(r₂/r₁)</li></ul>
 <p>Ter indicatie: gesprek 60 dB, drukke weg 75 dB, bouwmachine 90 dB, pijngrens 120 dB.</p>`},
 {t:'Waterdamp en relatieve vochtigheid',sub:'rv',h:`<p>Lucht bevat waterdamp. Hoeveel damp er maximaal in past, hangt af van de temperatuur: de <b>verzadigingsdruk</b> p<sub>sat</sub>. Warme lucht kan meer vocht bevatten.</p>
 <div class="formula-box">RV = ${Fh('p<sub>w</sub>','p<sub>sat</sub>')} × 100%</div>
 <p>Koelt lucht af, dan blijft p<sub>w</sub> gelijk maar wordt p<sub>sat</sub> kleiner: de RV stijgt. Bij 100% ontstaat condens.</p>${psatTable()}`},
 {t:'Dauwpunt en condensatie',sub:'dauw',h:`<p>Het <b>dauwpunt</b> is de temperatuur waarbij p<sub>sat</sub> gelijk is aan de aanwezige dampdruk. Elk oppervlak dat kouder is dan het dauwpunt, wordt nat.</p>
 <ol class="steps plain"><li>Bereken p<sub>w</sub> = RV × p<sub>sat</sub>(T<sub>binnen</sub>).</li><li>Zoek in de tabel bij welke temperatuur p<sub>sat</sub> = p<sub>w</sub> (interpoleren).</li><li>Vergelijk met de oppervlaktetemperatuur van wand of raam.</li></ol>
 <p>Daarom zijn koudebruggen en enkel glas berucht: daar condenseert vocht en groeit schimmel.</p>`}],
 formulas:[]},
{id:'economie',name:'Bouweconomie',blurb:'Kengetallen per m², begrotingsopslagen, rente en afschrijving. De rekenkant van bouwprojecten.',
 subs:[{id:'kostprijs',name:'Kengetallen en m²-prijs',gen:genKostprijs},{id:'begroting',name:'Begroting en opslagen',gen:genBegroting},{id:'rente',name:'Rente',gen:genRente},{id:'afschr',name:'Afschrijving',gen:genAfschr}],
 theory:[
 {t:'Oppervlakten en kengetallen',sub:'kostprijs',h:`<ul class="rules"><li><b>BVO</b> (bruto vloeroppervlak): gemeten aan de buitenkant van de gevels, alle verdiepingen samen.</li><li><b>GO</b> (gebruiksoppervlak): wat de gebruiker echt kan gebruiken, zonder dikke wanden en schachten. Meestal 75–85% van het BVO (meten volgens NEN 2580).</li></ul>
 <p>In vroege fasen raam je kosten met <b>kengetallen</b>: een bedrag per m² BVO voor een bepaald type gebouw.</p>`},
 {t:'Begroting en opslagen',sub:'begroting',h:`<p>Een begroting begint bij de <b>directe kosten</b> (materiaal, arbeid, materieel). Daarover komen opslagen, die je na elkaar toepast:</p>
 <ol class="steps plain"><li>Algemene kosten (AK): kantoor, administratie</li><li>Winst en risico (W&R)</li><li>Btw (21%)</li></ol>
 ${pit('Opslagen stapel je: 8% AK en 5% W&R is × 1,08 × 1,05 = × 1,134, niet × 1,13.')}`},
 {t:'Enkelvoudige en samengestelde rente',sub:'rente',h:`<div class="formula-grid"><div>Enkelvoudig: rente = K · ${Fh('p','100')} · n</div><div>Samengesteld: K<sub>n</sub> = K · (1 + ${Fh('p','100')})<sup>n</sup></div><div>Contante waarde: K = ${Fh('K<sub>n</sub>','(1 + p/100)<sup>n</sup>')}</div></div>
 <p>Bij samengestelde rente krijg je ook rente over de rente. Met de contante waarde reken je terug wat een toekomstig bedrag nu waard is.</p>`},
 {t:'Afschrijving',sub:'afschr',h:`<p>Een machine of gebouw wordt in de loop van de jaren minder waard. Die waardedaling (afschrijving) is een kostenpost.</p>
 <div class="formula-grid"><div>Lineair: a = ${Fh('A − R','n')} per jaar</div><div>Boekwaarde na k jaar: A − k · a</div><div>Degressief: B<sub>k</sub> = A · (1 − p/100)<sup>k</sup></div></div>`}],
 formulas:[]});
Object.assign(CASES,CASES2);
const order=['basis','rekenen','eenheden','machten','schaal','meetkunde','natuurkunde','algebra','lineair','gonio','kwadratisch','mechanica','installaties','bouwfysica','geluid','economie'];
MODS.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
MODS.forEach((m,i)=>{m.code='W-'+String(i+1).padStart(2,'0');MOD[m.id]=m;
  const fi=s=>m.subs.findIndex(x=>x.id===s);m.theory.sort((a,b)=>(a.sub?fi(a.sub):99)-(b.sub?fi(b.sub):99))});
// leerdoelen per niveau
const G={
basis:[['Optellen, aftrekken, tafels en delen uit je hoofd','Komma verschuiven bij ×/÷ 10, 100, 1000','Afronden op hele getallen'],['Grotere getallen splitsen en onder elkaar rekenen','Kommagetallen vermenigvuldigen','Eenvoudige verhaaltjessommen (naar boven afronden)'],['Kommagetallen optellen en delen zonder rekenmachine','Rekenen met meerdere stappen (verlies, verpakking, prijs)']],
rekenen:[['Rekenen met negatieve getallen','Volgorde van bewerkingen','Breuken met gelijke noemers, percentages'],['Gelijknamig maken, btw berekenen','Procentuele verandering','Gewogen gemiddelde'],['Delen door breuken, gemengde getallen','Terugrekenen van inclusief naar exclusief','Opeenvolgende procentuele veranderingen']],
eenheden:[['Lengte-eenheden omrekenen (mm–m)','m³ ↔ liter','kg → N met g = 10'],['Oppervlakte- en inhoudsfactoren','Snelheid en debiet','N/mm², kN/m², MPa'],['Mm-maten → m² en m³','Eigen gewicht in kN','Samengestelde eenheden (m³/h → L/s, km/h → m/s)']],
machten:[['Machten en wortels uit je hoofd','Machten van 10'],['Rekenregels voor machten','Negatieve exponenten','Wetenschappelijke notatie'],['Gebroken exponenten','Wortels vereenvoudigen','Terugrekenen met ∛ en √(4A/π)']],
schaal:[['Tekenmaat ↔ werkelijke maat op 1:100','Rechte evenredigheid'],['Andere schalen, schaal bepalen','Omgekeerde evenredigheid','Mengverhoudingen'],['Oppervlakte op schaal (n²)','Water-cementfactor','Meerstaps verhoudingen']],
meetkunde:[['Omtrek en oppervlak van rechthoek en driehoek','Inhoud van een balk','Pythagoras: schuine zijde'],['Cirkel, trapezium, maten in mm','Betonvolumes','Gevels met openingen'],['L-vormen en samengestelde figuren','Cilinders, ruimtediagonaal','Rondbogen, haaksheid controleren']],
natuurkunde:[['ρ = m/V','Druk p = F/A','Arbeid W = F·s'],['Massa uit volume en dichtheid','Waterdruk p = ρgh','Zwaarte-energie, vermogen'],['Massa per meter van profielen','Opwaartse waterdruk op kelders','Rendement, kWh en kosten']],
algebra:[['Formules invullen','Eenvoudige vergelijkingen','Haakjes wegwerken a(b+c)','Formules met × en ÷ omwerken'],['Vergelijkingen met x aan beide kanten','(a+b)(c+d)','Stelsels door substitutie'],['Merkwaardige producten','Formules met wortels en kwadraten omwerken','Stelsels door eliminatie']],
lineair:[['y = ax + b invullen','Richtingscoëfficiënt uit twee punten','Afschot in %','Optrede berekenen'],['Vergelijking oplossen met een lineaire formule','Afschot → mm','Minimaal aantal optredes','Interpoleren'],['Snijpunt van lijnen, b berekenen','Afschot 1:n','Stapmaatregel','Interpoleren met 3 decimalen']],
gonio:[['sin en cos met de schuine zijde','tan met twee rechthoekszijden','Hoekensom 180°'],['Inverse functies voor hoeken','Sparlengte','Sinusregel'],['Alle combinaties SOS-CAS-TOA','Helling % ↔ graden','Cosinusregel']],
kwadratisch:[['x² = c, product = 0','Discriminant uitrekenen','Top van een parabool (x)'],['Ontbinden met product-som','Aantal oplossingen','y-top'],['abc-formule','Parameter bij D = 0','Toepassingen met paden en bogen']],
mechanica:[['Krachten op één lijn','σ = F/A','M = F·a','q × L','Gronddruk q/b'],['Resultante van loodrechte krachten','Ronde kolommen','Hefboom','Oplegreacties','Lijnlast uit vloerlast'],['Kracht ontbinden','Kolom dimensioneren','Meerdere lasten','M = ⅛qL²','Poer dimensioneren']],
installaties:[['U = I·R','P = U·I','kWh berekenen','Q = V/t'],['I en R uitrekenen','Stroom van een apparaat','Energiekosten','Q = A·v'],['Serie en parallel','Groepsbelasting t.o.v. 16 A','COP warmtepomp','Leidingdiameter bepalen']],
bouwfysica:[['R = d/λ','Rc door optellen','U = 1/R','ΔT'],['Benodigde dikte','U met Rsi en Rse','Isolatie voor een Rc-eis','Φ = U·A·ΔT'],['Rc met spouw','U uit lagen','Gevel met glas','Oppervlaktetemperatuur']],
geluid:[['Twee gelijke bronnen +3 dB','−6 dB per verdubbeling','RV = pw/psat','Dauwpunt aflezen'],['n bronnen: +10·log n','20·log(r₂/r₁)','pw uit RV','Dauwpunt interpoleren'],['Ongelijke bronnen','Lijnbron','RV na afkoeling: condens?','Condensatierisico']],
economie:[['Prijs per m²','Opslag algemene kosten','Enkelvoudige rente','Lineaire afschrijving'],['Raming met kengetal','Gestapelde opslagen','Samengestelde rente','Boekwaarde'],['GO/BVO','Volledige begroting tot m²-prijs','Contante waarde','Degressieve afschrijving']]};
MODS.forEach(m=>m.goals=G[m.id]||[[],[],[]]);
})();

// ================= FORMULEKAARTEN PER NIVEAU =================
// FC(niveau, naam, formule, [[symbool, betekenis, eenheid]], wanneer, voorbeeld, valkuil)
const frx=t=>String(t).replace(/\{\{([^|}]*)\|([^}]*)\}\}/g,(m,a,b)=>Fh(a,b));
const FC=(l,n,f,s,w,e,p)=>({l,n,f:frx(f),s:(s||[]).map(r=>r.map(frx)),w:frx(w||''),e:frx(e||''),p:frx(p||'')});
const fr=Fh;
const FORMULAS={
basis:[
FC(1,'Optellen en aftrekken','a + b = b + a &nbsp;·&nbsp; a − b ≠ b − a',[['a, b','getallen','']],'Optellen mag in elke volgorde, aftrekken niet. Splits getallen in tientallen en eenheden.','47 + 38 = 47 + 30 + 8 = 85','Bij aftrekken maakt de volgorde uit: 30 − 12 = 18, maar 12 − 30 = −18.'),
FC(1,'Vermenigvuldigen splitsen','a × (b + c) = a × b + a × c',[['a, b, c','getallen','']],'Grote vermenigvuldigingen uit je hoofd: splits één getal.','34 × 6 = 30 × 6 + 4 × 6 = 180 + 24 = 204'),
FC(1,'Delen en controleren','a ÷ b = c &nbsp;⇔&nbsp; b × c = a',[['a','deeltal',''],['b','deler (niet 0)',''],['c','quotiënt','']],'Elke deling controleer je met een vermenigvuldiging.','56 ÷ 7 = 8, want 7 × 8 = 56','Delen door 0 kan niet.'),
FC(1,'Komma verschuiven','× 10ⁿ: komma n plaatsen naar rechts &nbsp;·&nbsp; ÷ 10ⁿ: n plaatsen naar links',[['n','aantal nullen (10 → 1, 100 → 2, 1000 → 3)','']],'Omrekenen tussen mm, cm en m, en snel rekenen met 10, 100, 1000.','2,45 × 100 = 245 &nbsp;·&nbsp; 3450 ÷ 1000 = 3,45'),
FC(1,'Afronden','cijfer na de afrondplek ≥ 5 → omhoog, anders omlaag',[],'Eindantwoorden op het gevraagde aantal decimalen.','3,4682 → 3,47 (2 decimalen) → 3,5 (1 decimaal) → 3','Tussentijds niet afronden; dat geeft afwijkingen.'),
FC(2,'Kommagetallen vermenigvuldigen','reken zonder komma; aantal decimalen = som van decimalen',[],'Hoeveelheden met kommagetallen zonder rekenmachine.','0,4 × 0,25: 4 × 25 = 100, 1 + 2 = 3 decimalen → 0,100 = 0,1'),
FC(2,'Verpakkingen: naar boven afronden','aantal = ⌈ benodigd ÷ inhoud per verpakking ⌉',[['⌈ ⌉','altijd naar boven afronden','']],'Materiaal bestellen: pakken, dozen, zakken, mixers.','23 m² ÷ 2,2 m² per pak = 10,45 → 11 pakken','Ook 10,05 wordt 11.'),
FC(3,'Delen door een kommagetal','a ÷ b = (a × 10ⁿ) ÷ (b × 10ⁿ)',[],'Maak de deler een geheel getal; de uitkomst verandert niet.','7,5 ÷ 0,25 = 750 ÷ 25 = 30'),
FC(3,'Snijverlies','benodigd = netto × (1 + verlies/100)',[['verlies','percentage extra materiaal','%']],'Tegels, laminaat, plaatmateriaal: altijd wat extra.','20 m² met 10% verlies → 20 × 1,1 = 22 m²')],
rekenen:[
FC(1,'Volgorde van bewerkingen','Haakjes → Machten/wortels → × ÷ → + −',[],'Elke berekening met meer dan één bewerking.','18 − 3 × (7 − 4)² ÷ 9 = 18 − 3 = 15','× en ÷ zijn gelijkwaardig: van links naar rechts. 12 ÷ 3 × 2 = 8.'),
FC(1,'Tekenregels','+ · + = + &nbsp; − · − = + &nbsp; + · − = −',[],'Vermenigvuldigen en delen met negatieve getallen.','(−4) × (−5) = 20 &nbsp;·&nbsp; 5 − (−3) = 8','−3² = −9, maar (−3)² = 9.'),
FC(1,'Procent van een getal','p% van x = {{p|100}} × x',[['p','percentage','%'],['x','het geheel','']],'Kortingen, opslagen, deel van een totaal.','15% van 240 = 0,15 × 240 = 36'),
FC(1,'Breuken vermenigvuldigen','{{a|b}} × {{c|d}} = {{a·c|b·d}}',[],'Een deel van een deel.','{{2|3}} × {{3|5}} = {{6|15}} = {{2|5}}'),
FC(2,'Breuken optellen','{{a|b}} + {{c|d}} = {{a·d + c·b|b·d}}',[],'Maak eerst gelijknamig (zelfde noemer).','{{1|4}} + {{2|3}} = {{3|12}} + {{8|12}} = {{11|12}}','Nooit tellers én noemers optellen.'),
FC(2,'Groeifactor','g = 1 + {{p|100}} &nbsp;(stijging) &nbsp;·&nbsp; g = 1 − {{p|100}} &nbsp;(daling)',[['g','groeifactor',''],['p','percentage','%']],'Elke procentuele verandering in één vermenigvuldiging.','+21% btw: × 1,21 &nbsp;·&nbsp; 15% korting: × 0,85'),
FC(2,'Procentuele verandering','verandering = {{nieuw − oud|oud}} × 100%',[],'Prijsstijgingen, afwijkingen, groei.','€ 120 → € 135: 15/120 × 100% = 12,5%','Altijd delen door de oude waarde.'),
FC(2,'Gemiddelde','x̄ = {{x₁ + x₂ + … + xₙ|n}}',[['n','aantal waarden','']],'Gemiddelde productie, sterkte, prijs.','(20 + 30 + 40) ÷ 3 = 30'),
FC(2,'Gewogen gemiddelde','x̄ = {{Σ (wᵢ · xᵢ)|Σ wᵢ}}',[['wᵢ','weging van waarde i','']],'Cijfers met verschillende weging, gemiddelde prijs bij verschillende hoeveelheden.','6 (×1), 7 (×1), 8 (×2): 29 ÷ 4 = 7,25'),
FC(3,'Delen door een breuk','{{a|b}} ÷ {{c|d}} = {{a|b}} × {{d|c}}',[],'Vermenigvuldig met het omgekeerde.','{{3|4}} ÷ {{1|2}} = {{3|4}} × 2 = {{3|2}}'),
FC(3,'Terugrekenen (exclusief uit inclusief)','oud = {{nieuw|g}}',[['g','groeifactor','']],'Bedrag zonder btw uit een bedrag met btw.','€ 968 incl. 21%: 968 ÷ 1,21 = € 800','Niet 21% van € 968 aftrekken.'),
FC(3,'Opeenvolgende veranderingen','g<sub>totaal</sub> = g₁ × g₂ × …',[],'Meerdere jaren prijsstijging, korting op korting.','+20% en −20%: 1,2 × 0,8 = 0,96 → −4%','Percentages niet optellen.')],
eenheden:[
FC(1,'Lengte','1 km = 1000 m &nbsp;·&nbsp; 1 m = 10 dm = 100 cm = 1000 mm',[],'Tekeningmaten (mm) omzetten naar rekenmaten (m).','3600 mm = 3,6 m'),
FC(1,'Inhoud en liter','1 m³ = 1000 dm³ = 1000 L &nbsp;·&nbsp; 1 dm³ = 1 L &nbsp;·&nbsp; 1 cm³ = 1 mL',[],'Water, reservoirs, beton.','2,5 m³ = 2500 L'),
FC(1,'Zwaartekracht','F<sub>z</sub> = m · g',[['F<sub>z</sub>','zwaartekracht (gewicht)','N'],['m','massa','kg'],['g','valversnelling (9,81 ≈ 10)','N/kg']],'Van kilogram naar newton. Belastingen in de constructieleer zijn krachten.','25 kg cement: 25 × 10 = 250 N','1 kN ≈ 100 kg, niet 1000 kg.'),
FC(1,'Tijd','1 h = 60 min = 3600 s',[],'Uren omrekenen naar decimale uren.','45 min = 0,75 h','1,5 h = 1 h 30 min, niet 1 h 50 min.'),
FC(2,'Oppervlakte','1 m² = 100 dm² = 10 000 cm² = 1 000 000 mm²',[],'Stap is ×100 omdat 10 × 10. 1 ha = 10 000 m².','2400 × 1200 mm = 2,4 × 1,2 m = 2,88 m²','Reken eerst om naar m, dán vermenigvuldigen.'),
FC(2,'Spanning en druk','1 N/mm² = 1 MPa = 1000 kN/m² = 10⁶ N/m²',[['MPa','megapascal','N/mm²'],['kPa','kilopascal','kN/m²']],'Materiaalsterkte (N/mm²) en belastingen (kN/m²).','30 N/mm² = 30 000 kN/m²'),
FC(2,'Snelheid','v = {{s|t}} &nbsp;·&nbsp; km/h ÷ 3,6 = m/s',[['v','snelheid','m/s'],['s','afstand','m'],['t','tijd','s']],'Transport, windsnelheid, stroomsnelheid.','72 km/h ÷ 3,6 = 20 m/s'),
FC(2,'Debiet','Q = {{V|t}}',[['Q','debiet','L/s of m³/h'],['V','volume','L of m³'],['t','tijd','s of h']],'Pompen, kranen, afvoeren.','500 L in 20 min = 25 L/min'),
FC(3,'Eigen gewicht','G = V · ρ · g &nbsp;=&nbsp; V · γ',[['V','volume','m³'],['ρ','volumieke massa','kg/m³'],['γ','volumiek gewicht (beton 24)','kN/m³']],'Gewicht van balken, vloeren, wanden.','Balk 0,3 × 0,5 × 6 m = 0,9 m³ × 24 = 21,6 kN'),
FC(3,'Samengestelde eenheden','m³/h × 1000 ÷ 3600 = L/s',[],'Eenheden met een deelstreep: teller en noemer apart omrekenen.','18 m³/h = 18 000 L / 3600 s = 5 L/s')],
machten:[
FC(1,'Macht','aⁿ = a × a × … × a (n keer)',[['a','grondtal',''],['n','exponent','']],'Oppervlakte (m²), inhoud (m³), formules als ⅛qL².','2⁵ = 32 &nbsp;·&nbsp; 10³ = 1000'),
FC(1,'Wortel','√a = b &nbsp;⇔&nbsp; b² = a',[],'Terugrekenen van oppervlak naar zijde, Pythagoras.','√81 = 9 &nbsp;·&nbsp; vierkante kamer van 36 m² → zijde 6 m'),
FC(2,'Product van machten','aᵖ · aᵠ = aᵖ⁺ᵠ',[],'Zelfde grondtal vermenigvuldigen: exponenten optellen.','x³ · x⁵ = x⁸ &nbsp;·&nbsp; 10³ · 10⁴ = 10⁷','a² + a³ ≠ a⁵'),
FC(2,'Quotiënt van machten','{{aᵖ|aᵠ}} = aᵖ⁻ᵠ',[],'Zelfde grondtal delen: exponenten aftrekken.','{{10⁶|10²}} = 10⁴'),
FC(2,'Macht van een macht','(aᵖ)ᵠ = aᵖ·ᵠ',[],'Haakjes met een macht erbuiten.','(x²)⁴ = x⁸'),
FC(2,'Negatieve en nulde exponent','a⁻ⁿ = {{1|aⁿ}} &nbsp;·&nbsp; a⁰ = 1',[],'Kleine getallen, eenheden als m⁻¹.','10⁻³ = 0,001 &nbsp;·&nbsp; 2⁻² = 0,25'),
FC(2,'Wetenschappelijke notatie','c × 10ⁿ met 1 ≤ c &lt; 10',[['c','coëfficiënt',''],['n','aantal plaatsen dat de komma verschuift','']],'Zeer grote en kleine getallen (E-modulus, uitzetting).','210 000 = 2,1 × 10⁵ &nbsp;·&nbsp; 0,000012 = 1,2 × 10⁻⁵'),
FC(3,'Gebroken exponent','a<sup>p/q</sup> = (ᵠ√a)ᵖ',[],'Wortels als machten schrijven; rekenmachine.','8<sup>2/3</sup> = (∛8)² = 4 &nbsp;·&nbsp; √x = x<sup>½</sup>'),
FC(3,'Wortels splitsen','√(a · b) = √a · √b',[],'Wortels vereenvoudigen.','√72 = √36 · √2 = 6√2','√(a + b) ≠ √a + √b'),
FC(3,'Terugrekenen','z = √A &nbsp;·&nbsp; z = ∛V &nbsp;·&nbsp; d = √({{4A|π}})',[['A','oppervlak','m²'],['V','inhoud','m³'],['d','diameter','m']],'Maat bepalen uit gewenst oppervlak of volume.','Kolom met A = 0,1 m²: d = √(0,4/π) = 0,357 m')],
schaal:[
FC(1,'Schaal 1:n','werkelijk = tekenmaat × n',[['n','schaalgetal (1:50 → 50)','']],'Maten van een tekening opmeten.','1:100, 45 mm → 4500 mm = 4,5 m','Reken in mm; zet daarna om.'),
FC(1,'Recht evenredig','{{a₁|b₁}} = {{a₂|b₂}}',[],'Meer = evenredig meer (prijs per m², stenen per m²). Reken via 1 eenheid.','3 m² = € 45 → 1 m² = € 15 → 8 m² = € 120'),
FC(2,'Tekenmaat','tekenmaat = {{werkelijk|n}}',[],'Iets op schaal tekenen.','4,2 m op 1:50 = 4200 ÷ 50 = 84 mm'),
FC(2,'Schaal bepalen','n = {{werkelijke maat|tekenmaat}}',[],'Onbekende schaal achterhalen (zelfde eenheden!).','45 mm ↔ 2,25 m: 2250 ÷ 45 = 50 → 1:50'),
FC(2,'Omgekeerd evenredig','a₁ · b₁ = a₂ · b₂',[],'Meer = minder (mensen en dagen, snelheid en tijd).','4 man × 6 dagen = 24 = 3 man × 8 dagen'),
FC(2,'Mengverhouding','1 deel = {{totaal|som van de delen}}',[],'Beton (1:2:3), mortel (1:4).','1,8 m³ in 1:2:3 → 1 deel = 0,3 m³ → zand 0,6 m³'),
FC(3,'Oppervlakte op schaal','A<sub>werkelijk</sub> = A<sub>tekening</sub> × n²',[],'Oppervlakken opmeten op tekening.','1:100: 1 cm² → 10 000 cm² = 1 m²','Factor n², niet n.'),
FC(3,'Water-cementfactor','wcf = {{m<sub>water</sub>|m<sub>cement</sub>}}',[['m','massa','kg']],'Betonsamenstelling; lager = sterker beton.','300 kg cement, wcf 0,5 → 150 L water')],
meetkunde:[
FC(1,'Omtrek rechthoek','O = 2(l + b)',[['l','lengte','m'],['b','breedte','m']],'Plinten, kitvoegen, bekisting, hekwerk.','4 × 3 m: O = 14 m'),
FC(1,'Oppervlak rechthoek','A = l · b',[['A','oppervlak','m²']],'Vloeren, wanden, platen.','4,2 × 3,5 = 14,7 m²'),
FC(1,'Oppervlak driehoek','A = ½ · b · h',[['b','basis','m'],['h','loodrechte hoogte op b','m']],'Geveltoppen, schuine stukken.','b = 8 m, h = 3 m → 12 m²','h is de loodrechte hoogte, niet de schuine zijde.'),
FC(1,'Inhoud balk (prisma)','V = l · b · h &nbsp;=&nbsp; A<sub>grondvlak</sub> · h',[['V','inhoud','m³']],'Ontgraving, betonvloer, ruimtes.','8 × 6 × 0,2 = 9,6 m³'),
FC(1,'Pythagoras','a² + b² = c²',[['a, b','rechthoekszijden','m'],['c','schuine zijde (tegenover rechte hoek)','m']],'Diagonalen, schuine lengtes, haaks uitzetten (3-4-5).','3² + 4² = 25 → c = 5'),
FC(2,'Cirkel','A = π r² = ¼ π d² &nbsp;·&nbsp; O = 2π r = π d',[['r','straal','m'],['d','diameter = 2r','m']],'Ronde kolommen, leidingen, putten.','d = 400 mm: A = ¼π × 0,4² = 0,126 m²','Niet r en d verwisselen.'),
FC(2,'Trapezium','A = ½ (a + b) · h',[['a, b','evenwijdige zijden','m'],['h','afstand ertussen','m']],'Taluds, schuine percelen, dwarsdoorsneden.','a = 6, b = 4, h = 3 → 15 m²'),
FC(2,'Netto oppervlak','A<sub>netto</sub> = A<sub>bruto</sub> − A<sub>openingen</sub>',[],'Gevels schilderen, metselwerk, isolatie.','Wand 10 m² − deur 2,14 m² = 7,86 m²'),
FC(2,'Rechthoekszijde','b = √(c² − a²)',[],'Ladder tegen een gevel, hoogte uit schuine lengte.','c = 5, a = 1,5 → b = 4,77 m'),
FC(3,'Cilinder','V = π r² h',[],'Ronde kolommen, palen, tanks.','r = 0,15 m, h = 3 m → 0,212 m³'),
FC(3,'Ruimtediagonaal','d = √(l² + b² + h²)',[],'Langste maat in een ruimte (passen lange elementen?).','5 × 4 × 2,6 m → 6,9 m'),
FC(3,'Halve cirkel (rondboog)','A = ½ π r²',[],'Boogramen, poorten.','r = 0,75 m → 0,884 m²'),
FC(3,'Omtrek L-vorm','O = 2(L<sub>totaal</sub> + B<sub>totaal</sub>)',[],'Plattegronden met alleen rechte hoeken.','L-vorm in 9 × 7 m: O = 32 m')],
natuurkunde:[
FC(1,'Dichtheid','ρ = {{m|V}}',[['ρ','dichtheid (volumieke massa)','kg/m³'],['m','massa','kg'],['V','volume','m³']],'Materiaal herkennen, gewicht bepalen. Beton 2400, staal 7850, hout ±500, water 1000.','1,2 t in 0,5 m³ → 2400 kg/m³'),
FC(1,'Druk','p = {{F|A}}',[['p','druk','Pa = N/m²'],['F','kracht','N'],['A','oppervlak','m²']],'Druk op de grond, drukverdeling.','2000 N op 0,5 m² = 4000 Pa','1 kPa = 1 kN/m².'),
FC(1,'Arbeid','W = F · s',[['W','arbeid','J'],['F','kracht','N'],['s','verplaatsing in de richting van F','m']],'Duwen, trekken, hijsen.','300 N over 4 m = 1200 J'),
FC(1,'Vermogen','P = {{W|t}}',[['P','vermogen','W = J/s'],['t','tijd','s']],'Hoe snel arbeid geleverd wordt.','6000 J in 30 s = 200 W'),
FC(2,'Massa uit volume','m = ρ · V',[],'Gewicht van bouwmateriaal.','50 dm³ staal = 0,05 × 7850 = 392,5 kg'),
FC(2,'Hydrostatische druk','p = ρ · g · h',[['ρ','dichtheid vloeistof','kg/m³'],['g','10','N/kg'],['h','diepte','m']],'Water in bouwputten, kelders, damwanden.','3 m water: 1000 × 10 × 3 = 30 kPa','Ca. 10 kPa per meter water.'),
FC(2,'Zwaarte-energie','E<sub>z</sub> = m · g · h',[['E<sub>z</sub>','energie','J'],['h','hoogte','m']],'Hijsen, liften.','500 kg naar 20 m = 100 kJ'),
FC(3,'Rendement','η = {{E<sub>nuttig</sub>|E<sub>in</sub>}} × 100%',[['η','rendement','%']],'Motoren, pompen, installaties.','80 kJ nuttig van 100 kJ = 80%'),
FC(3,'Opwaartse kracht','F = p · A = γ<sub>w</sub> · h · A',[['γ<sub>w</sub>','10','kN/m³']],'Opdrijven van kelders en bouwputvloeren.','h = 2 m, A = 80 m²: 1600 kN'),
FC(3,'Energie in kWh','E (kWh) = P (kW) × t (h) &nbsp;·&nbsp; 1 kWh = 3,6 × 10⁶ J',[],'Energierekening, bouwstroom.','2 kW × 8 h = 16 kWh')],
algebra:[
FC(1,'Formule invullen','vervang elke letter door zijn waarde (met juiste eenheid)',[],'Elke berekening met een formule.','A = l · b met l = 4, b = 3 → 12'),
FC(1,'Balansmethode','doe links en rechts hetzelfde',[],'Vergelijkingen oplossen.','3x + 5 = 20 → 3x = 15 → x = 5'),
FC(1,'Haakjes wegwerken','a(b + c) = ab + ac',[],'Formules vereenvoudigen.','3(x + 4) = 3x + 12'),
FC(1,'Formule omwerken (× en ÷)','y = a · x &nbsp;⇒&nbsp; x = {{y|a}}',[],'Andere grootheid vrijmaken.','σ = F/A ⇒ A = F/σ'),
FC(2,'Dubbele haakjes','(a + b)(c + d) = ac + ad + bc + bd',[],'Elke term met elke term.','(x + 2)(x + 5) = x² + 7x + 10'),
FC(2,'x aan beide kanten','ax + b = cx + d &nbsp;⇒&nbsp; x = {{d − b|a − c}}',[],'Break-even, snijpunt.','5x − 7 = 2x + 8 → x = 5'),
FC(2,'Substitutie','y = … invullen in de andere vergelijking',[],'Stelsel met één vergelijking in de vorm y = ….','y = 2x + 1 en x + y = 7 → 3x + 1 = 7 → x = 2'),
FC(3,'Merkwaardige producten','(a ± b)² = a² ± 2ab + b² &nbsp;·&nbsp; (a + b)(a − b) = a² − b²',[],'Snel uitwerken en ontbinden.','(x + 3)² = x² + 6x + 9','(x + 3)² ≠ x² + 9'),
FC(3,'Omwerken met kwadraat','y = a x² &nbsp;⇒&nbsp; x = √({{y|a}})',[],'L uit M = qL²/8, r uit V = πr²h.','L = √(8M / q)'),
FC(3,'Eliminatie','vermenigvuldig zodat een onbekende wegvalt, dan aftrekken',[],'Algemene stelsels.','2x + 3y = 12 en x − y = 1: ×2 → 5y = 10 → y = 2')],
lineair:[
FC(1,'Lineaire formule','y = a x + b',[['a','richtingscoëfficiënt (helling)',''],['b','startgetal (y bij x = 0)','']],'Vaste kosten + kosten per eenheid; rechte lijnen.','K = 85d + 250 → 5 dagen: € 675'),
FC(1,'Richtingscoëfficiënt','a = {{Δy|Δx}} = {{y₂ − y₁|x₂ − x₁}}',[],'Helling uit twee punten.','(1, 3) en (4, 9): a = 6/3 = 2'),
FC(1,'Afschot','afschot = {{Δh|L}} × 100%',[['Δh','hoogteverschil','m'],['L','horizontale lengte','m']],'Daken, goten, riolering, vloeren.','120 mm over 8 m: 0,12/8 = 1,5%','Δh en L in dezelfde eenheid.'),
FC(1,'Optrede','o = {{h|n}}',[['o','optrede','mm'],['h','verdiepingshoogte','mm'],['n','aantal optredes','']],'Trapontwerp.','2700 / 15 = 180 mm'),
FC(2,'Startgetal','b = y₁ − a · x₁',[],'Formule van de lijn afmaken.','a = 2, punt (1, 3): b = 1'),
FC(2,'Afschot omrekenen','p% = 10·p mm per m &nbsp;·&nbsp; 1 : n = {{100|n}}%',[],'Afschot in verschillende notaties.','1,6% = 16 mm/m &nbsp;·&nbsp; 1:200 = 0,5%'),
FC(2,'Aantal optredes','n = ⌈ h / o<sub>max</sub> ⌉',[['o<sub>max</sub>','max. optrede woning: 188','mm']],'Minimaal aantal treden.','2850 / 188 = 15,2 → 16'),
FC(2,'Lineair interpoleren','y = y₁ + (y₂ − y₁) · {{x − x₁|x₂ − x₁}}',[],'Tussenwaarden uit tabellen.','10 °C: 1228, 12 °C: 1402 → 11 °C: 1315'),
FC(3,'Snijpunt','a₁x + b₁ = a₂x + b₂ &nbsp;⇒&nbsp; x = {{b₂ − b₁|a₁ − a₂}}',[],'Wanneer zijn twee opties even duur?','85d + 250 = 110d → d = 10'),
FC(3,'Stapmaatregel','2o + a ≈ 630 mm (570–630)',[['a','aantrede','mm']],'Comfortabele trap. Woning: a ≥ 220 mm.','o = 180 → a = 270 mm'),
FC(3,'Traplengte','L = (n − 1) · a',[],'Ruimtebeslag van de trap in de plattegrond.','16 optredes, a = 255: 3825 mm')],
gonio:[
FC(1,'Sinus','sin α = {{O|S}}',[['O','overstaande rechthoekszijde','m'],['S','schuine zijde','m']],'Je kent/zoekt overstaande en schuine zijde.','S = 5, α = 30° → O = 2,5'),
FC(1,'Cosinus','cos α = {{A|S}}',[['A','aanliggende rechthoekszijde','m']],'Je kent/zoekt aanliggende en schuine zijde.','S = 5, α = 60° → A = 2,5'),
FC(1,'Tangens','tan α = {{O|A}}',[],'Je kent/zoekt de twee rechthoekszijden.','A = 4, O = 3 → tan α = 0,75'),
FC(1,'Hoekensom','α + β + γ = 180°',[],'Elke driehoek.','90° + 35° + 55° = 180°'),
FC(2,'Hoek berekenen','α = sin⁻¹({{O|S}}) = cos⁻¹({{A|S}}) = tan⁻¹({{O|A}})',[],'Twee zijden bekend, hoek gezocht.','tan⁻¹(0,6) = 31,0°','Rekenmachine op DEG.'),
FC(2,'Nokhoogte','h = ½ b · tan α',[['b','overspanning','m'],['α','dakhelling','°']],'Zadeldaken.','b = 8 m, 40° → 3,36 m'),
FC(2,'Sparlengte','s = {{½ b|cos α}}',[],'Lengte van dakspanten/sporen.','b = 8 m, 40° → 5,22 m'),
FC(2,'Sinusregel','{{a|sin A}} = {{b|sin B}} = {{c|sin C}}',[['a','zijde tegenover hoek A','m']],'Willekeurige driehoek: 2 hoeken + 1 zijde bekend.','A = 50°, B = 60°, a = 4 → b = 4,52'),
FC(3,'Helling % ↔ graden','tan α = {{p|100}}',[['p','helling','%']],'Hellingen omrekenen.','100% = 45° &nbsp;·&nbsp; 30° = 57,7%','100% is níet 90°.'),
FC(3,'Cosinusregel','a² = b² + c² − 2bc · cos A',[],'Twee zijden en de ingesloten hoek, of drie zijden.','b = 4, c = 5, A = 60° → a = 4,58'),
FC(3,'Kracht ontbinden','F<sub>h</sub> = F cos α &nbsp;·&nbsp; F<sub>v</sub> = F sin α',[],'Schuine krachten (trekstangen, schoren).','F = 50 kN, 30° → 43,3 en 25 kN')],
kwadratisch:[
FC(1,'Wortel trekken','x² = c &nbsp;⇒&nbsp; x = √c of x = −√c',[],'Vergelijking zonder x-term.','x² = 49 → x = ±7','Vergeet de negatieve oplossing niet.'),
FC(1,'Nulproduct','A · B = 0 &nbsp;⇒&nbsp; A = 0 of B = 0',[],'Vergelijking in ontbonden vorm.','(x − 2)(x + 5) = 0 → x = 2 of −5'),
FC(1,'Discriminant','D = b² − 4ac',[['a, b, c','coëfficiënten van ax² + bx + c','']],'Aantal oplossingen bepalen.','x² − 4x + 3: D = 16 − 12 = 4'),
FC(1,'Top (x)','x<sub>top</sub> = {{−b|2a}}',[],'Hoogste of laagste punt van een parabool.','y = x² − 6x + 1 → x = 3'),
FC(2,'Product-som','x² + bx + c = (x + p)(x + q) met p·q = c, p + q = b',[],'Ontbinden zonder abc-formule.','x² − x − 12 = (x − 4)(x + 3)'),
FC(2,'Aantal oplossingen','D &gt; 0: 2 &nbsp;·&nbsp; D = 0: 1 &nbsp;·&nbsp; D &lt; 0: 0',[],'Snel controleren of er een oplossing is.','x² + 2x + 5: D = −16 → geen'),
FC(2,'Top (y)','y<sub>top</sub> = a·x<sub>top</sub>² + b·x<sub>top</sub> + c',[],'Maximale hoogte, minimale waarde.','y = −x² + 4x → top (2, 4)'),
FC(3,'abc-formule','x = {{−b ± √D|2a}}',[],'Werkt altijd bij ax² + bx + c = 0.','2x² + 3x − 4 = 0: x ≈ 0,85 of −2,35','Haakjes bij negatieve getallen invullen.'),
FC(3,'Parabool in de bouw','M(x) = ½ q x (L − x) &nbsp;·&nbsp; M<sub>max</sub> = ⅛ q L²',[],'Momentenlijn van een gelijkmatig belaste ligger: een parabool met de top in het midden.','q = 10, L = 6: M<sub>max</sub> = 45 kNm')],
mechanica:[
FC(1,'Resultante op één lijn','R = F₁ ± F₂',[],'Krachten in dezelfde (+) of tegengestelde (−) richting.','10 kN omlaag + 4 kN omhoog = 6 kN omlaag'),
FC(1,'Spanning','σ = {{F|A}}',[['σ','spanning','N/mm²'],['F','kracht','N'],['A','oppervlak doorsnede','mm²']],'Controleren of een kolom of staaf het houdt.','200 kN op 200 × 200 mm: 200 000 / 40 000 = 5 N/mm²','F in N en A in mm².'),
FC(1,'Moment','M = F · a',[['M','moment','kNm'],['a','loodrechte arm tot het draaipunt','m']],'Draaiende werking, buiging.','10 kN × 2,5 m = 25 kNm'),
FC(1,'Totale lijnlast','Q = q · L',[['q','lijnlast','kN/m'],['L','lengte','m']],'Verdeelde last omzetten naar één kracht (in het midden).','5 kN/m × 6 m = 30 kN'),
FC(1,'Gronddruk strook','p = {{q|b}}',[['p','gronddruk','kN/m²'],['b','strookbreedte','m']],'Strokenfundering controleren.','120 kN/m op 0,6 m = 200 kN/m²'),
FC(2,'Resultante loodrecht','R = √(F<sub>h</sub>² + F<sub>v</sub>²)',[],'Twee loodrechte krachten samenstellen.','3 en 4 kN → 5 kN'),
FC(2,'Momentevenwicht','ΣM = 0 &nbsp;⇒&nbsp; F₁ · a₁ = F₂ · a₂',[],'Hefbomen, wippen, oplegreacties.','10 kN × 2 m = F × 4 m → F = 5 kN'),
FC(2,'Evenwichtsvoorwaarden','ΣF<sub>h</sub> = 0 &nbsp;·&nbsp; ΣF<sub>v</sub> = 0 &nbsp;·&nbsp; ΣM = 0',[],'Elke constructie in rust.',''),
FC(2,'Oplegreacties puntlast','R<sub>B</sub> = {{F · a|L}} &nbsp;·&nbsp; R<sub>A</sub> = F − R<sub>B</sub>',[['a','afstand last tot A','m'],['L','overspanning','m']],'Ligger op twee steunpunten.','F = 30, a = 2, L = 6: R<sub>B</sub> = 10, R<sub>A</sub> = 20 kN'),
FC(2,'Vlaklast → lijnlast','q = p · h.o.h.',[['p','vloerbelasting','kN/m²'],['h.o.h.','balkafstand','m']],'Belasting op één vloerbalk.','3 kN/m² × 0,6 m = 1,8 kN/m'),
FC(2,'Gronddruk poer','p = {{F|a · b}}',[],'Poeren onder kolommen.','600 kN op 1,5 × 1,5 m = 267 kN/m²'),
FC(3,'Maximaal moment','M<sub>max</sub> = ⅛ q L² &nbsp;·&nbsp; M<sub>max</sub> = ¼ F L (puntlast midden)',[],'Ligger op twee steunpunten.','q = 8, L = 5: 25 kNm'),
FC(3,'Benodigd oppervlak','A = {{F|σ<sub>toel</sub>}} &nbsp;·&nbsp; A = {{F|p<sub>toel</sub>}}',[],'Kolom of poer dimensioneren.','800 kN / 200 kN/m² = 4 m² → poer 2 × 2 m'),
FC(3,'q-last + puntlast','R<sub>A</sub> = ½ q L + F · {{L − a|L}}',[],'Combinaties: lasten afzonderlijk berekenen en optellen (superpositie).','')],
installaties:[
FC(1,'Wet van Ohm','U = I · R',[['U','spanning','V'],['I','stroomsterkte','A'],['R','weerstand','Ω']],'Spanning, stroom en weerstand.','2 A × 115 Ω = 230 V'),
FC(1,'Elektrisch vermogen','P = U · I',[['P','vermogen','W']],'Hoeveel vermogen een apparaat gebruikt.','230 V × 10 A = 2300 W'),
FC(1,'Elektrische energie','E = P · t',[['E','energie','kWh'],['P','vermogen','kW'],['t','tijd','h']],'Verbruik en energierekening.','1,5 kW × 4 h = 6 kWh'),
FC(1,'Debiet','Q = {{V|t}}',[],'Hoeveel water per tijdseenheid.','600 L in 10 min = 60 L/min'),
FC(2,'Stroom uit vermogen','I = {{P|U}}',[],'Past een apparaat op een groep?','2000 W / 230 V = 8,7 A'),
FC(2,'Energiekosten','kosten = E · tarief',[['tarief','prijs per kWh','€/kWh']],'Kosten van verbruik.','3000 kWh × € 0,34 = € 1020'),
FC(2,'Debiet in een leiding','Q = A · v',[['A','doorsnede = ¼πd²','m²'],['v','stroomsnelheid','m/s']],'Capaciteit van een leiding.','d = 28 mm, v = 1,5 → 0,92 L/s'),
FC(3,'Serie en parallel','serie: R = R₁ + R₂ &nbsp;·&nbsp; parallel: {{1|R}} = {{1|R₁}} + {{1|R₂}}',[],'Schakelingen doorrekenen.','30 Ω ∥ 60 Ω = 20 Ω'),
FC(3,'Groepsbelasting','I<sub>totaal</sub> = {{ΣP|230}} ≤ 16 A',[],'Maximaal ±3680 W per 16 A-groep.',''),
FC(3,'COP warmtepomp','E<sub>elektrisch</sub> = {{Q<sub>warmte</sub>|COP}}',[],'Stroomverbruik van een warmtepomp.','12 000 kWh warmte / COP 4 = 3000 kWh stroom'),
FC(3,'Leidingdiameter','d = √({{4Q|π v}})',[],'Minimale diameter bij gegeven debiet en max. snelheid.','Q = 1 L/s, v = 1,5 → 29 mm')],
bouwfysica:[
FC(1,'Warmteweerstand laag','R = {{d|λ}}',[['R','warmteweerstand','m²K/W'],['d','dikte','m'],['λ','warmtegeleidingscoëfficiënt','W/(m·K)']],'Isolerend vermogen van één laag.','120 mm glaswol: 0,12 / 0,035 = 3,43','d in meter, niet in mm.'),
FC(1,'Rc-waarde','R<sub>c</sub> = R₁ + R₂ + …',[],'Hele constructie (alle lagen).','3,43 + 0,12 + 0,17 = 3,72'),
FC(1,'U-waarde','U = {{1|R<sub>T</sub>}}',[['U','warmtedoorgangscoëfficiënt','W/(m²K)']],'Hoeveel warmte erdoor gaat; lager is beter.','R<sub>T</sub> = 5 → U = 0,2'),
FC(1,'Temperatuurverschil','ΔT = T<sub>i</sub> − T<sub>e</sub>',[['ΔT','verschil','K']],'Basis voor warmteverlies.','20 − (−5) = 25 K'),
FC(2,'Totale weerstand','R<sub>T</sub> = R<sub>si</sub> + R<sub>c</sub> + R<sub>se</sub>',[['R<sub>si</sub>','binnen (wand 0,13)','m²K/W'],['R<sub>se</sub>','buiten (0,04)','m²K/W']],'Van R<sub>c</sub> naar U.','4,7 + 0,17 = 4,87 → U = 0,205'),
FC(2,'Benodigde dikte','d = R · λ',[],'Hoe dik moet de isolatie?','R = 4 met PIR (0,022): 88 mm'),
FC(2,'Warmtestroom','Φ = U · A · ΔT',[['Φ','warmtestroom','W'],['A','oppervlak','m²']],'Warmteverlies door een bouwdeel.','0,2 × 50 × 25 = 250 W'),
FC(2,'Eisen nieuwbouw','R<sub>c</sub> gevel ≥ 4,7 &nbsp;·&nbsp; vloer ≥ 3,7 &nbsp;·&nbsp; dak ≥ 6,3',[],'Minimale isolatie (Bbl).',''),
FC(3,'Isolatie voor een eis','d = (R<sub>c,eis</sub> − R<sub>overig</sub>) · λ',[],'Isolatiedikte in een samengestelde constructie.','(4,7 − 0,4) × 0,035 = 0,151 m'),
FC(3,'Warmtestroomdichtheid','q = U · ΔT',[['q','W per m²','W/m²']],'Verlies per m².','0,2 × 25 = 5 W/m²'),
FC(3,'Oppervlaktetemperatuur','θ<sub>si</sub> = T<sub>i</sub> − {{R<sub>si</sub>|R<sub>T</sub>}} · (T<sub>i</sub> − T<sub>e</sub>)',[],'Condens- en schimmelrisico.','R<sub>T</sub> = 0,5: 20 − 0,26 × 25 = 13,5 °C'),
FC(3,'Energie per periode','E = Φ · t',[['E','energie','Wh of kWh'],['t','tijd','h']],'Verlies per dag of seizoen.','300 W × 24 h = 7,2 kWh')],
geluid:[
FC(1,'Twee gelijke bronnen','L<sub>tot</sub> = L + 3 dB',[['L','geluidsniveau','dB']],'Twee identieke machines.','80 + 80 dB = 83 dB','dB tel je niet gewoon op.'),
FC(1,'Puntbron en afstand','−6 dB per verdubbeling van de afstand',[],'Machines, installaties.','90 dB op 10 m → 84 dB op 20 m'),
FC(1,'Relatieve vochtigheid','RV = {{p<sub>w</sub>|p<sub>sat</sub>}} × 100%',[['p<sub>w</sub>','dampdruk','Pa'],['p<sub>sat</sub>','verzadigingsdruk (tabel)','Pa']],'Hoe vochtig is de lucht?','1400 / 2339 = 60%'),
FC(1,'Dauwpunt','θ<sub>dauw</sub>: p<sub>sat</sub>(θ) = p<sub>w</sub>',[],'Temperatuur waarop condens ontstaat.','p<sub>w</sub> = 1228 Pa → 10 °C'),
FC(2,'n gelijke bronnen','L<sub>tot</sub> = L + 10 · log(n)',[],'Meerdere identieke bronnen.','4 × 80 dB = 86 dB'),
FC(2,'Puntbron (algemeen)','L₂ = L₁ − 20 · log({{r₂|r₁}})',[['r','afstand','m']],'Niveau op een andere afstand.','10 → 50 m: −14 dB'),
FC(2,'Dampdruk','p<sub>w</sub> = RV · p<sub>sat</sub>',[],'Hoeveel waterdamp er in de lucht zit.','60% bij 20 °C: 1403 Pa'),
FC(3,'Ongelijke bronnen','L = 10 · log(10<sup>L₁/10</sup> + 10<sup>L₂/10</sup>)',[],'Bronnen met verschillend niveau.','80 + 74 dB = 81 dB'),
FC(3,'Lijnbron','L₂ = L₁ − 10 · log({{r₂|r₁}})',[],'Weg- en spoorverkeer: −3 dB per verdubbeling.','70 dB op 25 m → 64 dB op 100 m'),
FC(3,'Condensatie-check','condens als θ<sub>oppervlak</sub> &lt; θ<sub>dauw</sub>',[],'Ramen, koudebruggen.','')],
economie:[
FC(1,'Prijs per m²','p = {{K|A}}',[['K','kosten','€'],['A','oppervlak (BVO of GO)','m²']],'Projecten vergelijken.','€ 300 000 / 150 m² = € 2000/m²'),
FC(1,'Opslag','K<sub>nieuw</sub> = K · (1 + {{p|100}})',[],'Algemene kosten, winst en risico, btw.','€ 100 000 + 8% AK = € 108 000'),
FC(1,'Enkelvoudige rente','R = K · {{p|100}} · n',[['K','beginbedrag','€'],['p','rente','%/jaar'],['n','jaren','']],'Rente alleen over het beginbedrag.','€ 10 000, 4%, 5 jaar = € 2000'),
FC(1,'Lineaire afschrijving','a = {{A − R|n}}',[['A','aanschafwaarde','€'],['R','restwaarde','€'],['n','levensduur','jaar']],'Gelijke afschrijving per jaar.','(€ 50 000 − € 5000) / 10 = € 4500'),
FC(2,'Raming met kengetal','K = A · kengetal · (1 + onvoorzien)',[],'Eerste kostenschatting.','800 m² × € 1900 × 1,05 = € 1,6 mln'),
FC(2,'Gestapelde opslagen','K = DK · (1 + AK) · (1 + W&R) · 1,21',[['DK','directe kosten','€']],'Van directe kosten naar aanneemsom en totaal.',''),
FC(2,'Samengestelde rente','K<sub>n</sub> = K · (1 + {{p|100}})ⁿ',[],'Rente op rente.','€ 10 000, 4%, 5 jaar = € 12 166,53'),
FC(2,'Boekwaarde','B<sub>k</sub> = A − k · a',[['k','aantal verstreken jaren','']],'Wat is een machine nu nog waard?',''),
FC(3,'GO/BVO','GO = BVO · f &nbsp;(f ≈ 0,75–0,85)',[],'Efficiëntie van een ontwerp.','1000 m² BVO × 0,8 = 800 m² GO'),
FC(3,'Contante waarde','K = {{K<sub>n</sub>|(1 + p/100)ⁿ}}',[],'Wat is een toekomstig bedrag nu waard?','€ 100 000 over 10 jaar bij 4%: € 67 556'),
FC(3,'Degressieve afschrijving','B<sub>k</sub> = A · (1 − {{p|100}})ᵏ',[],'Vast percentage van de boekwaarde.','€ 40 000, 20%, 3 jaar: € 20 480'),
FC(3,'Kapitaalkosten per uur','{{afschrijving + rente|draaiuren}}',[],'Uurtarief van materieel.','')]
};

// ================= UITBREIDING 2: extra hoofdstukken en vak Bouwkunde =================
(function(){
const T=(ch,sub)=>({id:sub,name:TERMSUB[sub],gen:genTerm(ch,sub)});
const termTable=(ch,sub)=>`<div class="termlist">${TERMS[ch][sub].map(([t,d,x,v])=>`<div class="tl-row"><b>${t}</b><span>${d}${x?`<em class="tl-x">${x}</em>`:''}${v?`<em class="tl-x tl-v"><b>Voorbeeld:</b> ${v}</em>`:''}</span></div>`).join('')}</div>`;
const NEW=[
// ---------- Rekenen ----------
{id:'schatten',name:'Schatten en controleren',blurb:'Snel inschatten of een uitkomst klopt. Vangt de meeste reken- en eenheidsfouten.',
 subs:[{id:'schat',name:'Schatten',gen:genSchat},{id:'orde',name:'Orde van grootte',gen:genOrde}],
 theory:[{t:'Waarom schatten?',sub:'schat',h:`<p>Een rekenmachine rekent altijd precies, ook als je een verkeerd getal of een verkeerde eenheid intypt. Een snelle schatting vooraf laat je zien of de uitkomst kan kloppen.</p>
 <ol class="steps plain"><li>Rond de getallen af op één of twee significante cijfers.</li><li>Reken de afgeronde som uit je hoofd.</li><li>Vergelijk met de precieze uitkomst: scheelt het een factor 10 of meer, dan is er iets mis.</li></ol>
 ${ex('Voorbeeld',`<p>48 × 21 ≈ 50 × 20 = 1000. Je rekenmachine zegt 1008 ✓. Zegt hij 100,8, dan heb je een komma verkeerd gezet.</p>`)}`},
 {t:'Ankerwaarden uit de bouw',sub:'orde',h:`<p>Met een paar waarden in je hoofd herken je onzin direct:</p><div class="tblwrap"><table class="rtab"><tr><th>Grootheid</th><th>Orde van grootte</th></tr><tr><td>Kamer in een woning</td><td>10–40 m²</td></tr><tr><td>Verdiepingshoogte</td><td>2,6–3,2 m</td></tr><tr><td>Betonsterkte</td><td>20–50 N/mm²</td></tr><tr><td>Staal S235</td><td>235 N/mm²</td></tr><tr><td>Beton</td><td>24 kN/m³ (2400 kg/m³)</td></tr><tr><td>Vloerbelasting woning</td><td>ca. 1,75–2 kN/m² (gebruik)</td></tr><tr><td>Stroomverbruik huishouden</td><td>ca. 2500–3500 kWh/jaar</td></tr></table></div>`}],
 formulas:[]},
{id:'statistiek',name:'Statistiek en meetwaarden',blurb:'Gemiddelde, mediaan, spreiding en de karakteristieke waarde waarmee constructeurs rekenen.',
 subs:[{id:'centraal',name:'Gemiddelde, mediaan, modus',gen:genCentraal},{id:'spreiding',name:'Spreiding',gen:genSpreiding},{id:'karak',name:'Karakteristieke waarde',gen:genKarak}],
 theory:[{t:'Centrummaten',sub:'centraal',h:`<ul class="rules"><li><b>Gemiddelde</b>: som gedeeld door het aantal.</li><li><b>Mediaan</b>: de middelste waarde als je alles op volgorde zet (bij een even aantal: het gemiddelde van de middelste twee).</li><li><b>Modus</b>: de waarde die het vaakst voorkomt.</li></ul>
 <p>De mediaan heeft weinig last van uitschieters. Bij 20, 21, 22, 23 en 95 is het gemiddelde 36,2 maar de mediaan 22.</p>`},
 {t:'Spreiding',sub:'spreiding',h:`<p>Twee leveranciers met dezelfde gemiddelde sterkte kunnen heel verschillend zijn: de één levert constant, de ander wisselend. Dat zie je aan de spreiding.</p>
 <div class="formula-box">s = √( Σ(x − x̄)² / (n − 1) )</div><p>De spreidingsbreedte (grootste − kleinste) is snel, maar zegt alleen iets over de uitersten.</p>`},
 {t:'De karakteristieke waarde',sub:'karak',h:`<p>Constructeurs rekenen niet met de gemiddelde sterkte, maar met een veilige ondergrens: de waarde waar maar 5% van de proeven onder zit. Bij een normale verdeling is dat:</p>
 <div class="formula-box">f<sub>k</sub> = f<sub>m</sub> − 1,64 · s</div>
 ${ex('Voorbeeld',`<p>Gemiddeld 38 N/mm², s = 3 → f<sub>k</sub> = 38 − 4,92 = <b>33,1 N/mm²</b>.</p>`)}<p>Daarom kost een leverancier met veel spreiding meer cement: hij moet gemiddeld hoger zitten om dezelfde karakteristieke waarde te halen.</p>`}],
 formulas:[]},
// ---------- Algebra en functies ----------
{id:'explog',name:'Exponenten en logaritmen',blurb:'Groei, halvering, verdubbeling en logaritmen. Nodig voor rente, decibellen en materiaalveroudering.',
 subs:[{id:'groei',name:'Groei en halvering',gen:genGroei},{id:'log',name:'Logaritmen',gen:genLog}],
 theory:[{t:'Exponentiële groei',sub:'groei',h:`<p>Bij exponentiële groei vermenigvuldig je elke periode met dezelfde groeifactor g:</p><div class="formula-box">N(t) = N₀ · g<sup>t</sup> &nbsp;&nbsp; g = 1 + p/100</div>
 <p>Halveringstijd T: N(t) = N₀ · 0,5<sup>t/T</sup>. Verdubbelingstijd bij p% groei ≈ 72 / p (vuistregel).</p>`},
 {t:'Logaritmen',sub:'log',h:`<p>Een logaritme is het omgekeerde van een macht: <b>log<sub>g</sub>(a) = x</b> betekent g<sup>x</sup> = a. "log" zonder grondtal is grondtal 10.</p>
 <div class="formula-grid"><div>log(a·b) = log a + log b</div><div>log(a/b) = log a − log b</div><div>log(aⁿ) = n · log a</div><div>gˣ = c ⇒ x = log c / log g</div></div>
 <p>In de bouw: decibellen (L = 10·log(I/I₀)) en terugrekenen bij rente of groei.</p>`}],
 formulas:[]},
{id:'afgeleide',name:'Afgeleiden',blurb:'De helling van een grafiek en het vinden van een maximum, bijvoorbeeld het grootste moment in een ligger.',
 subs:[{id:'afg',name:'Afgeleiden en hellingen',gen:genAfg}],
 theory:[{t:'Wat is een afgeleide?',sub:'afg',h:`<p>De afgeleide f′(x) geeft de helling van de grafiek in elk punt. Waar f′(x) = 0 is de grafiek even vlak: daar ligt een top (maximum of minimum).</p>
 <div class="formula-grid"><div>(a·xⁿ)′ = n·a·xⁿ⁻¹</div><div>(c)′ = 0</div><div>(f + g)′ = f′ + g′</div></div>
 ${ex('Voorbeeld uit de mechanica',`<p>M(x) = ½·q·x·(L − x) = ½q(Lx − x²). M′(x) = ½q(L − 2x) = 0 → x = L/2. Het grootste moment zit in het midden: M = ⅛qL².</p>`)}`}],
 formulas:[]},
// ---------- Natuurkunde ----------
{id:'warmte',name:'Warmte en uitzetting',blurb:'Temperatuur, warmtecapaciteit en uitzetten van materialen. De reden voor dilatatievoegen.',
 subs:[{id:'warmteq',name:'Temperatuur en warmte',gen:genWarmteQfix},{id:'uitzet',name:'Lineaire uitzetting',gen:genUitzet}],
 theory:[{t:'Temperatuur en warmte',sub:'warmteq',h:`<p>Temperatuur meet je in °C of kelvin: T(K) = T(°C) + 273. Een temperatuur<b>verschil</b> is in beide eenheden gelijk.</p>
 <div class="formula-box">Q = m · c · ΔT</div><p>c is de soortelijke warmte: water 4180, beton ca. 880, staal ca. 460 J/(kg·K). Zware materialen met veel massa (beton) bufferen warmte: dat heet thermische massa.</p>`},
 {t:'Uitzetten en krimpen',sub:'uitzet',h:`<div class="formula-box">ΔL = α · L · ΔT</div>
 <div class="tblwrap"><table class="rtab"><tr><th>Materiaal</th><th>α (×10⁻⁶ /K)</th></tr>${Object.entries(ALPHA).map(([k,v])=>`<tr><td>${k}</td><td>${N(v*1e6)}</td></tr>`).join('')}</table></div>
 <p>Een gevel van 60 m staal die 40 K opwarmt, wordt 29 mm langer. Daarom krijgen lange gebouwen dilatatievoegen.</p>`}],
 formulas:[]},
{id:'sterkte',name:'Sterkteleer basis',blurb:'Weerstandsmoment, traagheidsmoment en buigspanning. De stap van momenten naar balkafmetingen.',
 subs:[{id:'doorsnede',name:'Doorsnedegrootheden',gen:genWeerstand},{id:'buig',name:'Buigspanning',gen:genBuig}],
 theory:[{t:'Doorsnedegrootheden',sub:'doorsnede',h:`<p>Hoe goed een balk tegen buigen kan, hangt sterk af van de hoogte van de doorsnede:</p>
 <div class="formula-grid"><div>Weerstandsmoment: W = b·h²/6 (mm³)</div><div>Traagheidsmoment: I = b·h³/12 (mm⁴)</div></div>
 <p>W bepaalt de sterkte, I de stijfheid (doorbuiging). Twee keer zo hoog = vier keer zo sterk en acht keer zo stijf.</p>`},
 {t:'Buigspanning',sub:'buig',h:`<div class="formula-box">σ = ${Fh('M','W')} &nbsp;&nbsp; (M in Nmm, W in mm³ → N/mm²)</div>
 <p>Een gebogen balk heeft aan één kant druk en aan de andere kant trek; in het midden (de neutrale lijn) is de spanning nul. Controle: σ ≤ toelaatbare spanning (hout C24 orde 10–15 N/mm² bij eenvoudige controles).</p>
 ${pit('kNm × 10⁶ = Nmm. Vergeet je die factor, dan is je spanning een miljoen keer te klein.')}`}],
 formulas:[]},
// ---------- Bouwfysica ----------
{id:'lichtlucht',name:'Licht en ventilatie',blurb:'Verlichtingssterkte, daglichtfactor en ventilatievoud. Comfort en gezondheid binnen.',
 subs:[{id:'lux',name:'Verlichting',gen:genLux},{id:'df',name:'Daglichtfactor',gen:genDF},{id:'vent',name:'Ventilatie',gen:genVentVoud}],
 theory:[{t:'Verlichtingssterkte',sub:'lux',h:`<p>Verlichtingssterkte E (lux) is hoeveel licht er op een vlak valt: lumen per m².</p><div class="formula-grid"><div>E = Φ / A</div><div>Puntbron: E = I / r²</div></div>
 <p>Richtwaarden: gang 100 lux, woonkamer 200–300, kantoor 500, tekenwerk 750.</p>`},
 {t:'Daglichtfactor',sub:'df',h:`<div class="formula-box">DF = ${Fh('E<sub>binnen</sub>','E<sub>buiten</sub>')} × 100%</div><p>Gemeten bij een bewolkte hemel. DF 2% voelt al redelijk licht. Het Bbl toetst daglicht bij woningen met de <b>equivalente daglichtoppervlakte</b> (NEN 2057): voor een verblijfsgebied minstens 10% van de vloeroppervlakte en per verblijfsruimte minstens 0,5 m².</p>`},
 {t:'Ventilatie',sub:'vent',h:`<p>Ventilatie voert vocht, CO₂ en geurtjes af. Je rekent met debieten in dm³/s of m³/h.</p><div class="formula-grid"><div>1 dm³/s = 3,6 m³/h</div><div>Ventilatievoud n = q / V (per uur)</div></div>
 <p>Bbl-eisen woning (nieuwbouw): verblijfsgebied 0,9 dm³/s per m² (minstens 7), verblijfsruimte 0,7 dm³/s per m² (minstens 7), met kooktoestel minstens 21, toilet 7, badkamer 14 dm³/s.</p>`}],
 formulas:[]},
// ---------- Bouweconomie ----------
{id:'calculatie',name:'Calculatie',blurb:'Hoeveelheden, eenheidsprijzen, normuren en rendement. Zo komt een begroting tot stand.',
 subs:[{id:'hoev',name:'Hoeveelheden en prijzen',gen:genHoev},{id:'normuren',name:'Normuren en arbeid',gen:genNormuren},{id:'rendement',name:'Rendement en terugverdientijd',gen:genRendement}],
 theory:[{t:'Hoeveelheden × eenheidsprijzen',sub:'hoev',h:`<p>Een calculatie bestaat uit posten. Elke post is een <b>hoeveelheid</b> (m¹, m², m³, stuks) maal een <b>eenheidsprijs</b>. Hoeveelheden haal je uit de tekeningen; eenheidsprijzen uit ervaring, leveranciers of kostendatabanken.</p>${pit('Trek openingen af waar dat hoort (stucwerk, metselwerk), maar niet bij posten die per stuk of per strekkende meter gaan.')}`},
 {t:'Normuren',sub:'normuren',h:`<div class="formula-box">arbeidskosten = hoeveelheid × normtijd × uurloon</div><p>De normtijd is de gemiddelde tijd per eenheid, bijvoorbeeld 0,8 uur per m² metselwerk. Uit de uren volgt ook de planning: uren ÷ (aantal mensen × uren per dag).</p>`},
 {t:'Rendement',sub:'rendement',h:`<div class="formula-grid"><div>BAR = jaarhuur / investering × 100%</div><div>Terugverdientijd = investering / jaarlijkse besparing</div></div><p>Dit zijn eenvoudige maatstaven zonder rente en prijsstijgingen; de contante waarde uit het hoofdstuk Bouweconomie is nauwkeuriger.</p>`}],
 formulas:[]},
// ---------- Bouwkunde ----------
{id:'bouwdelen',name:'Bouwdelen en begrippen',blurb:'De onderdelen van een gebouw en hoe ze heten: van fundering tot nok.',terms:'bouwdelen',
 subs:[T('bouwdelen','onderbouw'),T('bouwdelen','gevel'),T('bouwdelen','dak'),T('bouwdelen','openingen')],
 theory:[{t:'Een woning van onder naar boven',sub:'onderbouw',h:`<p>Een gebouw draagt zijn gewicht van boven naar beneden af: dak → muren of kolommen → vloeren → fundering → grond. Elke laag heeft een eigen vakjargon.</p>${termTable('bouwdelen','onderbouw')}`},
 {t:'De gevel',sub:'gevel',h:`<p>De meeste Nederlandse woningen hebben een <b>spouwmuur</b>: een dragend binnenblad, isolatie, een luchtspouw en een buitenblad dat regen tegenhoudt.</p>${termTable('bouwdelen','gevel')}`},
 {t:'Het dak',sub:'dak',h:termTable('bouwdelen','dak')},
 {t:'Kozijnen en openingen',sub:'openingen',h:termTable('bouwdelen','openingen')}],formulas:[]},
{id:'materialen',name:'Bouwmaterialen',blurb:'Beton, staal, hout, steen en isolatie: eigenschappen en begrippen.',terms:'materialen',
 subs:[T('materialen','betonstaal'),T('materialen','hout'),T('materialen','steen'),T('materialen','isolatie')],
 theory:[{t:'Beton en staal',sub:'betonstaal',h:`<p>Beton is sterk op druk maar zwak op trek. Staal is sterk op trek. Samen vormen ze <b>gewapend beton</b>.</p>${termTable('materialen','betonstaal')}`},
 {t:'Hout',sub:'hout',h:termTable('materialen','hout')},{t:'Steenachtige materialen',sub:'steen',h:termTable('materialen','steen')},
 {t:'Isolatie en folies',sub:'isolatie',h:`<p>Vuistregel voor folies: <b>dampdicht aan de warme kant, dampopen aan de koude kant</b>. Zo kan vocht dat toch in de constructie komt naar buiten drogen.</p>${termTable('materialen','isolatie')}`}],formulas:[]},
{id:'bouwmethoden',name:'Funderingen en bouwmethoden',blurb:'Hoe je een gebouw fundeert, welke bouwsystemen er zijn en welke daktypen.',terms:'bouwmethoden',
 subs:[T('bouwmethoden','funderingen'),T('bouwmethoden','systemen'),T('bouwmethoden','daken')],
 theory:[{t:'Funderingen',sub:'funderingen',h:`<p>In grote delen van Nederland ligt de draagkrachtige zandlaag diep onder slappe klei en veen. Daar fundeer je op palen. Waar het zand hoog ligt, kan een fundering op staal (direct op de grond).</p>${termTable('bouwmethoden','funderingen')}`},
 {t:'Bouwsystemen',sub:'systemen',h:termTable('bouwmethoden','systemen')},{t:'Daktypen',sub:'daken',h:termTable('bouwmethoden','daken')}],formulas:[]},
{id:'tekeningen',name:'Bouwtekeningen lezen',blurb:'Soorten tekeningen, peilmaten en NAP, maatvoering en stramienen.',terms:'tekeningen',
 subs:[T('tekeningen','soorten'),{id:'peil',name:'Peilmaten en NAP',gen:genPeil},{id:'maatvoering',name:'Maatvoering',gen:genMaatvoering}],
 theory:[{t:'Soorten tekeningen',sub:'soorten',h:`<p>Een bouwproject heeft tekeningen op verschillende schalen: van situatie (1:500) via plattegronden en gevels (1:100 of 1:50) tot details (1:5).</p>${termTable('tekeningen','soorten')}`},
 {t:'Peil en NAP',sub:'peil',h:`<p><b>Peil</b> (P = 0) is het referentieniveau van het gebouw, meestal bovenkant afgewerkte begane grondvloer. Hoogtes staan in meters met drie decimalen: +2.700 is 2,70 m boven peil, −0.600 is 0,60 m eronder.</p>
 <p><b>NAP</b> (Normaal Amsterdams Peil) is het landelijke referentievlak. Op de situatietekening staat hoe peil zich tot NAP verhoudt, bijvoorbeeld P = NAP + 1,25 m.</p>`},
 {t:'Maatvoering',sub:'maatvoering',h:`<ul class="rules"><li>Maten staan in <b>mm</b>, zonder eenheid.</li><li>Een maatketting bestaat uit deelmaten; de buitenste maatlijn geeft de totaalmaat.</li><li><b>Buitenwerks</b> meet je aan de buitenkant, <b>binnenwerks</b> tussen de binnenkanten.</li><li>Het <b>stramien</b> is het raster van hartlijnen waarop kolommen en wanden staan, met maten hart-op-hart (h.o.h.).</li></ul>`}],formulas:[]},
{id:'architectuur',name:'Architectuur en ontwerp',blurb:'Ontwerpbegrippen en de belangrijkste Nederlandse bouwstijlen.',terms:'architectuur',
 subs:[T('architectuur','ontwerp'),T('architectuur','stijlen')],
 theory:[{t:'Ontwerpbegrippen',sub:'ontwerp',h:termTable('architectuur','ontwerp')},{t:'Bouwstijlen in Nederland',sub:'stijlen',h:`<p>Je herkent een stijl aan materialen, daken, ramen en versiering. De jaartallen zijn bij benadering.</p>${termTable('architectuur','stijlen')}`}],formulas:[]},
{id:'bim',name:'BIM en tekenconventies',blurb:'Samenwerken in 3D-modellen en de afspraken waarmee iedereen een tekening hetzelfde leest.',terms:'bim',
 subs:[T('bim','bim'),T('bim','conventies')],
 theory:[{t:'BIM',sub:'bim',h:`<p>Bij BIM (bouwwerkinformatiemodel) werkt elke partij in een eigen digitaal model: de architect, de constructeur, de installateur. De modellen worden samengevoegd en gecontroleerd op botsingen.</p>${termTable('bim','bim')}`},{t:'Tekenconventies',sub:'conventies',h:termTable('bim','conventies')}],formulas:[]},
{id:'bouwproces',name:'Bouwproces en partijen',blurb:'De fasen van idee tot oplevering, wie wat doet en welke contracten er zijn.',terms:'bouwproces',
 subs:[T('bouwproces','fasen'),T('bouwproces','partijen'),T('bouwproces','contracten')],
 theory:[{t:'Fasen in het bouwproces',sub:'fasen',h:`<p>Een bouwproject loopt door een vaste reeks fasen. Elke fase sluit af met een besluit of document:</p>
 <ol class="steps plain"><li>Initiatief en programma van eisen</li><li>Structuurontwerp</li><li>Voorlopig ontwerp (VO)</li><li>Definitief ontwerp (DO)</li><li>Technisch ontwerp (TO) en bestek</li><li>Aanbesteding: prijs- en contractvorming</li><li>Uitvoeringsgereed ontwerp (werktekeningen)</li><li>Uitvoering</li><li>Oplevering en gebruik</li></ol>
 <p>Hoe later in het proces je iets wijzigt, hoe duurder het wordt.</p>${termTable('bouwproces','fasen')}`},
 {t:'Partijen en rollen',sub:'partijen',h:termTable('bouwproces','partijen')},
 {t:'Contracten en documenten',sub:'contracten',h:`<p>Bij een <b>traditioneel</b> contract (UAV 2012) levert de opdrachtgever het ontwerp en voert de aannemer uit. Bij een <b>geïntegreerd</b> contract (UAV-GC) ontwerpt de opdrachtnemer ook. In een <b>bouwteam</b> denkt de aannemer al mee tijdens het ontwerp.</p>${termTable('bouwproces','contracten')}`}],formulas:[]},
{id:'regels',name:'Bouwregelgeving',blurb:'Omgevingswet, Bbl, Wkb en de eisen aan een nieuwbouwwoning.',terms:'regels',
 subs:[T('regels','stelsel'),T('regels','energie'),{id:'bruikbaar',name:'Bbl-eisen toepassen',gen:genBruikbaar}],
 theory:[{t:'Het stelsel sinds 2024',sub:'stelsel',h:`<p>Sinds <b>1 januari 2024</b> geldt de Omgevingswet. Voor bouwen zijn er twee sporen:</p>
 <ul class="rules"><li><b>Technisch</b>: het bouwwerk moet voldoen aan het <b>Besluit bouwwerken leefomgeving (Bbl)</b>, de opvolger van het Bouwbesluit 2012: veiligheid, gezondheid, bruikbaarheid, energie en milieu.</li><li><b>Ruimtelijk</b>: het bouwwerk moet passen in het <b>omgevingsplan</b> van de gemeente (waar, hoe hoog, welk gebruik) en aan redelijke eisen van welstand.</li></ul>
 <p>Ook sinds 1 januari 2024 geldt de <b>Wet kwaliteitsborging (Wkb)</b> voor nieuwbouw in gevolgklasse 1, zoals eengezinswoningen: een onafhankelijke kwaliteitsborger controleert tijdens de bouw of het bouwwerk aan het Bbl voldoet, in plaats van een toets vooraf door de gemeente. De aannemer is na oplevering ook langer aansprakelijk voor gebreken.</p>${termTable('regels','stelsel')}`},
 {t:'Eisen aan een nieuwbouwwoning (selectie)',sub:'bruikbaar',h:`<div class="tblwrap"><table class="rtab"><tr><th>Onderwerp</th><th>Eis (woonfunctie, nieuwbouw)</th></tr>
 <tr><td>Hoogte verblijfsgebied/-ruimte</td><td>minimaal 2,6 m</td></tr><tr><td>Aandeel verblijfsgebied</td><td>minimaal 55% van de gebruiksoppervlakte</td></tr>
 <tr><td>Verblijfsgebied</td><td>minimaal 5 m² en 1,8 m breed</td></tr><tr><td>Grootste verblijfsruimte</td><td>minstens één van 11 m² en 3 m breed</td></tr>
 <tr><td>Daglicht</td><td>equivalente daglichtoppervlakte ≥ 10% van het verblijfsgebied; ≥ 0,5 m² per verblijfsruimte (NEN 2057)</td></tr>
 <tr><td>Ventilatie</td><td>verblijfsgebied 0,9 dm³/s per m², verblijfsruimte 0,7 dm³/s per m² (beide minimaal 7); kooktoestel 21; toilet 7; badkamer 14</td></tr>
 <tr><td>Trap</td><td>optrede ≤ 188 mm, aantrede ≥ 220 mm, vrije hoogte ≥ 2,3 m</td></tr><tr><td>Isolatie</td><td>R<sub>c</sub> gevel 4,7 · vloer 3,7 · dak 6,3 m²K/W</td></tr></table></div>
 <p class="muted small">Selectie voor de opleiding; gebruik voor echte projecten altijd de actuele wettekst.</p>`},
 {t:'Energie, milieu en oppervlakten',sub:'energie',h:`<p>Nieuwbouw moet voldoen aan de <b>BENG</b>-eisen (BENG 1 energiebehoefte, BENG 2 primair fossiel energiegebruik, BENG 3 aandeel hernieuwbare energie) en de <b>MPG</b> (milieuprestatie van de materialen). Oppervlakten meet je volgens <b>NEN 2580</b>.</p>${termTable('regels','energie')}`}],formulas:[]},
{id:'duurzaam',name:'Duurzaam bouwen',blurb:'Circulair bouwen, biobased materialen, aardgasvrij en comfort in de zomer.',terms:'duurzaam',
 subs:[T('duurzaam','circulair'),T('duurzaam','energie2')],
 theory:[{t:'Circulair en biobased bouwen',sub:'circulair',h:termTable('duurzaam','circulair')},{t:'Energie en comfort',sub:'energie2',h:`<p>Een goed geïsoleerde, kierdichte woning met een warmtepomp en ventilatie met warmteterugwinning heeft weinig energie nodig. Let wel op oververhitting in de zomer: buitenzonwering en goede ventilatie zijn dan belangrijk.</p>${termTable('duurzaam','energie2')}`}],formulas:[]}
];
NEW.forEach(m=>{MODS.push(m)});
// goals
const G={schatten:[['Afronden en uit je hoofd schatten'],['Volumes en oppervlakken schatten'],['Uitkomsten op plausibiliteit beoordelen']],
statistiek:[['Gemiddelde berekenen'],['Mediaan en modus','Spreidingsbreedte'],['Standaardafwijking','Karakteristieke waarde f_k = f_m − 1,64 s']],
explog:[['Groei met een groeifactor','Logaritmen van machten van 2, 3 en 10'],['Verdubbelingstijd','Rekenregels voor logaritmen'],['Halveringstijd','Exponentiële vergelijkingen oplossen']],
afgeleide:[['Machtsregel toepassen'],['Helling in een punt'],['Maximum vinden met f′(x) = 0']],
warmte:[['°C en K','Lineaire uitzetting'],['Uitzetting in mm'],['Warmte Q = m·c·ΔT','Maximale lengte bij een voeg']],
sterkte:[['W = b·h²/6'],['I = b·h³/12','σ = M/W'],['Balkhoogte bepalen uit q, L en σ']],
lichtlucht:[['E = Φ/A','DF berekenen','dm³/s ↔ m³/h'],['E = I/r²','Ventilatievoud'],['Aantal armaturen','Ventilatie per persoon']],
calculatie:[['Hoeveelheid × eenheidsprijs','Normuren','BAR'],['Netto oppervlak en arbeidskosten'],['Materiaalcalculatie metselwerk','Doorlooptijd','Terugverdientijd']]};
const TG=['Begrip → omschrijving herkennen','Omschrijving → begrip noemen','Toepassen in een praktijksituatie'];
NEW.forEach(m=>{m.goals=G[m.id]||[[TG[0],...m.subs.map(s=>s.name)],[TG[1]],[TG[2]]];if(m.id==='tekeningen')m.goals=[['Soorten tekeningen herkennen','Verdiepingshoogte uit peilmaten','Deelmaten optellen'],['Hoogteverschillen boven en onder peil','Binnenwerkse maten'],['Peil omrekenen naar NAP','Stramien en aantal kolommen']];if(m.id==='regels')m.goals=[['Omgevingswet, Bbl, Wkb uit elkaar houden','55% verblijfsgebied'],['BENG, MPG, BVO en GO','Daglicht 10%'],['Juiste regel vinden in een praktijksituatie','Ventilatiecapaciteit berekenen']]});
// formules en normen voor de nieuwe hoofdstukken
Object.assign(FORMULAS,{
schatten:[FC(1,'Afronden en schatten','a × b ≈ (a afgerond) × (b afgerond)',[],'Elke berekening vooraf even schatten.','48 × 21 ≈ 50 × 20 = 1000'),FC(2,'Controle met de factor','uitkomst / schatting ≈ 1',[],'Scheelt het een factor 10, 100 of 1000, dan zit er een komma- of eenheidsfout in.','')],
statistiek:[FC(1,'Gemiddelde','x̄ = Σx / n',[['n','aantal waarden','']],'Centrummaat.',''),FC(2,'Mediaan','middelste waarde van de gesorteerde reeks',[],'Ongevoelig voor uitschieters.','20, 21, 22, 23, 95 → 22'),FC(2,'Spreidingsbreedte','R = x<sub>max</sub> − x<sub>min</sub>',[],'Snelle maat voor spreiding.',''),FC(3,'Standaardafwijking','s = √(Σ(x − x̄)² / (n − 1))',[['s','standaardafwijking (steekproef)','']],'Spreiding rond het gemiddelde.',''),FC(3,'Karakteristieke waarde','f<sub>k</sub> = f<sub>m</sub> − 1,64 · s',[['f<sub>k</sub>','5%-ondergrens','N/mm²'],['f<sub>m</sub>','gemiddelde','N/mm²']],'Materiaalsterkte voor constructieve berekeningen.','38 − 1,64 × 3 = 33,1 N/mm²')],
explog:[FC(1,'Exponentiële groei','N = N₀ · g<sup>t</sup>',[['g','groeifactor (1 + p/100)','']],'Prijzen, rente, groei.',''),FC(2,'Logaritme','g<sup>x</sup> = a ⇔ x = log<sub>g</sub> a',[],'Exponent terugzoeken.','log 1000 = 3'),FC(2,'Rekenregels log','log ab = log a + log b · log aⁿ = n log a',[],'Logaritmen vereenvoudigen.',''),FC(3,'Halvering','N = N₀ · 0,5<sup>t/T</sup>',[['T','halveringstijd','']],'Afname met vaste halveringstijd.',''),FC(3,'Exponent oplossen','x = log c / log g',[],'gˣ = c oplossen.','1,05ˣ = 2 → x = 14,2')],
afgeleide:[FC(1,'Machtsregel','(a·xⁿ)′ = n·a·xⁿ⁻¹',[],'Afgeleide van een veelterm.','(3x⁴)′ = 12x³'),FC(2,'Helling in een punt','helling = f′(x₀)',[],'Steilheid van de grafiek.',''),FC(3,'Maximum of minimum','f′(x) = 0',[],'Grootste moment, grootste oppervlak.','M′(x) = 0 → x = L/2')],
warmte:[FC(1,'Kelvin','T(K) = T(°C) + 273',[],'Absolute temperatuur.',''),FC(1,'Lineaire uitzetting','ΔL = α · L · ΔT',[['α','uitzettingscoëfficiënt','1/K'],['L','lengte','m'],['ΔT','temperatuurverschil','K']],'Voegen en dilataties bepalen.','staal 60 m, 40 K: 29 mm'),FC(3,'Warmte','Q = m · c · ΔT',[['c','soortelijke warmte','J/(kg·K)']],'Opwarmen van water of bouwmassa.','')],
sterkte:[FC(1,'Weerstandsmoment','W = {{b · h²|6}}',[['b','breedte','mm'],['h','hoogte','mm']],'Sterkte van een rechthoekige doorsnede.',''),FC(2,'Traagheidsmoment','I = {{b · h³|12}}',[],'Stijfheid tegen doorbuiging.',''),FC(2,'Buigspanning','σ = {{M|W}}',[['M','moment','Nmm']],'Controle van een balk.','',"kNm × 10⁶ = Nmm"),FC(3,'Benodigde hoogte','h = √(6 · W / b) met W = M / σ<sub>toel</sub>',[],'Balk dimensioneren.','')],
lichtlucht:[FC(1,'Verlichtingssterkte','E = Φ / A',[['E','verlichtingssterkte','lux'],['Φ','lichtstroom','lm']],'Hoeveel licht op een vlak valt.',''),FC(1,'Daglichtfactor','DF = E<sub>i</sub> / E<sub>u</sub> × 100%',[],'Daglicht binnen t.o.v. buiten.',''),FC(1,'Debiet omrekenen','1 dm³/s = 3,6 m³/h',[],'Ventilatie-eenheden.',''),FC(2,'Kwadratenwet','E = I / r²',[['I','lichtsterkte','cd'],['r','afstand','m']],'Puntvormige lamp.',''),FC(2,'Ventilatievoud','n = q / V',[['q','debiet','m³/h'],['V','volume','m³']],'Hoe vaak per uur de lucht ververst.','')],
calculatie:[FC(1,'Post','bedrag = hoeveelheid × eenheidsprijs',[],'Elke regel in een begroting.',''),FC(1,'Arbeid','uren = hoeveelheid × normtijd',[],'Arbeidsuren bepalen.',''),FC(2,'Arbeidskosten','kosten = uren × uurloon',[],'',''),FC(1,'BAR','BAR = jaarhuur / investering × 100%',[],'Rendement vastgoed.',''),FC(3,'Doorlooptijd','dagen = uren / (mensen × uren per dag)',[],'Planning.',''),FC(3,'Terugverdientijd','t = investering / besparing per jaar',[],'Duurzame maatregelen beoordelen.','')],
tekeningen:[FC(1,'Peilmaat','+2.700 = 2,70 m boven peil',[],'Hoogtes lezen.',''),FC(2,'Binnenwerks','binnenwerks = buitenwerks − 2 × wanddikte',[],'',''),FC(3,'NAP-hoogte','NAP = NAP(peil) + peilmaat',[],'Hoogte t.o.v. het landelijk vlak.',''),FC(3,'Kolommen op stramien','aantal = ⌊L / h.o.h.⌋ + 1',[],'',''),FC(1,'Verdiepingshoogte','h = peil bovenkant vloer − peil vloer eronder',[],'','')],
regels:[FC(1,'Verblijfsgebied','VG ≥ 0,55 × GO',[],'Bbl, woonfunctie nieuwbouw.',''),FC(2,'Daglicht','A<sub>e</sub> ≥ 0,10 × A<sub>vloer</sub> (en ≥ 0,5 m² per verblijfsruimte)',[],'Equivalente daglichtoppervlakte, NEN 2057.',''),FC(3,'Ventilatie verblijfsgebied','q = max(0,9 · A ; 7) dm³/s (met kooktoestel min. 21)',[],'',''),FC(3,'Ventilatie verblijfsruimte','q = max(0,7 · A ; 7) dm³/s',[],'',''),FC(1,'Hoogte','≥ 2,6 m',[],'Verblijfsgebied nieuwbouw.',''),FC(2,'Trap','optrede ≤ 188 mm · aantrede ≥ 220 mm · vrije hoogte ≥ 2,3 m',[],'','')]
});
Object.assign(CASES,CASES3);
// volgorde, codes, voorgangers (los leerpad voor Bouwkunde)
const W=['basis','rekenen','eenheden','schatten','machten','schaal','meetkunde','natuurkunde','statistiek','algebra','lineair','explog','gonio','kwadratisch','afgeleide','warmte','mechanica','sterkte','installaties','bouwfysica','lichtlucht','geluid','economie','calculatie'];
const B=['bouwdelen','materialen','tekeningen','bouwmethoden','bouwproces','architectuur','bim','regels','duurzaam'];
MODS.sort((a,b)=>{const ia=W.includes(a.id)?W.indexOf(a.id):100+B.indexOf(a.id);const ib=W.includes(b.id)?W.indexOf(b.id):100+B.indexOf(b.id);return ia-ib});
MODS.forEach(m=>{const wi=W.indexOf(m.id),bi=B.indexOf(m.id);if(wi>=0){m.code='W-'+String(wi+1).padStart(2,'0');m.prev=wi?W[wi-1]:null}else{m.code='B-'+String(bi+1).padStart(2,'0');m.prev=bi?B[bi-1]:null}MOD[m.id]=m;
  const fi=s=>m.subs.findIndex(x=>x.id===s);m.theory.sort((a,b)=>(a.sub?fi(a.sub):99)-(b.sub?fi(b.sub):99))});
})();

// ================= UITBREIDING 3: hoofdstukken =================
(function(){
const T=(ch,sub)=>({id:sub,name:TERMSUB[sub],gen:genTerm(ch,sub)});
const tt=(ch,sub)=>`<div class="termlist">${TERMS[ch][sub].map(([t,d,x,v])=>`<div class="tl-row"><b>${t}</b><span>${d}${x?`<em class="tl-x">${x}</em>`:''}${v?`<em class="tl-x tl-v"><b>Voorbeeld:</b> ${v}</em>`:''}</span></div>`).join('')}</div>`;
const TG=['Begrip → omschrijving herkennen','Omschrijving → begrip noemen','Toepassen in een praktijksituatie'];
const NEW=[
{id:'constructie',name:'Draagconstructie en stabiliteit',terms:'constructie',blurb:'Hoe een gebouw zijn gewicht en de wind afvoert naar de grond: belastingen, krachtsafdracht en stabiliteit.',
 subs:[T('constructie','krachtsafdracht'),T('constructie','belastingen'),T('constructie','stabiliteit'),{id:'lasten',name:'Belastingen berekenen',gen:genLasten}],
 theory:[{t:'Van dak tot fundering',sub:'krachtsafdracht',h:`<p>Elke belasting moet via een ononderbroken weg naar de grond. Volg altijd de <b>krachtsafdracht</b>:</p><ol class="steps plain"><li>De vloer draagt af op balken of dragende wanden.</li><li>Balken dragen af op kolommen of wanden.</li><li>Kolommen en wanden dragen af op de fundering.</li><li>De fundering brengt alles naar de draagkrachtige grond (zand of palen).</li></ol><p>Ontbreekt er een schakel, dan zakt of scheurt het gebouw.</p>${tt('constructie','krachtsafdracht')}`},
 {t:'Belastingen',sub:'belastingen',h:`<p>Constructeurs onderscheiden <b>permanente</b> belasting g (eigen gewicht, afbouw) en <b>veranderlijke</b> belasting q (gebruik, sneeuw, wind). Indicatieve waarden:</p><div class="tblwrap"><table class="rtab"><tr><th>Wat</th><th>Waarde</th></tr><tr><td>Gewapend beton</td><td>24–25 kN/m³</td></tr><tr><td>Metselwerk baksteen</td><td>circa 19 kN/m³</td></tr><tr><td>Hout C24</td><td>circa 4–5 kN/m³</td></tr><tr><td>Gebruiksbelasting woningvloer</td><td>1,75 kN/m²</td></tr><tr><td>Sneeuw op een dak (NL)</td><td>circa 0,5–0,7 kN/m²</td></tr></table></div><p>Van vlaklast naar lijnlast: <b>q (kN/m) = belasting (kN/m²) × belastingbreedte (m)</b>. Van lijnlast naar oplegreactie bij een ligger op twee steunpunten: <b>R = qL/2</b>.</p>${tt('constructie','belastingen')}<p class="muted small">Waarden zijn indicatief voor de opleiding; constructeurs werken met de Eurocodes (NEN-EN 1990/1991) en belastingfactoren.</p>`},
 {t:'Stabiliteit',sub:'stabiliteit',h:`<p>Verticaal dragen is niet genoeg: een gebouw moet ook <b>horizontaal</b> stabiel zijn tegen wind. Dat kan op drie manieren, vaak gecombineerd:</p><ul class="rules"><li><b>Stijve wanden of schijven</b> (beton, metselwerk, plaatmateriaal).</li><li><b>Windverbanden</b>: schuine staven in een skelet.</li><li><b>Stijve verbindingen</b>: portalen met ingeklemde hoeken.</li></ul><p>De vloeren werken als <b>schijf</b> en brengen de windkracht naar de stabiliteitselementen. Stabiliteit is nodig in beide richtingen.</p>${tt('constructie','stabiliteit')}`},
 {t:'Rekenen met belastingen',sub:'lasten',h:`${ex('Voorbeeld',`<p>Betonvloer 200 mm: 0,2 × 24 = 4,8 kN/m². Plus afwerking 1,0 → g = 5,8 kN/m². Plus gebruik 1,75 → 7,55 kN/m². Balken h.o.h. 3,6 m → q = 7,55 × 3,6 = 27,2 kN/m. Overspanning 5,4 m → R = 27,2 × 5,4 / 2 = 73,4 kN per oplegging.</p>`)}`}],formulas:[]},
{id:'details',name:'Details, aansluitingen en vocht',terms:'details',blurb:'Waar bouwdelen samenkomen gaat het vaak mis: water, lucht, warmte en vocht. Zo voorkom je lekkages en schimmel.',
 subs:[T('details','aansluitingen'),T('details','vochtdetail')],
 theory:[{t:'De vier lagen van een goed detail',sub:'aansluitingen',h:`<p>Bij elke bouwknoop controleer je vier dingen, van buiten naar binnen:</p><ol class="steps plain"><li><b>Waterkering</b>: regen moet naar buiten worden geleid (DPC, lood, opstanden, waterslagen).</li><li><b>Isolatie</b>: doorlopend, zonder koudebrug.</li><li><b>Luchtdichting</b>: geen kieren waar lucht door lekt.</li><li><b>Dampremming</b>: dampdicht aan de warme kant, dampopen aan de koude kant.</li></ol>${tt('details','aansluitingen')}`},
 {t:'Vocht in gebouwen',sub:'vochtdetail',h:`<p>Vochtproblemen hebben vier hoofdoorzaken: <b>optrekkend</b> vocht (uit de grond), <b>doorslaand</b> vocht (regen), <b>condensatie</b> (binnenlucht op koude vlakken) en <b>lekkage</b> (installaties, daken). Kijk eerst naar de plek en het patroon, dan pas naar de oplossing.</p>${pit('Schimmel in een hoek is meestal condensatie, geen lekkage. Meer ventileren en de koudebrug oplossen helpt dan meer dan een kitvoeg.')}${tt('details','vochtdetail')}`}],formulas:[]},
{id:'uitvoering',name:'Uitvoering en bouwplaats',terms:'uitvoering',blurb:'Plannen, de bouwplaats inrichten en veilig werken: van werkvoorbereiding tot oplevering.',
 subs:[T('uitvoering','planning'),T('uitvoering','bouwplaats'),{id:'plannen',name:'Planning berekenen',gen:genPlanning}],
 theory:[{t:'Plannen',sub:'planning',h:`<p>Een planning zet activiteiten in de juiste volgorde, met hun duur en afhankelijkheden. Activiteiten die tegelijk kunnen, lopen parallel; dan telt de langste. De langste keten zonder speling is het <b>kritieke pad</b>.</p><p>Gangbare volgorde bij een woning: grondwerk → fundering → ruwbouw (casco) → dak → gevels en kozijnen (wind- en waterdicht) → installaties en afbouw → oplevering.</p>${tt('uitvoering','planning')}`},
 {t:'De bouwplaats en veiligheid',sub:'bouwplaats',h:`<p>De bouw is een van de gevaarlijkste sectoren. De Arbowet en het Arbobesluit eisen onder meer een <b>V&G-plan</b> en maatregelen tegen <b>vallen van hoogte</b> (vanaf 2,5 m), het grootste risico op de bouwplaats.</p>${tt('uitvoering','bouwplaats')}`},
 {t:'Rekenen aan een planning',sub:'plannen',h:`<div class="formula-grid"><div>uren = hoeveelheid × normtijd</div><div>dagen = uren / (mensen × uren per dag)</div><div>parallel: duur = de langste</div><div>speling = kritiek − andere route</div></div>`}],formulas:[]},
{id:'veiligheid',name:'Brandveiligheid, vluchten en trappen',terms:'veiligheid',blurb:'De veiligheidseisen uit het Bbl: brandcompartimenten, vluchtroutes, vloerafscheidingen, toegankelijkheid en trappen.',
 subs:[T('veiligheid','brand'),T('veiligheid','vluchten'),{id:'trapbbl',name:'Trappen toetsen',gen:genTrapBbl}],
 theory:[{t:'Brandveiligheid',sub:'brand',h:`<p>Het doel van de brandeisen: mensen moeten veilig kunnen vluchten en brand mag niet snel naar buren overslaan. Daarvoor wordt een gebouw in <b>compartimenten</b> verdeeld.</p><div class="tblwrap"><table class="rtab"><tr><th>Onderwerp</th><th>Nieuwbouw (hoofdregel)</th></tr><tr><td>Brandcompartiment</td><td>maximaal 1000 m²</td></tr><tr><td>WBDBO tussen brandcompartimenten</td><td>60 minuten (bij woningen soms 30 minuten)</td></tr><tr><td>Rookmelders</td><td>verplicht, aangesloten op het elektriciteitsnet</td></tr></table></div><p>Elke woning is een eigen brandcompartiment: de woningscheidende wand moet dus de WBDBO halen.</p>${tt('veiligheid','brand')}`},
 {t:'Vluchten, vloerafscheidingen en toegankelijkheid',sub:'vluchten',h:`<div class="tblwrap"><table class="rtab"><tr><th>Onderwerp</th><th>Eis woonfunctie, nieuwbouw</th></tr><tr><td>Vloerafscheiding</td><td>bij hoogteverschil &gt; 1 m; minimaal 1 m hoog (bij &gt; 13 m: 1,2 m)</td></tr><tr><td>Openingen in een vloerafscheiding</td><td>tot 0,7 m hoogte niet breder dan 0,1 m; niet beklimbaar tussen 0,2 en 0,7 m</td></tr><tr><td>Vrije doorgang deur</td><td>circa 0,85 m breed, 2,3 m hoog</td></tr></table></div>${tt('veiligheid','vluchten')}`},
 {t:'Trappen',sub:'trapbbl',h:`<div class="tblwrap"><table class="rtab"><tr><th>Trap, woonfunctie nieuwbouw</th><th>Eis</th></tr><tr><td>Breedte</td><td>≥ 0,8 m</td></tr><tr><td>Vrije hoogte</td><td>≥ 2,3 m</td></tr><tr><td>Optrede</td><td>≤ 188 mm</td></tr><tr><td>Aantrede (op de klimlijn)</td><td>≥ 220 mm</td></tr><tr><td>Hoogte per trap</td><td>≤ 4 m</td></tr><tr><td>Leuning</td><td>bij hoogteverschil ≥ 1 m, op 0,8–1,0 m hoogte</td></tr></table></div>
 <ol class="steps plain"><li>Aantal optredes: n = h / 188, <b>naar boven</b> afronden.</li><li>Optrede: o = h / n.</li><li>Aantrede uit de stapmaatregel: a = 630 − 2o (comfortabel: 2o + a tussen 570 en 630).</li><li>Treden = n − 1; traplengte = (n − 1) × a.</li></ol><p class="muted small">Selectie voor de opleiding; voor echte projecten altijd het actuele Bbl gebruiken.</p>`}],formulas:[]},
{id:'installsys',name:'Installatiesystemen',terms:'installsys',blurb:'Ventilatiesystemen A tot D, verwarming, warmtepompen, water, riolering en elektra: hoe ze werken en hoe ze heten.',
 subs:[T('installsys','klimaat'),T('installsys','water'),T('installsys','elektra')],
 theory:[{t:'Ventilatie en verwarming',sub:'klimaat',h:`<div class="tblwrap"><table class="rtab"><tr><th>Systeem</th><th>Toevoer</th><th>Afvoer</th></tr><tr><td>A</td><td>natuurlijk</td><td>natuurlijk</td></tr><tr><td>B</td><td>mechanisch</td><td>natuurlijk</td></tr><tr><td>C</td><td>natuurlijk (roosters)</td><td>mechanisch (box)</td></tr><tr><td>D</td><td>mechanisch</td><td>mechanisch, meestal met WTW</td></tr></table></div><p>Nieuwbouw is aardgasvrij: verwarming gebeurt meestal met een warmtepomp en lage-temperatuurverwarming (vloer- of wandverwarming).</p>${tt('installsys','klimaat')}`},
 {t:'Water en riolering',sub:'water',h:`<p>Houd drie stromen uit elkaar: <b>drinkwater</b> (onder druk, naar de tappunten), <b>vuil water</b> (DWA, onder afschot naar het riool) en <b>regenwater</b> (HWA, naar regenwaterriool of infiltratie).</p>${tt('installsys','water')}`},
 {t:'Elektra en energie',sub:'elektra',h:tt('installsys','elektra')}],formulas:[]},
{id:'bfbegrip',name:'Bouwfysica-begrippen',terms:'bfbegrip',blurb:'De vaktaal van warmte, vocht en geluid, zodat je de rekenhoofdstukken bouwfysica begrijpt.',
 subs:[T('bfbegrip','warmtevocht'),T('bfbegrip','geluidb')],
 theory:[{t:'Warmte en vocht',sub:'warmtevocht',h:`<p>Warmte stroomt van warm naar koud, waterdamp van hoge naar lage dampspanning. Daarom: <b>isoleren</b> (hoge Rc, lage U), <b>luchtdicht</b> bouwen en de <b>dampremmer aan de warme kant</b>.</p>${tt('bfbegrip','warmtevocht')}`},
 {t:'Geluid',sub:'geluidb',h:`<p>Bij geluid onderscheid je <b>luchtgeluid</b> (stemmen, muziek) en <b>contactgeluid</b> (voetstappen). Luchtgeluid houd je tegen met massa of ontkoppelde constructies, contactgeluid met een zwevende vloer. In een ruimte bepaalt absorptie hoe galmend het klinkt.</p>${tt('bfbegrip','geluidb')}`}],formulas:[]}
];
NEW.forEach(m=>{const calc=m.subs.filter(s=>!s.gen.isTerm).map(s=>s.name);m.goals=[[TG[0],...m.subs.filter(s=>s.gen.isTerm).map(s=>s.name)],[TG[1],...calc],[TG[2],...(calc.length?['Volledige berekening in de praktijkopdracht']:[])]];MODS.push(m);MOD[m.id]=m});
Object.assign(FORMULAS,{
constructie:[FC(1,'Eigen gewicht vloer','g = d × γ',[['d','dikte','m'],['γ','volumiek gewicht (beton 24)','kN/m³']],'Van dikte naar belasting per m².','0,2 × 24 = 4,8 kN/m²'),FC(1,'Totale vlaklast','p = g + q',[['g','permanent','kN/m²'],['q','veranderlijk','kN/m²']],'Alle belastingen per m² optellen.',''),FC(2,'Lijnlast','q<sub>lijn</sub> = p × b',[['b','belastingbreedte (h.o.h.)','m']],'Van vloer naar balk.','7 × 3,6 = 25,2 kN/m'),FC(2,'Oplegreactie','R = {{q · L|2}}',[['L','overspanning','m']],'Ligger op twee steunpunten met gelijkmatige last.',''),FC(3,'Maximaal moment','M = {{q · L²|8}}',[],'Nodig voor het dimensioneren van de ligger.','')],
uitvoering:[FC(1,'Arbeidsuren','uren = hoeveelheid × normtijd',[],'',''),FC(1,'Doorlooptijd','dagen = {{uren|mensen × uren per dag}}',[],'Naar boven afronden op hele dagen.',''),FC(2,'Parallelle activiteiten','duur = max(t₁, t₂)',[],'De langste bepaalt.',''),FC(3,'Speling','speling = t<sub>kritiek</sub> − t<sub>route</sub>',[],'Hoeveel een niet-kritieke route mag uitlopen.','')],
veiligheid:[FC(1,'Aantal optredes','n = ⌈h / 188⌉',[['h','verdiepingshoogte','mm']],'Altijd naar boven afronden.','2800 / 188 = 14,9 → 15'),FC(1,'Optrede','o = h / n',[],'',''),FC(2,'Stapmaatregel','2o + a = 630 mm (comfort 570–630)',[['a','aantrede','mm']],'Comfortabele trap; Bbl: a ≥ 220 mm.',''),FC(3,'Traplengte','L = (n − 1) × a',[],'Lengte in de plattegrond.',''),FC(1,'Vloerafscheiding','≥ 1,0 m (hoogteverschil > 13 m: ≥ 1,2 m)',[],'Bij hoogteverschil > 1 m.',''),FC(2,'Trap Bbl','b ≥ 0,8 m · vrije hoogte ≥ 2,3 m · o ≤ 188 · a ≥ 220',[],'Woonfunctie nieuwbouw.','')]
});
Object.assign(CASES,CASES4);
})();

// ================= UITGEBREIDE FORMULE-UITLEG =================
// X(hoofdstuk, kaartnaam, uitleg, stappen[], omschrijven, voorbeeldstappen[], valkuil)
const FX={};
const fxn=t=>frx(String(t||'').replace(/\^\{([^}]*)\}/g,'<sup>$1</sup>').replace(/\^\(([^)]*)\)/g,'<sup>$1</sup>').replace(/\^([A-Za-z0-9,.]+)/g,'<sup>$1</sup>').replace(/([A-Za-zθσΦ])_\{([^}]*)\}/g,'$1<sub>$2</sub>').replace(/([A-Za-zθσΦ])_([A-Za-z0-9,]+)/g,'$1<sub>$2</sub>'));
const X=(m,n,u,st,om,ex,p)=>{FX[m+'|'+n]={u:fxn(u),st:(st||[]).map(fxn),om:fxn(om),ex:(ex||[]).map(fxn),p:fxn(p)}};

// ---------- basis ----------
X('basis','Optellen en aftrekken','Bij optellen maakt de volgorde niet uit (dat heet de wisseleigenschap), bij aftrekken wel. Uit je hoofd rekenen gaat het makkelijkst door getallen te splitsen in honderdtallen, tientallen en eenheden en die apart op te tellen.',['Splits het tweede getal: 38 = 30 + 8.','Tel eerst de tientallen erbij, dan de eenheden.','Bij aftrekken: trek eerst de tientallen af, dan de eenheden.','Controleer aftrekken door terug op te tellen.'],'a − b = c ⇔ c + b = a',['93 − 47: eerst 93 − 40 = 53','dan 53 − 7 = 46','controle: 46 + 47 = 93 ✓'],'');
X('basis','Vermenigvuldigen splitsen','Dit is de verdeeleigenschap: je mag een getal opsplitsen, elk deel apart vermenigvuldigen en de uitkomsten optellen. Zo maak je van één lastige som twee makkelijke.',['Splits het lastigste getal in een rond getal en een rest (34 = 30 + 4).','Vermenigvuldig elk deel met het andere getal.','Tel de deeluitkomsten op.'],'a × (b − c) = a × b − a × c (ook handig: 6 × 49 = 6 × 50 − 6)',['7 × 48 = 7 × 50 − 7 × 2','= 350 − 14 = 336'],'Vergeet niet élk deel te vermenigvuldigen: 6 × (30 + 4) is niet 180 + 4.');
X('basis','Delen en controleren','Delen is het omgekeerde van vermenigvuldigen. Elke deling kun je dus terugrekenen met een vermenigvuldiging. Dat is ook de snelste manier om je antwoord te controleren.',['Schat eerst hoe groot de uitkomst ongeveer is.','Zoek in de tafel welk getal keer de deler het deeltal geeft.','Controleer: deler × uitkomst = deeltal.'],'c = a ÷ b · a = b × c · b = a ÷ c',['144 ÷ 12: welke 12 × ? = 144','12 × 12 = 144, dus 12'],'');
X('basis','Komma verschuiven','Vermenigvuldigen met 10, 100 of 1000 maakt een getal 10, 100 of 1000 keer zo groot: elk cijfer schuift een plaats naar links, wat hetzelfde is als de komma naar rechts schuiven. Dit gebruik je bij elke eenheidsomrekening (mm ↔ m).',['Tel het aantal nullen: 1000 heeft er 3.','Vermenigvuldigen: komma zoveel plaatsen naar rechts.','Delen: komma zoveel plaatsen naar links.','Vul ontbrekende plaatsen aan met nullen.'],'',['0,045 × 1000 → komma 3 naar rechts → 45','72 ÷ 1000 → 72,0 → 0,072'],'Bij 7,2 × 100 schuift de komma twee plaatsen: 720, niet 7200. Vul aan met nullen waar nodig.');
X('basis','Afronden','Afronden maakt een getal eenvoudiger met behoud van zijn grootte. Je kijkt alleen naar het eerste cijfer ná de plek waarop je afrondt.',['Bepaal op welke plek je afrondt (hele getallen, 1 decimaal, …).','Kijk naar het cijfer direct daarna.','0–4: laat staan en schrap de rest. 5–9: verhoog de plek met 1.'],'',['3,1462 op 2 decimalen: cijfer erna is 6','dus 3,15'],'');
X('basis','Kommagetallen vermenigvuldigen','De komma kun je even vergeten. Reken met hele getallen en zet de komma pas aan het eind terug: de uitkomst krijgt evenveel decimalen als beide getallen samen.',['Haal de komma’s weg en vermenigvuldig de hele getallen.','Tel het aantal decimalen van beide getallen op.','Zet de komma zo veel plaatsen van rechts.','Controleer met een schatting.'],'',['2,5 × 0,12 → 25 × 12 = 300','decimalen: 1 + 2 = 3 → 0,300 = 0,3','schatting: 2,5 × 0,1 ≈ 0,25 ✓'],'Tel de decimalen van beide getallen, niet van de uitkomst.');
X('basis','Verpakkingen: naar boven afronden','In de bouw koop je hele zakken, pakken of platen. Is de uitkomst 7,2 zakken, dan heb je er 8 nodig. De haakjes ⌈ ⌉ betekenen: altijd naar boven afronden.',['Bereken hoeveel je nodig hebt (inclusief snijverlies).','Deel door de inhoud per verpakking.','Rond altijd naar boven af, ook bij 7,1.'],'',['benodigd 340 kg lijm, zak van 25 kg','340 ÷ 25 = 13,6 → 14 zakken'],'');
X('basis','Delen door een kommagetal','Een deling verandert niet als je deeltal én deler met hetzelfde getal vermenigvuldigt. Maak de deler daarom eerst een heel getal.',['Kijk hoeveel decimalen de deler heeft.','Vermenigvuldig beide getallen met 10, 100 of 1000 tot de deler heel is.','Deel daarna gewoon.'],'',['4,8 ÷ 0,06 → × 100 → 480 ÷ 6','= 80'],'Vermenigvuldig wel béide getallen, anders klopt de uitkomst niet.');
X('basis','Snijverlies','Bij het zagen, knippen en passen van materiaal gaat altijd wat verloren. Daarom bestel je meer dan de netto hoeveelheid: netto vermenigvuldigd met een factor groter dan 1.',['Bepaal de netto hoeveelheid (uit de tekening).','Zet het verliespercentage om naar een factor: 10% → 1,10.','Vermenigvuldig netto met die factor.','Rond af naar hele verpakkingen.'],'netto = benodigd ÷ (1 + verlies/100)',['netto 24 m² tegels, 8% verlies','24 × 1,08 = 25,92 m² → bestel 26 m²'],'Tel het verlies niet op als losse m²: 24 + 8 = 32 is fout.');

// ---------- rekenen ----------
X('rekenen','Volgorde van bewerkingen','Een som met meerdere bewerkingen heeft één juiste uitkomst omdat iedereen dezelfde volgorde afspreekt. Rekenmachines volgen die volgorde ook, dus typ je een som verkeerd in, dan krijg je een verkeerd antwoord.',['Eerst alles tussen haakjes.','Dan machten en wortels.','Dan vermenigvuldigen en delen, van links naar rechts.','Tot slot optellen en aftrekken, van links naar rechts.'],'',['3 + 4 × 2² = 3 + 4 × 4','= 3 + 16 = 19'],'');
X('rekenen','Tekenregels','Bij vermenigvuldigen en delen bepaal je eerst het teken en daarna het getal. Twee gelijke tekens geven plus, twee verschillende geven min.',['Bepaal het teken: gelijk → +, verschillend → −.','Reken het getal uit zonder tekens.','Zet het teken ervoor.'],'Bij optellen en aftrekken: − (−a) = + a',['(−6) × (−4): gelijke tekens → +','6 × 4 = 24 → +24'],'');
X('rekenen','Procent van een getal','Procent betekent "per honderd". 15% is dus 15/100 = 0,15. Een percentage van een getal reken je uit door het getal met die factor te vermenigvuldigen.',['Deel het percentage door 100 (15% → 0,15).','Vermenigvuldig met het getal.','Handig uit je hoofd: 10% = komma één plaats naar links.'],'p = {{deel|geheel}} × 100% · geheel = {{deel|p/100}}',['21% btw over € 1.200','0,21 × 1200 = € 252'],'Rekenen met percentages van percentages? Werk met factoren (zie groeifactor).');
X('rekenen','Breuken vermenigvuldigen','Teller maal teller en noemer maal noemer: je neemt "een deel van een deel". ½ × ⅓ is de helft van een derde = 1/6.',['Vermenigvuldig de tellers.','Vermenigvuldig de noemers.','Vereenvoudig: deel teller en noemer door hun grootste gemeenschappelijke deler.'],'',['{{2|3}} × {{3|4}} = {{6|12}}','vereenvoudigen door 6: {{1|2}}'],'Gelijknamig maken is hier níet nodig, alleen bij optellen en aftrekken.');
X('rekenen','Groeifactor','Een verandering met een percentage is hetzelfde als vermenigvuldigen met één getal, de groeifactor. Dat rekent sneller en je kunt veranderingen achter elkaar gewoon vermenigvuldigen.',['Stijging: g = 1 + p/100. Daling: g = 1 − p/100.','Nieuw = oud × g.','Terugrekenen: oud = nieuw ÷ g.'],'p = (g − 1) × 100%',['prijs stijgt 6%: g = 1,06','€ 450 × 1,06 = € 477'],'Een daling van 20% geeft g = 0,80, niet 0,20.');
X('rekenen','Gemiddelde','Het gemiddelde is de waarde die je zou krijgen als je alles eerlijk verdeelt. Tel alles op en deel door het aantal waarnemingen.',['Tel alle waarden op.','Tel hoeveel waarden het zijn (n).','Deel de som door n.'],'som = x̄ × n',['cijfers 6, 7, 8, 5','som 26, n = 4 → 26 ÷ 4 = 6,5'],'Uitschieters trekken het gemiddelde scheef; kijk dan ook naar de mediaan.');
X('rekenen','Gewogen gemiddelde','Niet elke waarde telt even zwaar: een tentamen met 5 studiepunten weegt zwaarder dan een opdracht met 1. Vermenigvuldig elke waarde met zijn gewicht, tel op, en deel door de som van de gewichten.',['Vermenigvuldig elke waarde met haar gewicht.','Tel die producten op.','Tel de gewichten op.','Deel de som van de producten door de som van de gewichten.'],'',['cijfer 6 (weging 3) en 8 (weging 1)','(6·3 + 8·1) ÷ (3 + 1) = 26 ÷ 4 = 6,5'],'Deel door de som van de gewichten, niet door het aantal cijfers.');
X('rekenen','Delen door een breuk','Delen door een breuk is vermenigvuldigen met het omgekeerde. Delen door ½ is dus keer 2: hoeveel halven passen er in een getal?',['Laat de eerste breuk staan.','Maak van ÷ een ×.','Draai de tweede breuk om (teller en noemer wisselen).','Vermenigvuldig en vereenvoudig.'],'',['{{3|4}} ÷ {{1|2}} = {{3|4}} × {{2|1}}','= {{6|4}} = 1{{1|2}}'],'Draai alleen de breuk ná het deelteken om.');
// (Breuken optellen, Procentuele verandering, Terugrekenen, Opeenvolgende veranderingen hebben al voorbeeld en valkuil)
X('rekenen','Breuken optellen','Je kunt alleen stukken van dezelfde grootte optellen. Daarom maak je de breuken eerst gelijknamig: dezelfde noemer.',['Zoek een gemeenschappelijke noemer (het kleinste gemeenschappelijke veelvoud).','Schrijf elke breuk om naar die noemer.','Tel de tellers op; de noemer blijft gelijk.','Vereenvoudig.'],'',['{{1|3}} + {{1|4}}: noemer 12','{{4|12}} + {{3|12}} = {{7|12}}'],'');
X('rekenen','Procentuele verandering','Je vergelijkt de verandering met de oude (begin)waarde. Zo kun je stijgingen van verschillende groottes eerlijk vergelijken.',['Bereken het verschil: nieuw − oud.','Deel door de oude waarde.','Vermenigvuldig met 100%.','Positief = stijging, negatief = daling.'],'nieuw = oud × (1 + p/100)',['van € 80 naar € 92','(92 − 80) ÷ 80 × 100% = 15%'],'');
X('rekenen','Terugrekenen (exclusief uit inclusief)','Een prijs inclusief btw is de prijs exclusief × 1,21. Terugrekenen doe je dus door te delen door de factor, niet door 21% van de inclusieve prijs af te halen.',['Bepaal de groeifactor (21% btw → 1,21).','Deel de nieuwe waarde door die factor.'],'nieuw = oud × g',['€ 605 incl. btw','605 ÷ 1,21 = € 500 excl.'],'');
X('rekenen','Opeenvolgende veranderingen','Verandert iets twee keer achter elkaar, dan vermenigvuldig je de groeifactoren. +10% en daarna −10% is dus niet 0%, maar 1,10 × 0,90 = 0,99: −1%.',['Zet elke verandering om in een groeifactor.','Vermenigvuldig alle factoren.','Zet de totale factor terug om in een percentage.'],'',['+5% en daarna +8%','1,05 × 1,08 = 1,134 → +13,4%'],'');

// ---------- eenheden ----------
X('eenheden','Lengte','Het metrieke stelsel werkt met factoren 10. Elke stap op de trap km–hm–dam–m–dm–cm–mm is × 10 of ÷ 10. Bouwtekeningen staan in mm, hoogtematen vaak in m.',['Zoek beide eenheden op de trap.','Tel het aantal stappen.','Naar een kleinere eenheid: × 10 per stap. Naar een grotere: ÷ 10 per stap.'],'',['3,45 m → mm: 3 stappen omlaag','3,45 × 1000 = 3450 mm'],'Tussen km en m zitten drie stappen (hm, dam), dus × 1000.');
X('eenheden','Inhoud en liter','Een liter is precies een kubus van 1 dm bij 1 dm bij 1 dm. Daarom is 1 dm³ = 1 L en 1 m³ = 1000 L. Bij inhoud is elke stap op de trap × 1000 (10 × 10 × 10).',['Zet om naar dm³ als je met liters wilt rekenen.','Per stap op de inhoudstrap: × 1000 of ÷ 1000.','dm³ en L zijn gelijk.'],'',['0,25 m³ beton → liter','0,25 × 1000 = 250 dm³ = 250 L'],'Bij inhoud is de stap 1000, niet 10.');
X('eenheden','Zwaartekracht','De aarde trekt aan elke massa. Die kracht reken je in newton: massa in kg keer 9,81 m/s². In de bouw rond je vaak af naar 10 N/kg, dus 1 kg ≈ 10 N en 100 kg ≈ 1 kN.',['Zet de massa om naar kg.','Vermenigvuldig met g = 9,81 (of 10 voor een schatting).','Uitkomst in N; deel door 1000 voor kN.'],'m = {{F_z|g}}',['zak cement 25 kg','25 × 9,81 = 245 N ≈ 0,25 kN'],'');
X('eenheden','Tijd','Tijd is niet tientallig: een uur heeft 60 minuten, niet 100. 1,5 uur is dus 1 uur en 30 minuten, niet 1 uur en 50 minuten.',['Uren → minuten: × 60.','Minuten → seconden: × 60.','Uren → seconden: × 3600.'],'',['2,25 h → min','2,25 × 60 = 135 min'],'');
X('eenheden','Oppervlakte','Oppervlakte is lengte × breedte, dus elke omrekenstap telt dubbel: 1 m = 10 dm, maar 1 m² = 10 × 10 = 100 dm².',['Zoek beide eenheden op de trap.','Per stap: × 100 of ÷ 100.','1 ha = 10 000 m², 1 are = 100 m².'],'',['2,5 m² → cm²: 2 stappen','2,5 × 10 000 = 25 000 cm²'],'');
X('eenheden','Spanning en druk','Spanning en druk zijn kracht per oppervlakte. Constructeurs gebruiken N/mm² (= MPa), funderingsadviseurs kN/m² (= kPa). Ze verschillen een factor 1000.',['Kijk welke eenheid gevraagd wordt.','N/mm² → kN/m²: × 1000.','kN/m² → N/mm²: ÷ 1000.'],'1 kN/m² = 0,001 N/mm²',['200 kN/m² gronddruk','200 ÷ 1000 = 0,2 N/mm²'],'1 m² is 10⁶ mm², dus 1 N/mm² is 10⁶ N/m²: let op het verschil met kN.');
X('eenheden','Snelheid','Snelheid is afgelegde afstand per tijd. Van km/h naar m/s deel je door 3,6 omdat 1 km/h = 1000 m / 3600 s.',['Zet afstand en tijd in passende eenheden.','Deel afstand door tijd.','km/h → m/s: ÷ 3,6; m/s → km/h: × 3,6.'],'s = v · t · t = {{s|v}}',['wind 90 km/h','90 ÷ 3,6 = 25 m/s'],'');
X('eenheden','Debiet','Debiet is hoeveel volume er per tijdseenheid stroomt: water in een leiding, lucht in een ventilatiekanaal.',['Zet het volume om (bijv. naar L of m³).','Zet de tijd om (s of h).','Deel volume door tijd.'],'V = Q · t · t = {{V|Q}}',['een bad van 150 L vult in 10 min','150 ÷ 600 s = 0,25 L/s'],'');
X('eenheden','Eigen gewicht','Het gewicht van een bouwdeel is volume × dichtheid × g. Constructeurs gebruiken direct het volumiek gewicht γ (kN/m³): beton 24, staal 78,5, hout ca. 5.',['Bereken het volume in m³.','Vermenigvuldig met γ in kN/m³.','Uitkomst in kN.'],'γ = ρ · g (2400 kg/m³ × 10 = 24 kN/m³)',['betonbalk 0,3 × 0,5 × 6 m = 0,9 m³','0,9 × 24 = 21,6 kN'],'Werk met m³, niet met mm³: zet afmetingen eerst om naar meter.');
X('eenheden','Samengestelde eenheden','Bij eenheden als m³/h of kN/m² reken je teller en noemer apart om. Zo zie je precies welke factor je nodig hebt.',['Schrijf de eenheid als breuk.','Reken de teller om (m³ → L: × 1000).','Reken de noemer om (h → s: × 3600).','Deel de factor van de teller door die van de noemer.'],'',['360 m³/h → L/s','360 × 1000 ÷ 3600 = 100 L/s'],'Een factor in de noemer moet je delen, niet vermenigvuldigen.');

// ---------- machten ----------
X('machten','Macht','Een macht is een korte schrijfwijze voor herhaald vermenigvuldigen. Het grondtal is het getal dat je vermenigvuldigt, de exponent hoe vaak. Oppervlak (m²) en inhoud (m³) zijn machten van lengtes.',['Schrijf het grondtal zo vaak op als de exponent zegt.','Vermenigvuldig.','Op de rekenmachine: x^y of xⁿ.'],'',['2⁵ = 2 × 2 × 2 × 2 × 2','= 32'],'2³ is niet 2 × 3 = 6 maar 8.');
X('machten','Wortel','De wortel is het omgekeerde van kwadrateren: welk getal keer zichzelf geeft dit getal? Zo vind je de zijde van een vierkant als je het oppervlak kent.',['Zoek een getal dat in het kwadraat het getal geeft.','Ken de kwadraten tot 15² uit je hoofd.','Anders: rekenmachine √.'],'a = b² · b = √a',['vierkante kamer van 30,25 m²','√30,25 = 5,5 m'],'De wortel van een negatief getal bestaat niet (in de bouw: controleer je berekening).');
X('machten','Product van machten','Met hetzelfde grondtal tel je bij vermenigvuldigen de exponenten op: je plakt de rijtjes vermenigvuldigingen achter elkaar.',['Controleer of de grondtallen gelijk zijn.','Tel de exponenten op.','Bij verschillende grondtallen: eerst apart uitrekenen.'],'',['10³ × 10⁴','= 10⁷'],'');
X('machten','Quotiënt van machten','Bij delen met hetzelfde grondtal trek je de exponenten af: factoren in teller en noemer strepen tegen elkaar weg.',['Controleer of de grondtallen gelijk zijn.','Exponent van de teller min exponent van de noemer.'],'',['{{10^6|10^2}}','= 10⁴ = 10 000'],'Trek af in de goede volgorde: teller − noemer.');
X('machten','Macht van een macht','Een macht die je nóg eens tot een macht verheft: je vermenigvuldigt de exponenten.',['Vermenigvuldig de exponenten.','Reken uit.'],'',['(10³)² = 10⁶','(1000)² = 1 000 000 ✓'],'Niet optellen: (a²)³ = a⁶, niet a⁵.');
X('machten','Negatieve en nulde exponent','Een negatieve exponent betekent "1 gedeeld door". Zo is 10⁻³ = 1/1000 = 0,001: precies het verband tussen mm en m.',['Negatieve exponent: zet de macht onder een breukstreep met 1 erboven.','Exponent 0: altijd 1 (behalve 0⁰).'],'',['10⁻² = {{1|10^2}}','= 0,01'],'Een negatieve exponent maakt het getal niet negatief, maar klein.');
X('machten','Wetenschappelijke notatie','Zeer grote of kleine getallen schrijf je als een getal tussen 1 en 10 maal een macht van 10. Rekenmachines tonen dat als 1,5E6.',['Zet de komma direct achter het eerste cijfer dat geen 0 is.','Tel hoeveel plaatsen de komma verschoven is.','Naar links verschoven: positieve exponent. Naar rechts: negatief.'],'',['0,000 012 m','1,2 × 10⁻⁵ m'],'De E op je rekenmachine betekent "× 10 tot de macht".');
X('machten','Gebroken exponent','Een gebroken exponent combineert macht en wortel: de noemer is de wortel, de teller de macht. Exponent ½ is dus de vierkantswortel.',['De noemer q geeft de q-de machtswortel.','De teller p geeft de macht.','Volgorde maakt niet uit; wortel eerst rekent meestal makkelijker.'],'a^{1/2} = √a · a^{1/3} = ∛a',['8^{2/3} = (∛8)²','= 2² = 4'],'');
X('machten','Wortels splitsen','Een wortel van een product mag je splitsen. Zo kun je wortels vereenvoudigen door een kwadraat eruit te halen.',['Zoek in het getal een kwadraat als factor (4, 9, 16, 25, …).','Splits de wortel.','Trek de wortel van het kwadraat.'],'',['√50 = √(25 × 2)','= 5√2 ≈ 7,07'],'');
X('machten','Terugrekenen','Ken je het oppervlak of de inhoud, dan vind je de afmeting terug met een wortel. Zo bepaal je de zijde van een vierkante poer of de diameter van een ronde kolom.',['Schrijf de formule voor oppervlak of inhoud op.','Zet de bekende waarde erin.','Werk terug met wortel (vierkant, cirkel) of derdemachtswortel (kubus).'],'',['ronde kolom A = 0,126 m²','d = √(4 × 0,126 ÷ π) = 0,40 m'],'Vergeet bij een cirkel de factor 4/π niet.');

// ---------- schaal ----------
X('schaal','Schaal 1:n','Schaal 1:100 betekent: 1 eenheid op tekening is 100 dezelfde eenheden in het echt. 1 cm op tekening is dus 100 cm = 1 m in werkelijkheid.',['Meet de tekenmaat (meestal in mm of cm).','Vermenigvuldig met n.','Zet om naar de gewenste eenheid (vaak m).'],'',['op 1:50 meet je 84 mm','84 × 50 = 4200 mm = 4,2 m'],'');
X('schaal','Recht evenredig','Twee grootheden zijn recht evenredig als ze in dezelfde verhouding meegroeien: twee keer zoveel tegels kost twee keer zoveel geld. Een verhoudingstabel helpt.',['Zet de bekende paren in een verhoudingstabel.','Bepaal de factor tussen de kolommen.','Doe met de andere rij hetzelfde.'],'a₂ = a₁ × {{b_2|b_1}}',['3 m² kost € 87','1 m² = € 29 → 8 m² = € 232'],'');
X('schaal','Tekenmaat','Om iets op schaal te tekenen deel je de werkelijke maat door n. Zet eerst alles in dezelfde eenheid, meestal mm.',['Zet de werkelijke maat om naar mm.','Deel door n.'],'',['wand 5,4 m op 1:100','5400 ÷ 100 = 54 mm'],'');
X('schaal','Schaal bepalen','Ken je een werkelijke maat en de bijbehorende tekenmaat, dan vind je de schaal door te delen. Beide maten moeten dezelfde eenheid hebben.',['Zet beide maten om naar dezelfde eenheid.','Deel werkelijk door tekenmaat.','Schrijf als 1 : n.'],'',['deur 930 mm op tekening 18,6 mm','930 ÷ 18,6 = 50 → 1:50'],'Werkelijk delen door tekening, niet andersom.');
X('schaal','Omgekeerd evenredig','Bij omgekeerd evenredig wordt de ene grootheid kleiner als de andere groter wordt, zodanig dat het product gelijk blijft: twee keer zoveel mensen = de helft van de tijd.',['Bereken het product van het bekende paar.','Deel dat product door de nieuwe waarde.'],'a₂ = {{a_1 · b_1|b_2}}',['4 man doen 6 dagen → 24 mandagen','6 man: 24 ÷ 6 = 4 dagen'],'Werkt alleen als het werk echt te verdelen is.');
X('schaal','Mengverhouding','Een mengverhouding zoals 1 : 3 (cement : zand) betekent: van de 4 delen is 1 deel cement en 3 delen zand.',['Tel alle delen op.','Deel de totale hoeveelheid door het aantal delen: dat is 1 deel.','Vermenigvuldig met het aantal delen per component.'],'',['80 L mortel in 1 : 3','1 deel = 80 ÷ 4 = 20 L → 20 L cement, 60 L zand'],'Deel door de som (4), niet door 3.');
X('schaal','Oppervlakte op schaal','Op schaal krimpen beide richtingen. Een oppervlak verandert daarom met n²: op 1:100 is 1 cm² op tekening 100 × 100 = 10 000 cm² = 1 m².',['Meet of bereken het oppervlak op tekening.','Vermenigvuldig met n².','Zet om naar m².'],'Inhoud schaalt met n³.',['24 cm² op 1:50','24 × 2500 = 60 000 cm² = 6 m²'],'');
X('schaal','Water-cementfactor','De wcf is de verhouding tussen water en cement in beton, in massa. Minder water geeft sterker en dichter beton, maar het wordt slechter verwerkbaar. Typisch 0,45–0,55.',['Neem de massa water en cement in kg.','Deel water door cement.'],'m_water = wcf × m_cement',['320 kg cement, wcf 0,5','water = 0,5 × 320 = 160 kg (= 160 L)'],'Een hogere wcf betekent zwakker beton; water toevoegen op de bouwplaats is daarom slecht.');

// ---------- meetkunde ----------
X('meetkunde','Omtrek rechthoek','De omtrek is de totale lengte rondom: twee lengtes en twee breedtes. Je gebruikt hem voor plinten, randen, funderingsstroken en hekwerk.',['Zet lengte en breedte in dezelfde eenheid.','Tel ze op.','Vermenigvuldig met 2.'],'l = {{O|2}} − b',['kamer 4,2 × 3,6 m','2 × (4,2 + 3,6) = 15,6 m plint'],'Trek deuropeningen af als je plinten berekent.');
X('meetkunde','Oppervlak rechthoek','Oppervlak is hoeveel vierkante eenheden er in een vlak passen: lengte keer breedte. Basis voor vloeren, wanden, tegels en m²-prijzen.',['Zet beide maten in meter.','Vermenigvuldig.','Uitkomst in m².'],'l = {{A|b}} · b = {{A|l}}',['vloer 5,4 × 3,8 m','5,4 × 3,8 = 20,52 m²'],'Reken mm eerst om naar m: 5400 × 3800 mm geeft mm², niet m².');
X('meetkunde','Oppervlak driehoek','Een driehoek is precies de helft van een rechthoek met dezelfde basis en hoogte. De hoogte staat altijd loodrecht op de basis.',['Kies een zijde als basis.','Bepaal de hoogte loodrecht op die basis.','Bereken ½ × basis × hoogte.'],'h = {{2A|b}}',['topgevel: basis 8 m, nokhoogte 3 m','½ × 8 × 3 = 12 m²'],'');
X('meetkunde','Inhoud balk (prisma)','De inhoud van elk prisma (balk, cilinder, driehoekige goot) is het grondvlak keer de hoogte of lengte. Basis voor beton, grondwerk en ruimte-inhoud.',['Bereken het grondvlak (doorsnede).','Vermenigvuldig met de lengte of hoogte.','Zorg dat alles in meter staat → m³.'],'h = {{V|l · b}}',['funderingsstrook 0,6 × 0,4 m, 12 m lang','0,6 × 0,4 × 12 = 2,88 m³ beton'],'');
X('meetkunde','Pythagoras','In een rechthoekige driehoek is het kwadraat van de schuine zijde (c, tegenover de rechte hoek) gelijk aan de som van de kwadraten van de twee rechthoekszijden. Zo bereken je dakschuinten, diagonalen en controleer je haaksheid (3-4-5).',['Zoek de rechte hoek; c ligt ertegenover.','Kwadrateer de twee bekende zijden.','Schuine zijde gezocht: optellen en wortel. Rechthoekszijde gezocht: aftrekken en wortel.'],'c = √(a² + b²) · a = √(c² − b²)',['dak: halve breedte 4 m, hoogte 3 m','c = √(16 + 9) = 5 m spar'],'Alleen in een rechthoekige driehoek, en c is altijd de langste zijde.');
X('meetkunde','Cirkel','π (≈ 3,14) is de verhouding tussen omtrek en diameter, voor elke cirkel gelijk. Voor ronde kolommen, buizen en putten.',['Bepaal of je r of d hebt (d = 2r).','Oppervlak: π r² of ¼ π d².','Omtrek: π d.'],'r = √({{A|π}}) · d = {{O|π}}',['buis d = 110 mm = 0,11 m','A = ¼ × π × 0,11² = 0,0095 m²'],'');
X('meetkunde','Trapezium','Een trapezium heeft twee evenwijdige zijden. Neem hun gemiddelde en vermenigvuldig met de hoogte: alsof je er een rechthoek van maakt.',['Tel de twee evenwijdige zijden op en deel door 2.','Vermenigvuldig met de loodrechte hoogte.'],'h = {{2A|a + b}}',['taludprofiel: boven 6 m, onder 4 m, hoogte 1,5 m','½ × (6 + 4) × 1,5 = 7,5 m²'],'');
X('meetkunde','Netto oppervlak','Voor schilderwerk, metselwerk en stucwerk trek je openingen (ramen, deuren) af van het bruto oppervlak. Voor isolatie onder een vloer niet.',['Bereken het bruto wandoppervlak.','Bereken alle openingen.','Trek de openingen af.'],'',['gevel 8 × 2,8 = 22,4 m², raam 2,4 m², deur 2,1 m²','22,4 − 4,5 = 17,9 m² metselwerk'],'Kijk in de afspraken (bestek) of kleine openingen wel of niet worden afgetrokken.');
X('meetkunde','Rechthoekszijde','Dezelfde stelling van Pythagoras, maar nu ken je de schuine zijde en zoek je een rechthoekszijde: aftrekken in plaats van optellen.',['Kwadrateer de schuine zijde c en de bekende zijde a.','Trek af: c² − a².','Neem de wortel.'],'',['ladder 5 m, voet 1,4 m van de muur','√(25 − 1,96) = 4,8 m hoog'],'');
X('meetkunde','Cilinder','Een cilinder is een prisma met een cirkel als grondvlak. Gebruik hem voor ronde kolommen, palen en putten.',['Bereken het grondvlak π r².','Vermenigvuldig met de hoogte.'],'h = {{V|π r²}}',['paal d = 0,4 m, 12 m lang','π × 0,2² × 12 = 1,51 m³'],'');
X('meetkunde','Ruimtediagonaal','De langste lijn in een balk, van hoek tot tegenoverliggende hoek. Twee keer Pythagoras samengevoegd. Handig om te controleren of een lange plaat of balk door een ruimte past.',['Kwadrateer lengte, breedte en hoogte.','Tel op.','Neem de wortel.'],'',['kamer 4 × 3 × 2,6 m','√(16 + 9 + 6,76) = 5,64 m'],'');
X('meetkunde','Halve cirkel (rondboog)','Een rondboog boven een raam of deur is een halve cirkel. Voor metselwerk en glas.',['Bepaal de straal (halve breedte van de opening).','Bereken ½ π r².'],'',['opening 1,2 m breed → r = 0,6 m','½ × π × 0,36 = 0,57 m²'],'');
X('meetkunde','Omtrek L-vorm','Bij een rechthoekige L-vorm (of elke vorm met alleen rechte hoeken) is de omtrek gelijk aan die van de omhullende rechthoek: elke inspringing wordt elders gecompenseerd.',['Bepaal de totale lengte en totale breedte van de vorm.','Omtrek = 2 × (totale lengte + totale breedte).'],'',['L-vormige woning 12 × 9 m buitenmaten','2 × (12 + 9) = 42 m gevel'],'Werkt alleen als alle hoeken recht zijn en de inspringingen naar binnen gaan.');

// ---------- natuurkunde ----------
X('natuurkunde','Dichtheid','Dichtheid zegt hoe zwaar een materiaal is per volume. Beton (2400 kg/m³) is ongeveer 5 keer zo zwaar als hout (ca. 500) en staal (7850) drie keer zo zwaar als beton. Daarmee reken je gewichten en controleer je of iets drijft.',['Zet massa in kg en volume in m³.','Deel massa door volume.','Vergelijk met bekende waarden: water 1000 kg/m³.'],'m = ρ · V · V = {{m|ρ}}',['blok 0,02 m³ weegt 48 kg','48 ÷ 0,02 = 2400 kg/m³ → beton'],'Gebruik m³, geen dm³ of liters, anders zit je een factor 1000 mis.');
X('natuurkunde','Druk','Druk is kracht verdeeld over een oppervlak. Dezelfde kracht op een kleiner oppervlak geeft meer druk: daarom zakt een naaldhak weg in gras en een poer met groter oppervlak minder in de grond.',['Zet kracht in N (of kN) en oppervlak in m² (of mm²).','Deel kracht door oppervlak.','Eenheden: N/m² = Pa, kN/m² = kPa, N/mm² = MPa.'],'F = p · A · A = {{F|p}}',['kolom 300 kN op poer 1,5 × 1,5 m','300 ÷ 2,25 = 133 kN/m²'],'');
X('natuurkunde','Arbeid','Arbeid is kracht maal de afstand waarover die kracht werkt. Het is de energie die je overdraagt, bijvoorbeeld door iets op te hijsen.',['Zet kracht in N en afstand in m.','Vermenigvuldig.','Uitkomst in joule (J) = Nm.'],'F = {{W|s}} · s = {{W|F}}',['kraan hijst 5 kN over 12 m','5000 × 12 = 60 000 J = 60 kJ'],'Alleen de afstand in de richting van de kracht telt.');
X('natuurkunde','Vermogen','Vermogen is hoe snel arbeid of energie wordt geleverd. Een sterkere motor doet hetzelfde werk sneller. Eenheid: watt = joule per seconde.',['Bepaal de arbeid of energie in J.','Bepaal de tijd in s.','Deel arbeid door tijd.'],'W = P · t · t = {{W|P}}',['60 kJ in 30 s','60 000 ÷ 30 = 2000 W = 2 kW'],'Tijd in seconden, niet in minuten.');
X('natuurkunde','Massa uit volume','De omgekeerde vorm van dichtheid: ken je het volume en het materiaal, dan weet je de massa. Basis voor transport, kraanlast en eigen gewicht.',['Bereken het volume in m³.','Zoek de dichtheid op.','Vermenigvuldig.'],'',['3,5 m³ zand (1600 kg/m³)','3,5 × 1600 = 5600 kg'],'');
X('natuurkunde','Hydrostatische druk','Water drukt harder naarmate het dieper is: elke 10 m water geeft ongeveer 1 bar (100 kN/m²) extra druk. Belangrijk voor kelders, bouwputten en waterdichting.',['Bepaal de waterdiepte h in m.','Vermenigvuldig met ρ (1000) en g (9,81).','Uitkomst in Pa; deel door 1000 voor kPa (kN/m²).'],'h = {{p|ρ · g}}',['kelderbodem 2,5 m onder grondwater','1000 × 9,81 × 2,5 = 24 525 Pa ≈ 24,5 kN/m²'],'');
X('natuurkunde','Zwaarte-energie','Een massa op hoogte heeft energie opgeslagen: die komt vrij als hij valt. Daarom zijn vallende voorwerpen op de bouwplaats zo gevaarlijk.',['Massa in kg, hoogte in m.','Vermenigvuldig m × g × h.','Uitkomst in J.'],'h = {{E_z|m · g}}',['baksteen 2,5 kg valt van 10 m','2,5 × 9,81 × 10 = 245 J'],'');
X('natuurkunde','Rendement','Geen apparaat zet alle energie om in nuttige energie: er gaat altijd wat verloren als warmte. Het rendement zegt welk deel nuttig is.',['Bepaal de nuttige energie (of het nuttige vermogen).','Bepaal de toegevoerde energie.','Deel nuttig door toegevoerd en × 100%.'],'E_nuttig = η × E_in',['pomp krijgt 2 kW, levert 1,5 kW','1,5 ÷ 2 × 100% = 75%'],'Rendement is nooit meer dan 100% (warmtepompen gebruiken daarom een COP).');
X('natuurkunde','Opwaartse kracht','Water drukt van onderen tegen een kelder of bak. Die opwaartse kracht is waterdruk keer bodemoppervlak. Is het gebouw te licht, dan drijft het op.',['Bepaal de diepte onder het grondwater.','Waterdruk p = 10 kN/m³ × h.','Vermenigvuldig met het bodemoppervlak.','Vergelijk met het eigen gewicht.'],'',['bak 6 × 8 m, 1,5 m onder water','10 × 1,5 × 48 = 720 kN omhoog'],'');
X('natuurkunde','Energie in kWh','Op de energierekening staat kWh: het vermogen in kilowatt keer het aantal uren. 1 kWh is 3,6 miljoen joule.',['Zet het vermogen om naar kW.','Zet de tijd om naar uren.','Vermenigvuldig.'],'t = {{E|P}}',['kachel 2000 W, 3 uur','2 kW × 3 h = 6 kWh'],'W moet eerst naar kW: 2000 W × 3 h = 6000 Wh = 6 kWh.');

// ---------- algebra ----------
X('algebra','Formule invullen','Een formule is een rekenvoorschrift. Invullen betekent: elke letter vervangen door het getal, met de juiste eenheid, en dan uitrekenen in de goede volgorde.',['Schrijf de formule op.','Zet alle gegevens in passende eenheden.','Vervang de letters door de getallen, met haakjes waar nodig.','Reken uit volgens de volgorde van bewerkingen.'],'',['A = ½ b h met b = 6, h = 2,5','A = ½ × 6 × 2,5 = 7,5'],'Zet negatieve getallen tussen haakjes bij invullen.');
X('algebra','Balansmethode','Een vergelijking is een weegschaal in evenwicht. Zolang je links en rechts precies hetzelfde doet, blijft hij in evenwicht. Zo werk je de onbekende vrij.',['Haal eerst losse getallen naar de andere kant (optellen of aftrekken).','Deel daarna door het getal voor x.','Controleer door je antwoord in te vullen.'],'',['3x + 5 = 20','3x = 15 → x = 5','controle: 3 × 5 + 5 = 20 ✓'],'Doe de bewerking op de hele kant, niet op één term.');
X('algebra','Haakjes wegwerken','Het getal voor de haakjes vermenigvuldig je met élke term binnen de haakjes.',['Vermenigvuldig de factor met de eerste term.','Vermenigvuldig met de tweede term (let op het teken).','Tel gelijksoortige termen samen.'],'',['3(2x − 4)','= 6x − 12'],'Een min voor de haakjes verandert alle tekens: −(a − b) = −a + b.');
X('algebra','Formule omwerken (× en ÷)','Wil je een andere grootheid uitrekenen, dan zet je die alleen aan één kant. Wat vermenigvuldigd wordt, ga je delen en omgekeerd.',['Bepaal welke letter je zoekt.','Kijk wat er met die letter gebeurt (× of ÷).','Doe aan beide kanten het omgekeerde.'],'Handig ezelsbruggetje: driehoek F / (p · A).',['p = F / A, gezocht A','A = F / p'],'');
X('algebra','Dubbele haakjes','Elke term uit de eerste haakjes vermenigvuldig je met elke term uit de tweede: vier producten in totaal.',['Eerste × eerste, eerste × tweede.','Tweede × eerste, tweede × tweede.','Tel gelijksoortige termen samen.'],'',['(x + 3)(x + 5)','= x² + 5x + 3x + 15 = x² + 8x + 15'],'');
X('algebra','x aan beide kanten','Breng alle x-termen naar één kant en alle getallen naar de andere kant. Daarna deel je door wat er voor x staat.',['Trek de kleinste x-term aan beide kanten af.','Breng de getallen naar de andere kant.','Deel door het getal voor x.'],'',['5x + 2 = 2x + 14','3x = 12 → x = 4'],'');
X('algebra','Substitutie','Bij twee vergelijkingen met twee onbekenden schrijf je er één om naar "y = …" en vult die in de andere in. Dan houd je één onbekende over.',['Werk één vergelijking om naar y = … (of x = …).','Vul dat in in de andere vergelijking.','Los op naar de overgebleven onbekende.','Vul terug in om de tweede te vinden.'],'',['y = 2x en x + y = 9','x + 2x = 9 → x = 3, y = 6'],'');
X('algebra','Merkwaardige producten','Drie veelvoorkomende patronen die je direct herkent, zodat je niet steeds vier producten hoeft uit te rekenen.',['Herken het patroon: (a + b)², (a − b)² of (a + b)(a − b).','Vul a en b in het patroon in.'],'',['(x − 4)² = x² − 8x + 16','(x + 3)(x − 3) = x² − 9'],'');
X('algebra','Omwerken met kwadraat','Staat de gezochte letter in het kwadraat, dan zet je eerst het kwadraat alleen en neem je daarna de wortel.',['Zet de term met het kwadraat alleen.','Deel door de factor ervoor.','Neem de wortel (alleen de positieve als het een lengte is).'],'',['A = π r², gezocht r','r = √(A / π)'],'');
X('algebra','Eliminatie','Tel of trek twee vergelijkingen zo van elkaar af dat één onbekende wegvalt.',['Vermenigvuldig een vergelijking zodat de x’en (of y’s) gelijk worden.','Trek de vergelijkingen van elkaar af.','Los de overgebleven onbekende op.','Vul terug in.'],'',['2x + y = 10 en x + y = 7','aftrekken: x = 3 → y = 4'],'');

// ---------- lineair ----------
X('lineair','Lineaire formule','Een lineair verband geeft een rechte lijn: elke stap in x geeft dezelfde toename in y. b is waar de lijn begint (bij x = 0), a hoeveel er per stap bijkomt. Denk aan huurkosten met een vast bedrag plus een prijs per dag.',['Lees b af: de waarde bij x = 0 (vaste kosten).','Lees a af: de toename per stap.','Vul x in om y te berekenen.'],'x = {{y − b|a}}',['steiger: € 150 opbouw + € 12 per dag','K = 12d + 150 → 20 dagen: € 390'],'');
X('lineair','Richtingscoëfficiënt','De richtingscoëfficiënt is de helling: hoeveel y verandert per eenheid x. Positief = stijgend, negatief = dalend.',['Kies twee punten op de lijn.','Bereken Δy (verschil in y) en Δx (verschil in x).','Deel Δy door Δx.'],'',['(2, 10) en (6, 22)','a = (22 − 10) / (6 − 2) = 3'],'Trek in dezelfde volgorde af: y₂ − y₁ en x₂ − x₁.');
X('lineair','Afschot','Afschot is een kleine helling zodat water wegloopt, bijvoorbeeld van een plat dak of een riool. Je drukt het uit in procenten of in mm per meter.',['Bepaal het hoogteverschil Δh en de lengte L in dezelfde eenheid.','Deel Δh door L.','× 100% voor procenten.'],'Δh = afschot × L',['dak 8 m, 1,6% afschot','Δh = 0,016 × 8 = 0,128 m = 128 mm'],'');
X('lineair','Optrede','De optrede is de hoogte van één traptrede. Alle optredes samen overbruggen de verdiepingshoogte, dus deel je de hoogte door het aantal optredes.',['Bepaal de verdiepingshoogte (vloer tot vloer) in mm.','Deel door het aantal optredes.'],'n = {{h|o}}',['h = 2800 mm, 15 optredes','2800 ÷ 15 = 186,7 mm'],'Gebruik de afgewerkte vloerhoogte, niet de ruwe betonvloer.');
X('lineair','Startgetal','Ken je de helling en één punt, dan vind je het startgetal door terug te rekenen naar x = 0.',['Bereken eerst a.','Vul één punt in in y = ax + b.','Los b op.'],'',['a = 3, punt (2, 10)','10 = 3 × 2 + b → b = 4'],'');
X('lineair','Afschot omrekenen','Een afschot kun je op drie manieren schrijven: in %, in mm per m en als verhouding 1 : n. Ze betekenen hetzelfde.',['1% = 10 mm per meter.','1 : n naar %: 100 ÷ n.','% naar 1 : n: n = 100 ÷ %.'],'',['riool 1 : 200','100 ÷ 200 = 0,5% = 5 mm per m'],'');
X('lineair','Aantal optredes','Het Bbl staat een optrede van maximaal 188 mm toe. Deel de hoogte door de maximale optrede en rond naar boven af.',['Deel de verdiepingshoogte door de maximale optrede.','Rond altijd naar boven af.','Bereken daarna de werkelijke optrede h / n.'],'',['2650 mm ÷ 188 = 14,1','→ 15 optredes van 176,7 mm'],'Naar beneden afronden geeft treden die te hoog zijn.');
X('lineair','Lineair interpoleren','Staat een waarde niet in een tabel, dan schat je hem tussen twee bekende waarden op een rechte lijn. Handig bij tabellen voor dampspanning of belastingen.',['Zoek de twee tabelwaarden rond jouw x.','Bepaal hoe ver je x tussen die twee ligt (als breuk).','Tel dat deel van het y-verschil op bij y₁.'],'',['bij 10 °C: 1228 Pa, bij 12 °C: 1403 Pa; gezocht 11 °C','1228 + ½ × 175 = 1315,5 Pa'],'');
X('lineair','Snijpunt','Het snijpunt van twee lijnen is het punt waar beide formules dezelfde y geven, bijvoorbeeld waar twee offertes even duur zijn.',['Stel beide formules aan elkaar gelijk.','Los x op.','Vul x in één formule in voor y.'],'',['offerte A: 40x + 200, B: 60x + 80','40x + 200 = 60x + 80 → x = 6'],'');
X('lineair','Stapmaatregel','Een trap loopt prettig als twee optredes plus één aantrede ongeveer gelijk zijn aan de lengte van één stap (ca. 630 mm).',['Bereken eerst de optrede o.','Vul in: a = 630 − 2o.','Controleer: a ≥ 220 mm (Bbl woning).'],'',['o = 180 mm','a = 630 − 360 = 270 mm'],'');
X('lineair','Traplengte','Een trap heeft één trede minder dan optredes: de bovenste optrede komt uit op de verdiepingsvloer.',['Bepaal het aantal optredes n.','Aantal treden = n − 1.','Lengte = treden × aantrede.'],'',['15 optredes, aantrede 250 mm','14 × 250 = 3500 mm'],'');

// ---------- gonio ----------
X('gonio','Sinus','In een rechthoekige driehoek is de sinus van een hoek de overstaande zijde gedeeld door de schuine zijde. Ezelsbruggetje: SOS CAS TOA.',['Zoek de rechte hoek en de hoek α.','Benoem de zijden: overstaand (O), aanliggend (A), schuin (S).','Kies sinus als je O en S hebt of zoekt.','Reken uit; rekenmachine in DEG-stand.'],'O = S · sin α · S = {{O|sin α}}',['spar 5 m, dakhelling 40°','hoogte = 5 × sin 40° = 3,21 m'],'Zet je rekenmachine in graden (DEG), niet RAD.');
X('gonio','Cosinus','De cosinus is aanliggende zijde gedeeld door schuine zijde. Gebruik hem als je de horizontale afstand en de schuine lengte koppelt.',['Benoem A en S ten opzichte van de hoek.','Gebruik cos als je A en S hebt of zoekt.'],'A = S · cos α · S = {{A|cos α}}',['spar 5 m, 40°','horizontaal = 5 × cos 40° = 3,83 m'],'');
X('gonio','Tangens','De tangens is overstaande zijde gedeeld door aanliggende zijde. Die heb je nodig als je geen schuine zijde kent, zoals bij hellingen en dakhoogtes.',['Benoem O en A.','Gebruik tan als de schuine zijde niet meedoet.'],'O = A · tan α · A = {{O|tan α}}',['halve breedte 4 m, 35°','nokhoogte = 4 × tan 35° = 2,80 m'],'');
X('gonio','Hoekensom','De drie hoeken van elke driehoek zijn samen 180°. In een rechthoekige driehoek zijn de twee scherpe hoeken samen dus 90°.',['Tel de bekende hoeken op.','Trek af van 180°.'],'',['dakhelling 38°, rechte hoek 90°','derde hoek = 180 − 90 − 38 = 52°'],'');
X('gonio','Hoek berekenen','Ken je twee zijden, dan vind je de hoek met de inverse functie (sin⁻¹, cos⁻¹, tan⁻¹), op de rekenmachine via SHIFT.',['Kies de functie die bij de bekende zijden past.','Deel de zijden.','Druk SHIFT + sin/cos/tan op de uitkomst.'],'',['hoogte 3 m, halve breedte 4 m','α = tan⁻¹(3/4) = 36,9°'],'');
X('gonio','Nokhoogte','Bij een symmetrisch zadeldak is de nok de top. Met de halve breedte en de dakhelling bereken je hoe hoog de nok boven de muurplaat ligt.',['Neem de halve breedte van het gebouw.','Vermenigvuldig met tan α.'],'α = tan⁻¹({{h|½ b}})',['woning 9 m breed, 45°','h = 4,5 × tan 45° = 4,5 m'],'Gebruik de halve breedte, niet de hele.');
X('gonio','Sparlengte','De spar (of dakvlak) is de schuine zijde. Met de halve breedte als aanliggende zijde gebruik je de cosinus.',['Neem de halve breedte.','Deel door cos α.','Tel eventueel de overstek erbij op.'],'',['halve breedte 4,5 m, 45°','s = 4,5 / cos 45° = 6,36 m'],'');
X('gonio','Sinusregel','Voor driehoeken zonder rechte hoek. Elke zijde gedeeld door de sinus van de hoek ertegenover geeft hetzelfde getal.',['Zoek een zijde met de hoek ertegenover (een bekend paar).','Stel de verhouding op met het gezochte paar.','Los op.'],'',['a = 6, A = 40°, B = 70°','b = 6 × sin 70° / sin 40° = 8,77'],'');
X('gonio','Helling % ↔ graden','Een helling in procent is de tangens × 100. 100% is dus 45°, niet 90°.',['% → graden: α = tan⁻¹(p / 100).','Graden → %: p = tan α × 100.'],'',['oprit 12%','α = tan⁻¹(0,12) = 6,8°'],'');
X('gonio','Cosinusregel','Een uitbreiding van Pythagoras voor elke driehoek. Gebruik hem als je twee zijden en de ingesloten hoek kent, of drie zijden.',['Vul b, c en de ingesloten hoek A in.','Bereken a² en neem de wortel.','Of: werk om naar cos A als je drie zijden kent.'],'cos A = {{b² + c² − a²|2bc}}',['b = 5, c = 7, A = 60°','a² = 25 + 49 − 70 × 0,5 = 39 → a = 6,24'],'');
X('gonio','Kracht ontbinden','Een schuine kracht kun je splitsen in een horizontaal en een verticaal deel. Dat is nodig voor evenwichtsberekeningen.',['Bepaal de hoek met de horizontaal.','Horizontaal deel: F cos α.','Verticaal deel: F sin α.'],'F = √(F_h² + F_v²)',['trekstang 20 kN onder 30°','F_h = 17,3 kN, F_v = 10 kN'],'Kijk goed ten opzichte van welke lijn de hoek gegeven is.');

// ---------- kwadratisch ----------
X('kwadratisch','Wortel trekken','Een vergelijking met alleen x² los je op met de wortel. Er zijn twee oplossingen, want ook een negatief getal in het kwadraat is positief.',['Zet x² alleen.','Neem de wortel.','Noteer + en −; bij lengtes geldt alleen de positieve.'],'',['x² = 49','x = 7 of x = −7'],'');
X('kwadratisch','Nulproduct','Als een product nul is, moet minstens één van de factoren nul zijn. Zo los je een ontbonden vergelijking op.',['Zorg dat er = 0 staat.','Ontbind in factoren.','Stel elke factor gelijk aan 0.'],'',['x(x − 5) = 0','x = 0 of x = 5'],'Werkt alleen met = 0 aan de andere kant.');
X('kwadratisch','Discriminant','De discriminant vertelt vooraf hoeveel oplossingen een kwadratische vergelijking heeft, en is het stuk onder de wortel in de abc-formule.',['Schrijf in de vorm ax² + bx + c = 0.','Lees a, b en c af (met hun tekens).','Bereken b² − 4ac.'],'',['x² − 6x + 5 = 0','D = 36 − 20 = 16'],'Let op: (−6)² = 36, niet −36.');
X('kwadratisch','Top (x)','De top van een parabool ligt precies midden tussen de twee nulpunten. Bij een momentenlijn is dat waar het moment maximaal is.',['Lees a en b af.','Bereken −b / (2a).'],'',['y = −2x² + 12x','x_top = −12 / −4 = 3'],'');
X('kwadratisch','Product-som','Zoek twee getallen die vermenigvuldigd c geven en opgeteld b. Dan kun je de vergelijking ontbinden en met het nulproduct oplossen.',['Schrijf alle factorparen van c op.','Kies het paar met som b.','Schrijf (x + p)(x + q) = 0.'],'',['x² + 7x + 12','3 × 4 = 12 en 3 + 4 = 7 → (x + 3)(x + 4)'],'');
X('kwadratisch','Aantal oplossingen','De discriminant bepaalt hoe vaak de parabool de x-as snijdt.',['Bereken D.','Positief: twee snijpunten. Nul: raakt (één). Negatief: geen.'],'',['x² + 2x + 5: D = 4 − 20 = −16','geen oplossingen'],'');
X('kwadratisch','Top (y)','Ken je de x van de top, dan vul je die in de formule in om de hoogste of laagste waarde te vinden.',['Bereken x_top.','Vul in in de oorspronkelijke formule.'],'',['y = −2x² + 12x, x_top = 3','y = −18 + 36 = 18'],'');
X('kwadratisch','abc-formule','Werkt voor elke kwadratische vergelijking, ook als ontbinden niet lukt.',['Schrijf als ax² + bx + c = 0.','Bereken D = b² − 4ac.','Vul in: x = (−b ± √D) / 2a.','Reken beide oplossingen uit.'],'',['2x² − 3x − 2 = 0, D = 9 + 16 = 25','x = (3 ± 5) / 4 → 2 of −0,5'],'');
X('kwadratisch','Parabool in de bouw','Het buigend moment in een ligger met een gelijkmatige last volgt een parabool. Het maximum ligt in het midden: ⅛ q L².',['Vul q en L in M(x).','Het maximum ligt bij x = L/2.','M_max = ⅛ q L².'],'',['q = 10 kN/m, L = 6 m','M_max = ⅛ × 10 × 36 = 45 kNm'],'L staat in het kwadraat: een twee keer zo lange ligger krijgt vier keer zo veel moment.');

// ---------- mechanica ----------
X('mechanica','Resultante op één lijn','Krachten op dezelfde lijn mag je gewoon optellen (zelfde richting) of aftrekken (tegengesteld). De resultante is de ene kracht die hetzelfde effect heeft.',['Kies een positieve richting.','Tel krachten in die richting op, trek tegengestelde af.','Het teken geeft de richting van de resultante.'],'',['20 kN naar rechts, 8 kN naar links','R = 20 − 8 = 12 kN naar rechts'],'');
X('mechanica','Spanning','Spanning is kracht per oppervlakte in een materiaal. Is de spanning hoger dan het materiaal aankan, dan bezwijkt het. Constructeurs rekenen in N/mm².',['Kracht in N, oppervlak in mm².','Deel kracht door oppervlak.','Vergelijk met de toelaatbare spanning.'],'F = σ · A · A = {{F|σ}}',['kolom 100 × 100 mm, 150 kN','150 000 ÷ 10 000 = 15 N/mm²'],'');
X('mechanica','Moment','Een moment is de draaiende werking van een kracht: kracht maal arm (de loodrechte afstand tot het draaipunt). Een langere arm geeft meer moment, zoals bij een lange moersleutel.',['Kies het draaipunt.','Bepaal de loodrechte afstand van de werklijn tot dat punt.','Vermenigvuldig kracht en arm.'],'F = {{M|a}} · a = {{M|F}}',['balkon: 6 kN op 1,5 m uit de gevel','M = 6 × 1,5 = 9 kNm'],'De arm is de loodrechte afstand, niet een schuine afstand.');
X('mechanica','Totale lijnlast','Een gelijkmatig verdeelde last (kN/m) over een lengte kun je vervangen door één totale kracht in het midden.',['Vermenigvuldig q met de lengte.','Deze totale kracht werkt in het midden van de belaste lengte.'],'',['q = 8 kN/m over 5 m','Q = 40 kN, aangrijpend op 2,5 m'],'');
X('mechanica','Gronddruk strook','Een strokenfundering verdeelt een lijnlast (kN/m) over de breedte van de strook. Bredere strook = lagere gronddruk.',['Bepaal de lijnlast q op de fundering in kN/m.','Deel door de strookbreedte b in m.','Vergelijk met de toelaatbare gronddruk.'],'b = {{q|p_toel}}',['q = 60 kN/m, b = 0,6 m','p = 100 kN/m²'],'');
X('mechanica','Resultante loodrecht','Twee loodrechte krachten tel je op met Pythagoras, net als zijden van een rechthoekige driehoek.',['Kwadrateer beide krachten.','Tel op en neem de wortel.','Hoek: tan α = F_v / F_h.'],'',['F_h = 6 kN, F_v = 8 kN','R = √(36 + 64) = 10 kN'],'');
X('mechanica','Momentevenwicht','Staat iets stil, dan heffen de momenten linksom en rechtsom elkaar op. Zo vind je onbekende krachten, zoals bij een wip of hefboom.',['Kies een draaipunt (het liefst bij een onbekende kracht).','Schrijf alle momenten op met hun draairichting.','Stel som = 0 en los op.'],'',['2 kN op 3 m links; gezocht F op 1,5 m rechts','2 × 3 = F × 1,5 → F = 4 kN'],'');
X('mechanica','Evenwichtsvoorwaarden','Een constructie staat stil als de som van alle horizontale krachten, verticale krachten én momenten nul is. Met deze drie vergelijkingen vind je de oplegreacties.',['Teken alle krachten (vrijlichaamsschema).','ΣM = 0 om één punt → eerste reactie.','ΣF_v = 0 → tweede reactie.','ΣF_h = 0 → horizontale reactie.'],'',['ligger 6 m, puntlast 12 kN op 2 m van A','ΣM_A: R_B × 6 = 12 × 2 → R_B = 4 kN','ΣF_v: R_A = 12 − 4 = 8 kN'],'Kies het momentpunt op een plek met een onbekende kracht: die valt dan weg.');
X('mechanica','Oplegreacties puntlast','Hoe dichter een last bij een oplegging staat, hoe meer die oplegging draagt. Dat volgt direct uit momentevenwicht.',['Neem momenten om A: R_B × L = F × a.','Los R_B op.','R_A = F − R_B.'],'',['F = 30 kN op a = 4 m, L = 6 m','R_B = 20 kN, R_A = 10 kN'],'a is de afstand vanaf A, niet vanaf B.');
X('mechanica','Vlaklast → lijnlast','Een vloer met een belasting in kN/m² draagt af op balken. Elke balk krijgt de strook vloer zo breed als de h.o.h.-afstand.',['Bepaal de vloerbelasting p in kN/m².','Bepaal de h.o.h.-afstand van de balken.','Vermenigvuldig.'],'',['p = 4 kN/m², h.o.h. 0,6 m','q = 2,4 kN/m per balk'],'');
X('mechanica','Gronddruk poer','Een poer verdeelt een puntlast van een kolom over een vierkant of rechthoekig oppervlak.',['Bepaal de kolomkracht F.','Bereken het poeroppervlak a × b.','Deel F door het oppervlak.'],'a = √({{F|p_toel}}) bij een vierkante poer',['F = 400 kN, poer 2 × 2 m','p = 400 / 4 = 100 kN/m²'],'');
X('mechanica','Maximaal moment','Voor een ligger op twee steunpunten zijn dit de twee standaardgevallen. Het moment bepaalt hoe zwaar het profiel moet zijn.',['Bepaal het belastinggeval: gelijkmatig (q) of puntlast in het midden (F).','Vul in de juiste formule in.','Eenheid: kNm.'],'',['q = 12 kN/m, L = 5 m','M = ⅛ × 12 × 25 = 37,5 kNm'],'L in het kwadraat bij q-last, niet bij de puntlast.');
X('mechanica','Benodigd oppervlak','Draai de spanningsformule om: hoeveel oppervlak heb je nodig zodat de spanning niet te hoog wordt?',['Bepaal de kracht F.','Zoek de toelaatbare spanning of gronddruk.','Deel F door die toelaatbare waarde.'],'',['F = 600 kN, p_toel = 150 kN/m²','A = 4 m² → poer 2 × 2 m'],'');
X('mechanica','q-last + puntlast','Bij meerdere belastingen tel je de bijdragen van elke last aan een oplegreactie op (superpositie).',['Bereken R_A door de q-last: ½ q L.','Bereken R_A door de puntlast: F × (L − a) / L.','Tel ze op.','R_B = totale last − R_A.'],'',['q = 5 kN/m, L = 6 m, F = 12 kN op a = 2 m','R_A = 15 + 12 × 4 / 6 = 23 kN'],'');

// ---------- installaties ----------
X('installaties','Wet van Ohm','De spanning (U) duwt stroom (I) door een weerstand (R). Meer weerstand bij dezelfde spanning betekent minder stroom.',['Bepaal welke twee grootheden je kent.','Werk om naar de gezochte.','Eenheden: volt, ampère, ohm.'],'I = {{U|R}} · R = {{U|I}}',['230 V over 46 Ω','I = 230 / 46 = 5 A'],'');
X('installaties','Elektrisch vermogen','Vermogen is spanning maal stroom. Het typeplaatje van een apparaat geeft het vermogen; daaruit volgt hoeveel stroom het trekt.',['Neem de netspanning (230 V).','Vermenigvuldig met de stroom.'],'I = {{P|U}}',['16 A groep op 230 V','P = 3680 W ≈ 3,7 kW max'],'');
X('installaties','Elektrische energie','Energie is vermogen maal tijd. In kW en uren krijg je kWh, de eenheid op de energierekening.',['Vermogen in kW.','Tijd in uren.','Vermenigvuldig.'],'t = {{E|P}}',['warmtepomp 1,5 kW, 1200 h per jaar','E = 1800 kWh'],'');
X('installaties','Debiet','Debiet is volume per tijd, bijvoorbeeld liter water per seconde of m³ lucht per uur.',['Bepaal het volume.','Bepaal de tijd.','Deel volume door tijd.'],'',['douche: 9 L per minuut','0,15 L/s'],'');
X('installaties','Stroom uit vermogen','Hoeveel ampère trekt een apparaat? Deel het vermogen door de spanning. Zo controleer je of een groep niet overbelast raakt.',['Vermogen in W.','Deel door 230 V.','Vergelijk met de groepsbeveiliging (16 A).'],'',['kookplaat 7400 W op 2 × 230 V','per groep 3700 / 230 = 16 A'],'');
X('installaties','Energiekosten','Kosten zijn energiegebruik maal de prijs per kWh (of per m³ gas).',['Bereken het verbruik in kWh.','Vermenigvuldig met het tarief.'],'',['1800 kWh × € 0,30','€ 540 per jaar'],'');
X('installaties','Debiet in een leiding','Het debiet is het doorstroomoppervlak maal de snelheid. Bij hetzelfde debiet en een dunnere leiding stroomt het water sneller (en maakt het meer geluid).',['Bereken het binnenoppervlak A = ¼ π d² in m².','Vermenigvuldig met de snelheid in m/s.','Uitkomst in m³/s; × 1000 voor L/s.'],'v = {{Q|A}}',['d = 20 mm, v = 1,5 m/s','A = 0,000314 m² → Q = 0,47 L/s'],'Diameter in meter: 20 mm = 0,02 m.');
X('installaties','Serie en parallel','In serie tellen weerstanden op. Parallel wordt de totale weerstand kleiner dan de kleinste: de stroom heeft meer wegen.',['Serie: tel op.','Parallel: tel de omgekeerden op en neem het omgekeerde van de uitkomst.'],'Twee gelijke parallel: R / 2',['30 Ω en 60 Ω parallel','1/R = 1/30 + 1/60 = 1/20 → R = 20 Ω'],'');
X('installaties','Groepsbelasting','Op één groep van 16 A mag maximaal ongeveer 3,7 kW tegelijk. Tel de vermogens op en controleer de stroom.',['Tel alle vermogens op die tegelijk aan kunnen staan.','Deel door 230 V.','Moet ≤ 16 A zijn.'],'',['oven 2500 W + magnetron 1200 W','3700 / 230 = 16,1 A → net te veel'],'Zware apparaten krijgen daarom een eigen groep.');
X('installaties','COP warmtepomp','Een warmtepomp haalt warmte uit lucht of bodem. Per kWh stroom levert hij 3 tot 5 kWh warmte: dat is de COP.',['Bepaal de benodigde warmte in kWh.','Deel door de COP.','Uitkomst = elektriciteitsverbruik.'],'Q_warmte = COP × E_elektrisch',['8000 kWh warmte, COP 4','2000 kWh stroom'],'');
X('installaties','Leidingdiameter','Ken je het debiet en een gewenste snelheid, dan reken je de benodigde diameter uit.',['Q in m³/s, v in m/s.','Vul in: d = √(4Q / πv).','Kies de eerstvolgende grotere handelsmaat.'],'',['Q = 0,5 L/s = 0,0005 m³/s, v = 1,5','d = √(0,002 / 4,71) = 0,0206 m → 22 mm'],'');

// ---------- bouwfysica ----------
X('bouwfysica','Warmteweerstand laag','Hoe dikker een laag en hoe slechter het materiaal geleidt (lage λ), hoe beter hij isoleert. De R-waarde zegt hoeveel weerstand één laag biedt.',['Zet de dikte om naar meter.','Deel door λ (W/mK).','Uitkomst in m²K/W.'],'d = R · λ · λ = {{d|R}}',['PIR 100 mm, λ = 0,022','R = 0,1 / 0,022 = 4,55 m²K/W'],'');
X('bouwfysica','Rc-waarde','De Rc is de totale warmteweerstand van een constructie zonder de overgangsweerstanden. Lagen achter elkaar tellen op.',['Bereken de R van elke laag (d / λ).','Tel ze op.','Luchtspouw en folies kun je vaak verwaarlozen of een vaste R geven.'],'',['metselwerk 0,13 + isolatie 4,55 + kalkzandsteen 0,1','Rc = 4,78 m²K/W ≥ 4,7 ✓'],'');
X('bouwfysica','U-waarde','De U-waarde is het omgekeerde van de totale weerstand: hoeveel watt er per m² per graad verschil doorheen gaat. Lager is beter.',['Bereken R_T = R_si + R_c + R_se.','Neem het omgekeerde: U = 1 / R_T.'],'R_T = {{1|U}}',['R_T = 5','U = 0,2 W/m²K'],'');
X('bouwfysica','Temperatuurverschil','Warmte stroomt van warm naar koud. Het temperatuurverschil tussen binnen en buiten bepaalt hoe hard.',['Neem de binnentemperatuur (vaak 20 °C).','Trek de buitentemperatuur af (rekenwaarde vaak −10 °C).'],'',['binnen 20 °C, buiten −10 °C','ΔT = 30 K'],'Met negatieve buitentemperaturen: 20 − (−10) = 30.');
X('bouwfysica','Totale weerstand','Bij de oppervlakken van een constructie zit een dun luchtlaagje dat ook een beetje isoleert: de overgangsweerstanden R_si (binnen, 0,13) en R_se (buiten, 0,04).',['Neem R_si = 0,13 en R_se = 0,04 (wand).','Tel ze op bij de Rc.'],'',['Rc = 4,7','R_T = 0,13 + 4,7 + 0,04 = 4,87'],'');
X('bouwfysica','Benodigde dikte','Om een R-waarde te halen heb je bij een isolatiemateriaal een bepaalde dikte nodig.',['Bepaal de R die de laag moet leveren.','Vermenigvuldig met λ.','Rond af naar boven op een handelsdikte.'],'',['R = 4,5, minerale wol λ = 0,035','d = 0,158 m → 160 mm'],'');
X('bouwfysica','Warmtestroom','Hoeveel watt er door een wand of raam weglekt: U-waarde × oppervlak × temperatuurverschil.',['Bepaal U, A en ΔT.','Vermenigvuldig.','Uitkomst in watt.'],'',['raam U = 1,1, 3 m², ΔT = 30','Φ = 99 W'],'');
X('bouwfysica','Eisen nieuwbouw','Het Bbl stelt minimale Rc-eisen aan de schil van nieuwbouw. Daarmee bepaal je de minimale isolatiedikte.',['Kijk welk bouwdeel je hebt (gevel, vloer, dak).','Neem de Rc-eis.','Reken de benodigde isolatiedikte uit.'],'',['dak Rc ≥ 6,3 met PIR λ = 0,022','d ≈ 6,3 × 0,022 = 0,139 m → 140 mm'],'Dit zijn minimumeisen; voor BENG is vaak meer nodig.');
X('bouwfysica','Isolatie voor een eis','Trek de weerstand van de andere lagen af van de eis: wat overblijft moet de isolatie leveren.',['Tel de R van alle andere lagen op.','Trek af van de Rc-eis.','Vermenigvuldig met λ van de isolatie.'],'',['eis 4,7, overige lagen 0,25, λ = 0,035','d = (4,7 − 0,25) × 0,035 = 0,156 m'],'');
X('bouwfysica','Warmtestroomdichtheid','Warmtestroom per m²: hoeveel watt per vierkante meter er doorheen gaat.',['Vermenigvuldig U met ΔT.','Uitkomst in W/m².'],'',['U = 0,21, ΔT = 30','q = 6,3 W/m²'],'');
X('bouwfysica','Oppervlaktetemperatuur','Hoe warm het binnenoppervlak van een wand is. Een koud oppervlak (bij slechte isolatie of een koudebrug) geeft kans op condens en schimmel.',['Bereken R_T.','Bereken het temperatuurverschil Ti − Te.','Trek R_si / R_T × ΔT af van Ti.'],'',['R_T = 0,5 (slecht), Ti 20, Te 0','θ = 20 − 0,13/0,5 × 20 = 14,8 °C'],'');
X('bouwfysica','Energie per periode','Warmtestroom (W) maal tijd geeft energie. In kW en uren: kWh.',['Zet Φ om naar kW.','Vermenigvuldig met het aantal uren.'],'',['Φ = 500 W gedurende 2000 uur','E = 0,5 × 2000 = 1000 kWh'],'');

// ---------- geluid ----------
X('geluid','Twee gelijke bronnen','Decibellen tel je niet gewoon op. Twee even luide bronnen geven samen 3 dB meer, omdat de geluidsenergie verdubbelt.',['Controleer dat de bronnen even luid zijn.','Tel 3 dB op bij het niveau van één bron.'],'',['twee machines van 80 dB','samen 83 dB'],'Niet 160 dB!');
X('geluid','Puntbron en afstand','Geluid van een puntbron verspreidt zich over een steeds groter boloppervlak. Bij elke verdubbeling van de afstand daalt het niveau met 6 dB.',['Tel hoeveel keer de afstand verdubbelt.','Trek per verdubbeling 6 dB af.'],'',['85 dB op 5 m','op 20 m (2× verdubbeld): 85 − 12 = 73 dB'],'');
X('geluid','Relatieve vochtigheid','Lucht kan bij een bepaalde temperatuur maar een maximale hoeveelheid waterdamp bevatten. De RV is hoeveel procent van dat maximum er in zit.',['Bepaal de dampspanning p_w.','Zoek p_sat op bij de temperatuur.','Deel en × 100%.'],'p_w = RV × p_sat',['p_w = 1170 Pa, bij 20 °C p_sat = 2337 Pa','RV = 50%'],'');
X('geluid','Dauwpunt','Koelt lucht af, dan stijgt de RV tot 100%: dat is het dauwpunt. Kouder oppervlak dan het dauwpunt → condens.',['Bereken p_w van de binnenlucht.','Zoek in de tabel bij welke temperatuur p_sat gelijk is aan p_w.'],'',['20 °C, RV 60% → p_w = 1402 Pa','p_sat = 1402 bij ca. 12 °C → dauwpunt 12 °C'],'');
X('geluid','n gelijke bronnen','Bij n even luide bronnen tel je 10 · log(n) dB op. Twee bronnen: +3, tien bronnen: +10.',['Bereken 10 × log(n).','Tel op bij het niveau van één bron.'],'',['4 ventilatoren van 60 dB','60 + 10 log 4 = 66 dB'],'');
X('geluid','Puntbron (algemeen)','Algemene versie van −6 dB per verdubbeling: werkt voor elke afstandsverhouding.',['Bereken de verhouding r₂ / r₁.','Neem 20 × log daarvan.','Trek af van L₁.'],'',['L₁ = 90 dB op 2 m, gezocht op 30 m','L₂ = 90 − 20 log 15 = 66,5 dB'],'');
X('geluid','Dampdruk','De dampdruk is de hoeveelheid waterdamp in de lucht, uitgedrukt als druk.',['Zoek p_sat bij de temperatuur.','Vermenigvuldig met RV (als decimaal).'],'',['20 °C (2337 Pa), RV 55%','p_w = 1285 Pa'],'');
X('geluid','Ongelijke bronnen','Bij bronnen met verschillende niveaus zet je elk niveau terug om naar energie, telt die op en zet terug naar dB.',['Bereken 10^(L/10) voor elke bron.','Tel op.','Neem 10 × log van de som.'],'',['80 dB en 85 dB','10 log(10⁸ + 10^8,5) = 86,2 dB'],'Een bron die 10 dB zachter is, telt nauwelijks mee.');
X('geluid','Lijnbron','Een drukke weg of trein gedraagt zich als een lijnbron. Het geluid verspreidt zich als een cilinder: −3 dB per verdubbeling van de afstand.',['Bereken r₂ / r₁.','Neem 10 × log daarvan.','Trek af van L₁.'],'',['weg 70 dB op 10 m, gezocht op 40 m','70 − 10 log 4 = 64 dB'],'');
X('geluid','Condensatie-check','Condens ontstaat als een oppervlak kouder is dan het dauwpunt van de lucht ertegenaan.',['Bereken het dauwpunt van de binnenlucht.','Bereken de oppervlaktetemperatuur.','Vergelijk: oppervlak < dauwpunt → condens.'],'',['dauwpunt 12 °C, raamoppervlak 9 °C','9 < 12 → condens op het raam'],'Meer ventileren verlaagt het dauwpunt; beter isoleren verhoogt de oppervlaktetemperatuur.');

// ---------- economie ----------
X('economie','Prijs per m²','Een kengetal per m² maakt projecten van verschillende grootte vergelijkbaar.',['Neem de totale kosten.','Deel door het oppervlak (BVO of GO, zeg welke).'],'K = p × A',['€ 320.000 voor 125 m² BVO','€ 2.560 per m²'],'Vergelijk alleen prijzen per m² met dezelfde oppervlaktemaat.');
X('economie','Opslag','Op de directe kosten komen opslagen voor bijvoorbeeld algemene kosten, winst en risico. Je vermenigvuldigt met een factor.',['Zet het opslagpercentage om naar een factor (8% → 1,08).','Vermenigvuldig.'],'',['directe kosten € 100.000, AK 8%','€ 108.000'],'');
X('economie','Enkelvoudige rente','Bij enkelvoudige rente krijg je elk jaar rente over het oorspronkelijke bedrag, niet over de rente.',['Rente per jaar = K × p / 100.','Vermenigvuldig met het aantal jaren.'],'',['€ 10.000 tegen 4% voor 3 jaar','R = 10 000 × 0,04 × 3 = € 1.200'],'');
X('economie','Lineaire afschrijving','Een machine wordt elk jaar evenveel minder waard. Je verdeelt aanschafwaarde min restwaarde over de levensduur.',['Trek de restwaarde af van de aanschafwaarde.','Deel door het aantal jaren.'],'',['graafmachine € 120.000, rest € 20.000, 10 jaar','€ 10.000 per jaar'],'');
X('economie','Raming met kengetal','In een vroege fase raam je de kosten met een prijs per m² uit eerdere projecten, plus een post onvoorzien.',['Neem het oppervlak.','Vermenigvuldig met het kengetal.','Tel onvoorzien op (bijv. 10% → × 1,10).'],'',['140 m² × € 2.400 × 1,10','€ 369.600'],'');
X('economie','Gestapelde opslagen','Opslagen worden achter elkaar toegepast: elke opslag komt over het bedrag inclusief de vorige. Daarom vermenigvuldig je de factoren.',['Begin bij de directe kosten.','Vermenigvuldig met (1 + AK).','Dan met (1 + W&R).','Tot slot × 1,21 voor btw.'],'',['DK € 200.000, AK 7%, W&R 5%','200 000 × 1,07 × 1,05 × 1,21 = € 271.887'],'Niet de percentages optellen (7 + 5 + 21 = 33%): dat geeft een te laag bedrag.');
X('economie','Samengestelde rente','Rente op rente: elk jaar groeit het bedrag met dezelfde factor. Over langere tijd scheelt dat veel ten opzichte van enkelvoudige rente.',['Groeifactor g = 1 + p / 100.','Verhef tot de macht n (aantal jaren).','Vermenigvuldig met het beginbedrag.'],'',['€ 10.000, 4%, 10 jaar','10 000 × 1,04¹⁰ = € 14.802'],'');
X('economie','Boekwaarde','De boekwaarde is wat een bezit volgens de boekhouding nog waard is na k jaar afschrijven.',['Bereken de jaarlijkse afschrijving a.','Vermenigvuldig met het aantal verstreken jaren k.','Trek af van de aanschafwaarde.'],'',['A = € 120.000, a = € 10.000, na 4 jaar','Bk = € 80.000'],'');
X('economie','GO/BVO','De gebruiksoppervlakte (GO) is kleiner dan het bruto vloeroppervlak (BVO), omdat muren, schachten en constructie ruimte innemen. De verhouding is een maat voor efficiënt ontwerpen.',['Bepaal het BVO (buitenwerks gemeten).','Vermenigvuldig met de factor f (ca. 0,8).'],'f = {{GO|BVO}}',['BVO 150 m², f = 0,8','GO = 120 m²'],'');
X('economie','Contante waarde','Geld nu is meer waard dan hetzelfde bedrag later. De contante waarde rekent een toekomstig bedrag terug naar vandaag.',['Bepaal het toekomstige bedrag K_n.','Deel door (1 + p/100)ⁿ.'],'',['€ 15.000 over 10 jaar, 4%','15 000 / 1,04¹⁰ = € 10.134'],'');
X('economie','Degressieve afschrijving','Elk jaar schrijf je een vast percentage af van de boekwaarde. In het begin is de afschrijving groot, later klein.',['Factor = 1 − p / 100.','Verhef tot de macht k.','Vermenigvuldig met de aanschafwaarde.'],'',['€ 50.000, 20% per jaar, na 3 jaar','50 000 × 0,8³ = € 25.600'],'');
X('economie','Kapitaalkosten per uur','Om een machine te verhuren of in te calculeren reken je de vaste kosten per jaar om naar kosten per draaiuur.',['Tel de jaarlijkse afschrijving en rente op.','Deel door het aantal draaiuren per jaar.'],'',['afschrijving € 10.000 + rente € 3.000, 1300 uur','€ 10 per uur'],'');

// ---------- schatten ----------
X('schatten','Afronden en schatten','Rond elk getal af op één of twee significante cijfers en reken dat uit je hoofd. Je krijgt de orde van grootte, en daarmee vang je komma- en eenheidsfouten.',['Rond elk getal af op een makkelijk getal.','Reken de afgeronde som uit je hoofd.','Vergelijk met je precieze uitkomst.'],'',['4,8 m × 3,9 m × 2,6 m','≈ 5 × 4 × 2,5 = 50 m³ (precies 48,7) ✓'],'Rond niet alles dezelfde kant op af als het om veel factoren gaat; compenseer.');
X('schatten','Controle met de factor','Deel je uitkomst door je schatting. Ligt dat rond 1, dan is het goed. Is het rond 10, 100 of 0,001, dan zit er een komma- of eenheidsfout in.',['Maak een schatting.','Deel je antwoord door de schatting.','Factor ≈ 1: in orde. Factor 10ⁿ: zoek de eenheidsfout.'],'',['berekend 4870 m³, geschat 50 m³','factor ≈ 100 → waarschijnlijk cm in plaats van m gebruikt'],'');

// ---------- statistiek ----------
X('statistiek','Gemiddelde','Het gemiddelde is de som van alle meetwaarden gedeeld door het aantal. Het is de bekendste centrummaat, maar gevoelig voor uitschieters.',['Tel alle waarden op (Σx).','Tel het aantal waarden (n).','Deel Σx door n.'],'Σx = x̄ · n',['kubussterktes 36, 39, 41, 38, 36 N/mm²','Σx = 190, n = 5 → x̄ = 38 N/mm²'],'');
X('statistiek','Mediaan','Zet de waarden op volgorde en neem de middelste. Bij een even aantal neem je het gemiddelde van de twee middelste. Eén extreme meting verandert de mediaan nauwelijks.',['Sorteer de waarden van klein naar groot.','Oneven aantal: neem de middelste.','Even aantal: gemiddelde van de middelste twee.'],'',['31, 33, 34, 36, 40, 52','(34 + 36) / 2 = 35'],'');
X('statistiek','Spreidingsbreedte','Het verschil tussen de grootste en de kleinste waarde. Snel te bepalen, maar het zegt alleen iets over de twee uitersten.',['Zoek de grootste waarde.','Zoek de kleinste waarde.','Trek af.'],'',['36, 39, 41, 38, 36','R = 41 − 36 = 5 N/mm²'],'Eén uitschieter maakt R meteen groot.');
X('statistiek','Standaardafwijking','De standaardafwijking is de gemiddelde afstand van de metingen tot het gemiddelde. Kleine s = constante kwaliteit, grote s = veel variatie.',['Bereken het gemiddelde x̄.','Bereken voor elke waarde (x − x̄)².','Tel die kwadraten op.','Deel door n − 1 en neem de wortel.'],'Op de rekenmachine: statistiekmodus, σ_{n−1} of s_x.',['36, 39, 41, 38, 36, x̄ = 38','kwadraten: 4, 1, 9, 0, 4 → som 18','s = √(18 / 4) = 2,12 N/mm²'],'Deel door n − 1 (steekproef), niet door n.');
X('statistiek','Karakteristieke waarde','Constructeurs rekenen niet met de gemiddelde sterkte maar met een waarde waar maar 5% van de proeven onder zit. Bij een normale verdeling ligt die 1,64 standaardafwijking onder het gemiddelde.',['Bereken het gemiddelde f_m.','Bereken de standaardafwijking s.','f_k = f_m − 1,64 × s.','Vergelijk met de gevraagde klasse (C30/37 → 37 N/mm² op kubus).'],'f_m = f_k + 1,64 · s (benodigde gemiddelde sterkte)',['f_m = 38, s = 2,12','f_k = 38 − 3,48 = 34,5 N/mm²'],'');

// ---------- explog ----------
X('explog','Exponentiële groei','Bij exponentiële groei neemt een hoeveelheid elke periode met hetzelfde percentage toe. Daardoor gaat het steeds harder: denk aan bouwkosten met jaarlijkse prijsstijging.',['Bepaal de beginwaarde N₀.','Bepaal de groeifactor g = 1 + p/100 per periode.','Vul de tijd t in en reken N₀ × g^t.'],'N₀ = {{N|g^t}}',['bouwkosten € 2.400/m², 3% per jaar, over 5 jaar','2400 × 1,03⁵ = € 2.782/m²'],'Tijd en groeifactor moeten bij dezelfde periode horen (per jaar, per maand).');
X('explog','Logaritme','Een logaritme beantwoordt de vraag: tot welke macht moet ik het grondtal verheffen om dit getal te krijgen? log 1000 = 3 omdat 10³ = 1000.',['Herken het grondtal (zonder grondtal: 10).','Vraag je af: grondtal tot de macht ? = getal.','Of reken met de rekenmachine: log of ln.'],'',['log₂ 32 = ?','2⁵ = 32 → 5'],'');
X('explog','Rekenregels log','Logaritmen maken van vermenigvuldigen optellen en van machten vermenigvuldigen. Daarom worden decibellen opgeteld met logaritmen.',['Product in de log → logs optellen.','Quotiënt → logs aftrekken.','Macht → exponent naar voren halen.'],'log({{a|b}}) = log a − log b',['log 200 = log 2 + log 100','= 0,301 + 2 = 2,301'],'log(a + b) is níet log a + log b.');
X('explog','Halvering','Bij exponentiële afname met een vaste halveringstijd T halveert de hoeveelheid elke T tijd.',['Bepaal hoeveel halveringstijden er verstreken zijn: t / T.','Reken 0,5^(t/T).','Vermenigvuldig met de beginwaarde.'],'',['N₀ = 800, T = 5 jaar, na 15 jaar','800 × 0,5³ = 100'],'');
X('explog','Exponent oplossen','Staat de onbekende in de exponent, dan haal je hem eruit met een logaritme.',['Zet de macht alleen: g^x = c.','Neem aan beide kanten de log.','x = log c / log g.'],'',['wanneer verdubbelt een bedrag bij 4%?','1,04ˣ = 2 → x = log 2 / log 1,04 = 17,7 jaar'],'');

// ---------- afgeleide ----------
X('afgeleide','Machtsregel','Met de afgeleide bereken je de helling van een grafiek. Voor een macht: de exponent gaat ervoor als factor, en de exponent wordt één kleiner.',['Neem elke term apart.','Vermenigvuldig de coëfficiënt met de exponent.','Verlaag de exponent met 1.','Constanten vallen weg.'],'',['f(x) = 4x³ − 2x + 7','f′(x) = 12x² − 2'],'Een losse constante (+7) wordt 0, niet 7.');
X('afgeleide','Helling in een punt','De afgeleide geeft de helling op elk punt. Vul je een x in, dan weet je hoe steil de grafiek daar loopt.',['Bereken de afgeleide f′(x).','Vul x₀ in.','Positief = stijgend, negatief = dalend, 0 = top.'],'',['f(x) = x² − 6x, f′(x) = 2x − 6','f′(5) = 4 → stijgend met helling 4'],'');
X('afgeleide','Maximum of minimum','In een top loopt de grafiek even horizontaal: de helling is 0. Zo vind je waar een moment, oppervlak of opbrengst maximaal is.',['Bereken f′(x).','Stel f′(x) = 0 en los x op.','Vul x in f(x) in voor de topwaarde.'],'',['M(x) = 5(6x − x²), M′(x) = 5(6 − 2x)','M′ = 0 → x = 3 m → M = 45 kNm'],'');

// ---------- warmte ----------
X('warmte','Kelvin','De kelvinschaal begint bij het absolute nulpunt (−273 °C). Een temperatuurverschil is in K en °C precies gelijk; daarom staat ΔT vaak in K.',['°C → K: tel 273 op.','K → °C: trek 273 af.','Een verschil (ΔT) hoef je niet om te rekenen.'],'',['20 °C','20 + 273 = 293 K'],'');
X('warmte','Lineaire uitzetting','Materialen worden langer als ze warmer worden. Hoeveel hangt af van het materiaal (α), de lengte en het temperatuurverschil. Daarom krijgen lange gevels, goten en vloeren dilatatievoegen.',['Zoek α van het materiaal op.','Zet de lengte in mm (dan komt ΔL in mm).','Vermenigvuldig α × L × ΔT.'],'L = {{ΔL|α · ΔT}} (maximale lengte bij een toelaatbare beweging)',['aluminium goot 12 m, ΔT = 50 K, α = 23 × 10⁻⁶','ΔL = 23 × 10⁻⁶ × 12 000 × 50 = 13,8 mm'],'α is erg klein (×10⁻⁶): vergeet die macht niet.');
X('warmte','Warmte','Om iets op te warmen heb je energie nodig: massa × soortelijke warmte × temperatuurstijging. Water heeft een hoge c en kan dus veel warmte opslaan.',['Massa in kg.','c in J/(kg·K) opzoeken (water 4180).','ΔT in K.','Vermenigvuldig; deel door 3,6 × 10⁶ voor kWh.'],'ΔT = {{Q|m · c}}',['boiler 150 L van 10 naar 60 °C','150 × 4180 × 50 = 31,4 MJ = 8,7 kWh'],'');

// ---------- sterkte ----------
X('sterkte','Weerstandsmoment','Het weerstandsmoment W zegt hoe sterk een doorsnede is tegen buigen. De hoogte telt in het kwadraat: een balk op zijn kant is veel sterker dan plat.',['Zet b en h in mm.','Bereken b × h² / 6.','Uitkomst in mm³.'],'',['houten balk 75 × 200 mm','W = 75 × 200² / 6 = 500 000 mm³'],'Wissel b en h niet om: h is de hoogte in de richting van de belasting.');
X('sterkte','Traagheidsmoment','Het traagheidsmoment I bepaalt de stijfheid: hoeveel een balk doorbuigt. De hoogte telt hier zelfs tot de derde macht.',['Zet b en h in mm.','Bereken b × h³ / 12.','Uitkomst in mm⁴.'],'W = {{I|½ h}}',['75 × 200 mm','I = 75 × 200³ / 12 = 50 × 10⁶ mm⁴'],'');
X('sterkte','Buigspanning','Bij buigen ontstaat in de onder- en bovenkant van een balk spanning. Die mag niet groter worden dan wat het materiaal aankan.',['Bereken het maximale moment M in kNm.','Reken om naar Nmm: × 10⁶.','Deel door W in mm³.','Vergelijk met de toelaatbare spanning.'],'M = σ · W · W = {{M|σ}}',['M = 6 kNm, W = 500 000 mm³','σ = 6 × 10⁶ / 500 000 = 12 N/mm²'],'');
X('sterkte','Benodigde hoogte','Omgekeerd rekenen: welke balkhoogte heb je minimaal nodig?',['Bereken M en zet om naar Nmm.','W = M / σ_toel.','Kies een breedte b.','h = √(6W / b), rond af naar boven op een handelsmaat.'],'',['M = 9 kNm, σ_toel = 12, b = 75','W = 750 000 → h = √(60 000) = 245 mm → 250 mm'],'');

// ---------- lichtlucht ----------
X('lichtlucht','Verlichtingssterkte','Hoeveel licht er op een oppervlak valt, in lux. Een lamp geeft een lichtstroom in lumen; verdeeld over een oppervlak geeft dat de verlichtingssterkte.',['Bepaal de totale lichtstroom Φ in lumen.','Bepaal het oppervlak in m².','Deel Φ door A.'],'Φ = E · A (benodigde lichtstroom)',['kantoor 20 m², 500 lux nodig','Φ = 10 000 lm'],'In de praktijk komt niet al het licht op het werkvlak: reken met een rendement.');
X('lichtlucht','Daglichtfactor','De daglichtfactor vergelijkt het licht binnen met het licht buiten bij bewolkte hemel. Hij hangt af van raamgrootte, positie en belemmeringen, niet van het weer.',['Meet of bereken E binnen.','Meet E buiten (onbelemmerd).','Deel en × 100%.'],'',['binnen 300 lux, buiten 10 000 lux','DF = 3%'],'');
X('lichtlucht','Debiet omrekenen','Ventilatie-eisen in het Bbl staan in dm³/s; installateurs werken in m³/h. Eén dm³/s is 3,6 m³/h.',['dm³/s → m³/h: × 3,6.','m³/h → dm³/s: ÷ 3,6.'],'',['21 dm³/s','21 × 3,6 = 75,6 m³/h'],'');
X('lichtlucht','Kwadratenwet','Bij een puntvormige lamp neemt de verlichtingssterkte af met het kwadraat van de afstand: twee keer zo ver = een kwart van het licht.',['Bepaal de lichtsterkte I in candela.','Bepaal de afstand r in meter.','Deel I door r².'],'I = E · r²',['lamp 800 cd op 2 m','E = 800 / 4 = 200 lux'],'');
X('lichtlucht','Ventilatievoud','Het ventilatievoud zegt hoe vaak per uur de lucht in een ruimte volledig wordt ververst.',['Zet het debiet om naar m³/h.','Bereken het volume van de ruimte in m³.','Deel debiet door volume.'],'q = n · V',['slaapkamer 12 m² × 2,6 m = 31,2 m³, 25 m³/h','n = 0,8 per uur'],'');

// ---------- calculatie ----------
X('calculatie','Post','Een begroting bestaat uit posten. Elke post is een hoeveelheid uit de tekening maal een prijs per eenheid.',['Bepaal de eenheid (m¹, m², m³, st).','Meet de hoeveelheid uit de tekening.','Vermenigvuldig met de eenheidsprijs.'],'',['metselwerk 85 m² × € 95/m²','€ 8.075'],'Hoeveelheid en prijs moeten dezelfde eenheid hebben.');
X('calculatie','Arbeid','Met een normtijd (uren per eenheid) reken je hoeveel arbeidsuren een post kost.',['Neem de hoeveelheid.','Vermenigvuldig met de normtijd.'],'',['85 m² × 0,8 u/m²','68 uur'],'');
X('calculatie','Arbeidskosten','Arbeidsuren maal het uurloon (inclusief sociale lasten) geeft de arbeidskosten.',['Bereken de uren.','Vermenigvuldig met het uurloon.'],'',['68 u × € 55','€ 3.740'],'');
X('calculatie','BAR','Het bruto aanvangsrendement zegt hoeveel procent van de investering je het eerste jaar terugkrijgt aan huur. Snel, maar zonder kosten en leegstand.',['Neem de jaarhuur.','Deel door de investering.','× 100%.'],'',['huur € 14.400/jaar, investering € 300.000','BAR = 4,8%'],'');
X('calculatie','Doorlooptijd','Van uren naar kalenderdagen: deel door het aantal mensen en de uren per dag.',['Bereken de totale uren.','Deel door (mensen × uren per dag).','Rond naar boven af op hele dagen.'],'',['68 u, 2 man, 8 u/dag','68 / 16 = 4,25 → 5 dagen'],'');
X('calculatie','Terugverdientijd','Na hoeveel jaar is een investering terugverdiend met de jaarlijkse besparing? Eenvoudig, zonder rente en prijsstijgingen.',['Bepaal de investering.','Bepaal de besparing per jaar.','Deel.'],'',['zonnepanelen € 5.000, besparing € 625/jaar','8 jaar'],'');

// ---------- tekeningen ----------
X('tekeningen','Peilmaat','Hoogtes op tekening staan ten opzichte van peil (P = 0, meestal bovenkant afgewerkte begane grondvloer), in meters met drie decimalen.',['Lees het teken: + boven peil, − onder peil.','De drie decimalen zijn millimeters.'],'',['+5.400','5,40 m boven peil = 5400 mm'],'');
X('tekeningen','Binnenwerks','Binnenwerkse maten meet je tussen de binnenkanten van muren. Van buitenwerks naar binnenwerks trek je de muurdiktes aan beide kanten af.',['Neem de buitenwerkse maat.','Trek aan beide kanten de wanddikte af.'],'buitenwerks = binnenwerks + 2 × wanddikte',['buitenwerks 6000 mm, spouwmuur 300 mm','6000 − 600 = 5400 mm'],'');
X('tekeningen','NAP-hoogte','Peil is een lokaal nulpunt; NAP is het landelijke. Op de situatietekening staat hoe hoog peil ligt ten opzichte van NAP.',['Zoek de NAP-hoogte van peil op.','Tel de peilmaat erbij op (let op het teken).'],'',['P = NAP + 0,80 m, nok op +9.200','NAP + 10,00 m'],'Een negatieve NAP-hoogte (onder zeeniveau) is in Nederland heel normaal.');
X('tekeningen','Kolommen op stramien','Kolommen staan op een raster met een vaste hart-op-hart-afstand. Het aantal kolommen is één meer dan het aantal vakken.',['Deel de totale lengte door de h.o.h.-afstand: aantal vakken.','Tel er 1 bij op voor het aantal kolommen.'],'',['lengte 36 m, h.o.h. 7,2 m','5 vakken → 6 kolommen'],'Vergeet de laatste kolom niet (paaltjesprobleem).');
X('tekeningen','Verdiepingshoogte','Het verschil tussen twee vloerpeilen. Inclusief de vloerdikte; de vrije hoogte in de ruimte is dus kleiner.',['Neem het peil van de bovenste vloer.','Trek het peil van de onderste vloer af.'],'vrije hoogte = verdiepingshoogte − vloerdikte (incl. afwerking)',['eerste verdieping +2.800, begane grond 0','h = 2800 mm'],'');

// ---------- regels ----------
X('regels','Verblijfsgebied','Het Bbl eist dat minstens 55% van de gebruiksoppervlakte van een nieuwbouwwoning verblijfsgebied is: ruimte om te wonen, slapen, koken.',['Bepaal de gebruiksoppervlakte (GO).','Vermenigvuldig met 0,55.','Vergelijk met het ontworpen verblijfsgebied.'],'',['GO 110 m²','minimaal 60,5 m² verblijfsgebied'],'');
X('regels','Daglicht','Elk verblijfsgebied moet genoeg daglicht krijgen. Het Bbl rekent met de equivalente daglichtoppervlakte volgens NEN 2057, niet met het bruto glasoppervlak.',['Bepaal de vloeroppervlakte van het verblijfsgebied.','Vermenigvuldig met 0,10.','Controleer ook: elke verblijfsruimte ≥ 0,5 m².'],'',['verblijfsgebied 32 m²','A_e ≥ 3,2 m²'],'Equivalent daglicht is kleiner dan het glasoppervlak door kozijnhout, belemmeringen en hoogte van het raam.');
X('regels','Ventilatie verblijfsgebied','Per m² verblijfsgebied is 0,9 dm³/s ventilatie nodig, met een minimum van 7 dm³/s; met een opstelplaats voor een kooktoestel minimaal 21 dm³/s.',['Vermenigvuldig het oppervlak met 0,9.','Neem het grootste van die waarde en het minimum (7 of 21).'],'',['woonkeuken 28 m²','0,9 × 28 = 25,2 dm³/s (≥ 21) ✓'],'');
X('regels','Ventilatie verblijfsruimte','Voor elke afzonderlijke verblijfsruimte (zoals een slaapkamer) geldt 0,7 dm³/s per m², minimaal 7 dm³/s.',['Vermenigvuldig met 0,7.','Minimaal 7 dm³/s.'],'',['slaapkamer 9 m²','0,7 × 9 = 6,3 → 7 dm³/s'],'');
X('regels','Hoogte','Een verblijfsgebied en verblijfsruimte in nieuwbouw moeten minimaal 2,6 m vrije hoogte hebben.',['Neem de vrije hoogte (vloer tot plafond).','Vergelijk met 2,6 m.'],'',['verdiepingshoogte 2,85 m, vloer 0,22 m','vrij 2,63 m ✓'],'');
X('regels','Trap','De basismaten voor een trap in een nieuwbouwwoning.',['Bereken de optrede en controleer ≤ 188 mm.','Bereken de aantrede en controleer ≥ 220 mm.','Controleer vrije hoogte ≥ 2,3 m en breedte ≥ 0,8 m.'],'',['h = 2700, 15 optredes → 180 mm ✓','a = 630 − 360 = 270 mm ✓'],'');

// ---------- constructie ----------
X('constructie','Eigen gewicht vloer','Het gewicht van een vloer per m² is de dikte (in meter) maal het volumiek gewicht. Voor beton 24 kN/m³.',['Zet de dikte om naar meter.','Vermenigvuldig met γ.'],'d = {{g|γ}}',['200 mm beton','0,2 × 24 = 4,8 kN/m²'],'Dikte in meter, niet in mm.');
X('constructie','Totale vlaklast','Tel de permanente belasting (eigen gewicht, afwerking, scheidingswanden) en de veranderlijke belasting (gebruik) op.',['Bereken g: alle vaste lagen.','Neem q uit de norm (woning 1,75 kN/m²).','Tel op.'],'',['g = 5,8, q = 1,75','p = 7,55 kN/m²'],'Voor de sterktecontrole vermenigvuldig je g en q nog met belastingfactoren.');
X('constructie','Lijnlast','Een balk draagt een strook vloer zo breed als de afstand tot de volgende balk (h.o.h.).',['Neem de vlaklast p in kN/m².','Vermenigvuldig met de belastingbreedte b in m.'],'',['p = 7,55, h.o.h. 3,6 m','q = 27,2 kN/m'],'');
X('constructie','Oplegreactie','Een ligger op twee steunpunten met een gelijkmatige last: elke oplegging draagt de helft van de totale last.',['Bereken de totale last q × L.','Deel door 2.'],'',['q = 27,2 kN/m, L = 5,4 m','R = 73,4 kN'],'');
X('constructie','Maximaal moment','Het grootste buigend moment in het midden van een ligger op twee steunpunten. Daarmee bepaal je het profiel.',['Vul q en L in.','Bereken q × L² / 8.'],'',['q = 27,2, L = 5,4','M = 27,2 × 29,16 / 8 = 99,1 kNm'],'');

// ---------- uitvoering ----------
X('uitvoering','Arbeidsuren','De basis van elke planning: hoeveel uur werk zit er in een activiteit?',['Neem de hoeveelheid.','Vermenigvuldig met de normtijd.'],'',['150 m² × 0,6 u','90 uur'],'');
X('uitvoering','Doorlooptijd','Van uren naar werkdagen.',['Deel de uren door (mensen × uren per dag).','Rond naar boven af.'],'',['90 u, 3 man, 8 u','3,75 → 4 dagen'],'');
X('uitvoering','Parallelle activiteiten','Lopen activiteiten tegelijk, dan bepaalt de langste wanneer je verder kunt.',['Zoek welke activiteiten tegelijk lopen.','Neem de langste duur.'],'',['dak 6 dagen, kozijnen 4 dagen parallel','6 dagen'],'');
X('uitvoering','Speling','De speling van een niet-kritieke route is hoeveel die mag uitlopen zonder dat het project vertraagt.',['Bereken de duur van de kritieke route.','Bereken de duur van de andere route.','Trek af.'],'',['kritiek 12 dagen, andere route 9','speling 3 dagen'],'');

// ---------- veiligheid ----------
X('veiligheid','Aantal optredes','Een optrede mag maximaal 188 mm zijn. Deel de verdiepingshoogte door 188 en rond altijd naar boven af.',['Deel h door 188.','Rond naar boven af.'],'',['2950 / 188 = 15,7','16 optredes'],'');
X('veiligheid','Optrede','Met het aantal optredes bereken je de echte optrede, die altijd ≤ 188 mm is.',['Deel h door n.'],'',['2950 / 16','184,4 mm'],'');
X('veiligheid','Stapmaatregel','Twee optredes plus één aantrede vormt een prettige stap van rond 630 mm.',['Bereken 630 − 2o.','Controleer ≥ 220 mm.'],'',['o = 184,4','a = 261 mm'],'');
X('veiligheid','Traplengte','De horizontale lengte van de trap in de plattegrond: treden × aantrede.',['Treden = optredes − 1.','Vermenigvuldig met de aantrede.'],'',['16 optredes, a = 261','15 × 261 = 3915 mm'],'Reken ook ruimte voor een overloop of bordes boven en onder.');
X('veiligheid','Vloerafscheiding','Bij een hoogteverschil van meer dan 1 m moet er een hek of balustrade komen, zodat niemand eraf valt.',['Bepaal het hoogteverschil.','> 1 m: afscheiding nodig.','> 13 m: minimaal 1,2 m hoog; anders minimaal 1,0 m.'],'',['balkon op 9 m hoogte','balustrade ≥ 1,0 m'],'');
X('veiligheid','Trap Bbl','Alle basiseisen voor een trap in een nieuwbouwwoning op een rij.',['Controleer breedte en vrije hoogte.','Controleer optrede en aantrede.','Controleer de leuning bij hoogteverschil vanaf 1 m.'],'',['trap 850 mm breed, o = 180, a = 240','alle eisen ✓'],'');

// koppel de uitleg aan de kaarten
Object.keys(FORMULAS).forEach(m=>FORMULAS[m].forEach(c=>{c.x=FX[m+'|'+c.n]||null}));

// ================= UITBREIDING 4: hoofdstukken en onderdelen =================
(function(){
const T=(ch,sub)=>({id:sub,name:TERMSUB[sub],gen:genTerm(ch,sub)});
const tt=(ch,sub)=>`<div class="termlist">${TERMS[ch][sub].map(([t,d,x,v])=>`<div class="tl-row"><b>${t}</b><span>${d}${x?`<em class="tl-x">${x}</em>`:''}${v?`<em class="tl-x tl-v"><b>Voorbeeld:</b> ${v}</em>`:''}</span></div>`).join('')}</div>`;
const addTo=(mod,ch,sub,lesson,after)=>{const m=MOD[mod];if(!m)return;const s=T(ch,sub);const i=after?m.subs.findIndex(x=>x.id===after)+1:m.subs.length;m.subs.splice(i,0,s);m.theory.push({t:lesson.t,sub,h:(lesson.h||'')+tt(ch,sub)})};
addTo('bouwdelen','bouwdelen','afbouw',{t:'Afbouw en binnenafwerking',h:`<p>Na het casco komt de <b>afbouw</b>: binnenwanden, plafonds, vloer- en wandafwerking en het afmonteren van installaties. Volgorde in grote lijnen: installaties in wanden en vloeren → dekvloer → wanden en plafonds → stucwerk en tegelwerk → schilderwerk → vloerafwerking.</p>`});
addTo('materialen','materialen','beton',{t:'Betontechnologie',h:`<p>Bij het bestellen van beton geef je minstens vijf eigenschappen op: <b>sterkteklasse</b> (bijv. C30/37), <b>milieuklasse</b> (bijv. XC4), <b>consistentieklasse</b> (bijv. S3), <b>grootste korrelafmeting</b> (bijv. 16 mm) en <b>chlorideklasse</b> (gewapend: Cl 0,40).</p>${pit('Water toevoegen op de bouwplaats verhoogt de water-cementfactor en maakt het beton zwakker en minder duurzaam.')}`},'betonstaal');
addTo('materialen','materialen','glasmetaal',{t:'Glas, metaal en kunststof',h:`<p>Glas kiest men op isolatie (U-waarde), zontoetreding, veiligheid (gelaagd of gehard) en geluid. Metalen worden beschermd tegen corrosie, bijvoorbeeld door verzinken of coaten.</p>`});
addTo('bouwmethoden','bouwmethoden','grondwerk',{t:'Grondwerk en bouwput',h:`<p>Voordat er gefundeerd wordt, moet de bodem bekend zijn (sonderingen) en moet de bouwput droog en stabiel zijn. In Nederland speelt het hoge grondwater bijna altijd een rol.</p>`},null);
// grondwerk vooraan in de leerroute
(()=>{const m=MOD.bouwmethoden;if(!m)return;const i=m.subs.findIndex(s=>s.id==='grondwerk');const [g]=m.subs.splice(i,1);m.subs.unshift(g);const ti=m.theory.findIndex(t=>t.sub==='grondwerk');const [gt]=m.theory.splice(ti,1);m.theory.unshift(gt)})();
addTo('tekeningen','tekeningen','projecties',{t:'Tekentechniek en projecties',h:`<p>Er zijn drie hoofdmanieren om iets te tekenen: <b>orthogonaal</b> (plattegrond, gevel, doorsnede: maatvast), <b>axonometrisch</b> (isometrie: 3D maar nog maatvast) en <b>perspectivisch</b> (zoals het oog ziet, niet maatvast).</p>`},'soorten');
addTo('architectuur','architectuur','presenteren',{t:'Ontwerpen en presenteren',h:`<p>Ontwerpen is een cyclus: analyseren (locatie, programma) → concept → varianten → kiezen (bijv. met een multicriteria-analyse) → uitwerken → presenteren.</p>`});
addTo('duurzaam','duurzaam','klimaat',{t:'Klimaatadaptief en natuurinclusief bouwen',h:`<p>Door klimaatverandering krijgen we meer hitte, droogte en hevige buien. Gebouwen en wijken worden daarom zo ontworpen dat ze water vasthouden, koel blijven en ruimte bieden aan natuur.</p>`});
addTo('uitvoering','uitvoering','begroting',{t:'Begroting en kosten',h:`<p>Een begroting is opgebouwd uit <b>directe kosten</b> (per post: hoeveelheid × eenheidsprijs), <b>indirecte kosten</b> (bouwplaats, uitvoering), opslagen voor <b>AK</b> en <b>W&R</b>, en btw. In vroege fasen raam je met kengetallen.</p>`},'bouwplaats');

const NEW=[
{id:'bestaand',name:'Bestaande bouw en onderhoud',terms:'bestaand',blurb:'Het grootste deel van het bouwwerk in Nederland gaat over bestaande gebouwen: onderhouden, renoveren, transformeren en gebreken herkennen.',
 subs:[T('bestaand','onderhoud'),T('bestaand','gebreken'),T('bestaand','renovatie'),{id:'mjop',name:'Onderhoudskosten berekenen',gen:genOnderhoud}],
 theory:[{t:'Onderhoud en beheer',sub:'onderhoud',h:`<p>Een gebouw gaat 50 tot 100 jaar mee, maar de onderdelen niet: schilderwerk ongeveer 6–8 jaar, dakbedekking 20–25 jaar, installaties 15–20 jaar. Met een <b>conditiemeting</b> (NEN 2767, scores 1 tot 6) en een <b>meerjarenonderhoudsplan</b> plan je onderhoud en kosten vooruit.</p>${tt('bestaand','onderhoud')}`},
 {t:'Gebreken herkennen',sub:'gebreken',h:`<p>Bij een inspectie kijk je naar het <b>patroon</b> van een gebrek: waar zit het, hoe ziet het eruit, groeit het? Daarna zoek je de oorzaak, niet alleen het symptoom.</p>${tt('bestaand','gebreken')}`},
 {t:'Renovatie en transformatie',sub:'renovatie',h:`<p>Bij werken aan bestaande gebouwen gelden andere regels dan bij nieuwbouw: je mag vaak terugvallen op het <b>rechtens verkregen niveau</b>. Vooraf zijn een asbestinventarisatie en bij monumenten een bouwhistorisch onderzoek belangrijk.</p>${tt('bestaand','renovatie')}`},
 {t:'Rekenen met onderhoud',sub:'mjop',h:`<div class="formula-grid"><div>reservering per jaar = kosten per beurt / cyclus (jaar)</div><div>per eigenaar per maand = reservering per jaar / eigenaren / 12</div></div>`}],formulas:[]},
{id:'stedenbouw',name:'Stedenbouw en omgeving',terms:'stedenbouw',blurb:'Van gebouw naar wijk en stad: openbare ruimte, verkaveling, dichtheid en kengetallen zoals FSI en GSI.',
 subs:[T('stedenbouw','stad'),T('stedenbouw','gebied'),{id:'dichtheid',name:'Dichtheid berekenen',gen:genDichtheid}],
 theory:[{t:'De stad en de wijk',sub:'stad',h:`<p>Een gebouw staat nooit los: het is onderdeel van een straat, een wijk en een stad. Stedenbouw gaat over de samenhang tussen bebouwing, openbare ruimte, groen, water en verkeer.</p>${tt('stedenbouw','stad')}`},
 {t:'Dichtheid en kengetallen',sub:'gebied',h:`<div class="formula-grid"><div>woningdichtheid = woningen / ha</div><div>FSI = BVO / terreinoppervlak</div><div>GSI = bebouwd oppervlak / terreinoppervlak</div><div>gemiddeld aantal lagen = FSI / GSI</div></div><p>1 ha = 10 000 m². Zeg altijd of je een bruto of netto dichtheid bedoelt.</p>${tt('stedenbouw','gebied')}`},
 {t:'Rekenen met dichtheid',sub:'dichtheid',h:`${ex('Voorbeeld',`<p>Kavel 5000 m², GSI 0,4 → bebouwd 2000 m². Vijf lagen → BVO 10 000 m². FSI = 10 000 / 5000 = 2,0 (= 0,4 × 5).</p>`)}`}],formulas:[]}
];
NEW.forEach(m=>{MODS.push(m);MOD[m.id]=m});
Object.assign(FORMULAS,{
 bestaand:[FC(1,'Reservering per jaar','R = {{kosten per beurt|cyclus}}',[['cyclus','jaren tussen twee beurten','jaar']],'Hoeveel je per jaar opzij zet voor onderhoud.','€ 24.000 elke 6 jaar → € 4.000 per jaar'),FC(2,'MJOP totaal','R<sub>totaal</sub> = Σ {{K<sub>i</sub>|c<sub>i</sub>}}',[],'Alle onderdelen samen.',''),FC(3,'Per eigenaar per maand','{{R|n × 12}}',[['n','aantal eigenaren','']],'VvE-bijdrage voor onderhoud.','')],
 stedenbouw:[FC(1,'Woningdichtheid','D = {{aantal woningen|oppervlak (ha)}}',[],'Hoe dicht een wijk bebouwd is.','240 woningen op 8 ha = 30 won/ha'),FC(2,'FSI','FSI = {{BVO|terreinoppervlak}}',[],'Bebouwingsintensiteit.',''),FC(2,'GSI','GSI = {{bebouwd oppervlak|terreinoppervlak}}',[],'Bebouwingsgraad, tussen 0 en 1.',''),FC(3,'Gemiddeld aantal lagen','L = {{FSI|GSI}}',[],'Verband tussen intensiteit en bebouwingsgraad.','FSI 2,4 / GSI 0,4 = 6 lagen')]
});
Object.assign(FX,{});
// uitleg bij de nieuwe formulekaarten
X('bestaand','Reservering per jaar','Een onderhoudsbeurt komt niet elk jaar, maar het geld moet er wel zijn als het zover is. Door de kosten te verdelen over de cyclus spaar je elk jaar een gelijk bedrag.',['Zoek de kosten per beurt.','Zoek de cyclus (jaren).','Deel kosten door cyclus.'],'kosten = R × cyclus',['dak € 30.000, elke 25 jaar','€ 1.200 per jaar'],'Prijsstijgingen tellen in de praktijk ook mee: reken met een indexering.');
X('bestaand','MJOP totaal','Een MJOP telt de jaarlijkse reservering van alle onderdelen op.',['Bereken per onderdeel kosten / cyclus.','Tel alles op.'],'',['schilderwerk 12 000 / 6 = 2000; dak 30 000 / 25 = 1200','totaal € 3.200 per jaar'],'');
X('bestaand','Per eigenaar per maand','Bij een VvE wordt de reservering verdeeld over alle eigenaren, vaak per maand.',['Neem de jaarlijkse reservering.','Deel door het aantal eigenaren.','Deel door 12.'],'',['€ 9.600 per jaar, 20 eigenaren','€ 40 per maand'],'');
X('stedenbouw','Woningdichtheid','De woningdichtheid zegt hoeveel woningen er per hectare staan. Rijtjeswijken zitten rond 30–40, binnensteden veel hoger.',['Tel het aantal woningen.','Zet het oppervlak om naar hectare (÷ 10 000 bij m²).','Deel.'],'',['300 woningen op 75 000 m² = 7,5 ha','40 won/ha'],'Bruto (inclusief wegen en groen) en netto (alleen kavels) geven heel andere getallen.');
X('stedenbouw','FSI','FSI zegt hoeveel vloeroppervlak er op een terrein staat, ongeacht de vorm: een lage brede bebouwing en een slanke toren kunnen dezelfde FSI hebben.',['Tel het BVO van alle bouwlagen op.','Deel door het terreinoppervlak.'],'BVO = FSI × terrein',['10 000 m² BVO op 5000 m²','FSI = 2'],'');
X('stedenbouw','GSI','GSI is het deel van het terrein dat bebouwd is. De rest is openbare ruimte, tuin of groen.',['Bepaal het bebouwde grondoppervlak (footprint).','Deel door het terreinoppervlak.'],'bebouwd = GSI × terrein',['2000 m² bebouwd op 5000 m²','GSI = 0,4'],'GSI kan nooit groter zijn dan 1.');
X('stedenbouw','Gemiddeld aantal lagen','Omdat FSI het vloeroppervlak en GSI het bebouwde grondoppervlak meet, geeft hun verhouding het gemiddelde aantal bouwlagen.',['Deel FSI door GSI.'],'FSI = GSI × L',['FSI 1,2, GSI 0,3','4 lagen'],'');
FORMULAS.bestaand.concat(FORMULAS.stedenbouw).forEach((c,i)=>{const m=i<FORMULAS.bestaand.length?'bestaand':'stedenbouw';c.x=FX[m+'|'+c.n]||null});
Object.assign(CASES,{stedenbouw:[()=>{const A=R(20,60)*1000,gsi=pick([0.3,0.35,0.4]),L=R(3,6),won=pick([80,90,100,110]);const beb=A*gsi,bvo=beb*L,n=Math.floor(bvo*0.8/won);const ha=A/10000;
  return {t:'Een appartementenblok op een kavel',lvl:3,intro:`<p>Een kavel van <b>${N(A)} m²</b> wordt bebouwd met een GSI van <b>${N(gsi)}</b> en <b>${L}</b> bouwlagen. Gemiddeld is 80% van het BVO bruikbaar voor woningen en een appartement is gemiddeld <b>${won} m²</b>.</p>`,parts:[
  {q:'Hoeveel m² grond wordt bebouwd?',answer:beb,dec:0,unit:'m²',hint:'GSI × kavel',sol:steps([`${N(gsi)} × ${N(A)} = ${N(beb)} m²`])},
  {q:'Hoeveel m² BVO komt er in totaal?',answer:bvo,dec:0,unit:'m²',hint:'bebouwd × lagen',sol:steps([`${N(beb)} × ${L} = ${N(bvo)} m²`])},
  {q:'Hoeveel hele appartementen passen erin?',answer:n,dec:0,unit:'',hint:'0,8 × BVO / woninggrootte, naar beneden afronden',sol:steps([`0,8 × ${N(bvo)} / ${won} = ${N(bvo*0.8/won,2)} → ${n}`])},
  {q:'Wat is de netto woningdichtheid op de kavel?',answer:n/ha,dec:1,unit:'won/ha',hint:'woningen / (kavel in ha)',sol:steps([`${N(A)} m² = ${N(ha)} ha`,`${n} / ${N(ha)} = ${N(n/ha,1)} won/ha`])}]}}]});
// leerdoelen opnieuw opbouwen voor begrippenhoofdstukken
const TG=['Begrip → omschrijving herkennen','Omschrijving → begrip noemen','Toepassen in een praktijksituatie'];
MODS.filter(m=>m.terms).forEach(m=>{const tn=m.subs.filter(s=>s.gen.isTerm).map(s=>s.name),calc=m.subs.filter(s=>!s.gen.isTerm).map(s=>s.name);if(['tekeningen','regels'].includes(m.id)){m.goals[0]=[TG[0],...tn,...(m.goals[0]||[]).filter(g=>!TG.includes(g)&&!tn.includes(g))];return}m.goals=[[TG[0],...tn],[TG[1],...calc],[TG[2],...(calc.length?['Volledige berekening in de praktijkopdracht']:[])]]});
})();

// ================= GETEKENDE DOORSNEDEN MET LABELS =================
const BF={};let TFIG={};
(function(){
const lab=(x,y,t,anchor)=>`<text x="${x}" y="${y}" class="lab"${anchor?` text-anchor="${anchor}"`:''}>${t}</text>`;
const lead=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="lead"/><circle cx="${x1}" cy="${y1}" r="2.2" class="dot"/>`;
const pats=p=>`<defs>
<pattern id="${p}h" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" class="hatch"/></pattern>
<pattern id="${p}b" width="14" height="10" patternUnits="userSpaceOnUse"><rect width="14" height="10" class="c-brick"/><path d="M0 0H14M0 5H14M4 0V5M11 5V10" class="joint"/></pattern>
<pattern id="${p}w" width="16" height="10" patternUnits="userSpaceOnUse"><path d="M0 5 Q4 0 8 5 T16 5" class="wave"/></pattern>
<pattern id="${p}d" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" class="dotfill"/></pattern>
<pattern id="${p}z" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1" class="dotfill"/><circle cx="7" cy="8" r="1" class="dotfill"/></pattern>
<marker id="${p}a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="arrowhead"/></marker></defs>`;
const svg=(w,h,body,label)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
const fig=(s,cap)=>`<figure class="bfig"><div class="bfig-scroll">${s}</div><p class="bfig-hint">← schuif de tekening opzij voor alle labels →</p><figcaption>${cap}</figcaption></figure>`;

// 1. Spouwmuur
BF.spouw=fig(svg(500,300,pats('sp')+`
${lab(8,26,'BINNEN')}${lab(300,290,'BUITEN')}
<rect x="54" y="50" width="6" height="210" class="c-light ln"/>
<rect x="60" y="50" width="60" height="210" fill="url(#sph)" class="ln"/>
<rect x="120" y="50" width="70" height="210" class="c-ins ln"/><rect x="120" y="50" width="70" height="210" fill="url(#spw)"/>
<rect x="190" y="50" width="24" height="210" class="c-air"/>
<rect x="214" y="50" width="56" height="210" fill="url(#spb)" class="ln"/>
<line x1="90" y1="150" x2="242" y2="150" class="anchor"/>
<rect x="214" y="246" width="56" height="10" class="c-air ln"/>
${lead(90,70,310,62)}${lab(316,66,'Binnenblad (kalkzandsteen)')}
${lead(155,100,310,96)}${lab(316,100,'Isolatie (minerale wol)')}
${lead(202,130,310,130)}${lab(316,134,'Luchtspouw ±40 mm')}
${lead(180,150,310,164)}${lab(316,168,'Spouwanker (RVS)')}
${lead(242,200,310,198)}${lab(316,202,'Buitenblad (baksteen)')}
${lead(242,251,310,234)}${lab(316,238,'Open stootvoeg')}
${lead(57,230,30,270)}${lab(10,284,'Stucwerk')}
<line x1="54" y1="40" x2="270" y2="40" class="dim" marker-start="url(#spa)" marker-end="url(#spa)"/>${lab(162,34,'± 400 mm','middle')}`,'Doorsnede van een spouwmuur'),'Horizontale doorsnede van een spouwmuur in een nieuwbouwwoning, van binnen naar buiten.');

// 2. Zadeldak
BF.zadeldak=fig(svg(500,320,pats('zd')+`
<polygon points="70,190 230,50 390,190" class="c-light ln"/>
<polygon points="60,198 230,48 400,198 392,198 230,58 68,198" class="c-roof"/>
<rect x="88" y="190" width="14" height="110" fill="url(#zdh)" class="ln"/><rect x="358" y="190" width="14" height="110" fill="url(#zdh)" class="ln"/>
<rect x="88" y="182" width="16" height="8" class="c-wood ln"/><rect x="356" y="182" width="16" height="8" class="c-wood ln"/>
<rect x="150" y="116" width="10" height="10" class="c-wood ln"/><rect x="300" y="116" width="10" height="10" class="c-wood ln"/>
<rect x="88" y="296" width="284" height="8" class="c-con ln"/>
<path d="M56 200 h14 v8 h-14z" class="c-metal ln"/>

${lead(230,52,300,24)}${lab(306,28,'Nok')}
${lead(310,100,360,78)}${lab(366,82,'Dakvlak met pannen')}
${lead(305,121,400,120)}${lab(406,124,'Gording')}
${lead(364,186,420,170)}${lab(406,166,'Muurplaat','start')}
${lead(62,204,40,226)}${lab(4,240,'Dakvoet + goot')}
${lead(95,262,50,276)}${lab(4,290,'Binnenblad')}
${lead(230,300,230,316)}${lab(238,316,'Verdiepingsvloer')}
<path d="M200 190 A 30 30 0 0 0 ${200-30*Math.cos(Math.PI/180*41)} ${190-30*Math.sin(Math.PI/180*41)}" class="dim"/>`,'Doorsnede van een zadeldak'),'Dwarsdoorsnede van een zadeldak met gordingen op de woningscheidende wanden.');

// 3. Plat dak: warm en omgekeerd
const layer=(x,y,w,h,cls,fill)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls} ln"${fill?` fill="${fill}"`:''}/>`;
BF.platdak=fig(svg(460,250,pats('pd')+`
${lab(20,24,'Warm dak')}
${layer(20,40,170,6,'c-dark')}${layer(20,46,170,40,'c-ins')}<rect x="20" y="46" width="170" height="40" fill="url(#pdw)"/>${layer(20,86,170,3,'c-metal')}${layer(20,89,170,40,'c-con','url(#pdd)')}
${lead(190,43,215,40)}${lab(220,44,'Dakbedekking (bitumen/EPDM)')}
${lead(190,66,215,64)}${lab(220,68,'Isolatie (PIR)')}
${lead(190,87,215,88)}${lab(220,92,'Dampremmer')}
${lead(190,110,215,112)}${lab(220,116,'Betonvloer')}
${lab(20,152,'Omgekeerd dak')}
${layer(20,166,170,10,'c-light','url(#pdz)')}${layer(20,176,170,30,'c-ins2')}${layer(20,206,170,6,'c-dark')}${layer(20,212,170,30,'c-con','url(#pdd)')}
${lead(190,171,215,168)}${lab(220,172,'Ballast (grind of tegels)')}
${lead(190,191,215,192)}${lab(220,196,'Isolatie (XPS)')}
${lead(190,209,215,216)}${lab(220,220,'Dakbedekking')}
${lead(190,230,215,240)}${lab(220,244,'Betonvloer')}`,'Opbouw van een warm dak en een omgekeerd dak'),'Bij een warm dak ligt de isolatie onder de dakbedekking, bij een omgekeerd dak erboven.');

// 4. Kozijn
BF.kozijn=fig(svg(490,300,pats('kz')+`
<rect x="60" y="30" width="200" height="230" class="c-wood ln"/>
<rect x="74" y="44" width="172" height="60" class="c-glass ln"/>
<rect x="60" y="104" width="200" height="12" class="c-wood ln"/>
<rect x="74" y="116" width="80" height="130" class="c-glass ln"/>
<rect x="154" y="116" width="12" height="144" class="c-wood ln"/>
<rect x="170" y="120" width="72" height="122" class="c-wood2 ln"/><rect x="178" y="128" width="56" height="106" class="c-glass ln"/>
<path d="M178 128 L234 181 L178 234" class="hinge"/>
<path d="M50 260 h220 l8 10 h-236z" class="c-metal ln"/>
${lead(160,36,300,30)}${lab(306,34,'Bovendorpel')}
${lead(140,110,300,66)}${lab(306,70,'Tussendorpel')}
${lead(110,74,300,100)}${lab(306,104,'Bovenlicht (vast glas)')}
${lead(160,200,300,140)}${lab(306,144,'Tussenstijl')}
${lead(210,170,300,178)}${lab(306,182,'Draaiend deel (draai-kiep)')}
${lead(66,180,30,190)}${lab(4,206,'Stijl')}
${lead(150,256,300,224)}${lab(306,228,'Onderdorpel')}
${lead(260,266,300,262)}${lab(306,266,'Waterslag')}`,'Aanzicht van een raamkozijn met onderdelen'),'Aanzicht van een raamkozijn van buitenaf. De lijnen in het draaiende deel wijzen naar de scharnierkant.');

// 5. Funderingen
const soil=(x,clay,t1,t2)=>`<rect x="${x}" y="70" width="140" height="${clay}" class="c-clay"/><rect x="${x}" y="${70+clay}" width="140" height="${230-clay}" class="c-sand"/><rect x="${x}" y="${70+clay}" width="140" height="${230-clay}" fill="url(#fdz)"/><rect x="${x}" y="70" width="140" height="230" class="none ln"/>${lab(x+70,22,t1,'middle')}${lab(x+70,40,t2,'middle')}`;
BF.fundering=fig(svg(480,330,pats('fd')+`
${soil(10,14,'Op staal','zand ligt hoog')}
<rect x="72" y="52" width="16" height="42" fill="url(#fdh)" class="ln"/><rect x="52" y="94" width="56" height="18" class="c-con ln"/>
${soil(170,130,'Op palen','slappe grond')}
<rect x="232" y="52" width="16" height="28" fill="url(#fdh)" class="ln"/><rect x="218" y="80" width="44" height="20" class="c-con ln"/>
<rect x="226" y="100" width="10" height="150" class="c-con ln"/><rect x="244" y="100" width="10" height="150" class="c-con ln"/>
${soil(330,40,'Plaatfundering','(verbeterde) grond')}
<rect x="356" y="52" width="14" height="22" fill="url(#fdh)" class="ln"/><rect x="430" y="52" width="14" height="22" fill="url(#fdh)" class="ln"/>
<rect x="346" y="74" width="108" height="16" class="c-con ln"/>
${lab(80,320,'strook op zand','middle')}${lab(240,320,'palen tot in het zand','middle')}${lab(400,320,'één betonplaat','middle')}
${lab(176,86,'klei/veen')}${lab(176,226,'zand')}`,'Drie funderingstypen'),'Fundering op staal (links), op palen (midden) en een plaatfundering (rechts). Bruin is slappe klei of veen, geel is draagkrachtig zand.');

// 6. Krachtsafdracht
const arr=(x1,y1,x2,y2,p)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="force" marker-end="url(#${p}a)"/>`;
BF.krachten=fig(svg(540,320,pats('ka')+`
<polygon points="90,90 230,20 370,90" class="c-light ln"/>
<rect x="90" y="90" width="14" height="190" fill="url(#kah)" class="ln"/><rect x="356" y="90" width="14" height="190" fill="url(#kah)" class="ln"/>
<rect x="104" y="176" width="252" height="10" class="c-con ln"/>
<rect x="80" y="280" width="34" height="18" class="c-con ln"/><rect x="346" y="280" width="34" height="18" class="c-con ln"/>
<rect x="92" y="298" width="10" height="22" class="c-con ln"/><rect x="358" y="298" width="10" height="22" class="c-con ln"/>
<rect x="200" y="150" width="40" height="26" class="c-wood ln"/>${lab(248,168,'kast')}
${arr(220,112,220,146,'ka')}${arr(200,181,124,181,'ka')}${arr(240,181,336,181,'ka')}
${arr(97,190,97,272,'ka')}${arr(363,190,363,272,'ka')}${arr(97,300,97,318,'ka')}
${arr(205,36,114,82,'ka')}${arr(255,36,346,82,'ka')}
${lab(390,60,'1  dak → muren')}${lab(390,140,'2  last op vloer')}${lab(390,170,'3  vloer → wanden')}${lab(390,230,'4  wanden → fundering')}${lab(390,300,'5  palen → zand')}`,'Krachtsafdracht door een woning'),'Elke belasting volgt een doorgaande weg naar de grond: van dak en vloer via de dragende wanden naar de fundering en de palen.');

// 7. Trap
BF.trap=fig(svg(500,300,pats('tr')+`
<rect x="30" y="250" width="440" height="10" class="c-con ln"/><rect x="236" y="70" width="200" height="12" class="c-con ln"/>
${Array.from({length:8},(_,i)=>`<rect x="${40+i*28}" y="${250-(i+1)*22.5}" width="${28*(8-i)}" height="22.5" class="c-wood ln"/>`).join('')}
<line x1="22" y1="227.5" x2="22" y2="250" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(6,244,'o')}
<line x1="40" y1="215" x2="68" y2="215" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(48,209,'a')}
<line x1="456" y1="82" x2="456" y2="250" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(464,170,'h')}
<line x1="40" y1="276" x2="236" y2="276" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(138,292,'traplengte = (n − 1) × a','middle')}
<line x1="40" y1="236" x2="236" y2="78" class="klim"/>
${lab(270,120,'o = optrede (≤ 188 mm)')}${lab(270,142,'a = aantrede (≥ 220 mm)')}${lab(270,164,'h = verdiepingshoogte')}${lab(270,186,'2o + a ≈ 630 mm')}${lab(270,208,'n = aantal optredes (hier 8)')}`,'Doorsnede van een rechte trap'),'Een rechte trap met 8 optredes en 7 treden: de bovenste optrede komt uit op de verdiepingsvloer.');

// 8. Ventilatiesystemen A–D
const house=(x,t,inMech,outMech,p)=>`<g transform="translate(${x},0)"><polygon points="10,70 60,35 110,70" class="c-light ln"/><rect x="10" y="70" width="100" height="90" class="c-surface ln"/>
${inMech?`<circle cx="22" cy="115" r="9" class="fan"/><path d="M22 106v18M13 115h18" class="fanx"/>`:`<path d="M10 108 h8 M10 114 h8 M10 120 h8" class="grille"/>`}
<line x1="-14" y1="115" x2="8" y2="115" class="air" marker-end="url(#${p}a)"/>
${outMech?`<circle cx="92" cy="54" r="9" class="fan"/><path d="M92 45v18M83 54h18" class="fanx"/>`:`<path d="M86 50 h12 v-12" class="grille"/>`}
<line x1="98" y1="40" x2="114" y2="18" class="air" marker-end="url(#${p}a)"/>
${lab(60,186,t,'middle')}${lab(60,204,inMech?'toevoer: mechanisch':'toevoer: natuurlijk','middle')}${lab(60,220,outMech?'afvoer: mechanisch':'afvoer: natuurlijk','middle')}</g>`;
BF.ventilatie=fig(svg(560,232,pats('vs')+house(20,'Systeem A',0,0,'vs')+house(155,'Systeem B',1,0,'vs')+house(290,'Systeem C',0,1,'vs')+house(425,'Systeem D (+ WTW)',1,1,'vs'),'Ventilatiesystemen A tot D'),'Ventilatiesystemen: een rooster staat voor natuurlijke luchtstroom, een ventilator voor mechanische.');

// 9. Stabiliteit
const frame=(x,inner,t)=>`<g transform="translate(${x},0)"><rect x="10" y="40" width="110" height="110" class="none"/><line x1="10" y1="150" x2="10" y2="40" class="beam"/><line x1="120" y1="150" x2="120" y2="40" class="beam"/><line x1="10" y1="40" x2="120" y2="40" class="beam"/><line x1="0" y1="150" x2="130" y2="150" class="ground"/>${inner}${lab(65,176,t,'middle')}</g>`;
BF.stabiliteit=fig(svg(460,200,pats('st')+`<line x1="10" y1="30" x2="40" y2="30" class="force" marker-end="url(#sta)"/>${lab(10,22,'wind')}`
+frame(20,`<line x1="10" y1="40" x2="120" y2="150" class="brace"/><line x1="120" y1="40" x2="10" y2="150" class="brace"/>`,'Windverband')
+frame(170,`<path d="M10 52 L22 40 M108 40 L120 52" class="stiff"/><circle cx="10" cy="40" r="5" class="stiffj"/><circle cx="120" cy="40" r="5" class="stiffj"/>`,'Portaal (stijve hoeken)')
+frame(320,`<rect x="10" y="40" width="110" height="110" class="c-con" fill="url(#sth)"/>`,'Stabiliteitswand (schijf)'),'Drie manieren om een gebouw stabiel te maken'),'Zonder stabiliteitselement klapt een raamwerk met scharnieren om bij wind. Een windverband, stijve hoeken of een stijve wand houdt het recht.');

// figuren in de lessen zetten
const putFig=(mod,sub,key)=>{const m=MOD[mod];if(!m)return;const t=m.theory.find(x=>x.sub===sub);if(t&&BF[key])t.h=BF[key]+t.h};
putFig('bouwdelen','gevel','spouw');putFig('bouwdelen','dak','zadeldak');putFig('bouwdelen','openingen','kozijn');putFig('bouwdelen','onderbouw','fundering');
putFig('bouwmethoden','funderingen','fundering');putFig('bouwmethoden','daken','platdak');putFig('constructie','krachtsafdracht','krachten');
putFig('constructie','stabiliteit','stabiliteit');putFig('veiligheid','trapbbl','trap');putFig('installsys','klimaat','ventilatie');putFig('details','aansluitingen','spouw');
// figuur per begrip (getoond in de detailweergave)
TFIG={'Spouwmuur':'spouw','Binnenblad':'spouw','Buitenblad':'spouw','Spouwanker':'spouw','Luchtspouw':'spouw','Open stootvoeg':'spouw',
'Nok':'zadeldak','Dakvoet':'zadeldak','Muurplaat':'zadeldak','Gording':'zadeldak','Zadeldak':'zadeldak',
'Warm dak':'platdak','Omgekeerd dak':'platdak','Plat dak':'platdak',
'Kozijn':'kozijn','Stijl':'kozijn','Onderdorpel':'kozijn','Bovendorpel':'kozijn','Tussendorpel':'kozijn','Draaiend deel':'kozijn','Waterslag':'kozijn',
'Fundering':'fundering','Fundering op staal':'fundering','Strokenfundering':'fundering','Plaatfundering':'fundering','Paalfundering':'fundering','Heipaal':'fundering',
'Krachtsafdracht':'krachten','Draagconstructie':'krachten','Dragende wand':'krachten',
'Stabiliteit':'stabiliteit','Windverband':'stabiliteit','Portaal':'stabiliteit','Stabiliteitswand':'stabiliteit','Schijfwerking':'stabiliteit',
'Klimlijn':'trap','Trapleuning':'trap',
'Ventilatiesysteem A':'ventilatie','Ventilatiesysteem B':'ventilatie','Ventilatiesysteem C':'ventilatie','Ventilatiesysteem D':'ventilatie','Warmteterugwinning (WTW)':'ventilatie','WTW':'ventilatie'};
})();

// ================= INVOER PARSER / REKENMACHINE =================
let lastAns=0;
function parseExpr(src,rad){
  let s=String(src).trim().toLowerCase();
  s=s.replace(/^[a-zα-ωφσ]\w*\s*=\s*/i,'');
  s=s.replace(/[€%°]/g,'').replace(/\s+/g,'').replace(/ /g,'')
     .replace(/,/g,'.').replace(/[×·*]/g,'*').replace(/[÷:]/g,'/').replace(/[−–—]/g,'-')
     .replace(/√/g,'sqrt').replace(/π/g,'pi').replace(/²/g,'^2').replace(/³/g,'^3');
  if(!s)return NaN;
  let i=0;
  const k=rad?1:D2R;const fns={sqrt:Math.sqrt,sin:x=>Math.sin(x*k),cos:x=>Math.cos(x*k),tan:x=>Math.tan(x*k),asin:x=>Math.asin(x)/k,acos:x=>Math.acos(x)/k,atan:x=>Math.atan(x)/k,ln:Math.log,log:Math.log10,abs:Math.abs};
  const fact=n=>{if(n<0||!Number.isInteger(n)||n>170)return NaN;let r=1;for(let j=2;j<=n;j++)r*=j;return r};
  function num(){const m=/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/.exec(s.slice(i));if(!m)throw 0;i+=m[0].length;return parseFloat(m[0])}
  function primary(){
    const c=s[i];
    if(c==='('){i++;const v=expr();if(s[i]!==')')throw 0;i++;return v}
    if(c&&/[a-z]/.test(c)){const m=/^[a-z]+/.exec(s.slice(i));i+=m[0].length;const n=m[0];
      if(n==='pi')return Math.PI;if(n==='e')return Math.E;if(n==='ans')return lastAns;
      if(!fns[n])throw 0;return fns[n](s[i]==='('?primary():unary())}
    return num();
  }
  function power(){let b=primary();while(s[i]==='!'){i++;b=fact(b)}if(s[i]==='^'){i++;return Math.pow(b,unary())}return b}
  function unary(){if(s[i]==='-'){i++;return -unary()}if(s[i]==='+'){i++;return unary()}return power()}
  function term(){let v=unary();while(i<s.length){const c=s[i];if(c==='*'){i++;v*=unary()}else if(c==='/'){i++;v/=unary()}else if(c==='('||/[a-z]/.test(c)){v*=unary()}else break}return v}
  function expr(){let v=term();while(s[i]==='+'||s[i]==='-'){const o=s[i++];const r=term();v=o==='+'?v+r:v-r}return v}
  const unitFallback=()=>{const m=/^(-?\d+(\.\d+)?)([a-z][a-z\/\^\d\.]*)$/.exec(s);if(m&&!/^(sqrt|sin|cos|tan|asin|acos|atan|ln|log|abs|pi|ans)/.test(m[3]))return parseFloat(m[1]);return NaN};
  try{const v=expr();if(i!==s.length)return unitFallback();return v}
  catch(e){return unitFallback()}
}

// ================= OPSLAG =================
const KEY='bouwwiskunde-v1';
function loadDB(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&typeof d==='object')return d}catch(e){}return null}
const freshDB=()=>({mods:{},days:[],errors:[],total:0,correct:0,intake:null,tests:[],path:{},open:{},pathV:2,daily:{},log:[]});
let DB=Object.assign(freshDB(),loadDB()||{});const BOOT_TS=DB.ts||0;DB.path=DB.path||{};DB.open=DB.open||{};
function saveDB(){DB.ts=Date.now();try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}if(typeof cloudQueue==='function')cloudQueue()}
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function record(q,ok){
  const m=DB.mods[q.mod]||(DB.mods[q.mod]={hist:[],n:0,c:0,subs:{}});
  m.hist.push([q.lvl,ok?1:0]);if(m.hist.length>20)m.hist.shift();
  m.n++;if(ok)m.c++;
  const s=m.subs[q.sub]||(m.subs[q.sub]={n:0,c:0});s.n++;if(ok)s.c++;
  DB.total++;if(ok)DB.correct++;
  const dd=DB.daily||(DB.daily={});const tk=today();(dd[tk]||(dd[tk]={n:0,c:0})).n++;if(ok)dd[tk].c++;
  logEv('ans',`${MOD[q.mod]?MOD[q.mod].code:''} · ${q.subName||''}`,{ok:!!ok});
  const t=today();if(!DB.days.includes(t)){DB.days.push(t);if(DB.days.length>400)DB.days.shift()}
  if(!ok&&!q.fromErr){const copy={...q};delete copy.fromErr;copy.eid=Date.now()+'-'+Math.random().toString(36).slice(2,6);DB.errors.unshift(copy);if(DB.errors.length>50)DB.errors.pop()}
  saveDB();refreshNav();renderRail();
}
// ---- leerpad: per blad eerst alle onderdelen op niveau 1, dan niveau 2, dan niveau 3 ----
const PER_STEP=3;
const pathSteps=m=>{const o=[];[1,2,3].forEach(l=>m.subs.forEach(s=>o.push({l,s})));return o};
const prog=id=>DB.path[id]||(DB.path[id]={i:0,c:0});
(function migrate(){if(DB.pathV>=2)return;const old={basis:5,rekenen:4,eenheden:5,machten:4,schaal:4,meetkunde:4,algebra:4,lineair:4,gonio:3,kwadratisch:4,mechanica:5,bouwfysica:5};
  Object.entries(DB.path).forEach(([id,p])=>{if(!MOD[id]||!old[id])return;const n=MOD[id].subs.length,o=old[id];const l=Math.floor(p.i/o),r=p.i%o;p.i=Math.min(3*n,l*n+r)});DB.pathV=2;saveDB()})();
function mastery(id){const m=MOD[id];const tot=m.subs.length*3*PER_STEP;const p=DB.path[id];if(!p)return 0;return Math.round(Math.min(tot,p.i*PER_STEP+p.c)/tot*100)}
const levelDone=(id,l)=>(DB.path[id]?.i||0)>=MOD[id].subs.length*l;
const curLevel=id=>{const p=DB.path[id]?.i||0;return Math.min(3,Math.floor(p/MOD[id].subs.length)+1)};
const modDone=id=>levelDone(id,3);
function unlocked(id){const m=MOD[id];return !m||!m.prev||DB.open[id]||levelDone(m.prev,1)||(DB.path[id]?.i||0)>0||(DB.path[id]?.c||0)>0}
function status(id){if(modDone(id))return['good','Afgerond'];if(!unlocked(id))return['lock','Op slot'];const p=DB.path[id];if(!p||(p.i===0&&p.c===0))return['nieuw','Nieuw'];return['mid',`Niveau ${curLevel(id)}`]}
function streak(){const set=new Set(DB.days);let d=new Date();let n=0;if(!set.has(today()))d.setDate(d.getDate()-1);
  for(;;){const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;if(set.has(k)){n++;d.setDate(d.getDate()-1)}else break}return n}

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

// ================= UI HELPERS =================
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function tape(p){return `<div class="tape" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}" aria-label="Beheersing ${p}%"><div class="tape-fill" style="width:${p}%"></div></div>`}
function chip(id){const[c,t]=status(id);return `<span class="badge ${c}">${t}</span>`}
function toast(msg){const t=$('#toast');t.innerHTML=msg;t.hidden=false;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>{t.hidden=true},2600)}
const LVL={1:'Basis',2:'Gevorderd',3:'HBO-start'};
function decNote(q){
  if(q.type==='mc')return '';
  if(q.type==='set')return `Meerdere oplossingen? Scheid ze met een puntkomma: <span class="mono">3; −2</span>${q.dec!=null?` · rond af op ${q.dec} decimalen`:''}`;
  if(q.type==='frac')return 'Geef een vereenvoudigde breuk (bijv. <span class="mono">7/12</span>) of een decimaal getal.';
  if(q.dec==null)return '';
  return q.dec===0?'Rond af op een geheel getal.':`Rond af op ${q.dec} decimaal${q.dec>1?'en':''}.`;
}

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

// ================= NAVIGATIE =================
const ICON={
  lock:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  check:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  arrow:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  up:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 11l4-4 3 3 5-5M10 5h4v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  grid:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="9" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="9" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  doc:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.8h5.5L12.5 5v9.2H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 8h4.5M6 10.5h4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  clock:'<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3.2l2 1.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  redo:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12.5 6.5A5 5 0 1 0 13 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M13 3v3.6H9.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  fx:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 2.5c-1.5 0-2 1-2.3 2.5L5.8 13c-.3 1.4-.8 2-2 2M4.5 6.5h5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 9l3 4M13 9l-3 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  star:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  chev:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cal:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
};
function ring(p,size=40){const r=(size-6)/2,c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${size/2}" cy="${size/2}" r="${r}" class="ring-bg"/><circle cx="${size/2}" cy="${size/2}" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`}
function lvlBars(id){const m=MOD[id];const p=DB.path[id]?.i||0;const n=m.subs.length;return `<span class="lbars" aria-label="Niveaus">${[1,2,3].map(l=>{const f=Math.max(0,Math.min(1,(p-(l-1)*n)/n));return `<i title="Niveau ${l}: ${LVL[l]}"><b style="width:${f*100}%"></b></i>`}).join('')}</span>`}
function ago(ts){const s=(Date.now()-ts)/1000;if(s<60)return 'zojuist';if(s<3600)return `${Math.floor(s/60)} min geleden`;if(s<86400)return `${Math.floor(s/3600)} uur geleden`;return new Date(ts).toLocaleDateString('nl-NL',{day:'numeric',month:'short'})}
function logEv(kind,txt,extra){DB.log=DB.log||[];DB.log.unshift({ts:Date.now(),kind,txt,...(extra||{})});if(DB.log.length>40)DB.log.length=40}

// ---- voorkeuren: kleur, achtergrond, kolommen ----
// ---- voorkeuren: kleur, menu ----
const PKEY='bouwwiskunde-prefs';
let PREF=Object.assign({accent:'blauw',side:true,groups:{}},(()=>{try{return JSON.parse(localStorage.getItem(PKEY))||{}}catch(e){return {}}})());
PREF.groups=PREF.groups||{};
function savePref(){try{localStorage.setItem(PKEY,JSON.stringify(PREF))}catch(e){}if(typeof cloudQueue==='function')cloudQueue()}
const ACCENTS=[['blauw','Blauw'],['indigo','Indigo'],['groen','Groen'],['oranje','Oranje'],['grafiet','Grafiet']];
function applyPref(){const r=document.documentElement;if(PREF.accent==='blauw')delete r.dataset.accent;else r.dataset.accent=PREF.accent;
  $('#frame').classList.toggle('no-side',!PREF.side);$('#sideToggle').classList.toggle('on',!PREF.side)}
function setAccent(a){PREF.accent=a;savePref();applyPref()}
function renderThemePop(){const p=$('#themePop');
  p.innerHTML=`<div class="tp-h"><h2>Weergave</h2><button id="tpClose" aria-label="Sluiten">×</button></div>
  <div class="tp-sec"><div class="tp-l">Accentkleur</div><div class="tp-colors">${ACCENTS.map(([k,t])=>`<button class="tpc${PREF.accent===k?' on':''}" data-a="${k}"><i></i>${t}</button>`).join('')}</div></div>
  <div class="tp-sec"><div class="tp-row"><span>Menu tonen</span><button class="switch" role="switch" aria-checked="${PREF.side}" data-sw="side" aria-label="Menu tonen"></button></div></div>
  <p class="muted small">Licht of donker volgt de instelling van je apparaat.</p>`;
  $('#tpClose').onclick=()=>toggleTheme(false);
  $$('.tpc',p).forEach(b=>b.onclick=()=>{setAccent(b.dataset.a);renderThemePop()});
  $$('[data-sw]',p).forEach(b=>b.onclick=()=>{PREF[b.dataset.sw]=!PREF[b.dataset.sw];savePref();applyPref();renderThemePop()});
}
function toggleTheme(v){const p=$('#themePop');const open=v===undefined?p.hidden:v;if(open)renderThemePop();p.hidden=!open;$('#themeBtn').setAttribute('aria-expanded',open)}


// ================= ACCOUNT EN OPSLAG IN JE PROFIEL =================
// Inloggen gaat via je Claude-account. Je voortgang staat in een privé-document dat alleen jij kunt lezen.
const CLOUD={st:'connecting',uid:null,ref:null,name:'',avatar:'',ready:false,timer:null,busy:false,dirty:false,saved:0,err:''};
const hasProgress=d=>!!d&&((d.total||0)>0||Object.keys(d.path||{}).length>0||!!d.intake);
function cloudPayload(){
  const d=JSON.parse(JSON.stringify(DB));let body={v:1,ts:DB.ts||Date.now(),db:JSON.stringify(d),pref:JSON.stringify(PREF)};
  const size=()=>JSON.stringify(body).length;
  if(size()>240000){d.errors=(d.errors||[]).map(e=>{const c={...e};delete c.fig;return c});d.log=(d.log||[]).slice(0,30);body.db=JSON.stringify(d)}
  while(size()>240000&&(d.errors||[]).length){d.errors.pop();body.db=JSON.stringify(d)}
  return body}
function cloudQueue(){if(!CLOUD.ref)return;CLOUD.dirty=true;if(!CLOUD.ready)return;clearTimeout(CLOUD.timer);CLOUD.timer=setTimeout(cloudFlush,1500);setCloud('pending')}
async function cloudFlush(){
  if(!CLOUD.ref||!CLOUD.ready||!CLOUD.dirty)return;if(CLOUD.busy){clearTimeout(CLOUD.timer);CLOUD.timer=setTimeout(cloudFlush,800);return}
  CLOUD.busy=true;CLOUD.dirty=false;setCloud('saving');
  try{await CLOUD.ref.set(cloudPayload());CLOUD.saved=Date.now();setCloud('ok')}
  catch(e){const c=e&&e.code;if(c==='unavailable'){CLOUD.dirty=true;setTimeout(cloudFlush,2000+Math.random()*2000);setCloud('pending')}else if(c==='invalid_argument'||c==='not_granted'||c==='revoked'){CLOUD.ref=null;CLOUD.err='Opslaan in je account is hier niet toegestaan. Je voortgang staat alleen op dit apparaat.';setCloud('local')}else{CLOUD.err=(c==='quota_exceeded')?'Je opslag is vol. Wis oude fouten of je voortgang.':'Opslaan mislukt. Het wordt opnieuw geprobeerd.';CLOUD.dirty=true;setCloud('error')}}
  finally{CLOUD.busy=false}}
function adoptRemote(r){
  try{const d=JSON.parse(r.db);DB=Object.assign(freshDB(),d);DB.path=DB.path||{};DB.open=DB.open||{};DB.ts=r.ts;localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}
  try{if(r.pref){PREF=Object.assign({accent:'blauw',side:true,groups:{}},JSON.parse(r.pref));localStorage.setItem(PKEY,JSON.stringify(PREF));applyPref()}}catch(e){}
  Object.keys(PS).forEach(k=>delete PS[k]);
}
async function cloudSync(initial){
  if(!CLOUD.ref)return;
  try{const snap=await CLOUD.ref.get();const r=snap.exists?snap.data():null;
    if(r&&r.db&&(!hasProgress(DB)||(r.ts||0)>(initial?BOOT_TS:(DB.ts||0)))){if((r.ts||0)!==(DB.ts||0)){adoptRemote(r);route();if(!initial)toast('Je voortgang is bijgewerkt vanuit je account')}CLOUD.saved=r.ts||Date.now();CLOUD.ready=true;CLOUD.dirty=false;setCloud('ok')}
    else{CLOUD.ready=true;if(hasProgress(DB)&&(!r||(DB.ts||0)>(r.ts||0))){CLOUD.dirty=true;await cloudFlush()}else{CLOUD.saved=r?r.ts:0;setCloud('ok')}}
  }catch(e){CLOUD.ready=true;if(e&&e.code==='unavailable'&&initial){setTimeout(()=>cloudSync(true),2500);return}setCloud('error')}}
async function cloudInit(){
  if(!window.claude||typeof window.claude.use!=='function'){setCloud('local');return}
  try{const [user,db]=await Promise.all([window.claude.use('user'),window.claude.use('db')]);
    if(!user||!db){setCloud('local');return}
    const me=await user.me();CLOUD.uid=me.id;CLOUD.name=me.name||'';CLOUD.avatar=me.avatarUrl||'';
    if(!CLOUD.uid){setCloud('local');return}
    CLOUD.ref=db.doc('data/users/'+CLOUD.uid+'/voortgang');setCloud('connecting');
    await cloudSync(true);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){clearTimeout(CLOUD.timer);cloudFlush()}else if(CLOUD.ready&&!CLOUD.dirty&&!CLOUD.busy)cloudSync(false)});
  }catch(e){setCloud('local')}}
const CLOUD_TXT={connecting:'Verbinden met je account…',pending:'Wijzigingen worden opgeslagen…',saving:'Opslaan…',ok:'Opgeslagen in je account',local:'Alleen op dit apparaat',error:'Opslaan mislukt'};
function setCloud(st){CLOUD.st=st;const el=$('#acctChip');if(el)renderAcctChip();if(location.hash==='#account'){const s=$('#acctState');if(s){s.innerHTML=acctStateHtml();const b=$('#acNow');if(b)b.onclick=()=>{CLOUD.dirty=true;cloudFlush()}}}}
function renderAcctChip(){const el=$('#acctChip');if(!el)return;const ok=CLOUD.st==='ok'||CLOUD.st==='pending'||CLOUD.st==='saving';
  el.innerHTML=`<a href="#account" class="acct${location.hash==='#account'?' on':''}">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av">`:`<span class="acct-av ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<span class="acct-t"><b></b><span class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]}</span></span></a>`;
  $('b',el).textContent=CLOUD.name||(CLOUD.uid?'Mijn profiel':'Profiel')}
function acctStateHtml(){const ok=['ok','pending','saving'].includes(CLOUD.st);
  return `<div class="acct-card"><div class="ac-top">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av lg">`:`<span class="acct-av lg ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<div><h2>${esc(CLOUD.name||(CLOUD.uid?'Mijn profiel':'Niet ingelogd'))}</h2><p class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]}${CLOUD.saved&&ok?` · laatst ${new Date(CLOUD.saved).toLocaleString('nl-NL',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}`:''}</p></div></div>
  ${CLOUD.err?`<p class="warnline">${esc(CLOUD.err)}</p>`:''}
  ${CLOUD.uid?`<p>Je bent ingelogd met je Claude-account. Je voortgang, instellingen en fouten worden automatisch opgeslagen in je eigen profiel. Niemand anders kan ze zien, ook niet als je de link deelt.</p>${ok?'<div><button class="btn ghost sm" id="acNow">Nu opslaan</button></div>':''}`:`<p>Je bent nu niet ingelogd (of deze weergave heeft geen toegang tot opslag). Je voortgang staat dan alleen in deze browser. Open de app via de link terwijl je bent ingelogd op claude.ai om hem in je profiel op te slaan.</p>`}</div>`}
function viewAccount(el){
  const st=DB.total?`${N(DB.total)} opgaven gemaakt · ${MODS.filter(m=>modDone(m.id)).length} van ${MODS.length} hoofdstukken af · ${(DB.days||[]).length} dag${(DB.days||[]).length===1?'':'en'} geoefend`:'Nog niets gemaakt.';
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Account</p><h1>Mijn profiel</h1><p class="lede">${st}</p></header>
  <div id="acctState">${acctStateHtml()}</div>
  <section><div class="sec-head"><h2>Op een ander apparaat verder</h2></div><ol class="steps plain"><li>Open dezelfde link op je telefoon, laptop of een computer op school.</li><li>Log in op claude.ai met hetzelfde account.</li><li>Je voortgang wordt automatisch geladen. Werk je op twee apparaten, dan wint de laatst opgeslagen versie.</li></ol></section>
  <section><div class="sec-head"><h2>Back-up</h2></div><p class="muted">Een back-up is een bestand met al je voortgang. Handig als extra zekerheid of om over te zetten.</p>
  <div class="lk-acts" style="justify-content:flex-start"><button class="btn ghost" id="bkDown">Back-up downloaden</button><label class="btn ghost" for="bkFile">Back-up terugzetten</label><input type="file" id="bkFile" accept="application/json,.json" hidden></div><p class="muted small" id="bkMsg"></p></section>`;
  const now=$('#acNow');if(now)now.onclick=()=>{CLOUD.dirty=true;cloudFlush()};
  $('#bkDown').onclick=async()=>{const data=JSON.stringify({app:'bouwwiskunde',v:1,ts:Date.now(),db:DB,pref:PREF},null,1);const fn=`bouwwiskunde-backup-${today()}.json`;
    try{const dl=window.claude&&await window.claude.use('downloads');if(dl){await dl.save({filename:fn,data});$('#bkMsg').textContent='Back-up opgeslagen.';return}}catch(e){if(e&&e.code&&e.code!=='unavailable'){$('#bkMsg').textContent='Download geannuleerd.';return}}
    try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download=fn;document.body.appendChild(a);a.click();a.remove()}catch(e){$('#bkMsg').textContent='Downloaden lukt hier niet.'}};
  $('#bkFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const j=JSON.parse(rd.result);if(j.app!=='bouwwiskunde'||!j.db)throw 0;DB=Object.assign(freshDB(),j.db);if(j.pref){PREF=Object.assign(PREF,j.pref);savePref();applyPref()}saveDB();Object.keys(PS).forEach(k=>delete PS[k]);toast('Back-up teruggezet');route()}catch(err){$('#bkMsg').textContent='Dit is geen geldig back-upbestand.'}};rd.readAsText(f)};
}
// ================= VAKKEN =================
// volgorde = volgorde waarin je het leert: eerst rekenen, dan wat erop voortbouwt
const SUBJECTS=[
  {id:'g-wiskunde',name:'Rekenen en wiskunde',cats:[
    {name:'Rekenen',mods:['basis','rekenen','eenheden','schatten','machten','schaal']},
    {name:'Algebra en formules',mods:['algebra','lineair','kwadratisch']},
    {name:'Meetkunde en goniometrie',mods:['meetkunde','gonio']},
    {name:'Statistiek',mods:['statistiek']},
    {name:'Functies voor het HBO',mods:['explog','afgeleide']}]},
  {id:'g-bouwkunde',name:'Bouwkunde',cats:[
    {name:'Bouwtechniek',mods:['bouwdelen','materialen','constructie','bouwmethoden','details']},
    {name:'Ontwerp en tekenen',mods:['tekeningen','architectuur','bim','stedenbouw']},
    {name:'Bouwproces',mods:['bouwproces','uitvoering']},
    {name:'Regelgeving en duurzaamheid',mods:['regels','veiligheid','duurzaam']},
    {name:'Bestaande bouw',mods:['bestaand']}]},
  {id:'g-natuurkunde',name:'Natuurkunde en constructie',cats:[
    {name:'Natuurkunde',mods:['natuurkunde','warmte']},
    {name:'Mechanica en sterkte',mods:['mechanica','sterkte']}]},
  {id:'g-bouwfysica',name:'Bouwfysica en installaties',cats:[
    {name:'Bouwfysica',mods:['bfbegrip','bouwfysica','lichtlucht','geluid']},
    {name:'Installaties',mods:['installsys','installaties']}]},
  {id:'g-economie',name:'Bouweconomie',cats:[
    {name:'Calculatie',mods:['calculatie']},
    {name:'Kosten en financiering',mods:['economie']}]}];
SUBJECTS.forEach(S=>{S.cats.forEach(c=>c.mods=c.mods.filter(id=>MOD[id]));S.mods=S.cats.flatMap(c=>c.mods)});
MODS.forEach(m=>{if(!SUBJECTS.some(S=>S.mods.includes(m.id))){const S=SUBJECTS[1];S.cats[0].mods.push(m.id);S.mods.push(m.id)}});
// leerroute per vak in menuvolgorde: elk vak een eigen keten, eerste hoofdstuk vrij
(()=>{const PF={'g-bouwkunde':'B','g-wiskunde':'W','g-natuurkunde':'N','g-bouwfysica':'F','g-economie':'E'};
  const ord=SUBJECTS.map(S=>S.id);
  ord.forEach(g=>{const S=SUBJECTS.find(x=>x.id===g);S.mods.forEach((id,i)=>{const m=MOD[id];m.code=PF[g]+'-'+String(i+1).padStart(2,'0');m.prev=i?S.mods[i-1]:null})});
  const flat=ord.flatMap(g=>SUBJECTS.find(x=>x.id===g).mods);MODS.sort((a,b)=>flat.indexOf(a.id)-flat.indexOf(b.id))})();
const catOf=id=>{for(const S of SUBJECTS)for(const c of S.cats)if(c.mods.includes(id))return c;return {name:''}};
const tabsFor=m=>[['uitleg','Uitleg'],['formules',m.terms?'Begrippen':'Formules'],['oefenen','Oefenen'],...((CASES[m.id]||[]).length?[['praktijk','Praktijk']]:[])];
const nextOf=m=>MODS.find(x=>x.prev===m.id);
const subjectOf=id=>SUBJECTS.find(s=>s.mods.includes(id));

// ================= HERHALEN (gespreid, Leitner) =================
const INTERVALS=[0,1,3,7,14,30,60];
const addDays=n=>{const d=new Date();d.setDate(d.getDate()+n);return dayKey(d)};
function dayKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function schedule(mod,sub,l){DB.rev=DB.rev||{};const k=mod+':'+sub;const r=DB.rev[k];if(r){r.l=Math.max(r.l,l)}else DB.rev[k]={l,box:1,due:addDays(1)}}
function dueItems(){const t=today();return Object.entries(DB.rev||{}).filter(([k,r])=>r.due<=t&&MOD[k.split(':')[0]]).map(([k,r])=>({k,...r}))}
function nextDue(){const ds=Object.values(DB.rev||{}).map(r=>r.due).sort();return ds[0]}
function fmtDay(k){if(!k)return '';const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('nl-NL',{weekday:'long',day:'numeric',month:'long'})}

// ================= NAVIGATIE =================
function navIcon(id){const [st]=status(id);return st==='good'?ICON.check:st==='lock'?ICON.lock:ring(mastery(id),16)}
function buildNav(){
  const h=(location.hash||'').slice(1)||'start';const sm=/^([a-z]+)-(uitleg|formules|oefenen|praktijk)$/.exec(h);const curId=sm?sm[1]:MOD[h]?h:null;
  const curSub=curId?subjectOf(curId).id:subjectOf(currentMod().id).id;
  const due=dueItems().length;
  $('#navlist').innerHTML=`
  <a href="#start" data-r="start" class="navi top"><span class="nv-ic">${ICON.grid}</span><span class="nv-name">Home</span></a>
  <a href="#herhalen" data-r="herhalen" class="navi top"><span class="nv-ic">${ICON.redo}</span><span class="nv-name">Herhalen</span><span class="nv-count">${due||''}</span></a>
  <div class="navlabel">Vakken</div>
  ${SUBJECTS.map(S=>{const open=PREF.groups[S.id]!==undefined?PREF.groups[S.id]:S.id===curSub;const done=S.mods.filter(id=>modDone(id)).length;
    return `<div class="ngroup${open?' open':''}"><button class="ng-h" data-g="${S.id}" aria-expanded="${open}"><span class="ng-chev">${ICON.chev}</span><span class="ng-name">${S.name}</span><span class="ng-c">${done}/${S.mods.length}</span></button>
    <div class="ng-list">${S.cats.map((C,ci)=>{const ck=S.id+'|'+C.name;const cOpen=PREF.groups[ck]!==undefined?PREF.groups[ck]:(curId?C.mods.includes(curId):S.id===curSub&&C.mods.includes(currentMod().id));const cd=C.mods.filter(id=>modDone(id)).length;return `<div class="ncat${cOpen?' open':''}"><button class="nc-h" data-c="${esc(ck)}" aria-expanded="${cOpen}"><span class="ng-chev">${ICON.chev}</span><span class="nc-name">${C.name}</span><span class="ng-c">${cd}/${C.mods.length}</span></button><div class="nc-list">${C.mods.map(id=>{const m=MOD[id];const act=id===curId;return `<a href="#${id}" data-r="${id}" class="navi ch${act?' active':''}"><span class="nv-ic" data-st="${status(id)[0]}">${navIcon(id)}</span><span class="nv-name"><span class="nv-code">${m.code.slice(2)}</span>${m.name}</span></a>${act?`<div class="ch-pages">${[['', 'Overzicht'],...tabsFor(m)].map(([k,t])=>{const href=k?`#${id}-${k}`:`#${id}`;const on=k?(sm&&sm[2]===k):!sm;return `<a href="${href}" class="chp${on?' on':''}">${t}</a>`}).join('')}</div>`:''}`}).join('')}</div></div>`}).join('')}</div></div>`}).join('')}
  <div class="navlabel">Toetsen</div>
  <a href="#instaptoets" data-r="instaptoets" class="navi"><span class="nv-ic">${ICON.star}</span><span class="nv-name">Instaptoets</span></a>
  <a href="#oefentoets" data-r="oefentoets" class="navi"><span class="nv-ic">${ICON.clock}</span><span class="nv-name">Oefentoets</span></a>
  <div class="navlabel">Naslag</div>
  <a href="#formules" data-r="formules" class="navi"><span class="nv-ic">${ICON.fx}</span><span class="nv-name">Formuleblad</span></a>
  <a href="#begrippen" data-r="begrippen" class="navi"><span class="nv-ic">${ICON.doc}</span><span class="nv-name">Begrippenlijst</span></a>
  <a href="#fouten" data-r="fouten" class="navi"><span class="nv-ic">${ICON.x}</span><span class="nv-name">Fouten</span><span class="nv-count">${DB.errors.length||''}</span></a>
  <a href="#methode" data-r="methode" class="navi"><span class="nv-ic">${ICON.doc}</span><span class="nv-name">Zo leer je hier</span></a>`;
  $$('.nc-h').forEach(b=>b.onclick=()=>{const g=b.closest('.ncat');const o=!g.classList.contains('open');g.classList.toggle('open',o);b.setAttribute('aria-expanded',o);PREF.groups[b.dataset.c]=o;savePref()});
  $$('.ng-h').forEach(b=>b.onclick=()=>{const g=b.closest('.ngroup');const o=!g.classList.contains('open');g.classList.toggle('open',o);b.setAttribute('aria-expanded',o);PREF.groups[b.dataset.g]=o;savePref()});
  const key=sm?sm[1]:(MOD[h]||['herhalen','instaptoets','oefentoets','fouten','formules','begrippen','methode','account'].includes(h))?h:'start';
  $$('.navi').forEach(a=>a.classList.toggle('active',a.dataset.r===key));
}
function refreshNav(){
  MODS.forEach(m=>{const el=$(`.navi[data-r="${m.id}"] .nv-ic`);if(!el)return;el.dataset.st=status(m.id)[0];el.innerHTML=navIcon(m.id)});
  const bc=$('#bellCount');if(bc)bc.textContent=DB.errors.length?String(DB.errors.length):'';
  const nc=$('.navi[data-r="herhalen"] .nv-count');if(nc)nc.textContent=dueItems().length||'';
  const fc=$('.navi[data-r="fouten"] .nv-count');if(fc)fc.textContent=DB.errors.length||'';
}
function renderRail(){}
function setCrumbs(parts){$('#crumbs').innerHTML=parts.map((p,i)=>i<parts.length-1?`<a href="${p[1]}">${p[0]}</a><span class="sep">/</span>`:`<span class="cur">${p[0]}</span>`).join('')}
let timerH=null;function stopTimer(){clearInterval(timerH);timerH=null}
function route(){
  const h=(location.hash||'').slice(1)||'start';document.body.classList.remove('nav-open');$('#menuBtn').setAttribute('aria-expanded','false');stopTimer();toggleTheme(false);
  const main=$('#main');const sm=/^([a-z]+)-(uitleg|formules|oefenen|praktijk)$/.exec(h);
  if(sm&&MOD[sm[1]]){const m=MOD[sm[1]];const tb=tabsFor(m).find(x=>x[0]===sm[2]);if(!tb){location.replace('#'+m.id);return}setCrumbs([[subjectOf(m.id).name,'#'+m.id],[catOf(m.id).name,'#'+m.id],[`${m.code} · ${m.name}`,`#${m.id}`],[tb[1]]]);viewModuleSub(main,m,sm[2])}
  else if(MOD[h]){setCrumbs([[subjectOf(h).name,'#'+h],[catOf(h).name,'#'+h],[`${MOD[h].code} · ${MOD[h].name}`]]);viewModule(main,MOD[h])}
  else if(h==='herhalen'){setCrumbs([['Bouwwiskunde','#start'],['Herhalen']]);viewReview(main)}
  else if(h==='methode'){setCrumbs([['Naslag','#start'],['Zo leer je hier']]);viewMethod(main)}
  else if(h==='instaptoets'){setCrumbs([['Toetsen','#start'],['Instaptoets']]);viewTestIntro(main,'intake')}
  else if(h==='oefentoets'){setCrumbs([['Toetsen','#start'],['Oefentoets']]);viewTestIntro(main,'practice')}
  else if(h==='fouten'){setCrumbs([['Naslag','#start'],['Fouten herhalen']]);viewErrors(main)}
  else if(h==='formules'){setCrumbs([['Naslag','#start'],['Formuleblad']]);viewFormulas(main)}
  else if(h==='account'){setCrumbs([['Account','#account'],['Mijn profiel']]);viewAccount(main)}
  else if(h==='begrippen'){setCrumbs([['Naslag','#start'],['Begrippenlijst']]);viewTerms(main)}
  else{setCrumbs([['Bouwwiskunde','#start'],['Home']]);viewHome(main)}
  buildNav();renderAcctChip();window.scrollTo(0,0);
}

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
  <section><div class="sec-head"><h2>Laatste 14 dagen</h2><span class="muted small"><i class="lg-dot ok"></i>in één keer goed <i class="lg-dot all"></i>gemaakt</span></div>${activityChart()}</section>
  <section><div class="sec-head"><h2>Laatst gemaakt</h2></div>
  ${(DB.log||[]).filter(e=>e.kind==='ans').length?`<ul class="actlist">${(DB.log||[]).filter(e=>e.kind==='ans').slice(0,6).map(e=>`<li><span class="mark ${e.ok?'ok':'no'}">${e.ok?ICON.check:ICON.x}</span><span>${esc(e.txt)}</span><span class="muted small">${ago(e.ts)}</span></li>`).join('')}</ul>`:'<p class="muted">Nog niets gemaakt. Begin bij “Verder oefenen” hierboven.</p>'}</section></div>
  <section><div class="sec-head"><h2>Snel naar</h2></div><div class="quick">
  <a href="#formules">${ICON.fx}<span><b>Formuleblad</b><span>alle formules met uitleg</span></span></a>
  <a href="#begrippen">${ICON.doc}<span><b>Begrippenlijst</b><span>bouwkundige vaktaal</span></span></a>
  <a href="#oefentoets">${ICON.clock}<span><b>Oefentoets</b><span>stel zelf een toets samen</span></span></a>
  <a href="#fouten">${ICON.x}<span><b>Fouten</b><span>${DB.errors.length} om te herhalen</span></span></a></div></section>`;
}

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

// ================= ZO LEER JE HIER =================
function viewMethod(el){
  el.innerHTML=`<header class="page-head"><h1>Zo leer je hier</h1><p class="lede">De app is ingericht volgens wat onderzoek zegt over effectief leren. Hieronder per principe wat het is en waar je het terugziet.</p></header>
  <div class="method">${[
  ['Jezelf overhoren','Iets actief ophalen uit je geheugen werkt beter dan herlezen, samenvatten of markeren. In een grote review van leertechnieken kregen overhoren en gespreid leren de hoogste beoordeling; herlezen en markeren de laagste.','Elk hoofdstuk draait om oefenen. Bij Formules kun je overhoren: de formule is verborgen en jij noemt hem eerst.'],
  ['Gespreid herhalen','Vaker kort leren met tijd ertussen werkt beter dan alles in één keer. Elke herhaling na een pauze maakt het geheugenspoor sterker.','De pagina Herhalen laat afgeronde stappen terugkomen na 1, 3, 7, 14 en 30 dagen. Fout? Dan begint de reeks opnieuw.'],
  ['Door elkaar oefenen','Wie verschillende soorten sommen door elkaar oefent, leert beter kiezen welke aanpak past. In een klasexperiment scoorden leerlingen met gemengde oefening 72% op een toets weken later, tegen 38% bij blok-voor-blok oefenen.','Herhalen, de oefentoets en "Vrij oefenen → Alles door elkaar" mengen de onderwerpen.'],
  ['Eerst een voorbeeld, dan steeds minder hulp','Beginners leren meer van het bestuderen van een uitgewerkt voorbeeld dan van direct zelf puzzelen. Daarna moet de hulp afnemen: wie het al kan, heeft er last van.','Elke nieuwe stap op niveau 1 en 2 begint met een uitgewerkt voorbeeld. Bij de eerste opgave daarna staat de eerste stap al klaar. Op HBO-start krijg je geen voorbeeld meer.'],
  ['Pas door als je het beheerst','Pas verder gaan als de basis zit, met directe feedback op elke fout, helpt vooral bij vakken die op elkaar voortbouwen zoals wiskunde.','Een stap is pas af na 3 keer goed; een fout kost een punt. Het volgende hoofdstuk gaat open als het basisniveau van het vorige af is.'],
  ['Klein beginnen','Een overvol scherm kost denkkracht die je niet aan de stof besteedt.','Elk onderdeel heeft een eigen pagina en op de oefenpagina staat de vraag bovenaan.']].map(([t,a,b],i)=>`<section class="mt"><span class="mt-n">${i+1}</span><div><h2>${t}</h2><p>${a}</p><p class="mt-app"><b>In de app:</b> ${b}</p></div></section>`).join('')}</div>
  <p class="muted small">Bronnen: Dunlosky e.a. (2013), samengevat door de <a href="https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html" target="_blank" rel="noopener">Association for Psychological Science</a> · <a href="https://www.learningscientists.org/blog/2021/10/28-1" target="_blank" rel="noopener">The Learning Scientists over interleaving</a> · <a href="https://en.wikipedia.org/wiki/Worked-example_effect" target="_blank" rel="noopener">worked-example effect en fading</a>.</p>`;
}

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

// ================= FOUTEN =================
function viewErrors(el){
  const list=DB.errors;
  el.innerHTML=`<header class="page-head"><div class="eyebrow">Hulp</div><h1>Fouten herhalen</h1><p class="lede">Opgaven die je niet in één keer goed had, komen hier terug. Maak je ze nu goed, dan verdwijnen ze van de lijst.</p></header>
  ${list.length?`<div class="errbar"><span><b>${list.length}</b> opgave${list.length===1?'':'n'} te gaan</span><button class="link" id="clearErr">Lijst leegmaken</button></div><div id="qhost"></div>`:`<div class="empty"><h2>Geen fouten om te herhalen</h2><p>Mooi zo. Ga verder met oefenen; opgaven die misgaan verschijnen vanzelf op deze lijst.</p><a class="btn primary" href="#start">Naar het overzicht</a></div>`}`;
  if(!list.length)return;
  $('#clearErr').onclick=e=>{const b=e.target;if(b.dataset.c){DB.errors=[];saveDB();refreshNav();viewErrors(el)}else{b.dataset.c=1;b.textContent='Zeker weten? Klik nogmaals';setTimeout(()=>{b.textContent='Lijst leegmaken';delete b.dataset.c},3000)}};
  const q={...list[0],fromErr:true};
  mountCard($('#qhost'),q,{mode:'practice',onResult:ok=>{
    record(q,ok);const i=DB.errors.findIndex(x=>x.eid===q.eid);
    if(i>=0){const it=DB.errors.splice(i,1)[0];if(!ok)DB.errors.push(it)}saveDB();refreshNav();
    $('.errbar span').innerHTML=`<b>${DB.errors.length}</b> opgave${DB.errors.length===1?'':'n'} te gaan`;
  },onNext:()=>viewErrors(el)});
}

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

// ================= START =================
function boot(){
  applyPref();buildNav();
  $('#menuBtn').onclick=()=>{const o=document.body.classList.toggle('nav-open');$('#menuBtn').setAttribute('aria-expanded',o)};
  $('#sideToggle').onclick=()=>{PREF.side=!PREF.side;savePref();applyPref()};
  $('#themeBtn').onclick=e=>{e.stopPropagation();openCalc(false);toggleTheme()};
  document.addEventListener('click',e=>{const p=$('#themePop');if(!p.hidden&&!p.contains(e.target)&&!e.target.closest('#themeBtn'))toggleTheme(false)});
  $('#tsearch').addEventListener('submit',e=>{e.preventDefault();FSEARCH=$('#tsearchIn').value;FLVL=0;if(location.hash==='#formules')viewFormulas($('#main'));else location.hash='#formules';$('#tsearchIn').value=''});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();$('#tsearchIn').focus()}});
  $('#resetBtn').onclick=e=>{const b=e.currentTarget;if(b.dataset.c){DB=freshDB();saveDB();Object.keys(PS).forEach(k=>delete PS[k]);buildNav();route();b.textContent='Voortgang wissen';delete b.dataset.c;toast('Voortgang gewist')}else{b.dataset.c=1;b.textContent='Klik nogmaals om alles te wissen';setTimeout(()=>{if(b.dataset.c){b.textContent='Voortgang wissen';delete b.dataset.c}},3500)}};
  window.addEventListener('hashchange',route);setupCalc();route();cloudInit();
}
if(typeof document!=='undefined')boot();

// ================= WEBVERSIE: eigen accounts via Firebase (vervangt de Claude-opslag) =================
CLOUD_TXT.loggedout='Niet ingelogd';CLOUD_TXT.noconfig='Online opslaan niet ingesteld';CLOUD_TXT.ok='Opgeslagen in je account';

function cloudInit(){
  const start=()=>{
    if(!window.FB){setCloud('noconfig');return}
    FB.onAuth(async u=>{
      if(u){
        if(DB.owner&&DB.owner!==u.uid){DB=freshDB();try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}}
        CLOUD.uid=u.uid;CLOUD.name=u.displayName||(u.email||'').split('@')[0];CLOUD.email=u.email||'';CLOUD.avatar=u.photoURL||'';CLOUD.err='';
        CLOUD.ref={get:async()=>{const s=await FB.get(u.uid);return {exists:s.exists(),data:()=>s.data()}},set:d=>FB.set(u.uid,d)};
        CLOUD.ready=false;setCloud('connecting');await cloudSync(true);
        if(DB.owner!==u.uid){DB.owner=u.uid;try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}}
        if(location.hash==='#account')route();else{buildNav();if(!location.hash||location.hash==='#start')route()}
      }else{CLOUD.uid=null;CLOUD.ref=null;CLOUD.name='';CLOUD.email='';CLOUD.avatar='';CLOUD.ready=false;setCloud('loggedout');if(location.hash==='#account')route()}
    });
    document.addEventListener('visibilitychange',()=>{if(!CLOUD.ref)return;if(document.visibilityState==='hidden'){clearTimeout(CLOUD.timer);cloudFlush()}else if(CLOUD.ready&&!CLOUD.dirty&&!CLOUD.busy)cloudSync(false)});
  };
  if('FB' in window)start();else window.addEventListener('fb-ready',start,{once:true});
}
const fbErr=e=>{const c=(e&&e.code)||'';return {
  'auth/invalid-email':'Dit e-mailadres klopt niet.','auth/missing-password':'Vul een wachtwoord in.','auth/weak-password':'Kies een wachtwoord van minstens 6 tekens.',
  'auth/email-already-in-use':'Er bestaat al een account met dit e-mailadres. Log in.','auth/invalid-credential':'E-mailadres of wachtwoord klopt niet.',
  'auth/user-not-found':'Geen account gevonden met dit e-mailadres.','auth/wrong-password':'Wachtwoord klopt niet.','auth/too-many-requests':'Te veel pogingen. Probeer het over een paar minuten opnieuw.',
  'auth/popup-closed-by-user':'Inloggen met Google is afgebroken.','auth/unauthorized-domain':'Dit adres staat nog niet bij de toegestane domeinen in Firebase.','auth/network-request-failed':'Geen internetverbinding.'}[c]||('Er ging iets mis'+(c?` (${c})`:'')+'.')};
function acctStateHtml(){const ok=['ok','pending','saving'].includes(CLOUD.st);
  if(!window.FB)return `<div class="acct-card"><h2>Online opslaan is nog niet ingesteld</h2><p>Je voortgang wordt nu alleen in deze browser bewaard. Vul <code>firebase-config.js</code> in om accounts aan te zetten (zie de README).</p></div>`;
  if(!CLOUD.uid)return `<div class="acct-card"><h2>Inloggen of account maken</h2><p>Met een account wordt je voortgang online bewaard en kun je verder op je telefoon, laptop of een computer op school.</p>
  <form id="lgForm" class="lg-form" autocomplete="on"><label>E-mailadres<input type="email" id="lgMail" autocomplete="email" required></label><label>Wachtwoord<input type="password" id="lgPass" autocomplete="current-password" minlength="6" required></label>
  <div class="lg-acts"><button class="btn primary" type="submit" data-act="in">Inloggen</button><button class="btn ghost" type="button" data-act="up">Account maken</button></div></form>
  <div class="lg-or"><span>of</span></div><button class="btn ghost lg-google" type="button" id="lgGoogle"><svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z"/></svg>Inloggen met Google</button>
  <button class="link" type="button" id="lgReset">Wachtwoord vergeten?</button><p class="small" id="lgMsg" role="status"></p></div>`;
  return `<div class="acct-card"><div class="ac-top">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av lg" referrerpolicy="no-referrer">`:`<span class="acct-av lg ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<div><h2>${esc(CLOUD.name||'Mijn profiel')}</h2><p class="muted small" style="margin:0 0 2px">${esc(CLOUD.email)}</p><p class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]}${CLOUD.saved&&ok?` · laatst ${new Date(CLOUD.saved).toLocaleString('nl-NL',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}`:''}</p></div></div>
  ${CLOUD.err?`<p class="warnline">${esc(CLOUD.err)}</p>`:''}<p>Je voortgang, instellingen en fouten worden automatisch opgeslagen in je account. Alleen jij kunt ze zien.</p>
  <div class="lk-acts" style="justify-content:flex-start">${ok?'<button class="btn ghost sm" id="acNow">Nu opslaan</button>':''}<button class="btn ghost sm" id="acOut">Uitloggen</button></div></div>`}
function bindAcct(){
  const now=$('#acNow');if(now)now.onclick=()=>{CLOUD.dirty=true;cloudFlush()};
  const out=$('#acOut');if(out)out.onclick=async()=>{clearTimeout(CLOUD.timer);if(CLOUD.dirty)await cloudFlush();await FB.signOut()};
  const f=$('#lgForm');if(!f)return;const msg=t=>{$('#lgMsg').textContent=t};
  const go=async act=>{const m=$('#lgMail').value.trim(),p=$('#lgPass').value;if(!m||!p){msg('Vul je e-mailadres en wachtwoord in.');return}msg(act==='up'?'Account maken…':'Inloggen…');
    try{if(act==='up')await FB.signUp(m,p);else await FB.signIn(m,p)}catch(e){msg(fbErr(e))}};
  f.onsubmit=e=>{e.preventDefault();go('in')};$('[data-act="up"]',f).onclick=()=>go('up');
  $('#lgGoogle').onclick=async()=>{msg('');try{await FB.google()}catch(e){msg(fbErr(e))}};
  $('#lgReset').onclick=async()=>{const m=$('#lgMail').value.trim();if(!m){msg('Vul eerst je e-mailadres in.');return}try{await FB.reset(m);msg('Je krijgt een e-mail om een nieuw wachtwoord in te stellen.')}catch(e){msg(fbErr(e))}};
}
function setCloud(st){CLOUD.st=st;renderAcctChip();if(location.hash==='#account'){const s=$('#acctState');if(s&&!(s.contains(document.activeElement)&&document.activeElement.tagName==='INPUT')){s.innerHTML=acctStateHtml();bindAcct()}}}
function renderAcctChip(){const el=$('#acctChip');if(!el)return;const ok=CLOUD.st==='ok'||CLOUD.st==='pending'||CLOUD.st==='saving';
  el.innerHTML=`<a href="#account" class="acct${location.hash==='#account'?' on':''}">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av" referrerpolicy="no-referrer">`:`<span class="acct-av ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<span class="acct-t"><b></b><span class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]||''}</span></span></a>`;
  $('b',el).textContent=CLOUD.uid?(CLOUD.name||'Mijn profiel'):'Inloggen'}
function viewAccount(el){
  const st=DB.total?`${N(DB.total)} opgaven gemaakt · ${MODS.filter(m=>modDone(m.id)).length} van ${MODS.length} hoofdstukken af · ${(DB.days||[]).length} dag${(DB.days||[]).length===1?'':'en'} geoefend`:'Nog niets gemaakt.';
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Account</p><h1>Mijn profiel</h1><p class="lede">${st}</p></header>
  <div id="acctState">${acctStateHtml()}</div>
  <section><div class="sec-head"><h2>Op je telefoon gebruiken</h2></div><ol class="steps plain"><li>Open deze website op je telefoon.</li><li>Log in met hetzelfde account; je voortgang wordt automatisch geladen.</li><li>Kies in Safari of Chrome <b>Zet op beginscherm</b>: dan staat de app als icoon tussen je apps.</li></ol></section>
  <section><div class="sec-head"><h2>Back-up</h2></div><p class="muted">Een back-up is een bestand met al je voortgang, als extra zekerheid.</p>
  <div class="lk-acts" style="justify-content:flex-start"><button class="btn ghost" id="bkDown">Back-up downloaden</button><label class="btn ghost" for="bkFile">Back-up terugzetten</label><input type="file" id="bkFile" accept="application/json,.json" hidden></div><p class="muted small" id="bkMsg"></p></section>`;
  bindAcct();
  $('#bkDown').onclick=()=>{const data=JSON.stringify({app:'bouwwiskunde',v:1,ts:Date.now(),db:DB,pref:PREF},null,1);try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download=`bouwwiskunde-backup-${today()}.json`;document.body.appendChild(a);a.click();a.remove()}catch(e){$('#bkMsg').textContent='Downloaden lukt hier niet.'}};
  $('#bkFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const j=JSON.parse(rd.result);if(j.app!=='bouwwiskunde'||!j.db)throw 0;DB=Object.assign(freshDB(),j.db);if(CLOUD.uid)DB.owner=CLOUD.uid;if(j.pref){PREF=Object.assign(PREF,j.pref);savePref();applyPref()}saveDB();Object.keys(PS).forEach(k=>delete PS[k]);toast('Back-up teruggezet');route()}catch(err){$('#bkMsg').textContent='Dit is geen geldig back-upbestand.'}};rd.readAsText(f)};
}

