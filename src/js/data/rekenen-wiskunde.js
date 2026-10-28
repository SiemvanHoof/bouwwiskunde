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

