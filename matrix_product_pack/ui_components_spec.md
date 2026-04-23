
# UI Components Spec — Mystical Dark Luxury

## Дизайн-направление
- тёмный premium фон
- глубокие оттенки: #070b14, #0b1020, #121826, #161d2f
- акценты: gold #d4af37, violet #7c3aed, rose #e11d48, indigo #4f46e5
- мягкие glow/gradient эффекты
- тонкие рамки
- никакой светло-серой "админки"

## Компоненты

### ResultPageShell
- max width container
- decorative background
- radial glow
- page spacing

### ResultHero
Показывает:
- provider badge
- name
- birth date / age / gender
- summary
- CTAs

### DiagramCard
- large diagram
- title/subtitle
- badge for provider/provenance
- subtle glow around SVG
- clean labels

### MetricCard
- title
- large number
- subtitle / 1-line interpretation
- optional badge

### PremiumCard
- reusable dark card
- rounded corners 20–24px
- border + blur + gradient
- title / body / footer

### InterpretationSection
- header
- rich text block
- optional tags
- optional lock overlay

### HealthMapSection
- premium styled table or grid
- columns: chakra / energy / physics / emotions / breach
- semantic tags below

### ForecastTimeline
- year cards
- age, calendar year, main energy
- badges for legacy/name-adjusted/reconstructed
- expandable details

### LockedContentCard
- teaser
- blur/fade content area
- lock icon
- CTA button

### ProviderMetaBar
- compact badge row
- legacy/public
- exact/reconstructed/placeholder
- warnings

### DebugDetailsPanel
- collapsed by default
- rawDetails / providerMeta / diagnostics

### BottomUpgradeCTA
- offer summary
- value bullets
- CTA buttons

## Layout
### Desktop
- 2-column main grid: 7/5 or 8/4
- diagram left, interpretation right

### Mobile
- diagram first
- metric cards 2-column
- content sections stacked
- sticky CTA allowed

## UX rules
- no raw JSON in main flow
- no developer placeholder texts
- locked content must tease curiosity
- chart is visual center
- CTA buttons must be visible and clickable
