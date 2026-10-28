// ================= WEBVERSIE: eigen accounts via Firebase (vervangt de Claude-opslag) =================
CLOUD_TXT.loggedout='Niet ingelogd';CLOUD_TXT.noconfig='Online opslaan niet ingesteld';CLOUD_TXT.ok='Opgeslagen in je account';

function cloudInit(){
  const start=()=>{
    if(!window.FB){setCloud('noconfig');updateGate();route();return}
    FB.onAuth(async u=>{
      if(u){
        if(DB.owner&&DB.owner!==u.uid){DB=freshDB();try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}}
        CLOUD.uid=u.uid;CLOUD.name=u.displayName||(u.email||'').split('@')[0];CLOUD.email=u.email||'';CLOUD.avatar=u.photoURL||'';CLOUD.err='';
        CLOUD.ref={get:async()=>{const s=await FB.get(u.uid);return {exists:s.exists(),data:()=>s.data()}},set:d=>FB.set(u.uid,d)};
        CLOUD.ready=false;setCloud('connecting');updateGate();await cloudSync(true);
        if(DB.owner!==u.uid){DB.owner=u.uid;try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}}
        updateGate();route();
      }else{CLOUD.uid=null;CLOUD.ref=null;CLOUD.name='';CLOUD.email='';CLOUD.avatar='';CLOUD.ready=false;setCloud('loggedout');updateGate()}
    });
    document.addEventListener('visibilitychange',()=>{if(!CLOUD.ref)return;if(document.visibilityState==='hidden'){clearTimeout(CLOUD.timer);cloudFlush()}else if(CLOUD.ready&&!CLOUD.dirty&&!CLOUD.busy)cloudSync(false)});
  };
  updateGate();
  if('FB' in window)start();else window.addEventListener('fb-ready',start,{once:true});
}
// ================= INLOGPOORT (verplicht inloggen voor je de app gebruikt) =================
function gateLoadingHtml(){
  return `<div class="gate-card"><div class="gate-brand"><span class="logo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 19L19 4v15z"/></svg></span><h1>Bouwwiskunde</h1></div><p class="lede">Laden…</p></div>`;
}
function gateFormHtml(){
  return `<div class="gate-card"><div class="gate-brand"><span class="logo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 19L19 4v15z"/></svg></span><h1>Bouwwiskunde</h1></div>
  <p class="lede">Log in of maak een account om te oefenen. Zo wordt je voortgang bewaard en kun je ook op een ander apparaat verdergaan.</p>
  <form id="gateForm" class="lg-form" autocomplete="on"><label>E-mailadres<input type="email" id="gateMail" autocomplete="email" required></label><label>Wachtwoord<input type="password" id="gatePass" autocomplete="current-password" minlength="6" required></label>
  <div class="lg-acts"><button class="btn primary" type="submit" data-act="in">Inloggen</button><button class="btn ghost" type="button" data-act="up">Account maken</button></div></form>
  <div class="lg-or"><span>of</span></div><button class="btn ghost lg-google" type="button" id="gateGoogle"><svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z"/></svg>Inloggen met Google</button>
  <button class="link" type="button" id="gateReset">Wachtwoord vergeten?</button><p class="small" id="gateMsg" role="status"></p></div>`;
}
function bindGate(){
  const f=$('#gateForm');if(!f)return;const msg=t=>{$('#gateMsg').textContent=t};
  const go=async act=>{const m=$('#gateMail').value.trim(),p=$('#gatePass').value;if(!m||!p){msg('Vul je e-mailadres en wachtwoord in.');return}msg(act==='up'?'Account maken…':'Inloggen…');
    try{if(act==='up')await FB.signUp(m,p);else await FB.signIn(m,p)}catch(e){msg(fbErr(e))}};
  f.onsubmit=e=>{e.preventDefault();go('in')};$('[data-act="up"]',f).onclick=()=>go('up');
  $('#gateGoogle').onclick=async()=>{msg('');try{await FB.google()}catch(e){msg(fbErr(e))}};
  $('#gateReset').onclick=async()=>{const m=$('#gateMail').value.trim();if(!m){msg('Vul eerst je e-mailadres in.');return}try{await FB.reset(m);msg('Je krijgt een e-mail om een nieuw wachtwoord in te stellen.')}catch(e){msg(fbErr(e))}};
}
function updateGate(){
  const ag=$('#authGate'),fr=$('#appShell');if(!ag||!fr)return;
  const unknown=!('FB' in window);
  const locked=!unknown&&!!window.FB&&!CLOUD.uid;
  ag.hidden=!(unknown||locked);fr.hidden=unknown||locked;
  if(unknown)ag.innerHTML=gateLoadingHtml();
  else if(locked){ag.innerHTML=gateFormHtml();bindGate()}
}
const fbErr=e=>{const c=(e&&e.code)||'';return {
  'auth/invalid-email':'Dit e-mailadres klopt niet.','auth/missing-password':'Vul een wachtwoord in.','auth/weak-password':'Kies een wachtwoord van minstens 6 tekens.',
  'auth/email-already-in-use':'Er bestaat al een account met dit e-mailadres. Log in.','auth/invalid-credential':'E-mailadres of wachtwoord klopt niet.',
  'auth/user-not-found':'Geen account gevonden met dit e-mailadres.','auth/wrong-password':'Wachtwoord klopt niet.','auth/too-many-requests':'Te veel pogingen. Probeer het over een paar minuten opnieuw.',
  'auth/popup-closed-by-user':'Inloggen met Google is afgebroken.','auth/unauthorized-domain':'Dit adres staat nog niet bij de toegestane domeinen in Firebase.','auth/network-request-failed':'Geen internetverbinding.'}[c]||('Er ging iets mis'+(c?` (${c})`:'')+'.')};
