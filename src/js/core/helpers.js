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

