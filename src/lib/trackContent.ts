type RefSection = { type: string; content?: string; caption?: string; code?: string; items?: string[]; columns?: string[]; rows?: string[][] };

export interface TrackContent {
  name: string;
  desc: string;
  nodes: { id: string; title: string; order: number; type: "lesson" | "chest" | "milestone" }[];
  references: { lessonId: string; title: string; sections: RefSection[] }[];
  questions: Record<string, { lesson: { title: string }; questions: any[] }>;
}

const trackContent: Record<string, TrackContent> = {
  python: {
    name: "Python Dasar",
    desc: "Dasar-dasar pemrograman Python untuk pemula",
    nodes: [
      { id: "l1", title: "Apa itu Python?", order: 1, type: "lesson" },
      { id: "l2", title: "Variabel & Tipe Data", order: 2, type: "lesson" },
      { id: "l3", title: "Strings & Manipulasi", order: 3, type: "lesson" },
      { id: "l4", title: "If-Else & Percabangan", order: 4, type: "lesson" },
      { id: "l5", title: "For Loop", order: 5, type: "lesson" },
      { id: "l6", title: "List & Tuple", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Python?", sections: [
        { type: "text", content: "Python adalah bahasa pemrograman tingkat tinggi yang dibuat oleh Guido van Rossum dan pertama kali dirilis pada tahun 1991." },
        { type: "code", caption: "Program Python pertama:", code: "print(\"Hello, World!\")" },
        { type: "bullet", items: ["Bahasa tingkat tinggi", "Interpreted", "Multi-platform"] },
        { type: "text", content: "Python populer di berbagai bidang seperti data science, web development (Django, Flask), automasi, AI, dan IoT karena sintaksnya yang bersih dan mudah dipelajari." },
        { type: "table", columns: ["Versi", "Tahun Rilis"], rows: [["Python 2.0", "2000"], ["Python 3.0", "2008"], ["Python 3.13", "2024"]] }
      ]},
      { lessonId: "l2", title: "Variabel & Tipe Data", sections: [
        { type: "code", caption: "Membuat variabel:", code: "nama = \"Budi\"\numur = 17\ntinggi = 1.75" },
        { type: "table", columns: ["Tipe", "Contoh"], rows: [["int", "17"], ["float", "3.14"], ["str", "\"Halo\""], ["bool", "True/False"]] },
        { type: "text", content: "Python bersifat dynamically typed, artinya kita tidak perlu mendeklarasikan tipe data secara eksplisit. Interpreter Python akan menentukan tipe data secara otomatis saat runtime." },
        { type: "bullet", items: ["Nama variabel harus diawali huruf atau underscore", "Tidak boleh menggunakan spasi (gunakan underscore)", "Case-sensitive (nama dan Nama berbeda)", "Tidak boleh menggunakan kata kunci Python"] },
        { type: "code", caption: "Konversi tipe data:", code: "angka = \"10\"\nangka_int = int(angka)     # str ke int\nangka_float = float(angka) # str ke float\nnilai = 85.5\nnilai_int = int(nilai)    # float ke int (85)" }
      ]},
      { lessonId: "l3", title: "Strings & Manipulasi", sections: [
        { type: "code", caption: "Operasi string:", code: "a = \"Halo \"\nb = \"Dunia\"\nhasil = a + b\npanjang = len(hasil)" },
        { type: "text", content: "String di Python bersifat immutable (tidak bisa diubah setelah dibuat). Operasi seperti concatenation menghasilkan string baru tanpa mengubah string asli." },
        { type: "bullet", items: ["len() - menghitung panjang string", "upper() / lower() - mengubah huruf besar/kecil", "strip() - menghapus spasi di awal/akhir", "split() - memisahkan string menjadi list", "replace() - mengganti substring"] },
        { type: "table", columns: ["Escape Sequence", "Hasil"], rows: [["\\\\n", "Baris baru"], ["\\\\t", "Tab"], ["\\\\\\\\", "Backslash"], ["\\\\\"", "Tanda kutip ganda"]] },
        { type: "code", caption: "String formatting:", code: "nama = \"Budi\"\numur = 17\n# f-string\nprint(f\"Nama saya {nama}, umur {umur}\")\n# format()\nprint(\"Nama saya {}, umur {}\".format(nama, umur))" }
      ]},
      { lessonId: "l4", title: "If-Else & Percabangan", sections: [
        { type: "code", caption: "Struktur if-else:", code: "nilai = 85\nif nilai >= 90:\n    print(\"A\")\nelif nilai >= 75:\n    print(\"B\")" },
        { type: "text", content: "Percabangan memungkinkan program mengambil keputusan berdasarkan kondisi tertentu. Python menggunakan indentasi (4 spasi) untuk mendefinisikan blok kode." },
        { type: "bullet", items: ["== : sama dengan", "!= : tidak sama dengan", "> : lebih besar", "< : lebih kecil", ">= : lebih besar atau sama", "<= : lebih kecil atau sama"] },
        { type: "table", columns: ["Operator", "Arti", "Contoh"], rows: [["and", "Keduanya True", "x > 0 and x < 10"], ["or", "Salah satu True", "x == 0 or y == 0"], ["not", "Membalikkan nilai", "not(x > 5)"]] },
        { type: "code", caption: "Nested if dan ternary:", code: "usia = 17\npunya_ktp = True\nif usia >= 17:\n    if punya_ktp:\n        print(\"Bisa membuat SIM\")\n    else:\n        print(\"Buat KTP dulu\")\nelse:\n    print(\"Terlalu muda\")\n\n# Ternary operator\nstatus = \"Dewasa\" if usia >= 18 else \"Remaja\"" }
      ]},
      { lessonId: "l5", title: "For Loop", sections: [
        { type: "code", caption: "For loop:", code: "for i in range(5):\n    print(i)" },
        { type: "text", content: "For loop digunakan untuk iterasi (perulangan) atas sebuah sequence seperti list, tuple, string, atau range. Sangat berguna untuk mengulang eksekusi kode." },
        { type: "bullet", items: ["range(stop) - 0 hingga stop-1", "range(start, stop) - start hingga stop-1", "range(start, stop, step) - dengan langkah step"] },
        { type: "code", caption: "Iterasi list:", code: "buah = [\"apel\", \"pisang\", \"mangga\"]\nfor b in buah:\n    print(b)\n\n# enumerate untuk indeks\nfor i, b in enumerate(buah):\n    print(f\"{i+1}. {b}\")" },
        { type: "table", columns: ["Perintah", "Fungsi"], rows: [["break", "Menghentikan loop sepenuhnya"], ["continue", "Melewati iterasi saat ini"], ["else", "Dieksekusi jika loop selesai tanpa break"]] }
      ]},
      { lessonId: "l6", title: "List & Tuple", sections: [
        { type: "code", caption: "Membuat list:", code: "angka = [1, 2, 3, 4, 5]\ncampuran = [1, \"dua\", 3.0, True]" },
        { type: "text", content: "List adalah struktur data yang menyimpan kumpulan elemen dalam urutan tertentu. List bersifat mutable (bisa diubah). Tuple mirip list tapi immutable." },
        { type: "bullet", items: ["list.append(x) - tambah di akhir", "list.insert(i, x) - sisip di indeks i", "list.remove(x) - hapus elemen pertama x", "list.pop(i) - ambil & hapus indeks i", "list.sort() - urutkan list"] },
        { type: "table", columns: ["Tipe", "Mutable", "Contoh"], rows: [["List", "Ya", "[1, 2, 3]"], ["Tuple", "Tidak", "(1, 2, 3)"], ["Set", "Ya (isi unik)", "{1, 2, 3}"], ["Dict", "Ya (key-value)", "{'a': 1}"]] },
        { type: "code", caption: "List comprehension:", code: "# Membuat list kuadrat\nkuadrat = [x**2 for x in range(10)]\nprint(kuadrat)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n\n# Dengan filter\ngenap = [x for x in range(20) if x % 2 == 0]\nprint(genap)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]" }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Python?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Siapakah pencipta Python?", content: { options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Brendan Eich"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q2", type: "mcq", prompt: "Python bersifat...", content: { options: ["Compiled", "Interpreted", "Hybrid", "Markup"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q3", type: "predict_output", prompt: "Output dari print(\"Hello\")?", content: { code: 'print("Hello")', options: ["Hello", "hello", "Error", "Tidak ada"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q101", type: "mcq", prompt: "Ekstensi file Python adalah...", content: { options: [".java", ".py", ".js", ".cpp"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q102", type: "fill_blank", prompt: "Fungsi untuk mencetak output:", content: { starterCode: '____("Hello World")', blanks: [{ id: "b1", answer: "print" }] }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "Variabel & Tipe Data" }, questions: [
        { id: "q4", type: "mcq", prompt: 'Tipe data x = "Halo"?', content: { options: ["int", "float", "str", "bool"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q5", type: "fill_blank", prompt: "Lengkapi: ____ = 17", content: { starterCode: "____ = 17", blanks: [{ id: "b1", answer: "umur" }] }, xpReward: 10 },
        { id: "q103", type: "mcq", prompt: "Tipe data True/False?", content: { options: ["int", "float", "str", "bool"], correctAnswer: 3 }, xpReward: 10 },
        { id: "q104", type: "predict_output", prompt: "Output kode berikut?", content: { code: "x = 10\ny = 3\nprint(x / y)", options: ["3", "3.33", "3.3333333333333335", "Error"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q105", type: "fill_blank", prompt: "Buat variabel nama:", content: { starterCode: '____ = "Budi"', blanks: [{ id: "b1", answer: "nama" }] }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "Strings & Manipulasi" }, questions: [
        { id: "q7", type: "fill_blank", prompt: "Gabung string:", content: { starterCode: 'hasil = "Halo " ____ "Dunia"', blanks: [{ id: "b1", answer: "+" }] }, xpReward: 10 },
        { id: "q8", type: "predict_output", prompt: "len(\"Python\")?", content: { code: 'print(len("Python"))', options: ["5", "6", "7", "Error"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q106", type: "mcq", prompt: "Method untuk huruf besar semua?", content: { options: ["lower()", "upper()", "capitalize()", "big()"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q107", type: "fill_blank", prompt: "Hapus spasi di awal/akhir:", content: { starterCode: 'teks = "  Halo  "\nprint(teks.____())', blanks: [{ id: "b1", answer: "strip" }] }, xpReward: 10 },
        { id: "q108", type: "predict_output", prompt: 'Output dari "Halo" * 3?', content: { code: 'print("Halo" * 3)', options: ["HaloHaloHalo", "Halo Halo Halo", "Error", "Halo3"], correctAnswer: 0 }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "If-Else & Percabangan" }, questions: [
        { id: "q10", type: "fill_blank", prompt: "Cek angka genap:", content: { starterCode: "if angka % 2 ____ 0:", blanks: [{ id: "b1", answer: "==" }] }, xpReward: 10 },
        { id: "q109", type: "mcq", prompt: "Nilai dari not(True) adalah...", content: { options: ["True", "False", "Error", "None"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q110", type: "predict_output", prompt: "Output kode?", content: { code: "x = 10\nif x > 5:\n    print(\"Besar\")\nelse:\n    print(\"Kecil\")", options: ["Besar", "Kecil", "Error", "Tidak ada"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q111", type: "fill_blank", prompt: "Operator AND: kedua kondisi harus...", content: { starterCode: "if x > 0 ____ x < 10:", blanks: [{ id: "b1", answer: "and" }] }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "For Loop" }, questions: [
        { id: "q12", type: "predict_output", prompt: "Output kode?", content: { code: "total = 0\nfor i in range(1,4): total+=i\nprint(total)", options: ["3", "4", "6", "7"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q112", type: "fill_blank", prompt: "Loop 10 kali dengan range:", content: { starterCode: "for i in range(____):", blanks: [{ id: "b1", answer: "10" }] }, xpReward: 10 },
        { id: "q113", type: "mcq", prompt: "range(5) menghasilkan angka...", content: { options: ["1-5", "0-4", "0-5", "1-4"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q114", type: "predict_output", prompt: "Output kode?", content: { code: "for i in range(3):\n    print(i, end=' ')", options: ["0 1 2", "1 2 3", "0 1 2 3", "Error"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q115", type: "fill_blank", prompt: "Keyword untuk stop loop:", content: { starterCode: "for i in range(10):\n    if i == 5:\n        ____", blanks: [{ id: "b1", answer: "break" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "List & Tuple" }, questions: [
        { id: "q116", type: "mcq", prompt: "Bentuk list kosong yang benar?", content: { options: ["[]", "()", "{}", "<>"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q117", type: "fill_blank", prompt: "Tambah elemen ke list:", content: { starterCode: "buah = ['apel', 'pisang']\nbuah.____('mangga')", blanks: [{ id: "b1", answer: "append" }] }, xpReward: 10 },
        { id: "q118", type: "predict_output", prompt: "Output kode?", content: { code: "list_a = [1, 2, 3]\nlist_b = [4, 5]\nprint(list_a + list_b)", options: ["[1, 2, 3, 4, 5]", "[5, 7, 3]", "Error", "[1, 2, 3, [4, 5]]"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q119", type: "mcq", prompt: "Tuple bersifat...", content: { options: ["Mutable", "Immutable", "Bisa diubah", "Dinamis"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q120", type: "fill_blank", prompt: "Akses elemen pertama:", content: { starterCode: "arr = [10, 20, 30]\nprint(arr[____])", blanks: [{ id: "b1", answer: "0" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q9", type: "fill_blank", prompt: "Cetak nama:", content: { starterCode: 'nama = "____"\nprint("Halo, " + nama)', blanks: [{ id: "b1", answer: "CodeQuest" }] }, xpReward: 20 },
        { id: "q121", type: "fill_blank", prompt: "Hitung luas persegi:", content: { starterCode: "sisi = 5\nluas = sisi ____ sisi\nprint(luas)", blanks: [{ id: "b1", answer: "*" }] }, xpReward: 20 },
      ]},
    },
  },

  js: {
    name: "JavaScript Dasar",
    desc: "Dasar-dasar pemrograman JavaScript untuk pemula",
    nodes: [
      { id: "l1", title: "Apa itu JavaScript?", order: 1, type: "lesson" },
      { id: "l2", title: "Variabel & Tipe Data", order: 2, type: "lesson" },
      { id: "l3", title: "String & Manipulasi", order: 3, type: "lesson" },
      { id: "l4", title: "If-Else & Percabangan", order: 4, type: "lesson" },
      { id: "l5", title: "For Loop", order: 5, type: "lesson" },
      { id: "l6", title: "Array & Object", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu JavaScript?", sections: [
        { type: "text", content: "JavaScript adalah bahasa pemrograman untuk membuat halaman web interaktif. Diciptakan oleh Brendan Eich pada tahun 1995." },
        { type: "code", caption: "Program JavaScript pertama:", code: 'console.log("Hello, World!");' },
        { type: "bullet", items: ["Berjalan di browser", "Juga di server (Node.js)", "Multi-platform"] },
        { type: "text", content: "Ekosisem JavaScript sangat luas: frontend (React, Vue, Angular), backend (Express, Next.js), mobile (React Native), dan desktop (Electron)." },
        { type: "table", columns: ["Aspek", "JavaScript", "Python"], rows: [["Tipe", "Dynamic typing", "Dynamic typing"], ["Syntax", "C-style curly braces", "Indentation-based"], ["Async", "Callbacks/Promises", "Async/await"], ["Runtime", "Browser + Node.js", "Interpreter"]] }
      ]},
      { lessonId: "l2", title: "Variabel & Tipe Data", sections: [
        { type: "code", caption: "Membuat variabel:", code: 'let nama = "Budi";\nlet umur = 17;\nlet tinggi = 1.75;' },
        { type: "table", columns: ["Tipe", "Contoh"], rows: [["number", "17, 3.14"], ["string", '"Halo"'], ["boolean", "true/false"]] },
        { type: "text", content: "ES6 memperkenalkan let dan const. Gunakan `let` untuk variabel yang bisa diubah, `const` untuk nilai tetap. Hindari `var` karena masalah scoping." },
        { type: "bullet", items: ["camelCase untuk nama variabel (namaSaya)", "Jangan gunakan kata kunci seperti let, const, if", "Gunakan const secara default, let jika perlu reassign"] },
        { type: "code", caption: "typeof dan konversi:", code: 'let x = "42";\nconsole.log(typeof x);        // string\nlet y = Number(x);\nconsole.log(typeof y);        // number\nlet z = Boolean(0);\nconsole.log(z);               // false' }
      ]},
      { lessonId: "l3", title: "String & Manipulasi", sections: [
        { type: "code", caption: "Operasi string:", code: 'let a = "Halo ";\nlet b = "Dunia";\nlet hasil = a + b;\nlet panjang = hasil.length;' },
        { type: "text", content: "String di JS memiliki banyak method built-in untuk manipulasi. Dengan ES6, template literal menggunakan backticks memudahkan interpolasi." },
        { type: "table", columns: ["Method", "Fungsi"], rows: [["toUpperCase()", "Huruf besar semua"], ["toLowerCase()", "Huruf kecil semua"], ["includes()", "Cek substring"], ["slice()", "Memotong string"]] },
        { type: "bullet", items: ["Gunakan + atau template literal untuk concatenation", "String bersifat immutable", "Index dimulai dari 0"] },
        { type: "code", caption: "Template literal:", code: 'let nama = "Budi";\nlet umur = 17;\nlet pesan = `Nama saya ${nama}, umur ${umur} tahun.`;\nconsole.log(pesan);' }
      ]},
      { lessonId: "l4", title: "If-Else & Percabangan", sections: [
        { type: "code", caption: "Struktur if-else:", code: 'let nilai = 85;\nif (nilai >= 90) {\n  console.log("A");\n} else if (nilai >= 75) {\n  console.log("B");\n}' },
        { type: "text", content: "JavaScript memiliki truthy/falsy values. Nilai falsy: false, 0, \"\", null, undefined, NaN. Semua nilai lain adalah truthy." },
        { type: "bullet", items: ["=== : strict equality (nilai + tipe)", "!== : strict inequality", "== : loose equality (hindari)", "!= : loose inequality"] },
        { type: "table", columns: ["Operator", "Arti"], rows: [["&&", "AND - kedua nilai truthy"], ["||", "OR - salah satu truthy"], ["!", "NOT - membalik boolean"]] },
        { type: "code", caption: "Ternary dan switch:", code: 'let usia = 17;\nlet status = usia >= 18 ? "Dewasa" : "Remaja";\n\nlet hari = "Senin";\nswitch (hari) {\n  case "Senin":\n    console.log("Mulai kerja");\n    break;\n  default:\n    console.log("Hari biasa");\n}' }
      ]},
      { lessonId: "l5", title: "For Loop", sections: [
        { type: "code", caption: "For loop:", code: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}' },
        { type: "text", content: "JavaScript memiliki beberapa jenis perulangan: for klasik, for...of untuk array, for...in untuk objek, dan while/do-while." },
        { type: "bullet", items: ["for (init; condition; increment) - loop klasik", "for...of - iterasi array/iterable", "for...in - iterasi properti objek", "while - loop selama kondisi true"] },
        { type: "code", caption: "For...of dan while:", code: 'let buah = ["apel", "pisang", "mangga"];\nfor (let b of buah) {\n  console.log(b);\n}\n\nlet i = 0;\nwhile (i < 3) {\n  console.log(i);\n  i++;\n}' },
        { type: "table", columns: ["Loop", "Ketika Digunakan"], rows: [["for klasik", "Tahu pasti jumlah iterasi"], ["for...of", "Iterasi array"], ["while", "Tidak tahu jumlah iterasi"], ["do...while", "Minimal 1x eksekusi"]] }
      ]},
      { lessonId: "l6", title: "Array & Object", sections: [
        { type: "code", caption: "Membuat array:", code: 'let angka = [1, 2, 3, 4, 5];\nlet campuran = [1, "dua", true];' },
        { type: "text", content: "Array di JavaScript bisa menampung berbagai tipe data sekaligus. Object digunakan untuk data key-value. Keduanya adalah struktur data fundamental di JS." },
        { type: "bullet", items: ["push() - tambah elemen di akhir", "pop() - hapus elemen terakhir", "shift() - hapus elemen pertama", "unshift() - tambah di awal", "includes() - cek keberadaan elemen"] },
        { type: "code", caption: "Object literal:", code: 'let user = {\n  nama: "Budi",\n  umur: 17,\n  sapa: function() {\n    return `Halo, saya ${this.nama}`;\n  }\n};\nconsole.log(user.nama);     // Budi\nconsole.log(user.sapa());   // Halo, saya Budi' },
        { type: "table", columns: ["Method Array", "Fungsi", "Hasil"], rows: [["map()", "Transformasi setiap elemen", "Array baru"], ["filter()", "Menyaring elemen", "Array baru"], ["reduce()", "Mereduksi jadi satu nilai", "Nilai tunggal"], ["forEach()", "Iterasi setiap elemen", "undefined"]] }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu JavaScript?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Siapakah pencipta JavaScript?", content: { options: ["Guido van Rossum", "Brendan Eich", "James Gosling", "Dennis Ritchie"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q2", type: "mcq", prompt: "JavaScript bersifat...", content: { options: ["Compiled", "Interpreted", "Markup", "Query"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q3", type: "predict_output", prompt: "Output console.log('Hello')?", content: { code: 'console.log("Hello")', options: ["Hello", "hello", "Error", "Tidak ada"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q201", type: "mcq", prompt: "Ekstensi file JavaScript?", content: { options: [".java", ".js", ".jscript", ".ts"], correctAnswer: 1 }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "Variabel & Tipe Data" }, questions: [
        { id: "q4", type: "mcq", prompt: 'Tipe data let x = "Halo"?', content: { options: ["number", "string", "boolean", "object"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q5", type: "fill_blank", prompt: "Lengkapi: let ____ = 17;", content: { starterCode: "let ____ = 17;", blanks: [{ id: "b1", answer: "umur" }] }, xpReward: 10 },
        { id: "q202", type: "mcq", prompt: "Keyword untuk nilai tetap?", content: { options: ["let", "var", "const", "static"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q203", type: "predict_output", prompt: "Output typeof \"42\"?", content: { code: 'console.log(typeof "42")', options: ["number", "string", "boolean", "object"], correctAnswer: 1 }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "String & Manipulasi" }, questions: [
        { id: "q7", type: "fill_blank", prompt: "Gabung string:", content: { starterCode: 'let hasil = "Halo " ____ "Dunia";', blanks: [{ id: "b1", answer: "+" }] }, xpReward: 10 },
        { id: "q8", type: "predict_output", prompt: '"JavaScript".length?', content: { code: 'console.log("JavaScript".length)', options: ["8", "9", "10", "11"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q204", type: "mcq", prompt: "Method untuk huruf besar?", content: { options: ["toUpperCase()", "toLower()", "upperCase()", "toBig()"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q205", type: "fill_blank", prompt: "Template literal:", content: { starterCode: 'let nama = "Budi";\nlet pesan = ____Halo ${nama}____;', blanks: [{ id: "b1", answer: "`" }, { id: "b2", answer: "`" }] }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "If-Else & Percabangan" }, questions: [
        { id: "q10", type: "fill_blank", prompt: "Cek angka genap:", content: { starterCode: "if (angka % 2 ____ 0) {", blanks: [{ id: "b1", answer: "===" }] }, xpReward: 10 },
        { id: "q206", type: "mcq", prompt: "Nilai falsy berikut, KECUALI...", content: { options: ["false", "0", '"false"', "null"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q207", type: "predict_output", prompt: "Output kode?", content: { code: 'let x = 10;\nif (x > 5) {\n  console.log("OK");\n} else {\n  console.log("NO");\n}', options: ["OK", "NO", "Error", "undefined"], correctAnswer: 0 }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "For Loop" }, questions: [
        { id: "q12", type: "predict_output", prompt: "Output kode?", content: { code: "let total = 0;\nfor (let i=1; i<=3; i++) { total += i; }\nconsole.log(total);", options: ["3", "4", "6", "7"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q208", type: "fill_blank", prompt: "Loop 5 kali:", content: { starterCode: "for (let i = 0; i ____ 5; i++) {", blanks: [{ id: "b1", answer: "<" }] }, xpReward: 10 },
        { id: "q209", type: "mcq", prompt: "Keyword untuk loncat ke iterasi berikutnya?", content: { options: ["break", "continue", "skip", "next"], correctAnswer: 1 }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "Array & Object" }, questions: [
        { id: "q210", type: "mcq", prompt: "Method untuk tambah elemen di akhir array?", content: { options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q211", type: "fill_blank", prompt: "Akses properti object:", content: { starterCode: 'let user = {nama: "Budi"};\nconsole.log(user.____);', blanks: [{ id: "b1", answer: "nama" }] }, xpReward: 10 },
        { id: "q212", type: "predict_output", prompt: "Output kode?", content: { code: 'let arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);', options: ["3", "4", "5", "Error"], correctAnswer: 1 }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q9", type: "fill_blank", prompt: "Cetak nama:", content: { starterCode: 'let nama = "____";\nconsole.log("Halo, " + nama);', blanks: [{ id: "b1", answer: "CodeQuest" }] }, xpReward: 20 },
        { id: "q213", type: "fill_blank", prompt: "Hitung luas:", content: { starterCode: "let p = 10;\nlet l = 5;\nlet luas = p ____ l;\nconsole.log(luas);", blanks: [{ id: "b1", answer: "*" }] }, xpReward: 20 },
      ]},
    },
  },

  web: {
    name: "Web Development",
    desc: "Dasar-dasar pengembangan web dengan HTML, CSS, dan JavaScript",
    nodes: [
      { id: "l1", title: "Apa itu Web?", order: 1, type: "lesson" },
      { id: "l2", title: "HTML Dasar", order: 2, type: "lesson" },
      { id: "l3", title: "CSS Styling", order: 3, type: "lesson" },
      { id: "l4", title: "Flexbox & Grid", order: 4, type: "lesson" },
      { id: "l5", title: "JavaScript di Web", order: 5, type: "lesson" },
      { id: "l6", title: "Form & Interaksi", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Web?", sections: [
        { type: "text", content: "Web development adalah proses membuat website dan aplikasi web. Terdiri dari frontend (tampilan) dan backend (logika server)." },
        { type: "bullet", items: ["HTML untuk struktur", "CSS untuk tampilan", "JavaScript untuk interaksi"] },
        { type: "text", content: "Model client-server: browser (client) mengirim request ke server, server memproses dan mengembalikan response berupa halaman web." },
        { type: "table", columns: ["Aspek", "Frontend", "Backend"], rows: [["Bahasa", "HTML, CSS, JS", "PHP, Python, JS, Java"], ["Tugas", "Tampilan & interaksi", "Logika & database"], ["Lokasi", "Browser client", "Server"]] },
        { type: "code", caption: "Request sederhana dengan fetch:", code: 'fetch("https://api.example.com/data")\n  .then(res => res.json())\n  .then(data => console.log(data));' }
      ]},
      { lessonId: "l2", title: "HTML Dasar", sections: [
        { type: "code", caption: "Struktur HTML:", code: "<!DOCTYPE html>\n<html>\n<head><title>Halaman</title></head>\n<body>\n  <h1>Halo Dunia!</h1>\n</body>\n</html>" },
        { type: "text", content: "Elemen HTML terdiri dari tag pembuka, konten, dan tag penutup. Atribut memberikan informasi tambahan seperti id, class, atau src." },
        { type: "bullet", items: ["<h1>-<h6> untuk heading", "<p> untuk paragraf", "<a> untuk link", "<img> untuk gambar", "<div> untuk divisi/container"] },
        { type: "table", columns: ["Atribut", "Fungsi"], rows: [["class", "Klasifikasi elemen"], ["id", "Identitas unik"], ["src", "Sumber gambar/script"], ["href", "Tujuan link"]] },
        { type: "code", caption: "Form HTML sederhana:", code: '<form>\n  <label for="nama">Nama:</label>\n  <input type="text" id="nama" name="nama">\n  <button type="submit">Kirim</button>\n</form>' }
      ]},
      { lessonId: "l3", title: "CSS Styling", sections: [
        { type: "code", caption: "Contoh CSS:", code: "body {\n  background: var(--color-bg-primary);\n  font-family: Arial;\n}\nh1 {\n  color: #58cc02;\n}" },
        { type: "text", content: "CSS menggunakan selector untuk menarget elemen HTML. Ada tiga cara: inline, internal (<style> di head), dan external (file .css terpisah)." },
        { type: "bullet", items: ["Selector elemen: p, h1, div", "Selector class: .nama-kelas", "Selector ID: #nama-id", "Selector descendant: div p"] },
        { type: "table", columns: ["Format Warna", "Contoh"], rows: [["Named", "red, blue, green"], ["HEX", "#58cc02, #333"], ["RGB", "rgb(255, 0, 0)"], ["HSL", "hsl(120, 100%, 50%)"]] },
        { type: "code", caption: "Flexbox layout:", code: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.item {\n  flex: 1;\n  min-width: 200px;\n}" }
      ]},
      { lessonId: "l4", title: "Flexbox & Grid", sections: [
        { type: "code", caption: "Contoh Flexbox:", code: ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.item { flex: 1; }" },
        { type: "text", content: "Flexbox adalah model layout 1 dimensi yang memudahkan pengaturan posisi elemen secara horizontal atau vertikal. Sangat berguna untuk navigasi, card, dan pusatkan konten." },
        { type: "code", caption: "Contoh CSS Grid:", code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n.item { grid-column: span 2; }" },
        { type: "bullet", items: ["justify-content - posisi horizontal", "align-items - posisi vertikal", "flex-direction: row/column - arah layout", "grid-template-columns - definisi kolom", "gap - jarak antar elemen"] },
        { type: "table", columns: ["Properti", "Flexbox", "Grid"], rows: [["Dimensi", "1 dimensi", "2 dimensi"], ["Cocok untuk", "Navigasi, card", "Layout halaman penuh"], ["Arah", "Row atau column", "Baris & kolom"]] }
      ]},
      { lessonId: "l5", title: "JavaScript di Web", sections: [
        { type: "code", caption: "DOM Manipulation:", code: 'document.querySelector("h1").textContent = "Halo!";\ndocument.querySelector("p").style.color = "red";' },
        { type: "text", content: "DOM (Document Object Model) adalah representasi HTML sebagai objek JavaScript. DOM memungkinkan kita mengubah konten, style, dan struktur halaman secara dinamis." },
        { type: "code", caption: "Event listener:", code: 'const btn = document.getElementById("klik");\nbtn.addEventListener("click", () => {\n  alert("Tombol diklik!");\n});' },
        { type: "bullet", items: ["getElementById() - cari elemen by ID", "querySelector() - cari elemen by CSS selector", "addEventListener() - tambah event", "classList.toggle() - toggle class CSS"] },
        { type: "table", columns: ["Event", "Trigger"], rows: [["click", "Elemen diklik"], ["mouseover", "Mouse di atas elemen"], ["keydown", "Tombol keyboard ditekan"], ["submit", "Form di-submit"]] }
      ]},
      { lessonId: "l6", title: "Form & Interaksi", sections: [
        { type: "code", caption: "Form validation:", code: '<form id="myForm">\n  <input type="email" id="email" required>\n  <button type="submit">Daftar</button>\n</form>\n<script>\n  document.getElementById("myForm")\n    .addEventListener("submit", (e) => {\n      e.preventDefault();\n      alert("Form terkirim!");\n    });\n</script>' },
        { type: "text", content: "Form HTML memungkinkan user mengirim data ke server. Dengan JavaScript, kita bisa validasi input sebelum dikirim dan memberikan feedback real-time." },
        { type: "bullet", items: ["e.preventDefault() - cegah reload", "input.value - ambil nilai input", "input.validity - cek validitas", "fetch() untuk kirim data async"] },
        { type: "code", caption: "Mengambil nilai form:", code: 'const form = document.getElementById("myForm");\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const nama = form.nama.value;\n  const email = form.email.value;\n  console.log({nama, email});\n});' },
        { type: "table", columns: ["Tipe Input", "Fungsi"], rows: [["text", "Teks biasa"], ["email", "Alamat email"], ["number", "Angka"], ["password", "Kata sandi"], ["checkbox", "Pilihan ya/tidak"]] }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Web?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Apa kepanjangan dari HTML?", content: { options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q2", type: "mcq", prompt: "CSS digunakan untuk...", content: { options: ["Struktur halaman", "Tampilan halaman", "Logika halaman", "Database"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q301", type: "mcq", prompt: "Bagian web yang menangani tampilan?", content: { options: ["Backend", "Frontend", "Database", "Server"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q302", type: "fill_blank", prompt: "Protokol untuk mengambil halaman web:", content: { starterCode: "____://example.com", blanks: [{ id: "b1", answer: "https" }] }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "HTML Dasar" }, questions: [
        { id: "q3", type: "fill_blank", prompt: "Lengkapi tag heading:", content: { starterCode: "<____>Halo</____>", blanks: [{ id: "b1", answer: "h1" }, { id: "b2", answer: "h1" }] }, xpReward: 10 },
        { id: "q303", type: "mcq", prompt: "Tag untuk paragraf?", content: { options: ["<p>", "<h1>", "<div>", "<span>"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q304", type: "fill_blank", prompt: "Atribut untuk link:", content: { starterCode: '<a ____="https://google.com">Google</a>', blanks: [{ id: "b1", answer: "href" }] }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "CSS Styling" }, questions: [
        { id: "q305", type: "mcq", prompt: "CSS selector untuk ID?", content: { options: [".nama", "#nama", "*nama", "&nama"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q306", type: "fill_blank", prompt: "Properti untuk warna teks:", content: { starterCode: "h1 { ____: #58cc02; }", blanks: [{ id: "b1", answer: "color" }] }, xpReward: 10 },
        { id: "q307", type: "mcq", prompt: "Cara menulis CSS di file terpisah?", content: { options: ["Inline CSS", "External CSS", "Internal CSS", "Inline style"], correctAnswer: 1 }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "Flexbox & Grid" }, questions: [
        { id: "q308", type: "mcq", prompt: "Properti Flexbox untuk center horizontal?", content: { options: ["align-items", "justify-content", "flex-direction", "flex-wrap"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q309", type: "fill_blank", prompt: "CSS display untuk grid:", content: { starterCode: ".container { display: ____; }", blanks: [{ id: "b1", answer: "grid" }] }, xpReward: 10 },
        { id: "q310", type: "mcq", prompt: "Flexbox adalah layout...", content: { options: ["1 dimensi", "2 dimensi", "3 dimensi", "Tanpa dimensi"], correctAnswer: 0 }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "JavaScript di Web" }, questions: [
        { id: "q311", type: "mcq", prompt: "Fungsi untuk mencari elemen HTML?", content: { options: ["querySelector()", "searchElement()", "findElement()", "getElement()"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q312", type: "fill_blank", prompt: "Event saat tombol diklik:", content: { starterCode: "btn.addEventListener('____', handler);", blanks: [{ id: "b1", answer: "click" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "Form & Interaksi" }, questions: [
        { id: "q313", type: "mcq", prompt: "Method untuk cegah reload form?", content: { options: ["preventDefault()", "stopPropagation()", "stopReload()", "cancelEvent()"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q314", type: "fill_blank", prompt: "Ambil nilai input:", content: { starterCode: "let nilai = input.____;", blanks: [{ id: "b1", answer: "value" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q315", type: "fill_blank", prompt: "Buat heading dan ubah warnanya:", content: { starterCode: '<h1 id="judul">Halo</h1>\n<script>\n  document.____("judul").style.color = "red";\n</script>', blanks: [{ id: "b1", answer: "getElementById" }] }, xpReward: 20 },
      ]},
    },
  },

  algo: {
    name: "Logika & Algoritma",
    desc: "Dasar-dasar logika pemrograman dan algoritma",
    nodes: [
      { id: "l1", title: "Apa itu Algoritma?", order: 1, type: "lesson" },
      { id: "l2", title: "Flowchart", order: 2, type: "lesson" },
      { id: "l3", title: "Pseudocode", order: 3, type: "lesson" },
      { id: "l4", title: "Searching", order: 4, type: "lesson" },
      { id: "l5", title: "Sorting", order: 5, type: "lesson" },
      { id: "l6", title: "Rekursi", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Algoritma?", sections: [
        { type: "text", content: "Algoritma adalah langkah-langkah sistematis untuk menyelesaikan masalah. Ibarat resep masakan yang harus diikuti step by step." },
        { type: "bullet", items: ["Input \u2192 Proses \u2192 Output", "Harus jelas dan terstruktur", "Efisien dalam waktu dan memori"] },
        { type: "text", content: "Karakteristik algoritma yang baik: memiliki input dan output yang jelas, setiap langkah terdefinisi dengan baik, tidak ambigu, dan harus berhenti (finite)." },
        { type: "table", columns: ["Aspek", "Algoritma", "Program"], rows: [["Bentuk", "Langkah abstrak", "Kode konkret"], ["Bahasa", "Natural/pseudo", "Bahasa pemrograman"], ["Eksekusi", "Manual/analitis", "Oleh komputer"]] },
        { type: "code", caption: "Algoritma sederhana (pseudocode):", code: "MULAI\n  INPUT angka1, angka2\n  jumlah = angka1 + angka2\n  PRINT jumlah\nSELESAI" }
      ]},
      { lessonId: "l2", title: "Flowchart", sections: [
        { type: "text", content: "Flowchart adalah representasi visual dari algoritma menggunakan simbol-simbol standar seperti oval (start/end), persegi (proses), dan belah ketupat (keputusan)." },
        { type: "bullet", items: ["Oval: Start/End", "Persegi panjang: Proses/aksi", "Belah ketupat: Decision/kondisi", "Jajar genjang: Input/Output", "Panah: Alur eksekusi"] },
        { type: "table", columns: ["Simbol", "Nama", "Fungsi"], rows: [["Oval", "Terminator", "Mulai/selesai"], ["Persegi", "Process", "Operasi/aksi"], ["Belah ketupat", "Decision", "Percabangan"], ["Jajar genjang", "IO", "Input/output data"]] },
        { type: "code", caption: "Flowchart dalam teks:", code: "[START] \u2192 [INPUT nilai]\n  \u2193\n[nilai >= 75]? \u2014Ya\u2192 [PRINT \"Lulus\"]\n  |                        \u2193\n Tidak               [END]\n  \u2193\n[PRINT \"Tidak Lulus\"]" },
        { type: "text", content: "Flowchart sangat berguna saat merancang algoritma sebelum menulis kode, terutama untuk memvisualisasikan alur logika yang kompleks." }
      ]},
      { lessonId: "l3", title: "Pseudocode", sections: [
        { type: "code", caption: "Contoh pseudocode:", code: "MULAI\n  INPUT angka\n  IF angka > 0 THEN\n    PRINT(\"Positif\")\n  ELSE\n    PRINT(\"Negatif\")\n  ENDIF\nSELESAI" },
        { type: "text", content: "Pseudocode adalah cara menulis algoritma menggunakan campuran bahasa natural dan struktur kode. Tidak ada aturan baku, yang penting mudah dipahami." },
        { type: "bullet", items: ["Gunakan kata kunci seperti IF, ELSE, WHILE, FOR", "Indentasi untuk blok kode", "Komentar untuk penjelasan", "Fokus pada logika, bukan syntax"] },
        { type: "table", columns: ["Pseudocode", "Python", "JavaScript"], rows: [["IF x > 0 THEN", "if x > 0:", "if (x > 0) {"], ["FOR i=1 TO 5", "for i in range(1,6)", "for (i=1; i<=5; i++)"], ["PRINT x", "print(x)", "console.log(x)"]] },
        { type: "code", caption: "Perulangan dalam pseudocode:", code: "MULAI\n  total = 0\n  FOR i = 1 TO 10\n    total = total + i\n  ENDFOR\n  PRINT \"Total: \" + total\nSELESAI" }
      ]},
      { lessonId: "l4", title: "Searching", sections: [
        { type: "text", content: "Searching adalah proses mencari elemen tertentu dalam kumpulan data. Dua metode paling umum: Linear Search (sederhana) dan Binary Search (cepat untuk data terurut)." },
        { type: "code", caption: "Linear Search:", code: "MULAI\n  arr = [4, 2, 7, 1, 9]\n  cari = 7\n  FOR i = 0 TO length(arr)-1\n    IF arr[i] == cari THEN\n      PRINT \"Ditemukan di indeks \" + i\n      EXIT\n    ENDIF\n  ENDFOR\n  PRINT \"Tidak ditemukan\"\nSELESAI" },
        { type: "bullet", items: ["Linear Search: O(n) - cek satu per satu", "Binary Search: O(log n) - belah data terus menerus", "Binary Search butuh data terurut"] },
        { type: "table", columns: ["Metode", "Kompleksitas", "Syarat"], rows: [["Linear Search", "O(n)", "Tidak ada"], ["Binary Search", "O(log n)", "Data terurut"], ["Jump Search", "O(\u221an)", "Data terurut"]] },
        { type: "code", caption: "Binary Search:", code: "MULAI\n  arr = [1, 2, 4, 7, 9, 12, 15]\n  kiri = 0, kanan = length(arr)-1\n  WHILE kiri <= kanan\n    tengah = (kiri + kanan) / 2\n    IF arr[tengah] == cari THEN\n      PRINT \"Ditemukan\"\n      EXIT\n    ELSE IF arr[tengah] < cari THEN\n      kiri = tengah + 1\n    ELSE\n      kanan = tengah - 1\n    ENDIF\n  ENDWHILE\n  PRINT \"Tidak ditemukan\"\nSELESAI" }
      ]},
      { lessonId: "l5", title: "Sorting", sections: [
        { type: "text", content: "Sorting adalah proses mengurutkan data berdasarkan kriteria tertentu (ascending/descending). Algoritma sorting yang umum: Bubble Sort, Selection Sort, Merge Sort." },
        { type: "code", caption: "Bubble Sort:", code: "MULAI\n  arr = [5, 3, 8, 1, 2]\n  FOR i = 0 TO length(arr)-2\n    FOR j = 0 TO length(arr)-2-i\n      IF arr[j] > arr[j+1] THEN\n        TUKAR arr[j] dengan arr[j+1]\n      ENDIF\n    ENDFOR\n  ENDFOR\n  PRINT arr\nSELESAI" },
        { type: "bullet", items: ["Bubble Sort - O(n\u00b2) - sederhana tapi lambat", "Selection Sort - O(n\u00b2) - cari minimum tiap iterasi", "Merge Sort - O(n log n) - divide and conquer"] },
        { type: "table", columns: ["Algoritma", "Best Case", "Worst Case", "Stabil"], rows: [["Bubble Sort", "O(n)", "O(n\u00b2)", "Ya"], ["Selection Sort", "O(n\u00b2)", "O(n\u00b2)", "Tidak"], ["Merge Sort", "O(n log n)", "O(n log n)", "Ya"]] },
        { type: "code", caption: "Selection Sort:", code: "MULAI\n  arr = [5, 3, 8, 1, 2]\n  FOR i = 0 TO length(arr)-2\n    minIdx = i\n    FOR j = i+1 TO length(arr)-1\n      IF arr[j] < arr[minIdx] THEN\n        minIdx = j\n      ENDIF\n    ENDFOR\n    TUKAR arr[i] dengan arr[minIdx]\n  ENDFOR\n  PRINT arr\nSELESAI" }
      ]},
      { lessonId: "l6", title: "Rekursi", sections: [
        { type: "text", content: "Rekursi adalah teknik di mana fungsi memanggil dirinya sendiri. Setiap fungsi rekursif harus memiliki base case (kondisi berhenti) dan recursive case (pemanggilan diri)." },
        { type: "code", caption: "Faktorial rekursif:", code: "MULAI\n  FUNGSI faktorial(n)\n    IF n <= 1 THEN      // base case\n      RETURN 1\n    ELSE                 // recursive case\n      RETURN n * faktorial(n-1)\n    ENDIF\n  ENDFUNGSI\n  PRINT faktorial(5)  // 120\nSELESAI" },
        { type: "bullet", items: ["Base case: kondisi berhenti (wajib ada)", "Recursive case: panggil diri dengan masalah lebih kecil", "Stack overflow terjadi jika rekursi tak terbatas", "Beberapa masalah lebih alami diselesaikan dengan rekursi"] },
        { type: "table", columns: ["Aspek", "Iteratif", "Rekursif"], rows: [["Cara", "Perulangan", "Panggil diri sendiri"], ["Memori", "Lebih hemat", "Stack frame per panggilan"], ["Kejelasan", "Bertele-tele", "Elegan (untuk masalah tertentu)"]] },
        { type: "code", caption: "Fibonacci rekursif:", code: "MULAI\n  FUNGSI fib(n)\n    IF n <= 1 THEN\n      RETURN n\n    ELSE\n      RETURN fib(n-1) + fib(n-2)\n    ENDIF\n  ENDFUNGSI\n  FOR i = 0 TO 9\n    PRINT fib(i)  // 0 1 1 2 3 5 8 13 21 34\n  ENDFOR\nSELESAI" }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Algoritma?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Algoritma adalah...", content: { options: ["Bahasa pemrograman", "Langkah-langkah sistematis", "Perangkat keras", "Database"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q401", type: "mcq", prompt: "Ciri algoritma yang baik, KECUALI...", content: { options: ["Memiliki input/output", "Langkah jelas", "Berjalan terus (infinite)", "Efisien"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q402", type: "fill_blank", prompt: "Urutan algoritma yang benar:", content: { starterCode: "____ \u2192 Proses \u2192 Output", blanks: [{ id: "b1", answer: "Input" }] }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "Flowchart" }, questions: [
        { id: "q403", type: "mcq", prompt: "Simbol oval di flowchart berarti...", content: { options: ["Proses", "Start/End", "Input/Output", "Decision"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q404", type: "fill_blank", prompt: "Simbol untuk keputusan:", content: { starterCode: "Simbol ____ ketupat", blanks: [{ id: "b1", answer: "belah" }] }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "Pseudocode" }, questions: [
        { id: "q405", type: "mcq", prompt: "Pseudocode adalah...", content: { options: ["Kode Python", "Campuran natural & kode", "Bahasa mesin", "HTML"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q406", type: "fill_blank", prompt: "Kondisi dalam pseudocode:", content: { starterCode: "____ angka > 0 THEN", blanks: [{ id: "b1", answer: "IF" }] }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "Searching" }, questions: [
        { id: "q407", type: "mcq", prompt: "Binary Search butuh data...", content: { options: ["Acak", "Terurut", "Besar", "Kecil"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q408", type: "fill_blank", prompt: "Kompleksitas Binary Search:", content: { starterCode: "O(____ n)", blanks: [{ id: "b1", answer: "log" }] }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "Sorting" }, questions: [
        { id: "q409", type: "mcq", prompt: "Bubble Sort termasuk sorting...", content: { options: ["Cepat", "Lambat (O(n\u00b2))", "Linear", "Logaritmik"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q410", type: "fill_blank", prompt: "Algoritma sorting O(n log n):", content: { starterCode: "____ Sort", blanks: [{ id: "b1", answer: "Merge" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "Rekursi" }, questions: [
        { id: "q411", type: "mcq", prompt: "Base case dalam rekursi fungsinya...", content: { options: ["Mempercepat", "Menghentikan rekursi", "Memulai rekursi", "Melempar error"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q412", type: "fill_blank", prompt: "Faktorial 5 dengan rekursi:", content: { starterCode: "return n * faktorial(____)", blanks: [{ id: "b1", answer: "n-1" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q413", type: "fill_blank", prompt: "Cari angka terbesar:", content: { starterCode: "arr = [3, 7, 2, 9, 1]\nmaks = arr[____]", blanks: [{ id: "b1", answer: "0" }] }, xpReward: 20 },
      ]},
    },
  },

  sql: {
    name: "SQL & Database",
    desc: "Belajar query database dengan SQL",
    nodes: [
      { id: "l1", title: "Apa itu Database?", order: 1, type: "lesson" },
      { id: "l2", title: "SELECT Query", order: 2, type: "lesson" },
      { id: "l3", title: "Filter & Sort", order: 3, type: "lesson" },
      { id: "l4", title: "JOIN Antar Tabel", order: 4, type: "lesson" },
      { id: "l5", title: "Aggregation", order: 5, type: "lesson" },
      { id: "l6", title: "Subquery", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Database?", sections: [
        { type: "text", content: "Database adalah kumpulan data terstruktur yang disimpan secara elektronik. SQL digunakan untuk memanipulasi data dalam database relasional." },
        { type: "bullet", items: ["Relational (SQL) - MySQL, PostgreSQL", "Document (NoSQL) - MongoDB", "Key-Value - Redis", "Graph - Neo4j"] },
        { type: "table", columns: ["Aspek", "RDBMS (SQL)", "NoSQL"], rows: [["Struktur", "Tabel dengan baris & kolom", "Dokumen, key-value, graph"], ["Schema", "Fixed (harus ditentukan dulu)", "Flexible"], ["Relasi", "JOIN antar tabel", "Embedded/referensi"]] },
        { type: "code", caption: "Membuat tabel:", code: "CREATE TABLE users (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100),\n  email VARCHAR(100) UNIQUE,\n  age INT\n);" },
        { type: "text", content: "Database relasional mengikuti prinsip ACID: Atomicity (transaksi all-or-nothing), Consistency (data selalu valid), Isolation (transaksi independen), Durability (data tersimpan permanen)." }
      ]},
      { lessonId: "l2", title: "SELECT Query", sections: [
        { type: "code", caption: "Query SELECT:", code: "SELECT * FROM users;\nSELECT name, email FROM users;" },
        { type: "text", content: "SELECT adalah perintah paling dasar di SQL untuk mengambil data dari database. Gunakan * untuk semua kolom atau sebutkan kolom spesifik." },
        { type: "bullet", items: ["SELECT - kolom yang diambil", "FROM - tabel sumber", "WHERE - filter kondisi", "ORDER BY - pengurutan", "LIMIT - batas jumlah baris"] },
        { type: "table", columns: ["Perintah", "Fungsi"], rows: [["SELECT", "Mengambil data"], ["INSERT", "Menambah data"], ["UPDATE", "Mengubah data"], ["DELETE", "Menghapus data"]] },
        { type: "code", caption: "SELECT dengan berbagai klausa:", code: "SELECT name, email, age\nFROM users\nWHERE age > 17\nORDER BY age DESC\nLIMIT 10;" }
      ]},
      { lessonId: "l3", title: "Filter & Sort", sections: [
        { type: "code", caption: "Filter dengan WHERE:", code: "SELECT * FROM users WHERE age > 18 ORDER BY name ASC;" },
        { type: "text", content: "Klausa WHERE digunakan untuk memfilter baris berdasarkan kondisi. Operator perbandingan: =, <>, >, <, >=, <=. Operator logika: AND, OR, NOT." },
        { type: "bullet", items: ["= : sama dengan", "<> atau != : tidak sama", "> : lebih besar", "< : lebih kecil", "LIKE : pencarian pola (wildcard %)"] },
        { type: "table", columns: ["Operator", "Contoh", "Hasil"], rows: [["AND", "age > 18 AND city = 'Jakarta'", "Keduanya terpenuhi"], ["OR", "age < 10 OR age > 60", "Salah satu terpenuhi"], ["IN", "city IN ('Jakarta','BSD')", "Termasuk dalam daftar"], ["BETWEEN", "age BETWEEN 20 AND 30", "Dalam rentang"]] },
        { type: "code", caption: "Filter dan sort lanjutan:", code: "SELECT name, age, city\nFROM users\nWHERE age BETWEEN 25 AND 40\n  AND city IN ('Jakarta', 'Bandung')\n  AND name LIKE 'B%'\nORDER BY age DESC, name ASC\nLIMIT 5 OFFSET 0;" }
      ]},
      { lessonId: "l4", title: "JOIN Antar Tabel", sections: [
        { type: "code", caption: "INNER JOIN:", code: "SELECT users.name, orders.product\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;" },
        { type: "text", content: "JOIN menggabungkan data dari dua atau lebih tabel berdasarkan relasi antar kolom. INNER JOIN hanya mengembalikan baris yang cocok di kedua tabel." },
        { type: "bullet", items: ["INNER JOIN - hanya data yang cocok", "LEFT JOIN - semua data kiri + yang cocok", "RIGHT JOIN - semua data kanan + yang cocok", "FULL JOIN - semua data kedua tabel"] },
        { type: "table", columns: ["Tipe JOIN", "Hasil"], rows: [["INNER JOIN", "Hanya baris yang cocok"], ["LEFT JOIN", "Semua baris tabel kiri"], ["RIGHT JOIN", "Semua baris tabel kanan"], ["FULL JOIN", "Semua baris kedua tabel"]] },
        { type: "code", caption: "LEFT JOIN dengan 3 tabel:", code: "SELECT u.name, o.product, p.price\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nLEFT JOIN products p ON o.product_id = p.id;" }
      ]},
      { lessonId: "l5", title: "Aggregation", sections: [
        { type: "code", caption: "Fungsi agregat:", code: "SELECT COUNT(*) FROM users;\nSELECT AVG(age) FROM users;\nSELECT MAX(salary) FROM employees;" },
        { type: "text", content: "Fungsi agregat digunakan untuk meringkas data: menghitung, merata-rata, atau mencari nilai maksimum/minimum. Biasanya dipasangkan dengan GROUP BY." },
        { type: "bullet", items: ["COUNT() - jumlah baris", "SUM() - total nilai", "AVG() - rata-rata", "MAX() - nilai terbesar", "MIN() - nilai terkecil"] },
        { type: "code", caption: "GROUP BY:", code: "SELECT city, COUNT(*) as total\nFROM users\nGROUP BY city\nHAVING total > 5\nORDER BY total DESC;" },
        { type: "table", columns: ["Klausa", "Fungsi"], rows: [["GROUP BY", "Mengelompokkan baris"], ["HAVING", "Filter hasil agregasi (mirip WHERE)"], ["ORDER BY", "Mengurutkan hasil"]] }
      ]},
      { lessonId: "l6", title: "Subquery", sections: [
        { type: "code", caption: "Subquery di WHERE:", code: "SELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary) FROM employees\n);" },
        { type: "text", content: "Subquery adalah query di dalam query. Bisa digunakan di WHERE, FROM, atau SELECT. Subquery dieksekusi terlebih dahulu, hasilnya dipakai query utama." },
        { type: "bullet", items: ["Subquery di WHERE - filter dengan hasil query lain", "Subquery di FROM - jadikan sebagai tabel sementara", "Subquery di SELECT - hitung nilai per baris", "EXISTS - cek apakah subquery mengembalikan data"] },
        { type: "code", caption: "Subquery di FROM:", code: "SELECT dept, rata_rata\nFROM (\n  SELECT department_id as dept,\n         AVG(salary) as rata_rata\n  FROM employees\n  GROUP BY department_id\n) AS dept_sal\nWHERE rata_rata > 5000;" },
        { type: "table", columns: ["Keyword", "Fungsi"], rows: [["EXISTS", "True jika subquery punya hasil"], ["IN", "Cek apakah nilai dalam daftar"], ["ANY", "Bandingkan dengan salah satu nilai"], ["ALL", "Bandingkan dengan semua nilai"]] }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Database?" }, questions: [
        { id: "q1", type: "mcq", prompt: "SQL adalah singkatan dari...", content: { options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q501", type: "mcq", prompt: "Database NoSQL menyimpan data dalam format...", content: { options: ["Tabel", "Dokumen/key-value", "Spreadsheet", "File teks"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q502", type: "fill_blank", prompt: "Prinsip database: A (Atomicity), C (Consistency), I (Isolation), D (____)", blanks: [{ id: "b1", answer: "Durability" }], xpReward: 10 },
      ]},
      l2: { lesson: { title: "SELECT Query" }, questions: [
        { id: "q2", type: "fill_blank", prompt: "Ambil semua data dari tabel users:", content: { starterCode: "SELECT ____ FROM users;", blanks: [{ id: "b1", answer: "*" }] }, xpReward: 10 },
        { id: "q503", type: "mcq", prompt: "Perintah untuk menambah data?", content: { options: ["SELECT", "INSERT", "UPDATE", "DELETE"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q504", type: "fill_blank", prompt: "Ambil kolom name dan email:", content: { starterCode: "SELECT name, ____ FROM users;", blanks: [{ id: "b1", answer: "email" }] }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "Filter & Sort" }, questions: [
        { id: "q505", type: "mcq", prompt: "Operator LIKE menggunakan wildcard...", content: { options: ["*", "%", "?", "#"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q506", type: "fill_blank", prompt: "Filter usia > 18:", content: { starterCode: "SELECT * FROM users ____ age > 18;", blanks: [{ id: "b1", answer: "WHERE" }] }, xpReward: 10 },
        { id: "q507", type: "mcq", prompt: "Urutkan dari Z-A menggunakan...", content: { options: ["ORDER BY name ASC", "ORDER BY name DESC", "SORT BY name", "ORDER name"], correctAnswer: 1 }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "JOIN Antar Tabel" }, questions: [
        { id: "q508", type: "mcq", prompt: "JOIN yang hanya ambil data cocok di kedua tabel?", content: { options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"], correctAnswer: 2 }, xpReward: 10 },
        { id: "q509", type: "fill_blank", prompt: "Gabung tabel dengan JOIN:", content: { starterCode: "SELECT * FROM users ____ JOIN orders", blanks: [{ id: "b1", answer: "INNER" }] }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "Aggregation" }, questions: [
        { id: "q510", type: "mcq", prompt: "Fungsi untuk menghitung jumlah baris?", content: { options: ["SUM()", "COUNT()", "AVG()", "TOTAL()"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q511", type: "fill_blank", prompt: "Group data dengan:", content: { starterCode: "SELECT city, COUNT(*) FROM users ____ BY city;", blanks: [{ id: "b1", answer: "GROUP" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "Subquery" }, questions: [
        { id: "q512", type: "mcq", prompt: "Subquery adalah...", content: { options: ["Query di dalam query", "Query cepat", "Query tanpa tabel", "Query kosong"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q513", type: "fill_blank", prompt: "Cek keberadaan data dengan:", content: { starterCode: "WHERE ____ (SELECT * FROM orders)", blanks: [{ id: "b1", answer: "EXISTS" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q514", type: "fill_blank", prompt: "Hitung total user per kota:", content: { starterCode: "SELECT city, ____(*) FROM users GROUP BY city;", blanks: [{ id: "b1", answer: "COUNT" }] }, xpReward: 20 },
      ]},
    },
  },

  git: {
    name: "Git & Version Control",
    desc: "Dasar-dasar Git dan version control",
    nodes: [
      { id: "l1", title: "Apa itu Git?", order: 1, type: "lesson" },
      { id: "l2", title: "Repository & Commit", order: 2, type: "lesson" },
      { id: "l3", title: "Branch & Merge", order: 3, type: "lesson" },
      { id: "l4", title: "Remote & GitHub", order: 4, type: "lesson" },
      { id: "l5", title: "Pull Request", order: 5, type: "lesson" },
      { id: "l6", title: "Git Advanced", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Git?", sections: [
        { type: "text", content: "Git adalah version control system yang melacak perubahan file. Memungkinkan kolaborasi tim dan rollback ke versi sebelumnya." },
        { type: "bullet", items: ["Distributed version control", "Menyimpan history perubahan", "Memudahkan kolaborasi"] },
        { type: "text", content: "Berbeda dengan version control terpusat (seperti SVN), setiap developer memiliki salinan lengkap repository di lokal, sehingga bisa bekerja offline." },
        { type: "table", columns: ["Aspek", "Git (Distributed)", "SVN (Centralized)"], rows: [["Repository", "Setiap lokal punya full copy", "Pusat di server"], ["Offline", "Bisa commit offline", "Butuh koneksi server"], ["Branching", "Murah dan cepat", "Mahal dan lambat"]] },
        { type: "code", caption: "Cek versi Git:", code: "git --version\ngit config --global user.name \"Nama Anda\"\ngit config --global user.email \"email@example.com\"" }
      ]},
      { lessonId: "l2", title: "Repository & Commit", sections: [
        { type: "code", caption: "Inisialisasi git:", code: "git init\ngit add .\ngit commit -m \"pesan commit\"" },
        { type: "text", content: "Konsep tiga area di Git: Working Directory (file aktual), Staging Area (file yang siap di-commit), dan Repository (history commit tersimpan)." },
        { type: "bullet", items: ["git add - menambahkan file ke staging", "git commit - menyimpan snapshot staging", "Pesan commit harus deskriptif", "Commit sering, jangan menumpuk banyak perubahan"] },
        { type: "table", columns: ["Status", "Arti"], rows: [["Untracked", "File baru belum dilacak"], ["Modified", "File sudah diubah"], ["Staged", "File siap di-commit"], ["Unmodified", "Tidak ada perubahan"]] },
        { type: "code", caption: "Melihat history:", code: "git log --oneline --graph -10\ngit diff\ngit status" }
      ]},
      { lessonId: "l3", title: "Branch & Merge", sections: [
        { type: "code", caption: "Membuat branch:", code: "git branch fitur-baru\ngit checkout fitur-baru\ngit merge fitur-baru" },
        { type: "text", content: "Branch adalah cabang pengembangan yang terisolasi. Branch utama biasanya bernama main/master. Fitur dikembangkan di branch terpisah lalu di-merge kembali." },
        { type: "bullet", items: ["main/master - branch utama", "feature/* - untuk fitur baru", "bugfix/* - untuk perbaikan bug", "hotfix/* - untuk perbaikan darurat"] },
        { type: "table", columns: ["Perintah", "Fungsi"], rows: [["git merge", "Menggabungkan branch"], ["git rebase", "Menyusun ulang history"], ["git cherry-pick", "Ambil commit spesifik"]] },
        { type: "code", caption: "Mengatasi merge conflict:", code: "<<<<<<< HEAD\nconsole.log(\"versi saya\");\n=======\nconsole.log(\"versi lain\");\n>>>>>>> branch-lain\n// Hapus marker dan pilih versi yang benar" }
      ]},
      { lessonId: "l4", title: "Remote & GitHub", sections: [
        { type: "code", caption: "Menambahkan remote:", code: "git remote add origin https://github.com/user/repo.git\ngit push -u origin main" },
        { type: "text", content: "Remote repository adalah versi repositori yang dihosting di server (seperti GitHub, GitLab, Bitbucket). Git bisa push/pull data ke remote." },
        { type: "bullet", items: ["git push - mengirim commit ke remote", "git pull - mengambil commit dari remote", "git clone - menduplikat repo remote", "git fetch - cek perubahan remote tanpa merge"] },
        { type: "table", columns: ["Perintah", "Fungsi"], rows: [["git clone", "Download repo dari remote"], ["git push", "Upload commit ke remote"], ["git pull", "Download + merge dari remote"], ["git fetch", "Cek perubahan (tanpa merge)"]] },
        { type: "code", caption: "Workflow dengan remote:", code: "# Clone repo\ngit clone https://github.com/user/project.git\n\n# Buat branch fitur\ngit checkout -b fitur-baru\n\n# Kerja, commit, lalu push\ngit add .\ngit commit -m \"Selesaikan fitur\"\ngit push origin fitur-baru" }
      ]},
      { lessonId: "l5", title: "Pull Request", sections: [
        { type: "text", content: "Pull Request (PR) adalah mekanisme untuk menggabungkan perubahan dari satu branch ke branch lain, biasanya disertai review kode oleh anggota tim." },
        { type: "code", caption: "Workflow PR:", code: "# 1. Buat branch fitur\ngit checkout -b fitur-login\n\n# 2. Commit perubahan\ngit add .\ngit commit -m \"Tambah fitur login\"\n\n# 3. Push ke remote\ngit push origin fitur-login\n\n# 4. Buat PR di GitHub\n# 5. Tim review dan merge" },
        { type: "bullet", items: ["Fork & clone repo", "Buat branch baru untuk fitur", "Commit dan push perubahan", "Buat Pull Request di GitHub", "Review kode oleh tim", "Merge ke branch utama"] },
        { type: "table", columns: ["Tipe Merge", "Deskripsi"], rows: [["Merge commit", "Menggabungkan dengan commit baru"], ["Squash merge", "Gabung semua commit jadi satu"], ["Rebase merge", "Linear history tanpa merge commit"]] },
        { type: "code", caption: "Menyetujui PR:", code: "# Cek PR lokal\ngit checkout main\ngit pull origin main\n\n# Ambil branch PR\ngit fetch origin pull/ID/head:nama-branch\n\n# Test lalu merge\ngit checkout main\ngit merge nama-branch" }
      ]},
      { lessonId: "l6", title: "Git Advanced", sections: [
        { type: "code", caption: "Git rebase:", code: "git checkout fitur\ngit rebase main\n# Susun ulang commit fitur di atas main terbaru" },
        { type: "text", content: "Rebase memindahkan atau menyusun ulang rangkaian commit ke base yang baru. Hasilnya history lebih linear dan bersih dibanding merge." },
        { type: "bullet", items: ["git stash - simpan perubahan sementara", "git revert - batalkan commit dengan commit baru", "git reset - hapus commit (hati-hati!)", "git tag - beri label pada commit penting"] },
        { type: "code", caption: "Git stash:", code: "# Simpan perubahan sementara\ngit stash save \"WIP: fitur X\"\n\n# Kerjakan hal lain\ngit checkout main\ngit pull origin main\n\n# Kembali ke pekerjaan sebelumnya\ngit checkout fitur\ngit stash pop" },
        { type: "table", columns: ["Perintah", "Efek"], rows: [["git revert HEAD", "Buat commit baru yang membatalkan HEAD"], ["git reset --soft HEAD~1", "Hapus commit, file tetap staged"], ["git reset --hard HEAD~1", "Hapus commit dan perubahan file"], ["git tag v1.0", "Tandai commit sebagai versi 1.0"]] }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Git?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Apa fungsi utama Git?", content: { options: ["Desain web", "Version control", "Database", "Cloud hosting"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q601", type: "mcq", prompt: "Git termasuk version control...", content: { options: ["Terpusat", "Distributed", "Lokal", "Cloud"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q602", type: "fill_blank", prompt: "Cek versi Git:", content: { starterCode: "git ____ --version", blanks: [{ id: "b1", answer: " " }] }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "Repository & Commit" }, questions: [
        { id: "q2", type: "fill_blank", prompt: "Perintah untuk menyimpan perubahan:", content: { starterCode: "git ____ -m \"pesan\"", blanks: [{ id: "b1", answer: "commit" }] }, xpReward: 10 },
        { id: "q603", type: "mcq", prompt: "Area untuk file yang siap di-commit?", content: { options: ["Working Directory", "Staging Area", "Repository", "Remote"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q604", type: "fill_blank", prompt: "Cek status file:", content: { starterCode: "git ____", blanks: [{ id: "b1", answer: "status" }] }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "Branch & Merge" }, questions: [
        { id: "q605", type: "mcq", prompt: "Branch utama di GitHub biasanya bernama...", content: { options: ["master/main", "primary", "root", "trunk"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q606", type: "fill_blank", prompt: "Pindah ke branch lain:", content: { starterCode: "git ____ fitur-baru", blanks: [{ id: "b1", answer: "checkout" }] }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "Remote & GitHub" }, questions: [
        { id: "q607", type: "mcq", prompt: "Perintah untuk upload commit ke remote?", content: { options: ["git pull", "git push", "git fetch", "git clone"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q608", type: "fill_blank", prompt: "Download repo dari GitHub:", content: { starterCode: "git ____ https://github.com/user/repo.git", blanks: [{ id: "b1", answer: "clone" }] }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "Pull Request" }, questions: [
        { id: "q609", type: "mcq", prompt: "PR adalah singkatan dari...", content: { options: ["Push Request", "Pull Request", "Process Request", "Private Request"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q610", type: "fill_blank", prompt: "Gabung branch dengan review:", content: { starterCode: "Buat ____ Request di GitHub", blanks: [{ id: "b1", answer: "Pull" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "Git Advanced" }, questions: [
        { id: "q611", type: "mcq", prompt: "Perintah untuk simpan perubahan sementara?", content: { options: ["git save", "git stash", "git store", "git hold"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q612", type: "fill_blank", prompt: "Batalkan commit dengan commit baru:", content: { starterCode: "git ____ HEAD", blanks: [{ id: "b1", answer: "revert" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q613", type: "fill_blank", prompt: "Buat branch baru dan pindah:", content: { starterCode: "git checkout -____ fitur-baru", blanks: [{ id: "b1", answer: "b" }] }, xpReward: 20 },
      ]},
    },
  },

  ds: {
    name: "Struktur Data",
    desc: "Mempelajari struktur data fundamental",
    nodes: [
      { id: "l1", title: "Apa itu Struktur Data?", order: 1, type: "lesson" },
      { id: "l2", title: "Array & List", order: 2, type: "lesson" },
      { id: "l3", title: "Stack & Queue", order: 3, type: "lesson" },
      { id: "l4", title: "Linked List", order: 4, type: "lesson" },
      { id: "l5", title: "Tree", order: 5, type: "lesson" },
      { id: "l6", title: "Hash Table", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Struktur Data?", sections: [
        { type: "text", content: "Struktur data adalah cara menyimpan dan mengorganisir data agar dapat digunakan secara efisien. Contoh: array, stack, queue, tree." },
        { type: "bullet", items: ["Array - kumpulan elemen berindeks", "Linked List - elemen terhubung pointer", "Stack - LIFO (Last In First Out)", "Queue - FIFO (First In First Out)", "Tree - struktur hierarki"] },
        { type: "table", columns: ["Struktur Data", "Akses", "Search", "Insert", "Delete"], rows: [["Array", "O(1)", "O(n)", "O(n)", "O(n)"], ["Stack", "O(n)", "O(n)", "O(1)", "O(1)"], ["Queue", "O(n)", "O(n)", "O(1)", "O(1)"], ["Linked List", "O(n)", "O(n)", "O(1)", "O(1)"]] },
        { type: "code", caption: "Perbandingan list dan tuple:", code: "# List - mutable\nbuah = [\"apel\", \"pisang\"]\nbuah.append(\"mangga\")  # bisa diubah\nbuah[0] = \"jeruk\"\n\n# Tuple - immutable\nwarna = (\"merah\", \"hijau\")\n# warna[0] = \"biru\"  # Error!" },
        { type: "text", content: "Kompleksitas waktu (Big O) mengukur efisiensi algoritma. O(1) adalah konstan (tercepat), O(n) linear, O(n\u00b2) kuadratik (lambat). Pilih struktur data yang tepat untuk kebutuhan." }
      ]},
      { lessonId: "l2", title: "Array & List", sections: [
        { type: "code", caption: "Array dalam Python:", code: "arr = [1, 2, 3, 4, 5]\nprint(arr[0])  # 1\narr.append(6)" },
        { type: "text", content: "Array/list menyimpan elemen dalam urutan linear. Setiap elemen memiliki indeks mulai dari 0. Python list bisa menampung berbagai tipe data." },
        { type: "bullet", items: ["arr[i] - akses elemen di indeks i", "arr.append(x) - tambah di akhir", "arr.insert(i, x) - sisip di indeks i", "arr.remove(x) - hapus elemen x", "arr.pop() - ambil dan hapus elemen akhir"] },
        { type: "table", columns: ["Operasi", "Kompleksitas"], rows: [["Akses indeks", "O(1)"], ["Search", "O(n)"], ["Append", "O(1)"], ["Insert/Delete tengah", "O(n)"]] },
        { type: "code", caption: "List slicing:", code: "arr = [0, 1, 2, 3, 4, 5]\nprint(arr[1:4])    # [1, 2, 3]\nprint(arr[:3])     # [0, 1, 2]\nprint(arr[::2])    # [0, 2, 4]\nprint(arr[::-1])   # [5, 4, 3, 2, 1, 0]" }
      ]},
      { lessonId: "l3", title: "Stack & Queue", sections: [
        { type: "text", content: "Stack: LIFO (Last In First Out). Queue: FIFO (First In First Out)." },
        { type: "code", caption: "Simulasi stack:", code: "stack = []\nstack.append(1)  # push\nstack.pop()      # pop" },
        { type: "bullet", items: ["Stack: undo/redo editor, function call stack", "Queue: antrian printer, breadth-first search", "Deque: antrian dua arah (collections.deque)"] },
        { type: "table", columns: ["Aspek", "Stack", "Queue"], rows: [["Prinsip", "LIFO", "FIFO"], ["Push", "append()", "append()"], ["Pop", "pop()", "pop(0) atau popleft()"], ["Penggunaan", "Undo, parsing", "Antrian, BFS"]] },
        { type: "code", caption: "Implementasi queue dengan deque:", code: "from collections import deque\n\nqueue = deque()\nqueue.append(\"Antrian 1\")   # enqueue\nqueue.append(\"Antrian 2\")\nqueue.append(\"Antrian 3\")\nprint(queue.popleft())    # dequeue -> Antrian 1\nprint(queue.popleft())    # Antrian 2" }
      ]},
      { lessonId: "l4", title: "Linked List", sections: [
        { type: "text", content: "Linked List adalah struktur data linear di mana setiap elemen (node) terhubung ke node berikutnya melalui pointer. Tidak seperti array, elemen tidak disimpan di memori berurutan." },
        { type: "bullet", items: ["Node berisi data + pointer ke node berikutnya", "Singly Linked List: pointer ke next saja", "Doubly Linked List: pointer ke next dan prev"] },
        { type: "table", columns: ["Aspek", "Array", "Linked List"], rows: [["Memori", "Statis/kontigu", "Dinamis/tersebar"], ["Akses", "O(1) indeks", "O(n) traversal"], ["Insert/Delete awal", "O(n)", "O(1)"], ["Cache locality", "Baik", "Buruk"]] },
        { type: "code", caption: "Simulasi linked list:", code: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, data):\n        if not self.head:\n            self.head = Node(data)\n            return\n        cur = self.head\n        while cur.next:\n            cur = cur.next\n        cur.next = Node(data)" },
        { type: "bullet", items: ["Single - satu arah", "Double - dua arah (next & prev)", "Circular - tail.next ke head"] }
      ]},
      { lessonId: "l5", title: "Tree", sections: [
        { type: "text", content: "Tree adalah struktur data hierarki dengan satu root dan cabang yang bercabang ke child nodes. Binary Tree paling umum: setiap node maksimal 2 child (kiri & kanan)." },
        { type: "code", caption: "Binary Tree sederhana:", code: "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\n# Membuat tree\nroot = Node(10)\nroot.left = Node(5)\nroot.right = Node(15)\nroot.left.left = Node(3)" },
        { type: "bullet", items: ["Root: node paling atas", "Leaf: node tanpa child", "Binary Search Tree: kiri < root < kanan", "Height: jumlah level dari root ke leaf"] },
        { type: "table", columns: ["Traversal", "Urutan", "Hasil"], rows: [["In-order", "Kiri-Root-Kanan", "3, 5, 10, 15"], ["Pre-order", "Root-Kiri-Kanan", "10, 5, 3, 15"], ["Post-order", "Kiri-Kanan-Root", "3, 5, 15, 10"]] },
        { type: "code", caption: "In-order traversal:", code: "def inorder(node):\n    if node:\n        inorder(node.left)\n        print(node.val)\n        inorder(node.right)\n\ninorder(root)  # 3 5 10 15" }
      ]},
      { lessonId: "l6", title: "Hash Table", sections: [
        { type: "text", content: "Hash Table (atau HashMap/Dictionary) menyimpan data dalam format key-value. Fungsi hash mengubah key menjadi indeks array untuk akses O(1) rata-rata." },
        { type: "code", caption: "Dictionary Python:", code: "user = {\n    \"nama\": \"Budi\",\n    \"umur\": 17,\n    \"hobi\": [\"coding\", \"game\"]\n}\nprint(user[\"nama\"])  # Budi\nuser[\"kota\"] = \"Jakarta\"" },
        { type: "bullet", items: ["Key harus immutable (string, number, tuple)", "Value bisa tipe apa saja", "Akses rata-rata O(1)", "Collision terjadi jika 2 key punya hash sama"] },
        { type: "table", columns: ["Aspek", "Array", "Hash Table"], rows: [["Indeks", "Integer 0..n-1", "Key (string/number)"], ["Akses", "O(1)", "O(1) rata-rata"], ["Search by value", "O(n)", "O(n)"], ["Collision", "Tidak ada", "Harus ditangani"]] },
        { type: "code", caption: "Mengatasi collision (chaining):", code: "# Chaining: setiap slot array berisi linked list\n# Python dict sudah menangani ini internal\n\nhash_table = [[] for _ in range(10)]\n\nindex = hash(\"nama\") % 10\nhash_table[index].append((\"nama\", \"Budi\"))\n\n# Saat akses, cari di list tersebut\nfor k, v in hash_table[index]:\n    if k == \"nama\":\n        print(v)  # Budi" }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Struktur Data?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Struktur data adalah...", content: { options: ["Bahasa pemrograman", "Cara menyimpan data", "Software", "Framework"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q701", type: "mcq", prompt: "Struktur data dengan prinsip LIFO?", content: { options: ["Queue", "Stack", "Tree", "Array"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q702", type: "fill_blank", prompt: "Big O untuk akses indeks array:", content: { starterCode: "O(____)", blanks: [{ id: "b1", answer: "1" }] }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "Array & List" }, questions: [
        { id: "q2", type: "fill_blank", prompt: "Akses elemen pertama array:", content: { starterCode: "arr = [10, 20, 30]\nprint(arr[____])", blanks: [{ id: "b1", answer: "0" }] }, xpReward: 10 },
        { id: "q703", type: "mcq", prompt: "Method untuk tambah elemen di akhir list?", content: { options: ["push()", "append()", "add()", "insert()"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q704", type: "predict_output", prompt: "Output arr[1:3]?", content: { code: "arr = [0, 1, 2, 3, 4]\nprint(arr[1:3])", options: ["[1, 2]", "[1, 2, 3]", "[0, 1, 2]", "[2, 3]"], correctAnswer: 0 }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "Stack & Queue" }, questions: [
        { id: "q705", type: "mcq", prompt: "Queue bekerja dengan prinsip...", content: { options: ["LIFO", "FIFO", "LILO", "FILO"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q706", type: "fill_blank", prompt: "Menambah elemen ke stack:", content: { starterCode: "stack.____(1)", blanks: [{ id: "b1", answer: "append" }] }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "Linked List" }, questions: [
        { id: "q707", type: "mcq", prompt: "Linked List menyimpan data secara...", content: { options: ["Berurutan di memori", "Tersebar dengan pointer", "Hierarki", "Tabel"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q708", type: "fill_blank", prompt: "Node pertama linked list:", content: { starterCode: "self.____ = None", blanks: [{ id: "b1", answer: "head" }] }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "Tree" }, questions: [
        { id: "q709", type: "mcq", prompt: "Node paling atas di tree?", content: { options: ["Leaf", "Root", "Child", "Branch"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q710", type: "fill_blank", prompt: "In-order traversal:", content: { starterCode: "Kiri - ____ - Kanan", blanks: [{ id: "b1", answer: "Root" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "Hash Table" }, questions: [
        { id: "q711", type: "mcq", prompt: "Kompleksitas akses hash table rata-rata?", content: { options: ["O(1)", "O(n)", "O(log n)", "O(n\u00b2)"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q712", type: "fill_blank", prompt: "Tipe data Python untuk hash table:", content: { starterCode: "user = {}  # atau ____()", blanks: [{ id: "b1", answer: "dict" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q713", type: "fill_blank", prompt: "Hitung panjang list:", content: { starterCode: "arr = [1, 2, 3, 4, 5]\nprint(____(arr))", blanks: [{ id: "b1", answer: "len" }] }, xpReward: 20 },
      ]},
    },
  },

  mobile: {
    name: "Mobile Dev (Flutter/Dart)",
    desc: "Dasar-dasar pengembangan mobile dengan Flutter",
    nodes: [
      { id: "l1", title: "Apa itu Flutter?", order: 1, type: "lesson" },
      { id: "l2", title: "Dart Dasar", order: 2, type: "lesson" },
      { id: "l3", title: "Widget Flutter", order: 3, type: "lesson" },
      { id: "l4", title: "Layout & Navigasi", order: 4, type: "lesson" },
      { id: "l5", title: "State Management", order: 5, type: "lesson" },
      { id: "l6", title: "API & Data", order: 6, type: "lesson" },
      { id: "l7", title: "Bonus Challenge", order: 7, type: "chest" },
      { id: "l8", title: "Unit 1 Selesai!", order: 8, type: "milestone" },
    ],
    references: [
      { lessonId: "l1", title: "Apa itu Flutter?", sections: [
        { type: "text", content: "Flutter adalah framework UI dari Google untuk membuat aplikasi mobile, web, dan desktop dari satu kode basis menggunakan bahasa Dart." },
        { type: "bullet", items: ["Hot Reload untuk pengembangan cepat", "Widget-based UI", "Performa native dengan engine Skia", "Dukungan multi-platform (iOS, Android, Web, Desktop)"] },
        { type: "table", columns: ["Aspek", "Flutter", "React Native"], rows: [["Bahasa", "Dart", "JavaScript"], ["Engine", "Skia (C++)", "JavaScript Bridge"], ["Performa", "Mendekati native", "Tergantung bridge"], ["UI", "Widget sendiri", "Native components"]] },
        { type: "code", caption: "Struktur proyek Flutter:", code: "my_app/\n  lib/\n    main.dart      # Entry point\n    pages/         # Halaman aplikasi\n    widgets/       # Custom widgets\n  pubspec.yaml     # Konfigurasi & dependencies" },
        { type: "text", content: "Hot Reload adalah fitur andalan Flutter. Perubahan kode langsung terlihat dalam hitungan detik tanpa kehilangan state aplikasi, mempercepat proses development." }
      ]},
      { lessonId: "l2", title: "Dart Dasar", sections: [
        { type: "code", caption: "Program Dart:", code: 'void main() {\n  print("Hello, Flutter!");\n}' },
        { type: "text", content: "Dart adalah bahasa modern dengan tipe data yang aman (type-safe). Mendukung OOP, functional programming, dan async programming." },
        { type: "bullet", items: ["int, double, String, bool - tipe dasar", "var / dynamic - type inference", "List, Map, Set - koleksi data", "null safety - aman dari null pointer"] },
        { type: "table", columns: ["Bahasa", "Dart (Flutter)", "JavaScript", "Python"], rows: [["Tipe", "Static+inferred", "Dynamic", "Dynamic"], ["OOP", "Class-based", "Prototype-based", "Class-based"], ["Async", "async/await", "Promises", "async/await"]] },
        { type: "code", caption: "Variabel dan fungsi di Dart:", code: "void main() {\n  String nama = 'Budi';\n  int umur = 17;\n  var tinggi = 1.75;  // inferred as double\n\n  print(sapa(nama, umur));\n}\n\nString sapa(String nama, int umur) {\n  return 'Halo $nama, umur $umur';\n}" }
      ]},
      { lessonId: "l3", title: "Widget Flutter", sections: [
        { type: "code", caption: "Contoh widget:", code: "Scaffold(\n  appBar: AppBar(title: Text('Halo')),\n  body: Center(child: Text('Dunia'))\n)" },
        { type: "text", content: "Semua di Flutter adalah widget. Ada dua jenis: StatelessWidget (tidak berubah) dan StatefulWidget (bisa berubah dengan state). Widget membentuk hierarki/tree." },
        { type: "bullet", items: ["Container - box dengan padding/margin/warna", "Row/Column - layout horizontal/vertikal", "Stack - menumpuk widget", "ListView - daftar scrollable", "Text, Image, Icon - widget dasar"] },
        { type: "table", columns: ["Kategori", "Contoh Widget"], rows: [["Layout", "Row, Column, Stack, Container"], ["Navigation", "AppBar, BottomNavigationBar, TabBar"], ["Input", "TextField, Checkbox, Switch, Slider"], ["Display", "Text, Image, Icon, Card"]] },
        { type: "code", caption: "Row dan Column:", code: "Column(\n  mainAxisAlignment: MainAxisAlignment.center,\n  children: [\n    Icon(Icons.star, size: 48, color: Colors.amber),\n    SizedBox(height: 16),\n    Text('Flutter Widget', style: TextStyle(fontSize: 24)),\n    Row(\n      mainAxisAlignment: MainAxisAlignment.spaceEvenly,\n      children: [\n        ElevatedButton(onPressed: () {}, child: Text('OK')),\n        TextButton(onPressed: () {}, child: Text('Cancel')),\n      ],\n    ),\n  ],\n)" }
      ]},
      { lessonId: "l4", title: "Layout & Navigasi", sections: [
        { type: "code", caption: "Navigasi antar halaman:", code: "Navigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => SecondPage()),\n);" },
        { type: "text", content: "Flutter menggunakan Navigator untuk berpindah antar halaman. Route adalah nama/identitas halaman. MaterialPageRoute memberikan animasi transisi standar." },
        { type: "bullet", items: ["Navigator.push() - buka halaman baru", "Navigator.pop() - kembali ke halaman sebelumnya", "Named routes - daftar route di MaterialApp", "BottomNavigationBar - navigasi tab"] },
        { type: "code", caption: "Named routes:", code: "MaterialApp(\n  initialRoute: '/',\n  routes: {\n    '/': (context) => HomePage(),\n    '/profile': (context) => ProfilePage(),\n    '/settings': (context) => SettingsPage(),\n  },\n)" },
        { type: "table", columns: ["Widget Layout", "Fungsi"], rows: [["Row", "Widget horizontal"], ["Column", "Widget vertikal"], ["Stack", "Widget bertumpuk"], ["Expanded", "Mengisi ruang tersisa"], ["Flexible", "Mengisi proporsi ruang"]] }
      ]},
      { lessonId: "l5", title: "State Management", sections: [
        { type: "code", caption: "StatefulWidget:", code: "class CounterWidget extends StatefulWidget {\n  @override\n  _CounterState createState() => _CounterState();\n}\n\nclass _CounterState extends State<CounterWidget> {\n  int count = 0;\n\n  @override\n  Widget build(BuildContext context) {\n    return Column(\n      children: [\n        Text('Count: $count'),\n        ElevatedButton(\n          onPressed: () => setState(() => count++),\n          child: Text('Tambah'),\n        ),\n      ],\n    );\n  }\n}" },
        { type: "text", content: "State management mengelola data yang berubah selama aplikasi berjalan. setState() adalah cara paling dasar untuk mengupdate UI saat state berubah." },
        { type: "bullet", items: ["setState() - state management dasar", "InheritedWidget - share state ke child tree", "Provider - dependency injection + state", "Riverpod/BLoC - state management modern"] },
        { type: "table", columns: ["Metode", "Skala", "Kompleksitas"], rows: [["setState", "Kecil", "Rendah"], ["Provider", "Menengah", "Sedang"], ["Riverpod", "Menengah-Besar", "Sedang"], ["BLoC", "Besar", "Tinggi"]] },
        { type: "code", caption: "Provider sederhana:", code: "// 1. Definisikan model\nclass Counter extends ChangeNotifier {\n  int count = 0;\n  void increment() { count++; notifyListeners(); }\n}\n\n// 2. Provide di root\nChangeNotifierProvider(\n  create: (context) => Counter(),\n  child: MyApp(),\n)\n\n// 3. Konsumsi di widget\nfinal counter = context.watch<Counter>();\nText('${counter.count}');" }
      ]},
      { lessonId: "l6", title: "API & Data", sections: [
        { type: "code", caption: "HTTP request dengan http package:", code: "import 'package:http/http.dart' as http;\n\nFuture<void> fetchData() async {\n  final response = await http.get(\n    Uri.parse('https://api.example.com/users'),\n  );\n  if (response.statusCode == 200) {\n    print(response.body);\n  }\n}" },
        { type: "text", content: "Aplikasi Flutter sering perlu mengambil data dari API. Package http atau dio digunakan untuk request HTTP. Data JSON di-decode menggunakan dart:convert." },
        { type: "bullet", items: ["http package - request HTTP sederhana", "dio - request HTTP dengan interceptor", "jsonDecode() - parse JSON string", "FutureBuilder - widget async builder"] },
        { type: "code", caption: "FutureBuilder:", code: "FutureBuilder<String>(\n  future: fetchData(),\n  builder: (context, snapshot) {\n    if (snapshot.connectionState == ConnectionState.waiting) {\n      return CircularProgressIndicator();\n    }\n    if (snapshot.hasError) {\n      return Text('Error: ${snapshot.error}');\n    }\n    return Text('Data: ${snapshot.data}');\n  },\n)" },
        { type: "table", columns: ["Package", "Fungsi"], rows: [["http", "Request HTTP dasar"], ["dio", "HTTP dengan interceptor"], ["shared_preferences", "Local storage"], ["sqflite", "Database lokal SQLite"]] }
      ]},
    ],
    questions: {
      l1: { lesson: { title: "Apa itu Flutter?" }, questions: [
        { id: "q1", type: "mcq", prompt: "Flutter adalah framework dari...", content: { options: ["Google", "Facebook", "Microsoft", "Apple"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q2", type: "mcq", prompt: "Bahasa yang digunakan Flutter?", content: { options: ["Java", "Dart", "Kotlin", "Swift"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q801", type: "mcq", prompt: "Fitur pengembangan cepat Flutter?", content: { options: ["Hot Reload", "Live Preview", "Instant Build", "Fast Render"], correctAnswer: 0 }, xpReward: 10 },
      ]},
      l2: { lesson: { title: "Dart Dasar" }, questions: [
        { id: "q802", type: "mcq", prompt: "Tipe data static di Dart?", content: { options: ["int, double, String", "var, dynamic", "object", "auto"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q803", type: "fill_blank", prompt: "Entry point program Dart:", content: { starterCode: "____ main() {", blanks: [{ id: "b1", answer: "void" }] }, xpReward: 10 },
      ]},
      l3: { lesson: { title: "Widget Flutter" }, questions: [
        { id: "q804", type: "mcq", prompt: "Widget yang tidak pernah berubah?", content: { options: ["StatefulWidget", "StatelessWidget", "InheritedWidget", "StreamBuilder"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q805", type: "fill_blank", prompt: "Aplikasi Flutter diawali dari fungsi:", content: { starterCode: "void main() => runApp(____());", blanks: [{ id: "b1", answer: "MyApp" }] }, xpReward: 10 },
      ]},
      l4: { lesson: { title: "Layout & Navigasi" }, questions: [
        { id: "q806", type: "mcq", prompt: "Navigasi untuk buka halaman baru?", content: { options: ["Navigator.push()", "Navigator.pop()", "Navigator.next()", "Navigator.open()"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q807", type: "fill_blank", prompt: "Widget untuk layout horizontal:", content: { starterCode: "____(children: [Text('A'), Text('B')])", blanks: [{ id: "b1", answer: "Row" }] }, xpReward: 10 },
      ]},
      l5: { lesson: { title: "State Management" }, questions: [
        { id: "q808", type: "mcq", prompt: "Method untuk update state di Flutter?", content: { options: ["setState()", "updateState()", "refreshState()", "changeState()"], correctAnswer: 0 }, xpReward: 10 },
        { id: "q809", type: "fill_blank", prompt: "Package state management modern:", content: { starterCode: "River____ / BLoC", blanks: [{ id: "b1", answer: "pod" }] }, xpReward: 10 },
      ]},
      l6: { lesson: { title: "API & Data" }, questions: [
        { id: "q810", type: "mcq", prompt: "Widget untuk async data di Flutter?", content: { options: ["AsyncBuilder", "FutureBuilder", "StreamBuilder", "DataBuilder"], correctAnswer: 1 }, xpReward: 10 },
        { id: "q811", type: "fill_blank", prompt: "Parse JSON string:", content: { starterCode: "import 'dart:____';", blanks: [{ id: "b1", answer: "convert" }] }, xpReward: 10 },
      ]},
      l7: { lesson: { title: "Bonus Challenge" }, questions: [
        { id: "q812", type: "fill_blank", prompt: "InkWell untuk mendeteksi:", content: { starterCode: "InkWell(\n  on____: () { ... },\n  child: ...\n)", blanks: [{ id: "b1", answer: "Tap" }] }, xpReward: 20 },
      ]},
    },
  },
};

export default trackContent;
export function getTrackContent(trackId: string): TrackContent {
  return trackContent[trackId] || trackContent.python;
}
