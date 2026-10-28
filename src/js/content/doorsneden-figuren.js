// ================= GETEKENDE DOORSNEDEN MET LABELS =================
const BF={};let TFIG={};
(function(){
const lab=(x,y,t,anchor)=>`<text x="${x}" y="${y}" class="lab"${anchor?` text-anchor="${anchor}"`:''}>${t}</text>`;
const lead=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="lead"/><circle cx="${x1}" cy="${y1}" r="2.2" class="dot"/>`;
const pats=p=>`<defs>
<pattern id="${p}h" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" class="hatch"/></pattern>
<pattern id="${p}b" width="14" height="10" patternUnits="userSpaceOnUse"><rect width="14" height="10" class="c-brick"/><path d="M0 0H14M0 5H14M4 0V5M11 5V10" class="joint"/></pattern>
<pattern id="${p}w" width="16" height="10" patternUnits="userSpaceOnUse"><path d="M0 5 Q4 0 8 5 T16 5" class="wave"/></pattern>
<pattern id="${p}d" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" class="dotfill"/></pattern>
<pattern id="${p}z" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1" class="dotfill"/><circle cx="7" cy="8" r="1" class="dotfill"/></pattern>
<marker id="${p}a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="arrowhead"/></marker></defs>`;
const svg=(w,h,body,label)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
const fig=(s,cap)=>`<figure class="bfig"><div class="bfig-scroll">${s}</div><p class="bfig-hint">← schuif de tekening opzij voor alle labels →</p><figcaption>${cap}</figcaption></figure>`;

// 1. Spouwmuur
BF.spouw=fig(svg(500,300,pats('sp')+`
${lab(8,26,'BINNEN')}${lab(300,290,'BUITEN')}
<rect x="54" y="50" width="6" height="210" class="c-light ln"/>
<rect x="60" y="50" width="60" height="210" fill="url(#sph)" class="ln"/>
<rect x="120" y="50" width="70" height="210" class="c-ins ln"/><rect x="120" y="50" width="70" height="210" fill="url(#spw)"/>
<rect x="190" y="50" width="24" height="210" class="c-air"/>
<rect x="214" y="50" width="56" height="210" fill="url(#spb)" class="ln"/>
<line x1="90" y1="150" x2="242" y2="150" class="anchor"/>
<rect x="214" y="246" width="56" height="10" class="c-air ln"/>
${lead(90,70,310,62)}${lab(316,66,'Binnenblad (kalkzandsteen)')}
${lead(155,100,310,96)}${lab(316,100,'Isolatie (minerale wol)')}
${lead(202,130,310,130)}${lab(316,134,'Luchtspouw ±40 mm')}
${lead(180,150,310,164)}${lab(316,168,'Spouwanker (RVS)')}
${lead(242,200,310,198)}${lab(316,202,'Buitenblad (baksteen)')}
${lead(242,251,310,234)}${lab(316,238,'Open stootvoeg')}
${lead(57,230,30,270)}${lab(10,284,'Stucwerk')}
<line x1="54" y1="40" x2="270" y2="40" class="dim" marker-start="url(#spa)" marker-end="url(#spa)"/>${lab(162,34,'± 400 mm','middle')}`,'Doorsnede van een spouwmuur'),'Horizontale doorsnede van een spouwmuur in een nieuwbouwwoning, van binnen naar buiten.');

// 2. Zadeldak
BF.zadeldak=fig(svg(500,320,pats('zd')+`
<polygon points="70,190 230,50 390,190" class="c-light ln"/>
<polygon points="60,198 230,48 400,198 392,198 230,58 68,198" class="c-roof"/>
<rect x="88" y="190" width="14" height="110" fill="url(#zdh)" class="ln"/><rect x="358" y="190" width="14" height="110" fill="url(#zdh)" class="ln"/>
<rect x="88" y="182" width="16" height="8" class="c-wood ln"/><rect x="356" y="182" width="16" height="8" class="c-wood ln"/>
<rect x="150" y="116" width="10" height="10" class="c-wood ln"/><rect x="300" y="116" width="10" height="10" class="c-wood ln"/>
<rect x="88" y="296" width="284" height="8" class="c-con ln"/>
<path d="M56 200 h14 v8 h-14z" class="c-metal ln"/>

${lead(230,52,300,24)}${lab(306,28,'Nok')}
${lead(310,100,360,78)}${lab(366,82,'Dakvlak met pannen')}
${lead(305,121,400,120)}${lab(406,124,'Gording')}
${lead(364,186,420,170)}${lab(406,166,'Muurplaat','start')}
${lead(62,204,40,226)}${lab(4,240,'Dakvoet + goot')}
${lead(95,262,50,276)}${lab(4,290,'Binnenblad')}
${lead(230,300,230,316)}${lab(238,316,'Verdiepingsvloer')}
<path d="M200 190 A 30 30 0 0 0 ${200-30*Math.cos(Math.PI/180*41)} ${190-30*Math.sin(Math.PI/180*41)}" class="dim"/>`,'Doorsnede van een zadeldak'),'Dwarsdoorsnede van een zadeldak met gordingen op de woningscheidende wanden.');

// 3. Plat dak: warm en omgekeerd
const layer=(x,y,w,h,cls,fill)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls} ln"${fill?` fill="${fill}"`:''}/>`;
BF.platdak=fig(svg(460,250,pats('pd')+`
${lab(20,24,'Warm dak')}
${layer(20,40,170,6,'c-dark')}${layer(20,46,170,40,'c-ins')}<rect x="20" y="46" width="170" height="40" fill="url(#pdw)"/>${layer(20,86,170,3,'c-metal')}${layer(20,89,170,40,'c-con','url(#pdd)')}
${lead(190,43,215,40)}${lab(220,44,'Dakbedekking (bitumen/EPDM)')}
${lead(190,66,215,64)}${lab(220,68,'Isolatie (PIR)')}
${lead(190,87,215,88)}${lab(220,92,'Dampremmer')}
${lead(190,110,215,112)}${lab(220,116,'Betonvloer')}
${lab(20,152,'Omgekeerd dak')}
${layer(20,166,170,10,'c-light','url(#pdz)')}${layer(20,176,170,30,'c-ins2')}${layer(20,206,170,6,'c-dark')}${layer(20,212,170,30,'c-con','url(#pdd)')}
${lead(190,171,215,168)}${lab(220,172,'Ballast (grind of tegels)')}
${lead(190,191,215,192)}${lab(220,196,'Isolatie (XPS)')}
${lead(190,209,215,216)}${lab(220,220,'Dakbedekking')}
${lead(190,230,215,240)}${lab(220,244,'Betonvloer')}`,'Opbouw van een warm dak en een omgekeerd dak'),'Bij een warm dak ligt de isolatie onder de dakbedekking, bij een omgekeerd dak erboven.');

// 4. Kozijn
BF.kozijn=fig(svg(490,300,pats('kz')+`
<rect x="60" y="30" width="200" height="230" class="c-wood ln"/>
<rect x="74" y="44" width="172" height="60" class="c-glass ln"/>
<rect x="60" y="104" width="200" height="12" class="c-wood ln"/>
<rect x="74" y="116" width="80" height="130" class="c-glass ln"/>
<rect x="154" y="116" width="12" height="144" class="c-wood ln"/>
<rect x="170" y="120" width="72" height="122" class="c-wood2 ln"/><rect x="178" y="128" width="56" height="106" class="c-glass ln"/>
<path d="M178 128 L234 181 L178 234" class="hinge"/>
<path d="M50 260 h220 l8 10 h-236z" class="c-metal ln"/>
${lead(160,36,300,30)}${lab(306,34,'Bovendorpel')}
${lead(140,110,300,66)}${lab(306,70,'Tussendorpel')}
${lead(110,74,300,100)}${lab(306,104,'Bovenlicht (vast glas)')}
${lead(160,200,300,140)}${lab(306,144,'Tussenstijl')}
${lead(210,170,300,178)}${lab(306,182,'Draaiend deel (draai-kiep)')}
${lead(66,180,30,190)}${lab(4,206,'Stijl')}
${lead(150,256,300,224)}${lab(306,228,'Onderdorpel')}
${lead(260,266,300,262)}${lab(306,266,'Waterslag')}`,'Aanzicht van een raamkozijn met onderdelen'),'Aanzicht van een raamkozijn van buitenaf. De lijnen in het draaiende deel wijzen naar de scharnierkant.');

// 5. Funderingen
const soil=(x,clay,t1,t2)=>`<rect x="${x}" y="70" width="140" height="${clay}" class="c-clay"/><rect x="${x}" y="${70+clay}" width="140" height="${230-clay}" class="c-sand"/><rect x="${x}" y="${70+clay}" width="140" height="${230-clay}" fill="url(#fdz)"/><rect x="${x}" y="70" width="140" height="230" class="none ln"/>${lab(x+70,22,t1,'middle')}${lab(x+70,40,t2,'middle')}`;
BF.fundering=fig(svg(480,330,pats('fd')+`
${soil(10,14,'Op staal','zand ligt hoog')}
<rect x="72" y="52" width="16" height="42" fill="url(#fdh)" class="ln"/><rect x="52" y="94" width="56" height="18" class="c-con ln"/>
${soil(170,130,'Op palen','slappe grond')}
<rect x="232" y="52" width="16" height="28" fill="url(#fdh)" class="ln"/><rect x="218" y="80" width="44" height="20" class="c-con ln"/>
<rect x="226" y="100" width="10" height="150" class="c-con ln"/><rect x="244" y="100" width="10" height="150" class="c-con ln"/>
${soil(330,40,'Plaatfundering','(verbeterde) grond')}
<rect x="356" y="52" width="14" height="22" fill="url(#fdh)" class="ln"/><rect x="430" y="52" width="14" height="22" fill="url(#fdh)" class="ln"/>
<rect x="346" y="74" width="108" height="16" class="c-con ln"/>
${lab(80,320,'strook op zand','middle')}${lab(240,320,'palen tot in het zand','middle')}${lab(400,320,'één betonplaat','middle')}
${lab(176,86,'klei/veen')}${lab(176,226,'zand')}`,'Drie funderingstypen'),'Fundering op staal (links), op palen (midden) en een plaatfundering (rechts). Bruin is slappe klei of veen, geel is draagkrachtig zand.');

// 6. Krachtsafdracht
const arr=(x1,y1,x2,y2,p)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="force" marker-end="url(#${p}a)"/>`;
BF.krachten=fig(svg(540,320,pats('ka')+`
<polygon points="90,90 230,20 370,90" class="c-light ln"/>
<rect x="90" y="90" width="14" height="190" fill="url(#kah)" class="ln"/><rect x="356" y="90" width="14" height="190" fill="url(#kah)" class="ln"/>
<rect x="104" y="176" width="252" height="10" class="c-con ln"/>
<rect x="80" y="280" width="34" height="18" class="c-con ln"/><rect x="346" y="280" width="34" height="18" class="c-con ln"/>
<rect x="92" y="298" width="10" height="22" class="c-con ln"/><rect x="358" y="298" width="10" height="22" class="c-con ln"/>
<rect x="200" y="150" width="40" height="26" class="c-wood ln"/>${lab(248,168,'kast')}
${arr(220,112,220,146,'ka')}${arr(200,181,124,181,'ka')}${arr(240,181,336,181,'ka')}
${arr(97,190,97,272,'ka')}${arr(363,190,363,272,'ka')}${arr(97,300,97,318,'ka')}
${arr(205,36,114,82,'ka')}${arr(255,36,346,82,'ka')}
${lab(390,60,'1  dak → muren')}${lab(390,140,'2  last op vloer')}${lab(390,170,'3  vloer → wanden')}${lab(390,230,'4  wanden → fundering')}${lab(390,300,'5  palen → zand')}`,'Krachtsafdracht door een woning'),'Elke belasting volgt een doorgaande weg naar de grond: van dak en vloer via de dragende wanden naar de fundering en de palen.');

// 7. Trap
BF.trap=fig(svg(500,300,pats('tr')+`
<rect x="30" y="250" width="440" height="10" class="c-con ln"/><rect x="236" y="70" width="200" height="12" class="c-con ln"/>
${Array.from({length:8},(_,i)=>`<rect x="${40+i*28}" y="${250-(i+1)*22.5}" width="${28*(8-i)}" height="22.5" class="c-wood ln"/>`).join('')}
<line x1="22" y1="227.5" x2="22" y2="250" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(6,244,'o')}
<line x1="40" y1="215" x2="68" y2="215" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(48,209,'a')}
<line x1="456" y1="82" x2="456" y2="250" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(464,170,'h')}
<line x1="40" y1="276" x2="236" y2="276" class="dim" marker-start="url(#tra)" marker-end="url(#tra)"/>${lab(138,292,'traplengte = (n − 1) × a','middle')}
<line x1="40" y1="236" x2="236" y2="78" class="klim"/>
${lab(270,120,'o = optrede (≤ 188 mm)')}${lab(270,142,'a = aantrede (≥ 220 mm)')}${lab(270,164,'h = verdiepingshoogte')}${lab(270,186,'2o + a ≈ 630 mm')}${lab(270,208,'n = aantal optredes (hier 8)')}`,'Doorsnede van een rechte trap'),'Een rechte trap met 8 optredes en 7 treden: de bovenste optrede komt uit op de verdiepingsvloer.');

// 8. Ventilatiesystemen A–D
const house=(x,t,inMech,outMech,p)=>`<g transform="translate(${x},0)"><polygon points="10,70 60,35 110,70" class="c-light ln"/><rect x="10" y="70" width="100" height="90" class="c-surface ln"/>
${inMech?`<circle cx="22" cy="115" r="9" class="fan"/><path d="M22 106v18M13 115h18" class="fanx"/>`:`<path d="M10 108 h8 M10 114 h8 M10 120 h8" class="grille"/>`}
<line x1="-14" y1="115" x2="8" y2="115" class="air" marker-end="url(#${p}a)"/>
${outMech?`<circle cx="92" cy="54" r="9" class="fan"/><path d="M92 45v18M83 54h18" class="fanx"/>`:`<path d="M86 50 h12 v-12" class="grille"/>`}
<line x1="98" y1="40" x2="114" y2="18" class="air" marker-end="url(#${p}a)"/>
${lab(60,186,t,'middle')}${lab(60,204,inMech?'toevoer: mechanisch':'toevoer: natuurlijk','middle')}${lab(60,220,outMech?'afvoer: mechanisch':'afvoer: natuurlijk','middle')}</g>`;
BF.ventilatie=fig(svg(560,232,pats('vs')+house(20,'Systeem A',0,0,'vs')+house(155,'Systeem B',1,0,'vs')+house(290,'Systeem C',0,1,'vs')+house(425,'Systeem D (+ WTW)',1,1,'vs'),'Ventilatiesystemen A tot D'),'Ventilatiesystemen: een rooster staat voor natuurlijke luchtstroom, een ventilator voor mechanische.');

// 9. Stabiliteit
const frame=(x,inner,t)=>`<g transform="translate(${x},0)"><rect x="10" y="40" width="110" height="110" class="none"/><line x1="10" y1="150" x2="10" y2="40" class="beam"/><line x1="120" y1="150" x2="120" y2="40" class="beam"/><line x1="10" y1="40" x2="120" y2="40" class="beam"/><line x1="0" y1="150" x2="130" y2="150" class="ground"/>${inner}${lab(65,176,t,'middle')}</g>`;
BF.stabiliteit=fig(svg(460,200,pats('st')+`<line x1="10" y1="30" x2="40" y2="30" class="force" marker-end="url(#sta)"/>${lab(10,22,'wind')}`
+frame(20,`<line x1="10" y1="40" x2="120" y2="150" class="brace"/><line x1="120" y1="40" x2="10" y2="150" class="brace"/>`,'Windverband')
+frame(170,`<path d="M10 52 L22 40 M108 40 L120 52" class="stiff"/><circle cx="10" cy="40" r="5" class="stiffj"/><circle cx="120" cy="40" r="5" class="stiffj"/>`,'Portaal (stijve hoeken)')
+frame(320,`<rect x="10" y="40" width="110" height="110" class="c-con" fill="url(#sth)"/>`,'Stabiliteitswand (schijf)'),'Drie manieren om een gebouw stabiel te maken'),'Zonder stabiliteitselement klapt een raamwerk met scharnieren om bij wind. Een windverband, stijve hoeken of een stijve wand houdt het recht.');

// figuren in de lessen zetten
const putFig=(mod,sub,key)=>{const m=MOD[mod];if(!m)return;const t=m.theory.find(x=>x.sub===sub);if(t&&BF[key])t.h=BF[key]+t.h};
putFig('bouwdelen','gevel','spouw');putFig('bouwdelen','dak','zadeldak');putFig('bouwdelen','openingen','kozijn');putFig('bouwdelen','onderbouw','fundering');
putFig('bouwmethoden','funderingen','fundering');putFig('bouwmethoden','daken','platdak');putFig('constructie','krachtsafdracht','krachten');
putFig('constructie','stabiliteit','stabiliteit');putFig('veiligheid','trapbbl','trap');putFig('installsys','klimaat','ventilatie');putFig('details','aansluitingen','spouw');
// figuur per begrip (getoond in de detailweergave)
TFIG={'Spouwmuur':'spouw','Binnenblad':'spouw','Buitenblad':'spouw','Spouwanker':'spouw','Luchtspouw':'spouw','Open stootvoeg':'spouw',
'Nok':'zadeldak','Dakvoet':'zadeldak','Muurplaat':'zadeldak','Gording':'zadeldak','Zadeldak':'zadeldak',
'Warm dak':'platdak','Omgekeerd dak':'platdak','Plat dak':'platdak',
'Kozijn':'kozijn','Stijl':'kozijn','Onderdorpel':'kozijn','Bovendorpel':'kozijn','Tussendorpel':'kozijn','Draaiend deel':'kozijn','Waterslag':'kozijn',
'Fundering':'fundering','Fundering op staal':'fundering','Strokenfundering':'fundering','Plaatfundering':'fundering','Paalfundering':'fundering','Heipaal':'fundering',
'Krachtsafdracht':'krachten','Draagconstructie':'krachten','Dragende wand':'krachten',
'Stabiliteit':'stabiliteit','Windverband':'stabiliteit','Portaal':'stabiliteit','Stabiliteitswand':'stabiliteit','Schijfwerking':'stabiliteit',
'Klimlijn':'trap','Trapleuning':'trap',
'Ventilatiesysteem A':'ventilatie','Ventilatiesysteem B':'ventilatie','Ventilatiesysteem C':'ventilatie','Ventilatiesysteem D':'ventilatie','Warmteterugwinning (WTW)':'ventilatie','WTW':'ventilatie'};
})();

