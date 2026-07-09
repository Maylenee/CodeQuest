export const JS_QUESTIONS_FALLBACK: Record<string, { lesson: { title: string }, questions: any[] }> = {
  l1: {
    lesson: { title: "Apa itu JavaScript?" },
    questions: [
      { id: "q1", type: "mcq", prompt: "Siapakah pencipta bahasa pemrograman JavaScript?", content: { options: ["Guido van Rossum", "Brendan Eich", "James Gosling", "Dennis Ritchie"], correctAnswer: 1, hints: ["JavaScript dibuat dalam 10 hari oleh seorang engineer di Netscape"] }, xpReward: 10 },
      { id: "q2", type: "mcq", prompt: "JavaScript adalah bahasa pemrograman yang bersifat...", content: { options: ["Compiled", "Interpreted", "Markup language", "Query language"], correctAnswer: 1, hints: ["JavaScript dijalankan baris per baris oleh engine browser"] }, xpReward: 10 },
      { id: "q3", type: "predict_output", prompt: "Apa output dari kode JavaScript berikut?", content: { code: 'console.log("Hello, JavaScript!")', options: ["Hello, JavaScript!", "hello, javascript!", "Error", "Tidak ada output"], correctAnswer: 0, hints: ["console.log() akan mencetak argumen ke console"] }, xpReward: 10 },
    ]
  },
  l2: {
    lesson: { title: "Variabel & Tipe Data" },
    questions: [
      { id: "q4", type: "mcq", prompt: 'Tipe data apa yang dimiliki oleh variabel `let x = "Halo"`?', content: { options: ["number", "string", "boolean", "object"], correctAnswer: 1, hints: ["Tanda kutip menandakan bahwa nilai tersebut adalah string/teks"] }, xpReward: 10 },
      { id: "q5", type: "fill_blank", prompt: "Lengkapi kode berikut untuk membuat variabel `umur` dengan nilai 17:", content: { starterCode: "let ____ = 17;", blanks: [{ id: "b1", answer: "umur" }], hints: ["Gunakan keyword let untuk mendeklarasikan variabel"] }, xpReward: 10 },
      { id: "q6", type: "mcq", prompt: "Manakah dari berikut ini yang BUKAN termasuk tipe data primitif di JavaScript?", content: { options: ["string", "number", "char", "boolean"], correctAnswer: 2, hints: ["JavaScript tidak punya tipe data char terpisah"] }, xpReward: 10 },
    ]
  },
  l3: {
    lesson: { title: "String & Manipulasi" },
    questions: [
      { id: "q7", type: "fill_blank", prompt: "Lengkapi kode untuk menggabungkan dua string:", content: { starterCode: 'let sapa = "Halo ";\nlet nama = "Dunia";\nlet hasil = sapa ____ nama;\nconsole.log(hasil);', blanks: [{ id: "b1", answer: "+" }], hints: ["Gunakan operator + untuk menggabungkan (concatenate) string"] }, xpReward: 10 },
      { id: "q8", type: "predict_output", prompt: "Apa output dari kode berikut?", content: { code: 'let nama = "JavaScript";\nconsole.log(nama.length);', options: ["8", "9", "10", "11"], correctAnswer: 2, hints: [".length mengembalikan panjang string, 'JavaScript' memiliki 10 karakter"] }, xpReward: 10 },
    ]
  },
  l4: {
    lesson: { title: "Proyek: Program Pertamamu" },
    questions: [
      { id: "q9", type: "fill_blank", prompt: "Buat program yang mencetak nama kamu:", content: { starterCode: 'let nama = "____";\nconsole.log("Halo, " + nama);', blanks: [{ id: "b1", answer: "CodeQuest" }], hints: ["Isi dengan nama yang ingin kamu cetak"] }, xpReward: 20 },
    ]
  },
  l5: {
    lesson: { title: "If-Else & Percabangan" },
    questions: [
      { id: "q10", type: "fill_blank", prompt: "Lengkapi kode untuk mengecek apakah suatu angka genap:", content: { starterCode: "let angka = 10;\nif (angka % 2 ____ 0) {\n  console.log(\"Genap\");\n}", blanks: [{ id: "b1", answer: "===" }], hints: ["Gunakan operator strict equality ==="] }, xpReward: 10 },
      { id: "q11", type: "mcq", prompt: "Apa yang akan dicetak oleh kode berikut?\n\nlet x = 10;\nif (x > 5) {\n  console.log(\"Besar\");\n} else {\n  console.log(\"Kecil\");\n}", content: { options: ["Besar", "Kecil", "Error", "Tidak ada output"], correctAnswer: 0, hints: ["10 > 5 adalah true, jadi blok if akan dijalankan"] }, xpReward: 10 },
    ]
  },
  l6: {
    lesson: { title: "For Loop" },
    questions: [
      { id: "q12", type: "predict_output", prompt: "Apa output dari kode berikut?", content: { code: "let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(total);", options: ["3", "4", "6", "7"], correctAnswer: 2, hints: ["Loop dari 1 sampai 3, total = 1+2+3 = 6"] }, xpReward: 10 },
    ]
  },
};

