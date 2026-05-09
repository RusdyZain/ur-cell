# PRD Aplikasi Kuis Kepribadian: ur.cell / Yumi's Cells 12 Sel Dominan

**Versi:** 1.0  
**Format:** Product Requirements Document untuk eksekusi fullstack sekali prompt Codex  
**Target implementasi tercepat:** Next.js App Router + TypeScript + Tailwind CSS  
**Alternatif:** Laravel + Blade/Inertia, tetapi untuk landing + kuis ringan + hasil instan, Next.js static/serverless biasanya lebih cepat dibuat dan di-load.

---

## 1. Ringkasan Produk

`ur.cell` adalah aplikasi web kuis kepribadian ringan berbasis 7 pertanyaan pilihan ganda. Pengguna menjawab 7 soal dengan opsi A/B/C. Sistem menghitung hasil menggunakan **aturan prioritas kondisional berurutan** untuk menentukan 1 dari 12 sel dominan:

1. Sel Cinta / Love Cell
2. Sel Rasional / Rational Cell
3. Sel Emosional / Emotional Cell
4. Sel Lapar / Hungry Cell
5. Sel Kecemasan / Anxiety Cell
6. Sel Detektif / Detective Cell
7. Sel Histeria / Hysteria Cell
8. Sel Mode / Fashion Cell
9. Sel Nakal / Naughty Cell
10. Sel Etika / Etiquette Cell
11. Sel Mandi / Shower Cell
12. Sel Sumpah Serapah / Cursing Cell

Produk harus selesai sebagai MVP yang bisa langsung dideploy, mudah diganti asset/style, dan logika hasilnya tidak bercampur dengan komponen UI agar Codex atau developer bisa mengubah tampilan tanpa merusak rule engine.

---

## 2. Tujuan Produk

### 2.1 Tujuan Utama

- Membuat pengalaman kuis cepat, ringan, mobile-first, dan shareable.
- Menentukan 12 hasil kepribadian berdasarkan 7 jawaban A/B/C.
- Memisahkan **konten kuis**, **rule engine**, **asset**, dan **style/theme**.
- Memberi output hasil yang jelas: nama sel, subtitle, deskripsi, alasan aturan yang terpicu, dan CTA share/ulang.

### 2.2 Non-Goals MVP

- Tidak perlu login.
- Tidak perlu dashboard admin.
- Tidak perlu database untuk MVP awal.
- Tidak perlu integrasi payment.
- Tidak perlu menyimpan data pribadi.
- Tidak perlu AI inference; semua hasil deterministik dari rule engine.

---

## 3. Rekomendasi Teknologi

## 3.1 Rekomendasi Utama: Next.js

Gunakan:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand atau React state biasa untuk state kuis
- Static JSON/TS config untuk pertanyaan dan hasil
- Vercel deploy

Alasan:

- Kuis bersifat client-side dan deterministik, cocok untuk static rendering.
- Load cepat karena tidak membutuhkan backend berat.
- Mudah dibuat sebagai SPA-like flow.
- Mudah share URL hasil jika nanti ditambahkan query param atau slug hasil.

### 3.2 Alternatif Laravel

Laravel cocok jika nanti ingin:

- Admin panel untuk edit pertanyaan/result.
- Database statistik jawaban.
- Auth, analytics internal, atau campaign management.

Untuk MVP tercepat dan load ringan, pilih **Next.js** dulu.

---

## 4. Persona Pengguna

### 4.1 Pengguna Utama

- Pengguna mobile yang ingin mencoba kuis kepribadian singkat.
- Pengguna media sosial yang suka membagikan hasil kuis.
- Pengguna yang familiar dengan konsep karakter/cell/personality archetype.

### 4.2 Kebutuhan Pengguna

- Mulai kuis tanpa login.
- Jawab pertanyaan cepat.
- Melihat progress kuis.
- Mendapat hasil yang terasa personal dan fun.
- Bisa ulang kuis.
- Bisa share hasil.

---

## 5. User Flow

1. User membuka landing page.
2. User melihat judul, intro singkat, dan tombol **Mulai Kuis**.
3. User menjawab 7 pertanyaan satu per satu.
4. Setelah jawaban ke-7, sistem menjalankan `evaluateAnswers(answers)`.
5. User diarahkan ke halaman hasil.
6. Halaman hasil menampilkan:
   - Nama sel dominan
   - Nama Inggris
   - Deskripsi karakter
   - Breakdown singkat alasan hasil
   - Komposisi jawaban A/B/C
   - CTA: Bagikan hasil, Ulangi kuis, Kembali ke awal

