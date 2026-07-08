"""
GET /questions/get?lessonId=l1 - Get all questions for a lesson.
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

logger = create_logger("questions")


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
        lesson_id = params.get("lessonId", [""])[0]

        if not lesson_id:
            self._write_json(400, {"error": "lessonId required"})
            return

        tracks = store.get("seed:tracks") or []

        for track in tracks:
            for unit in track.get("units", []):
                for lesson in unit.get("lessons", []):
                    if lesson.get("id") == lesson_id:
                        questions = lesson.get("questions", [])
                        # Don't send correctAnswer to client
                        safe = []
                        for q in questions:
                            qc = dict(q)
                            if isinstance(qc.get("content"), dict) and "correctAnswer" in qc["content"]:
                                qc["content"] = {k: v for k, v in qc["content"].items() if k != "correctAnswer"}
                            safe.append(qc)
                        self._write_json(200, {
                            "questions": safe,
                            "lesson": {"id": lesson["id"], "title": lesson["title"], "isProject": lesson.get("isProject", False)}
                        })
                        return

        self._write_json(404, {"error": "Lesson not found"})
