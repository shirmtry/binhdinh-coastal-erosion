// So sánh đường bờ biển 2020 / 2023 / 2026 – thanh trượt trước/sau (SVG + clip-path)
// HTK · 0396241674 · Cập nhật: 09/11/2026
// Dữ liệu mô phỏng – cập nhật 09/11/2026
(function () {
  "use strict";
  var SVG_NS = "http://www.w3.org/2000/svg";
  var data = null;

  var locSelect = document.getElementById("loc-select");
  var yearBefore = document.getElementById("year-before");
  var yearAfter = document.getElementById("year-after");
  var slider = document.getElementById("slider");
  var layerAfter = document.getElementById("layer-after");
  var divider = document.getElementById("divider");
  var wrap = document.getElementById("compare-wrap");

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function shorePath(points) {
    return points.map(function (p, i) {
      return (i === 0 ? "M" : "L") + p[0] + " " + p[1];
    }).join(" ");
  }

  function landPolygon(points) {
    return "M0 0 " + points.map(function (p) { return "L" + p[0] + " " + p[1]; }).join(" ") + " L0 100 Z";
  }

  function drawMap(svg, loc, year, lineColor, label, labelColor) {
    svg.innerHTML = "";
    var pts = loc.shoreline[year];
    // Biển (nền)
    svg.appendChild(el("rect", { x: 0, y: 0, width: 100, height: 100, fill: "#0e7490" }));
    // Gợn sóng trang trí
    for (var y = 8; y < 100; y += 14) {
      svg.appendChild(el("path", {
        d: "M78 " + y + " q3 -2 6 0 q3 2 6 0",
        stroke: "#67e8f9", "stroke-width": 0.5, fill: "none", opacity: 0.7
      }));
    }
    // Đất liền
    svg.appendChild(el("path", { d: landPolygon(pts), fill: "#fde68a" }));
    // Bãi cát sát bờ
    svg.appendChild(el("path", {
      d: shorePath(pts), stroke: "#f59e0b", "stroke-width": 2.5, fill: "none"
    }));
    // Đường bờ biển
    svg.appendChild(el("path", {
      d: shorePath(pts), stroke: lineColor, "stroke-width": 1.1, fill: "none",
      "stroke-dasharray": year === "2026" ? "none" : "2 1.2"
    }));
    // Nhà dân ven bờ (minh hoạ)
    [[20, 22], [30, 48], [18, 70], [34, 86]].forEach(function (h) {
      svg.appendChild(el("rect", {
        x: h[0], y: h[1], width: 3, height: 3, fill: "#b45309", rx: 0.4
      }));
    });
    // Nhãn năm
    var text = el("text", {
      x: 4, y: 7, "font-size": 6, "font-weight": "bold", fill: labelColor
    });
    text.textContent = label;
    svg.appendChild(text);
    var note = el("text", { x: 4, y: 97, "font-size": 3.2, fill: "#78350f" });
    note.textContent = "Đất liền ← → Biển";
    svg.appendChild(note);
  }

  function currentLoc() {
    return data.locations.find(function (l) { return l.id === locSelect.value; }) || data.locations[0];
  }

  function render() {
    var loc = currentLoc();
    var yb = yearBefore.value;
    var ya = yearAfter.value;
    drawMap(document.getElementById("svg-before"), loc, yb, "#16a34a", loc.name + " – " + yb, "#166534");
    drawMap(document.getElementById("svg-after"), loc, ya, "#dc2626", loc.name + " – " + ya, "#7f1d1d");
    document.getElementById("tag-before").textContent = "Năm " + yb + " (trước)";
    document.getElementById("tag-after").textContent = "Năm " + ya + " (sau)";
    document.getElementById("stats-title").textContent = "Thống kê xói lở – " + loc.name + " (" + loc.district + ")";
    document.getElementById("loc-desc").textContent = loc.description;
    renderTable();
  }

  function renderTable() {
    var body = document.getElementById("stats-body");
    body.innerHTML = "";
    data.locations.forEach(function (loc) {
      var s = loc.stats;
      var tr = document.createElement("tr");
      if (loc.id === locSelect.value) tr.style.background = "#ecfeff";
      tr.innerHTML =
        "<td><b>" + loc.name + "</b><br><small>" + loc.district + "</small></td>" +
        "<td>" + s.retreat2020_2026_m + "</td>" +
        "<td>" + s.rate_m_per_year + "</td>" +
        "<td>" + s.lostLand_ha + "</td>" +
        "<td>" + s.householdsAtRisk + "</td>" +
        "<td>" + s.seaDikeDamaged_m + "</td>" +
        '<td><span class="badge ' + loc.risk + '">' + loc.riskLabel + "</span></td>";
      body.appendChild(tr);
    });
  }

  function setSlider(v) {
    layerAfter.style.clipPath = "inset(0 0 0 " + v + "%)";
    divider.style.left = v + "%";
  }

  slider.addEventListener("input", function () { setSlider(slider.value); });

  // Kéo/chạm trực tiếp trên bản đồ
  function pointerMove(e) {
    var rect = wrap.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    var v = Math.max(0, Math.min(100, (x / rect.width) * 100));
    slider.value = v;
    setSlider(v);
  }
  var dragging = false;
  wrap.addEventListener("mousedown", function (e) { dragging = true; pointerMove(e); });
  window.addEventListener("mousemove", function (e) { if (dragging) pointerMove(e); });
  window.addEventListener("mouseup", function () { dragging = false; });
  wrap.addEventListener("touchstart", function (e) { pointerMove(e); }, { passive: true });
  wrap.addEventListener("touchmove", function (e) { pointerMove(e); }, { passive: true });

  locSelect.addEventListener("change", render);
  yearBefore.addEventListener("change", render);
  yearAfter.addEventListener("change", render);

  fetch("/api/data")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      data = d;
      data.locations.forEach(function (loc) {
        var opt = document.createElement("option");
        opt.value = loc.id;
        opt.textContent = loc.name + " – " + loc.district;
        locSelect.appendChild(opt);
      });
      var q = new URLSearchParams(window.location.search).get("loc");
      if (q && data.locations.some(function (l) { return l.id === q; })) locSelect.value = q;
      render();
      setSlider(50);
    })
    .catch(function () {
      document.getElementById("loc-desc").textContent =
        "Không tải được dữ liệu. Vui lòng thử lại hoặc gọi hotline HTK 0396241674.";
    });
})();