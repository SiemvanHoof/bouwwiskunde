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

