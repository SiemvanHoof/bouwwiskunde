// ================= STATISTIEKEN =================
const STAT_SHORT={'g-wiskunde':'Rekenen & wiskunde','g-bouwkunde':'Bouwkunde','g-natuurkunde':'Natuurkunde','g-bouwfysica':'Bouwfysica','g-economie':'Bouweconomie'};
function statAccuracy(id){const m=DB.mods[id];return m&&m.n?Math.round(m.c/m.n*100):null}
function statChartGL(H,pad,W){return [0,25,50,75,100].map(v=>{const y=H-22-(v/100*(H-40));return `<line class="gl" x1="${pad}" x2="${W-6}" y1="${y}" y2="${y}"/><text class="ax" x="${pad-6}" y="${y+3}" text-anchor="end">${v}</text>`}).join('')}
function statBarChart(items,opt){
  const bad=opt&&opt.bad;const W=640,H=180,pad=26,gw=W-pad-10,bw=gw/Math.max(1,items.length);
  const bars=items.map((it,i)=>{const bh=it.value/100*(H-40);const x=pad+i*bw+bw*0.18,w=bw*0.64,y=H-22-bh;
    return `<g><title>${esc(it.full||it.label)}: ${it.value}%</title><rect class="bar${bad?' bad':''}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(bh,1).toFixed(1)}" rx="3"/><text class="ax" x="${(x+w/2).toFixed(1)}" y="${H-6}" text-anchor="middle">${esc(it.label)}</text></g>`}).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Balkdiagram">${statChartGL(H,pad,W)}${bars}</svg>`;
}
function statLineChart(points){
  const W=640,H=180,pad=26,gw=W-pad-10,n=points.length;
  const xAt=i=>pad+(n<=1?gw/2:i/(n-1)*gw);const yAt=v=>H-22-(v/100*(H-40));
  if(!n)return `<p class="muted small">Nog geen gegevens.</p>`;
  const path=points.map((p,i)=>`${i===0?'M':'L'}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(' ');
  const area=`${path} L${xAt(n-1).toFixed(1)},${yAt(0).toFixed(1)} L${xAt(0).toFixed(1)},${yAt(0).toFixed(1)} Z`;
  const dots=points.map((p,i)=>`<circle class="p1" cx="${xAt(i).toFixed(1)}" cy="${yAt(p.value).toFixed(1)}" r="3.6"><title>${esc(p.label)}: ${p.value}%</title></circle>`).join('');
  const step=Math.max(1,Math.ceil(n/6));
  const xl=points.map((p,i)=>(i%step===0||i===n-1)?`<text class="ax" x="${xAt(i).toFixed(1)}" y="${H-6}" text-anchor="middle">${esc(p.label)}</text>`:'').join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Lijndiagram">${statChartGL(H,pad,W)}<path class="a1" d="${area}"/><path class="s1" d="${path}"/>${dots}${xl}</svg>`;
}
function statScatter(points){
  const W=640,H=180,pad=26,gw=W-pad-10,n=points.length;
  if(!n)return `<p class="muted small">Nog geen toets gemaakt. Ga naar de <a href="#instaptoets">instaptoets</a> of <a href="#oefentoets">oefentoets</a>.</p>`;
  const xAt=i=>pad+(n<=1?gw/2:i/(n-1)*gw);const yAt=v=>H-22-(v/100*(H-40));
  const dots=points.map((p,i)=>`<circle class="${p.kind==='intake'?'p2':'p1'}" cx="${xAt(i).toFixed(1)}" cy="${yAt(p.value).toFixed(1)}" r="4.2"><title>${esc(p.label)} · ${p.kindLabel}: ${p.value}%</title></circle>`).join('');
  const xl=n<=8?points.map((p,i)=>`<text class="ax" x="${xAt(i).toFixed(1)}" y="${H-6}" text-anchor="middle">${esc(p.label)}</text>`).join(''):'';
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Toetsresultaten">${statChartGL(H,pad,W)}${dots}${xl}</svg>`;
}
function statDonut(segments,size){
  size=size||168;const total=segments.reduce((a,s)=>a+s.value,0);const r=(size-32)/2,c=2*Math.PI*r;let off=0;
  const segs=segments.filter(s=>s.value>0).map(s=>{const dash=s.value/(total||1)*c;const el=`<circle class="seg" cx="${size/2}" cy="${size/2}" r="${r}" stroke="${s.color}" stroke-dasharray="${dash.toFixed(1)} ${(c-dash).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${size/2} ${size/2})"><title>${esc(s.label)}: ${s.value}</title></circle>`;off+=dash;return el}).join('');
  return `<svg class="donut" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Niveauverdeling">${segs}<text x="${size/2}" y="${size/2+7}" text-anchor="middle" font-size="24" font-weight="700">${total}</text></svg>`;
}
function statHeatmap(weeks){
  weeks=weeks||12;const days=weeks*7;const end=new Date();end.setHours(0,0,0,0);
  const endDow=(end.getDay()+6)%7;const gridEnd=new Date(end);gridEnd.setDate(gridEnd.getDate()+(6-endDow));
  const start=new Date(gridEnd);start.setDate(start.getDate()-(days-1));
  let max=1;const list=[];for(let d=new Date(start);d<=gridEnd;d.setDate(d.getDate()+1)){const k=dayKey(d);const v=d>end?null:((DB.daily||{})[k]?.n||0);if(v!==null)max=Math.max(max,v);list.push({d:new Date(d),k,v})}
  const lvl=v=>v===null?'future':v===0?0:Math.min(4,Math.ceil(v/max*4));
  const monthLabels=[];list.forEach((x,i)=>{if(i%7===0){const m=x.d.toLocaleDateString('nl-NL',{month:'short'});if(!monthLabels.length||monthLabels[monthLabels.length-1].t!==m)monthLabels.push({i:i/7,t:m})}});
  return `<div class="heatmap-wrap"><div class="heatmap-months">${monthLabels.map(x=>`<span style="grid-column:${x.i+1}">${x.t}</span>`).join('')}</div>
  <div class="heatmap" style="grid-template-columns:repeat(${weeks},1fr)">${list.map(x=>x.v===null?`<span class="hm-cell hm-future" aria-hidden="true"></span>`:`<span class="hm-cell" data-lvl="${lvl(x.v)}" title="${x.d.toLocaleDateString('nl-NL',{weekday:'long',day:'numeric',month:'long'})}: ${x.v} opgave${x.v===1?'':'n'}"></span>`).join('')}</div>
  <div class="heatmap-legend"><span>Minder</span>${[0,1,2,3,4].map(l=>`<span class="hm-cell" data-lvl="${l}"></span>`).join('')}<span>Meer</span></div></div>`;
}
function statModRow(m){
  const acc=statAccuracy(m.id);const mas=mastery(m.id);
  const subs=m.subs.map(s=>{const d=(DB.mods[m.id]||{}).subs||{};const r=d[s.id];const a=r&&r.n?Math.round(r.c/r.n*100):null;
    return `<div class="stat-row sub"><span class="sr-l">${esc(s.name)}</span><span class="sr-bar">${tape(mas===0&&!r?0:(a===null?0:a))}</span><span class="sr-v">${r?`${r.n}× · ${a}% goed`:'nog niet geoefend'}</span></div>`}).join('');
  return `<details class="stat-mod"><summary><span class="sr-l"><b>${m.code}</b> ${esc(m.name)}</span><span class="sr-bar">${tape(mas)}</span><span class="sr-v">${mas}%${acc!==null?` · ${acc}% goed`:''}</span></summary>
  <div class="stat-subs">${subs}</div></details>`;
}
function statVakSection(S){
  const mas=Math.round(S.mods.reduce((a,id)=>a+mastery(id),0)/S.mods.length);
  const accs=S.mods.map(statAccuracy).filter(a=>a!==null);
  const acc=accs.length?Math.round(accs.reduce((a,b)=>a+b,0)/accs.length):null;
  const done=S.mods.filter(id=>modDone(id)).length;
  return `<details class="stat-vak">
  <summary><span class="sr-l"><b>${esc(S.name)}</b><span class="muted small"> · ${done}/${S.mods.length} hoofdstukken af</span></span><span class="sr-bar">${tape(mas)}</span><span class="sr-v">${mas}%${acc!==null?` · ${acc}% goed`:''}</span></summary>
  <div class="stat-mods">${S.mods.map(id=>statModRow(MOD[id])).join('')}</div></details>`;
}
function viewStats(el){
  const pct=DB.total?Math.round(DB.correct/DB.total*100):0;
  const kpis=[['Opgaven gemaakt',N(DB.total)],['Nauwkeurigheid',DB.total?pct+'%':'–'],['Dagen op rij',String(streak())],['Hoofdstukken af',`${MODS.filter(m=>modDone(m.id)).length}/${MODS.length}`]];
  const vakBars=statBarChart(SUBJECTS.map(S=>({label:STAT_SHORT[S.id]||S.name,full:S.name,value:Math.round(S.mods.reduce((a,id)=>a+mastery(id),0)/S.mods.length)})));
  const foutenPerVak=SUBJECTS.map(S=>({id:S.id,n:DB.errors.filter(e=>S.mods.includes(e.mod)).length}));
  const maxFout=Math.max(1,...foutenPerVak.map(x=>x.n));
  const foutenBars=statBarChart(SUBJECTS.map((S,i)=>({label:STAT_SHORT[S.id]||S.name,full:`${S.name}: ${foutenPerVak[i].n} fout${foutenPerVak[i].n===1?'':'en'}`,value:Math.round(foutenPerVak[i].n/maxFout*100)})),{bad:true});
  const days14=(()=>{const o=[];for(let i=29;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dayKey(d);const v=(DB.daily||{})[k];if(v&&v.n)o.push({label:d.toLocaleDateString('nl-NL',{day:'numeric',month:'short'}),value:Math.round(v.c/v.n*100)})}return o})();
  const statusCounts={good:0,mid:0,nieuw:0,lock:0};MODS.forEach(m=>{const [st]=status(m.id);statusCounts[st]=(statusCounts[st]||0)+1});
  const donut=statDonut([
    {label:'Afgerond',value:statusCounts.good||0,color:'var(--good)'},
    {label:'Bezig',value:statusCounts.mid||0,color:'var(--accent)'},
    {label:'Nieuw, nog niet gestart',value:statusCounts.nieuw||0,color:'var(--info)'},
    {label:'Op slot',value:statusCounts.lock||0,color:'var(--line)'}]);
  const tests=(DB.tests||[]).map((t,i)=>({x:i,label:new Date(t.date).toLocaleDateString('nl-NL',{day:'numeric',month:'short'}),value:Math.round(t.c/t.n*100),kind:t.kind,kindLabel:t.kind==='intake'?'Instaptoets':'Oefentoets'}));
  el.innerHTML=`<header class="page-head"><p class="eyebrow">Naslag</p><h1>Statistieken</h1><p class="lede">Je voortgang in cijfers: per vak, per hoofdstuk en per onderdeel. Klik op een vak of hoofdstuk voor meer detail.</p></header>
  <div class="kpis home-kpis">${kpis.map(([l,n])=>`<div class="kpi"><span class="kpi-l">${l}</span><div class="kpi-row"><span class="kpi-n">${n}</span></div></div>`).join('')}</div>

  <section><div class="sec-head"><h2>Voortgang per vak</h2><span class="muted small">gemiddelde beheersing</span></div>${vakBars}</section>

  <section><div class="sec-head"><h2>Niveauverdeling</h2><span class="muted small">alle ${MODS.length} hoofdstukken</span></div>
  <div class="donutwrap"><div class="statdonut-row">${donut}<div class="legend col">
  <span><i style="background:var(--good)"></i>Afgerond (${statusCounts.good||0})</span>
  <span><i style="background:var(--accent)"></i>Bezig (${statusCounts.mid||0})</span>
  <span><i style="background:var(--info)"></i>Nieuw (${statusCounts.nieuw||0})</span>
  <span><i style="background:var(--line)"></i>Op slot (${statusCounts.lock||0})</span></div></div></div></section>

  <section><div class="sec-head"><h2>Activiteit</h2><span class="muted small">laatste 12 weken, opgaven per dag</span></div>${statHeatmap(12)}</section>

  <section><div class="sec-head"><h2>Nauwkeurigheid over tijd</h2><span class="muted small">% in één keer goed, dagen waarop je oefende</span></div>${statLineChart(days14)}</section>

  <section><div class="sec-head"><h2>Toetsresultaten</h2><span class="muted small"><i class="lg-dot" style="background:var(--primary)"></i>oefentoets <i class="lg-dot" style="background:var(--good)"></i>instaptoets</span></div>${statScatter(tests)}</section>

  <section><div class="sec-head"><h2>Fouten per vak</h2><span class="muted small">openstaande fouten</span></div>${foutenBars}</section>

  <section><div class="sec-head"><h2>Per vak en hoofdstuk</h2><span class="muted small">klik open voor de onderdelen</span></div>
  <div class="stat-tree">${SUBJECTS.map(statVakSection).join('')}</div></section>`;
}
