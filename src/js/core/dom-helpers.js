// ================= UI HELPERS =================
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function tape(p){return `<div class="tape" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}" aria-label="Beheersing ${p}%"><div class="tape-fill" style="width:${p}%"></div></div>`}
function chip(id){const[c,t]=status(id);return `<span class="badge ${c}">${t}</span>`}
function toast(msg){const t=$('#toast');t.innerHTML=msg;t.hidden=false;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>{t.hidden=true},2600)}
const LVL={1:'Basis',2:'Gevorderd',3:'HBO-start'};
function decNote(q){
  if(q.type==='mc')return '';
  if(q.type==='set')return `Meerdere oplossingen? Scheid ze met een puntkomma: <span class="mono">3; −2</span>${q.dec!=null?` · rond af op ${q.dec} decimalen`:''}`;
  if(q.type==='frac')return 'Geef een vereenvoudigde breuk (bijv. <span class="mono">7/12</span>) of een decimaal getal.';
  if(q.dec==null)return '';
  return q.dec===0?'Rond af op een geheel getal.':`Rond af op ${q.dec} decimaal${q.dec>1?'en':''}.`;
}