---

## 6. Struktur Halaman

### 6.1 `/`

Landing page.

Konten minimum:

- Logo/text brand: `ur.cell`
- Headline: `Sel dominan apa yang mengendalikan dirimu hari ini?`
- Subheadline: `Jawab 7 situasi singkat dan temukan salah satu dari 12 sel dominanmu.`
- CTA utama: `Mulai Kuis`
- CTA sekunder opsional: `Lihat semua sel`

### 6.2 `/quiz`

Halaman pertanyaan.

Komponen:

- Progress: `Pertanyaan 1 dari 7`
- Progress bar
- Teks pertanyaan
- 3 pilihan jawaban A/B/C
- Tombol kembali untuk pertanyaan sebelumnya
- Auto-next setelah memilih jawaban, atau tombol `Lanjut`

State:

```ts
answers: Array<'A' | 'B' | 'C'>
currentQuestionIndex: number
```

Validasi:

- User tidak bisa lanjut tanpa memilih jawaban.
- Jika refresh, MVP boleh reset. Optional: simpan di `localStorage`.

### 6.3 `/result`

Halaman hasil.

Data hasil bisa dikirim melalui:

- `localStorage`, atau
- query param compact: `?a=ABCCBAB`, atau
- route dinamis: `/result/ABCCBAB`

Rekomendasi MVP: gunakan `/result?a=ABCCBAB` agar shareable.

Jika query invalid:

- tampilkan error ringan: `Jawaban tidak valid. Ulangi kuis.`
- CTA ke `/quiz`.

### 6.4 `/cells` Opsional

Daftar 12 sel dengan deskripsi ringkas. Bisa dibuat setelah MVP.

---

## 7. Konten Kuis

Simpan konten di file terpisah:

`src/content/questions.ts`

```ts
export type AnswerOption = 'A' | 'B' | 'C';

export type Question = {
  id: number;
  text: string;
  options: {
    value: AnswerOption;
    text: string;
  }[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: 'Kamu tidak sengaja membaca ramalan zodiak/shio hari ini yang mengatakan "Hari ini keberuntunganmu sangat buruk." Apa tindakanmu?',
    options: [
      { value: 'A', text: 'Menertawakannya karena tahu itu hanya takhayul, lalu lanjut fokus kerja dengan produktif.' },
      { value: 'B', text: 'Langsung panik, kepikiran sepanjang hari, dan ekstra hati-hati saat melangkah atau berbicara.' },
      { value: 'C', text: 'Merasa kesal dan langsung mengumpat dalam hati, "Ah, merusak mood pagi-pagi saja!"' },
    ],
  },
  {
    id: 2,
    text: 'Saat berjalan di tempat umum, ada orang asing yang terus-menerus melihat ke arahmu dengan tatapan aneh. Pikiran pertamamu?',
    options: [
      { value: 'A', text: 'Apakah dandananku berantakan? Atau ada noda di bajuku?' },
      { value: 'B', text: 'Mencurigai motifnya, mulai menganalisis gerak-gerik orang itu, dan menduga dia punya niat tertentu.' },
      { value: 'C', text: 'Langsung emosi bergejolak, merasa risih, dan rasanya ingin berteriak kencang, "Lihat-lihat apa?!"' },
    ],
  },
  {
    id: 3,
    text: 'Kamu baru saja pulang ke rumah setelah seharian menghadapi tekanan kerja atau sekolah yang sangat berat. Apa yang kamu lakukan pertama kali?',
    options: [
      { value: 'A', text: 'Mengunci diri di kamar mandi untuk mandi air hangat yang sangat lama demi melepaskan stres.' },
      { value: 'B', text: 'Langsung mencari makanan di dapur atau membuka aplikasi pesan antar untuk memesan makanan kesukaanmu.' },
      { value: 'C', text: 'Merebahkan diri di kasur, memutar lagu sedih, dan membiarkan diri tenggelam dalam keheningan emosional.' },
    ],
  },
  {
    id: 4,
    text: 'Seseorang yang sangat kamu sukai tiba-tiba memuji gaya pakaian atau rambutmu hari ini. Apa reaksimu?',
    options: [
      { value: 'A', text: 'Tersenyum sangat manis, berterima kasih dengan sopan, tapi di dalam hati berteriak histeris kegirangan.' },
      { value: 'B', text: 'Wajah langsung memerah, jantung berdebar kencang, dan otak langsung membayangkan skenario romantis indah bersamanya.' },
      { value: 'C', text: 'Berterima kasih, namun pikiran mulai melayang ke imajinasi liar yang mendebarkan.' },
    ],
  },
  {
    id: 5,
    text: 'Kamu melihat ada barang impianmu yang sedang diskon besar-besaran, tetapi uang di tabunganmu pas-pasan. Bagaimana caramu memutuskan?',
    options: [
      { value: 'A', text: 'Membuat daftar perbandingan kebutuhan secara logis dan memutuskan untuk tidak membelinya.' },
      { value: 'B', text: 'Langsung membelinya tanpa berpikir panjang sambil berteriak panik, "Beli sekarang, urusan makan besok dipikir nanti!"' },
      { value: 'C', text: 'Menutup aplikasinya dengan sedih, lalu mencoba bersikap sopan pada keadaan dan merelakannya.' },
    ],
  },
  {
    id: 6,
    text: 'Temanmu menceritakan rahasia kecilnya padamu, tapi kemudian kamu menyadari ada kejanggalan dalam ceritanya. Apa yang kamu lakukan?',
    options: [
      { value: 'A', text: 'Bersikap netral dan sopan dengan tetap mendengarkannya tanpa memotong pembicaraan.' },
      { value: 'B', text: 'Menghubungkan titik-titik kejanggalan tersebut dan diam-diam mencari tahu kebenaran yang sesungguhnya.' },
      { value: 'C', text: 'Pikiranmu langsung panik dan cemas jika ternyata kamu juga terlibat atau ikut disalahkan dalam masalah itu.' },
    ],
  },
  {
    id: 7,
    text: 'Kamu sedang berduaan dengan pasangan/gebetan di bioskop yang sepi. Filmnya sangat romantis dan tangan kalian tidak sengaja bersentuhan. Pikiranmu?',
    options: [
      { value: 'A', text: 'Merasa hangat di hati, memegang tangannya erat, dan berharap waktu berhenti di saat manis ini.' },
      { value: 'B', text: 'Pikiran mulai melayang ke arah adegan ciuman manis atau momen intim yang lebih mendebarkan.' },
      { value: 'C', text: 'Menganalisis situasi secara realistis: "Nanti pulangnya naik apa ya? Sempat makan malam dulu tidak?"' },
    ],
  },
];
```

