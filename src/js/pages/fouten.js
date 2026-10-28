// ================= FOUTEN =================
function viewErrors(el){
  const list=DB.errors;
  el.innerHTML=`<header class="page-head"><div class="eyebrow">Hulp</div><h1>Fouten herhalen</h1><p class="lede">Opgaven die je niet in één keer goed had, komen hier terug. Maak je ze nu goed, dan verdwijnen ze van de lijst.</p></header>
  ${list.length?`<div class="errbar"><span><b>${list.length}</b> opgave${list.length===1?'':'n'} te gaan</span><button class="link" id="clearErr">Lijst leegmaken</button></div><div id="qhost"></div>`:`<div class="empty"><h2>Geen fouten om te herhalen</h2><p>Mooi zo. Ga verder met oefenen; opgaven die misgaan verschijnen vanzelf op deze lijst.</p><a class="btn primary" href="#start">Naar het overzicht</a></div>`}`;
  if(!list.length)return;
  $('#clearErr').onclick=e=>{const b=e.target;if(b.dataset.c){DB.errors=[];saveDB();refreshNav();viewErrors(el)}else{b.dataset.c=1;b.textContent='Zeker weten? Klik nogmaals';setTimeout(()=>{b.textContent='Lijst leegmaken';delete b.dataset.c},3000)}};
  const q={...list[0],fromErr:true};
  mountCard($('#qhost'),q,{mode:'practice',onResult:ok=>{
    record(q,ok);const i=DB.errors.findIndex(x=>x.eid===q.eid);
    if(i>=0){const it=DB.errors.splice(i,1)[0];if(!ok)DB.errors.push(it)}saveDB();refreshNav();
    $('.errbar span').innerHTML=`<b>${DB.errors.length}</b> opgave${DB.errors.length===1?'':'n'} te gaan`;
  },onNext:()=>viewErrors(el)});
}

