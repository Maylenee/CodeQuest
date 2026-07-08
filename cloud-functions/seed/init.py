"""
POST /seed/init - Initialize seed data in EdgeOne store.

Call once during onboarding or when data is missing.
Stores tracks, units, lessons, questions, achievements as JSON.
"""

import json
import os
import sys
from http.server import BaseHTTPRequestHandler

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("seed")

DATA = {
  "tracks": [
    {
      "id": "python",
      "name": "Python Dasar",
      "description": "Pelajari Python dari nol sampai bisa bikin program sederhana",
      "icon": "code",
      "color": "#58CC02",
      "order": 1,
      "studentCount": 12400,
      "units": [
        {
          "id": "u1",
          "name": "Dasar-Dasar Python",
          "description": "Kenalan dengan Python, variabel, dan tipe data dasar",
          "order": 1,
          "lessons": [
            {
              "id": "l1",
              "title": "Apa itu Python?",
              "order": 1,
              "questions": [
                {
                  "id": "q1",
                  "type": "mcq",
                  "prompt": "Siapakah pencipta bahasa pemrograman Python?",
                  "content": {"options": ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Brendan Eich"], "correctAnswer": 0, "hints": ["Nama Python terinspirasi dari acara TV Monty Python's Flying Circus"]},
                  "xpReward": 10
                },
                {
                  "id": "q2",
                  "type": "mcq",
                  "prompt": "Python adalah bahasa pemrograman yang bersifat...",
                  "content": {"options": ["Compiled (dikompilasi)", "Interpreted (diterjemahkan langsung)", "Hybrid", "Markup language"], "correctAnswer": 1, "hints": ["Python menjalankan kode baris per baris tanpa proses kompilasi terpisah"]},
                  "xpReward": 10
                },
                {
                  "id": "q3",
                  "type": "predict_output",
                  "prompt": "Apa output dari kode Python berikut?",
                  "content": {"code": "print(\"Hello, Python!\")", "options": ["Hello, Python!", "hello, python!", "Error", "Tidak ada output"], "correctAnswer": 0, "hints": ["Fungsi print() akan mencetak argumen yang diberikan ke console"]},
                  "xpReward": 10
                },
                {
                  "id": "q3b",
                  "type": "spot_bug",
                  "prompt": "Baris mana yang mengandung bug pada kode berikut?",
                  "content": {"code": "print(\"Halo\")\nprint(\"Dunia\"\nprint(\"Python\")", "bugLines": [1], "hints": ["Perhatikan tanda kurung yang tidak berpasangan"]},
                  "xpReward": 15
                }
              ]
            },
            {
              "id": "l2",
              "title": "Variabel & Tipe Data",
              "order": 2,
              "questions": [
                {
                  "id": "q4",
                  "type": "mcq",
                  "prompt": "Tipe data apa yang dimiliki oleh variabel `x = \"Halo\"`?",
                  "content": {"options": ["int", "float", "str", "bool"], "correctAnswer": 2, "hints": ["Tanda kutip menandakan bahwa nilai tersebut adalah string/teks"]},
                  "xpReward": 10
                },
                {
                  "id": "q5",
                  "type": "fill_blank",
                  "prompt": "Lengkapi kode berikut untuk membuat variabel `umur` dengan nilai 17:",
                  "content": {"starterCode": "____ = 17", "blanks": [{"id": "b1", "answer": "umur"}], "hints": ["Di Python, variabel dibuat dengan menuliskan nama variabel diikuti tanda ="]},
                  "xpReward": 10
                },
                {
                  "id": "q6",
                  "type": "mcq",
                  "prompt": "Manakah dari berikut ini yang BUKAN termasuk tipe data di Python?",
                  "content": {"options": ["int", "float", "char", "bool"], "correctAnswer": 2, "hints": ["Python tidak punya tipe data char terpisah"]},
                  "xpReward": 10
                },
                {
                  "id": "q6b",
                  "type": "write_code",
                  "prompt": "Buat variabel dengan nama `nama_lengkap` dan isi dengan nilai \"CodeQuest\".",
                  "content": {"starterCode": "# Tulis kode di bawah ini\n", "expectedOutput": "nama_lengkap = \"CodeQuest\"", "hints": ["Gunakan tanda = untuk assignment", "String harus diapit tanda kutip"]},
                  "xpReward": 15
                },
                {
                  "id": "q6c",
                  "type": "drag_drop",
                  "prompt": "Susunlah kode berikut agar menjadi program yang benar:",
                  "content": {"blocks": ["print(hasil)", "hasil = a + b", "a = 5", "b = 3"], "correctOrder": [2, 3, 1, 0], "hints": ["Urutkan dari deklarasi variabel, operasi, lalu output"]},
                  "xpReward": 15
                }
              ]
            },
            {
              "id": "l3",
              "title": "Strings & Manipulasi",
              "order": 3,
              "questions": [
                {
                  "id": "q7",
                  "type": "fill_blank",
                  "prompt": "Lengkapi kode untuk menggabungkan dua string:",
                  "content": {"starterCode": "sapa = \"Halo \"\nnama = \"Dunia\"\nhasil = sapa ____ nama\nprint(hasil)", "blanks": [{"id": "b1", "answer": "+"}], "hints": ["Gunakan operator + untuk menggabungkan (concatenate) string"]},
                  "xpReward": 10
                },
                {
                  "id": "q8",
                  "type": "predict_output",
                  "prompt": "Apa output dari kode berikut?",
                  "content": {"code": "nama = \"Python\"\nprint(len(nama))", "options": ["5", "6", "7", "Error"], "correctAnswer": 1, "hints": ["len() mengembalikan panjang string, 'Python' memiliki 6 karakter"]},
                  "xpReward": 10
                },
                {
                  "id": "q8b",
                  "type": "refactor",
                  "prompt": "Refaktor kode berikut agar lebih efisien dengan metode string:",
                  "content": {"codeBefore": "teks = \"python\"\nhasil = teks.upper()\nprint(hasil)", "hints": ["Kamu bisa menggabungkan method chaining"], "expectedSolution": ""},
                  "xpReward": 15
                }
              ]
            },
            {
              "id": "l4",
              "title": "Proyek: Program Pertamamu",
              "order": 4,
              "isProject": True,
              "questions": [
                {
                  "id": "q9",
                  "type": "fill_blank",
                  "prompt": "Buat program yang mencetak nama kamu:",
                  "content": {"starterCode": "nama = \"____\"\nprint(\"Halo, \" + nama)", "blanks": [{"id": "b1", "answer": "CodeQuest"}], "hints": ["Isi dengan nama yang ingin kamu cetak"]},
                  "xpReward": 20
                }
              ]
            }
          ]
        },
        {
          "id": "u2",
          "name": "Percabangan & Perulangan",
          "description": "Belajar if-else, for loop, dan while loop",
          "order": 2,
          "lessons": [
            {
              "id": "l5",
              "title": "If-Else & Percabangan",
              "order": 1,
              "questions": [
                {
                  "id": "q10",
                  "type": "fill_blank",
                  "prompt": "Lengkapi kode untuk mengecek apakah suatu angka genap:",
                  "content": {"starterCode": "angka = 10\nif angka % 2 ____ 0:\n    print(\"Genap\")", "blanks": [{"id": "b1", "answer": "=="}], "hints": ["Gunakan operator == untuk perbandingan"]},
                  "xpReward": 10
                },
                {
                  "id": "q11",
                  "type": "mcq",
                  "prompt": "Apa yang akan dicetak oleh kode berikut?\n\nx = 10\nif x > 5:\n    print(\"Besar\")\nelse:\n    print(\"Kecil\")",
                  "content": {"options": ["Besar", "Kecil", "Error", "Tidak ada output"], "correctAnswer": 0, "hints": ["10 > 5 adalah True, jadi blok if akan dijalankan"]},
                  "xpReward": 10
                }
              ]
            },
            {
              "id": "l6",
              "title": "For Loop",
              "order": 2,
              "questions": [
                {
                  "id": "q12",
                  "type": "predict_output",
                  "prompt": "Apa output dari kode berikut?",
                  "content": {"code": "total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)", "options": ["3", "4", "6", "7"], "correctAnswer": 2, "hints": ["range(1,4) menghasilkan angka 1, 2, 3. Jumlahnya adalah 6"]},
                  "xpReward": 10
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "achievements": [
    {"id": "a1", "name": "Langkah Pertama", "description": "Selesaikan pelajaran pertama", "icon": "star"},
    {"id": "a2", "name": "7 Hari Beruntun", "description": "Streak 7 hari berturut-turut", "icon": "fire"},
    {"id": "a3", "name": "30 Hari Beruntun", "description": "Streak 30 hari berturut-turut", "icon": "fire"},
    {"id": "a4", "name": "100 Soal Selesai", "description": "Selesaikan 100 soal", "icon": "trophy"},
    {"id": "a5", "name": "Bug Hunter", "description": "Temukan 20 bug", "icon": "bug"},
    {"id": "a6", "name": "Proyek Pertama", "description": "Selesaikan proyek mini pertamamu", "icon": "code"},
    {"id": "a7", "name": "Master Python", "description": "Selesaikan semua pelajaran Python Dasar", "icon": "award"}
  ]
}


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
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        store = self.context.agent.store

        already = store.get("seed:initialized")
        if already:
            self._write_json(200, {"ok": True, "message": "Seed data already initialized"})
            return

        store.set("seed:tracks", DATA["tracks"])
        store.set("seed:achievements", DATA["achievements"])
        store.set("seed:initialized", True)

        # Count questions
        total_questions = 0
        for track in DATA["tracks"]:
            for unit in track["units"]:
                for lesson in unit["lessons"]:
                    total_questions += len(lesson["questions"])

        logger.log(f"Seed initialized: {len(DATA['tracks'])} tracks, {total_questions} questions, {len(DATA['achievements'])} achievements")
        self._write_json(200, {
            "ok": True,
            "tracks": len(DATA["tracks"]),
            "questions": total_questions,
            "achievements": len(DATA["achievements"])
        })