---

## 8. Data Hasil 12 Sel

Simpan di:

`src/content/cells.ts`

```ts
export type CellId =
  | 'love'
  | 'rational'
  | 'emotional'
  | 'hungry'
  | 'anxiety'
  | 'detective'
  | 'hysteria'
  | 'fashion'
  | 'naughty'
  | 'etiquette'
  | 'shower'
  | 'cursing';

export type CellResult = {
  id: CellId;
  name: string;
  englishName: string;
  shortTitle: string;
  description: string;
  traits: string[];
  shareText: string;
  assetKey: string;
};

export const cells: Record<CellId, CellResult> = {
  love: {
    id: 'love',
    name: 'Sel Cinta',
    englishName: 'Love Cell',
    shortTitle: 'Romantis dan mudah terpesona',
    description: 'Kamu mengutamakan perasaan romantis, mudah terbawa suasana manis, dan sering membayangkan masa depan berdua.',
    traits: ['romantis', 'hangat', 'mudah tersentuh', 'optimis soal cinta'],
    shareText: 'Sel dominanku adalah Sel Cinta 💗',
    assetKey: 'love-cell',
  },
  rational: {
    id: 'rational',
    name: 'Sel Rasional',
    englishName: 'Rational Cell',
    shortTitle: 'Logis, tenang, dan solutif',
    description: 'Kamu berpikir jernih, mengutamakan produktivitas, dan lebih suka mengambil keputusan berdasarkan realita.',
    traits: ['logis', 'tenang', 'produktif', 'realistis'],
    shareText: 'Sel dominanku adalah Sel Rasional 🧠',
    assetKey: 'rational-cell',
  },
  emotional: {
    id: 'emotional',
    name: 'Sel Emosional',
    englishName: 'Emotional Cell',
    shortTitle: 'Sensitif dan penuh rasa',
    description: 'Kamu sangat peka terhadap suasana, mudah tersentuh, dan sering memproses dunia lewat perasaan.',
    traits: ['sensitif', 'artistik', 'perasa', 'intuitif'],
    shareText: 'Sel dominanku adalah Sel Emosional 🌧️',
    assetKey: 'emotional-cell',
  },
  hungry: {
    id: 'hungry',
    name: 'Sel Lapar',
    englishName: 'Hungry Cell',
    shortTitle: 'Makan dulu, mikir nanti',
    description: 'Saat stres atau bingung, makanan sering jadi pusat penyelamat. Kamu cepat bergerak kalau urusannya comfort food.',
    traits: ['food motivated', 'spontan', 'mudah ngidam', 'comfort seeker'],
    shareText: 'Sel dominanku adalah Sel Lapar 🍜',
    assetKey: 'hungry-cell',
  },
  anxiety: {
    id: 'anxiety',
    name: 'Sel Kecemasan',
    englishName: 'Anxiety Cell',
    shortTitle: 'Waspada dan overthinking',
    description: 'Kamu mudah menangkap risiko kecil, sering berjaga-jaga, dan kadang terlalu cepat membayangkan skenario buruk.',
    traits: ['waspada', 'overthinking', 'hati-hati', 'antisipatif'],
    shareText: 'Sel dominanku adalah Sel Kecemasan 😵‍💫',
    assetKey: 'anxiety-cell',
  },
  detective: {
    id: 'detective',
    name: 'Sel Detektif',
    englishName: 'Detective Cell',
    shortTitle: 'Peka pada kejanggalan',
    description: 'Kamu suka menghubungkan petunjuk, membaca pola, dan tidak mudah menerima cerita yang terasa janggal.',
    traits: ['analitis', 'curious', 'teliti', 'skeptis sehat'],
    shareText: 'Sel dominanku adalah Sel Detektif 🕵️',
    assetKey: 'detective-cell',
  },
  hysteria: {
    id: 'hysteria',
    name: 'Sel Histeria',
    englishName: 'Hysteria Cell',
    shortTitle: 'Panik tapi ekspresif',
    description: 'Kamu bereaksi cepat, intens, dan mudah terbawa momen yang menekan atau terlalu menggoda untuk dilewatkan.',
    traits: ['ekspresif', 'impulsif', 'dramatis', 'reaktif'],
    shareText: 'Sel dominanku adalah Sel Histeria 🚨',
    assetKey: 'hysteria-cell',
  },
  fashion: {
    id: 'fashion',
    name: 'Sel Mode',
    englishName: 'Fashion Cell',
    shortTitle: 'Estetik dan sadar penampilan',
    description: 'Kamu peka pada visual, gaya, dan kesan pertama. Detail penampilan bisa langsung memengaruhi mood-mu.',
    traits: ['estetik', 'stylish', 'detail', 'self-aware'],
    shareText: 'Sel dominanku adalah Sel Mode ✨',
    assetKey: 'fashion-cell',
  },
  naughty: {
    id: 'naughty',
    name: 'Sel Nakal',
    englishName: 'Naughty Cell',
    shortTitle: 'Imajinatif dan menggoda',
    description: 'Kamu punya sisi playful, imajinatif, dan mudah terbawa suasana mendebarkan saat momen romantis muncul.',
    traits: ['playful', 'berani', 'imajinatif', 'flirty'],
    shareText: 'Sel dominanku adalah Sel Nakal 😈',
    assetKey: 'naughty-cell',
  },
  etiquette: {
    id: 'etiquette',
    name: 'Sel Etika',
    englishName: 'Etiquette Cell',
    shortTitle: 'Sopan dan menjaga sikap',
    description: 'Kamu cenderung menahan diri, menjaga tata krama, dan memilih respons yang tidak memperkeruh keadaan.',
    traits: ['sopan', 'terkendali', 'diplomatis', 'dewasa'],
    shareText: 'Sel dominanku adalah Sel Etika 🎩',
    assetKey: 'etiquette-cell',
  },
  shower: {
    id: 'shower',
    name: 'Sel Mandi',
    englishName: 'Shower Cell',
    shortTitle: 'Healing lewat ritual bersih-bersih',
    description: 'Kamu butuh reset fisik dan mental. Mandi, merapikan diri, dan mengambil jeda bisa jadi cara terbaikmu pulih.',
    traits: ['butuh reset', 'self-care', 'tenang', 'ritualis'],
    shareText: 'Sel dominanku adalah Sel Mandi 🚿',
    assetKey: 'shower-cell',
  },
  cursing: {
    id: 'cursing',
    name: 'Sel Sumpah Serapah',
    englishName: 'Cursing Cell',
    shortTitle: 'Meledak cepat, lega cepat',
    description: 'Kamu punya reaksi spontan saat mood rusak. Menggerutu atau mengumpat dalam hati bisa jadi katup emosi instan.',
    traits: ['blak-blakan', 'spontan', 'mudah kesal', 'jujur secara emosional'],
    shareText: 'Sel dominanku adalah Sel Sumpah Serapah 💢',
    assetKey: 'cursing-cell',
  },
};
```

