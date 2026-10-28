// ================= VAKKEN =================
// volgorde = volgorde waarin je het leert: eerst rekenen, dan wat erop voortbouwt
const SUBJECTS=[
  {id:'g-wiskunde',name:'Rekenen en wiskunde',cats:[
    {name:'Rekenen',mods:['basis','rekenen','eenheden','schatten','machten','schaal']},
    {name:'Algebra en formules',mods:['algebra','lineair','kwadratisch']},
    {name:'Meetkunde en goniometrie',mods:['meetkunde','gonio']},
    {name:'Statistiek',mods:['statistiek']},
    {name:'Functies voor het HBO',mods:['explog','afgeleide']}]},
  {id:'g-bouwkunde',name:'Bouwkunde',cats:[
    {name:'Bouwtechniek',mods:['bouwdelen','materialen','constructie','bouwmethoden','details']},
    {name:'Ontwerp en tekenen',mods:['tekeningen','architectuur','bim','stedenbouw']},
    {name:'Bouwproces',mods:['bouwproces','uitvoering']},
    {name:'Regelgeving en duurzaamheid',mods:['regels','veiligheid','duurzaam']},
    {name:'Bestaande bouw',mods:['bestaand']}]},
  {id:'g-natuurkunde',name:'Natuurkunde en constructie',cats:[
    {name:'Natuurkunde',mods:['natuurkunde','warmte']},
    {name:'Mechanica en sterkte',mods:['mechanica','sterkte']}]},
  {id:'g-bouwfysica',name:'Bouwfysica en installaties',cats:[
    {name:'Bouwfysica',mods:['bfbegrip','bouwfysica','lichtlucht','geluid']},
    {name:'Installaties',mods:['installsys','installaties']}]},
  {id:'g-economie',name:'Bouweconomie',cats:[
    {name:'Calculatie',mods:['calculatie']},
    {name:'Kosten en financiering',mods:['economie']}]}];
SUBJECTS.forEach(S=>{S.cats.forEach(c=>c.mods=c.mods.filter(id=>MOD[id]));S.mods=S.cats.flatMap(c=>c.mods)});
MODS.forEach(m=>{if(!SUBJECTS.some(S=>S.mods.includes(m.id))){const S=SUBJECTS[1];S.cats[0].mods.push(m.id);S.mods.push(m.id)}});
// leerroute per vak in menuvolgorde: elk vak een eigen keten, eerste hoofdstuk vrij
(()=>{const PF={'g-bouwkunde':'B','g-wiskunde':'W','g-natuurkunde':'N','g-bouwfysica':'F','g-economie':'E'};
  const ord=SUBJECTS.map(S=>S.id);
  ord.forEach(g=>{const S=SUBJECTS.find(x=>x.id===g);S.mods.forEach((id,i)=>{const m=MOD[id];m.code=PF[g]+'-'+String(i+1).padStart(2,'0');m.prev=i?S.mods[i-1]:null})});
  const flat=ord.flatMap(g=>SUBJECTS.find(x=>x.id===g).mods);MODS.sort((a,b)=>flat.indexOf(a.id)-flat.indexOf(b.id))})();
const catOf=id=>{for(const S of SUBJECTS)for(const c of S.cats)if(c.mods.includes(id))return c;return {name:''}};
const tabsFor=m=>[['uitleg','Uitleg'],['formules',m.terms?'Begrippen':'Formules'],['oefenen','Oefenen'],...((CASES[m.id]||[]).length?[['praktijk','Praktijk']]:[])];
const nextOf=m=>MODS.find(x=>x.prev===m.id);
const subjectOf=id=>SUBJECTS.find(s=>s.mods.includes(id));

