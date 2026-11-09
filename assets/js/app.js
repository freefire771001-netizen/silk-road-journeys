/* Silk Road Journeys — application logic (vanilla JS, no build step). */
(function () {
  "use strict";

  var STORE = {
    lang: "srj.lang",
    currency: "srj.currency",
    user: "srj.user",
    bookings: "srj.bookings",
    reviews: "srj.reviews",
    view: "srj.view"
  };

  var LANGS = [
    { code: "en", label: "English", short: "EN" },
    { code: "uz", label: "Oʻzbek", short: "UZ" },
    { code: "ru", label: "Русский", short: "RU" },
    { code: "fr", label: "Français", short: "FR" }
  ];

  var CURRENCIES = [
    { code: "USD", label: "US Dollar", short: "$" },
    { code: "EUR", label: "Euro", short: "€" },
    { code: "UZS", label: "Uzbek soʻm", short: "soʻm" }
  ];

  var LOCALES = { en: "en-GB", uz: "uz-UZ", ru: "ru-RU", fr: "fr-FR" };

  var ICONS = {
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    pin: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2.1 5-5 2.1 2.1-5z"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',
    ticket: '<path d="M4 9V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6z"/><path d="M13 8v8"/>',
    star: '<path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.8l5.9-.9z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.9"/><path d="M12 17.2h.01"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2"/><path d="M16 5.2a3 3 0 0 1 0 5.6M17.5 20c0-2.2-.7-3.9-2-5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    shield: '<path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    train: '<rect x="5" y="3" width="14" height="13" rx="4"/><path d="M5 10h14M8 20l2-4M16 20l-2-4M9 6.5h.01M15 6.5h.01"/>',
    bed: '<path d="M3 19v-8h18v8M3 19h18M6 11V7h5v4M11 11h7V8h-7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z"/>',
    map: '<path d="M9 4L3.5 6.5v13L9 17l6 2.5 5.5-2.5v-13L15 6.5z"/><path d="M9 4v13M15 6.5v13"/>',
    chat: '<path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function brandMark(id) {
    return '<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#F9EDB8"/><stop offset=".55" stop-color="#D4AF37"/><stop offset="1" stop-color="#B98A22"/>' +
      '</linearGradient></defs>' +
      '<circle cx="20" cy="20" r="18.2" fill="none" stroke="url(#' + id + ')" stroke-width="1.1" opacity=".5"/>' +
      '<path d="M20 6.4l2 5.5 5.8.3-4.5 3.6 1.5 5.6L20 18.2l-4.8 3.2 1.5-5.6-4.5-3.6 5.8-.3z" fill="url(#' + id + ')"/>' +
      '<path d="M11.2 29.5c2.4-2.7 5.5-4.1 8.8-4.1s6.4 1.4 8.8 4.1" fill="none" stroke="url(#' + id + ')" stroke-width="1.5" stroke-linecap="round" opacity=".85"/>' +
      '</svg>';
  }

  /* ---------------- storage ---------------- */
  function read(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage can be unavailable; the UI still works for this session */
    }
  }

  /* ---------------- state ---------------- */
  var savedLang = read(STORE.lang, "en");
  var savedCurrency = read(STORE.currency, "USD");
  var savedView = read(STORE.view, "dashboard");

  var state = {
    lang: LANGS.some(function (l) { return l.code === savedLang; }) ? savedLang : "en",
    currency: CURRENCIES.some(function (c) { return c.code === savedCurrency; }) ? savedCurrency : "USD",
    user: read(STORE.user, null),
    bookings: read(STORE.bookings, []),
    reviews: read(STORE.reviews, []),
    view: ["dashboard", "destinations", "tours", "custom", "bookings", "reviews", "support", "destination"].indexOf(savedView) >= 0 ? savedView : "dashboard",
    destId: null,
    filters: { city: "all", style: "all", duration: "all", budget: "all", sort: "recommended" },
    query: "",
    modal: null,
    lastFocus: null
  };
  if (!Array.isArray(state.bookings)) state.bookings = [];
  if (!Array.isArray(state.reviews)) state.reviews = [];

  /* ---------------- i18n ---------------- */
  function t(key, vars) {
    var dict = UI[state.lang] || UI.en;
    var str = dict[key];
    if (str === undefined) str = UI.en[key];
    if (str === undefined) str = key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.split("{" + k + "}").join(String(vars[k]));
      });
    }
    return str;
  }

  function pick(obj) {
    if (obj === null || obj === undefined) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] !== undefined ? obj[state.lang] : (obj.en || "");
  }

  function esc(value) {
    return String(value === null || value === undefined ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------------- money & dates ---------------- */
  var nf = new Intl.NumberFormat("en-US");

  function money(usd) {
    var value = Number(usd || 0);
    if (state.currency === "EUR") {
      return "€" + nf.format(Math.round(value * CONFIG.rates.EUR));
    }
    if (state.currency === "UZS") {
      var sum = Math.round((value * CONFIG.rates.UZS) / 1000) * 1000;
      return new Intl.NumberFormat("ru-RU").format(sum) + " soʻm";
    }
    return "$" + nf.format(Math.round(value));
  }

  function currencyShort() {
    var found = CURRENCIES.filter(function (c) { return c.code === state.currency; })[0];
    return found ? found.code : "USD";
  }

  function startOfToday() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function toISO(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function parseISO(iso) {
    if (!iso) return null;
    var parts = String(iso).split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function addDays(date, days) {
    var copy = new Date(date.getTime());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function formatDate(iso, opts) {
    var date = parseISO(iso);
    if (!date) return "—";
    var locale = LOCALES[state.lang] || "en-GB";
    try {
      return new Intl.DateTimeFormat(locale, opts || { day: "2-digit", month: "short", year: "numeric" }).format(date);
    } catch (e) {
      return new Intl.DateTimeFormat("en-GB", opts || { day: "2-digit", month: "short", year: "numeric" }).format(date);
    }
  }

  function nightsBetween(a, b) {
    var from = parseISO(a);
    var to = parseISO(b);
    if (!from || !to) return 0;
    return Math.round((to.getTime() - from.getTime()) / 86400000);
  }

  function stars(rating) {
    var full = Math.max(0, Math.min(5, Math.round(rating)));
    var out = "";
    for (var i = 0; i < 5; i += 1) out += i < full ? "★" : "☆";
    return out;
  }

  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "SR";
    var first = parts[0].charAt(0);
    var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  }

  function makeRef(prefix) {
    var stamp = Date.now().toString(36).toUpperCase().slice(-5);
    var rand = Math.random().toString(36).toUpperCase().slice(2, 4);
    return prefix + "-" + stamp + rand;
  }

  function byId(id) {
    for (var i = 0; i < TOURS.length; i += 1) if (TOURS[i].id === id) return TOURS[i];
    return null;
  }

  function destById(id) {
    for (var i = 0; i < DESTINATIONS.length; i += 1) if (DESTINATIONS[i].id === id) return DESTINATIONS[i];
    return null;
  }

  function cityNames(ids) {
    return ids.map(function (id) {
      var d = destById(id);
      return d ? pick(d.name) : id;
    }).join(" · ");
  }

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ================= shell ================= */
  var NAV_MAIN = [
    { view: "dashboard", icon: "grid", key: "nav.dashboard" },
    { view: "destinations", icon: "pin", key: "nav.destinations" },
    { view: "tours", icon: "compass", key: "nav.tours" }
  ];
  var NAV_TRIP = [
    { view: "custom", icon: "sliders", key: "nav.custom" },
    { view: "bookings", icon: "ticket", key: "nav.bookings" },
    { view: "reviews", icon: "star", key: "nav.reviews" },
    { view: "support", icon: "help", key: "nav.support" }
  ];
  var BOTTOM_NAV = ["dashboard", "tours", "custom", "bookings", "support"];

  function activeBookings() {
    return state.bookings.filter(function (b) { return b.status !== "cancelled"; });
  }

  function navButton(item) {
    var current = state.view === item.view || (item.view === "destinations" && state.view === "destination");
    var count = "";
    if (item.view === "bookings" && activeBookings().length) {
      count = '<span class="nav-count">' + activeBookings().length + "</span>";
    }
    return '<button type="button" class="nav-item" data-nav="' + item.view + '"' +
      (current ? ' aria-current="page"' : "") + ">" +
      icon(item.icon) + "<span>" + esc(t(item.key)) + "</span>" + count + "</button>";
  }

  function renderNav() {
    var html = '<div class="nav-title">' + esc(t("nav.main")) + "</div>";
    html += NAV_MAIN.map(navButton).join("");
    html += '<div class="nav-title">' + esc(t("nav.account")) + "</div>";
    html += NAV_TRIP.map(navButton).join("");
    $("#navMain").innerHTML = html;
  }

  function renderBrand() {
    $("#brand").innerHTML = brandMark("bmSide") +
      '<span class="brand-text"><span class="brand-name">SILK ROAD</span>' +
      '<span class="brand-sub">JOURNEYS</span></span>';
    $("#brand").setAttribute("aria-label", "Silk Road Journeys — " + t("nav.dashboard"));
  }

  function renderSideCard() {
    $("#sideCard").innerHTML =
      "<h3>" + esc(t("side.expertTitle")) + "</h3>" +
      "<p>" + esc(t("side.expertDesc")) + "</p>" +
      '<button type="button" class="btn btn-gold btn-block" data-goto="support">' +
      icon("chat") + esc(t("side.expertBtn")) + "</button>";
    $("#sideFoot").textContent = t("side.secure");
  }

  function renderCurrencyMenu() {
    $("#currencyLabel").textContent = state.currency;
    $("#currencyMenu").innerHTML = CURRENCIES.map(function (c) {
      return '<button type="button" class="dd-item" role="option" data-currency="' + c.code + '" aria-selected="' +
        (c.code === state.currency) + '">' +
        '<span class="cur-code">' + c.code + "</span><span>" + esc(c.label) + "</span>" +
        icon("check", "tick") + "</button>";
    }).join("");
    $("#currencyBtn").setAttribute("aria-label", t("top.currency") + ": " + state.currency);
  }

  function renderLangMenu() {
    var found = LANGS.filter(function (l) { return l.code === state.lang; })[0];
    $("#langLabel").textContent = found ? found.short : "EN";
    $("#langMenu").innerHTML = LANGS.map(function (l) {
      return '<button type="button" class="dd-item" role="option" data-lang="' + l.code + '" aria-selected="' +
        (l.code === state.lang) + '" lang="' + l.code + '">' +
        '<span class="lang-native">' + esc(l.label) + "</span>" +
        '<span class="lang-sub" style="margin-left:auto">' + l.short + "</span>" +
        icon("check", "tick") + "</button>";
    }).join("");
    $("#langBtn").setAttribute("aria-label", t("top.language") + ": " + (found ? found.label : "English"));
  }

  function renderAuthArea() {
    var root = $("#authArea");
    if (state.user) {
      var name = state.user.name || state.user.email || "Traveller";
      root.innerHTML =
        '<div class="dd" id="userDD">' +
        '<button type="button" class="user-chip" id="userBtn" aria-haspopup="menu" aria-expanded="false">' +
        '<span class="avatar">' + esc(initials(name)) + "</span>" +
        '<span class="user-name">' + esc(name.split(" ")[0]) + "</span>" +
        icon("arrow", "") +
        "</button>" +
        '<div class="dd-menu" id="userMenu" role="menu" hidden>' +
        '<div style="padding:8px 10px 6px"><div style="font-size:12.5px;font-weight:600;overflow-wrap:anywhere">' +
        esc(name) + '</div><div style="font-size:10.5px;color:var(--muted-2);overflow-wrap:anywhere">' +
        esc(state.user.email || "") + "</div></div>" +
        '<div class="dd-sep"></div>' +
        '<button type="button" class="dd-item" role="menuitem" data-goto="bookings">' + icon("ticket") +
        esc(t("auth.menuBookings")) + "</button>" +
        '<button type="button" class="dd-item" role="menuitem" data-goto="custom">' + icon("sliders") +
        esc(t("auth.menuCustom")) + "</button>" +
        '<div class="dd-sep"></div>' +
        '<button type="button" class="dd-item" role="menuitem" data-action="signout">' + icon("x") +
        esc(t("auth.menuSignOut")) + "</button>" +
        "</div></div>";
      var chip = $("#userBtn");
      chip.querySelector("svg").setAttribute("aria-hidden", "true");
      chip.querySelector("svg").style.width = "12px";
    } else {
      root.innerHTML = '<button type="button" class="btn btn-gold btn-signin" id="signInBtn">' +
        icon("users") + "<span>" + esc(t("top.signIn")) + "</span></button>";
    }
  }

  function renderBottomNav() {
    var root = $("#bottomNav");
    if (!root) return;
    root.innerHTML = BOTTOM_NAV.map(function (view) {
      var item = NAV_MAIN.concat(NAV_TRIP).filter(function (n) { return n.view === view; })[0];
      if (!item) return "";
      var current = state.view === view;
      return '<button type="button" class="bn-item" data-nav="' + view + '"' + (current ? ' aria-current="page"' : "") + ">" +
        icon(item.icon) + "<span>" + esc(t(item.key)) + "</span></button>";
    }).join("");
  }

  function renderFooter() {
    var year = new Date().getFullYear();
    $("#footer").innerHTML =
      '<div class="footer-grid">' +
      "<div>" +
      '<div class="footer-brand">' + brandMark("bmFoot") +
      '<span class="brand-text"><span class="brand-name">SILK ROAD</span><span class="brand-sub">JOURNEYS</span></span></div>' +
      "<p>" + esc(t("foot.tagline")) + "</p></div>" +
      '<div><h4>' + esc(t("foot.explore")) + "</h4><ul>" +
      '<li><a href="#" data-goto="destinations">' + esc(t("nav.destinations")) + "</a></li>" +
      '<li><a href="#" data-goto="tours">' + esc(t("nav.tours")) + "</a></li>" +
      '<li><a href="#" data-goto="custom">' + esc(t("nav.custom")) + "</a></li>" +
      '<li><a href="#" data-goto="reviews">' + esc(t("nav.reviews")) + "</a></li></ul></div>" +
      '<div><h4>' + esc(t("foot.company")) + "</h4><ul>" +
      '<li><a href="#" data-goto="support">' + esc(t("nav.support")) + "</a></li>" +
      '<li><a href="mailto:' + CONFIG.contact.email + '">' + esc(CONFIG.contact.email) + "</a></li>" +
      '<li><a href="tel:' + CONFIG.contact.phoneHref + '">' + esc(CONFIG.contact.phone) + "</a></li></ul></div>" +
      '<div><h4>' + esc(t("foot.legal")) + "</h4><ul>" +
      '<li><a href="#" data-goto="support">' + esc(t("foot.terms")) + "</a></li>" +
      '<li><a href="#" data-goto="support">' + esc(t("foot.privacy")) + "</a></li>" +
      '<li><a href="#" data-goto="support">' + esc(t("foot.contact")) + "</a></li></ul></div>" +
      "</div>" +
      '<div class="footer-note"><span>' + esc(t("foot.rights", { year: year })) + "</span>" +
      "<span>" + esc(t("foot.rates", { date: formatDate(CONFIG.ratesDate) })) + "</span>" +
      "<span>" + esc(t("foot.credits")) + "</span></div>";
  }

  function renderSearchPlaceholder() {
    var input = $("#searchInput");
    if (!input) return;
    input.placeholder = t("top.search");
    input.setAttribute("aria-label", t("top.search"));
  }

  function renderShell() {
    document.documentElement.setAttribute("lang", state.lang);
    renderBrand();
    renderNav();
    renderSideCard();
    renderCurrencyMenu();
    renderLangMenu();
    renderAuthArea();
    renderBottomNav();
    renderFooter();
    renderSearchPlaceholder();
    var menuBtn = $("#menuBtn");
    if (menuBtn) {
      menuBtn.setAttribute("aria-label", t("top.menu"));
      menuBtn.setAttribute("aria-expanded", $("#sidebar").classList.contains("open") ? "true" : "false");
    }
  }


  /* ================= cards ================= */
  function tourCard(tour) {
    var savePct = tour.oldPrice ? Math.round((1 - tour.price / tour.oldPrice) * 100) : 0;
    var badge = tour.badge ? '<span class="badge">' + esc(t("badge." + tour.badge)) + "</span>" : "";
    var oldPrice = tour.oldPrice ? '<span class="pc-old">' + esc(money(tour.oldPrice)) + "</span>" : "";
    return '<article class="card tour-card">' +
      '<div class="tour-media">' +
      '<img src="' + tour.img + '" alt="' + esc(pick(tour.title)) + '" loading="lazy" decoding="async">' +
      badge +
      '<div class="price-chip"><span class="pc-label">' + esc(t("card.from")) + "</span>" +
      '<span class="pc-value">' + esc(money(tour.price)) + "</span>" +
      '<span class="pc-label">' + esc(t("card.pp")) + "</span>" + oldPrice + "</div>" +
      "</div>" +
      '<div class="tour-body">' +
      '<div class="tour-cities">' + esc(cityNames(tour.cities)) + "</div>" +
      "<h3 class=\"tour-title\">" + esc(pick(tour.title)) + "</h3>" +
      '<p class="tour-desc">' + esc(pick(tour.summary)) + "</p>" +
      '<div class="tour-meta">' +
      "<span>" + icon("calendar") + esc(t("card.days", { n: tour.days })) + "</span>" +
      "<span>" + icon("users") + esc(tour.group) + "</span>" +
      (savePct ? "<span>" + icon("sparkle") + esc(t("card.save", { n: savePct })) + "</span>" : "") +
      "</div>" +
      '<div class="tour-foot">' +
      '<span class="rating"><span class="star">★</span><b>' + tour.rating.toFixed(1) + "</b>" +
      "<small>(" + tour.reviewCount + ")</small></span>" +
      '<div class="row" style="gap:6px">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-tour="' + tour.id + '">' + esc(t("card.view")) + "</button>" +
      '<button type="button" class="btn btn-gold btn-sm" data-book="' + tour.id + '">' + esc(t("card.book")) + "</button>" +
      "</div></div></div></article>";
  }

  function destCard(dest) {
    return '<button type="button" class="dest-card" data-dest="' + dest.id + '">' +
      '<img src="' + dest.img + '" alt="' + esc(pick(dest.name)) + '" loading="lazy" decoding="async">' +
      '<span class="dest-body">' +
      '<span class="dest-name">' + esc(pick(dest.name)) + "</span>" +
      '<span class="dest-tag" style="display:block">' + esc(pick(dest.tagline)) + "</span>" +
      '<span class="dest-meta">' + esc(pick(dest.stay)) + " · " + esc(pick(dest.region)) + "</span>" +
      "</span></button>";
  }

  function reviewCard(review, options) {
    var opts = options || {};
    var tour = review.tour ? byId(review.tour) : null;
    var body = typeof review.text === "string" ? review.text : pick(review.text);
    var remove = opts.canDelete
      ? '<button type="button" class="btn btn-quiet btn-sm" data-delreview="' + esc(review.id) + '">' +
        icon("trash") + esc(t("rev.delete")) + "</button>"
      : "";
    return '<article class="card review-card">' +
      '<div class="review-top"><span class="avatar">' + esc(review.initials || initials(review.name)) + "</span>" +
      '<span class="review-who"><span class="review-name">' + esc(review.name) + "</span>" +
      '<span class="review-sub">' + esc(review.country || "") + (review.country ? " · " : "") +
      esc(formatDate(review.date)) + "</span></span>" +
      '<span class="review-stars" style="margin-left:auto">' + stars(review.rating) + "</span></div>" +
      '<p class="review-text">' + esc(body) + "</p>" +
      '<div class="review-foot">' + icon("check") + esc(t("rev.verified")) +
      '<span class="dot"></span>' + esc(tour ? pick(tour.title) : "") +
      '<span class="spacer"></span>' + remove + "</div>" +
      "</article>";
  }

  function allReviews() {
    return state.reviews.concat(REVIEWS);
  }

  /* ================= views ================= */
  function renderView() {
    var main = $("#main");
    var html = "";
    switch (state.view) {
      case "dashboard": html = viewDashboard(); break;
      case "destinations": html = viewDestinations(); break;
      case "destination": html = viewDestination(state.destId); break;
      case "tours": html = viewTours(); break;
      case "custom": html = viewCustom(); break;
      case "bookings": html = viewBookings(); break;
      case "reviews": html = viewReviews(); break;
      case "support": html = viewSupport(); break;
      default: html = viewDashboard();
    }
    main.innerHTML = html;
    if (state.view === "custom") bindBuilder();
    if (state.view === "tours") bindFilters();
    if (state.view === "reviews") bindReviewForm();
    renderNav();
    renderBottomNav();
  }

  function viewDashboard() {
    var featuredIds = ["classic-silk-road", "imperial-private", "kyzylkum-nomad"];
    var featured = featuredIds.map(byId).filter(Boolean);
    var topReviews = allReviews().slice(0, 3);

    var stats = [
      { v: "2,700", k: "hero.stat1" },
      { v: "3", k: "hero.stat2" },
      { v: "2h10", k: "hero.stat3" },
      { v: "5", k: "hero.stat4" }
    ];

    var why = [
      { i: "pin", t: "home.why1Title", d: "home.why1Desc" },
      { i: "train", t: "home.why2Title", d: "home.why2Desc" },
      { i: "bed", t: "home.why3Title", d: "home.why3Desc" },
      { i: "shield", t: "home.why4Title", d: "home.why4Desc" }
    ];

    return '<div class="container view-anim">' +
      '<section class="hero">' +
      '<img class="hero-img" src="assets/img/registan.jpg" alt="' + esc(pick(destById("samarkand").name)) + ', Uzbekistan">' +
      '<div class="hero-veil"></div>' +
      '<div class="hero-inner">' +
      '<span class="eyebrow">' + esc(t("hero.eyebrow")) + "</span>" +
      "<h1>" + esc(t("hero.title")) + ' <span class="accent">' + esc(t("hero.titleAccent")) + "</span></h1>" +
      '<p class="hero-desc">' + esc(t("hero.desc")) + "</p>" +
      '<div class="hero-cta">' +
      '<button type="button" class="btn btn-gold" data-goto="tours">' + esc(t("hero.cta1")) + icon("arrow") + "</button>" +
      '<button type="button" class="btn btn-ghost" data-goto="custom">' + icon("sliders") + esc(t("hero.cta2")) + "</button>" +
      "</div>" +
      '<div class="hero-stats">' + stats.map(function (s) {
        return '<div class="stat"><div class="stat-v">' + esc(s.v) + '</div><div class="stat-l">' + esc(t(s.k)) + "</div></div>";
      }).join("") + "</div>" +
      "</div></section>" +

      '<section class="sec">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.tours")) + "</span>" +
      '<h2 class="sec-title">' + esc(t("home.featuredTitle")) + "</h2>" +
      '<p class="sec-desc">' + esc(t("home.featuredDesc")) + "</p></div>" +
      '<button type="button" class="link-more" data-goto="tours">' + esc(t("home.viewAll")) + icon("arrow") + "</button></div>" +
      '<div class="grid-tours">' + featured.map(tourCard).join("") + "</div></section>" +

      '<section class="sec">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.destinations")) + "</span>" +
      '<h2 class="sec-title">' + esc(t("home.destTitle")) + "</h2>" +
      '<p class="sec-desc">' + esc(t("home.destDesc")) + "</p></div></div>" +
      '<div class="grid-dest">' + DESTINATIONS.map(destCard).join("") + "</div></section>" +

      '<section class="sec">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("foot.company")) + "</span>" +
      '<h2 class="sec-title">' + esc(t("home.whyTitle")) + "</h2>" +
      '<p class="sec-desc">' + esc(t("home.whyDesc")) + "</p></div></div>" +
      '<div class="grid-why">' + why.map(function (w) {
        return '<article class="card why-card"><span class="why-ico">' + icon(w.i) + "</span>" +
          "<h3>" + esc(t(w.t)) + "</h3><p>" + esc(t(w.d)) + "</p></article>";
      }).join("") + "</div></section>" +

      '<section class="sec">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.reviews")) + "</span>" +
      '<h2 class="sec-title">' + esc(t("home.reviewsTitle")) + "</h2>" +
      '<p class="sec-desc">' + esc(t("home.reviewsDesc")) + "</p></div>" +
      '<button type="button" class="link-more" data-goto="reviews">' + esc(t("home.reviewsLink")) + icon("arrow") + "</button></div>" +
      '<div class="grid-reviews">' + topReviews.map(function (r) { return reviewCard(r); }).join("") + "</div></section>" +

      '<section class="sec"><div class="card" style="padding:clamp(20px,3vw,34px);background:' +
      'radial-gradient(600px 220px at 100% 0%, rgba(212,175,55,.16), transparent 70%), linear-gradient(180deg, rgba(30,41,59,.7), rgba(15,23,42,.85));' +
      'border-color:rgba(212,175,55,.28)">' +
      '<span class="eyebrow">' + esc(t("build.title")) + "</span>" +
      '<h2 class="sec-title" style="max-width:22ch">' + esc(t("home.ctaTitle")) + "</h2>" +
      '<p class="sec-desc" style="margin-top:8px">' + esc(t("home.ctaDesc")) + "</p>" +
      '<div class="hero-cta"><button type="button" class="btn btn-gold" data-goto="custom">' +
      esc(t("home.ctaBtn")) + icon("arrow") + "</button></div></div></section>" +
      "</div>";
  }

  function viewDestinations() {
    return '<div class="container view-anim">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("brand.tagline")) + "</span>" +
      '<h1 class="sec-title">' + esc(t("dest.title")) + "</h1>" +
      '<p class="sec-desc">' + esc(t("dest.desc")) + "</p></div></div>" +
      '<div class="grid-dest">' + DESTINATIONS.map(destCard).join("") + "</div>" +
      "</div>";
  }

  function viewDestination(id) {
    var dest = destById(id);
    if (!dest) return viewDestinations();
    var cityTours = TOURS.filter(function (tour) { return tour.cities.indexOf(dest.id) >= 0; });
    var gallery = dest.gallery.filter(function (src) { return src !== dest.img; }).slice(0, 3);

    return '<div class="container view-anim">' +
      '<button type="button" class="link-more" data-goto="destinations" style="margin-bottom:12px">' +
      '<svg viewBox="0 0 24 24" style="transform:rotate(180deg)" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
      esc(t("dest.title")) + "</button>" +
      '<section class="detail-hero">' +
      '<img src="' + dest.img + '" alt="' + esc(pick(dest.name)) + '">' +
      '<div class="detail-hero-body">' +
      '<span class="eyebrow">' + esc(pick(dest.region)) + "</span>" +
      "<h1>" + esc(pick(dest.name)) + "</h1>" +
      '<p class="tag">' + esc(pick(dest.tagline)) + "</p></div></section>" +

      '<div class="detail-grid">' +
      "<div>" +
      '<p class="prose">' + esc(pick(dest.desc)) + "</p>" +
      '<div class="sec" style="margin-top:18px"><h2 class="sec-title" style="font-size:1.15rem">' +
      esc(t("dest.highlights")) + "</h2>" +
      '<ul class="hl-list">' + dest.highlights[state.lang].map(function (h) {
        return "<li>" + esc(h) + "</li>";
      }).join("") + "</ul></div>" +
      (gallery.length ? '<div class="gallery">' + gallery.map(function (src) {
        return '<img src="' + src + '" alt="' + esc(pick(dest.name)) + '" loading="lazy">';
      }).join("") + "</div>" : "") +
      "</div>" +

      '<aside class="card info-panel">' +
      '<div class="info-row"><span class="k">' + esc(t("dest.bestTime")) + "</span>" +
      '<span class="v">' + esc(pick(dest.best)) + "</span></div>" +
      '<div class="info-row"><span class="k">' + esc(t("dest.stay")) + "</span>" +
      '<span class="v">' + esc(pick(dest.stay)) + "</span></div>" +
      '<div class="info-row"><span class="k">' + esc(t("detail.group")) + "</span>" +
      '<span class="v">2–16</span></div>' +
      '<button type="button" class="btn btn-gold btn-block" data-goto="tours">' +
      esc(t("dest.toursHere", { city: pick(dest.name) })) + "</button>" +
      "</aside></div>" +

      (cityTours.length ? '<section class="sec"><div class="sec-head"><div>' +
        '<h2 class="sec-title">' + esc(t("dest.toursHere", { city: pick(dest.name) })) + "</h2></div></div>" +
        '<div class="grid-tours">' + cityTours.map(tourCard).join("") + "</div></section>" : "") +
      "</div>";
  }

  /* ================= tours ================= */
  function matchesFilters(tour) {
    var f = state.filters;
    if (f.city !== "all" && tour.cities.indexOf(f.city) < 0) return false;
    if (f.style !== "all" && tour.style.indexOf(f.style) < 0) return false;
    if (f.duration === "short" && tour.days > 4) return false;
    if (f.duration === "medium" && (tour.days < 5 || tour.days > 7)) return false;
    if (f.duration === "long" && tour.days < 8) return false;
    if (f.budget === "low" && tour.price >= 600) return false;
    if (f.budget === "mid" && (tour.price < 600 || tour.price > 1200)) return false;
    if (f.budget === "high" && tour.price <= 1200) return false;
    return true;
  }

  function filteredTours() {
    var list = TOURS.filter(matchesFilters);
    var sort = state.filters.sort;
    list.sort(function (a, b) {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "duration") return a.days - b.days;
      return (b.rating * 100 + b.reviewCount / 100) - (a.rating * 100 + a.reviewCount / 100);
    });
    return list;
  }

  function selectOptions(items, current, valueKey, labelKey) {
    return items.map(function (item) {
      var value = valueKey ? item[valueKey] : item.value;
      var label = labelKey ? item[labelKey] : item.label;
      return '<option value="' + esc(value) + '"' + (String(value) === String(current) ? " selected" : "") + ">" +
        esc(label) + "</option>";
    }).join("");
  }

  function viewTours() {
    var list = filteredTours();
    var f = state.filters;
    var hasFilter = f.city !== "all" || f.style !== "all" || f.duration !== "all" || f.budget !== "all";
    var total = TOURS.length;

    var cityOptions = [{ value: "all", label: t("filt.all") }].concat(DESTINATIONS.map(function (d) {
      return { value: d.id, label: pick(d.name) };
    }));
    var styleOptions = [
      { value: "all", label: t("filt.all") },
      { value: "cultural", label: t("style.cultural") },
      { value: "adventure", label: t("style.adventure") },
      { value: "luxury", label: t("style.luxury") }
    ];
    var durationOptions = [
      { value: "all", label: t("filt.all") },
      { value: "short", label: t("dur.short") },
      { value: "medium", label: t("dur.medium") },
      { value: "long", label: t("dur.long") }
    ];
    var budgetOptions = [
      { value: "all", label: t("filt.anyBudget") },
      { value: "low", label: t("filt.under") + " " + money(600) },
      { value: "mid", label: money(600) + " – " + money(1200) },
      { value: "high", label: t("filt.over") + " " + money(1200) }
    ];
    var sortOptions = [
      { value: "recommended", label: t("sort.recommended") },
      { value: "priceAsc", label: t("sort.priceAsc") },
      { value: "priceDesc", label: t("sort.priceDesc") },
      { value: "duration", label: t("sort.duration") }
    ];

    var body = list.length
      ? '<div class="grid-tours">' + list.map(tourCard).join("") + "</div>"
      : '<div class="empty-state"><span class="empty-ico">' + icon("compass") + "</span>" +
        "<h3>" + esc(t("filt.none")) + "</h3><p>" + esc(t("filt.noneHint")) + "</p>" +
        '<button type="button" class="btn btn-ghost btn-sm" data-reset-filters>' + esc(t("filt.reset")) + "</button></div>";

    return '<div class="container view-anim">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("brand.tagline")) + "</span>" +
      '<h1 class="sec-title">' + esc(t("tours.title")) + "</h1>" +
      '<p class="sec-desc">' + esc(t("tours.desc")) + "</p></div></div>" +

      '<div class="filters">' +
      '<div class="field-inline"><label for="fCity">' + esc(t("filt.city")) + "</label>" +
      '<select class="input" id="fCity" data-filter="city">' + selectOptions(cityOptions, f.city) + "</select></div>" +
      '<div class="field-inline"><label for="fStyle">' + esc(t("filt.style")) + "</label>" +
      '<select class="input" id="fStyle" data-filter="style">' + selectOptions(styleOptions, f.style) + "</select></div>" +
      '<div class="field-inline"><label for="fDuration">' + esc(t("filt.duration")) + "</label>" +
      '<select class="input" id="fDuration" data-filter="duration">' + selectOptions(durationOptions, f.duration) + "</select></div>" +
      '<div class="field-inline"><label for="fBudget">' + esc(t("filt.budget")) + "</label>" +
      '<select class="input" id="fBudget" data-filter="budget">' + selectOptions(budgetOptions, f.budget) + "</select></div>" +
      '<div class="field-inline"><label for="fSort">' + esc(t("filt.sort")) + "</label>" +
      '<select class="input" id="fSort" data-filter="sort">' + selectOptions(sortOptions, f.sort) + "</select></div>" +
      "</div>" +

      '<div class="results-line"><span>' + esc(t("filt.results", { n: list.length, total: total })) + "</span>" +
      (hasFilter ? '<button type="button" class="link-more" data-reset-filters>' + esc(t("filt.reset")) + "</button>" : "") +
      "</div>" +
      body + "</div>";
  }

  function bindFilters() {
    $$("[data-filter]").forEach(function (select) {
      select.addEventListener("change", function () {
        var key = select.getAttribute("data-filter");
        state.filters[key] = select.value;
        renderView();
      });
    });
  }

  /* ================= custom builder ================= */
  function ensureBuilder() {
    if (!state.builder) {
      var today = startOfToday();
      state.builder = {
        start: toISO(addDays(today, 30)),
        end: toISO(addDays(today, 37)),
        cities: ["samarkand", "bukhara"],
        pace: "balanced",
        hotel: "4",
        adults: 2,
        children: 0,
        name: state.user && state.user.name ? state.user.name : "",
        email: state.user && state.user.email ? state.user.email : "",
        notes: "",
        errors: {},
        done: false,
        ref: ""
      };
    }
    return state.builder;
  }

  function builderEstimate(b) {
    var nights = Math.max(0, nightsBetween(b.start, b.end));
    var rates = { "3": 70, "4": 110, "5": 200, boutique: 160 };
    var paces = { relaxed: 0.95, balanced: 1, intensive: 1.1 };
    var rate = rates[b.hotel] || 110;
    var pace = paces[b.pace] || 1;
    var cityFactor = 1 + 0.08 * Math.max(0, b.cities.length - 1);
    var travellers = b.adults + b.children * 0.5;
    return { nights: nights, total: Math.round((nights * rate * pace * cityFactor * travellers) / 10) * 10 };
  }

  function choice(label, value, selected, sub, type, name) {
    return '<label class="choice' + (selected ? " selected" : "") + '">' +
      '<input type="' + (type || "radio") + '" name="' + name + '" value="' + esc(value) + '"' + (selected ? " checked" : "") + ">" +
      '<span class="c-title">' + esc(label) + "</span>" +
      (sub ? '<span class="c-sub">' + esc(sub) + "</span>" : "") + "</label>";
  }

  function viewCustom() {
    var b = ensureBuilder();
    var est = builderEstimate(b);

    var content = b.done
      ? '<div class="card" style="padding:clamp(20px,3vw,30px)"><div class="success">' +
        '<span class="success-ico">' + icon("check") + "</span>" +
        "<h3>" + esc(t("build.successTitle")) + "</h3>" +
        "<p>" + esc(t("build.successDesc", { ref: b.ref, email: b.email })) + "</p>" +
        '<div class="ref-box">' + esc(b.ref) + "</div>" +
        '<div class="row" style="justify-content:center;margin-top:6px">' +
        '<button type="button" class="btn btn-gold" data-goto="bookings">' + esc(t("build.viewBookings")) + "</button>" +
        '<button type="button" class="btn btn-ghost" data-action="builder-reset">' + esc(t("build.another")) + "</button>" +
        "</div></div></div>"
      : '<form id="builderForm" novalidate>' +
        '<div class="card" style="padding:clamp(16px,2.4vw,24px)">' +
        '<div class="stack">' +
        '<div><h2 class="sec-title" style="font-size:1.15rem">' + esc(t("build.dates")) + "</h2></div>" +
        '<div class="form-grid">' +
        '<div class="field"><label for="bStart">' + esc(t("build.start")) + '<span class="req">*</span></label>' +
        '<input class="input" type="date" id="bStart" data-b="start" min="' + toISO(startOfToday()) + '" value="' + esc(b.start) + '">' +
        '<span class="field-err" data-err="start"></span></div>' +
        '<div class="field"><label for="bEnd">' + esc(t("build.end")) + '<span class="req">*</span></label>' +
        '<input class="input" type="date" id="bEnd" data-b="end" min="' + toISO(startOfToday()) + '" value="' + esc(b.end) + '">' +
        '<span class="field-err" data-err="end"></span></div>' +
        "</div></div>" +

        '<div class="stack"><div><h2 class="sec-title" style="font-size:1.15rem">' + esc(t("build.cities")) + "</h2>" +
        '<p class="small muted" style="margin-top:4px">' + esc(t("build.citiesHint")) + "</p></div>" +
        '<div class="choice-grid">' + DESTINATIONS.map(function (d) {
          return choice(pick(d.name), d.id, b.cities.indexOf(d.id) >= 0, pick(d.region), "checkbox", "cities");
        }).join("") + "</div>" +
        '<span class="field-err" data-err="cities"></span></div>' +

        '<div class="stack"><div><h2 class="sec-title" style="font-size:1.15rem">' + esc(t("build.pace")) + "</h2></div>" +
        '<div class="choice-grid">' +
        choice(t("build.paceRelaxed"), "relaxed", b.pace === "relaxed", t("build.paceRelaxedD"), "radio", "pace") +
        choice(t("build.paceBalanced"), "balanced", b.pace === "balanced", t("build.paceBalancedD"), "radio", "pace") +
        choice(t("build.paceIntensive"), "intensive", b.pace === "intensive", t("build.paceIntensiveD"), "radio", "pace") +
        "</div></div>" +

        '<div class="stack"><div><h2 class="sec-title" style="font-size:1.15rem">' + esc(t("build.hotel")) + "</h2></div>" +
        '<div class="choice-grid">' +
        choice(t("build.hotel3"), "3", b.hotel === "3", "3★", "radio", "hotel") +
        choice(t("build.hotel4"), "4", b.hotel === "4", "4★", "radio", "hotel") +
        choice(t("build.hotel5"), "5", b.hotel === "5", "5★", "radio", "hotel") +
        choice(t("build.hotelBoutique"), "boutique", b.hotel === "boutique", "", "radio", "hotel") +
        "</div></div>" +

        '<div class="stack"><div><h2 class="sec-title" style="font-size:1.15rem">' + esc(t("build.guests")) + "</h2></div>" +
        '<div class="form-grid">' +
        '<div class="field"><label>' + esc(t("book.adults")) + "</label>" +
        '<div class="stepper"><button type="button" data-step="adults" data-dir="-1" aria-label="-">−</button>' +
        '<span class="val" id="bAdults">' + b.adults + "</span>" +
        '<button type="button" data-step="adults" data-dir="1" aria-label="+">+</button></div></div>' +
        '<div class="field"><label>' + esc(t("book.children")) + ' <span class="muted">(' + esc(t("common.optional")) + ")</span></label>" +
        '<div class="stepper"><button type="button" data-step="children" data-dir="-1" aria-label="-">−</button>' +
        '<span class="val" id="bChildren">' + b.children + "</span>" +
        '<button type="button" data-step="children" data-dir="1" aria-label="+">+</button></div></div>' +
        "</div></div>" +

        '<div class="stack"><div class="form-grid">' +
        '<div class="field"><label for="bName">' + esc(t("book.name")) + '<span class="req">*</span></label>' +
        '<input class="input" id="bName" data-b="name" value="' + esc(b.name) + '" autocomplete="name">' +
        '<span class="field-err" data-err="name"></span></div>' +
        '<div class="field"><label for="bEmail">' + esc(t("book.email")) + '<span class="req">*</span></label>' +
        '<input class="input" id="bEmail" type="email" data-b="email" value="' + esc(b.email) + '" autocomplete="email">' +
        '<span class="field-err" data-err="email"></span></div>' +
        '<div class="field span2"><label for="bNotes">' + esc(t("build.notes")) +
        ' <span class="muted">(' + esc(t("common.optional")) + ")</span></label>" +
        '<textarea class="input" id="bNotes" data-b="notes" placeholder="' + esc(t("build.notesHint")) + '">' + esc(b.notes) + "</textarea></div>" +
        "</div></div>" +

        '<div class="sum-box"><div class="sum-row"><span>' + esc(t("build.estimate")) + "</span>" +
        '<span id="estimateValue">' + (est.nights > 0 ? esc(money(est.total)) : "—") + "</span></div>" +
        '<div class="sum-note" id="estimateNote">' +
        esc(t("build.estimateNote", { n: b.adults + b.children, d: est.nights })) + "</div></div>" +

        '<button type="submit" class="btn btn-gold btn-block">' + esc(t("build.submit")) + icon("arrow") + "</button>" +
        "</div></form>";

    return '<div class="container view-anim">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.custom")) + "</span>" +
      '<h1 class="sec-title">' + esc(t("build.title")) + "</h1>" +
      '<p class="sec-desc">' + esc(t("build.desc")) + "</p></div></div>" +
      content + "</div>";
  }

  function bindBuilder() {
    var form = $("#builderForm");
    if (!form) return;
    var b = ensureBuilder();

    function sync() {
      b.start = $("#bStart").value;
      b.end = $("#bEnd").value;
      b.adults = parseInt($("#bAdults").textContent, 10) || 1;
      b.children = parseInt($("#bChildren").textContent, 10) || 0;
      b.name = $("#bName").value;
      b.email = $("#bEmail").value;
      b.notes = $("#bNotes").value;
      var est = builderEstimate(b);
      var valueEl = $("#estimateValue");
      var noteEl = $("#estimateNote");
      if (valueEl) valueEl.textContent = est.nights > 0 ? money(est.total) : "—";
      if (noteEl) noteEl.textContent = t("build.estimateNote", { n: b.adults + b.children, d: est.nights });
    }

    form.addEventListener("change", function (event) {
      var target = event.target;
      if (target.name === "cities") {
        b.cities = $$('input[name="cities"]:checked', form).map(function (i) { return i.value; });
        $$(".choice", form).forEach(function (label) {
          var input = label.querySelector("input");
          if (input && input.name === "cities") label.classList.toggle("selected", input.checked);
        });
      } else if (target.name === "pace") {
        b.pace = target.value;
        $$('input[name="pace"]').forEach(function (input) {
          input.closest(".choice").classList.toggle("selected", input.checked);
        });
      } else if (target.name === "hotel") {
        b.hotel = target.value;
        $$('input[name="hotel"]').forEach(function (input) {
          input.closest(".choice").classList.toggle("selected", input.checked);
        });
      }
      sync();
    });

    form.addEventListener("input", function (event) {
      var key = event.target.getAttribute("data-b");
      if (key) {
        var err = form.querySelector('[data-err="' + key + '"]');
        if (err) err.textContent = "";
        event.target.removeAttribute("aria-invalid");
      }
      sync();
    });

    $$("[data-step]", form).forEach(function (button) {
      button.addEventListener("click", function () {
        var field = button.getAttribute("data-step");
        var dir = parseInt(button.getAttribute("data-dir"), 10);
        var elId = field === "adults" ? "#bAdults" : "#bChildren";
        var value = parseInt($(elId).textContent, 10) || 0;
        var max = field === "adults" ? CONFIG.maxGuests : CONFIG.maxChildren;
        var min = field === "adults" ? 1 : 0;
        var total = b.adults + b.children;
        if (dir > 0 && total >= CONFIG.maxGuests) return;
        value = Math.max(min, Math.min(max, value + dir));
        $(elId).textContent = value;
        sync();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sync();
      var errors = {};
      if (!b.start) errors.start = t("err.date");
      if (!b.end) errors.end = t("err.date");
      if (b.start && b.end && nightsBetween(b.start, b.end) <= 0) errors.end = t("err.range");
      if (!b.cities.length) errors.cities = t("err.cities");
      if (b.name.trim().length < 2) errors.name = t("err.name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email.trim())) errors.email = t("err.email");

      $$("[data-err]", form).forEach(function (node) { node.textContent = ""; });
      $$(".input", form).forEach(function (node) { node.removeAttribute("aria-invalid"); });

      var keys = Object.keys(errors);
      if (keys.length) {
        keys.forEach(function (key) {
          var node = form.querySelector('[data-err="' + key + '"]');
          if (node) node.textContent = errors[key];
          var input = form.querySelector('[data-b="' + key + '"]');
          if (input) input.setAttribute("aria-invalid", "true");
        });
        var first = form.querySelector('[data-err="' + keys[0] + '"]');
        if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
        return;
      }

      var est = builderEstimate(b);
      var ref = makeRef("REQ");
      state.bookings.unshift({
        id: ref,
        type: "custom",
        title: b.cities.map(function (id) { var d = destById(id); return d ? pick(d.name) : id; }).join(" · "),
        start: b.start,
        end: b.end,
        adults: b.adults,
        children: b.children,
        travellers: b.adults + b.children,
        nights: est.nights,
        pace: b.pace,
        hotel: b.hotel,
        cities: b.cities.slice(),
        name: b.name,
        email: b.email,
        notes: b.notes,
        total: est.total,
        status: "pending",
        createdAt: new Date().toISOString()
      });
      write(STORE.bookings, state.bookings);
      b.done = true;
      b.ref = ref;
      renderView();
      renderNav();
      toast(t("build.successTitle"));
    });
  }

  /* ================= bookings ================= */
  function bookingCard(booking) {
    var tour = booking.tourId ? byId(booking.tourId) : null;
    var firstCity = booking.cities && booking.cities.length ? destById(booking.cities[0]) : null;
    var img = tour ? tour.img : (firstCity ? firstCity.img : "assets/img/registan.jpg");
    var title = tour ? pick(tour.title) : (booking.cities || []).map(function (id) {
      var d = destById(id);
      return d ? pick(d.name) : id;
    }).join(" · ");
    var dates = tour
      ? (booking.date ? t("bookings.depart", { date: formatDate(booking.date) }) : "")
      : formatDate(booking.start) + " → " + formatDate(booking.end);
    var statusKey = booking.status === "cancelled" ? "status.cancelled" : (booking.status === "pending" ? "status.pending" : "status.confirmed");

    return '<article class="card booking-card">' +
      '<div class="booking-media"><img src="' + img + '" alt="" loading="lazy"></div>' +
      '<div class="booking-body">' +
      '<div class="booking-top"><div class="booking-title">' + esc(title || t("bookings.typeCustom")) + "</div>" +
      '<span class="status ' + esc(booking.status) + '">' + esc(t(statusKey)) + "</span></div>" +
      '<div class="booking-meta">' +
      "<span>" + esc(t("bookings.ref")) + ": <b style=\"color:var(--gold-light)\">" + esc(booking.id) + "</b></span>" +
      "<span>" + esc(dates) + "</span>" +
      "<span>" + esc(t("book.travelers", { a: booking.adults, c: booking.children })) + "</span>" +
      "</div>" +
      '<div class="booking-foot">' +
      '<span class="booking-total">' + esc(t("bookings.total")) + ": <b>" + esc(money(booking.total)) + "</b></span>" +
      '<div class="row" style="gap:6px">' +
      (tour ? '<button type="button" class="btn btn-ghost btn-sm" data-tour="' + tour.id + '">' + esc(t("bookings.view")) + "</button>" : "") +
      (booking.status !== "cancelled" ? '<button type="button" class="btn btn-quiet btn-sm" data-cancel="' + esc(booking.id) + '">' + esc(t("bookings.cancel")) + "</button>" : "") +
      "</div></div></div></article>";
  }

  function viewBookings() {
    var list = state.bookings.slice().sort(function (a, b) {
      return String(b.createdAt).localeCompare(String(a.createdAt));
    });

    var body = list.length
      ? '<div class="stack">' + list.map(bookingCard).join("") + "</div>"
      : '<div class="empty-state"><span class="empty-ico">' + icon("ticket") + "</span>" +
        "<h3>" + esc(t("bookings.empty")) + "</h3><p>" + esc(t("bookings.emptyDesc")) + "</p>" +
        '<button type="button" class="btn btn-gold btn-sm" data-goto="tours">' + esc(t("bookings.browse")) + "</button></div>";

    return '<div class="container view-anim">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.account")) + "</span>" +
      '<h1 class="sec-title">' + esc(t("bookings.title")) + "</h1>" +
      '<p class="sec-desc">' + esc(t("bookings.desc")) + "</p></div></div>" +
      body + "</div>";
  }

  /* ================= reviews ================= */
  function viewReviews() {
    var list = allReviews();
    var total = list.length;
    var average = total ? list.reduce(function (sum, r) { return sum + r.rating; }, 0) / total : 0;
    var counts = [0, 0, 0, 0, 0];
    list.forEach(function (r) { counts[5 - Math.round(r.rating)] += 1; });

    if (!state.reviewDraft) state.reviewDraft = { rating: 5 };

    var bars = [5, 4, 3, 2, 1].map(function (star) {
      var count = counts[5 - star];
      var pct = total ? Math.round((count / total) * 100) : 0;
      return '<div class="rating-bar"><span>' + star + " ★</span>" +
        '<span class="track"><span class="fill" style="width:' + pct + '%"></span></span>' +
        "<span>" + count + "</span></div>";
    }).join("");

    var tourOptions = [{ value: "", label: "—" }].concat(TOURS.map(function (tour) {
      return { value: tour.id, label: pick(tour.title) };
    }));

    return '<div class="container view-anim">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.reviews")) + "</span>" +
      '<h1 class="sec-title">' + esc(t("rev.title")) + "</h1>" +
      '<p class="sec-desc">' + esc(t("rev.desc")) + "</p></div></div>" +

      '<div class="card rating-summary">' +
      "<div><div class=\"rating-big\">" + average.toFixed(1) + "</div>" +
      '<div class="review-stars" style="font-size:14px">' + stars(average) + "</div>" +
      '<div class="small muted" style="margin-top:4px">' + esc(t("rev.count", { n: total })) + "</div></div>" +
      '<div class="rating-bars">' + bars + "</div></div>" +

      '<section class="sec"><div class="sec-head"><div>' +
      '<h2 class="sec-title" style="font-size:1.2rem">' + esc(t("rev.write")) + "</h2></div></div>" +
      '<form id="reviewForm" class="card" style="padding:clamp(16px,2.4vw,22px)" novalidate>' +
      '<div class="form-grid">' +
      '<div class="field"><label for="rvName">' + esc(t("rev.yourName")) + '<span class="req">*</span></label>' +
      '<input class="input" id="rvName" value="' + esc(state.user ? state.user.name : "") + '" autocomplete="name">' +
      '<span class="field-err" data-err="rvName"></span></div>' +
      '<div class="field"><label for="rvTour">' + esc(t("rev.yourTour")) + "</label>" +
      '<select class="input" id="rvTour">' + selectOptions(tourOptions, "") + "</select></div>" +
      '<div class="field span2"><label>' + esc(t("rev.rating")) + "</label>" +
      '<div class="row" id="ratingPick" role="radiogroup" aria-label="' + esc(t("rev.rating")) + '">' +
      [1, 2, 3, 4, 5].map(function (n) {
        return '<button type="button" class="star-btn" data-rate="' + n + '" role="radio" aria-checked="' +
          (state.reviewDraft.rating === n) + '" aria-label="' + esc(t("rev.stars", { n: n })) + '" ' +
          'style="font-size:22px;line-height:1;border:0;background:none;cursor:pointer;padding:2px 3px;color:' +
          (n <= state.reviewDraft.rating ? "#D4AF37" : "#3B4A61") + '">★</button>';
      }).join("") + "</div></div>" +
      '<div class="field span2"><label for="rvText">' + esc(t("rev.text")) + '<span class="req">*</span></label>' +
      '<textarea class="input" id="rvText" placeholder="' + esc(t("rev.textHint")) + '"></textarea>' +
      '<span class="field-err" data-err="rvText"></span></div>' +
      "</div>" +
      '<div style="margin-top:12px"><button type="submit" class="btn btn-gold">' + esc(t("rev.submit")) + "</button></div>" +
      "</form></section>" +

      '<section class="sec"><div class="grid-reviews">' +
      list.map(function (r) {
        return reviewCard(r, { canDelete: String(r.id).indexOf("u-") === 0 });
      }).join("") + "</div></section></div>";
  }

  function bindReviewForm() {
    var form = $("#reviewForm");
    if (!form) return;
    var pick = $("#ratingPick");
    if (pick) {
      pick.addEventListener("click", function (event) {
        var button = event.target.closest("[data-rate]");
        if (!button) return;
        state.reviewDraft.rating = parseInt(button.getAttribute("data-rate"), 10);
        $$("[data-rate]", pick).forEach(function (node) {
          var value = parseInt(node.getAttribute("data-rate"), 10);
          node.style.color = value <= state.reviewDraft.rating ? "#D4AF37" : "#3B4A61";
          node.setAttribute("aria-checked", value === state.reviewDraft.rating ? "true" : "false");
        });
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = $("#rvName").value.trim();
      var text = $("#rvText").value.trim();
      var tour = $("#rvTour").value;
      var errors = {};
      if (name.length < 2) errors.rvName = t("err.name");
      if (text.length < 10) errors.rvText = t("err.required");

      $$("[data-err]", form).forEach(function (node) { node.textContent = ""; });
      $$(".input", form).forEach(function (node) { node.removeAttribute("aria-invalid"); });
      var keys = Object.keys(errors);
      if (keys.length) {
        keys.forEach(function (key) {
          var node = form.querySelector('[data-err="' + key + '"]');
          if (node) node.textContent = errors[key];
          var field = $("#" + key);
          if (field) field.setAttribute("aria-invalid", "true");
        });
        return;
      }

      state.reviews.unshift({
        id: "u-" + Date.now().toString(36),
        name: name,
        country: "",
        tour: tour || "",
        rating: state.reviewDraft.rating,
        date: toISO(startOfToday()),
        initials: initials(name),
        text: text
      });
      write(STORE.reviews, state.reviews);
      state.reviewDraft.rating = 5;
      renderView();
      toast(t("rev.thanks"));
    });
  }

  /* ================= support ================= */
  function viewSupport() {
    var c = CONFIG.contact;
    var wa = c.whatsapp.replace(/[^\d]/g, "");

    return '<div class="container view-anim">' +
      '<div class="sec-head"><div><span class="eyebrow">' + esc(t("nav.support")) + "</span>" +
      '<h1 class="sec-title">' + esc(t("sup.title")) + "</h1>" +
      '<p class="sec-desc">' + esc(t("sup.desc")) + "</p></div></div>" +

      '<div class="contact-grid">' +
      '<div class="card contact-card"><span class="ico">' + icon("phone") + "</span>" +
      '<span class="k">' + esc(t("sup.call")) + "</span>" +
      '<a class="v" href="tel:' + c.phoneHref + '">' + esc(c.phone) + "</a></div>" +
      '<div class="card contact-card"><span class="ico">' + icon("chat") + "</span>" +
      '<span class="k">' + esc(t("sup.whatsapp")) + "</span>" +
      '<a class="v" href="https://wa.me/' + wa + '" target="_blank" rel="noopener noreferrer">' + esc(c.whatsapp) + "</a></div>" +
      '<div class="card contact-card"><span class="ico">' + icon("mail") + "</span>" +
      '<span class="k">' + esc(t("sup.emailLbl")) + "</span>" +
      '<a class="v" href="mailto:' + c.email + '">' + esc(c.email) + "</a></div>" +
      '<div class="card contact-card"><span class="ico">' + icon("map") + "</span>" +
      '<span class="k">' + esc(t("sup.office")) + "</span>" +
      '<span class="v">' + esc(c.address) + "</span></div>" +
      '<div class="card contact-card"><span class="ico">' + icon("clock") + "</span>" +
      '<span class="k">' + esc(t("sup.hours")) + "</span>" +
      '<span class="v">' + esc(c.hours) + "</span></div>" +
      "</div>" +

      '<div class="two-col sec">' +
      '<div class="card" style="padding:18px"><h3 class="subhead">' + esc(t("sup.visaTitle")) + "</h3>" +
      '<p class="small muted" style="line-height:1.7">' + esc(t("sup.visaText")) + "</p>" +
      '<a class="link-more" href="https://e-visa.gov.uz" target="_blank" rel="noopener noreferrer" style="margin-top:8px;display:inline-flex">' +
      esc(t("sup.visaLink")) + icon("arrow") + "</a></div>" +
      '<div class="card" style="padding:18px"><h3 class="subhead">' + esc(t("sup.emergencyTitle")) + "</h3>" +
      '<p class="small muted" style="line-height:1.7">' + esc(t("sup.emergencyText")) + "</p></div>" +
      "</div>" +

      '<section class="sec"><div class="sec-head"><div>' +
      '<h2 class="sec-title" style="font-size:1.25rem">' + esc(t("sup.faq")) + "</h2></div></div>" +
      '<div class="faq">' + FAQS.map(function (item, index) {
        return '<div class="faq-item"><button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-' + item.id + '">' +
          "<span>" + esc(pick(item.q)) + "</span>" + icon("arrow", "chev") + "</button>" +
          '<div class="faq-a" id="faq-' + item.id + '">' + esc(pick(item.a)) + "</div></div>";
      }).join("") + "</div></section>" +

      '<section class="sec"><div class="card" style="padding:18px">' +
      '<h3 class="subhead">' + esc(t("sup.bookingHelp")) + "</h3>" +
      '<p class="small muted">' + esc(t("sup.bookingHelpText")) + "</p></div></section>" +
      "</div>";
  }

  /* ================= modal plumbing ================= */
  function openModal(config) {
    state.lastFocus = document.activeElement;
    state.modal = config;
    var root = $("#modalRoot");
    root.innerHTML = '<div class="overlay" data-overlay><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle" id="activeModal"></div></div>';
    document.body.classList.add("no-scroll");
    var overlay = $("[data-overlay]", root);
    overlay.addEventListener("mousedown", function (event) {
      if (event.target === overlay) closeModal();
    });
    var modal = $("#activeModal");
    modal.addEventListener("click", onModalClick);
    modal.addEventListener("input", onModalInput);
    modal.addEventListener("change", onModalInput);
    paintModal();
  }

  function closeModal() {
    state.modal = null;
    $("#modalRoot").innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (state.lastFocus && typeof state.lastFocus.focus === "function") {
      try { state.lastFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
    state.lastFocus = null;
  }

  function paintModal() {
    var modal = $("#activeModal");
    if (!modal || !state.modal) return;
    var type = state.modal.type;
    modal.className = "modal" + (type === "auth" || type === "confirm" ? " narrow" : (type === "tour" ? " wide" : ""));
    modal.innerHTML = modalContent();
    var focusTarget = modal.querySelector("[data-focus]") || modal.querySelector(".x-btn");
    if (focusTarget) {
      try { focusTarget.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }

  function modalContent() {
    if (!state.modal) return "";
    switch (state.modal.type) {
      case "tour": return tourModalHTML();
      case "booking": return bookingModalHTML();
      case "auth": return authModalHTML();
      case "confirm": return confirmModalHTML();
      default: return "";
    }
  }

  /* ================= tour modal ================= */
  function openTour(id) {
    var tour = byId(id);
    if (!tour) return;
    openModal({ type: "tour", tourId: id });
  }

  function tourModalHTML() {
    var tour = byId(state.modal.tourId);
    if (!tour) return "";
    var hotelLabel = tour.hotel === "hotel5" ? t("build.hotel5") : t("build.hotel4");
    var styles = tour.style.map(function (s) { return t("style." + s); }).join(" · ");
    var single = Math.round((tour.price * 0.35) / 10) * 10;

    var meta = [
      { i: "calendar", v: t("card.days", { n: tour.days }) + " / " + t("card.nights", { n: tour.nights }) },
      { i: "users", v: tour.group },
      { i: "bed", v: hotelLabel },
      { i: "compass", v: styles }
    ];

    var includes = tour.includes.map(function (key) {
      return "<li>" + icon("check") + "<span>" + esc(pick(INC[key])) + "</span></li>";
    }).join("");
    var excludes = tour.excludes.map(function (key) {
      return "<li>" + icon("x") + "<span>" + esc(pick(EXC[key])) + "</span></li>";
    }).join("");

    return '<div class="modal-hero">' +
      '<img src="' + tour.img + '" alt="' + esc(pick(tour.title)) + '">' +
      '<button type="button" class="x-btn" data-act="close" aria-label="' + esc(t("common.close")) + '" ' +
      'style="position:absolute;top:12px;right:12px;z-index:4;background:rgba(7,11,22,.7)">' + icon("x") + "</button>" +
      '<div class="modal-hero-body"><span class="eyebrow">' + esc(cityNames(tour.cities)) + "</span>" +
      '<h2 class="sec-title" id="mTitle" style="margin-top:4px">' + esc(pick(tour.title)) + "</h2>" +
      '<div class="row" style="margin-top:6px;gap:10px"><span class="rating"><span class="star">★</span><b>' +
      tour.rating.toFixed(1) + "</b><small>" + esc(t("detail.reviews", { n: tour.reviewCount })) + "</small></span>" +
      '<span class="pill gold">' + esc(t("detail.departures")) + "</span></div></div></div>" +

      '<div class="modal-body">' +
      '<div class="pill-row" style="margin-bottom:14px">' + meta.map(function (m) {
        return '<span class="pill">' + icon(m.i) + " " + esc(m.v) + "</span>";
      }).join("") + "</div>" +

      '<p class="prose">' + esc(pick(tour.summary)) + "</p>" +

      '<div class="section-head" style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin:20px 0 4px;flex-wrap:wrap">' +
      "<h3 class=\"subhead\" style=\"margin:0\">" + esc(t("detail.itinerary")) + "</h3>" +
      '<span class="small muted">' + esc(t("detail.basis")) + "</span></div>" +
      '<div class="itin">' + tour.itinerary.map(function (day) {
        return '<div class="itin-day"><span class="itin-num">' + day.d + "</span>" +
          '<div class="itin-body"><div class="itin-t">' + esc(pick(day.t)) + "</div>" +
          '<div class="itin-x">' + esc(pick(day.x)) + "</div></div></div>";
      }).join("") + "</div>" +

      '<div class="two-col" style="margin-top:18px">' +
      '<div><h3 class="subhead">' + esc(t("detail.included")) + '</h3><ul class="list-check yes">' + includes + "</ul></div>" +
      '<div><h3 class="subhead">' + esc(t("detail.excluded")) + '</h3><ul class="list-check no">' + excludes + "</ul></div>" +
      "</div>" +

      '<div class="sum-box" style="margin-top:18px">' +
      '<div class="sum-row"><span>' + esc(t("detail.season")) + "</span><span>" + esc(pick(destById(tour.cities[0]).best)) + "</span></div>" +
      '<div class="sum-note">' + esc(t("detail.single", { price: money(single) })) + "</div>" +
      '<div class="sum-row total"><span>' + esc(t("card.from")) + "</span><span>" + esc(money(tour.price)) + "</span></div>" +
      '<div class="sum-note">' + esc(t("detail.basis")) + "</div></div>" +

      '<div class="row" style="margin-top:16px;justify-content:flex-end">' +
      '<button type="button" class="btn btn-ghost" data-act="ask">' + icon("chat") + esc(t("detail.ask")) + "</button>" +
      '<button type="button" class="btn btn-gold" data-act="book" data-id="' + tour.id + '">' +
      esc(t("detail.book")) + icon("arrow") + "</button></div></div>";
  }

  /* ================= booking modal ================= */
  function openBooking(tourId) {
    var tour = byId(tourId);
    if (!tour) return;
    openModal({
      type: "booking",
      tourId: tourId,
      step: 1,
      done: false,
      ref: "",
      errors: {},
      data: {
        date: toISO(addDays(startOfToday(), 14)),
        adults: 2,
        children: 0,
        style: tour.style[0],
        name: state.user ? state.user.name : "",
        email: state.user ? state.user.email : "",
        phone: "",
        requests: "",
        terms: false
      }
    });
  }

  function bookingTotals() {
    var tour = byId(state.modal.tourId);
    var d = state.modal.data;
    var adultsTotal = tour.price * d.adults;
    var childrenTotal = tour.price * 0.5 * d.children;
    var subtotal = adultsTotal + childrenTotal;
    var fee = subtotal * CONFIG.serviceFee;
    var total = subtotal + fee;
    return { adultsTotal: adultsTotal, childrenTotal: childrenTotal, subtotal: subtotal, fee: fee, total: total, deposit: total * CONFIG.depositRate };
  }

  function stepperHTML(field, value, label, hint) {
    return '<div class="field"><label>' + esc(label) + (hint ? ' <span class="muted small">(' + esc(hint) + ")</span>" : "") + "</label>" +
      '<div class="stepper"><button type="button" data-act="step" data-field="' + field + '" data-dir="-1" aria-label="−">−</button>' +
      '<span class="val" id="bk-' + field + '">' + value + "</span>" +
      '<button type="button" data-act="step" data-field="' + field + '" data-dir="1" aria-label="+">+</button></div>' +
      '<span class="field-err" data-berr="' + field + '"></span></div>';
  }

  function bookingModalHTML() {
    var m = state.modal;
    var tour = byId(m.tourId);
    var d = m.data;
    var totals = bookingTotals();
    var errs = m.errors || {};

    var head = '<div class="modal-head"><div style="min-width:0"><h2 id="mTitle">' + esc(t("book.title")) + "</h2>" +
      '<div class="mh-sub">' + esc(pick(tour.title)) + " · " + esc(t("card.days", { n: tour.days })) + "</div></div>" +
      '<button type="button" class="x-btn" data-act="close" aria-label="' + esc(t("common.close")) + '">' + icon("x") + "</button></div>";

    if (m.done) {
      return head + '<div class="modal-body"><div class="success">' +
        '<span class="success-ico">' + icon("check") + "</span>" +
        "<h3>" + esc(t("book.successTitle")) + "</h3>" +
        "<p>" + esc(t("book.successDesc", { email: d.email })) + "</p>" +
        '<div class="ref-box">' + esc(m.ref) + "</div>" +
        '<div class="row" style="justify-content:center;margin-top:6px">' +
        '<button type="button" class="btn btn-gold" data-act="gotoBookings">' + esc(t("book.viewBookings")) + "</button>" +
        '<button type="button" class="btn btn-ghost" data-act="close">' + esc(t("book.keepExploring")) + "</button>" +
        "</div></div></div>";
    }

    var steps = [t("book.step1"), t("book.step2"), t("book.step3")].map(function (label, index) {
      var n = index + 1;
      var cls = n === m.step ? "active" : (n < m.step ? "done" : "");
      return '<div class="step ' + cls + '"><span class="step-bar"></span><span class="step-label">' + (index + 1) + ". " + esc(label) + "</span></div>";
    }).join("");

    var body = "";
    if (m.step === 1) {
      body = '<div class="form-grid">' +
        '<div class="field span2"><label for="bkDate">' + esc(t("book.date")) + '<span class="req">*</span></label>' +
        '<input type="date" class="input" id="bkDate" data-bfield="date" min="' + toISO(startOfToday()) + '" value="' + esc(d.date) + '">' +
        '<span class="hint">' + esc(t("book.dateHint")) + "</span>" +
        '<span class="field-err" data-berr="date">' + esc(errs.date || "") + "</span></div>" +
        stepperHTML("adults", d.adults, t("book.adults"), "") +
        stepperHTML("children", d.children, t("book.children"), t("book.childrenHint")) +
        "</div>" +
        '<p class="sum-note" style="margin-top:12px">' + esc(t("book.guestNote", { n: CONFIG.maxGuests })) + "</p>";
    } else if (m.step === 2) {
      body = '<div class="stack">' +
        "<div><h3 class=\"subhead\">" + esc(t("book.style")) + "</h3>" +
        '<div class="choice-grid">' +
        ["cultural", "adventure", "luxury"].map(function (style) {
          return '<label class="choice' + (d.style === style ? " selected" : "") + '">' +
            '<input type="radio" name="bstyle" value="' + style + '" data-bstyle' + (d.style === style ? " checked" : "") + ">" +
            '<span class="c-title">' + esc(t("style." + style)) + "</span></label>";
        }).join("") + "</div></div>" +
        '<div class="form-grid">' +
        '<div class="field span2"><label for="bkName">' + esc(t("book.name")) + '<span class="req">*</span></label>' +
        '<input class="input" id="bkName" data-bfield="name" value="' + esc(d.name) + '" autocomplete="name">' +
        '<span class="field-err" data-berr="name">' + esc(errs.name || "") + "</span></div>" +
        '<div class="field"><label for="bkEmail">' + esc(t("book.email")) + '<span class="req">*</span></label>' +
        '<input class="input" id="bkEmail" type="email" data-bfield="email" value="' + esc(d.email) + '" autocomplete="email">' +
        '<span class="field-err" data-berr="email">' + esc(errs.email || "") + "</span></div>" +
        '<div class="field"><label for="bkPhone">' + esc(t("book.phone")) + '<span class="req">*</span></label>' +
        '<input class="input" id="bkPhone" type="tel" data-bfield="phone" value="' + esc(d.phone) + '" autocomplete="tel">' +
        '<span class="field-err" data-berr="phone">' + esc(errs.phone || "") + "</span></div>" +
        '<div class="field span2"><label for="bkRequests">' + esc(t("book.requests")) +
        ' <span class="muted small">(' + esc(t("common.optional")) + ")</span></label>" +
        '<textarea class="input" id="bkRequests" data-bfield="requests" placeholder="' + esc(t("book.requestsHint")) + '">' + esc(d.requests) + "</textarea></div>" +
        "</div></div>";
    } else {
      body = '<div class="sum-box">' +
        '<div class="sum-row"><span>' + esc(t("book.summary")) + "</span><span>" + esc(pick(tour.title)) + "</span></div>" +
        '<div class="sum-row"><span>' + esc(t("book.date")) + "</span><span>" + esc(formatDate(d.date)) + "</span></div>" +
        '<div class="sum-row"><span>' + esc(t("bookings.guests")) + "</span><span>" +
        esc(t("book.travelers", { a: d.adults, c: d.children })) + "</span></div>" +
        '<div class="sum-row"><span>' + esc(t("book.base")) + "</span><span>" + esc(money(totals.adultsTotal)) + "</span></div>" +
        (d.children > 0 ? '<div class="sum-row"><span>' + esc(t("book.childRate")) + "</span><span>" + esc(money(totals.childrenTotal)) + "</span></div>" : "") +
        '<div class="sum-row"><span>' + esc(t("book.fee")) + "</span><span>" + esc(money(totals.fee)) + "</span></div>" +
        '<div class="sum-row total"><span>' + esc(t("book.total")) + "</span><span>" + esc(money(totals.total)) + "</span></div>" +
        '<div class="sum-row deposit"><span>' + esc(t("book.deposit")) + "</span><span>" + esc(money(totals.deposit)) + "</span></div>" +
        '<div class="sum-note">' + esc(t("book.depositNote", { pct: Math.round(CONFIG.depositRate * 100) })) + "</div></div>" +
        '<div style="margin-top:14px"><label class="check-line"><input type="checkbox" data-bfield="terms"' + (d.terms ? " checked" : "") + ">" +
        "<span>" + esc(t("book.terms")) + "</span></label>" +
        '<span class="field-err" data-berr="terms" style="display:block;margin-top:4px">' + esc(errs.terms || "") + "</span></div>";
    }

    var buttons = '<div class="row" style="margin-top:16px;justify-content:space-between">' +
      (m.step > 1 ? '<button type="button" class="btn btn-ghost" data-act="back">' + esc(t("common.back")) + "</button>" : "<span></span>") +
      (m.step < 3
        ? '<button type="button" class="btn btn-gold" data-act="next">' + esc(t("common.next")) + icon("arrow") + "</button>"
        : '<button type="button" class="btn btn-gold" data-act="confirm">' + esc(t("book.confirm")) + icon("check") + "</button>") +
      "</div>";

    return head + '<div class="modal-body"><div class="steps">' + steps + "</div>" + body + buttons + "</div>";
  }

  function bookingValidate(step) {
    var d = state.modal.data;
    var errors = {};
    if (step === 1) {
      if (!d.date) errors.date = t("err.date");
      else if (parseISO(d.date) < startOfToday()) errors.date = t("err.datePast");
      if (d.adults < 1) errors.adults = t("err.guests");
      if (d.adults + d.children > CONFIG.maxGuests) errors.adults = t("book.guestNote", { n: CONFIG.maxGuests });
    }
    if (step === 2) {
      if (String(d.name).trim().length < 2) errors.name = t("err.name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(d.email).trim())) errors.email = t("err.email");
      if (String(d.phone).replace(/[^\d]/g, "").length < 7) errors.phone = t("err.phone");
    }
    if (step === 3) {
      if (!d.terms) errors.terms = t("err.terms");
    }
    return errors;
  }

  function bookingNext() {
    if (!state.modal) return;
    var errors = bookingValidate(state.modal.step);
    state.modal.errors = errors;
    if (Object.keys(errors).length) {
      paintModal();
      var first = $("[data-berr]");
      $$("[data-berr]").forEach(function (node) {
        if (node.textContent.trim()) {
          var field = node.parentElement.querySelector(".input");
          if (field) field.setAttribute("aria-invalid", "true");
        }
      });
      return;
    }
    state.modal.step = Math.min(3, state.modal.step + 1);
    paintModal();
  }

  function bookingBack() {
    if (!state.modal) return;
    state.modal.step = Math.max(1, state.modal.step - 1);
    state.modal.errors = {};
    paintModal();
  }

  function bookingConfirm() {
    var errors = bookingValidate(3);
    state.modal.errors = errors;
    if (Object.keys(errors).length) { paintModal(); return; }

    var m = state.modal;
    var tour = byId(m.tourId);
    var totals = bookingTotals();
    var d = m.data;
    var ref = makeRef("SRJ");
    state.bookings.unshift({
      id: ref,
      type: "tour",
      tourId: tour.id,
      date: d.date,
      adults: d.adults,
      children: d.children,
      style: d.style,
      name: d.name,
      email: d.email,
      phone: d.phone,
      requests: d.requests,
      total: totals.total,
      status: "confirmed",
      createdAt: new Date().toISOString()
    });
    write(STORE.bookings, state.bookings);
    m.done = true;
    m.ref = ref;
    paintModal();
    renderNav();
    renderBottomNav();
    toast(t("book.successTitle"));
  }

  /* ================= auth modal ================= */
  function openAuth(mode) {
    openModal({ type: "auth", mode: mode || "signin", errors: {}, busy: false });
  }

  function authModalHTML() {
    var m = state.modal;
    var errs = m.errors || {};
    var isUp = m.mode === "signup";
    return '<div class="modal-head"><div><h2 id="mTitle">' + esc(t("auth.title")) + "</h2>" +
      '<div class="mh-sub">' + esc(t("auth.sub")) + "</div></div>" +
      '<button type="button" class="x-btn" data-act="close" aria-label="' + esc(t("common.close")) + '">' + icon("x") + "</button></div>" +
      '<div class="modal-body stack">' +
      '<div class="auth-tabs">' +
      '<button type="button" class="auth-tab' + (isUp ? "" : " active") + '" data-act="authMode" data-mode="signin">' + esc(t("auth.signIn")) + "</button>" +
      '<button type="button" class="auth-tab' + (isUp ? " active" : "") + '" data-act="authMode" data-mode="signup">' + esc(t("auth.signUp")) + "</button>" +
      "</div>" +

      '<button type="button" class="g-btn" data-act="google"' + (m.busy ? " disabled" : "") + ">" +
      '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.8 6.1C12.2 13.4 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.5-9.4 6.5-16.6z"/><path fill="#FBBC05" d="M10.3 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.6l-7-5.4c-2 1.3-4.5 2.1-8.2 2.1-6.4 0-11.8-3.9-13.7-9.3l-7.8 6.1C6.4 42.6 14.6 48 24 48z"/></svg>' +
      esc(m.busy ? t("auth.working") : t("auth.google")) + "</button>" +

      '<div class="divider">' + esc(t("auth.or")) + "</div>" +

      (isUp ? '<div class="field"><label for="auName">' + esc(t("auth.name")) + '<span class="req">*</span></label>' +
        '<input class="input" id="auName" autocomplete="name" value="' + esc(errs._nameValue || "") + '">' +
        '<span class="field-err">' + esc(errs.name || "") + "</span></div>" : "") +
      '<div class="field"><label for="auEmail">' + esc(t("auth.email")) + '<span class="req">*</span></label>' +
      '<input class="input" id="auEmail" type="email" autocomplete="email" data-focus>' +
      '<span class="field-err">' + esc(errs.email || "") + "</span></div>" +
      '<div class="field"><label for="auPass">' + esc(t("auth.password")) + '<span class="req">*</span></label>' +
      '<input class="input" id="auPass" type="password" autocomplete="' + (isUp ? "new-password" : "current-password") + '">' +
      '<span class="field-err">' + esc(errs.pass || "") + "</span></div>" +

      '<button type="button" class="btn btn-gold btn-block" data-act="authSubmit"' + (m.busy ? " disabled" : "") + ">" +
      esc(m.busy ? t("auth.working") : (isUp ? t("auth.submitUp") : t("auth.submitIn"))) + "</button>" +

      '<div class="row" style="justify-content:space-between">' +
      '<button type="button" class="link-more" data-act="forgot">' + esc(t("auth.forgot")) + "</button>" +
      '<button type="button" class="link-more" data-act="authMode" data-mode="' + (isUp ? "signin" : "signup") + '">' +
      esc(isUp ? t("auth.switchIn") : t("auth.switchUp")) + "</button></div>" +

      '<p class="demo-note">' + esc(t("auth.demoNote")) + "</p></div>";
  }

  function nameFromEmail(email) {
    var local = String(email).split("@")[0] || "Traveller";
    return local.replace(/[._-]+/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function finishAuth(user) {
    state.user = user;
    write(STORE.user, user);
    closeModal();
    renderShell();
    toast(t("auth.signedIn", { name: user.name }));
  }

  function authSubmit() {
    var m = state.modal;
    if (!m || m.busy) return;
    var isUp = m.mode === "signup";
    var email = ($("#auEmail") ? $("#auEmail").value : "").trim();
    var pass = $("#auPass") ? $("#auPass").value : "";
    var name = isUp && $("#auName") ? $("#auName").value.trim() : "";
    var errors = {};
    if (isUp && name.length < 2) errors.name = t("err.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = t("err.email");
    if (pass.length < 8) errors.pass = t("err.pass");
    m.errors = errors;
    if (Object.keys(errors).length) {
      errors._nameValue = name;
      paintModal();
      return;
    }
    var user = { name: isUp ? name : nameFromEmail(email), email: email, provider: "email" };
    m.busy = true;
    paintModal();
    window.setTimeout(function () { finishAuth(user); }, 500);
  }

  function googleSignIn() {
    var m = state.modal;
    if (!m || m.busy) return;
    m.busy = true;
    m.errors = {};
    paintModal();
    window.setTimeout(function () {
      finishAuth({ name: "Demo Traveller", email: "demo.traveller@gmail.com", provider: "google" });
    }, 700);
  }

  function confirmModalHTML() {
    var m = state.modal;
    return '<div class="modal-head"><div><h2 id="mTitle">' + esc(m.title || t("common.close")) + "</h2></div>" +
      '<button type="button" class="x-btn" data-act="close" aria-label="' + esc(t("common.close")) + '">' + icon("x") + "</button></div>" +
      '<div class="modal-body"><p class="prose">' + esc(m.text || "") + "</p>" +
      '<div class="row" style="margin-top:18px;justify-content:flex-end">' +
      '<button type="button" class="btn btn-ghost" data-act="confirmNo">' + esc(t("common.cancel")) + "</button>" +
      '<button type="button" class="btn btn-gold" data-act="confirmYes">' + esc(m.confirmLabel || t("common.next")) + "</button></div></div>";
  }

  function askConfirm(title, text, confirmLabel, onYes) {
    openModal({ type: "confirm", title: title, text: text, confirmLabel: confirmLabel, onYes: onYes });
  }

  /* ================= modal events ================= */
  function onModalClick(event) {
    var button = event.target.closest("[data-act]");
    if (!button) return;
    var act = button.getAttribute("data-act");
    if (!state.modal && act !== "close") return;

    if (act === "close") { closeModal(); return; }
    if (act === "book") { openBooking(button.getAttribute("data-id")); return; }
    if (act === "ask") { closeModal(); setView("support"); return; }
    if (act === "next") { bookingNext(); return; }
    if (act === "back") { bookingBack(); return; }
    if (act === "confirm") { bookingConfirm(); return; }
    if (act === "gotoBookings") { closeModal(); setView("bookings"); return; }
    if (act === "authMode") { state.modal.mode = button.getAttribute("data-mode"); state.modal.errors = {}; paintModal(); return; }
    if (act === "google") { googleSignIn(); return; }
    if (act === "authSubmit") { authSubmit(); return; }
    if (act === "forgot") {
      var email = $("#auEmail") ? $("#auEmail").value.trim() : "";
      toast(t("auth.resetSent", { email: email || "—" }));
      return;
    }
    if (act === "confirmYes") {
      var callback = state.modal.onYes;
      closeModal();
      if (typeof callback === "function") callback();
      return;
    }
    if (act === "confirmNo") { closeModal(); return; }
    if (act === "step") {
      var field = button.getAttribute("data-field");
      var dir = parseInt(button.getAttribute("data-dir"), 10);
      var data = state.modal.data;
      var max = field === "adults" ? CONFIG.maxGuests : CONFIG.maxChildren;
      var min = field === "adults" ? 1 : 0;
      if (dir > 0 && data.adults + data.children >= CONFIG.maxGuests) return;
      data[field] = Math.max(min, Math.min(max, data[field] + dir));
      var valueNode = $("#bk-" + field);
      if (valueNode) valueNode.textContent = data[field];
      var errNode = document.querySelector('[data-berr="' + field + '"]');
      if (errNode) errNode.textContent = "";
      return;
    }
  }

  function onModalInput(event) {
    var m = state.modal;
    if (!m || !m.data) return;
    var target = event.target;

    if (target.hasAttribute("data-bfield")) {
      var field = target.getAttribute("data-bfield");
      m.data[field] = target.type === "checkbox" ? target.checked : target.value;
      var err = document.querySelector('[data-berr="' + field + '"]');
      if (err) err.textContent = "";
      target.removeAttribute("aria-invalid");
      return;
    }

    if (target.hasAttribute("data-bstyle")) {
      m.data.style = target.value;
      $$('input[name="bstyle"]').forEach(function (input) {
        var label = input.closest(".choice");
        if (label) label.classList.toggle("selected", input.checked);
      });
    }
  }

  /* ================= toast ================= */
  function toast(message) {
    var root = $("#toastRoot");
    if (!root) return;
    var node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    root.appendChild(node);
    window.setTimeout(function () {
      node.classList.add("out");
      window.setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 240);
    }, 3200);
  }

  /* ================= navigation & search ================= */
  function setView(view, options) {
    var opts = options || {};
    if (view === "destination") {
      if (!opts.destId && !state.destId) { view = "destinations"; }
      else if (opts.destId) state.destId = opts.destId;
    }
    state.view = view;
    write(STORE.view, view);
    renderView();
    closeDrawer();
    closeMenus();
    window.scrollTo({ top: 0, behavior: "auto" });
    var main = $("#main");
    if (main) main.focus({ preventScroll: true });
  }

  function setLanguage(code) {
    if (!LANGS.some(function (l) { return l.code === code; })) return;
    state.lang = code;
    write(STORE.lang, code);
    renderShell();
    renderView();
    if (state.view === "reviews") bindReviewForm();
    toast(t("toast.lang"));
  }

  function setCurrency(code) {
    if (!CURRENCIES.some(function (c) { return c.code === code; })) return;
    state.currency = code;
    write(STORE.currency, code);
    renderShell();
    renderView();
    if (state.view === "reviews") bindReviewForm();
    toast(t("toast.currency", { cur: code }));
  }

  function toggleMenu(which) {
    var map = {
      currency: { btn: "#currencyBtn", menu: "#currencyMenu" },
      lang: { btn: "#langBtn", menu: "#langMenu" },
      user: { btn: "#userBtn", menu: "#userMenu" }
    };
    var entry = map[which];
    if (!entry) return;
    var btn = $(entry.btn);
    var menu = $(entry.menu);
    if (!btn || !menu) return;
    var willOpen = menu.hidden;
    closeMenus();
    if (willOpen) {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }
  }

  function closeMenus() {
    [["#currencyMenu", "#currencyBtn"], ["#langMenu", "#langBtn"], ["#userMenu", "#userBtn"]].forEach(function (pair) {
      var menu = $(pair[0]);
      var btn = $(pair[1]);
      if (menu && !menu.hidden) menu.hidden = true;
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function openDrawer() {
    var sidebar = $("#sidebar");
    var scrim = $("#scrim");
    if (!sidebar || !scrim) return;
    sidebar.classList.add("open");
    scrim.hidden = false;
    window.requestAnimationFrame(function () { scrim.classList.add("show"); });
    document.body.classList.add("no-scroll");
    $("#menuBtn").setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    var sidebar = $("#sidebar");
    var scrim = $("#scrim");
    if (!sidebar || !scrim) return;
    if (!sidebar.classList.contains("open")) return;
    sidebar.classList.remove("open");
    scrim.classList.remove("show");
    window.setTimeout(function () {
      if (!sidebar.classList.contains("open")) scrim.hidden = true;
    }, 230);
    document.body.classList.remove("no-scroll");
    var btn = $("#menuBtn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function searchHTML(query) {
    var needle = query.trim().toLowerCase();
    if (!needle) return "";
    var tours = TOURS.filter(function (tour) {
      var haystack = [tour.title.en, tour.title.uz, tour.title.ru, tour.title.fr,
        tour.summary.en, tour.summary.uz, tour.summary.ru, tour.summary.fr,
        cityNames(tour.cities)].join(" ").toLowerCase();
      return haystack.indexOf(needle) >= 0;
    }).slice(0, 5);

    var dests = DESTINATIONS.filter(function (dest) {
      var haystack = [dest.name.en, dest.name.uz, dest.name.ru, dest.name.fr,
        dest.tagline.en, dest.tagline.uz, dest.tagline.ru, dest.tagline.fr,
        dest.highlights.en.join(" "), dest.highlights.ru.join(" ")].join(" ").toLowerCase();
      return haystack.indexOf(needle) >= 0;
    }).slice(0, 4);

    if (!tours.length && !dests.length) {
      return '<div class="res-empty">' + esc(t("top.noResults", { q: query.trim() })) + "</div>";
    }

    var html = "";
    if (tours.length) {
      html += '<div class="res-group">' + esc(t("top.tours")) + "</div>" + tours.map(function (tour) {
        return '<button type="button" class="res-item" data-res-tour="' + tour.id + '">' +
          '<img src="' + tour.img + '" alt="">' +
          '<span class="res-body"><span class="res-title">' + esc(pick(tour.title)) + "</span>" +
          '<span class="res-meta">' + esc(cityNames(tour.cities)) + " · " + esc(t("card.days", { n: tour.days })) +
          " · " + esc(money(tour.price)) + "</span></span></button>";
      }).join("");
    }
    if (dests.length) {
      html += '<div class="res-group">' + esc(t("top.destinations")) + "</div>" + dests.map(function (dest) {
        return '<button type="button" class="res-item" data-res-dest="' + dest.id + '">' +
          '<img src="' + dest.img + '" alt="">' +
          '<span class="res-body"><span class="res-title">' + esc(pick(dest.name)) + "</span>" +
          '<span class="res-meta">' + esc(pick(dest.tagline)) + "</span></span></button>";
      }).join("");
    }
    return html;
  }

  function runSearch(value) {
    var panel = $("#searchResults");
    var input = $("#searchInput");
    var html = searchHTML(value);
    if (!html) {
      panel.hidden = true;
      panel.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
      return;
    }
    panel.innerHTML = html;
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  /* ================= global events ================= */
  function bindEvents() {
    document.addEventListener("click", function (event) {
      var target = event.target;

      if (target.closest("#currencyBtn")) { toggleMenu("currency"); return; }
      if (target.closest("#langBtn")) { toggleMenu("lang"); return; }
      if (target.closest("#userBtn")) { toggleMenu("user"); return; }

      var currencyItem = target.closest("[data-currency]");
      if (currencyItem) { setCurrency(currencyItem.getAttribute("data-currency")); return; }

      var langItem = target.closest("[data-lang]");
      if (langItem) { setLanguage(langItem.getAttribute("data-lang")); return; }

      if (!target.closest(".dd") && !target.closest("#searchBox")) closeMenus();

      var resultTour = target.closest("[data-res-tour]");
      if (resultTour) {
        closeSearch();
        openTour(resultTour.getAttribute("data-res-tour"));
        return;
      }
      var resultDest = target.closest("[data-res-dest]");
      if (resultDest) {
        closeSearch();
        setView("destination", { destId: resultDest.getAttribute("data-res-dest") });
        return;
      }

      if (target.closest("#signInBtn")) { openAuth("signin"); return; }

      var nav = target.closest("[data-nav]");
      if (nav) { setView(nav.getAttribute("data-nav")); return; }

      var go = target.closest("[data-goto]");
      if (go) { event.preventDefault(); setView(go.getAttribute("data-goto")); return; }

      var tourButton = target.closest("[data-tour]");
      if (tourButton) { openTour(tourButton.getAttribute("data-tour")); return; }

      var bookButton = target.closest("[data-book]");
      if (bookButton) { openBooking(bookButton.getAttribute("data-book")); return; }

      var destButton = target.closest("[data-dest]");
      if (destButton) { setView("destination", { destId: destButton.getAttribute("data-dest") }); return; }

      if (target.closest("[data-reset-filters]")) {
        state.filters = { city: "all", style: "all", duration: "all", budget: "all", sort: "recommended" };
        renderView();
        return;
      }

      var cancelButton = target.closest("[data-cancel]");
      if (cancelButton) {
        var bookingId = cancelButton.getAttribute("data-cancel");
        askConfirm(t("bookings.cancel"), t("bookings.cancelConfirm"), t("bookings.cancel"), function () {
          state.bookings = state.bookings.map(function (b) {
            if (b.id === bookingId) b.status = "cancelled";
            return b;
          });
          write(STORE.bookings, state.bookings);
          renderView();
          renderNav();
          toast(t("toast.cancelled"));
        });
        return;
      }

      var deleteReview = target.closest("[data-delreview]");
      if (deleteReview) {
        var reviewId = deleteReview.getAttribute("data-delreview");
        askConfirm(t("rev.delete"), t("bookings.cancelConfirm"), t("rev.delete"), function () {
          state.reviews = state.reviews.filter(function (r) { return r.id !== reviewId; });
          write(STORE.reviews, state.reviews);
          renderView();
          bindReviewForm();
        });
        return;
      }

      var action = target.closest("[data-action]");
      if (action) {
        var name = action.getAttribute("data-action");
        if (name === "signout") {
          state.user = null;
          write(STORE.user, null);
          renderShell();
          toast(t("auth.signedOut"));
          closeMenus();
          return;
        }
        if (name === "builder-reset") {
          state.builder = null;
          ensureBuilder();
          renderView();
          bindBuilder();
          return;
        }
      }

      var faqButton = target.closest(".faq-q");
      if (faqButton) {
        var item = faqButton.closest(".faq-item");
        var isOpen = item.classList.toggle("open");
        faqButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        return;
      }

      if (target.closest("#menuBtn")) { openDrawer(); return; }
      if (target.closest("#scrim")) { closeDrawer(); return; }

      if (!target.closest("#searchBox") && !target.closest("#searchResults")) closeSearch();
    });

    var input = $("#searchInput");
    if (input) {
      input.addEventListener("input", function () { runSearch(input.value); });
      input.addEventListener("focus", function () {
        if (input.value.trim()) runSearch(input.value);
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Escape") { closeSearch(); input.blur(); }
        if (event.key === "Enter") {
          var first = $("#searchResults [data-res-tour], #searchResults [data-res-dest]");
          if (first) { event.preventDefault(); first.click(); }
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (state.modal) { closeModal(); return; }
        closeMenus();
        closeSearch();
        closeDrawer();
        return;
      }

      if (event.key === "/" && !state.modal) {
        var tag = (document.activeElement && document.activeElement.tagName) || "";
        if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
          event.preventDefault();
          var search = $("#searchInput");
          if (search) search.focus();
        }
        return;
      }

      if (event.key === "Tab" && state.modal) {
        var modal = $("#activeModal");
        if (!modal) return;
        var focusables = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', modal)
          .filter(function (node) { return node.offsetParent !== null; });
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1199) closeDrawer();
    });
  }

  function closeSearch() {
    var panel = $("#searchResults");
    var input = $("#searchInput");
    if (panel) {
      panel.hidden = true;
      panel.innerHTML = "";
    }
    if (input) input.setAttribute("aria-expanded", "false");
  }

  /* ================= boot ================= */
  function boot() {
    if (state.view === "destination" && !state.destId) state.view = "dashboard";
    renderShell();
    renderView();
    if (state.view === "reviews") bindReviewForm();
    bindEvents();

    var menuBtn = $("#menuBtn");
    if (menuBtn) {
      menuBtn.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") event.preventDefault();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