---

## 9. Rule Engine / Logika Rumus Hasil

Simpan logika di:

`src/lib/evaluateAnswers.ts`

### 9.1 Prinsip Utama

- Input harus tepat 7 jawaban.
- Setiap jawaban hanya boleh `A`, `B`, atau `C`.
- Evaluasi harus berurutan dari Prioritas 1 sampai 9.
- Jika tidak ada prioritas yang terpenuhi, gunakan default berdasarkan huruf terbanyak.
- Jika terjadi seri default, gunakan tie breaker yang deterministik.

### 9.2 Index Jawaban

Karena array TypeScript 0-based:

| Soal | Index |
|---|---:|
| Soal 1 | `answers[0]` |
| Soal 2 | `answers[1]` |
| Soal 3 | `answers[2]` |
| Soal 4 | `answers[3]` |
| Soal 5 | `answers[4]` |
| Soal 6 | `answers[5]` |
| Soal 7 | `answers[6]` |

### 9.3 Aturan Prioritas

| Prioritas | Syarat | Hasil |
|---:|---|---|
| 1 | Soal 4 = C dan Soal 7 = B | Sel Nakal |
| 2 | Soal 3 = A dan total A >= 3 | Sel Mandi |
| 3 | Soal 3 = B dan total B >= 3 | Sel Lapar |
| 4 | Soal 2 = B dan Soal 6 = B | Sel Detektif |
| 5 | Soal 5 = B dan Soal 1 = B | Sel Histeria |
| 6 | Soal 2 = A dan Soal 4 = A | Sel Mode |
| 7 | Soal 1 = B dan Soal 6 = C dan total B >= 2 | Sel Kecemasan |
| 8 | Soal 5 = C dan Soal 6 = A dan total A >= 2 | Sel Etika |
| 9 | Soal 1 = C dan Soal 2 = C dan total C >= 3 | Sel Sumpah Serapah |

