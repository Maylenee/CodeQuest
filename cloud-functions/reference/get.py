"""
GET /reference/get - Return reference/learning content for lessons.
"""

import json
import os
import sys
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

_PARENT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _PARENT_DIR not in sys.path:
    sys.path.insert(0, _PARENT_DIR)

from _logger import create_logger

logger = create_logger("reference")

REFERENCE_DATA = [
  {
    "lessonId": "l1",
    "title": "Apa itu Python?",
    "sections": [
      {
        "type": "text",
        "content": "Python adalah bahasa pemrograman tingkat tinggi yang dibuat oleh Guido van Rossum dan pertama kali dirilis pada tahun 1991. Python dirancang dengan filosofi yang menekankan keterbacaan kode, terutama dengan penggunaan spasi putih (indentasi) yang signifikan."
      },
      {
        "type": "text",
        "content": "Python dikenal sebagai bahasa yang mudah dipelajari karena sintaksnya yang sederhana dan mirip dengan bahasa Inggris biasa. Ini membuat Python menjadi pilihan yang sangat populer untuk pemula yang baru belajar programming."
      },
      {
        "type": "code",
        "caption": "Program Python pertama kamu:",
        "code": "print(\"Hello, World!\")"
      },
      {
        "type": "text",
        "content": "Python bersifat interpreted, artinya kode Python dijalankan baris per baris tanpa perlu dikompilasi terlebih dahulu. Kamu bisa langsung melihat hasilnya setelah menjalankan kode."
      },
      {
        "type": "code",
        "caption": "Contoh interaksi sederhana:",
        "code": "nama = input(\"Siapa nama kamu? \")\nprint(\"Halo, \" + nama + \"! Selamat belajar Python!\")"
      },
      {
        "type": "bullet",
        "items": [
          "Bahasa tingkat tinggi (mudah dibaca dan ditulis)",
          "Interpreted (dijalankan langsung tanpa kompilasi)",
          "Dinamis (tipe data ditentukan saat runtime)",
          "Multi-platform (Windows, Mac, Linux)",
          "Memiliki banyak library dan framework"
        ]
      }
    ]
  },
  {
    "lessonId": "l2",
    "title": "Variabel & Tipe Data",
    "sections": [
      {
        "type": "text",
        "content": "Variabel adalah tempat untuk menyimpan data di memori komputer. Di Python, kamu tidak perlu mendeklarasikan tipe data secara eksplisit — Python akan menentukannya secara otomatis dari nilai yang diberikan."
      },
      {
        "type": "code",
        "caption": "Membuat variabel di Python:",
        "code": "nama = \"Budi\"        # string (teks)\numur = 17            # integer (bilangan bulat)\ntinggi = 1.75        # float (bilangan desimal)\nsiswa = True         # boolean (True/False)"
      },
      {
        "type": "text",
        "content": "Tipe data dasar di Python:",
      },
      {
        "type": "table",
        "columns": ["Tipe", "Contoh", "Penjelasan"],
        "rows": [
          ["int", "17, -5, 1000", "Bilangan bulat"],
          ["float", "3.14, -0.5, 2.0", "Bilangan desimal"],
          ["str", "\"Halo\"", "Teks atau karakter"],
          ["bool", "True, False", "Nilai kebenaran"],
          ["list", "[1, 2, 3]", "Kumpulan data terurut"],
          ["dict", "{\"a\": 1}", "Pasangan key-value"]
        ]
      }
    ]
  },
  {
    "lessonId": "l3",
    "title": "Strings & Manipulasi",
    "sections": [
      {
        "type": "text",
        "content": "String adalah tipe data yang digunakan untuk menyimpan teks. Di Python, string bisa dibuat dengan tanda kutip tunggal ('...') atau kutip ganda (\"...\")."
      },
      {
        "type": "code",
        "caption": "Membuat string:",
        "code": "sapa = 'Halo'\nnama = \"Python\"\nkalimat = \"Dia berkata, 'Halo!'\""
      },
      {
        "type": "text",
        "content": "Operasi umum pada string:",
      },
      {
        "type": "code",
        "caption": "Menggabungkan dan memanipulasi string:",
        "code": "a = \"Halo \"\nb = \"Dunia\"\nhasil = a + b          # \"Halo Dunia\" (concat)\nulang = \"Ha\" * 3      # \"HaHaHa\" (repeat)\npanjang = len(hasil)  # 10 (panjang string)\nhuruf = hasil[0]      # 'H' (index ke-0)\npotong = hasil[0:4]   # \"Halo\" (slicing)"
      },
      {
        "type": "text",
        "content": "Method-method string yang berguna:",
      },
      {
        "type": "table",
        "columns": ["Method", "Contoh", "Hasil"],
        "rows": [
          ["upper()", "\"halo\".upper()", "\"HALO\""],
          ["lower()", "\"HALO\".lower()", "\"halo\""],
          ["strip()", "\" halo \".strip()", "\"halo\""],
          ["replace()", "\"a-b-c\".replace(\"-\", \".\")", "\"a.b.c\""],
          ["split()", "\"a,b,c\".split(\",\")", "[\"a\", \"b\", \"c\"]"]
        ]
      }
    ]
  },
  {
    "lessonId": "l5",
    "title": "If-Else & Percabangan",
    "sections": [
      {
        "type": "text",
        "content": "Percabangan (conditionals) memungkinkan program mengambil keputusan berdasarkan kondisi tertentu. Python menggunakan `if`, `elif`, dan `else` untuk membuat percabangan."
      },
      {
        "type": "code",
        "caption": "Struktur if-else dasar:",
        "code": "nilai = 85\n\nif nilai >= 90:\n    print(\"Nilai A\")\nelif nilai >= 75:\n    print(\"Nilai B\")\nelif nilai >= 60:\n    print(\"Nilai C\")\nelse:\n    print(\"Nilai D\")\n\n# Output: Nilai B"
      },
      {
        "type": "text",
        "content": "Operator perbandingan yang sering digunakan:",
      },
      {
        "type": "table",
        "columns": ["Operator", "Arti", "Contoh"],
        "rows": [
          ["==", "Sama dengan", "5 == 5 → True"],
          ["!=", "Tidak sama", "5 != 3 → True"],
          [">", "Lebih besar", "5 > 3 → True"],
          ["<", "Lebih kecil", "5 < 3 → False"],
          [">=", ">= Lebih besar atau sama", "5 >= 5 → True"],
          ["<=", "<= Lebih kecil atau sama", "5 <= 3 → False"]
        ]
      },
      {
        "type": "code",
        "caption": "Kondisi majemuk dengan and / or:",
        "code": "umur = 20\nmemiliki_ktp = True\n\nif umur >= 17 and memiliki_ktp:\n    print(\"Bisa bikin SIM\")\nelse:\n    print(\"Belum bisa bikin SIM\")"
      }
    ]
  },
  {
    "lessonId": "l6",
    "title": "For Loop",
    "sections": [
      {
        "type": "text",
        "content": "Perulangan (loop) digunakan untuk mengulang blok kode beberapa kali. Python memiliki dua jenis perulangan utama: `for` dan `while`."
      },
      {
        "type": "code",
        "caption": "For loop dengan range():",
        "code": "# range(n) → 0 sampai n-1\nfor i in range(5):\n    print(i)\n# Output: 0 1 2 3 4\n\n# range(mulai, akhir)\nfor i in range(2, 6):\n    print(i)\n# Output: 2 3 4 5"
      },
      {
        "type": "text",
        "content": "For loop bisa digunakan untuk mengiterasi berbagai tipe data:",
      },
      {
        "type": "code",
        "caption": "Iterasi list dan string:",
        "code": "buah = [\"apel\", \"mangga\", \"jeruk\"]\nfor b in buah:\n    print(b)\n# Output: apel mangga jeruk\n\nfor huruf in \"Python\":\n    print(huruf, end=\"-\")\n# Output: P-y-t-h-o-n-"
      },
      {
        "type": "code",
        "caption": "Menggunakan enumerate() untuk mendapatkan index:",
        "code": "buah = [\"apel\", \"mangga\", \"jeruk\"]\nfor i, b in enumerate(buah):\n    print(f\"{i+1}. {b}\")\n# Output:\n# 1. apel\n# 2. mangga\n# 3. jeruk"
      },
      {
        "type": "text",
        "content": "While loop digunakan ketika jumlah perulangan tidak diketahui pasti dan bergantung pada kondisi:",
      },
      {
        "type": "code",
        "caption": "While loop:",
        "code": "angka = 0\nwhile angka < 5:\n    print(angka)\n    angka += 1\n# Output: 0 1 2 3 4"
      }
    ]
  }
]


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
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)
        lesson_id = (params.get("lessonId") or [None])[0]

        if lesson_id:
            data = next((r for r in REFERENCE_DATA if r["lessonId"] == lesson_id), None)
            if not data:
                self._write_json(404, {"error": "Reference not found"})
                return
            self._write_json(200, {"reference": data})
        else:
            self._write_json(200, {"references": REFERENCE_DATA})
