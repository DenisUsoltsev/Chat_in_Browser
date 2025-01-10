// Импортируем WebSocket библиотеку 
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

// Создаем сервер WebSocket на порту 8080
const PORT = 8080;
const wsserver = new WebSocketServer({ port: PORT });

console.log('WebSocketServer сервер запущен на ws://localhost:8080');

// Храним подключенных клиентов в коллекции
const clients = new Set();

// Секретный ключ для безопасных подключений
const secretKey = 'your_secret_key';
const payload = { userId: '12345' };
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Сгенерированный токен:', token);

function heartbeat() {
    this.isAlive = true;
}

// Обрабатываем подключения новых клиентов
wsserver.on('connection', (ws, req) => {
    // Получаем токен из URL
    // const token = req.url.split('?token=')[1];

    // if (!token) {
    //     ws.close(4001, 'Токен не предоставлен');
    //     console.log('Подключение отклонено: отсутствует токен');
    //     return;
    // }
    
    try {
        // Проверяем токен
        // const payload = jwt.verify(token, secretKey);
        // console.log('Подключен клиент с ID:', payload.userId);
    
        ws.isAlive = true;

        // Добавляем нового клиента в коллекцию
        clients.add(ws);

        // Логируем подключение
        console.log('Новый клиент подключен');

        // Отправляем приветственное сообщение новому клиенту
        ws.send(JSON.stringify({type: 'system', message: "Добро пожаловать в чат!"}));

        // Обрабатываем получение сообщения от клиента
        ws.on('message', (data) => {
            const message = data.toString();

            // Рассылаем сообщение всем подключенным клиентам
            clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({type: 'server', message}));
                }
            });
        });

        // Обрабатываем отключение клиента
        ws.on('close', () => {
            clients.delete(ws);
            console.log('Клиент отключился');
        });

        // Обрабатываем ошибки
        ws.on('error', (error) => {
            console.error('Ошибка соединения:', error);
        });

        ws.on('pong', heartbeat);
    } catch (error) {
        // Закрываем соединение, если токен недействителен
        ws.close(4002, 'Неверный токен');
        console.log('Подключение отклонено: недействительный токен');        
    }

});

const interval = setInterval(function ping() {
    wsserver.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();
  
      ws.isAlive = false;
      ws.ping();
    });
}, 30000);

// Закрываем разорванные соединения
wsserver.on('close', () => {
    clearInterval(interval);
});