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

