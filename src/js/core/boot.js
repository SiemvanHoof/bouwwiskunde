// ================= PWA: installeren op het toestel =================
let PWA_PROMPT=null;
const isStandalone=()=>(typeof window!=='undefined')&&(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true);
const isIOS=()=>typeof navigator!=='undefined'&&/iphone|ipad|ipod/i.test(navigator.userAgent||'')&&!window.MSStream;
if(typeof window!=='undefined'){
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();PWA_PROMPT=e;if(location.hash==='#account')route()});
  window.addEventListener('appinstalled',()=>{PWA_PROMPT=null;toast('App geïnstalleerd op dit toestel');if(location.hash==='#account')route()});
}

// ================= START =================
function boot(){
  applyPref();buildNav();
  $('#menuBtn').onclick=()=>{const o=document.body.classList.toggle('nav-open');$('#menuBtn').setAttribute('aria-expanded',o)};
  $('#sideToggle').onclick=()=>{PREF.side=!PREF.side;savePref();applyPref()};
  $('#themeBtn').onclick=e=>{e.stopPropagation();openCalc(false);toggleTheme()};
  document.addEventListener('click',e=>{const p=$('#themePop');if(!p.hidden&&!p.contains(e.target)&&!e.target.closest('#themeBtn'))toggleTheme(false)});
  $('#tsearch').addEventListener('submit',e=>{e.preventDefault();FSEARCH=$('#tsearchIn').value;FLVL=0;if(location.hash==='#formules')viewFormulas($('#main'));else location.hash='#formules';$('#tsearchIn').value=''});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();$('#tsearchIn').focus()}});
  $('#resetBtn').onclick=e=>{const b=e.currentTarget;if(b.dataset.c){DB=freshDB();saveDB();Object.keys(PS).forEach(k=>delete PS[k]);buildNav();route();b.textContent='Voortgang wissen';delete b.dataset.c;toast('Voortgang gewist')}else{b.dataset.c=1;b.textContent='Klik nogmaals om alles te wissen';setTimeout(()=>{if(b.dataset.c){b.textContent='Voortgang wissen';delete b.dataset.c}},3500)}};
  window.addEventListener('hashchange',route);setupCalc();cloudInit();
}
if(typeof document!=='undefined')boot();

