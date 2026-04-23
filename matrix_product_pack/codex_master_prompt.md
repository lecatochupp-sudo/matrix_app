
# Master Prompt for Codex

Нужно довести текущий проект до уровня коммерческого продукта. Не начинать заново. Использовать уже существующую provider architecture, unified result contract, legacy-xlsm/public-reconstruction, interpretationKeys/contentSignals и текущий UI как основу для большого product refactor.

## Цели
1. Реализовать работающую воронку:
   - `/` -> `/result` -> `/paywall` -> `/checkout` -> `/success` -> `/account`
2. Подключить rule-engine контент из `rule_engine_content.json`
3. Сделать Mystical Dark Luxury UI
4. Починить все кнопки и интерактивность
5. Добавить free/paid paywall модель
6. Использовать максимум доступных legacy формул
7. Отделить debug от user-facing UI
8. Сделать PDF flow (допускается mock на первом этапе)

## Используй эти файлы как source of truth
- `funnel_and_pages.md`
- `ui_components_spec.md`
- `payment_flow_spec.md`
- `rule_engine_content.json`

## Обязательные требования
- не ломать unified result contract
- не переносить formulas в UI
- UI только рендерит подготовленные данные
- все locked sections должны иметь teaser + CTA
- все кнопки должны реально работать
- provider meta и diagnostics должны быть свернуты и не мешать UX
- диаграмма должна стать главным визуальным элементом страницы результата

## Этапы работы
### Шаг 1
Проведи audit текущих страниц и опиши конкретные проблемы по:
- маршрутам
- кнопкам
- UI
- paywall
- отсутствующим блокам

### Шаг 2
Покажи новую структуру маршрутов и компонентов.

### Шаг 3
Подключи content rule-engine поверх текущего result contract.

### Шаг 4
Сделай product UI refactor:
- ResultHero
- DiagramCard
- MetricCard
- InterpretationSection
- HealthMapSection
- ForecastTimeline
- LockedContentCard
- ProviderMetaBar
- DebugDetailsPanel
- BottomUpgradeCTA

### Шаг 5
Сделай paywall/checkout/success/account flows.

### Шаг 6
Покажи итоговые изменённые файлы и список оставшихся TODO.

## Критерий успеха
- проект выглядит как premium mystical product
- result page продаёт доступ
- paywall реально ведёт к оплате
- тексты рендерятся через rule-engine
- legacy/public providers продолжают работать
- пользователь может пройти путь до успешной оплаты и открытия контента
