// ================= ACCOUNT EN OPSLAG IN JE PROFIEL =================
// Inloggen gaat via je Claude-account. Je voortgang staat in een privé-document dat alleen jij kunt lezen.
const CLOUD={st:'connecting',uid:null,ref:null,name:'',avatar:'',ready:false,timer:null,busy:false,dirty:false,saved:0,err:''};
const hasProgress=d=>!!d&&((d.total||0)>0||Object.keys(d.path||{}).length>0||!!d.intake);
function cloudPayload(){
  const d=JSON.parse(JSON.stringify(DB));let body={v:1,ts:DB.ts||Date.now(),db:JSON.stringify(d),pref:JSON.stringify(PREF)};
  const size=()=>JSON.stringify(body).length;
  if(size()>240000){d.errors=(d.errors||[]).map(e=>{const c={...e};delete c.fig;return c});d.log=(d.log||[]).slice(0,30);body.db=JSON.stringify(d)}
  while(size()>240000&&(d.errors||[]).length){d.errors.pop();body.db=JSON.stringify(d)}
  return body}
function cloudQueue(){if(!CLOUD.ref)return;CLOUD.dirty=true;if(!CLOUD.ready)return;clearTimeout(CLOUD.timer);CLOUD.timer=setTimeout(cloudFlush,1500);setCloud('pending')}
async function cloudFlush(){
  if(!CLOUD.ref||!CLOUD.ready||!CLOUD.dirty)return;if(CLOUD.busy){clearTimeout(CLOUD.timer);CLOUD.timer=setTimeout(cloudFlush,800);return}
  CLOUD.busy=true;CLOUD.dirty=false;setCloud('saving');
  try{await CLOUD.ref.set(cloudPayload());CLOUD.saved=Date.now();setCloud('ok')}
  catch(e){const c=e&&e.code;if(c==='unavailable'){CLOUD.dirty=true;setTimeout(cloudFlush,2000+Math.random()*2000);setCloud('pending')}else if(c==='invalid_argument'||c==='not_granted'||c==='revoked'){CLOUD.ref=null;CLOUD.err='Opslaan in je account is hier niet toegestaan. Je voortgang staat alleen op dit apparaat.';setCloud('local')}else{CLOUD.err=(c==='quota_exceeded')?'Je opslag is vol. Wis oude fouten of je voortgang.':'Opslaan mislukt. Het wordt opnieuw geprobeerd.';CLOUD.dirty=true;setCloud('error')}}
  finally{CLOUD.busy=false}}
function adoptRemote(r){
  try{const d=JSON.parse(r.db);DB=Object.assign(freshDB(),d);DB.path=DB.path||{};DB.open=DB.open||{};DB.ts=r.ts;localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}
  try{if(r.pref){PREF=Object.assign({accent:'blauw',side:true,groups:{}},JSON.parse(r.pref));localStorage.setItem(PKEY,JSON.stringify(PREF));applyPref()}}catch(e){}
  Object.keys(PS).forEach(k=>delete PS[k]);
}
async function cloudSync(initial){
  if(!CLOUD.ref)return;
  try{const snap=await CLOUD.ref.get();const r=snap.exists?snap.data():null;
    if(r&&r.db&&(!hasProgress(DB)||(r.ts||0)>(initial?BOOT_TS:(DB.ts||0)))){if((r.ts||0)!==(DB.ts||0)){adoptRemote(r);route();if(!initial)toast('Je voortgang is bijgewerkt vanuit je account')}CLOUD.saved=r.ts||Date.now();CLOUD.ready=true;CLOUD.dirty=false;setCloud('ok')}
    else{CLOUD.ready=true;if(hasProgress(DB)&&(!r||(DB.ts||0)>(r.ts||0))){CLOUD.dirty=true;await cloudFlush()}else{CLOUD.saved=r?r.ts:0;setCloud('ok')}}
  }catch(e){CLOUD.ready=true;if(e&&e.code==='unavailable'&&initial){setTimeout(()=>cloudSync(true),2500);return}setCloud('error')}}
async function cloudInit(){
  if(!window.claude||typeof window.claude.use!=='function'){setCloud('local');return}
  try{const [user,db]=await Promise.all([window.claude.use('user'),window.claude.use('db')]);
    if(!user||!db){setCloud('local');return}
    const me=await user.me();CLOUD.uid=me.id;CLOUD.name=me.name||'';CLOUD.avatar=me.avatarUrl||'';
    if(!CLOUD.uid){setCloud('local');return}
    CLOUD.ref=db.doc('data/users/'+CLOUD.uid+'/voortgang');setCloud('connecting');
    await cloudSync(true);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){clearTimeout(CLOUD.timer);cloudFlush()}else if(CLOUD.ready&&!CLOUD.dirty&&!CLOUD.busy)cloudSync(false)});
  }catch(e){setCloud('local')}}
