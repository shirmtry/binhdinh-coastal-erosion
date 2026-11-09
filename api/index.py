# -*- coding: utf-8 -*-
"""Xói lở bờ biển Bình Định 2026 – Nhơn Lý, Cát Tiến, Mỹ Thành.
Tác giả: HTK · Hotline/Zalo: 0396241674 · Email: htk.contact@gmail.com
Cập nhật: 09/11/2026
"""
import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, "..", "templates")
STATIC_DIR = os.path.join(BASE_DIR, "..", "static")

_fastapi = FastAPI(title="Xói lở bờ biển Bình Định 2026", docs_url=None, redoc_url=None)
_fastapi.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)
_fastapi.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Dữ liệu mô phỏng – cập nhật 09/11/2026
# Đường bờ biển: toạ độ chuẩn hoá (x: 0–100 từ đất ra biển, y: 0–100 dọc bờ).
# x càng nhỏ => bờ biển càng lùi sâu vào đất liền (xói lở).
LOCATIONS = [
    {
        "id": "nhon-ly",
        "name": "Nhơn Lý",
        "district": "TP. Quy Nhơn",
        "risk": "very-high",
        "riskLabel": "Rất nghiêm trọng",
        "description": "Bãi biển Nhơn Lý sau bão số 9 và số 10/2026 bị khoét sâu, "
                       "đe doạ khu dân cư xóm chài và tuyến đường ven biển.",
        "stats": {
            "retreat2020_2026_m": 42,
            "rate_m_per_year": 7.0,
            "lostLand_ha": 5.8,
            "householdsAtRisk": 68,
            "seaDikeDamaged_m": 350,
        },
        "shoreline": {
            "2020": [[68, 0], [66, 9], [67, 18], [64, 27], [65, 36], [63, 45],
                     [64, 54], [62, 63], [63, 72], [61, 81], [62, 90], [60, 100]],
            "2023": [[63, 0], [61, 9], [62, 18], [59, 27], [60, 36], [58, 45],
                     [59, 54], [57, 63], [58, 72], [56, 81], [57, 90], [55, 100]],
            "2026": [[55, 0], [53, 9], [54, 18], [50, 27], [52, 36], [49, 45],
                     [50, 54], [47, 63], [49, 72], [46, 81], [48, 90], [45, 100]],
        },
    },
    {
        "id": "cat-tien",
        "name": "Cát Tiến",
        "district": "Huyện Phù Cát",
        "risk": "high",
        "riskLabel": "Nghiêm trọng",
        "description": "Khu vực Cát Tiến (Phù Cát) mất bãi bồi chắn sóng, "
                       "nước biển ăn sâu vào rừng dương phòng hộ sau mùa mưa lũ 2026.",
        "stats": {
            "retreat2020_2026_m": 31,
            "rate_m_per_year": 5.2,
            "lostLand_ha": 4.1,
            "householdsAtRisk": 45,
            "seaDikeDamaged_m": 220,
        },
        "shoreline": {
            "2020": [[64, 0], [65, 9], [63, 18], [64, 27], [62, 36], [63, 45],
                     [61, 54], [62, 63], [60, 72], [61, 81], [59, 90], [60, 100]],
            "2023": [[60, 0], [61, 9], [59, 18], [60, 27], [58, 36], [59, 45],
                     [57, 54], [58, 63], [56, 72], [57, 81], [55, 90], [56, 100]],
            "2026": [[54, 0], [55, 9], [53, 18], [54, 27], [52, 36], [53, 45],
                     [51, 54], [52, 63], [50, 72], [51, 81], [49, 90], [50, 100]],
        },
    },
    {
        "id": "my-thanh",
        "name": "Mỹ Thành",
        "district": "Huyện Phù Mỹ",
        "risk": "high",
        "riskLabel": "Nghiêm trọng",
        "description": "Bờ biển Mỹ Thành (Phù Mỹ) sạt lở mạnh sau bão 2026, "
                       "cuốn trôi đất sản xuất và uy hiếp ao nuôi thuỷ sản ven bờ.",
        "stats": {
            "retreat2020_2026_m": 27,
            "rate_m_per_year": 4.5,
            "lostLand_ha": 3.4,
            "householdsAtRisk": 37,
            "seaDikeDamaged_m": 180,
        },
        "shoreline": {
            "2020": [[66, 0], [64, 9], [65, 18], [63, 27], [64, 36], [62, 45],
                     [63, 54], [61, 63], [62, 72], [60, 81], [61, 90], [59, 100]],
            "2023": [[62, 0], [60, 9], [61, 18], [59, 27], [60, 36], [58, 45],
                     [59, 54], [57, 63], [58, 72], [56, 81], [57, 90], [55, 100]],
            "2026": [[57, 0], [55, 9], [56, 18], [54, 27], [55, 36], [53, 45],
                     [54, 54], [52, 63], [53, 72], [51, 81], [52, 90], [50, 100]],
        },
    },
]


def payload():
    return {
        "province": "Bình Định",
        "topic": "Xói lở bờ biển sau bão 2026",
        "note": "Dữ liệu mô phỏng – cập nhật 09/11/2026",
        "updatedAt": "09/11/2026 09:00",
        "years": [2020, 2023, 2026],
        "contact": {
            "author": "HTK",
            "hotline": "0396241674",
            "zalo": "https://zalo.me/0396241674",
            "email": "htk.contact@gmail.com",
        },
        "locations": LOCATIONS,
    }


def page(name):
    return FileResponse(os.path.join(TEMPLATES_DIR, name), media_type="text/html")


@_fastapi.get("/", response_class=HTMLResponse)
def home():
    return page("index.html")


@_fastapi.get("/so-sanh", response_class=HTMLResponse)
def compare():
    return page("so-sanh.html")


@_fastapi.get("/about", response_class=HTMLResponse)
def about():
    return page("about.html")


@_fastapi.get("/api/data")
def api_data():
    return JSONResponse(payload())


@_fastapi.get("/api/locations/{location_id}")
def api_location(location_id: str):
    for loc in LOCATIONS:
        if loc["id"] == location_id:
            return JSONResponse(
                {"note": "Dữ liệu mô phỏng – cập nhật 09/11/2026", "location": loc}
            )
    return JSONResponse({"error": "Không tìm thấy địa điểm"}, status_code=404)


@_fastapi.exception_handler(404)
async def not_found(request: Request, exc):
    path = os.path.join(TEMPLATES_DIR, "404.html")
    if os.path.isfile(path):
        return FileResponse(path, status_code=404, media_type="text/html")
    return HTMLResponse(
        "<h1>404 – Không tìm thấy trang</h1>"
        '<p>Liên hệ HTK: <a href="tel:0396241674">0396241674</a></p>',
        status_code=404,
    )


class VercelPathMiddleware:
    """Vercel rewrite '/(.*)' -> '/api/index/$1' đưa prefix /api/index vào path.

    Middleware ASGI khôi phục đường dẫn gốc để FastAPI định tuyến đúng
    (hoạt động cả local lẫn Vercel, không side-effect khi import).
    """

    def __init__(self, asgi_app):
        self.asgi_app = asgi_app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            path = scope.get("path", "")
            prefix = "/api/index"
            if path == prefix or path.startswith(prefix + "/"):
                rest = path[len(prefix):] or "/"
                scope = dict(scope)
                scope["path"] = rest
                scope["raw_path"] = rest.encode("utf-8")
        await self.asgi_app(scope, receive, send)


app = VercelPathMiddleware(_fastapi)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)