### 9.4 Default

Jika tidak ada aturan prioritas yang terpenuhi:

- A terbanyak -> Sel Rasional
- B terbanyak -> Sel Cinta
- C terbanyak -> Sel Emosional

### 9.5 Tie Breaker Default

Karena 7 pertanyaan berjumlah ganjil dan hanya 3 opsi, masih mungkin terjadi komposisi seri seperti 3-2-2 tidak seri untuk mayoritas, tetapi 3 tetap menang. Seri total terbanyak hanya bisa terjadi jika ada input invalid atau jumlah bukan 7. Meski begitu, untuk safety gunakan urutan default:

1. A menang atas B/C -> Rasional
2. B menang atas C -> Cinta
3. C -> Emosional

Atau implementasi lebih eksplisit:

- Jika `A >= B && A >= C` -> Rasional
- Else jika `B >= A && B >= C` -> Cinta
- Else -> Emosional

### 9.6 Kode Rule Engine Final

```ts
export type AnswerOption = 'A' | 'B' | 'C';

export type CellId =
  | 'love'
  | 'rational'
  | 'emotional'
  | 'hungry'
  | 'anxiety'
  | 'detective'
  | 'hysteria'
  | 'fashion'
  | 'naughty'
  | 'etiquette'
  | 'shower'
  | 'cursing';

export type EvaluationResult = {
  cellId: CellId;
  triggeredRule: string;
  ruleType: 'priority' | 'default';
  counts: Record<AnswerOption, number>;
};

export function evaluateAnswers(answers: AnswerOption[]): EvaluationResult {
  if (!Array.isArray(answers) || answers.length !== 7) {
    throw new Error('Answers must contain exactly 7 items.');
  }

  const allowedAnswers: AnswerOption[] = ['A', 'B', 'C'];
  for (const answer of answers) {
    if (!allowedAnswers.includes(answer)) {
      throw new Error('Each answer must be A, B, or C.');
    }
  }

  const counts: Record<AnswerOption, number> = {
    A: answers.filter((answer) => answer === 'A').length,
    B: answers.filter((answer) => answer === 'B').length,
    C: answers.filter((answer) => answer === 'C').length,
  };

  const q1 = answers[0];
  const q2 = answers[1];
  const q3 = answers[2];
  const q4 = answers[3];
  const q5 = answers[4];
  const q6 = answers[5];
  const q7 = answers[6];

  if (q4 === 'C' && q7 === 'B') {
    return {
      cellId: 'naughty',
      triggeredRule: 'Prioritas 1: Soal 4 = C dan Soal 7 = B',
      ruleType: 'priority',
      counts,
    };
  }

  if (q3 === 'A' && counts.A >= 3) {
    return {
      cellId: 'shower',
      triggeredRule: 'Prioritas 2: Soal 3 = A dan total A >= 3',
      ruleType: 'priority',
      counts,
    };
  }

  if (q3 === 'B' && counts.B >= 3) {
    return {
      cellId: 'hungry',
      triggeredRule: 'Prioritas 3: Soal 3 = B dan total B >= 3',
      ruleType: 'priority',
      counts,
    };
  }

  if (q2 === 'B' && q6 === 'B') {
    return {
      cellId: 'detective',
      triggeredRule: 'Prioritas 4: Soal 2 = B dan Soal 6 = B',
      ruleType: 'priority',
      counts,
    };
  }

  if (q5 === 'B' && q1 === 'B') {
    return {
      cellId: 'hysteria',
      triggeredRule: 'Prioritas 5: Soal 5 = B dan Soal 1 = B',
      ruleType: 'priority',
      counts,
    };
  }

  if (q2 === 'A' && q4 === 'A') {
    return {
      cellId: 'fashion',
      triggeredRule: 'Prioritas 6: Soal 2 = A dan Soal 4 = A',
      ruleType: 'priority',
      counts,
    };
  }

  if (q1 === 'B' && q6 === 'C' && counts.B >= 2) {
    return {
      cellId: 'anxiety',
      triggeredRule: 'Prioritas 7: Soal 1 = B, Soal 6 = C, dan total B >= 2',
      ruleType: 'priority',
      counts,
    };
  }

  if (q5 === 'C' && q6 === 'A' && counts.A >= 2) {
    return {
      cellId: 'etiquette',
      triggeredRule: 'Prioritas 8: Soal 5 = C, Soal 6 = A, dan total A >= 2',
      ruleType: 'priority',
      counts,
    };
  }

  if (q1 === 'C' && q2 === 'C' && counts.C >= 3) {
    return {
      cellId: 'cursing',
      triggeredRule: 'Prioritas 9: Soal 1 = C, Soal 2 = C, dan total C >= 3',
      ruleType: 'priority',
      counts,
    };
  }

  if (counts.A >= counts.B && counts.A >= counts.C) {
    return {
      cellId: 'rational',
      triggeredRule: 'Default: Mayoritas A',
      ruleType: 'default',
      counts,
    };
  }

  if (counts.B >= counts.A && counts.B >= counts.C) {
    return {
      cellId: 'love',
      triggeredRule: 'Default: Mayoritas B',
      ruleType: 'default',
      counts,
    };
  }

  return {
    cellId: 'emotional',
    triggeredRule: 'Default: Mayoritas C',
    ruleType: 'default',
    counts,
  };
}
```

