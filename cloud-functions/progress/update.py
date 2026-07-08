"""
POST /progress/update - Update lesson progress for a user.
Body: { "userId": "user-xxx", "lessonId": "l1", "status": "completed", "score": 30 }
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

logger = create_logger("progress")


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
        lesson_id = body.get("lessonId")
        status = body.get("status", "in_progress")
        score = body.get("score", 0)

        if not user_id or not lesson_id:
            self._write_json(400, {"error": "userId and lessonId required"})
            return

        progress_key = f"user:{user_id}:progress"
        progress_list = store.get(progress_key) or []

        existing_idx = None
        for i, p in enumerate(progress_list):
            if p.get("lessonId") == lesson_id:
                existing_idx = i
                break

        entry = {
            "lessonId": lesson_id,
            "status": status,
            "score": score,
            "attempts": 1,
            "completedAt": int(time.time() * 1000) if status == "completed" else None,
        }

        if existing_idx is not None:
            old = progress_list[existing_idx]
            entry["attempts"] = old.get("attempts", 0) + 1
            if status != "completed":
                entry["status"] = old.get("status", status)
            if old.get("score", 0) > score:
                entry["score"] = old.get("score", 0)
            progress_list[existing_idx] = entry
        else:
            progress_list.append(entry)

        store.set(progress_key, progress_list)

        # Update user XP if completed
        if status == "completed":
            user_data = store.get(f"user:{user_id}:data")
            if user_data:
                xp_reward = body.get("xpReward", 20)
                user_data["xp"] = user_data.get("xp", 0) + xp_reward
                new_level = user_data["xp"] // 100 + 1
                if new_level > user_data.get("level", 1):
                    user_data["level"] = new_level
                store.set(f"user:{user_id}:data", user_data)

        logger.log(f"Progress updated: user={user_id} lesson={lesson_id} status={status}")
        self._write_json(200, {"ok": True, "progress": entry})
