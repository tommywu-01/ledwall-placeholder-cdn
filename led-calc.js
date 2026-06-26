(function(){
  var root = document.getElementById("lwcalc");
  if(!root) return;
  var CSS = '#lwcalc{--ink:#16161d;--muted:#6f6e66;--line:#ddd8cb;--accent:#8fe000;--card:#fbfaf6;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);max-width:1000px;margin:0 auto;line-height:1.45}'
    + '#lwcalc *{box-sizing:border-box}'
    + '#lwcalc .lwc-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:26px}'
    + '@media(max-width:780px){#lwcalc .lwc-grid{grid-template-columns:1fr}}'
    + '#lwcalc .lwc-panel{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:24px}'
    + '#lwcalc .lwc-h{font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin:0 0 18px;font-weight:700}'
    + '#lwcalc .lwc-field{margin-bottom:16px}'
    + '#lwcalc .lwc-label{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:600;margin-bottom:7px}'
    + '#lwcalc .lwc-label b{font-weight:800;font-variant-numeric:tabular-nums;background:var(--ink);color:#fff;padding:2px 9px;border-radius:7px;font-size:13px}'
    + '#lwcalc input[type=range]{width:100%;accent-color:var(--ink);height:22px}'
    + '#lwcalc .lwc-seg{display:flex;gap:7px;flex-wrap:wrap}'
    + '#lwcalc .lwc-seg button{flex:1;min-width:54px;padding:11px 6px;border:1px solid var(--line);background:#fff;border-radius:10px;font-size:13.5px;cursor:pointer;font-weight:600;color:var(--ink)}'
    + '#lwcalc .lwc-seg button[aria-pressed=true]{background:var(--ink);color:#fff;border-color:var(--ink)}'
    + '#lwcalc .lwc-seg .sm{display:block;font-size:11px;font-weight:600;opacity:.7;margin-top:2px}'
    + '#lwcalc .lwc-presets{display:flex;flex-wrap:wrap;gap:7px;margin:-4px 0 18px}'
    + '#lwcalc .lwc-presets button{padding:6px 12px;border:1px solid var(--line);background:#fff;border-radius:999px;font-size:12.5px;cursor:pointer;color:var(--ink)}'
    + '#lwcalc .lwc-row{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px dashed var(--line);padding:11px 0}'
    + '#lwcalc .lwc-row .k{font-size:13.5px;color:var(--muted)}'
    + '#lwcalc .lwc-row .v{font-size:17px;font-weight:700;font-variant-numeric:tabular-nums;text-align:right}'
    + '#lwcalc .lwc-cost{background:var(--ink);color:#fff;border-radius:14px;padding:18px 20px;margin-top:16px}'
    + '#lwcalc .lwc-cost .lab{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#bdbbb2}'
    + '#lwcalc .lwc-cost .big{font-size:29px;font-weight:800;font-variant-numeric:tabular-nums;margin-top:3px}'
    + '#lwcalc .lwc-cost .sub{font-size:12.5px;color:#c9c7bf;margin-top:5px}'
    + '#lwcalc .lwc-cost .accent{color:var(--accent)}'
    + '#lwcalc .lwc-cta{display:block;text-align:center;margin-top:14px;background:var(--accent);color:var(--ink);font-weight:800;text-decoration:none;padding:14px;border-radius:11px;font-size:15px}'
    + '#lwcalc .lwc-note{font-size:11.5px;color:var(--muted);margin-top:13px;line-height:1.5}';
  var M = '<div class="lwc-grid"><div class="lwc-panel"><p class="lwc-h">Your screen</p>'
    + '<div class="lwc-presets" id="lwc-presets"><button data-w="10" data-h="6">10 &times; 6 &mdash; small stage</button><button data-w="16" data-h="9">16 &times; 9 &mdash; large stage</button><button data-w="24" data-h="13">24 &times; 13 &mdash; main stage</button><button data-w="12" data-h="7">12 &times; 7 &mdash; camera wall</button></div>'
    + '<div class="lwc-field"><div class="lwc-label">Width <b><span id="lwc-wv">16</span> ft</b></div><input type="range" id="lwc-w" min="6" max="60" step="1" value="16"></div>'
    + '<div class="lwc-field"><div class="lwc-label">Height <b><span id="lwc-hv">9</span> ft</b></div><input type="range" id="lwc-h" min="4" max="30" step="1" value="9"></div>'
    + '<div class="lwc-field"><div class="lwc-label">Indoor or outdoor</div><div class="lwc-seg" id="lwc-env"><button data-env="indoor" aria-pressed="true">Indoor<span class="sm">P1.9 fine pitch</span></button><button data-env="outdoor" aria-pressed="false">Outdoor<span class="sm">P3.9 weatherproof</span></button></div></div>'
    + '<div class="lwc-field" style="margin-bottom:0"><div class="lwc-label">Rental days <b><span id="lwc-dayv">1</span></b></div><input type="range" id="lwc-days" min="1" max="14" step="1" value="1"></div>'
    + '</div><div class="lwc-panel"><p class="lwc-h">Your estimate</p>'
    + '<div class="lwc-row"><span class="k">Pixel pitch</span><span class="v" id="lwc-r-pitch">P1.9 &middot; indoor</span></div>'
    + '<div class="lwc-row"><span class="k">Panels (500mm)</span><span class="v" id="lwc-r-panels">10 &times; 5 = 50</span></div>'
    + '<div class="lwc-row"><span class="k">Built size</span><span class="v" id="lwc-r-size">16.4 &times; 8.2 ft</span></div>'
    + '<div class="lwc-row"><span class="k">Resolution</span><span class="v" id="lwc-r-res">2,560 &times; 1,280 px</span></div>'
    + '<div class="lwc-row"><span class="k">Brightness</span><span class="v" id="lwc-r-nits">~800&ndash;1,500 nits</span></div>'
    + '<div class="lwc-cost"><div class="lab">Estimated all-in day rate</div><div class="big" id="lwc-r-day">$6,900 &ndash; $9,700</div><div class="sub" id="lwc-r-total">Run total (<span class="accent">1 day</span>): same as day rate</div></div>'
    + '<a class="lwc-cta" href="/contact">Get an exact quote &rarr;</a>'
    + '<p class="lwc-note">Estimates only &mdash; real pricing depends on rigging, venue load-in, processing, and content. Includes crew, processing, NYC delivery, setup/teardown, and an on-site tech. Outdoor adds weatherproofing and rigging. <a href="/pricing" style="color:var(--muted)">See full pricing &rarr;</a></p>'
    + '</div></div>';
  root.innerHTML = "<style>"+CSS+"</style>"+M;
  var $=function(id){return document.getElementById(id)};
  var PANEL_FT=1.6404;
  var state={w:16,h:9,env:"indoor",days:1};
  function money(n){return "$"+(Math.round(n/100)*100).toLocaleString()}
  function calc(){
    var indoor = state.env==="indoor";
    var pitch = indoor ? "1.9" : "3.9";
    var pxp = indoor ? 256 : 128;
    var pw=Math.max(1,Math.round(state.w/PANEL_FT)), ph=Math.max(1,Math.round(state.h/PANEL_FT));
    var aw=pw*PANEL_FT, ah=ph*PANEL_FT, sqft=aw*ah, resW=pw*pxp, resH=ph*pxp;
    var dayRate=Math.max(3500, sqft*60*(indoor?1.0:1.25)), lo=dayRate*0.85, hi=dayRate*1.2;
    var mult=1+0.6*(state.days-1), tlo=lo*mult, thi=hi*mult;
    $("lwc-r-pitch").textContent="P"+pitch+" · "+(indoor?"indoor":"outdoor");
    $("lwc-r-panels").textContent=pw+" × "+ph+" = "+(pw*ph);
    $("lwc-r-size").textContent=aw.toFixed(1)+" × "+ah.toFixed(1)+" ft";
    $("lwc-r-res").textContent=resW.toLocaleString()+" × "+resH.toLocaleString()+" px";
    $("lwc-r-nits").textContent=indoor?"~800–1,500 nits":"up to ~5,000 nits";
    $("lwc-r-day").textContent=money(lo)+" – "+money(hi);
    $("lwc-r-total").innerHTML="Run total (<span class='accent'>"+state.days+(state.days>1?" days":" day")+"</span>): "+(state.days>1?(money(tlo)+" – "+money(thi)):"same as day rate");
  }
  $("lwc-w").addEventListener("input",function(){state.w=+this.value;$("lwc-wv").textContent=this.value;calc()});
  $("lwc-h").addEventListener("input",function(){state.h=+this.value;$("lwc-hv").textContent=this.value;calc()});
  $("lwc-days").addEventListener("input",function(){state.days=+this.value;$("lwc-dayv").textContent=this.value;calc()});
  $("lwc-env").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;[].forEach.call(this.children,function(c){c.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");state.env=b.getAttribute("data-env");calc();});
  $("lwc-presets").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;state.w=+b.getAttribute("data-w");state.h=+b.getAttribute("data-h");$("lwc-w").value=state.w;$("lwc-h").value=state.h;$("lwc-wv").textContent=state.w;$("lwc-hv").textContent=state.h;calc();});
  calc();
})();
