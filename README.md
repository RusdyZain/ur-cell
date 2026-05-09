# ur-cell

`ur-cell` adalah aplikasi kuis personality berbasis **Next.js App Router** dengan 7 pertanyaan untuk memetakan pengguna ke 1 dari 12 "cell" dominan.

Project ini sudah menggunakan:
- **TypeScript**
- **Tailwind CSS**
- **next-intl** untuk i18n (`id` dan `en`)
- **Vitest** untuk unit test rule engine

## Requirements

- Node.js 20+
- npm 10+

## Instalasi

1. Install dependency:

```bash
npm install
```

2. Buat file environment (opsional, untuk canonical/share URL):

```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://domain-kamu.com
```

3. Jalankan development server:

```bash
npm run dev
```

App akan berjalan di `http://localhost:3000`.

## Scripts

```bash
npm run dev      # run local dev server
npm run build    # production build
npm run start    # run production server
npm run lint     # lint source code
npm run test     # run unit tests
```

## Arsitektur Singkat

### Routing & i18n
- Locale routing: `src/app/[locale]/...`
- Konfigurasi i18n:
  - `src/i18n/routing.ts`
  - `src/i18n/request.ts`
  - `src/i18n/navigation.ts`
  - `src/proxy.ts`
- Message catalog:
  - `messages/id.json`
  - `messages/en.json`

### App Layer
- `src/app/layout.tsx` -> root global layout
- `src/app/[locale]/layout.tsx` -> locale-aware layout & metadata
- `src/app/[locale]/page.tsx` -> landing page
- `src/app/[locale]/quiz/page.tsx` -> quiz flow
- `src/app/[locale]/cells/page.tsx` -> daftar 12 cell
- `src/app/[locale]/result/page.tsx` -> hasil evaluasi
- `src/app/[locale]/result/og/route.tsx` -> dynamic OG image

### Domain/Business Layer
- `src/lib/evaluateAnswers.ts` -> rule engine (priority rules + default fallback)
- `src/lib/answerCodec.ts` -> encode/decode jawaban query param `?a=...`
- `src/lib/resultResolver.ts` -> resolver hasil dari query string
- `src/content/questions.ts` -> source pertanyaan (localized)
- `src/content/cells.ts` -> source data 12 cell (localized)
- `src/styles/cellVisuals.ts` -> visual config per cell (localized copy + static theme)

## Quality Gate (Recommended)

Sebelum push ke remote:

```bash
npm run lint
npm run test
npm run build
```

## Deployment Notes

- Pastikan `NEXT_PUBLIC_APP_URL` di-set ke domain production agar metadata canonical & share URL akurat.
- Route result share berada di path locale:
  - `/id/result?a=...`
  - `/en/result?a=...`
