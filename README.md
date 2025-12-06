# Vanilla SPA

SPA на чистом HTML + JavaScript + SCSS через Vite.

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер на http://localhost:3000 |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Превью продакшен-сборки |
| `npm run lint` | Проверка JS и SCSS |
| `npm run lint:js` | Проверка только JS (ESLint) |
| `npm run lint:css` | Проверка только SCSS (Stylelint) |
| `npm run format` | Форматирование кода (Prettier) |

## Docker

```bash
# Development (с hot-reload)
docker compose up dev

# Production (nginx на порту 8080)
docker compose up prod --build
```

## Структура

```
├── src/
│   ├── pages/          # Страницы SPA
│   ├── styles/         # SCSS стили
│   ├── main.js         # Точка входа
│   └── router.js       # Клиентский роутер
├── public/             # Статические файлы
├── Dockerfile          # Продакшен образ
├── Dockerfile.dev      # Dev образ
└── docker-compose.yml
```

