const TelegramBot = require('node-telegram-bot-api');
const cheking1xStart = require('./paymentFormCheker');

const token = '2071463652:AAE1FYpYBn6kGrt26JAhzlbSw3DUNtAFu18';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/1xbet/, async (msg) => {
    const chatId = msg.chat.id;
    const xbet1 = await cheking1xStart()

    bot.sendMessage(chatId, xbet1);
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = 'Список доступных команд:\n' +
        '/help - вывод справки\n' +
        '/1xbet - покажет урлы формы оплаты 1xbet';

    bot.sendMessage(chatId, helpMessage);
});