# Pet-проект "Psy passport"

![Alt-фото проекта](https://github.com/eugened503/psy-passport/blob/dev/client/src/assets/images/lead.png?raw=true)

## Описание проекта

Проект представляет собой онлайн-сервис психологического тестирования. На данный момент можно пройти 3 теста: тест Айзенка, тест Лири, тест Шмишека, Леонгарда. Страницы проекта: Главная, Мой паспорт, Тесты, Вход, Регистрация.

На странице `Главная` представлена основная рекламная информация. На данную страницу могут заходить незарегистрированные пользователи, все остальные страницы доступны только для зарегистрированных пользователей. На странице `Мой паспорт` располагается информация о пользователе, а также статистика и некоторые результаты пройденных тестов. Страница `Тесты` включает в себя ссылки на тесты.
Страница `теста` имеет 2 состояния: вопросы (если тест не пройден) или сохраненные результаты тестирования.
Результаты тестирования представлены в таблицах и диаграммах.

## Технические особенности

В репозитории представлены 2 части проекта: frontend-часть (папка client) и backend-часть (папка api). В техническом исполнении проект представляет собой fullstack-разработку на стеке MEVN (MongoDB, Expressjs, Vuejs и Nodejs).

## Локальный запуск проекта

1. Клонируйте репозиторий
   `https://github.com/eugened503/psy-passport.git`

2. Для запуска проекта необходимо, чтобы frontend и backend были запущены локально. Для этого в папке client и в папке api необходимо:

- Установить пакеты
  `npm install`
- Запустить версию на локальном сервере
  `npm run dev`

## Ссылка на готовый проект

[Проект находится здесь](https://psy-passport-client-deploy.vercel.app/)
