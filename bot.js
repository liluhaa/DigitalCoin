const TelegramBot = require('node-telegram-bot-api');

// Замените на ваш токен
const token = '7300719969:AAFslEGFquSHvhqPx-41J-Bn4P3FLfG4D3o';

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// URL вашего приложения
const appUrl = 'https://t.me/coindigitalbot/DigitalCoin'; // Замените на фактический URL вашего приложения
const communityUrl = 'https://t.me/digitalcoin_community'; // Замените на ссылку вашего сообщества

// Ссылка на изображение
const imageUrl = 'https://sun9-40.userapi.com/impg/wJdMXwwAjzCOogxZ6y0U3HPqc7ydf7NwuOCxfg/SzNf8mXLK7I.jpg?size=960x540&quality=95&sign=ea99212f2bd643caa8cfe30cd29b2595&type=album.jpg'; // Замените на ссылку на вашу картинку

// Хранилище для пользователей и их рефералов
const users = {};

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username ? `@${msg.from.username}` : 'there'; // Получаем имя пользователя

    // Проверяем наличие реферального кода в сообщении
    const referral = msg.text.split(' ')[1]; // Получаем код из команды /start код_реферала
    if (referral && users[referral]) {
        // Если пользователь пришел по реферальной ссылке
        users[referral].referrals.push(chatId);
        bot.sendMessage(chatId, 'Вы пришли по реферальной ссылке! Вы и ваш реферал получили по 50 монет!');
    }

    // Если пользователя еще нет в базе, добавляем его
    if (!users[chatId]) {
        users[chatId] = { referrals: [], coins: 0 };
    }

    // Приветственный текст с пустыми строками
    const welcomeText = `Hey there, ${username}! This is DigitalCoin!\n\n` +
                        `Here you will have to compete with players on your endurance!\n\n` +
                        `How long can you sit in the game without stopping?\n\n` +
                        `Let's find out⬇️\n\n` +
                        `Share your referral link to invite friends and earn rewards!`;

    // Отправляем фотографию с текстом
    bot.sendPhoto(chatId, imageUrl, {
        caption: welcomeText,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Start playing DigitalCoin👾', url: appUrl }
                ],
                [
                    { text: 'Join the Community', url: communityUrl }
                ]
            ]
        }
    });
});