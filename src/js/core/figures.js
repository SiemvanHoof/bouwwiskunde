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

