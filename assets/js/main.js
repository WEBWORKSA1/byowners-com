/* ==========================================================================
   ByOwners.com — core interactions
   No dependencies. Progressive enhancement: every page works without JS,
   JS adds forms, search, wizard, favorites, theme, consent and more.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var CFG = window.BO_CONFIG || {};
  var BASE = window.BO_BASE || "";
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var money = function (n, dec) { n = Number(n) || 0; return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: dec || 0, minimumFractionDigits: dec || 0 }); };
  window.BO = { $: $, $$: $$, money: money, store: store, toast: toast };

  /* ---------- Toasts ---------- */
  function toast(msg, isErr) {
    var wrap = $("#toasts"); if (!wrap) return;
    var t = document.createElement("div");
    t.className = "toast" + (isErr ? " err" : "");
    t.setAttribute("role", "status");
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(function () { t.remove(); }, 320); }, 3800);
  }

  /* ---------- Attribution (utm + referrer), attached to every lead ---------- */
  (function () {
    try {
      if (!sessionStorage.getItem("bo-src")) {
        var p = new URLSearchParams(location.search), src = {};
        ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach(function (k) { if (p.get(k)) src[k] = p.get(k); });
        src.landing_page = location.pathname;
        src.referrer = document.referrer || "direct";
        sessionStorage.setItem("bo-src", JSON.stringify(src));
      }
    } catch (e) {}
  })();
  function attribution() { try { return JSON.parse(sessionStorage.getItem("bo-src") || "{}"); } catch (e) { return {}; } }

  /* ---------- Header / nav ---------- */
  var header = $("#siteHeader");
  var toTop = $("#toTop"), mobileCta = $("#mobileCta");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 700);
    if (mobileCta) mobileCta.classList.toggle("show", y > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  $$(".has-menu").forEach(function (li) {
    var btn = $("button", li), timer;
    function open(v) { li.classList.toggle("open", v); btn.setAttribute("aria-expanded", v ? "true" : "false"); }
    btn.addEventListener("click", function (e) { e.stopPropagation(); var isOpen = li.classList.contains("open"); $$(".has-menu.open").forEach(function (o) { o.classList.remove("open"); }); open(!isOpen); });
    li.addEventListener("mouseenter", function () { clearTimeout(timer); if (window.matchMedia("(hover:hover)").matches) open(true); });
    li.addEventListener("mouseleave", function () { timer = setTimeout(function () { open(false); }, 160); });
    li.addEventListener("keydown", function (e) { if (e.key === "Escape") { open(false); btn.focus(); } });
  });
  document.addEventListener("click", function () { $$(".has-menu.open").forEach(function (o) { o.classList.remove("open"); }); });

  var drawer = $("#drawer"), menuToggle = $("#menuToggle");
  function setDrawer(v) {
    if (!drawer) return;
    drawer.classList.toggle("open", v); drawer.setAttribute("aria-hidden", v ? "false" : "true");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", v ? "true" : "false");
    document.body.style.overflow = v ? "hidden" : "";
  }
  if (menuToggle) menuToggle.addEventListener("click", function () { setDrawer(true); });
  $$("[data-close-drawer]").forEach(function (el) { el.addEventListener("click", function () { setDrawer(false); }); });

  /* ---------- Theme ---------- */
  var themeBtn = $("#themeToggle");
  function paintThemeIcon() {
    if (!themeBtn) return;
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var use = $("use", themeBtn); if (use) use.setAttribute("href", dark ? "#i-sun" : "#i-moon");
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("bo-theme", next); } catch (e) {}
    paintThemeIcon();
  });
  paintThemeIcon();

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Animated counters ---------- */
  $$("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count")), prefix = el.getAttribute("data-prefix") || "", suffix = el.getAttribute("data-suffix") || "";
    var run = function () {
      var start = null, dur = 1400;
      function step(ts) { if (!start) start = ts; var p = Math.min((ts - start) / dur, 1), v = target * (1 - Math.pow(1 - p, 3)); el.textContent = prefix + Math.round(v).toLocaleString("en-US") + suffix; if (p < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) { var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { run(); o.disconnect(); } }); o.observe(el); } else run();
  });

  /* ---------- Money formatting ---------- */
  $$("[data-money]").forEach(function (el) { var v = parseFloat(el.getAttribute("data-money")); if (!isNaN(v)) el.textContent = money(v); });

  /* ---------- Mortgage rates (auto-updated data) ---------- */
  var R = window.BO_RATES || {};
  $$("[data-rate30]").forEach(function (el) { if (R.rate30) el.textContent = R.rate30.toFixed(2) + "%"; });
  $$("[data-rate15]").forEach(function (el) { if (R.rate15) el.textContent = R.rate15.toFixed(2) + "%"; });
  $$("[data-rate-date]").forEach(function (el) { if (R.date) el.textContent = new Date(R.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); });
  $$("[data-mini-mortgage]").forEach(function (el) {
    var price = parseFloat(el.getAttribute("data-mini-mortgage")), rate = (R.rate30 || 6.5) / 100 / 12, n = 360, loan = price * 0.9;
    var pmt = loan * rate / (1 - Math.pow(1 + rate, -n));
    el.textContent = money(pmt) + "/mo";
    el.insertAdjacentHTML("afterend", '<p class="tiny muted">Principal &amp; interest only, ' + ((R.rate30 || 6.5).toFixed(2)) + '% APR assumed. Taxes, insurance and HOA extra.</p>');
  });

  /* ---------- Hidden email links ---------- */
  function mailto(subject, body) {
    var a = typeof CFG.contact === "function" ? CFG.contact() : "";
    return "mailto:" + a + "?subject=" + encodeURIComponent(subject || "Hello from ByOwners.com") + (body ? "&body=" + encodeURIComponent(body) : "");
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-email-link]");
    if (!a) return;
    e.preventDefault();
    window.location.href = mailto(a.getAttribute("data-subject"), a.getAttribute("data-body"));
  });

  /* ---------- Generic form submission (FormSubmit AJAX → hidden address) ---------- */
  function validate(scope) {
    var ok = true, first = null;
    $$("input, select, textarea", scope).forEach(function (f) {
      if (f.classList.contains("hp") || f.type === "hidden" || f.disabled || f.offsetParent === null && f.type !== "radio" && f.type !== "checkbox") return;
      var err = f.parentNode.querySelector(".error-msg"); if (err) err.remove();
      f.classList.remove("invalid");
      var bad = false, msg = "";
      if (f.type === "radio") {
        if (f.required && !$$('input[name="' + f.name + '"]', scope).some(function (r) { return r.checked; })) { bad = true; msg = "Please choose an option."; }
      } else if (f.type === "checkbox") {
        if (f.required && !f.checked) { bad = true; msg = "Please confirm to continue."; }
      } else if (f.required && !String(f.value).trim()) { bad = true; msg = "This field is required."; }
      else if (f.type === "email" && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value)) { bad = true; msg = "Enter a valid email address."; }
      else if (f.type === "tel" && f.value && f.value.replace(/\D/g, "").length < 10) { bad = true; msg = "Enter a valid phone number."; }
      else if (f.pattern && f.value && !new RegExp("^(?:" + f.pattern + ")$").test(f.value)) { bad = true; msg = f.title || "Please check this field."; }
      if (bad) {
        ok = false; if (!first) first = f;
        if (f.type !== "radio") f.classList.add("invalid");
        var m = document.createElement("span"); m.className = "error-msg"; m.textContent = msg;
        var host = f.type === "radio" ? f.closest(".options") || f.parentNode : f.type === "checkbox" ? f.closest(".check") || f.parentNode : f.parentNode;
        if (host && !host.querySelector(":scope > .error-msg")) host.appendChild(m);
      }
    });
    if (first) { try { first.focus({ preventScroll: false }); } catch (e) {} }
    return ok;
  }
  window.BO.validate = validate;

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) {
      if (k === "_honey") return;
      if (data[k]) data[k] = [].concat(data[k], v); else data[k] = v;
    });
    Object.keys(data).forEach(function (k) { if (Array.isArray(data[k])) data[k] = data[k].join(", "); });
    return data;
  }

  function send(payload, subject, opts) {
    opts = opts || {};
    var body = Object.assign({}, payload, {
      _subject: subject,
      _template: "table",
      _captcha: "false",
      page: location.href,
      submitted_at: new Date().toISOString()
    }, attribution());
    if (opts.autoresponse && payload.email) body._autoresponse = opts.autoresponse;
    return fetch(CFG.formEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (j) { if (String(j.success) !== "true") throw new Error(j.message || "not delivered"); return j; });
  }
  window.BO.send = send;

  function fallbackMail(subject, payload) {
    var lines = Object.keys(payload).map(function (k) { return k.replace(/_/g, " ") + ": " + payload[k]; });
    window.location.href = mailto(subject, lines.join("\n") + "\n\nSent from " + location.href);
  }

  var SUCCESS = {
    newsletter: { t: "You're subscribed!", d: "Watch your inbox for The Owner Brief. Meanwhile, the free checklist is a great place to start.", link: "/checklist/", label: "Open the checklist" },
    checklist: { t: "Check your inbox!", d: "We've sent your checklist. You can also open the interactive version right now.", link: "/checklist/", label: "Open the interactive checklist" },
    inquiry: { t: "Message sent to the owner", d: "Most owners reply within 24–48 hours. Never wire money before seeing the property in person.", link: "/safety/", label: "Read our safety tips" },
    default: { t: "Thank you — we got it!", d: "A real person reviews every submission. Expect a reply within 1–2 business days.", link: "/guides/", label: "Browse free guides" }
  };
  function successPanel(kind, extra) {
    var s = SUCCESS[kind] || SUCCESS.default;
    return '<div class="success-panel"><div class="success-icon"><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg></div>' +
      "<h3>" + s.t + "</h3><p class=\"muted\">" + (extra || s.d) + "</p>" +
      '<div class="flex" style="justify-content:center"><a class="btn btn-primary" href="' + BASE + s.link + '">' + s.label + '</a>' +
      '<a class="btn btn-outline" href="' + BASE + '/support/">Support ByOwners</a></div></div>';
  }

  $$("form[data-form]").forEach(function (form) {
    if (form.hasAttribute("data-wizard")) return; // wizard handles its own submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector('[name="_honey"]') && form.querySelector('[name="_honey"]').value) return; // bot
      if (!validate(form)) return;
      var btn = $('[type="submit"]', form); if (btn) btn.classList.add("loading");
      var kind = form.getAttribute("data-form");
      var payload = Object.assign({ form: kind }, collect(form));
      var subject = "[ByOwners] " + (form.getAttribute("data-subject") || kind);
      var auto = kind === "lead-magnet" ? "Thanks for downloading the ByOwners owner checklist! Open the interactive version anytime: " + location.origin + BASE + "/checklist/ — Reply to this email if you have questions." : null;
      send(payload, subject, { autoresponse: auto }).then(function () {
        var s = form.getAttribute("data-success") || kind;
        if (form.classList.contains("inline-form")) { form.reset(); toast("Subscribed! Check your inbox."); }
        else { form.innerHTML = successPanel(s); }
        track("lead_submit", { form: kind });
        if (kind === "lead-magnet") store.set("bo-exit-done", Date.now());
      }).catch(function () {
        toast("Opening your email app to finish sending…");
        fallbackMail(subject, payload);
      }).finally(function () { if (btn) btn.classList.remove("loading"); });
    });
  });

  /* ---------- Multi-step lead wizard ---------- */
  $$("form[data-wizard]").forEach(function (form) {
    var steps = $$(".step", form), idx = 0, bar = $(".progress > span", form), label = $("[data-step-label]", form);
    var back = $("[data-back]", form), next = $("[data-next]", form), submit = $("[data-submit]", form);
    var key = "bo-wizard-" + (form.id || "w");
    // prefill from URL + saved draft
    var params = new URLSearchParams(location.search), draft = store.get(key, {});
    function setVal(name, val) {
      var els = $$('[name="' + name + '"]', form); if (!els.length || val == null) return;
      els.forEach(function (el) {
        if (el.type === "radio" || el.type === "checkbox") { if (String(val).split(", ").indexOf(el.value) > -1) el.checked = true; }
        else if (!el.value) el.value = val;
      });
    }
    Object.keys(draft).forEach(function (k) { if (["email", "phone", "first_name", "last_name"].indexOf(k) === -1) setVal(k, draft[k]); });
    params.forEach(function (v, k) { setVal(k === "cat" ? "goal" : k, v); });

    function values() { return collect(form); }
    function visible(step) {
      var cond = step.getAttribute("data-if"); if (!cond) return true;
      var parts = cond.split("="), v = values()[parts[0]] || "";
      return parts[1].split("|").some(function (opt) { return String(v).split(", ").indexOf(opt) > -1; });
    }
    function visibleSteps() { return steps.filter(visible); }
    function show(i) {
      var vs = visibleSteps(); idx = Math.max(0, Math.min(i, vs.length - 1));
      steps.forEach(function (s) { s.classList.remove("active"); });
      var cur = vs[idx]; cur.classList.add("active");
      // disable inputs in hidden conditional steps so they don't block validation
      steps.forEach(function (s) { var on = visible(s); $$("input,select,textarea", s).forEach(function (f) { f.disabled = !on; }); });
      var g = (form.querySelector('[name="goal"]:checked') || {}).value || "";
      $$("[data-if-inline]", form).forEach(function (el) {
        var on = visible(el.closest(".step")) && el.getAttribute("data-if-inline").split("|").indexOf(g) > -1;
        el.style.display = on ? "" : "none";
        $$("input,select,textarea", el).forEach(function (f) { f.disabled = !on; });
      });
      var pct = Math.round(((idx) / (vs.length - 1)) * 100);
      if (bar) bar.style.width = Math.max(6, pct) + "%";
      if (label) label.textContent = "Step " + (idx + 1) + " of " + (form.querySelector('[name="goal"]:checked') ? vs.length : Math.max(vs.length, 4 + (steps.length > 6 ? 2 : 0)));
      if (back) back.style.visibility = idx === 0 ? "hidden" : "visible";
      var last = idx === vs.length - 1;
      if (next) next.classList.toggle("hide", last);
      if (submit) submit.classList.toggle("hide", !last);
      var h = $("h3", cur); if (h && form.getAttribute("data-scroll") !== "no" && idx > 0) { var top = form.getBoundingClientRect().top + window.scrollY - 110; if (Math.abs(window.scrollY - top) > 200) window.scrollTo({ top: top, behavior: "smooth" }); }
      store.set(key, values());
      personalize();
    }
    function personalize() {
      var v = values(), goal = v.goal || "";
      $$("[data-goal-text]", form).forEach(function (el) {
        var map = JSON.parse(el.getAttribute("data-goal-text")); el.textContent = map[goal] || map["default"] || el.textContent;
      });
    }
    function go(dir) {
      var vs = visibleSteps();
      if (dir > 0 && !validate(vs[idx])) return;
      show(idx + dir);
    }
    if (next) next.addEventListener("click", function () { go(1); });
    if (back) back.addEventListener("click", function () { go(-1); });
    // auto-advance on single-choice tiles
    form.addEventListener("change", function (e) {
      if (e.target.type === "radio" && e.target.closest(".options[data-auto]")) setTimeout(function () { go(1); }, 220);
      store.set(key, values());
    });
    form.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.tagName === "INPUT" && submit && submit.classList.contains("hide")) { e.preventDefault(); go(1); } });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var vs = visibleSteps();
      if (!validate(vs[idx])) return;
      if (form.querySelector('[name="_honey"]') && form.querySelector('[name="_honey"]').value) return;
      var v = values();
      // simple lead scoring for prioritization
      var score = 0;
      if (/ASAP|0–30|1–3/.test(v.timeline || "")) score += 40; else if (/3–6/.test(v.timeline || "")) score += 25; else if (/6–12/.test(v.timeline || "")) score += 10;
      if (v.phone) score += 20;
      if (v.help && /cash|MLS|attorney|pre-approval|manager|valuation/i.test(v.help)) score += 20;
      if (v.value_range && /\$750|\$1M|\$500/.test(v.value_range)) score += 10;
      if (v.address) score += 10;
      var temp = score >= 60 ? "HOT" : score >= 35 ? "WARM" : "NURTURE";
      v.lead_score = score; v.lead_temperature = temp;
      var kind = form.getAttribute("data-form") || "wizard";
      var subject = kind === "listing-submission"
        ? "[ByOwners Listing · " + String(v.plan || "free").toUpperCase() + "] " + (v.goal || "") + " · " + (v.city || "") + ", " + (v.state || "") + " " + (v.zip || "")
        : "[ByOwners Lead · " + temp + "] " + (v.goal || "general") + " · " + (v.zip || "no ZIP") + " · " + (v.timeline || "");
      if (submit) submit.classList.add("loading");
      var auto = "Thanks " + (v.first_name || "") + "! Your free ByOwners owner plan request is in. A real person reviews every request and we'll follow up within 1–2 business days. In the meantime, start with the free checklist: " + location.origin + BASE + "/checklist/";
      send(Object.assign({ form: form.getAttribute("data-form") || "wizard" }, v), subject, { autoresponse: auto }).then(function () {
        done(v);
      }).catch(function () {
        toast("Opening your email app to finish sending…"); fallbackMail(subject, v); done(v);
      }).finally(function () { if (submit) submit.classList.remove("loading"); });
    });

    var NEXT = {
      "sell": [["/checklist/", "Start your FSBO checklist"], ["/tools/commission-savings-calculator/", "Calculate your savings"], ["/guides/how-to-price-a-home-for-sale-by-owner/", "Price it right"]],
      "rent-out": [["/guides/how-to-rent-out-your-house-by-owner/", "Landlord playbook"], ["/tools/rental-property-calculator/", "Run your rental numbers"], ["/guides/tenant-screening-guide-for-landlords/", "Screen tenants legally"]],
      "buy": [["/listings/", "Browse by-owner listings"], ["/tools/home-affordability-calculator/", "See what you can afford"], ["/guides/how-to-buy-a-house-directly-from-the-owner/", "Buyer's guide"]],
      "rent-find": [["/listings/?cat=rental", "Browse rentals by owner"], ["/safety/", "Avoid rental scams"], ["/tools/rent-vs-buy-calculator/", "Rent vs. buy"]],
      "sell-land": [["/guides/how-to-sell-land-by-owner/", "Sell land by owner"], ["/sell/", "List your land free"], ["/tools/seller-net-proceeds-calculator/", "Net proceeds"]],
      "sell-vehicle": [["/guides/how-to-sell-a-car-by-owner/", "Private car sale guide"], ["/sell/?cat=vehicle", "List your vehicle"], ["/safety/", "Safe payment tips"]],
      "sell-business": [["/guides/how-to-sell-a-business-by-owner/", "Sell your business"], ["/sell/?cat=business", "List confidentially"], ["/pros/", "Find a CPA or attorney"]],
      "find-pro": [["/pros/", "Browse pro categories"], ["/guides/flat-fee-mls-explained/", "Flat-fee MLS explained"], ["/guides/closing-a-for-sale-by-owner-sale/", "How closing works"]],
      "pro": [["/advertise/", "Advertising options"], ["/pros/", "The Pro Network"], ["/about/", "About ByOwners"]]
    };
    function done(v) {
      try { localStorage.removeItem(key); } catch (e) {}
      var links = (NEXT[v.goal] || NEXT.sell).map(function (l) { return '<a class="btn btn-outline btn-sm" href="' + BASE + l[0] + '">' + l[1] + "</a>"; }).join("");
      form.innerHTML = '<div class="success-panel"><div class="success-icon"><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg></div>' +
        "<h3>You're all set" + (v.first_name ? ", " + escapeHtml(v.first_name) : "") + "!</h3>" +
        '<p class="muted">Your request is in. A real person reviews it and follows up within 1–2 business days — no spam, no pressure. While you wait, these are the best next steps:</p>' +
        '<div class="flex" style="justify-content:center">' + links + "</div>" +
        '<p class="small muted mt-3">ByOwners is free for owners and supported by readers. <a href="' + BASE + '/support/">Chip in if we helped</a>.</p></div>';
      track("lead_submit", { form: "wizard", goal: v.goal, temperature: v.lead_temperature });
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    show(0);
  });

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  window.BO.escapeHtml = escapeHtml;

  /* ---------- Hero search tabs ---------- */
  $$("[data-search-tabs]").forEach(function (box) {
    var tabs = $$("[role=tab]", box), form = $("form", box), input = $("input[name=q]", box), hidden = $("input[name=cat]", box), btnLabel = $("[data-btn-label]", box);
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        t.setAttribute("aria-selected", "true");
        if (hidden) hidden.value = t.getAttribute("data-cat") || "";
        if (input) input.placeholder = t.getAttribute("data-ph") || input.placeholder;
        if (btnLabel) btnLabel.textContent = t.getAttribute("data-btn") || "Search";
        form.setAttribute("data-mode", t.getAttribute("data-mode") || "search");
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (input.value || "").trim(), mode = form.getAttribute("data-mode") || "search";
      if (mode === "sell") { location.href = BASE + "/get-started/?goal=" + (hidden.value || "sell") + (q ? "&zip=" + encodeURIComponent(q) : ""); return; }
      location.href = BASE + "/listings/?" + (hidden.value ? "cat=" + hidden.value + "&" : "") + "q=" + encodeURIComponent(q);
    });
  });

  /* ---------- Site search (Ctrl+K) ---------- */
  var searchModal = $("#searchModal"), sInput = $("#siteSearchInput"), sResults = $("#siteSearchResults"), index = null, sel = -1;
  function openModal(m) { if (!m) return; m.classList.add("open"); m.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; var f = $("input, button.btn", m); if (f) setTimeout(function () { f.focus(); }, 50); }
  function closeModal(m) { if (!m) return; m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  window.BO.openModal = openModal; window.BO.closeModal = closeModal;
  $$("[data-close-modal]").forEach(function (b) { b.addEventListener("click", function () { closeModal(b.closest(".modal")); }); });
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") { $$(".modal.open").forEach(closeModal); setDrawer(false); }
  });
  $$("[data-open-search]").forEach(function (b) { b.addEventListener("click", openSearch); });
  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(BASE + "/search.json").then(function (r) { return r.json(); }).then(function (j) { index = j; return j; });
  }
  window.BO.loadIndex = loadIndex;
  function openSearch() { openModal(searchModal); loadIndex(); }
  function score(item, terms) {
    var t = (item.title || "").toLowerCase(), d = (item.description || "").toLowerCase(), c = (item.category || "").toLowerCase(), k = (item.keywords || "").toLowerCase(), s = 0;
    for (var i = 0; i < terms.length; i++) {
      var w = terms[i]; if (!w) continue;
      var hit = false;
      if (t.indexOf(w) > -1) { s += 10; hit = true; }
      if (k.indexOf(w) > -1) { s += 5; hit = true; }
      if (c.indexOf(w) > -1) { s += 4; hit = true; }
      if (d.indexOf(w) > -1) { s += 3; hit = true; }
      if (!hit) return 0;
    }
    return s;
  }
  function highlight(text, terms) {
    var out = escapeHtml(text);
    terms.forEach(function (w) { if (w.length > 1) out = out.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>"); });
    return out;
  }
  function runSearch(q, target, limit) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return loadIndex().then(function (idx) {
      if (!terms.length) { target.innerHTML = '<p class="muted small">Popular: <a href="' + BASE + '/guides/how-to-sell-your-house-by-owner/">Sell by owner</a> · <a href="' + BASE + '/tools/mortgage-calculator/">Mortgage calculator</a> · <a href="' + BASE + '/guides/tenant-screening-guide-for-landlords/">Tenant screening</a> · <a href="' + BASE + '/listings/">Listings</a></p>'; return; }
      var res = idx.map(function (it) { return { it: it, s: score(it, terms) }; }).filter(function (r) { return r.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, limit || 12);
      if (!res.length) { target.innerHTML = '<p class="muted">No matches for “' + escapeHtml(q) + '”. Try a broader word, or <a href="' + BASE + '/contact/?topic=content-request">request a guide</a>.</p>'; return; }
      target.innerHTML = res.map(function (r, i) { return '<a href="' + r.it.url + '" data-i="' + i + '"><strong>' + highlight(r.it.title, terms) + "</strong><small>" + escapeHtml(r.it.type) + " · " + highlight((r.it.description || "").slice(0, 140), terms) + "</small></a>"; }).join("");
      sel = -1;
    });
  }
  window.BO.runSearch = runSearch;
  if (sInput) {
    var deb;
    sInput.addEventListener("input", function () { clearTimeout(deb); deb = setTimeout(function () { runSearch(sInput.value, sResults); }, 120); });
    sInput.addEventListener("keydown", function (e) {
      var items = $$("a", sResults); if (!items.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; items.forEach(function (a, i) { a.classList.toggle("sel", i === sel); }); items[sel].scrollIntoView({ block: "nearest" }); }
      if (e.key === "Enter" && sel > -1) { e.preventDefault(); location.href = items[sel].href; }
    });
    runSearch("", sResults);
  }

  /* ---------- YouTube lite embeds ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-yt]");
    if (!b || b.querySelector("iframe")) return;
    var id = b.getAttribute("data-yt");
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0&modestbranding=1";
    f.title = b.getAttribute("aria-label") || "YouTube video";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true; f.loading = "lazy";
    b.appendChild(f); $(".play", b) && $(".play", b).remove();
  });

  /* ---------- Favorites & saved guides ---------- */
  var favs = store.get("bo-favs", []);
  function paintFavs() { $$("[data-fav]").forEach(function (b) { var on = favs.indexOf(b.getAttribute("data-fav")) > -1; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); }); var c = $("[data-fav-count]"); if (c) c.textContent = favs.length; }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-fav]"); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var id = b.getAttribute("data-fav"), i = favs.indexOf(id);
    if (i > -1) { favs.splice(i, 1); toast("Removed from saved"); } else { favs.push(id); toast("Saved — find it under “Saved” on Listings"); }
    store.set("bo-favs", favs); paintFavs();
    document.dispatchEvent(new CustomEvent("bo:favs", { detail: favs }));
  });
  window.BO.favs = function () { return favs; }; window.BO.paintFavs = paintFavs;
  paintFavs();
  $$("[data-save-guide]").forEach(function (b) {
    b.addEventListener("click", function () {
      var saved = store.get("bo-saved-guides", []), url = b.getAttribute("data-save-guide");
      if (!saved.some(function (g) { return g.url === url; })) saved.push({ url: url, title: b.getAttribute("data-title") });
      store.set("bo-saved-guides", saved); toast("Guide saved to this browser");
    });
  });

  /* ---------- Share ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-share]"); if (!b) return;
    var data = { title: document.title, url: location.href };
    if (navigator.share) { navigator.share(data).catch(function () {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(location.href).then(function () { toast("Link copied to clipboard"); }); }
  });

  /* ---------- Guide TOC + reading progress ---------- */
  var article = $("#articleBody"), toc = $("#toc ol");
  if (article && toc) {
    var hs = $$("h2[id]", article).filter(function (h) { return !h.closest(".takeaways"); });
    if (hs.length < 3) { $("#toc").style.display = "none"; }
    hs.forEach(function (h) { var li = document.createElement("li"); li.innerHTML = '<a href="#' + h.id + '">' + escapeHtml(h.textContent) + "</a>"; toc.appendChild(li); });
    var links = $$("a", toc), prog = $("#readProgress");
    window.addEventListener("scroll", function () {
      var rect = article.getBoundingClientRect(), total = article.offsetHeight - window.innerHeight;
      if (prog) prog.style.width = Math.min(100, Math.max(0, (-rect.top / total) * 100)) + "%";
      var cur = null; hs.forEach(function (h) { if (h.getBoundingClientRect().top < 140) cur = h.id; });
      links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
    }, { passive: true });
  }

  /* ---------- Filter chips (guides, videos, resources) ---------- */
  $$("[data-filter-group]").forEach(function (group) {
    var target = $(group.getAttribute("data-filter-group")), chips = $$("[data-filter]", group), search = $(group.getAttribute("data-filter-search") || "#__none");
    var params = new URLSearchParams(location.search), active = params.get("cat") || "all";
    function apply() {
      var q = search ? search.value.toLowerCase().trim() : "", shown = 0;
      $$("[data-cat]", target).forEach(function (card) {
        var okCat = active === "all" || card.getAttribute("data-cat") === active;
        var okQ = !q || card.textContent.toLowerCase().indexOf(q) > -1;
        var vis = okCat && okQ; card.style.display = vis ? "" : "none"; if (vis) shown++;
      });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-filter") === active ? "true" : "false"); });
      var cnt = $("[data-filter-count]"); if (cnt) cnt.textContent = shown;
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { active = c.getAttribute("data-filter"); apply(); var u = new URL(location.href); if (active === "all") u.searchParams.delete("cat"); else u.searchParams.set("cat", active); history.replaceState(null, "", u); }); });
    if (search) search.addEventListener("input", apply);
    apply();
  });

  /* ---------- Interactive checklist ---------- */
  var cl = $("[data-checklist]");
  if (cl) {
    var ck = store.get("bo-checklist", {}), boxes = $$("input[type=checkbox]", cl);
    function paint() {
      var done = 0;
      boxes.forEach(function (b) { b.checked = !!ck[b.id]; b.closest(".cl-item").classList.toggle("done", b.checked); if (b.checked) done++; });
      var pct = Math.round(done / boxes.length * 100);
      $$("[data-cl-pct]").forEach(function (el) { el.textContent = pct + "%"; });
      $$("[data-cl-bar]").forEach(function (el) { el.style.width = pct + "%"; });
      $$("[data-cl-count]").forEach(function (el) { el.textContent = done + " of " + boxes.length; });
      $$(".checklist-phase").forEach(function (ph) { var bs = $$("input", ph), d = bs.filter(function (b) { return b.checked; }).length; var t = $("[data-phase-count]", ph); if (t) t.textContent = d + "/" + bs.length; });
    }
    boxes.forEach(function (b) { b.addEventListener("change", function () { ck[b.id] = b.checked; store.set("bo-checklist", ck); paint(); if (b.checked && boxes.every(function (x) { return x.checked; })) toast("Checklist complete — congratulations, owner!"); }); });
    var reset = $("[data-cl-reset]"); if (reset) reset.addEventListener("click", function () { if (confirm("Clear all checkmarks?")) { ck = {}; store.set("bo-checklist", ck); paint(); } });
    paint();
  }

  /* ---------- Donations ---------- */
  var tiers = $$("[data-tier]"), amtInput = $("#donateAmount");
  tiers.forEach(function (t) { t.addEventListener("click", function () { tiers.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); }); t.classList.add("active"); t.setAttribute("aria-pressed", "true"); if (amtInput) amtInput.value = t.getAttribute("data-tier"); }); });
  $$("[data-donate]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      var rail = b.getAttribute("data-donate"), d = CFG.donate || {};
      var amount = amtInput && parseFloat(amtInput.value) > 0 ? parseFloat(amtInput.value).toFixed(2) : "";
      var purpose = ($("#donatePurpose") || {}).value || "General support";
      if (rail === "paypal") {
        var url = "https://www.paypal.com/donate/?business=" + encodeURIComponent(CFG.contact()) + "&currency_code=" + (d.currency || "USD") + "&item_name=" + encodeURIComponent("ByOwners.com — " + purpose) + (amount ? "&amount=" + amount : "") + "&no_recurring=0";
        window.open(url, "_blank", "noopener"); track("donate_click", { rail: rail, amount: amount });
      } else if (d[rail]) { window.open(d[rail], "_blank", "noopener"); track("donate_click", { rail: rail }); }
    });
  });
  $$("[data-rail]").forEach(function (el) { var r = el.getAttribute("data-rail"); if (!(CFG.donate || {})[r]) el.remove(); });

  /* ---------- Cookie consent ---------- */
  var cookie = $("#cookieBanner"), consent = store.get("bo-consent", null);
  function applyConsent(c) {
    if (c === "essential") { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
    if (c === "all" && CFG.ga4 && !window.gtag) {
      var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + CFG.ga4; document.head.appendChild(s);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", CFG.ga4, { anonymize_ip: true });
    }
  }
  if (consent) applyConsent(consent); else if (cookie) setTimeout(function () { cookie.classList.add("show"); }, 1200);
  $$("[data-consent]").forEach(function (b) { b.addEventListener("click", function () { consent = b.getAttribute("data-consent"); store.set("bo-consent", consent); applyConsent(consent); cookie.classList.remove("show"); toast(consent === "all" ? "Preferences saved" : "Only essential cookies will be used"); }); });
  $$("[data-cookie-settings]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); cookie.classList.add("show"); }); });

  /* ---------- Exit intent (once per 7 days; never on funnel pages) ---------- */
  var exitM = $("#exitModal");
  var blocked = /\/(get-started|sell|thanks|support|contact)\//.test(location.pathname) || document.querySelector("form[data-wizard]");
  var last = store.get("bo-exit-done", 0), armed = false;
  if (CFG.exitIntent && exitM && !blocked && Date.now() - last > 7 * 864e5) {
    setTimeout(function () { armed = true; }, CFG.exitIntentDelayMs || 12000);
    document.addEventListener("mouseout", function (e) {
      if (!armed || e.relatedTarget || e.clientY > 8) return;
      armed = false; store.set("bo-exit-done", Date.now()); openModal(exitM); track("exit_intent_shown", {});
    });
    // mobile: after 60% scroll depth + 40s
    var t0 = Date.now();
    window.addEventListener("scroll", function onS() {
      if (!armed || window.innerWidth > 900) return;
      var depth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (depth > 0.6 && Date.now() - t0 > 40000) { armed = false; store.set("bo-exit-done", Date.now()); openModal(exitM); window.removeEventListener("scroll", onS); }
    }, { passive: true });
  }
  $$("[data-open-magnet]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openModal(exitM); }); });

  /* ---------- Simple event tracking hook (GA4 if enabled) ---------- */
  function track(name, params) { try { if (window.gtag) gtag("event", name, params || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, params || {})); } catch (e) {} }
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("[data-track]"); if (a) track("cta_click", { id: a.getAttribute("data-track") }); });
  window.BO.track = track;

  /* ---------- Prefill hidden/plain fields from URL (contact topic etc.) ---------- */
  var qp = new URLSearchParams(location.search);
  $$("[data-prefill]").forEach(function (f) { var v = qp.get(f.getAttribute("data-prefill")); if (v) f.value = v; });

  /* ---------- Service worker (offline-friendly) ---------- */
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register(BASE + "/sw.js").catch(function () {}); });
  }
})();