---

## 10. Test Case Wajib

Buat unit test di:

`src/lib/evaluateAnswers.test.ts`

Minimal test:

| No | Jawaban | Expected | Rule |
|---:|---|---|---|
| 1 | A-A-A-A-A-A-A | rational | Default A |
| 2 | B-B-B-B-B-B-B | love | Default B, namun cek konflik prioritas: sebenarnya prioritas 3/4/5 bisa terpicu jika semua B. Ikuti rule prioritas berurutan dari dokumen jika ingin hasil berbeda. Lihat catatan penting di bawah. |
| 3 | C-C-C-C-C-C-C | cursing | Prioritas 9 |
| 4 | A-A-A-C-A-A-B | naughty | Prioritas 1 |
| 5 | A-C-A-B-B-C-B | shower | Prioritas 2 |
| 6 | C-B-B-A-A-C-A | hungry | Prioritas 3 |
| 7 | A-B-A-A-C-B-C | detective | Prioritas 4 |
| 8 | B-A-C-C-B-A-A | hysteria | Prioritas 5 |
| 9 | C-A-B-A-C-A-A | fashion | Prioritas 6 |
| 10 | B-B-C-A-A-C-A | anxiety | Prioritas 7 |
| 11 | C-B-A-B-C-A-C | etiquette | Prioritas 8 |
| 12 | C-C-A-A-B-C-A | cursing | Prioritas 9 |

