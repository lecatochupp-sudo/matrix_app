
# Payment Flow Spec

## Goal
Дать пользователю понятный и короткий путь от результата к покупке.

## Flow
1. User sees locked sections on `/result`
2. Clicks CTA `Открыть полный доступ`
3. Redirects to `/paywall`
4. Selects tariff
5. Goes to `/checkout`
6. Completes payment
7. Redirects to `/success`
8. Access flag becomes active
9. User returns to `/result?paid=true` or account

## Tariffs
### Basic
- full text sections
- forecast 10 years
- access in account

### Premium
- all above
- PDF report
- priority extras / future bonus sections

## Server states
- `unpaid`
- `pending`
- `paid`
- `failed`
- `expired`

## API endpoints
- `POST /api/checkout/create-order`
- `POST /api/checkout/start-payment`
- `POST /api/payment/webhook`
- `GET /api/orders/:id`
- `GET /api/access/status`

## Client actions
- Result CTA -> paywall
- Paywall CTA -> checkout
- Checkout submit -> provider
- Success -> refresh access + unlock content

## Mock mode
Если реальный провайдер пока не подключён:
- использовать mock provider
- имитировать pending -> paid
- всё равно сохранять order/payment state
- UI должен выглядеть как настоящий

## Security
- server-side access check only
- locked content fully hidden from unpaid response or sent only as teaser
- PDF links signed/protected
