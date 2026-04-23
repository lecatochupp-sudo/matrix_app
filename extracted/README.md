# Извлечение из `Программа расчета нумерологии ... 1, 2, 3 ступени.xlsm`

Этот каталог содержит все доступные артефакты, которые удалось вытащить из книги без ручной работы в Excel.

## Что извлечено

- Полная распаковка `.xlsm` как ZIP:
  [raw/zip](C:/Users/Dima/Desktop/Матрица/extracted/raw/zip)
- VBA-проект и модули:
  [raw/vba](C:/Users/Dima/Desktop/Матрица/extracted/raw/vba)
- JSON по каждому листу со всеми формулами и текстовыми ячейками:
  [reports](C:/Users/Dima/Desktop/Матрица/extracted/reports)
- Отдельные `.bas` для ключевых пользовательских функций:
  [reports/vba_key_functions](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions)

## Главные файлы

- Общая сводка по книге:
  [workbook_summary.json](C:/Users/Dima/Desktop/Матрица/extracted/reports/workbook_summary.json)
- Попадания формул по пользовательским функциям:
  [formula_hits_by_function.json](C:/Users/Dima/Desktop/Матрица/extracted/reports/formula_hits_by_function.json)
- Индекс всех VBA-функций:
  [vba_functions_index.json](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_functions_index.json)
- Сырой `Module1.bas`:
  [03_Module1.bas](C:/Users/Dima/Desktop/Матрица/extracted/raw/vba/03_Module1.bas)
- Внешние связи книги:
  [external_links.json](C:/Users/Dima/Desktop/Матрица/extracted/reports/external_links.json)
- Манифест изображений, диаграмм и drawing-xml:
  [asset_manifest.json](C:/Users/Dima/Desktop/Матрица/extracted/reports/asset_manifest.json)

## Самые важные наблюдения

### 1. Базовая логика матрицы есть в формулах листов

Наиболее полезные листы:

- `Мандала`
- `Кристалл Судьбы`
- `Прогностика`
- `Совместимость`

Особенно важен лист `Мандала`, потому что в нем лежит компактная схема базовых расчетов по дате:

- `D3 = numberto22(C3)`
- `D4 = numberto22(C4)`
- `D5 = numberto22(SumNumbers(C5))`
- `I4 = numberto22(ABS(D3 + D4))`
- `J4 = numberto22(ABS(D3 + D5))`
- `K4 = numberto22(ABS(I4 + J4))`
- `L4 = numberto22(ABS(D4 + D5))`
- `M4 = numberto22(I4 + J4 + K4 + L4)`
- `N4 = numberto22(M4 + M5)`

### 2. VBA-функции удалось вытащить текстом

Ключевые функции лежат в:

- [NumberTo22.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/NumberTo22.bas)
- [SumNumbers.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/SumNumbers.bas)
- [CalcTP.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/CalcTP.bas)
- [CalcOPV.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/CalcOPV.bas)
- [CalculateRod.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/CalculateRod.bas)
- [ConvertLettersToNumber.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/ConvertLettersToNumber.bas)
- [RetrogradeCalc.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/RetrogradeCalc.bas)
- [SolarDate.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/SolarDate.bas)
- [KarmicShadow.bas](C:/Users/Dima/Desktop/Матрица/extracted/reports/vba_key_functions/KarmicShadow.bas)

### 3. Есть расхождение с нашей публичной реконструкцией

В этой книге `NumberTo22` работает не через сумму цифр до `<= 22`, а через циклическое вычитание `22`:

- если `intSource > 22`, то повторять `intSource = intSource - 22`
- если результат `0`, вернуть `22`

То есть это другая нормализация, чем та, которую мы хотели для стартового MVP.

### 4. В книге есть внешняя зависимость

В `external_links.json` видно ссылку на внешний файл:

- `MainFile.xlsm`

Также в книге есть внешние именованные ссылки:

- `Dop_TP -> [1]Главная!H5`
- `DOP_OPV -> [1]Главная!H6`

По данным внешней ссылки внутри самой книги сейчас зафиксированы значения:

- `H5 = 1`
- `H6 = 0`

Это полезно для MVP, потому что часть зависимостей можно временно зафиксировать этими значениями.

### 5. Контент тоже можно использовать как источник

На листе `Лист1` и в части листов книги есть большие текстовые блоки интерпретаций, включая:

- личные качества
- задачи
- кармические описания
- здоровье
- прогнозные описания

Они уже выгружены в JSON по листам, так что позже можно будет мигрировать их в контентный источник проекта.

## Что особенно пригодится для проекта

- Формулы базовой матрицы из `Мандала`
- Именованные диапазоны и опорные числа из `Кристалл Судьбы`
- Прогностические формулы из `Прогностика`
- Совместимость и производные числа из `Совместимость`
- Алфавиты и буквенные маппинги из `Алфавит`
- VBA-реализации `SumNumbers`, `CalcTP`, `CalcOPV`, `CalculateRod`, `ConvertLettersToNumber`

## Практический вывод

Для следующего этапа можно делать проект на заменяемой архитектуре с двумя слоями формул:

- `public reconstruction` для стартового MVP по нашему ТЗ
- `legacy xlsm formulas` как альтернативный провайдер логики, основанный на извлеченной книге

Так мы не потеряем найденную логику и не сломаем будущую замену формул.
