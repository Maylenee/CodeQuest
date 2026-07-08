"""
POST /submissions/create - Record a code submission.
Body: { "userId": "user-xxx", "questionId": "q1", "code": "print('hi')", "result": {...}, "score": 10 }
"""

import json
import os
import sys
import time
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("submissions")


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

        user_id = body.get("userId")
        question_id = body.get("questionId")

        if not user_id or not question_id:
            self._write_json(400, {"error": "userId and questionId required"})
            return

        submission = {
            "id": f"sub_{int(time.time() * 1000)}_{user_id[-8:] if len(user_id) > 8 else user_id}",
            "userId": user_id,
            "questionId": question_id,
            "code": body.get("code", ""),
            "result": body.get("result", {}),
            "score": body.get("score", 0),
            "createdAt": int(time.time() * 1000),
        }

        sub_key = f"user:{user_id}:submissions"
        subs = store.get(sub_key) or []
        subs.append(submission)
        store.set(sub_key, subs)

        # Update leaderboard (store top users sorted by XP)
        user_data = store.get(f"user:{user_id}:data")
        if user_data:
            lb = store.get("leaderboard") or []
            found = False
            for entry in lb:
                if entry.get("id") == user_id:
                    entry["xp"] = user_data.get("xp", 0)
                    entry["level"] = user_data.get("level", 1)
                    found = True
                    break
            if not found:
                lb.append({
                    "id": user_id,
                    "name": user_data.get("name", ""),
                    "xp": user_data.get("xp", 0),
                    "level": user_data.get("level", 1),
                    "streak": user_data.get("streak", 0),
                })
            lb.sort(key=lambda x: x.get("xp", 0), reverse=True)
            store.set("leaderboard", lb[:50])

        logger.log(f"Submission recorded: user={user_id} question={question_id}")
        self._write_json(200, {"ok": True, "submission": submission})
