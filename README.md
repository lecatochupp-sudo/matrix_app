# Матрица Судьбы Pro

Production-ready веб-приложение на Next.js 14.

## Стек
- **Framework:** Next.js 14 (App Router)
- **Database:** Prisma + SQLite (можно сменить на Postgres)
- **Auth:** NextAuth (Credentials)
- **Styling:** Tailwind CSS + shadcn/ui
- **Calculations:** Пользовательские формулы (normalizeTo22 и др.)
- **PDF:** pdf-lib

## Быстрый старт

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Настройте базу данных:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Запустите проект:
   ```bash
   npm run dev
   ```

## Структура проекта
- `src/domain/calculations` — Ядро расчетов (твои формулы)
- `src/services/matrixService.ts` — Оркестрация расчетов для UI
- `src/app/result` — Страница результатов с Paywall
- `src/lib/pdf.ts` — Генерация PDF отчетов

## Что осталось сделать (TODO)
1. **Реальные тексты:** В файле `prisma/seed.ts` (нужно создать) заполнить `ContentBlock` реальными описаниями арканов.
2. **SVG Визуализатор:** В `src/app/result/page.tsx` интегрировать SVG-рендер для отрисовки диаграммы.
3. **Платежи:** В `src/lib/payments.ts` заменить Mock на реальный API ЮKassa/Stripe.
4. **Email:** Настроить Resend/Nodemailer для отправки PDF на почту.