### Catatan Penting untuk Konsistensi Dokumen

Dokumen contoh menyebut `B-B-B-B-B-B-B` sebagai **Sel Cinta / Default Mayoritas B**. Namun jika rule prioritas dijalankan secara ketat, semua B akan memenuhi:

- Prioritas 3: Soal 3 = B dan total B >= 3 -> Sel Lapar
- Prioritas 4: Soal 2 = B dan Soal 6 = B -> Sel Detektif
- Prioritas 5: Soal 5 = B dan Soal 1 = B -> Sel Histeria

Karena PRD ini mengikuti instruksi utama “evaluasi berurutan prioritas ketat”, implementasi engine akan mengembalikan **Sel Lapar** untuk `B-B-B-B-B-B-B`. Jika ingin mengikuti tabel contoh 100%, perlu tambahan aturan pengecualian untuk pola semua B. Rekomendasi produk: **ikuti prioritas ketat** karena lebih konsisten sebagai sistem rule engine.

Unit test yang disarankan untuk prioritas ketat:

```ts
expect(evaluateAnswers(['B','B','B','B','B','B','B']).cellId).toBe('hungry');
```

Jika owner produk ingin `B-B-B-B-B-B-B` tetap menjadi `love`, tambahkan override sebelum Prioritas 1:

```ts
if (answers.every((answer) => answer === 'B')) return defaultLoveResult;
```

Tetapi override ini tidak direkomendasikan kecuali memang ingin mencocokkan tabel contoh lama.

---

## 11. Arsitektur Folder Next.js

```txt
src/
  app/
    page.tsx
    quiz/
      page.tsx
    result/
      page.tsx
    cells/
      page.tsx
  components/
    ui/
      Button.tsx
      Card.tsx
      ProgressBar.tsx
    quiz/
      QuestionCard.tsx
      AnswerOptionButton.tsx
    result/
      ResultCard.tsx
      AnswerBreakdown.tsx
      ShareButton.tsx
  content/
    questions.ts
    cells.ts
  lib/
    evaluateAnswers.ts
    answerCodec.ts
  styles/
    theme.ts
public/
  assets/
    cells/
      love-cell.png
      rational-cell.png
      emotional-cell.png
      hungry-cell.png
      anxiety-cell.png
      detective-cell.png
      hysteria-cell.png
      fashion-cell.png
      naughty-cell.png
      etiquette-cell.png
      shower-cell.png
      cursing-cell.png
```

---

## 12. Encoding Jawaban untuk Share URL

File:

`src/lib/answerCodec.ts`

```ts
import type { AnswerOption } from './evaluateAnswers';

export function encodeAnswers(answers: AnswerOption[]): string {
  return answers.join('');
}

export function decodeAnswers(value: string | null): AnswerOption[] | null {
  if (!value) return null;
  const normalized = value.toUpperCase().trim();
  if (!/^[ABC]{7}$/.test(normalized)) return null;
  return normalized.split('') as AnswerOption[];
}
```

Contoh URL:

```txt
/result?a=ABACCCB
```

---

## 13. Acceptance Criteria

### 13.1 Landing

- User melihat brand dan CTA mulai.
- Klik CTA mengarah ke `/quiz`.
- Halaman mobile tidak overflow horizontal.

### 13.2 Quiz

- Ada 7 pertanyaan.
- Setiap pertanyaan punya 3 opsi.
- Progress bar bergerak sesuai nomor soal.
- User dapat kembali ke soal sebelumnya.
- Setelah soal ke-7, app menghitung hasil dan membuka `/result?a=XXXXXXX`.

### 13.3 Result

- App membaca query param `a`.
- Jika valid, tampilkan hasil sesuai rule engine.
- Jika invalid, tampilkan error dan CTA ulang.
- Tampilkan counts A/B/C.
- Tampilkan `triggeredRule` agar debugging jelas.
- Tombol `Ulangi Kuis` reset state dan ke `/quiz`.
- Tombol `Bagikan` menggunakan Web Share API jika tersedia, fallback copy URL.

### 13.4 Logic