export const QUESTIONS_FALLBACK: Record<string, { lesson: { title: string }, questions: any[] }> = {
  l1: {
    lesson: { title: "Apa itu Python?" },
    questions: [
      { id: "q1", type: "mcq", prompt: "Siapakah pencipta bahasa pemrograman Python?", content: { options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Brendan Eich"], correctAnswer: 0, hints: ["Nama Python terinspirasi dari acara TV Monty Python's Flying Circus"] }, xpReward: 10 },
      { id: "q2", type: "mcq", prompt: "Python adalah bahasa pemrograman yang bersifat...", content: { options: ["Compiled (dikompilasi)", "Interpreted (diterjemahkan langsung)", "Hybrid", "Markup language"], correctAnswer: 1, hints: ["Python menjalankan kode baris per baris tanpa proses kompilasi terpisah"] }, xpReward: 10 },
      { id: "q3", type: "predict_output", prompt: "Apa output dari kode Python berikut?", content: { code: 'print("Hello, Python!")', options: ["Hello, Python!", "hello, python!", "Error", "Tidak ada output"], correctAnswer: 0, hints: ["Fungsi print() akan mencetak argumen yang diberikan ke console"] }, xpReward: 10 },
      { id: "q3b", type: "spot_bug", prompt: "Baris mana yang mengandung bug pada kode berikut?", content: { code: 'print("Halo")\nprint("Dunia"\nprint("Python")', bugLines: [1], hints: ["Perhatikan tanda kurung yang tidak berpasangan"] }, xpReward: 15 },
    ]
  },
  l2: {
    lesson: { title: "Variabel & Tipe Data" },
    questions: [
      { id: "q4", type: "mcq", prompt: 'Tipe data apa yang dimiliki oleh variabel `x = "Halo"`?', content: { options: ["int", "float", "str", "bool"], correctAnswer: 2, hints: ["Tanda kutip menandakan bahwa nilai tersebut adalah string/teks"] }, xpReward: 10 },
      { id: "q5", type: "fill_blank", prompt: "Lengkapi kode berikut untuk membuat variabel `umur` dengan nilai 17:", content: { starterCode: "____ = 17", blanks: [{ id: "b1", answer: "umur" }], hints: ["Di Python, variabel dibuat dengan menuliskan nama variabel diikuti tanda ="] }, xpReward: 10 },
      { id: "q6", type: "mcq", prompt: "Manakah dari berikut ini yang BUKAN termasuk tipe data di Python?", content: { options: ["int", "float", "char", "bool"], correctAnswer: 2, hints: ["Python tidak punya tipe data char terpisah"] }, xpReward: 10 },
      { id: "q6b", type: "write_code", prompt: 'Buat variabel dengan nama `nama_lengkap` dan isi dengan nilai "CodeQuest".', content: { starterCode: "# Tulis kode di bawah ini\n", expectedOutput: 'nama_lengkap = "CodeQuest"', hints: ["Gunakan tanda = untuk assignment", "String harus diapit tanda kutip"] }, xpReward: 15 },
      { id: "q6c", type: "drag_drop", prompt: "Susunlah kode berikut agar menjadi program yang benar:", content: { blocks: ["print(hasil)", "hasil = a + b", "a = 5", "b = 3"], correctOrder: [2, 3, 1, 0], hints: ["Urutkan dari deklarasi variabel, operasi, lalu output"] }, xpReward: 15 },
    ]
  },
  l3: {
    lesson: { title: "Strings & Manipulasi" },
    questions: [
      { id: "q7", type: "fill_blank", prompt: "Lengkapi kode untuk menggabungkan dua string:", content: { starterCode: 'sapa = "Halo "\nnama = "Dunia"\nhasil = sapa ____ nama\nprint(hasil)', blanks: [{ id: "b1", answer: "+" }], hints: ["Gunakan operator + untuk menggabungkan (concatenate) string"] }, xpReward: 10 },
      { id: "q8", type: "predict_output", prompt: "Apa output dari kode berikut?", content: { code: 'nama = "Python"\nprint(len(nama))', options: ["5", "6", "7", "Error"], correctAnswer: 1, hints: ["len() mengembalikan panjang string, 'Python' memiliki 6 karakter"] }, xpReward: 10 },
      { id: "q8b", type: "refactor", prompt: "Refaktor kode berikut agar lebih efisien dengan metode string:", content: { codeBefore: 'teks = "python"\nhasil = teks.upper()\nprint(hasil)', hints: ["Kamu bisa menggabungkan method chaining"], expectedSolution: "" }, xpReward: 15 },
    ]
  },
  l4: {
    lesson: { title: "Proyek: Program Pertamamu" },
    questions: [
      { id: "q9", type: "fill_blank", prompt: "Buat program yang mencetak nama kamu:", content: { starterCode: 'nama = "____"\nprint("Halo, " + nama)', blanks: [{ id: "b1", answer: "CodeQuest" }], hints: ["Isi dengan nama yang ingin kamu cetak"] }, xpReward: 20 },
    ]
  },
  l5: {
    lesson: { title: "If-Else & Percabangan" },
    questions: [
      { id: "q10", type: "fill_blank", prompt: "Lengkapi kode untuk mengecek apakah suatu angka genap:", content: { starterCode: "angka = 10\nif angka % 2 ____ 0:\n    print(\"Genap\")", blanks: [{ id: "b1", answer: "==" }], hints: ["Gunakan operator == untuk perbandingan"] }, xpReward: 10 },
      { id: "q11", type: "mcq", prompt: "Apa yang akan dicetak oleh kode berikut?\n\nx = 10\nif x > 5:\n    print(\"Besar\")\nelse:\n    print(\"Kecil\")", content: { options: ["Besar", "Kecil", "Error", "Tidak ada output"], correctAnswer: 0, hints: ["10 > 5 adalah True, jadi blok if akan dijalankan"] }, xpReward: 10 },
    ]
  },
  l6: {
    lesson: { title: "For Loop" },
    questions: [
      { id: "q12", type: "predict_output", prompt: "Apa output dari kode berikut?", content: { code: "total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)", options: ["3", "4", "6", "7"], correctAnswer: 2, hints: ["range(1,4) menghasilkan angka 1, 2, 3. Jumlahnya adalah 6"] }, xpReward: 10 },
    ]
  },
};
