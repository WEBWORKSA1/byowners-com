/* ByOwners.com — calculators (no dependencies). Uses window.BO helpers from main.js */
(function () {
  "use strict";
  var BO = window.BO || {}, $ = BO.$ || function (s, c) { return (c || document).querySelector(s); }, $$ = BO.$$ || function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var money = BO.money || function (n) { return "$" + Math.round(n).toLocaleString(); };
  var pct = function (n, d) { return (isFinite(n) ? n : 0).toFixed(d == null ? 1 : d) + "%"; };
  var R = window.BO_RATES || {};
  var COLORS = ["#5eead4", "#fbbf24", "#a78bfa", "#38bdf8", "#fb7185", "#a3e635"];

  function pmt(principal, annualRate, years) {
    var r = annualRate / 100 / 12, n = years * 12;
    if (principal <= 0) return 0;
    if (r === 0) return principal / n;
    return principal * r / (1 - Math.pow(1 + r, -n));
  }

  /* ---------- SVG charts ---------- */
  function donut(el, parts) {
    if (!el) return;
    var total = parts.reduce(function (a, p) { return a + Math.max(0, p.v); }, 0) || 1, R0 = 70, C = 2 * Math.PI * R0, off = 0;
    var segs = parts.map(function (p, i) {
      var len = Math.max(0, p.v) / total * C, s = '<circle r="' + R0 + '" cx="100" cy="100" fill="none" stroke="' + (p.c || COLORS[i % COLORS.length]) + '" stroke-width="28" stroke-dasharray="' + len + " " + (C - len) + '" stroke-dashoffset="' + (-off) + '" transform="rotate(-90 100 100)"><title>' + p.l + ": " + money(p.v) + "</title></circle>";
      off += len; return s;
    }).join("");
    el.innerHTML = '<svg viewBox="0 0 200 200" role="img" aria-label="Breakdown chart" style="max-width:220px;margin:0 auto">' + '<circle r="' + R0 + '" cx="100" cy="100" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="28"/>' + segs + "</svg>";
    var lg = el.parentNode.querySelector("[data-legend]");
    if (lg) lg.innerHTML = parts.map(function (p, i) { return '<span><i style="background:' + (p.c || COLORS[i % COLORS.length]) + '"></i>' + p.l + " " + money(p.v) + "</span>"; }).join("");
  }
  function bars(el, items) {
    if (!el) return;
    var max = Math.max.apply(null, items.map(function (i) { return i.v; })) || 1;
    el.innerHTML = items.map(function (it, i) {
      var w = Math.max(2, it.v / max * 100);
      return '<div style="margin:10px 0"><div class="flex-between small" style="color:#cbd5e1"><span>' + it.l + "</span><b style=\"color:#fff\">" + money(it.v) + '</b></div><div style="height:12px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden;margin-top:6px"><span style="display:block;height:100%;width:' + w + "%;background:" + (it.c || COLORS[i]) + ';border-radius:999px;transition:width .4s"></span></div></div>';
    }).join("");
  }
  function lines(el, series, opts) {
    if (!el) return;
    opts = opts || {};
    var W = 600, H = 260, P = 40, all = [];
    series.forEach(function (s) { all = all.concat(s.data); });
    var max = Math.max.apply(null, all.concat([1])), min = Math.min.apply(null, all.concat([0])), n = series[0].data.length;
    function x(i) { return P + (W - P * 1.5) * (n === 1 ? 0 : i / (n - 1)); }
    function y(v) { return H - P - (H - P * 1.6) * ((v - min) / ((max - min) || 1)); }
    var grid = "";
    for (var g = 0; g <= 4; g++) { var gv = min + (max - min) * g / 4, gy = y(gv); grid += '<line x1="' + P + '" x2="' + (W - P / 2) + '" y1="' + gy + '" y2="' + gy + '" stroke="' + (opts.gridColor || "rgba(148,163,184,.25)") + '"/><text x="' + (P - 6) + '" y="' + (gy + 4) + '" text-anchor="end" font-size="11" fill="' + (opts.textColor || "#94a3b8") + '">' + (Math.abs(gv) >= 1000 ? "$" + Math.round(gv / 1000) + "k" : "$" + Math.round(gv)) + "</text>"; }
    var labels = "", step = Math.ceil(n / 8);
    for (var i = 0; i < n; i += step) labels += '<text x="' + x(i) + '" y="' + (H - P + 18) + '" text-anchor="middle" font-size="11" fill="' + (opts.textColor || "#94a3b8") + '">' + (opts.labelPrefix || "Yr ") + (i + (opts.startAt == null ? 1 : opts.startAt)) + "</text>";
    var paths = series.map(function (s) {
      var d = s.data.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
      var area = s.fill ? '<path d="' + d + " L" + x(n - 1) + " " + y(min) + " L" + x(0) + " " + y(min) + ' Z" fill="' + s.color + '" opacity=".15"/>' : "";
      return area + '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
    }).join("");
    el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + (opts.label || "Chart") + '">' + grid + labels + paths + "</svg>";
  }

  /* ---------- Generic binding ---------- */
  function bind(root, compute) {
    var inputs = $$("[data-k]", root), defaults = {};
    inputs.forEach(function (i) { defaults[i.getAttribute("data-k")] = i.value; });
    var qp = new URLSearchParams(location.search);
    inputs.forEach(function (i) { var k = i.getAttribute("data-k"); if (qp.has(k)) i.value = qp.get(k); });
    function vals() { var v = {}; inputs.forEach(function (i) { var k = i.getAttribute("data-k"); v[k] = i.tagName === "SELECT" ? parseFloat(i.value) : parseFloat(i.value) || 0; }); return v; }
    function out(k, html) { $$('[data-o="' + k + '"]', root).forEach(function (e) { e.innerHTML = html; }); }
    function run() { try { compute(vals(), out, root); } catch (e) { if (window.console) console.warn(e); } }
    inputs.forEach(function (i) {
      var r = $('[data-r="' + i.getAttribute("data-k") + '"]', root);
      i.addEventListener("input", function () { if (r) r.value = i.value; run(); });
      if (r) { r.value = i.value; r.addEventListener("input", function () { i.value = r.value; run(); }); }
    });
    $$("[data-calc-share]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var u = new URL(location.href); inputs.forEach(function (i) { u.searchParams.set(i.getAttribute("data-k"), i.value); });
        if (navigator.clipboard) navigator.clipboard.writeText(u.toString()).then(function () { BO.toast && BO.toast("Link copied — your numbers are saved in it"); });
        history.replaceState(null, "", u);
      });
    });
    $$("[data-calc-reset]", root).forEach(function (b) { b.addEventListener("click", function () { inputs.forEach(function (i) { i.value = defaults[i.getAttribute("data-k")]; var r = $('[data-r="' + i.getAttribute("data-k") + '"]', root); if (r) r.value = i.value; }); history.replaceState(null, "", location.pathname); run(); }); });
    run();
    return { run: run, vals: vals };
  }
  function seedRate(root) {
    if (!R.rate30) return;
    var qp = new URLSearchParams(location.search); if (qp.has("rate")) return;
    var i = $('[data-k="rate"]', root); if (i) { i.value = R.rate30.toFixed(2); var r = $('[data-r="rate"]', root); if (r) r.value = i.value; }
  }

  var CALCS = {
    commission: function (root) {
      bind(root, function (v, out) {
        var trad = v.price * v.comm / 100, fsbo = v.price * v.buyerAgent / 100 + v.diy, save = trad - fsbo;
        out("savings", money(Math.max(0, save)) + (save < 0 ? ' <small style="font-size:1rem;color:#fda4af">(no savings at these inputs)</small>' : ""));
        out("trad", money(trad)); out("fsbo", money(fsbo)); out("pct", pct(save / v.price * 100, 2));
        bars($('[data-chart="bars"]', root), [{ l: "Traditional listing", v: trad, c: "#fb7185" }, { l: "Selling by owner", v: fsbo, c: "#5eead4" }]);
      });
    },
    "net-proceeds": function (root) {
      bind(root, function (v, out) {
        var comm = v.price * (v.listComm + v.buyerComm) / 100, close = v.price * (v.closing + v.transfer) / 100, other = v.concessions + v.repairs + v.proration + v.other;
        var net = v.price - v.payoff - comm - close - other;
        out("net", money(net)); out("netPct", pct(net / v.price * 100));
        out("payoffOut", money(v.payoff)); out("commOut", money(comm)); out("closeOut", money(close)); out("otherOut", money(other));
        donut($('[data-chart="donut"]', root), [{ l: "Your net", v: Math.max(0, net) }, { l: "Payoff", v: v.payoff, c: "#38bdf8" }, { l: "Commissions", v: comm, c: "#fb7185" }, { l: "Closing", v: close, c: "#fbbf24" }, { l: "Other", v: other, c: "#a78bfa" }]);
      });
    },
    mortgage: function (root) {
      seedRate(root);
      var qp = new URLSearchParams(location.search);
      bind(root, function (v, out) {
        var down = v.price * v.downPct / 100, loan = Math.max(0, v.price - down), pi = pmt(loan, v.rate, v.term);
        var tax = v.price * v.taxPct / 100 / 12, ins = v.ins / 12, pmi = v.downPct < 20 ? loan * v.pmiPct / 100 / 12 : 0, total = pi + tax + ins + v.hoa + pmi;
        out("monthly", money(total)); out("loan", money(loan)); out("pi", money(pi));
        out("totalInt", money(pi * v.term * 12 - loan));
        var d = new Date(); d.setMonth(d.getMonth() + v.term * 12); out("payoffDate", d.toLocaleDateString("en-US", { month: "short", year: "numeric" }));
        donut($('[data-chart="donut"]', root), [{ l: "Principal & interest", v: pi }, { l: "Taxes", v: tax, c: "#fbbf24" }, { l: "Insurance", v: ins, c: "#38bdf8" }, { l: "HOA", v: v.hoa, c: "#a78bfa" }, { l: "PMI", v: pmi, c: "#fb7185" }].filter(function (p) { return p.v > 0; }));
        // amortization
        var r = v.rate / 100 / 12, bal = loan, rows = "", balances = [loan], equity = [down];
        for (var y = 1; y <= v.term; y++) {
          var pp = 0, ip = 0;
          for (var m = 0; m < 12; m++) { var it = bal * r, pr = Math.min(bal, pi - it); ip += it; pp += pr; bal = Math.max(0, bal - pr); }
          balances.push(bal); equity.push(v.price - bal);
          rows += "<tr><td>" + y + "</td><td>" + money(pp) + "</td><td>" + money(ip) + "</td><td>" + money(bal) + "</td></tr>";
        }
        out("amortRows", rows);
        var tc = getComputedStyle(document.documentElement).getPropertyValue("--ink-3") || "#64748b";
        lines($('[data-chart="amort"]', root), [{ data: balances, color: "#f43f5e", fill: true }, { data: equity, color: "#0d9488", fill: true }], { label: "Loan balance vs equity", textColor: tc, startAt: 0 });
      });
      if (qp.has("price")) { var p = $('[data-k="price"]', root); if (p) p.dispatchEvent(new Event("input")); }
    },
    affordability: function (root) {
      seedRate(root);
      bind(root, function (v, out) {
        var monthlyInc = v.income / 12, front = monthlyInc * v.front / 100, back = monthlyInc * v.back / 100 - v.debts;
        var maxPay = Math.max(0, Math.min(front, back)), limit = front <= back ? "Housing ratio (" + v.front + "%)" : "Total debt ratio (" + v.back + "%)";
        var r = v.rate / 100 / 12, n = v.term * 12, f = r ? r / (1 - Math.pow(1 + r, -n)) : 1 / n, t = v.taxPct / 100 / 12, fixed = v.ins / 12 + v.hoa;
        var pmiRate = 0, loan = 0;
        for (var k = 0; k < 3; k++) { loan = Math.max(0, (maxPay - v.down * t - fixed) / (f + t + pmiRate / 12)); var price0 = loan + v.down; pmiRate = price0 > 0 && v.down / price0 < 0.2 ? 0.005 : 0; }
        var price = loan + v.down;
        out("maxPrice", money(price)); out("maxPay", money(maxPay)); out("loan", money(loan)); out("downPct", pct(price ? v.down / price * 100 : 0)); out("limit", limit);
      });
    },
    rental: function (root) {
      bind(root, function (v, out) {
        var down = v.price * v.downPct / 100, loan = v.price - down, pi = pmt(loan, v.rate, v.term);
        var egi = v.rent * (1 - v.vacancy / 100);
        var opex = v.rent * (v.mgmt + v.maint + v.capex) / 100 + v.tax / 12 + v.ins / 12 + v.hoa + v.util;
        var noiM = egi - opex, cash = noiM - pi, invested = down + v.closing;
        out("cash", money(cash) + '<small style="font-size:1rem;color:#94a3b8">/mo</small>');
        out("noi", money(noiM * 12)); out("cap", pct(noiM * 12 / v.price * 100, 2)); out("coc", pct(invested ? cash * 12 / invested * 100 : 0, 2));
        out("dscr", pi ? (noiM / pi).toFixed(2) : "∞"); out("onePct", pct(v.rent / v.price * 100, 2)); out("pi", money(pi));
      });
    },
    "rent-vs-buy": function (root) {
      seedRate(root);
      bind(root, function (v, out) {
        var down = v.price * v.downPct / 100, loan = v.price - down, pi = pmt(loan, v.rate, 30), r = v.rate / 100 / 12;
        var bal = loan, value = v.price, rent = v.rent, buyOut = down + v.price * v.buyClose / 100, rentOut = 0, invested = buyOut;
        var buySeries = [], rentSeries = [], breakeven = null;
        for (var y = 1; y <= v.years; y++) {
          for (var m = 0; m < 12; m++) { var it = bal * r; bal = Math.max(0, bal - (pi - it)); }
          buyOut += pi * 12 + value * (v.taxPct + v.maintPct) / 100 + v.ins;
          rentOut += rent * 12; rent *= 1 + v.rentInc / 100;
          value *= 1 + v.appr / 100;
          invested *= 1 + v.ret / 100;
          var equityNet = value * (1 - v.sellCost / 100) - bal;
          var opp = invested - (down + v.price * v.buyClose / 100); // what the upfront cash would have earned
          var buyNet = buyOut - equityNet + opp;
          buySeries.push(buyNet); rentSeries.push(rentOut);
          if (breakeven === null && buyNet < rentOut) breakeven = y;
        }
        var b = buySeries[buySeries.length - 1], rr = rentSeries[rentSeries.length - 1], diff = Math.abs(b - rr);
        out("buyCost", money(b)); out("rentCost", money(rr)); out("diff", money(diff));
        out("equity", money(value * (1 - v.sellCost / 100) - bal));
        out("winnerLabel", b < rr ? "Buying wins by" : "Renting wins by");
        out("verdict", b < rr ? "Over " + v.years + " years, buying costs less after equity and selling costs." : "Over " + v.years + " years, renting and investing the difference comes out ahead.");
        out("breakeven", breakeven ? "Year " + breakeven : "Not within " + v.years + " yrs");
        lines($('[data-chart="lines"]', root), [{ data: buySeries, color: "#5eead4" }, { data: rentSeries, color: "#fbbf24" }], { label: "Cumulative net cost" });
      });
    },
    "closing-costs": function (root) {
      var role = "seller";
      var api = bind(root, function (v, out) {
        var L = [];
        if (role === "buyer") {
          var loan = v.price * (1 - v.downPct / 100);
          L = [["Lender origination & points", loan * v.origPct / 100], ["Appraisal & credit report", v.appraisal], ["Home inspection", v.inspection], ["Lender's title policy", v.price * v.lenderTitle / 100], ["Escrow/settlement fee", v.settlement], ["Attorney", v.attorney], ["Recording fees", v.recording], ["Prepaids & escrow deposits", v.prepaids]];
        } else {
          L = [["Owner's title policy", v.price * v.ownerTitle / 100], ["Transfer/excise tax", v.price * v.transfer / 100], ["Commissions", v.price * v.commission / 100], ["Escrow/settlement fee", v.settlement], ["Attorney", v.attorney], ["Recording fees", v.recording], ["Payoff, wire & doc fees", v.payoffFees]];
        }
        var total = L.reduce(function (a, l) { return a + l[1]; }, 0);
        out("total", money(total)); out("pct", pct(total / v.price * 100, 2));
        out("roleLabel", "Estimated " + role + " closing costs");
        out("lines", L.map(function (l) { return '<div class="result-row"><span>' + l[0] + "</span><b>" + money(l[1]) + "</b></div>"; }).join(""));
      });
      $$("[data-role]", root).forEach(function (b) {
        b.addEventListener("click", function () {
          role = b.getAttribute("data-role");
          $$("[data-role]", root).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          $$("[data-role-show]", root).forEach(function (g) { g.hidden = g.getAttribute("data-role-show") !== role; });
          api.run();
        });
      });
    },
    quiz: function (root) {
      var form = $("[data-quiz]", root) || root, steps = $$("[data-q]", form), result = $("[data-q-result]", form), i = 0, bar = $("[data-q-bar]", form), label = $("[data-q-label]", form), back = $("[data-q-back]", form);
      function show(n) {
        i = n; steps.forEach(function (s, k) { s.classList.toggle("active", k === i); }); result.classList.toggle("active", i >= steps.length);
        if (bar) bar.style.width = Math.max(6, i / steps.length * 100) + "%";
        if (label) label.textContent = i < steps.length ? "Question " + (i + 1) + " of " + steps.length : "Your result";
        if (back) back.style.visibility = i === 0 ? "hidden" : "visible";
        if (i >= steps.length) finish();
      }
      form.addEventListener("change", function (e) { if (e.target.type === "radio") setTimeout(function () { show(i + 1); }, 200); });
      if (back) back.addEventListener("click", function () { show(Math.max(0, i - 1)); });
      $("[data-q-restart]", form).addEventListener("click", function () { form.reset(); show(0); });
      function finish() {
        var total = 0; $$("input:checked", form).forEach(function (r) { total += parseInt(r.value, 10) || 0; });
        var score = Math.round(total / 24 * 100), base = window.BO_BASE || "", t, d, links;
        if (score >= 70) { t = "You're a strong candidate to sell by owner"; d = "You have the time, market and temperament. Pair a free listing with an attorney or title company for the contract and closing, and keep the commission."; links = [["/sell/", "List free now"], ["/checklist/", "Open the checklist"]]; }
        else if (score >= 45) { t = "By owner + targeted pro help is your sweet spot"; d = "Sell by owner but buy the pieces you're missing: a flat-fee MLS listing for exposure, an attorney for contracts, or pro photos. You'll still keep most of the savings."; links = [["/guides/flat-fee-mls-explained/", "Flat-fee MLS explained"], ["/pros/", "Find a pro"]]; }
        else { t = "A full-service agent may fit you better — for now"; d = "Your timeline or comfort level points to more support. Use our tools to negotiate the commission, and revisit selling by owner when conditions change."; links = [["/guides/real-estate-commission-rule-changes-explained/", "How commissions work now"], ["/get-started/?goal=find-pro", "Get matched"]]; }
        $("[data-q-score]", form).textContent = score + "/100"; $("[data-q-title]", form).textContent = t; $("[data-q-text]", form).textContent = d;
        $("[data-q-links]", form).innerHTML = links.map(function (l, k) { return '<a class="btn ' + (k ? "btn-outline" : "btn-primary") + '" href="' + base + l[0] + '">' + l[1] + "</a>"; }).join("");
        BO.track && BO.track("quiz_complete", { score: score });
      }
      show(0);
    }
  };

  $$("[data-calc]").forEach(function (root) { var fn = CALCS[root.getAttribute("data-calc")]; if (fn) fn(root); });
  // Homepage savings widget
  $$("[data-savings-widget]").forEach(function (root) { CALCS.commission(root); });
})();
