"""
POST /user/init - Create or update user data.
Body: { "id": "user-xxx", "name": "...", "email": "...", "selectedTrack": "python", "dailyTarget": 20 }
"""

import json
import os
import sys
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("user_init")


def _read_body(rfile, headers) -> dict:
    length = int(headers.get("Content-Length") or 0)
    if length <= 0:
        return {}
    try:
        return json.loads(rfile.read(length).decode("utf-8")) or {}
    except (ValueError, UnicodeDecodeError):
        return {}


class handler(BaseHTTPRequestHandler):
    def _write_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False, default=str).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=UTF-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        store = self.context.agent.store
        body = _read_body(self.rfile, self.headers)

        user_id = body.get("id", "user-default")
        existing = store.get(f"user:{user_id}:data")

        if existing:
            self._write_json(200, {"ok": True, "user": existing})
            return

        user_data = {
            "id": user_id,
            "name": body.get("name", "Pengguna"),
            "email": body.get("email", ""),
            "selectedTrack": body.get("selectedTrack", "python"),
            "dailyTarget": body.get("dailyTarget", 20),
            "xp": 0,
            "level": 1,
            "streak": 0,
            "hearts": 5,
            "gems": 0,
            "league": "bronze",
            "onboardingComplete": True,
            "lastActiveAt": None,
            "createdAt": int(__import__("time").time() * 1000),
        }

        store.set(f"user:{user_id}:data", user_data)
        store.set(f"user:{user_id}:progress", [])
        store.set(f"user:{user_id}:submissions", [])
        store.set(f"user:{user_id}:achievements", [])

        logger.log(f"User created: {user_id}")
        self._write_json(200, {"ok": True, "user": user_data})
