### Hexlet tests and linter status:
[![Actions Status](https://github.com/abvgzxn/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/abvgzxn/frontend-project-11/actions)
[Деплой приложения](https://frontend-project-11.vercel.app)
[![hexlet-check](https://github.com/abvgzxn/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/abvgzxn/frontend-project-11/actions/workflows/hexlet-check.yml)
[![Lint and Analyze](https://github.com/abvgzxn/frontend-project-11/actions/workflows/lint.yml/badge.svg)](https://github.com/abvgzxn/frontend-project-11/actions/workflows/lint.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=abvgzxn_frontend-project-11&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=abvgzxn_frontend-project-11)


RSS агрегатор — веб-приложение для удобного чтения и отслеживания новостных лент (RSS-потоков).

## Возможности

*   Добавление и удаление RSS-потоков.
*   Автоматическое обновление записей.
*   Мультиязычный интерфейс (русский/английский).

## Разработка

Установка зависимостей:
```bash
make install
```

Запуск сервера разработки: `make develop`.

Локальные проверки (Node.js 22.12+):
```bash
make build
make lint
node --test tests/*.test.mjs
```

Регрессионные тесты проверяют типы ошибок Yup, повторную валидацию,
кодирование URL прокси и обработку сетевого отказа. Они не заменяют
браузерные тесты Hexlet и не требуют подключения к RSS-сервисам.

Hexlet Check запускается workflow `.github/workflows/hexlet-check.yml`
при push в любую ветку через `hexlet/project-action@release` с секретом
`HEXLET_ID`. Исходников тестов Hexlet и локальной команды их запуска
в репозитории нет. После разрешённого push откройте GitHub Actions →
hexlet-check → запуск для нужного коммита → Hexlet project check.
Проверьте validation (unique), validation (valid url), render feed and posts
и modal, а также остальные сценарии. Push и создание PR выполняются отдельно.
