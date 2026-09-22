# Продай сам

Одностраничный сайт продукта «Продай сам» на React + Vite.

## Запуск на компьютере

Требуется Node.js 20+.

```bash
npm install
npm run dev
```

После запуска Vite покажет локальный адрес, обычно:

`http://localhost:5173/`

## Публикация на GitHub Pages

1. Создайте новый репозиторий на GitHub, например `proday-sam`.
2. Загрузите в репозиторий все файлы этого проекта.
3. Убедитесь, что основная ветка называется `main`.
4. Откройте **Settings → Pages**.
5. В **Build and deployment → Source** выберите **GitHub Actions**.
6. Сделайте push в `main` или запустите workflow вручную во вкладке **Actions**.
7. После успешного деплоя сайт будет доступен примерно по адресу:

`https://ВАШ-ЛОГИН.github.io/proday-sam/`

Workflow уже находится в `.github/workflows/deploy.yml` и автоматически собирает `dist` и публикует его в GitHub Pages.

## Структура

- `src/main.jsx` — React-разметка и логика страницы
- `src/styles.css` — стили и адаптив
- `index.html` — точка входа
- `vite.config.js` — конфигурация Vite
- `.github/workflows/deploy.yml` — автоматический деплой на GitHub Pages