function acctStateHtml(){const ok=['ok','pending','saving'].includes(CLOUD.st);
  if(!window.FB)return `<div class="acct-card"><h2>Online opslaan is nog niet ingesteld</h2><p>Je voortgang wordt nu alleen in deze browser bewaard. Vul <code>firebase-config.js</code> in om accounts aan te zetten (zie de README).</p></div>`;
  if(!CLOUD.uid)return `<div class="acct-card"><h2>Inloggen of account maken</h2><p>Met een account wordt je voortgang online bewaard en kun je verder op je telefoon, laptop of een computer op school.</p>
  <form id="lgForm" class="lg-form" autocomplete="on"><label>E-mailadres<input type="email" id="lgMail" autocomplete="email" required></label><label>Wachtwoord<input type="password" id="lgPass" autocomplete="current-password" minlength="6" required></label>
  <div class="lg-acts"><button class="btn primary" type="submit" data-act="in">Inloggen</button><button class="btn ghost" type="button" data-act="up">Account maken</button></div></form>
  <div class="lg-or"><span>of</span></div><button class="btn ghost lg-google" type="button" id="lgGoogle"><svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z"/></svg>Inloggen met Google</button>
  <button class="link" type="button" id="lgReset">Wachtwoord vergeten?</button><p class="small" id="lgMsg" role="status"></p></div>`;
  return `<div class="acct-card"><div class="ac-top">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av lg" referrerpolicy="no-referrer">`:`<span class="acct-av lg ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<div><h2>${esc(CLOUD.name||'Mijn profiel')}</h2><p class="muted small" style="margin:0 0 2px">${esc(CLOUD.email)}</p><p class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]}${CLOUD.saved&&ok?` · laatst ${new Date(CLOUD.saved).toLocaleString('nl-NL',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}`:''}</p></div></div>
  ${CLOUD.err?`<p class="warnline">${esc(CLOUD.err)}</p>`:''}<p>Je voortgang, instellingen en fouten worden automatisch opgeslagen in je account. Alleen jij kunt ze zien.</p>
  <div class="lk-acts" style="justify-content:flex-start">${ok?'<button class="btn ghost sm" id="acNow">Nu opslaan</button>':''}<button class="btn ghost sm" id="acOut">Uitloggen</button></div></div>`}
function bindAcct(){
  const now=$('#acNow');if(now)now.onclick=()=>{CLOUD.dirty=true;cloudFlush()};
  const out=$('#acOut');if(out)out.onclick=async()=>{clearTimeout(CLOUD.timer);if(CLOUD.dirty)await cloudFlush();await FB.signOut()};
  const f=$('#lgForm');if(!f)return;const msg=t=>{$('#lgMsg').textContent=t};
  const go=async act=>{const m=$('#lgMail').value.trim(),p=$('#lgPass').value;if(!m||!p){msg('Vul je e-mailadres en wachtwoord in.');return}msg(act==='up'?'Account maken…':'Inloggen…');
    try{if(act==='up')await FB.signUp(m,p);else await FB.signIn(m,p)}catch(e){msg(fbErr(e))}};
  f.onsubmit=e=>{e.preventDefault();go('in')};$('[data-act="up"]',f).onclick=()=>go('up');
  $('#lgGoogle').onclick=async()=>{msg('');try{await FB.google()}catch(e){msg(fbErr(e))}};
  $('#lgReset').onclick=async()=>{const m=$('#lgMail').value.trim();if(!m){msg('Vul eerst je e-mailadres in.');return}try{await FB.reset(m);msg('Je krijgt een e-mail om een nieuw wachtwoord in te stellen.')}catch(e){msg(fbErr(e))}};
}
function setCloud(st){CLOUD.st=st;renderAcctChip();if(location.hash==='#account'){const s=$('#acctState');if(s&&!(s.contains(document.activeElement)&&document.activeElement.tagName==='INPUT')){s.innerHTML=acctStateHtml();bindAcct()}}}
function renderAcctChip(){const el=$('#acctChip');if(!el)return;const ok=CLOUD.st==='ok'||CLOUD.st==='pending'||CLOUD.st==='saving';
  el.innerHTML=`<a href="#account" class="acct${location.hash==='#account'?' on':''}">${CLOUD.avatar?`<img src="${esc(CLOUD.avatar)}" alt="" class="acct-av" referrerpolicy="no-referrer">`:`<span class="acct-av ph">${esc((CLOUD.name||'?')[0].toUpperCase())}</span>`}<span class="acct-t"><b></b><span class="acct-s ${ok?'ok':CLOUD.st==='error'?'err':''}"><i></i>${CLOUD_TXT[CLOUD.st]||''}</span></span></a>`;
  $('b',el).textContent=CLOUD.uid?(CLOUD.name||'Mijn profiel'):'Inloggen'}
function pwaInstallHtml(){
  if(isStandalone())return `<p class="okline">${ICON.check} Je gebruikt de app al geïnstalleerd op dit toestel.</p>`;
  if(PWA_PROMPT)return `<p>Zet de app als icoon op je scherm: werkt daarna ook offline en voelt als een echte app.</p><div class="lk-acts" style="justify-content:flex-start"><button class="btn primary" id="pwaInstallBtn">Installeer app</button></div>`;
  if(isIOS())return `<p>Op de iPhone/iPad kan dat niet met één knop, maar wel zo:</p><ol class="steps plain"><li>Open deze site in <b>Safari</b> (niet in Chrome/Instagram).</li><li>Tik op het deelicoon <span aria-hidden="true">⎋</span> onderin.</li><li>Kies <b>Zet op beginscherm</b>.</li></ol>`;
  return `<p>Open deze site in Chrome of Edge en kies in het browsermenu <b>App installeren</b> of <b>Zet op beginscherm</b>.</p>`;
}
function bindPwaInstall(){
  const b=$('#pwaInstallBtn');if(!b)return;
  b.onclick=async()=>{if(!PWA_PROMPT)return;PWA_PROMPT.prompt();await PWA_PROMPT.userChoice;PWA_PROMPT=null;if(location.hash==='#account')route()};
}
function viewAccount(el){
  const st=DB.total?`${N(DB.total)} opgaven gemaakt · ${MODS.filter(m=>modDone(m.id)).length} van ${MODS.length} hoofdstukken af · ${(DB.days||[]).length} dag${(DB.days||[]).length===1?'':'en'} geoefend`:'Nog niets gemaakt.';
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Account</p><h1>Mijn profiel</h1><p class="lede">${st}</p></header>
  <div id="acctState">${acctStateHtml()}</div>
  <section><div class="sec-head"><h2>App installeren</h2></div>${pwaInstallHtml()}
  <p class="muted small">Eenmaal geïnstalleerd werkt de app ook zonder internet en wordt hij vanzelf bijgewerkt zodra er een nieuwe versie online staat.</p></section>
  <section><div class="sec-head"><h2>Back-up</h2></div><p class="muted">Een back-up is een bestand met al je voortgang, als extra zekerheid.</p>
  <div class="lk-acts" style="justify-content:flex-start"><button class="btn ghost" id="bkDown">Back-up downloaden</button><label class="btn ghost" for="bkFile">Back-up terugzetten</label><input type="file" id="bkFile" accept="application/json,.json" hidden></div><p class="muted small" id="bkMsg"></p></section>`;
  bindAcct();bindPwaInstall();
  $('#bkDown').onclick=()=>{const data=JSON.stringify({app:'bouwwiskunde',v:1,ts:Date.now(),db:DB,pref:PREF},null,1);try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download=`bouwwiskunde-backup-${today()}.json`;document.body.appendChild(a);a.click();a.remove()}catch(e){$('#bkMsg').textContent='Downloaden lukt hier niet.'}};
  $('#bkFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const j=JSON.parse(rd.result);if(j.app!=='bouwwiskunde'||!j.db)throw 0;DB=Object.assign(freshDB(),j.db);if(CLOUD.uid)DB.owner=CLOUD.uid;if(j.pref){PREF=Object.assign(PREF,j.pref);savePref();applyPref()}saveDB();Object.keys(PS).forEach(k=>delete PS[k]);toast('Back-up teruggezet');route()}catch(err){$('#bkMsg').textContent='Dit is geen geldig back-upbestand.'}};rd.readAsText(f)};
}

