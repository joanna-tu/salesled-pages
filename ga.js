// Consent-first Google Analytics for xray.joannatu.com. Nothing loads and no
// cookie is set until the visitor says yes; a no is remembered and the
// question never comes back. An empty ID keeps the whole file switched off,
// so this script can ship ahead of the property that feeds it.
(function () {
  var GA_ID = ""; // paste the G-XXXXXXXXXX Measurement ID here to switch analytics on
  var KEY = "xray-consent"; // localStorage: "yes" | "no"

  // Pages call window.xt("event_name") or put data-track="event_name" on any
  // element. Both stay silent no-ops unless GA is consented and loaded, so no
  // page ever breaks when analytics is off, declined, or blocked.
  window.xt = function (name, params) {
    if (window.gtag) window.gtag("event", name, params || {});
  };
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-track]") : null;
    if (el) window.xt(el.getAttribute("data-track"));
  });

  if (!GA_ID) return;
  // A browser-level privacy signal is an answer already; do not ask again.
  if (navigator.globalPrivacyControl) return;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadGA() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    // Measurement only: no Google signals, no ads personalization. GA4
    // drops the last IP octet on its own; the flag states the intent.
    gtag("config", GA_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function ask() {
    var bar = document.createElement("div");
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Analytics choice");
    // Token variables resolve on the styled pages; the hex fallbacks carry
    // the plain kit pages, which define no tokens.
    bar.style.cssText =
      "position:fixed;left:0;right:0;bottom:0;z-index:9999;" +
      "background:var(--cream,#f8f3e6);color:var(--ink,#21201b);" +
      "border-top:2px solid var(--ink,#21201b);" +
      "font-family:'National Park',ui-sans-serif,system-ui,sans-serif;" +
      "font-size:14px;line-height:1.5;padding:12px 16px;" +
      "display:flex;flex-wrap:wrap;align-items:center;justify-content:center;" +
      "gap:10px 16px;text-align:center";

    var text = document.createElement("span");
    text.textContent =
      "I count visits with Google Analytics, to see which pages help and which don't. No ads, no names.";

    var yes = document.createElement("button");
    yes.type = "button";
    yes.textContent = "OK, count me";
    yes.style.cssText =
      "background:var(--mustard,#eac054);color:var(--ink,#21201b);" +
      "border:2px solid var(--ink,#21201b);border-radius:6px;" +
      "padding:7px 14px;font:inherit;font-weight:600;cursor:pointer";

    var no = document.createElement("button");
    no.type = "button";
    no.textContent = "No thanks";
    no.style.cssText =
      "background:none;border:none;color:inherit;font:inherit;" +
      "text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:7px 4px";

    yes.onclick = function () {
      store("yes");
      bar.remove();
      loadGA();
    };
    no.onclick = function () {
      store("no");
      bar.remove();
    };

    bar.appendChild(text);
    bar.appendChild(yes);
    bar.appendChild(no);
    document.body.appendChild(bar);
  }

  function boot() {
    var choice = stored();
    if (choice === "yes") loadGA();
    else if (choice !== "no") ask();
  }

  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
