// Trang chủ – Xói lở bờ biển Bình Định 2026
// HTK · 0396241674 · Cập nhật: 09/11/2026
// Dữ liệu mô phỏng – cập nhật 09/11/2026
(function () {
  "use strict";
  fetch("/api/data")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var wrap = document.getElementById("location-cards");
      wrap.innerHTML = "";
      data.locations.forEach(function (loc) {
        var s = loc.stats;
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML =
          '<h3>' + loc.name + ' <small>(' + loc.district + ')</small></h3>' +
          '<span class="badge ' + loc.risk + '">' + loc.riskLabel + '</span>' +
          '<ul class="stat-list">' +
          '<li>Bờ lùi 2020–2026: <b>' + s.retreat2020_2026_m + ' m</b></li>' +
          '<li>Tốc độ xói lở: <b>' + s.rate_m_per_year + ' m/năm</b></li>' +
          '<li>Đất bị mất: <b>' + s.lostLand_ha + ' ha</b></li>' +
          '<li>Hộ dân bị đe doạ: <b>' + s.householdsAtRisk + ' hộ</b></li>' +
          '</ul>' +
          '<a class="btn" href="/so-sanh?loc=' + loc.id + '">Xem so sánh</a>';
        wrap.appendChild(card);
      });
    })
    .catch(function () {
      document.getElementById("location-cards").innerHTML =
        '<div class="card"><h3>Không tải được dữ liệu</h3>' +
        '<p>Vui lòng thử lại hoặc gọi hotline HTK <a href="tel:0396241674">0396241674</a>.</p></div>';
    });
})();