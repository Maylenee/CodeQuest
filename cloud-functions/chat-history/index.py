"""
POST /chat-history - Get or save chat history for a user/lesson.
Body (GET): { "userId": "user-xxx", "lessonId": "l1" }
Body (SAVE): { "userId": "user-xxx", "lessonId": "l1", "messages": [...] }
"""

import json
import os
import sys
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("chat_history")


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

        user_id = body.get("userId", "user-default")
        lesson_id = body.get("lessonId", "general")
        chat_key = f"chat:{user_id}:{lesson_id}"

        messages = body.get("messages")
        if messages is not None:
            # Save messages
            store.set(chat_key, messages)
            self._write_json(200, {"ok": True, "count": len(messages)})
        else:
            # Get messages
            existing = store.get(chat_key) or []
            self._write_json(200, {"messages": existing})
