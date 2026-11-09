# 🌊 Xói lở bờ biển Bình Định 2026 – Nhơn Lý · Cát Tiến · Mỹ Thành

> Dữ liệu mô phỏng – cập nhật 09/11/2026 · Tác giả: **HTK** · Hotline/Zalo: **0396241674**

## 🌀 Vấn đề

Sau bão số 9 và số 10 đổ bộ Quy Nhơn – Phù Cát – Phù Mỹ trong **mùa mưa lũ 2026** (cao điểm tháng 10–12/2026), bờ biển **Nhơn Lý, Cát Tiến, Mỹ Thành** bị xói lở nghiêm trọng: bờ biển lùi hàng chục mét, mất bãi cát và rừng dương phòng hộ, kè biển hư hỏng, hàng trăm hộ dân ven bờ bị đe doạ. Dự án giúp theo dõi trực quan mức lùi của đường bờ biển qua các năm **2020 / 2023 / 2026**.

## ✨ Tính năng

- **Trang chủ**: bối cảnh xói lở sau bão 2026, thẻ thống kê 3 điểm nóng (bờ lùi, tốc độ m/năm, đất mất, hộ bị đe doạ), khuyến cáo an toàn.
- **So sánh bờ biển** (`/so-sanh`): bản đồ SVG đường bờ biển với **thanh trượt trước/sau (clip-path)**, chọn địa điểm và cặp năm 2020/2023/2026, kéo bằng chuột hoặc chạm; bảng thống kê xói lở chi tiết.
- **API JSON**: `GET /api/data` (toàn bộ dữ liệu), `GET /api/locations/{id}` (nhon-ly | cat-tien | my-thanh).
- **Giới thiệu** (`/about`): bối cảnh mùa mưa lũ 2026 + block liên hệ HTK.
- **Trang 404** có hotline HTK.
- Giao diện tiếng Việt, responsive 375px – 1440px.

## 🛠️ Công nghệ

- **Python FastAPI** (TEMPLATE 2) – phục vụ HTML + static + API JSON.
- Frontend: HTML/CSS/JavaScript thuần, bản đồ bờ biển **SVG**, slider **clip-path**.
- Triển khai: **Vercel** (`@vercel/python`, ASGI app; rewrite `/(.*)` → `/api/index/$1` kèm middleware khôi phục path).

## 🚀 Cách chạy local (Windows)

```bash
py -m venv venv
venv/Scripts/python.exe -m pip install -r requirements.txt
venv/Scripts/python.exe -m uvicorn api.index:app --port 8000
# Mở http://127.0.0.1:8000
```

Kiểm tra nhanh:

```bash
venv/Scripts/python.exe -c "import sys; sys.path.insert(0,'api'); import index; print('OK')"
```

## 🔗 Deploy

- Vercel (production): **https://binhdinh-coastal-erosion.vercel.app** (xem thêm `deploy_url.txt`).
- GitHub: https://github.com/shirmtry/binhdinh-coastal-erosion

## 📞 Liên hệ HTK – 0396241674 – 09/11/2026

- 👤 Tác giả: **HTK**
- 📞 Hotline/Zalo: [0396241674](tel:0396241674) – [https://zalo.me/0396241674](https://zalo.me/0396241674)
- ✉️ Email: [htk.contact@gmail.com](mailto:htk.contact@gmail.com)
- 🗓️ Cập nhật: 09/11/2026

---

© 2026 HTK · Hotline/Zalo: 0396241674 · Email: htk.contact@gmail.com