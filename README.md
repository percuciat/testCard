# Online Courses Catalog

Каталог онлайн-курсов на HTML + JavaScript + SCSS через Vite.

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

## Команды

| Команда            | Описание                            |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Dev-сервер на http://localhost:3000 |
| `npm run build`    | Сборка для продакшена               |
| `npm run preview`  | Превью продакшен-сборки             |
| `npm run lint`     | Проверка JS и SCSS                  |
| `npm run lint:js`  | Проверка только JS (ESLint)         |
| `npm run lint:css` | Проверка только SCSS (Stylelint)    |
| `npm run format`   | Форматирование кода (Prettier)      |

## Docker

```bash
# Development (с hot-reload)
docker compose up dev

# Production (nginx на порту 8080)
docker compose up prod --build
```

## Структура

```
├── assets/              # Статические файлы (изображения, иконки)
│   ├── loadMore.svg
│   ├── mockCard.jpg
│   └── searchIcon.svg
├── src/
│   ├── scripts/
│   │   ├── main.js      # Точка входа JS
│   │   ├── filter.js    # Логика фильтрации курсов
│   │   ├── courseCard.js # Рендеринг карточек
│   │   └── mockApi.js   # Мок-сервер с данными курсов
│   └── styles/
│       ├── _variables.scss
│       ├── _base.scss
│       ├── _components.scss
│       └── main.scss    # Главный файл стилей
├── index.html           # Главная страница
├── vite.config.js       # Конфиг Vite
├── eslint.config.js     # Конфиг ESLint
├── Dockerfile           # Продакшен образ
├── Dockerfile.dev       # Dev образ
├── docker-compose.yml
└── nginx.conf           # Конфиг nginx для продакшена
```

## Категории курсов

- Marketing
- Management
- HR & Recruiting
- Design
- Development

## Функционал

- **Фильтрация по категориям** - клик по табам фильтрует карточки без перезагрузки
- **Поиск** - поиск по названию, автору и категории
- **Load more** - подгрузка дополнительных карточек (по 3 шт.) с имитацией задержки сервера
- **Мок API** - имитация серверных запросов с задержкой 300-700ms
