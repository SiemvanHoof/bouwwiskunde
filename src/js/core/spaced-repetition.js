// ================= HERHALEN (gespreid, Leitner) =================
const INTERVALS=[0,1,3,7,14,30,60];
const addDays=n=>{const d=new Date();d.setDate(d.getDate()+n);return dayKey(d)};
function dayKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function schedule(mod,sub,l){DB.rev=DB.rev||{};const k=mod+':'+sub;const r=DB.rev[k];if(r){r.l=Math.max(r.l,l)}else DB.rev[k]={l,box:1,due:addDays(1)}}
function dueItems(){const t=today();return Object.entries(DB.rev||{}).filter(([k,r])=>r.due<=t&&MOD[k.split(':')[0]]).map(([k,r])=>({k,...r}))}
function nextDue(){const ds=Object.values(DB.rev||{}).map(r=>r.due).sort();return ds[0]}
function fmtDay(k){if(!k)return '';const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d).toLocaleDateString('nl-NL',{weekday:'long',day:'numeric',month:'long'})}

