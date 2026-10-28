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
add('rekenen',{id:'verhouding',name:'Verhoudingen verdelen',gen:genVerhouding},{t:'Een geheel verdelen in een verhouding',h:`<p>Een verhouding zoals <b>2 : 3</b> verdeelt een geheel in gelijke "delen": 2 delen voor de één, 3 voor de ander, samen 5 delen.</p>
<ol class="steps plain"><li>Tel de delen van de verhouding bij elkaar op.</li><li>Deel het totaal (of de bekende hoeveelheid) door dat aantal delen.</li><li>Vermenigvuldig met het aantal delen dat je zoekt.</li></ol>
${ex('Voorbeeld',`<p>€ 400 verdelen in de verhouding 1 : 3: samen 4 delen, 400 ÷ 4 = 100 per deel → <b>€ 100</b> en <b>€ 300</b>.</p>`)}
<p>In de bouw: cement-zandverhoudingen in mortel, winstverdeling tussen vennoten, materiaalverdeling tussen onderaannemers.</p>`});
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
add('algebra',{id:'ongelijkheid',name:'Ongelijkheden oplossen',gen:genOngelijkheid},{t:'Ongelijkheden: <, >, ≤, ≥',h:`<p>Een ongelijkheid los je op zoals een vergelijking: doe links en rechts hetzelfde. Er is één belangrijk verschil:</p>
${pit('Vermenigvuldig of deel je met een <b>negatief</b> getal, dan draait het ongelijkheidsteken om: < wordt >, ≤ wordt ≥ (en omgekeerd).')}
${ex('Voorbeeld',`<p>−2x + 3 &lt; 11 → −2x &lt; 8 → (delen door −2, teken draait om) → x &gt; −4.</p>`)}
<p>Toepassing: vanaf welke hoeveelheid is een optie goedkoper, welke maten voldoen minimaal aan een eis.</p>`});
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
 subs:[{id:'dbsom',name:'Decibellen optellen',gen:genDbOptellen},{id:'dbafstand',name:'Geluid en afstand',gen:genDbAfstand},{id:'rv',name:'Relatieve vochtigheid',gen:genRV},{id:'dauw',name:'Dauwpunt',gen:genDauw},{id:'wering',name:'Geluidwering',gen:genGeluidwering}],
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
 <p>Daarom zijn koudebruggen en enkel glas berucht: daar condenseert vocht en groeit schimmel.</p>`},
 {t:'Geluidwering tussen ruimtes',sub:'wering',h:`<p>Een scheidingswand of -vloer dempt geluid met zijn <b>geluidsisolatie R<sub>w</sub></b> (in dB): hoe hoger R<sub>w</sub>, hoe minder er doorkomt.</p>
 <div class="formula-box">L<sub>ontvangst</sub> ≈ L<sub>zender</sub> − R<sub>w</sub></div>
 <p>Het Bbl stelt eisen aan de geluidwering tussen woningen (scheidingswanden en -vloeren tussen verblijfsgebieden). Een voorzetwand of extra isolatielaag verhoogt R<sub>w</sub>, maar niet altijd lineair — reken in oefeningen hier vereenvoudigd mee.</p>`}],
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
rekenen:[['Rekenen met negatieve getallen','Volgorde van bewerkingen','Breuken met gelijke noemers, percentages','Verhouding in 2 delen'],['Gelijknamig maken, btw berekenen','Procentuele verandering','Gewogen gemiddelde','Verhouding uit een bekend deel'],['Delen door breuken, gemengde getallen','Terugrekenen van inclusief naar exclusief','Opeenvolgende procentuele veranderingen','Verhouding in 3 delen']],
eenheden:[['Lengte-eenheden omrekenen (mm–m)','m³ ↔ liter','kg → N met g = 10'],['Oppervlakte- en inhoudsfactoren','Snelheid en debiet','N/mm², kN/m², MPa'],['Mm-maten → m² en m³','Eigen gewicht in kN','Samengestelde eenheden (m³/h → L/s, km/h → m/s)']],
machten:[['Machten en wortels uit je hoofd','Machten van 10'],['Rekenregels voor machten','Negatieve exponenten','Wetenschappelijke notatie'],['Gebroken exponenten','Wortels vereenvoudigen','Terugrekenen met ∛ en √(4A/π)']],
schaal:[['Tekenmaat ↔ werkelijke maat op 1:100','Rechte evenredigheid'],['Andere schalen, schaal bepalen','Omgekeerde evenredigheid','Mengverhoudingen'],['Oppervlakte op schaal (n²)','Water-cementfactor','Meerstaps verhoudingen']],
meetkunde:[['Omtrek en oppervlak van rechthoek en driehoek','Inhoud van een balk','Pythagoras: schuine zijde'],['Cirkel, trapezium, maten in mm','Betonvolumes','Gevels met openingen'],['L-vormen en samengestelde figuren','Cilinders, ruimtediagonaal','Rondbogen, haaksheid controleren']],
natuurkunde:[['ρ = m/V','Druk p = F/A','Arbeid W = F·s'],['Massa uit volume en dichtheid','Waterdruk p = ρgh','Zwaarte-energie, vermogen'],['Massa per meter van profielen','Opwaartse waterdruk op kelders','Rendement, kWh en kosten']],
algebra:[['Formules invullen','Eenvoudige vergelijkingen','Haakjes wegwerken a(b+c)','Formules met × en ÷ omwerken','Eenvoudige ongelijkheid (positief getal)'],['Vergelijkingen met x aan beide kanten','(a+b)(c+d)','Stelsels door substitutie'],['Merkwaardige producten','Formules met wortels en kwadraten omwerken','Stelsels door eliminatie','Ongelijkheid: teken draait om bij een negatief getal']],
lineair:[['y = ax + b invullen','Richtingscoëfficiënt uit twee punten','Afschot in %','Optrede berekenen'],['Vergelijking oplossen met een lineaire formule','Afschot → mm','Minimaal aantal optredes','Interpoleren'],['Snijpunt van lijnen, b berekenen','Afschot 1:n','Stapmaatregel','Interpoleren met 3 decimalen']],
gonio:[['sin en cos met de schuine zijde','tan met twee rechthoekszijden','Hoekensom 180°'],['Inverse functies voor hoeken','Sparlengte','Sinusregel'],['Alle combinaties SOS-CAS-TOA','Helling % ↔ graden','Cosinusregel']],
kwadratisch:[['x² = c, product = 0','Discriminant uitrekenen','Top van een parabool (x)'],['Ontbinden met product-som','Aantal oplossingen','y-top'],['abc-formule','Parameter bij D = 0','Toepassingen met paden en bogen']],
mechanica:[['Krachten op één lijn','σ = F/A','M = F·a','q × L','Gronddruk q/b'],['Resultante van loodrechte krachten','Ronde kolommen','Hefboom','Oplegreacties','Lijnlast uit vloerlast'],['Kracht ontbinden','Kolom dimensioneren','Meerdere lasten','M = ⅛qL²','Poer dimensioneren']],
installaties:[['U = I·R','P = U·I','kWh berekenen','Q = V/t'],['I en R uitrekenen','Stroom van een apparaat','Energiekosten','Q = A·v'],['Serie en parallel','Groepsbelasting t.o.v. 16 A','COP warmtepomp','Leidingdiameter bepalen']],
bouwfysica:[['R = d/λ','Rc door optellen','U = 1/R','ΔT'],['Benodigde dikte','U met Rsi en Rse','Isolatie voor een Rc-eis','Φ = U·A·ΔT'],['Rc met spouw','U uit lagen','Gevel met glas','Oppervlaktetemperatuur']],
geluid:[['Twee gelijke bronnen +3 dB','−6 dB per verdubbeling','RV = pw/psat','Dauwpunt aflezen','Geluidwering: L − Rw'],['n bronnen: +10·log n','20·log(r₂/r₁)','pw uit RV','Dauwpunt interpoleren','Benodigde Rw bij een eis'],['Ongelijke bronnen','Lijnbron','RV na afkoeling: condens?','Condensatierisico','Rw met een voorzetwand']],
economie:[['Prijs per m²','Opslag algemene kosten','Enkelvoudige rente','Lineaire afschrijving'],['Raming met kengetal','Gestapelde opslagen','Samengestelde rente','Boekwaarde'],['GO/BVO','Volledige begroting tot m²-prijs','Contante waarde','Degressieve afschrijving']]};
MODS.forEach(m=>m.goals=G[m.id]||[[],[],[]]);
})();

