# Chat_in_Browser
WebSocket technology

# Практическая работа по модулю 11

Разработка простого чата на WebSocket с использованием Node.js

## Описание проекта:
﻿
- Разработать веб-приложение для чата, где несколько пользователей могут обмениваться сообщениями в реальном времени. 
- Чат должен работать на основе технологии WebSocket, что обеспечит мгновенную передачу сообщений между клиентами и сервером.

## Серверная часть (Backend):

- Используйте Node.js для создания сервера WebSocket.
- Реализуйте сервер, который будет слушать входящие подключения на определенном порту (например, 8080).
- Сервер должен принимать сообщения от клиентов и пересылать их всем подключенным клиентам (реализация "группового чата").
- Сервер должен обрабатывать следующие события:
- Подключение нового клиента: логирование факта подключения, отправка приветственного сообщения новому клиенту.
- Получение сообщения от клиента: пересылка этого сообщения всем подключенным клиентам.
- Отключение клиента: логирование факта отключения клиента.

## Клиентская часть (Frontend):

- Создайте HTML-страницу, которая будет представлять собой интерфейс чата.
- Разработайте интерфейс, включающий следующие элементы:
- Область для отображения сообщений (чат-история).
- Поле для ввода текста сообщения.
- Кнопка для отправки сообщения.
- Реализуйте функционал подключения к серверу через WebSocket.
- Клиент должен отправлять сообщение на сервер по нажатию на кнопку "Отправить" или при нажатии клавиши Enter.
- Все полученные от сервера сообщения должны динамически отображаться в области чата.
- Добавьте автопрокрутку области чата вниз при получении новых сообщений.

## Требования к дизайну:

- Используйте простую и интуитивно понятную стилизацию (CSS) для оформления интерфейса.
- Область чата должна быть прокручиваемой, если количество сообщений превышает ее высоту.
- Сообщения должны отображаться в виде текста, разделенного по строкам, где каждое новое сообщение добавляется в конец области чата.

___

### Безопасность
Добавлена возможность использования безопасных соединений с использованием Token-ключей. 
Для их использования нужно рас комментировать соответствующие  строки и добавить новый сгенерированный token в файл index.html.

Для запуска сервера нужно в терминале выполнить команду и взять сгенерированный token:

***node server.js***
