// ================= NAVIGATIE =================
const ICON={
  lock:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  check:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  arrow:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  up:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 11l4-4 3 3 5-5M10 5h4v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  grid:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="9" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="9" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  doc:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.8h5.5L12.5 5v9.2H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 8h4.5M6 10.5h4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  clock:'<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3.2l2 1.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  redo:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12.5 6.5A5 5 0 1 0 13 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M13 3v3.6H9.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  fx:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 2.5c-1.5 0-2 1-2.3 2.5L5.8 13c-.3 1.4-.8 2-2 2M4.5 6.5h5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 9l3 4M13 9l-3 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  star:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  chev:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cal:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
};
function ring(p,size=40){const r=(size-6)/2,c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${size/2}" cy="${size/2}" r="${r}" class="ring-bg"/><circle cx="${size/2}" cy="${size/2}" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`}
function lvlBars(id){const m=MOD[id];const p=DB.path[id]?.i||0;const n=m.subs.length;return `<span class="lbars" aria-label="Niveaus">${[1,2,3].map(l=>{const f=Math.max(0,Math.min(1,(p-(l-1)*n)/n));return `<i title="Niveau ${l}: ${LVL[l]}"><b style="width:${f*100}%"></b></i>`}).join('')}</span>`}
function ago(ts){const s=(Date.now()-ts)/1000;if(s<60)return 'zojuist';if(s<3600)return `${Math.floor(s/60)} min geleden`;if(s<86400)return `${Math.floor(s/3600)} uur geleden`;return new Date(ts).toLocaleDateString('nl-NL',{day:'numeric',month:'short'})}
function logEv(kind,txt,extra){DB.log=DB.log||[];DB.log.unshift({ts:Date.now(),kind,txt,...(extra||{})});if(DB.log.length>40)DB.log.length=40}

// ---- voorkeuren: kleur, achtergrond, kolommen ----
// ---- voorkeuren: kleur, menu ----
const PKEY='bouwwiskunde-prefs';
let PREF=Object.assign({accent:'blauw',side:true,groups:{}},(()=>{try{return JSON.parse(localStorage.getItem(PKEY))||{}}catch(e){return {}}})());
PREF.groups=PREF.groups||{};
function savePref(){try{localStorage.setItem(PKEY,JSON.stringify(PREF))}catch(e){}if(typeof cloudQueue==='function')cloudQueue()}
const ACCENTS=[['blauw','Blauw'],['indigo','Indigo'],['groen','Groen'],['oranje','Oranje'],['grafiet','Grafiet']];
function applyPref(){const r=document.documentElement;if(PREF.accent==='blauw')delete r.dataset.accent;else r.dataset.accent=PREF.accent;
  $('#frame').classList.toggle('no-side',!PREF.side);$('#sideToggle').classList.toggle('on',!PREF.side)}
function setAccent(a){PREF.accent=a;savePref();applyPref()}
function renderThemePop(){const p=$('#themePop');
  p.innerHTML=`<div class="tp-h"><h2>Weergave</h2><button id="tpClose" aria-label="Sluiten">×</button></div>
  <div class="tp-sec"><div class="tp-l">Accentkleur</div><div class="tp-colors">${ACCENTS.map(([k,t])=>`<button class="tpc${PREF.accent===k?' on':''}" data-a="${k}"><i></i>${t}</button>`).join('')}</div></div>
  <div class="tp-sec"><div class="tp-row"><span>Menu tonen</span><button class="switch" role="switch" aria-checked="${PREF.side}" data-sw="side" aria-label="Menu tonen"></button></div></div>
  <p class="muted small">Licht of donker volgt de instelling van je apparaat.</p>`;
  $('#tpClose').onclick=()=>toggleTheme(false);
  $$('.tpc',p).forEach(b=>b.onclick=()=>{setAccent(b.dataset.a);renderThemePop()});
  $$('[data-sw]',p).forEach(b=>b.onclick=()=>{PREF[b.dataset.sw]=!PREF[b.dataset.sw];savePref();applyPref();renderThemePop()});
}
function toggleTheme(v){const p=$('#themePop');const open=v===undefined?p.hidden:v;if(open)renderThemePop();p.hidden=!open;$('#themeBtn').setAttribute('aria-expanded',open)}


