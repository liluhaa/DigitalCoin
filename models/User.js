// models/User.js
const mongoose = require('mongoose');

// Определите схему для пользователя
const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true }, // ID пользователя в Telegram
    username: { type: String, required: true }, // Имя пользователя в Telegram
    referrerId: { type: String }, // ID реферала (если есть)
    referralCount: { type: Number, default: 0 }, // Количество рефералов
    rewards: { type: Number, default: 0 } // Награды пользователя
});

// Создайте модель на основе схемы
const User = mongoose.model('User', userSchema);

// Экспортируйте модель
module.exports = User;