- `evaluateAnswers` punya unit test.
- Rule prioritas dicek berurutan dari 1 sampai 9.
- Tidak ada hardcoded UI di rule engine.
- Tidak ada asset dependency di rule engine.

---

## 14. Prompt Codex Siap Pakai

Gunakan prompt ini untuk membangun aplikasi:

```txt
Buat aplikasi fullstack ringan dengan Next.js App Router + TypeScript + Tailwind CSS bernama ur.cell.

Tujuan:
- Aplikasi kuis kepribadian 7 pertanyaan A/B/C.
- Hasil berupa 1 dari 12 Sel Dominan.
- Harus mobile-first, cepat load, dan shareable.
- Tidak perlu database atau login.

Implementasikan struktur:
- src/content/questions.ts untuk semua pertanyaan dan opsi.
- src/content/cells.ts untuk 12 hasil sel.
- src/lib/evaluateAnswers.ts untuk rule engine deterministik.
- src/lib/answerCodec.ts untuk encode/decode query param jawaban.
- src/app/page.tsx landing page.
- src/app/quiz/page.tsx flow kuis.
- src/app/result/page.tsx halaman hasil dari query param ?a=ABCCBAB.
- Komponen reusable di src/components.

Rule engine:
Input array 7 jawaban, masing-masing A/B/C.
Hitung total A, B, C.
Evaluasi berurutan:
1. q4=C dan q7=B => naughty
2. q3=A dan total A>=3 => shower
3. q3=B dan total B>=3 => hungry
4. q2=B dan q6=B => detective
5. q5=B dan q1=B => hysteria
6. q2=A dan q4=A => fashion
7. q1=B dan q6=C dan total B>=2 => anxiety
8. q5=C dan q6=A dan total A>=2 => etiquette
9. q1=C dan q2=C dan total C>=3 => cursing
Default:
- A terbanyak => rational
- B terbanyak => love
- C terbanyak => emotional
Tie breaker default: A, lalu B, lalu C.

Halaman result harus menampilkan:
- nama sel Indonesia
- nama Inggris
- shortTitle
- deskripsi
- traits
- counts A/B/C
- triggeredRule
- tombol share/copy URL
- tombol ulangi kuis

Styling:
- Gunakan Tailwind.
- Buat theme sederhana, clean, playful, rounded card, soft shadow.
- Asset image gunakan placeholder dari public/assets/cells/{assetKey}.png, tapi app tetap jalan jika image belum ada.

Tambahkan unit test untuk evaluateAnswers minimal 12 test prioritas/default.
Pastikan kode production-ready, type-safe, dan tidak mencampur logic dengan UI.
```

---

## 15. Catatan Implementasi Asset dan Style

Asset dan style sengaja dipisah dari PRD ini agar bisa diganti tanpa mengubah logic. Gunakan file terpisah:

- `ASSET_STYLE_GUIDE_urcell.md`
- `src/styles/theme.ts`
- `public/assets/cells/*`

Prinsip:

- Nama asset mengikuti `assetKey` dari `cells.ts`.
- Jika asset belum ada, tampilkan fallback emoji atau gradient card.
- Jangan simpan teks pertanyaan sebagai gambar.
- Jangan taruh logika hasil di komponen visual.

---

## 16. Risiko dan Keputusan Produk

### Risiko 1: Konflik antara contoh pola dan prioritas ketat

Ada contoh pola yang dapat berbeda jika prioritas benar-benar dijalankan ketat. Keputusan MVP: gunakan prioritas ketat sebagai source of truth. Jika owner ingin tabel contoh menjadi source of truth, tambahkan override test case satu per satu.

### Risiko 2: Nuansa konten dewasa ringan

Beberapa opsi seperti `Sel Nakal` mengarah pada momen romantis/intim. MVP harus menjaga bahasa tetap playful, tidak eksplisit, dan aman untuk audiens umum.

### Risiko 3: Asset belum tersedia

UI harus tetap bagus tanpa asset final. Gunakan fallback emoji/shape.

---

## 17. Definition of Done

MVP dianggap selesai jika:

- Landing, quiz, dan result berjalan.
- 7 pertanyaan lengkap.
- 12 hasil lengkap.
- Rule engine sesuai prioritas.
- Result bisa dibuka ulang lewat URL query.
- Share/copy URL tersedia.
- Unit test rule engine lolos.
- Lighthouse mobile performance minimal 90 untuk build production tanpa asset berat.

