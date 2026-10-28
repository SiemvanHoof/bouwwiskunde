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

