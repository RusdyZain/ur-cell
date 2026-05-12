# ur.cell

`ur.cell` adalah web quiz personality yang cepat, ringan, dan fun. User jawab 7 pertanyaan, lalu sistem memetakan hasil ke 1 dari 12 "sel dominan" ala Yumi's Cells.

## Apa Fungsi Website Ini

- Memberi hasil personality instan dari 7 skenario harian.
- Menampilkan hasil visual card yang bisa langsung dibagikan.
- Mendukung 2 bahasa (`ID` dan `EN`) dengan locale routing.
- Menjadi social-content toy yang mudah dipakai di mobile.

## Kenapa Asik

- Waktu main singkat, hasil langsung keluar.
- Ada 12 tipe sel dengan karakter yang berbeda.
- Hasil ditampilkan dalam card visual khusus per sel dan per bahasa (`HASIL IND-ENG`).
- Tombol share langsung membagikan gambar hasil agar siap kirim ke chat/story.

## User Flow

1. User masuk landing dan pilih bahasa (`/id` atau `/en`).
2. User jawab 7 pertanyaan di halaman quiz.
3. Jawaban dievaluasi dengan rule engine prioritas berurutan.
4. Result page menampilkan sel dominan + visual card.
5. User bisa ulang quiz atau share hasil dalam bentuk image.

## Logika Hasil (Rule Engine)

- Rule dievaluasi dengan **Prioritas 1 sampai 9 secara berurutan**.
- Jika tidak ada rule prioritas yang terpenuhi, sistem pakai **default mayoritas**:
- `A` terbanyak -> `rational`
- `B` terbanyak -> `love`
- `C` terbanyak -> `emotional`
- Implementasi: `src/lib/evaluateAnswers.ts`
- Unit test rule: `src/lib/evaluateAnswers.test.ts`

## Teknologi yang Dipakai

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Internationalization**: next-intl 4 (`id`, `en`, locale prefix)
- **Image & Media**: `next/image`, static assets `public/assets/...`
- **SEO/Share**: metadata locale-aware + dynamic OG image route
- **Testing**: Vitest + jsdom
- **Linting**: ESLint 9 + eslint-config-next
- **Package Manager**: npm

## Struktur Project

- `src/app/[locale]/page.tsx` -> landing page
- `src/app/[locale]/quiz/page.tsx` -> quiz experience
- `src/app/[locale]/cells/page.tsx` -> daftar 12 sel
- `src/app/[locale]/result/page.tsx` -> result page
- `src/app/[locale]/result/og/route.tsx` -> OG image generator
- `src/components/result/*` -> UI hasil + share
- `src/lib/evaluateAnswers.ts` -> inti rule engine
- `src/lib/resultResolver.ts` -> resolver dari query `?a=...`
- `src/lib/resultCardAsset.ts` -> mapping sel ke card file `HASIL IND-ENG`
- `messages/id.json` dan `messages/en.json` -> semua copy per bahasa

## Requirements

- Node.js 20+
- npm 10+

## Jalankan Lokal

```bash
npm install
```

```bash
# opsional, untuk canonical/share URL production
# .env.local
NEXT_PUBLIC_APP_URL=https://domain-kamu.com
```

```bash
npm run dev
```

App berjalan di `http://localhost:3000`.

## Script

```bash
npm run dev         # local development
npm run build       # production build
npm run start       # run production build
npm run lint        # lint codebase
npm run test        # run test suite
npm run test:watch  # run test in watch mode
```

## Quality Gate Sebelum Push

```bash
npm run lint
npm run test
npm run build
```

## Deployment Notes

- Set `NEXT_PUBLIC_APP_URL` untuk canonical URL dan share link yang konsisten.
- Result route berbasis locale tersedia di `/id/result?a=...` dan `/en/result?a=...`.
