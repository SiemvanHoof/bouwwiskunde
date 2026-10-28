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

