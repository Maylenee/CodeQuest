"""
POST /user/update - Update user profile fields.
Body: { "id": "user-xxx", "name": "...", "email": "...", "dailyTarget": 20, "selectedTrack": "..." }
"""

import json
import os
import sys
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("user_update")


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

        user_data = store.get(f"user:{user_id}:data")
        if not user_data:
            self._write_json(404, {"error": "User not found"})
            return

        updatable = ["name", "email", "selectedTrack", "dailyTarget", "xp", "level", "gems", "hearts"]
        for field in updatable:
            if field in body and body[field] is not None:
                user_data[field] = body[field]

        store.set(f"user:{user_id}:data", user_data)
        logger.log(f"User {user_id} updated")

        self._write_json(200, {"ok": True, "user": user_data})
