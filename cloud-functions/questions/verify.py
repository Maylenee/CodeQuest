"""
POST /questions/verify - Verify a user's answer against stored correct answer.
Body: { "questionId": "q1", "answer": 0 }
"""

import json
import os
import sys
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("questions_verify")


def _read_body(rfile, headers) -> dict:
    length = int(headers.get("Content-Length") or 0)
    if length <= 0:
        return {}
    try:
        return json.loads(rfile.read(length).decode("utf-8")) or {}
    except (ValueError, UnicodeDecodeError):
        return {}


def _find_question(store, question_id):
    tracks = store.get("seed:tracks") or []
    for track in tracks:
        for unit in track.get("units", []):
            for lesson in unit.get("lessons", []):
                for q in lesson.get("questions", []):
                    if q.get("id") == question_id:
                        return q
    return None


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

        question_id = body.get("questionId")
        answer = body.get("answer")

        if not question_id or answer is None:
            self._write_json(400, {"error": "questionId and answer required"})
            return

        question = _find_question(store, question_id)
        if not question:
            self._write_json(404, {"error": "Question not found"})
            return

        content = question.get("content", {})
        correct = content.get("correctAnswer")

        if question["type"] == "fill_blank":
            blanks = content.get("blanks", [])
            is_correct = all(
                answer.get(b["id"], "").strip() == b["answer"]
                for b in blanks
            )
        elif question["type"] == "predict_output":
            is_correct = answer == correct
        elif question["type"] == "mcq":
            is_correct = answer == correct
        else:
            is_correct = answer == correct

        logger.log(f"Verify: question={question_id} correct={is_correct}")
        self._write_json(200, {
            "correct": is_correct,
            "xpReward": question.get("xpReward", 10) if is_correct else 0,
        })
