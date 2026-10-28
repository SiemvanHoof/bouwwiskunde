// ================= INVOER PARSER / REKENMACHINE =================
let lastAns=0;
function parseExpr(src,rad){
  let s=String(src).trim().toLowerCase();
  s=s.replace(/^[a-zα-ωφσ]\w*\s*=\s*/i,'');
  s=s.replace(/[€%°]/g,'').replace(/\s+/g,'').replace(/ /g,'')
     .replace(/,/g,'.').replace(/[×·*]/g,'*').replace(/[÷:]/g,'/').replace(/[−–—]/g,'-')
     .replace(/√/g,'sqrt').replace(/π/g,'pi').replace(/²/g,'^2').replace(/³/g,'^3');
  if(!s)return NaN;
  let i=0;
  const k=rad?1:D2R;const fns={sqrt:Math.sqrt,sin:x=>Math.sin(x*k),cos:x=>Math.cos(x*k),tan:x=>Math.tan(x*k),asin:x=>Math.asin(x)/k,acos:x=>Math.acos(x)/k,atan:x=>Math.atan(x)/k,ln:Math.log,log:Math.log10,abs:Math.abs};
  const fact=n=>{if(n<0||!Number.isInteger(n)||n>170)return NaN;let r=1;for(let j=2;j<=n;j++)r*=j;return r};
  function num(){const m=/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/.exec(s.slice(i));if(!m)throw 0;i+=m[0].length;return parseFloat(m[0])}
  function primary(){
    const c=s[i];
    if(c==='('){i++;const v=expr();if(s[i]!==')')throw 0;i++;return v}
    if(c&&/[a-z]/.test(c)){const m=/^[a-z]+/.exec(s.slice(i));i+=m[0].length;const n=m[0];
      if(n==='pi')return Math.PI;if(n==='e')return Math.E;if(n==='ans')return lastAns;
      if(!fns[n])throw 0;return fns[n](s[i]==='('?primary():unary())}
    return num();
  }
  function power(){let b=primary();while(s[i]==='!'){i++;b=fact(b)}if(s[i]==='^'){i++;return Math.pow(b,unary())}return b}
  function unary(){if(s[i]==='-'){i++;return -unary()}if(s[i]==='+'){i++;return unary()}return power()}
  function term(){let v=unary();while(i<s.length){const c=s[i];if(c==='*'){i++;v*=unary()}else if(c==='/'){i++;v/=unary()}else if(c==='('||/[a-z]/.test(c)){v*=unary()}else break}return v}
  function expr(){let v=term();while(s[i]==='+'||s[i]==='-'){const o=s[i++];const r=term();v=o==='+'?v+r:v-r}return v}
  const unitFallback=()=>{const m=/^(-?\d+(\.\d+)?)([a-z][a-z\/\^\d\.]*)$/.exec(s);if(m&&!/^(sqrt|sin|cos|tan|asin|acos|atan|ln|log|abs|pi|ans)/.test(m[3]))return parseFloat(m[1]);return NaN};
  try{const v=expr();if(i!==s.length)return unitFallback();return v}
  catch(e){return unitFallback()}
}

