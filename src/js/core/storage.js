// ================= OPSLAG =================
const KEY='bouwwiskunde-v1';
function loadDB(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&typeof d==='object')return d}catch(e){}return null}
const freshDB=()=>({mods:{},days:[],errors:[],total:0,correct:0,intake:null,tests:[],path:{},open:{},pathV:2,daily:{},log:[]});
let DB=Object.assign(freshDB(),loadDB()||{});const BOOT_TS=DB.ts||0;DB.path=DB.path||{};DB.open=DB.open||{};
function saveDB(){DB.ts=Date.now();try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(e){}if(typeof cloudQueue==='function')cloudQueue()}
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function record(q,ok){
  const m=DB.mods[q.mod]||(DB.mods[q.mod]={hist:[],n:0,c:0,subs:{}});
  m.hist.push([q.lvl,ok?1:0]);if(m.hist.length>20)m.hist.shift();
  m.n++;if(ok)m.c++;
  const s=m.subs[q.sub]||(m.subs[q.sub]={n:0,c:0});s.n++;if(ok)s.c++;
  DB.total++;if(ok)DB.correct++;
  const dd=DB.daily||(DB.daily={});const tk=today();(dd[tk]||(dd[tk]={n:0,c:0})).n++;if(ok)dd[tk].c++;
  logEv('ans',`${MOD[q.mod]?MOD[q.mod].code:''} · ${q.subName||''}`,{ok:!!ok});
  const t=today();if(!DB.days.includes(t)){DB.days.push(t);if(DB.days.length>400)DB.days.shift()}
  if(!ok&&!q.fromErr){const copy={...q};delete copy.fromErr;copy.eid=Date.now()+'-'+Math.random().toString(36).slice(2,6);DB.errors.unshift(copy);if(DB.errors.length>50)DB.errors.pop()}
  saveDB();refreshNav();renderRail();
}
// ---- leerpad: per blad eerst alle onderdelen op niveau 1, dan niveau 2, dan niveau 3 ----
const PER_STEP=3;
const pathSteps=m=>{const o=[];[1,2,3].forEach(l=>m.subs.forEach(s=>o.push({l,s})));return o};
const prog=id=>DB.path[id]||(DB.path[id]={i:0,c:0});
(function migrate(){if(DB.pathV>=2)return;const old={basis:5,rekenen:4,eenheden:5,machten:4,schaal:4,meetkunde:4,algebra:4,lineair:4,gonio:3,kwadratisch:4,mechanica:5,bouwfysica:5};
  Object.entries(DB.path).forEach(([id,p])=>{if(!MOD[id]||!old[id])return;const n=MOD[id].subs.length,o=old[id];const l=Math.floor(p.i/o),r=p.i%o;p.i=Math.min(3*n,l*n+r)});DB.pathV=2;saveDB()})();
function mastery(id){const m=MOD[id];const tot=m.subs.length*3*PER_STEP;const p=DB.path[id];if(!p)return 0;return Math.round(Math.min(tot,p.i*PER_STEP+p.c)/tot*100)}
const levelDone=(id,l)=>(DB.path[id]?.i||0)>=MOD[id].subs.length*l;
const curLevel=id=>{const p=DB.path[id]?.i||0;return Math.min(3,Math.floor(p/MOD[id].subs.length)+1)};
const modDone=id=>levelDone(id,3);
function unlocked(id){const m=MOD[id];return !m||!m.prev||DB.open[id]||levelDone(m.prev,1)||(DB.path[id]?.i||0)>0||(DB.path[id]?.c||0)>0}
function status(id){if(modDone(id))return['good','Afgerond'];if(!unlocked(id))return['lock','Op slot'];const p=DB.path[id];if(!p||(p.i===0&&p.c===0))return['nieuw','Nieuw'];return['mid',`Niveau ${curLevel(id)}`]}
function streak(){const set=new Set(DB.days);let d=new Date();let n=0;if(!set.has(today()))d.setDate(d.getDate()-1);
  for(;;){const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;if(set.has(k)){n++;d.setDate(d.getDate()-1)}else break}return n}

