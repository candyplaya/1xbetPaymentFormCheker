const TelegramBot = require('node-telegram-bot-api');
const cheking1xStart = require('./paymentFormCheker');


const token = '2071463652:AAHPG6Wm5I3fe6VnxI2944tAyTyyNKQAYW8';
const bot = new TelegramBot(token, { polling: true });

let newUrl1x = 'Не задано'
let newUrlMelbet = 'Не задано'
let newUrlBetwinner = 'Не задано'


try {
    bot.onText(/\/newUrl1x/, async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Задайте новый url для 1xbet');

        bot.once('message', async (msg) => {
            newUrl1x = msg.text;
            bot.sendMessage(chatId, `Для 1xbet установлен url: ${newUrl1x}`);
        });
    });

    bot.onText(/\/newUrlMelbet/, async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Задайте новый url для melbet');

        bot.once('message', async (msg) => {
            newUrlMelbet = msg.text;
            bot.sendMessage(chatId, `Для melbet установлен url: ${newUrlMelbet}`);
        });
    });

    bot.onText(/\/newUrlBetwinner/, async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Задайте новый url для Betwinner');

        bot.once('message', async (msg) => {
            newUrlBetwinner = msg.text;
            bot.sendMessage(chatId, `Для Betwinner установлен url: ${newUrlBetwinner}`);
        });
    });

    bot.onText(/^\/1xbet/, async (msg) => {
        const chatId = msg.chat.id;
        const xbet1 = await cheking1xStart(newUrl1x)

        bot.sendMessage(chatId, xbet1);
    });

    bot.onText(/^\/melbet/, async (msg) => {
        const chatId = msg.chat.id;
        const xbet1 = await cheking1xStart(newUrlMelbet)

        bot.sendMessage(chatId, xbet1);
    });

    bot.onText(/^\/betwinner/, async (msg) => {
        const chatId = msg.chat.id;
        const xbet1 = await cheking1xStart(newUrlBetwinner)

        bot.sendMessage(chatId, xbet1);
    });

    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        const helpMessage = 'Список доступных команд:\n' +
            '\n/help - вывод справки\n' +
            '/1xbet - запросить урлы формы оплаты 1xbet\n' +
            '/melbet - запросить урлы формы оплаты melbet\n' +
            '/betwinner - запросить урлы формы оплаты betwinner\n' +
            '\nЗадать новый URL:\n' +
            `/newUrl1x - Задать URL для 1xbet\n` +
            `/newUrlMelbet - Задать URL для melbet\n` +
            `/newUrlBetwinner - Задать URL для betwinner\n` +
            '\nТекущие значения доменов:\n' +
            `1xbet: ${newUrl1x}\n` +
            `Melbet: ${newUrlMelbet}\n` +
            `betwinner: ${newUrlBetwinner}\n`

        bot.sendMessage(chatId, helpMessage);
    });

} catch (err) {
    console.log(err);
    bot.sendMessage(chatId, 'Что-то пошло не так...');
}
