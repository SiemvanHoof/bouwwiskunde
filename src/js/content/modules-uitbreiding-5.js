// ================= UITBREIDING 5: beroepen en vervolgstudies =================
(function(){
const T=(ch,sub)=>({id:sub,name:TERMSUB[sub],gen:genTerm(ch,sub)});
const tt=(ch,sub)=>`<div class="termlist">${TERMS[ch][sub].map(([t,d,x,v])=>`<div class="tl-row"><b>${t}</b><span>${d}${x?`<em class="tl-x">${x}</em>`:''}${v?`<em class="tl-x tl-v"><b>Voorbeeld:</b> ${v}</em>`:''}</span></div>`).join('')}</div>`;

addSub('beroepen','ber-ontwerp','Ontwerp en advies',[
['Bouwkundig tekenaar','Werkt een ontwerp uit tot technische tekeningen met maatvoering en details, in een CAD- of BIM-programma, waarmee gebouwd kan worden.'],
['BIM-modelleur','Bouwt en beheert het 3D-bouwwerkinformatiemodel en controleert het op botsingen, bijvoorbeeld tussen constructie en installaties.'],
['Bouwkundig ontwerper','Vertaalt een programma van eisen naar een ontwerp: plattegronden, gevels en doorsneden.'],
['Interieurarchitect','Ontwerpt de indeling en afwerking van de binnenruimte: materialen, licht, akoestiek en meubilair.'],
['Architect','Ontwerpt gebouwen van schets tot definitief ontwerp. De titel is wettelijk beschermd: inschrijving in het Architectenregister vereist meestal een wo-master Architectuur plus een beroepservaringperiode.'],
['Bouwfysisch adviseur','Rekent aan isolatie, daglicht, ventilatie, geluid en oververhitting en adviseert hoe een ontwerp aan de eisen voldoet.'],
['Constructeur','Berekent of een draagconstructie sterk en stijf genoeg is en bepaalt de afmetingen van kolommen, balken en funderingen; vaak met een aanvullende constructieve leerlijn of master.'],
['Installatieadviseur','Ontwerpt en berekent installaties voor verwarming, ventilatie, elektra en sanitair, afgestemd op het bouwkundig ontwerp.']
],[
['Je wilt vooral rekenen of een balk sterk genoeg is en hoe groot de kolommen moeten zijn. Welk beroep past het best?','Constructeur',['Interieurarchitect','Werkvoorbereider','Facilitair manager']],
['Je werkt in een 3D-model en controleert of een leidingbundel en een balk elkaar niet kruisen. Wat doe je?','BIM-modelleren en een clashcontrole uitvoeren',['Een taxatie maken','Een bouwplanning maken','Een begroting opstellen']]
]);

addSub('beroepen','ber-voorbereiding','Voorbereiding en calculatie',[
['Werkvoorbereider','Maakt het ontwerp uitvoeringsgereed: werktekeningen, materiaalbestellingen en planningen, zodat de bouwplaats weet wat, hoe en wanneer.'],
['Calculator','Berekent vooraf wat een bouwproject gaat kosten, met hoeveelheden, eenheidsprijzen en normuren.'],
['Planner','Maakt en bewaakt de bouwplanning: welke activiteiten wanneer gebeuren en hoe ze op elkaar aansluiten.'],
['Inkoper bouw','Vraagt prijzen op bij leveranciers en onderaannemers en sluit contracten voor materiaal en werk.'],
['Detailleur','Werkt technische details uit, bijvoorbeeld een kozijnaansluiting, tot op het niveau waarop uitgevoerd kan worden.'],
['BIM-coördinator','Stemt de modellen van verschillende partijen op elkaar af en bewaakt de kwaliteit van het bouwwerkinformatiemodel.']
],[
['Je maakt een lijst van alle materialen en bestelt ze op tijd voordat de bouw begint. Welk beroep past hier het best bij?','Werkvoorbereider',['Uitvoerder','Taxateur','Interieurarchitect']],
['Je rekent uit hoeveel een nieuwbouwproject gaat kosten, op basis van hoeveelheden en eenheidsprijzen. Welk beroep is dit?','Calculator',['Projectontwikkelaar','Veiligheidskundige','Energieadviseur']]
]);

addSub('beroepen','ber-uitvoering','Uitvoering en projectmanagement',[
['Uitvoerder','Leidt het werk op de bouwplaats: stuurt vakmensen en onderaannemers aan en bewaakt planning, kwaliteit en veiligheid.'],
['Projectleider','Is verantwoordelijk voor het hele project: geld, tijd, kwaliteit en de samenwerking tussen opdrachtgever, ontwerpers en aannemer.'],
['Directievoerder','Controleert namens de opdrachtgever of de aannemer bouwt volgens het bestek en de tekeningen.'],
['Kwaliteitsborger','Onafhankelijke controleur die onder de Wet kwaliteitsborging (Wkb) tijdens de bouw toetst of het bouwwerk aan het Bbl voldoet.'],
['Veiligheidskundige','Zorgt dat op de bouwplaats volgens de Arbowetgeving veilig gewerkt wordt.'],
['Assistent-uitvoerder','Ondersteunt de uitvoerder; vaak de eerste functie op de bouwplaats na de opleiding.']
],[
['Je staat dagelijks op de bouwplaats en stuurt de vakmensen aan. Welk beroep past hier het best bij?','Uitvoerder',['Calculator','Taxateur','Bouwkundig tekenaar']],
['Je controleert namens de opdrachtgever of de aannemer volgens het bestek bouwt. Welke rol is dit?','Directievoerder',['Werkvoorbereider','BIM-coördinator','Facilitair manager']]
]);

addSub('beroepen','ber-beheer','Vastgoed, beheer en advies',[
['Vastgoedbeheerder','Beheert gebouwen namens de eigenaar: onderhoud, verhuur en waardebehoud.'],
['Bouwkundig inspecteur','Brengt de staat van een gebouw in kaart, bijvoorbeeld voor een aankoopkeuring of een onderhoudsplan.'],
['Taxateur bouwkundige staat','Bepaalt de waarde van een gebouw, mede op basis van de bouwkundige staat.'],
['Energieadviseur','Berekent en adviseert over de energieprestatie van een gebouw, bijvoorbeeld voor een BENG-berekening.'],
['Facilitair manager','Zorgt dat een gebouw goed functioneert voor de gebruikers: van onderhoud tot schoonmaak en beveiliging.'],
['Projectontwikkelaar','Initieert bouwprojecten: zoekt locaties, stelt een programma samen en regelt de haalbaarheid.'],
['Vergunningverlener','Beoordeelt namens de gemeente of een bouwplan aan het omgevingsplan en het Bbl voldoet.']
],[
['Je onderzoekt de bouwkundige staat van een bestaand pand voor een koper. Welk beroep past hier het best bij?','Bouwkundig inspecteur',['Projectontwikkelaar','Uitvoerder','Installatieadviseur']],
['Je zoekt een locatie, stelt een bouwprogramma samen en regelt de financiële haalbaarheid van een nieuw project. Welk beroep is dit?','Projectontwikkelaar',['Vastgoedbeheerder','Directievoerder','Bouwfysisch adviseur']]
]);

addSub('vervolgstudies','vs-hbo','HBO-masters (direct door)',[
['HBO-master','Verdiepende master die je vaak deeltijd naast je werk volgt, meestal 1 tot 2 jaar, direct toegankelijk met een hbo-bachelor.'],
['Master of Engineering','HBO-master die je technische en bouwkundige kennis verdiept, vaak met een afstudeeronderzoek in de praktijk.'],
['Master Vastgoed en Makelaardij','Verdieping in taxeren, beleggen in en beheren van vastgoed.'],
['Master Projectmanagement','Verdiept de vaardigheden om complexe bouwprojecten te leiden: teams aansturen, risico’s beheersen en samenwerkingsvormen kiezen.'],
['Master of Business Administration (MBA)','Algemene managementmaster, soms met een bouw- of vastgoedspecialisatie, gericht op leidinggeven en strategie.']
],[
['Je wilt na je bachelor blijven werken en er een verdiepende master naast doen, zonder eerst een schakelprogramma. Wat past het best?','Een hbo-master (deeltijd)',['Een wo-master via een pre-master','Een tweede bachelor','Een promotietraject']],
['Je wilt je verdiepen in taxeren en beleggen in vastgoed, naast je baan. Welke vervolgstudie past het best?','Master Vastgoed en Makelaardij',['Master Urbanism','Master Civil Engineering','Master Architecture']]
]);

addSub('vervolgstudies','vs-wo','WO-masters (via schakelprogramma)',[
['Pre-master / schakelprogramma','Overbruggingsprogramma van meestal een half tot heel jaar dat je volgt vóór een wo-master, omdat een hbo-bachelor qua niveau niet gelijk is aan een wo-bachelor.'],
['Master Architecture','Wo-master van twee jaar die, met een beroepservaringperiode erna, toegang geeft tot inschrijving als architect in het Architectenregister.'],
['Master Building Technology','Richt zich op de technische kant van gebouwen: constructie, bouwfysica en nieuwe bouwmethoden en materialen.'],
['Master Construction Management & Engineering','Combineert techniek met management: hoe je complexe bouwprojecten technisch én organisatorisch tot een goed einde brengt.'],
['Master Management in the Built Environment','Richt zich op de ontwikkeling, financiering en het management van vastgoed en gebiedsontwikkeling.'],
['Master Urbanism','Richt zich op het ontwerpen van openbare ruimte, wijken en steden, in plaats van één gebouw.'],
['Master Civil Engineering','Richt zich op infrastructuur en civiele constructies zoals bruggen, wegen en waterbouw, een stap verder dan bouwkunde alleen.']
],[
['Je wilt uiteindelijk de titel architect mogen voeren en je laten inschrijven in het Architectenregister. Welke vervolgstap hoort daarbij?','Een wo-master Architecture, gevolgd door een beroepservaringperiode',['Een hbo-master Vastgoed','Direct een MBA','Geen vervolgstudie nodig']],
['Je hbo-bachelor sluit qua niveau niet direct aan op een universitaire master. Wat volg je eerst?','Een pre-master of schakelprogramma',['Een tweede hbo-bachelor','Een stage van een jaar','Niets, je kunt direct instromen']]
]);

const NEW=[
{id:'beroepen',name:'Beroepen in de bouw',terms:'beroepen',blurb:'Wat kun je worden met een diploma HBO Bouwkunde? Van tekenen en calculeren tot uitvoeren, beheren en adviseren.',
 subs:[T('beroepen','ber-ontwerp'),T('beroepen','ber-voorbereiding'),T('beroepen','ber-uitvoering'),T('beroepen','ber-beheer')],
 theory:[
 {t:'Ontwerp en advies',sub:'ber-ontwerp',h:`<p>Een deel van de beroepen zit aan de voorkant van een project: het ontwerp bedenken, uitwerken en technisch doorrekenen. Je werkt hier veel samen met een architect, constructeur en installateur.</p>${tt('beroepen','ber-ontwerp')}`},
 {t:'Voorbereiding en calculatie',sub:'ber-voorbereiding',h:`<p>Voordat er gebouwd wordt, moet een ontwerp uitvoeringsgereed gemaakt worden: tekeningen, hoeveelheden, prijzen en planningen. Dit is vaak de eerste stap van ontwerp naar bouwplaats.</p>${tt('beroepen','ber-voorbereiding')}`},
 {t:'Uitvoering en projectmanagement',sub:'ber-uitvoering',h:`<p>Op en rond de bouwplaats gaat het om het echt realiseren van het gebouw: plannen, aansturen, controleren en bijsturen, binnen tijd, geld en kwaliteit.</p>${tt('beroepen','ber-uitvoering')}`},
 {t:'Vastgoed, beheer en advies',sub:'ber-beheer',h:`<p>Een gebouw staat er na oplevering nog lang: iemand moet het onderhouden, beheren, keuren of verder ontwikkelen. Ook hier liggen veel beroepen voor bouwkundigen.</p>${tt('beroepen','ber-beheer')}`}],
 formulas:[]},
{id:'vervolgstudies',name:'Vervolgstudies en masters',terms:'vervolgstudies',blurb:'Na je hbo-bachelor Bouwkunde kun je blijven leren: met een hbo-master naast je werk, of met een pre-master en een universitaire master.',
 subs:[T('vervolgstudies','vs-hbo'),T('vervolgstudies','vs-wo')],
 theory:[
 {t:'HBO-masters: direct door, vaak deeltijd',sub:'vs-hbo',h:`<p>Een hbo-master bouw je meestal direct op je hbo-bachelor, vaak in deeltijd naast een baan. Je verdiept je op één gebied, zoals techniek, vastgoed of management, en rondt af met een afstudeeronderzoek.</p>${tt('vervolgstudies','vs-hbo')}`},
 {t:'WO-masters: via een pre-master',sub:'vs-wo',h:`<p>Wil je naar een universitaire (wo-)master, bijvoorbeeld aan een technische universiteit, dan is een hbo-bachelor meestal niet direct genoeg: je volgt eerst een <b>pre-master</b> om op het juiste niveau te komen. Daarna duurt de master zelf meestal twee jaar. Bouwkundige wo-masters vind je vooral bij de faculteiten Bouwkunde/Built Environment van de technische universiteiten (zoals Delft, Eindhoven en Twente), elk met hun eigen tracks.</p>${tt('vervolgstudies','vs-wo')}
 <p class="muted small">Namen en toelatingseisen van opleidingen veranderen weleens; controleer bij een keuze altijd de actuele informatie van de universiteit zelf.</p>`}],
 formulas:[]}
];
NEW.forEach(m=>{MODS.push(m);MOD[m.id]=m});
const TG=['Begrip → omschrijving herkennen','Omschrijving → begrip noemen','Toepassen in een praktijksituatie'];
NEW.forEach(m=>{const tn=m.subs.map(s=>s.name);m.goals=[[TG[0],...tn],[TG[1]],[TG[2]]]});
})();
