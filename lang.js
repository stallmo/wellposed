/* ------------------------------------------------------------------
   Bilingual switching (EN / DE)
   - Any element with data-en / data-de has its text swapped.
   - Initial language: ?lang= in the URL, else the browser's preference,
     else English.
   - No cookies, no localStorage, no third-party requests.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var SUPPORTED = ["en", "de"];

  function pickInitial() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl && SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;

    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return nav.toLowerCase().indexOf("de") === 0 ? "de" : "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
      var value = el.getAttribute("data-" + lang);
      if (value === null) return;

      // <meta> carries its text in the content attribute
      if (el.tagName === "META") {
        el.setAttribute("content", value);
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll(".langswitch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    // keep the choice in the URL so it survives navigation between pages
    var url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);

    // carry the choice across internal links (idempotent: strips any old query)
    document.querySelectorAll("a[href]").forEach(function (a) {
      var base = a.getAttribute("href").split("?")[0];
      if (/\.html$/.test(base)) a.setAttribute("href", base + "?lang=" + lang);
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".langswitch button");
    if (btn) apply(btn.dataset.lang);
  });

  apply(pickInitial());
})();
