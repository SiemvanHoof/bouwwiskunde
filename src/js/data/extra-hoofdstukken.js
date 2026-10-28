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
// ---- extra oefenvragen: schatten, explog, warmte, sterkte, statistiek, calculatie, afgeleide ----
function genSchatDeel(l){
  if(l===1){const rb=pick([15,20,25,30,40,50]),q=R(8,40),a=rb*q+pick([-4,-3,-2,-1,1,2,3,4]);const right=N(q*rb);
    return {q:`Schat zonder rekenmachine:<div class="expr">${a} ÷ ${rb} ≈ ?</div>`,...mc(right,[N(q*rb*10),N(Math.round(q*rb/10)),N((q+5)*rb)]),hint:'Rond het deeltal af tot een rond veelvoud van de deler.',sol:steps([`${a} ≈ ${N(q*rb)} (= ${q} × ${rb})`,`${N(q*rb)} ÷ ${rb} = ${q}`,`Dus ${a} ÷ ${rb} ≈ ${q}`]),calc:false}}
  const plaat=pick([0.36,0.45,0.54,0.72,0.9]),wand=rnd(R(80,280)/10,1)*rnd(R(20,35)/10,1);const n=Math.round(wand/plaat);
  return {q:`Een wand van ongeveer <b>${N(Math.round(wand))} m²</b> wordt betegeld met tegels van <b>${N(plaat)} m²</b> per stuk. Welk aantal tegels is een realistische schatting?`,...mc(N(n),[N(Math.round(n/10)),N(n*10),N(Math.round(n*2.2))]),hint:'Rond het wandoppervlak en de plaatmaat af en deel.',sol:steps([`${N(Math.round(wand))} m² ÷ ${N(plaat)} m² per tegel ≈ ${n} tegels`,'Voor een echte bestelling tel je er nog verlies en snijwerk bij op.']),calc:false};
}
function genSchatControle(l){
  const cases=[
    ()=>{const L=rnd(R(30,80)/10,1),B=rnd(R(25,60)/10,1);const right=L*B;return {ctx:`Een kamer van ${N(L)} × ${N(B)} m.`,calc:`${N(L)} × ${N(B)} m²`,right};},
    ()=>{const b=pick([50,75,100,150,200]),h=pick([150,200,250,300]);const right=b*h*h/6;return {ctx:`Het weerstandsmoment van een balk ${b}×${h} mm.`,calc:`W = ${b} × ${h}² / 6, in mm³`,right};},
    ()=>{const kg=R(300,3000);const right=kg*10/1000;return {ctx:`De zwaartekracht op een massa van ${kg} kg (g ≈ 10 N/kg).`,calc:`F = m × g, in kN`,right};}
  ];
  const c=pick(cases)();const f=pick([1,1,10,0.1,100]);const shown=Math.round(c.right*f*1000)/1000;const ratio=shown/c.right;
  let verdict,opts;
  if(Math.abs(ratio-1)<0.05){verdict='Ja, dat klopt ongeveer';opts=['Nee, ongeveer een factor 10 te groot','Nee, ongeveer een factor 10 te klein','Nee, ongeveer een factor 100 te groot']}
  else if(Math.abs(ratio-10)<0.5){verdict='Nee, ongeveer een factor 10 te groot';opts=['Ja, dat klopt ongeveer','Nee, ongeveer een factor 10 te klein','Nee, ongeveer een factor 100 te groot']}
  else if(Math.abs(ratio-0.1)<0.01){verdict='Nee, ongeveer een factor 10 te klein';opts=['Ja, dat klopt ongeveer','Nee, ongeveer een factor 10 te groot','Nee, ongeveer een factor 100 te klein']}
  else {verdict='Nee, ongeveer een factor 100 te groot';opts=['Ja, dat klopt ongeveer','Nee, ongeveer een factor 10 te groot','Nee, ongeveer een factor 10 te klein']}
  return {q:`${c.ctx} Berekening: <b>${c.calc}</b>. Een rekenmachine (of iemand anders) geeft als antwoord <b>${N(shown)}</b>. Klopt dat ongeveer?`,...mc(verdict,opts),hint:'Schat de berekening zelf eerst grof en vergelijk met het gegeven antwoord.',sol:steps([`Eigen schatting: ongeveer ${N(c.right,2)}`,`Gegeven antwoord: ${N(shown)}`,verdict])};
}
function genDecibel(l){
  if(l===1){const n=pick([1,2,3]);const ratio=10**n,L=10*n;
    return {q:`Een geluidsbron is <b>${N(ratio)}</b> keer zo intensief als een referentiebron. Hoeveel decibel is dat? (L = 10 · log(I/I₀))`,type:'num',answer:L,unit:'dB',hint:'log van een macht van 10 is gewoon de exponent.',sol:steps([`L = 10 · log(${N(ratio)}) = 10 × ${n} = ${L} dB`]),calc:false}}
  if(l===2){const n=pick([1,2,3,4]),L=10*n;
    return {q:`Het geluidsniveau is <b>${L} dB</b> hoger dan een referentiebron. Hoeveel keer zo groot is de geluidsintensiteit dan?`,type:'num',answer:10**n,unit:'×',hint:'Werk L = 10 · log(I/I₀) om: I/I₀ = 10^(L/10).',sol:steps([`I/I₀ = 10^(${L}/10) = 10${sup(n)} = ${N(10**n)}`])}}
  const L1=pick([60,65,70,75,80]),L2=L1+pick([0,3,6,10]);const Ltot=10*Math.log10(10**(L1/10)+10**(L2/10));
  return {q:`Twee machines maken samen lawaai: de ene <b>${L1} dB</b>, de andere <b>${L2} dB</b> (ieder apart gemeten). Hoeveel dB is het samen, als je de intensiteiten optelt? (1 decimaal)`,type:'num',answer:Ltot,dec:1,unit:'dB',hint:'Decibellen tel je niet rechtstreeks op: reken eerst terug naar intensiteiten, tel die op en reken terug naar dB.',sol:steps([`I₁/I₀ = 10^(${L1}/10), I₂/I₀ = 10^(${L2}/10)`,`L = 10 · log(10^(${L1}/10) + 10^(${L2}/10)) = ${N(Ltot,2)} dB`,`Let op: nooit zomaar optellen — ${L1} + ${L2} = ${L1+L2} dB is fout.`])};
}
function genWarmteMeng(l){
  if(l<3){const m1=R(2,8),T1=R(60,90),m2=R(2,8),T2=R(5,20);const Tm=(m1*T1+m2*T2)/(m1+m2);
    return {q:`Je mengt <b>${m1} L water</b> van <b>${T1} °C</b> met <b>${m2} L water</b> van <b>${T2} °C</b>. Welke temperatuur krijgt het mengsel? (verlies naar de omgeving verwaarloosd, 1 decimaal)`,type:'num',answer:Tm,dec:1,unit:'°C',hint:'De warmte die het warme water afgeeft, neemt het koude water op: m₁(T₁ − T_m) = m₂(T_m − T₂).',sol:steps(['T_m = (m₁T₁ + m₂T₂) / (m₁ + m₂)',`T_m = (${m1}×${T1} + ${m2}×${T2}) / (${m1}+${m2}) = ${N(Tm,2)} °C`])}}
  const m1=R(3,10),T1=R(55,85),mat=pick([['beton',880,R(200,600)],['staal',460,R(80,250)]]);const [naam,c2,m2]=mat,T2=R(10,20);
  const Tm=(m1*4180*T1+m2*c2*T2)/(m1*4180+m2*c2);
  return {q:`<b>${m1} L</b> warm water van <b>${T1} °C</b> (c = 4180 J/(kg·K)) komt in contact met <b>${m2} kg ${naam}</b> van <b>${T2} °C</b> (c = ${c2} J/(kg·K)). Welke temperatuur ontstaat in evenwicht? (verlies verwaarloosd, 1 decimaal)`,type:'num',answer:Tm,dec:1,unit:'°C',hint:'De afgegeven warmte van het water is gelijk aan de opgenomen warmte van het materiaal: m₁c₁(T₁ − T_m) = m₂c₂(T_m − T₂).',sol:steps(['T_m = (m₁c₁T₁ + m₂c₂T₂) / (m₁c₁ + m₂c₂)',`T_m = (${m1}×4180×${T1} + ${m2}×${c2}×${T2}) / (${m1}×4180 + ${m2}×${c2}) = ${N(Tm,2)} °C`])};
}
function genSterkteSchaal(l){
  if(l<3){const f=pick([1.25,1.5,2,2.5,3]);const Wf=f*f,If=f*f*f;
    if(l===1)return {q:`Een balk wordt bij gelijke breedte <b>${N(f)}×</b> zo hoog gemaakt. Hoeveel keer zo groot wordt het weerstandsmoment W (en dus de sterkte)? (2 decimalen)`,type:'num',answer:Wf,dec:2,unit:'×',hint:'W = b·h²/6: bij gelijke b is W evenredig met h².',sol:steps(['W is evenredig met h²',`${N(f)}² = ${N(Wf,2)}×`])};
    return {q:`Een balk wordt bij gelijke breedte <b>${N(f)}×</b> zo hoog gemaakt. Hoeveel keer zo groot wordt het traagheidsmoment I (en dus de stijfheid)? (2 decimalen)`,type:'num',answer:If,dec:2,unit:'×',hint:'I = b·h³/12: bij gelijke b is I evenredig met h³.',sol:steps(['I is evenredig met h³',`${N(f)}³ = ${N(If,2)}×`])}}
  const b1=pick([75,100,150]),h1=pick([200,250,300]),b2=pick([75,100,150,200].filter(x=>x!==b1)),h2=pick([150,200,250,300].filter(x=>x!==h1));
  const W1=b1*h1*h1/6,W2=b2*h2*h2/6,ratio=W2/W1;
  return {q:`Doorsnede A is <b>${b1}×${h1} mm</b>, doorsnede B is <b>${b2}×${h2} mm</b> (b×h). Hoeveel keer zo groot is het weerstandsmoment van B ten opzichte van A? (2 decimalen)`,type:'num',answer:ratio,dec:2,unit:'×',hint:'Bereken W = b·h²/6 voor beide en deel ze door elkaar.',sol:steps([`W_A = ${b1}×${h1}²/6 = ${N(W1,0)} mm³`,`W_B = ${b2}×${h2}²/6 = ${N(W2,0)} mm³`,`W_B / W_A = ${N(ratio,3)}`])};
}
function genVariatiecoeff(l){
  if(l<3){const m=R(25,45),s=rnd(R(15,45)/10,1);const cv=s/m*100;
    return {q:`Een materiaal heeft een gemiddelde sterkte van <b>${m} N/mm²</b> met een standaardafwijking van <b>${N(s)} N/mm²</b>. Wat is de variatiecoëfficiënt (s / gemiddelde × 100%)? (1 decimaal)`,type:'num',answer:cv,dec:1,unit:'%',hint:'CV = s / x̄ × 100%',sol:steps([`CV = ${N(s)} / ${m} × 100% = ${N(cv,2)}%`])}}
  const mA=R(30,45),sA=rnd(R(20,40)/10,1),mB=R(15,28),sB=rnd(R(15,30)/10,1);
  const cvA=sA/mA*100,cvB=sB/mB*100,beter=cvA<cvB?'A':'B';
  return {q:`Leverancier A: gemiddeld ${mA} N/mm², s = ${N(sA)}. Leverancier B: gemiddeld ${mB} N/mm², s = ${N(sB)}. De gemiddelden verschillen, dus de standaardafwijkingen alleen vergelijken is niet eerlijk. Welke leverancier heeft relatief de minste spreiding (de laagste variatiecoëfficiënt)?`,...mc(`Leverancier ${beter}`,[`Leverancier ${beter==='A'?'B':'A'}`,'Beide zijn precies even consistent','Dat kun je niet bepalen zonder de losse meetwaarden']),hint:'Bereken voor beide CV = s / x̄ × 100% en vergelijk.',sol:steps([`CV_A = ${N(sA)} / ${mA} × 100% = ${N(cvA,2)}%`,`CV_B = ${N(sB)} / ${mB} × 100% = ${N(cvB,2)}%`,`Leverancier ${beter} heeft de laagste (beste) variatiecoëfficiënt.`])};
}
function genBTWCalc(l){
  if(l===1){const excl=rnd(R(200,8000)/10,1)*10;const incl=excl*1.21;
    return {q:`Een post in de begroting is <b>€ ${N(excl,2)}</b> exclusief btw. Wat is het bedrag inclusief 21% btw? (2 decimalen)`,type:'num',answer:incl,dec:2,unit:'€',unitPre:true,hint:'Incl. = excl. × 1,21',sol:steps([`€ ${N(excl,2)} × 1,21 = € ${N(incl,2)}`])}}
  if(l===2){const incl=rnd(R(300,12000)/10,1)*10;const excl=incl/1.21;
    return {q:`Een factuur van een onderaannemer is <b>€ ${N(incl,2)}</b> inclusief 21% btw. Wat was het bedrag exclusief btw? (2 decimalen)`,type:'num',answer:excl,dec:2,unit:'€',unitPre:true,hint:'Excl. = incl. ÷ 1,21 (niet × 0,79!)',sol:steps([`€ ${N(incl,2)} ÷ 1,21 = € ${N(excl,2)}`])}}
  const posts=Array.from({length:3},()=>rnd(R(500,4000)/10,1)*10);const som=posts.reduce((a,b)=>a+b,0);const incl=som*1.21;
  return {q:`Een begroting heeft drie posten exclusief btw: <b>${posts.map(p=>'€ '+N(p,2)).join(', ')}</b>. Wat is het totaal inclusief 21% btw? (2 decimalen)`,type:'num',answer:incl,dec:2,unit:'€',unitPre:true,hint:'Tel eerst de posten op, reken daarna pas de btw erbij.',sol:steps([`Som excl.: ${posts.map(p=>N(p,2)).join(' + ')} = € ${N(som,2)}`,`× 1,21 = € ${N(incl,2)}`])};
}
function genAfgHelling(l){
  if(l===1){const a=nz(-5,5),k=nz(-40,40);const x=k/(2*a);
    return {q:`Gegeven <span class="formula">f(x) = ${polyStr([a,0,0])}</span>. Bij welke x is de helling van de grafiek gelijk aan <b>${k}</b>? (2 decimalen)`,type:'num',answer:x,dec:2,hint:'Stel f′(x) gelijk aan de gevraagde helling en los op naar x.',sol:steps([`f′(x) = ${2*a}x`,`${2*a}x = ${k}`,`x = ${N(x,3)}`]),calc:false}}
  if(l===2){const a=nz(-4,4),b=nz(-8,8),c=R(-9,9),k=nz(-30,30);const x=(k-b)/(2*a);
    return {q:`Gegeven <span class="formula">f(x) = ${polyStr([a,b,c])}</span>. Bij welke x is f′(x) = <b>${k}</b>? (2 decimalen)`,type:'num',answer:x,dec:2,hint:'Bepaal eerst f′(x), stel die gelijk aan k en los de lineaire vergelijking op.',sol:steps([`f′(x) = ${polyStr([2*a,b])}`,`${2*a}x ${b>=0?'+':'−'} ${Math.abs(b)} = ${k}`,`x = (${k} ${b>=0?'−':'+'} ${Math.abs(b)}) / ${2*a} = ${N(x,3)}`]),calc:false}}
  const a=rnd(R(2,15)/10,1),b=R(5,25),v=R(20,120);const t=(v-b)/(2*a);
  return {q:`De afgelegde weg is <span class="formula">s(t) = ${N(a)}·t² + ${b}·t</span> (t in s, s in m). Bij welke t is de snelheid v(t) = s′(t) gelijk aan <b>${v} m/s</b>? (2 decimalen)`,type:'num',answer:t,dec:2,unit:'s',hint:'v(t) = s′(t) = 2·a·t + b. Stel gelijk aan de gevraagde snelheid.',sol:steps([`v(t) = ${N(2*a,2)}t + ${b}`,`${N(2*a,2)}t + ${b} = ${v}`,`t = (${v} − ${b}) / ${N(2*a,2)} = ${N(t,3)} s`])};
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

