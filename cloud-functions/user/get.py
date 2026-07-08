"""
GET /user/get?id=user-xxx - Get user data.
"""

import json
import os
import sys
from urllib.parse import urlparse, parse_qs
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("user_get")


class handler(BaseHTTPRequestHandler):
    def _write_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False, default=str).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=UTF-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        store = self.context.agent.store
        params = parse_qs(urlparse(self.path).query)
        user_id = params.get("id", ["user-default"])[0]

        user_data = store.get(f"user:{user_id}:data")
        if not user_data:
            self._write_json(404, {"error": "User not found"})
            return

        progress = store.get(f"user:{user_id}:progress") or []
        submissions = store.get(f"user:{user_id}:submissions") or []
        achievements = store.get(f"user:{user_id}:achievements") or []

        self._write_json(200, {
            "user": user_data,
            "progress": progress,
            "submissions": submissions,
            "achievements": achievements
        })
