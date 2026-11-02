/* ByOwners.com — listings: data, cards, filters, map */
(function () {
  "use strict";
  var BO = window.BO || {}, $ = BO.$, $$ = BO.$$, money = BO.money, esc = BO.escapeHtml || function (s) { return s; };
  var BASE = window.BO_BASE || "";
  var ICON = { "home-sale": "home", rental: "key", vacation: "sun", land: "land", vehicle: "car", "boat-rv": "anchor", business: "briefcase", commercial: "building" };
  var UNIT = { rental: "/mo", vacation: "/night" };
  var LABEL = { "home-sale": "Home for sale", rental: "Rental", vacation: "Vacation home", land: "Land", vehicle: "Vehicle", "boat-rv": "Boat / RV", business: "Business", commercial: "Commercial" };
  var data = null;

  function load() {
    if (data) return Promise.resolve(data);
    return fetch(BASE + "/api/listings.json").then(function (r) { return r.json(); }).then(function (j) {
      data = (j.listings || []).filter(function (l) { return !l.expires || new Date(l.expires) >= new Date(new Date().toDateString()); });
      return data;
    }).catch(function () { data = []; return data; });
  }
  function ic(n) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }

  function card(l) {
    var facts = [];
    if (l.beds) facts.push(ic("bed") + " " + l.beds + " bd");
    if (l.baths) facts.push(ic("bath") + " " + l.baths + " ba");
    if (l.sqft) facts.push(ic("size") + " " + Number(l.sqft).toLocaleString() + " sqft");
    if (l.lot && !l.sqft) facts.push(ic("land") + " " + esc(l.lot));
    if (l.year && (l.category === "vehicle" || l.category === "boat-rv")) facts.push(ic("calendar") + " " + l.year);
    if (l.mileage) facts.push(ic("trend") + " " + esc(l.mileage));
    if (l.revenue) facts.push(ic("dollar") + " " + esc(l.revenue) + " rev");
    var cover = l.image ? ' style="background-image:url(\'' + esc(l.image) + '\')"' : "";
    return '<article class="l-card" data-id="' + esc(l.id) + '">' +
      '<div class="l-cover c-' + esc(l.category) + '"' + cover + ">" + (l.image ? "" : ic(ICON[l.category] || "home")) +
      '<div class="l-badges">' + (l.sample ? '<span class="badge badge-sample">Sample</span>' : "") + (l.featured ? '<span class="badge badge-feat">Featured</span>' : "") + '<span class="badge">' + esc(LABEL[l.category] || "Listing") + "</span></div>" +
      '<button class="fav-btn" data-fav="' + esc(l.id) + '" aria-label="Save listing">' + ic("heart") + "</button></div>" +
      '<div class="l-body"><div class="l-price">' + (l.price ? money(l.price) : "Contact owner") + (UNIT[l.category] ? "<small>" + UNIT[l.category] + "</small>" : "") + "</div>" +
      '<div class="l-title"><a href="' + esc(l.url) + '">' + esc(l.title) + "</a></div>" +
      '<div class="l-loc">' + ic("pin") + " " + esc([l.city, l.state].filter(Boolean).join(", ")) + "</div>" +
      (facts.length ? '<div class="l-facts">' + facts.map(function (f) { return "<span>" + f + "</span>"; }).join("") + "</div>" : "") +
      "</div></article>";
  }
  function emptyState(msg) {
    return '<div class="empty-state" style="grid-column:1/-1">' + ic("home") + "<h3>" + msg + '</h3><p class="muted">New owner listings are reviewed and published daily. Be the first in this area — listing is free.</p><div class="flex" style="justify-content:center"><a class="btn btn-primary" href="' + BASE + '/sell/">List free</a><a class="btn btn-outline" href="' + BASE + '/get-started/?goal=buy">Get alerts for new listings</a></div></div>';
  }

  /* Home: latest listings */
  $$("[data-home-listings]").forEach(function (el) {
    load().then(function (ls) {
      var sorted = ls.slice().sort(function (a, b) { return (b.featured - a.featured) || (new Date(b.posted) - new Date(a.posted)); });
      el.innerHTML = sorted.length ? sorted.slice(0, +el.getAttribute("data-limit") || 6).map(card).join("") : emptyState("Be one of the first owners to list");
      BO.paintFavs && BO.paintFavs();
    });
  });

  /* Category landing pages: [data-cat-listings="land"] */
  $$("[data-cat-listings]").forEach(function (el) {
    var cats = el.getAttribute("data-cat-listings").split(",");
    load().then(function (ls) {
      var f = ls.filter(function (l) { return cats.indexOf(l.category) > -1; });
      el.innerHTML = f.length ? f.slice(0, 6).map(card).join("") : emptyState("No " + (el.getAttribute("data-label") || "listings") + " here yet");
      BO.paintFavs && BO.paintFavs();
    });
  });

  /* Listings browser */
  var root = $("#listingsApp");
  if (root) {
    var grid = $("#lGrid", root), countEl = $("#lCount", root), mapEl = $("#map"), form = $("#lFilters", root), map = null, layer = null, view = "grid", savedOnly = false;
    var qp = new URLSearchParams(location.search);
    $$("[name]", form).forEach(function (f) { if (qp.has(f.name)) f.value = qp.get(f.name); });
    if (qp.get("saved") === "1") savedOnly = true;

    load().then(function (ls) {
      // fill states
      var states = {}; ls.forEach(function (l) { if (l.state) states[l.state] = 1; });
      var sel = $('[name="state"]', form);
      Object.keys(states).sort().forEach(function (s) { var o = document.createElement("option"); o.value = s; o.textContent = s; sel.appendChild(o); });
      if (qp.has("state")) sel.value = qp.get("state");
      render();
    });

    function filtered() {
      var v = {}; $$("[name]", form).forEach(function (f) { v[f.name] = f.value.trim(); });
      var q = v.q.toLowerCase(), min = parseFloat(v.min) || 0, max = parseFloat(v.max) || Infinity, beds = parseFloat(v.beds) || 0, favs = BO.favs ? BO.favs() : [];
      var out = data.filter(function (l) {
        if (v.cat && l.category !== v.cat) return false;
        if (v.state && l.state !== v.state) return false;
        if (l.price && (l.price < min || l.price > max)) return false;
        if (beds && (!l.beds || l.beds < beds)) return false;
        if (savedOnly && favs.indexOf(l.id) === -1) return false;
        if (q && (l.title + " " + l.city + " " + l.state + " " + l.zip + " " + (l.summary || "") + " " + (LABEL[l.category] || "")).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      var s = v.sort;
      out.sort(function (a, b) {
        if (s === "price-asc") return (a.price || 0) - (b.price || 0);
        if (s === "price-desc") return (b.price || 0) - (a.price || 0);
        return (b.featured - a.featured) || (new Date(b.posted) - new Date(a.posted));
      });
      // sync URL
      var u = new URL(location.href); Object.keys(v).forEach(function (k) { if (v[k]) u.searchParams.set(k, v[k]); else u.searchParams.delete(k); }); history.replaceState(null, "", u);
      return out;
    }
    function render() {
      if (!data) return;
      var ls = filtered();
      countEl.textContent = ls.length + (ls.length === 1 ? " listing" : " listings");
      grid.classList.toggle("list-view", view === "list");
      grid.innerHTML = ls.length ? ls.map(card).join("") : emptyState(savedOnly ? "No saved listings yet" : "No listings match these filters");
      BO.paintFavs && BO.paintFavs();
      if (view === "map") drawMap(ls);
    }
    function drawMap(ls) {
      if (!window.L || !mapEl) return;
      if (!map) {
        map = L.map(mapEl, { scrollWheelZoom: false }).setView([39.5, -98.35], 4);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
      }
      if (layer) layer.remove();
      layer = L.layerGroup().addTo(map);
      var pts = [];
      ls.forEach(function (l) {
        if (l.lat == null || l.lng == null) return;
        pts.push([l.lat, l.lng]);
        L.marker([l.lat, l.lng]).addTo(layer).bindPopup("<strong>" + esc(l.title) + "</strong><br>" + (l.price ? money(l.price) + (UNIT[l.category] || "") : "") + '<br><a href="' + esc(l.url) + '">View listing →</a>');
      });
      setTimeout(function () { map.invalidateSize(); if (pts.length) map.fitBounds(pts, { padding: [40, 40], maxZoom: 12 }); }, 60);
    }
    form.addEventListener("input", function () { clearTimeout(form._t); form._t = setTimeout(render, 150); });
    form.addEventListener("submit", function (e) { e.preventDefault(); render(); });
    $$("[data-view]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        view = b.getAttribute("data-view");
        $$("[data-view]", root).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        if (mapEl) mapEl.hidden = view !== "map";
        render();
      });
    });
    var savedBtn = $("[data-saved-toggle]", root);
    if (savedBtn) { savedBtn.setAttribute("aria-pressed", savedOnly ? "true" : "false"); savedBtn.addEventListener("click", function () { savedOnly = !savedOnly; savedBtn.setAttribute("aria-pressed", savedOnly ? "true" : "false"); render(); }); }
    var reset = $("[data-reset]", root); if (reset) reset.addEventListener("click", function () { form.reset(); savedOnly = false; if (savedBtn) savedBtn.setAttribute("aria-pressed", "false"); render(); });
    document.addEventListener("bo:favs", function () { if (savedOnly) render(); });
  }

  /* Listing detail map */
  var lm = $("#listingMap");
  if (lm && window.L) {
    var lat = parseFloat(lm.getAttribute("data-lat")), lng = parseFloat(lm.getAttribute("data-lng"));
    var m = L.map(lm, { scrollWheelZoom: false }).setView([lat, lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(m);
    L.circle([lat, lng], { radius: 600, color: "#0d9488", fillOpacity: .15 }).addTo(m);
  }
})();
