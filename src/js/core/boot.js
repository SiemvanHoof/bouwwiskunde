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