const CLOUD_TXT={connecting:'Verbinden met je account…',pending:'Wijzigingen worden opgeslagen…',saving:'Opslaan…',ok:'Opgeslagen in je account',local:'Alleen op dit apparaat',error:'Opslaan mislukt'};
function setCloud(st){CLOUD.st=st;const el=$('#acctChip');if(el)renderAcctChip();if(location.hash==='#account'){const s=$('#acctState');if(s){s.innerHTML=acctStateHtml();const b=$('#acNow');if(b)b.onclick=()=>{CLOUD.dirty=true;cloudFlush()}}}}
function renderAcctChip(){const el=$('#acctChip');if(!el)return;const ok=CLOUD.st==='ok'||CLOUD.st==='pending'||CLOUD.st==='saving';
  el.innerHTML=`<a href="#account" class="acct${location.hash==='#account'?' on':''}">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av">`:`<span class="acct-av ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<span class="acct-t"><b></b><span class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]}</span></span></a>`;
  $('b',el).textContent=CLOUD.name||(CLOUD.uid?'Mijn profiel':'Profiel')}
function acctStateHtml(){const ok=['ok','pending','saving'].includes(CLOUD.st);
  return `<div class="acct-card"><div class="ac-top">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av lg">`:`<span class="acct-av lg ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<div><h2>${esc(CLOUD.name||(CLOUD.uid?'Mijn profiel':'Niet ingelogd'))}</h2><p class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]}${CLOUD.saved&&ok?` · laatst ${new Date(CLOUD.saved).toLocaleString('nl-NL',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}`:''}</p></div></div>
  ${CLOUD.err?`<p class="warnline">${esc(CLOUD.err)}</p>`:''}
  ${CLOUD.uid?`<p>Je bent ingelogd met je Claude-account. Je voortgang, instellingen en fouten worden automatisch opgeslagen in je eigen profiel. Niemand anders kan ze zien, ook niet als je de link deelt.</p>${ok?'<div><button class="btn ghost sm" id="acNow">Nu opslaan</button></div>':''}`:`<p>Je bent nu niet ingelogd (of deze weergave heeft geen toegang tot opslag). Je voortgang staat dan alleen in deze browser. Open de app via de link terwijl je bent ingelogd op claude.ai om hem in je profiel op te slaan.</p>`}</div>`}
function viewAccount(el){
  const st=DB.total?`${N(DB.total)} opgaven gemaakt · ${MODS.filter(m=>modDone(m.id)).length} van ${MODS.length} hoofdstukken af · ${(DB.days||[]).length} dag${(DB.days||[]).length===1?'':'en'} geoefend`:'Nog niets gemaakt.';
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Account</p><h1>Mijn profiel</h1><p class="lede">${st}</p></header>
  <div id="acctState">${acctStateHtml()}</div>
  <section><div class="sec-head"><h2>Op een ander apparaat verder</h2></div><ol class="steps plain"><li>Open dezelfde link op je telefoon, laptop of een computer op school.</li><li>Log in op claude.ai met hetzelfde account.</li><li>Je voortgang wordt automatisch geladen. Werk je op twee apparaten, dan wint de laatst opgeslagen versie.</li></ol></section>
  <section><div class="sec-head"><h2>Back-up</h2></div><p class="muted">Een back-up is een bestand met al je voortgang. Handig als extra zekerheid of om over te zetten.</p>
  <div class="lk-acts" style="justify-content:flex-start"><button class="btn ghost" id="bkDown">Back-up downloaden</button><label class="btn ghost" for="bkFile">Back-up terugzetten</label><input type="file" id="bkFile" accept="application/json,.json" hidden></div><p class="muted small" id="bkMsg"></p></section>`;
  const now=$('#acNow');if(now)now.onclick=()=>{CLOUD.dirty=true;cloudFlush()};
  $('#bkDown').onclick=async()=>{const data=JSON.stringify({app:'bouwwiskunde',v:1,ts:Date.now(),db:DB,pref:PREF},null,1);const fn=`bouwwiskunde-backup-${today()}.json`;
    try{const dl=window.claude&&await window.claude.use('downloads');if(dl){await dl.save({filename:fn,data});$('#bkMsg').textContent='Back-up opgeslagen.';return}}catch(e){if(e&&e.code&&e.code!=='unavailable'){$('#bkMsg').textContent='Download geannuleerd.';return}}
    try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download=fn;document.body.appendChild(a);a.click();a.remove()}catch(e){$('#bkMsg').textContent='Downloaden lukt hier niet.'}};
  $('#bkFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const j=JSON.parse(rd.result);if(j.app!=='bouwwiskunde'||!j.db)throw 0;DB=Object.assign(freshDB(),j.db);if(j.pref){PREF=Object.assign(PREF,j.pref);savePref();applyPref()}saveDB();Object.keys(PS).forEach(k=>delete PS[k]);toast('Back-up teruggezet');route()}catch(err){$('#bkMsg').textContent='Dit is geen geldig back-upbestand.'}};rd.readAsText(f)};
}
