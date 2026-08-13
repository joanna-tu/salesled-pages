// Google Analytics for xray.joannatu.com, default on. The tag loads for every
// visitor the way Google's own snippet does; the notice says so and the opt-out
// really works (Google's ga-disable flag, checked before anything loads).
// An empty ID switches the whole file off.
(function () {
  var GA_ID = "G-8ERSQVY36B"; // the xray.joannatu.com stream; empty string switches analytics off
  var KEY = "xray-consent"; // localStorage: "no" = opted out, anything else = notice already seen

  // Pages call window.xt("event_name") or put data-track="event_name" on any
  // element. Both stay silent no-ops when analytics is off, opted out, or
  // blocked, so no page ever breaks.
  window.xt = function (name, params) {
    if (window.gtag) window.gtag("event", name, params || {});
  };
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-track]") : null;
    if (el) window.xt(el.getAttribute("data-track"));
  });

  if (!GA_ID) return;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function stopCounting() {
    // Google reads this flag on every hit, so it stops the ones already
    // queued on this page as well as every later visit.
    window["ga-disable-" + GA_ID] = true;
  }

  function loadGA() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    // Measurement only. Google signals would tie visits to Google accounts,
    // which is a different thing than counting them.
    gtag("config", GA_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function notice() {
    var bar = document.createElement("div");
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Analytics notice");
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

    // Two choices only, so the bar reads as one question. The route to the
    // privacy page rides inside the sentence instead of standing next to the
    // buttons as a third thing to weigh up. The plain kit pages have no
    // footer, so this link is their only one.
    var text = document.createElement("span");
    var more = document.createElement("a");
    more.href = "/privacy";
    more.textContent = "count visits";
    more.style.cssText = "color:inherit;text-underline-offset:3px";
    text.appendChild(document.createTextNode("I "));
    text.appendChild(more);
    text.appendChild(document.createTextNode(
      " with Google Analytics, to see which pages help and which don't."));

    var ok = document.createElement("button");
    ok.type = "button";
    ok.textContent = "OK";
    ok.style.cssText =
      "background:var(--mustard,#eac054);color:var(--ink,#21201b);" +
      "border:2px solid var(--ink,#21201b);border-radius:6px;" +
      "padding:7px 16px;font:inherit;font-weight:600;cursor:pointer";

    var out = document.createElement("button");
    out.type = "button";
    out.textContent = "Don't count me";
    out.style.cssText =
      "background:none;border:none;color:inherit;font:inherit;" +
      "text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:7px 4px";

    ok.onclick = function () {
      store("seen");
      bar.remove();
    };
    out.onclick = function () {
      store("no");
      stopCounting();
      bar.remove();
    };

    // The two buttons travel as one unit, so a narrow screen drops them onto
    // their own line side by side instead of stranding the second one.
    var actions = document.createElement("div");
    actions.style.cssText = "display:flex;align-items:center;gap:16px;flex:none";
    actions.appendChild(ok);
    actions.appendChild(out);

    bar.appendChild(text);
    bar.appendChild(actions);
    document.body.appendChild(bar);
  }

  function boot() {
    var choice = stored();
    // Two ways to be left alone: the opt-out button, and the browser-level
    // privacy signal, which is an answer already.
    if (choice === "no" || navigator.globalPrivacyControl) {
      stopCounting();
      return;
    }
    loadGA();
    if (choice) return; // the notice has been shown before
    notice();
  }

  if (document.body) boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
