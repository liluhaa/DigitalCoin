import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Earn from './components/Earn';
import Boost from './components/Boost';
import Friends from './components/Friends';
import Airdrop from './components/Airdrop';
import BottomButtons from './components/BottomButtons'; // Импортируем компонент кнопок
import NotSupported from './components/NotSupported'; // Импортируем компонент страницы "не поддерживается"
import 'bootstrap/dist/css/bootstrap.min.css';
import myGif from './assets/digitalcoin.gif'; // Импорт гифки, если она в src/assets
import './App.css'; // Импортируем CSS-файл

const DAILY_REWARDS = [0, 50, 100, 150, 200, 250]; // Награды за 1, 2, 3, 4, 5 дней

const TIME_REWARDS = [
  { time: 3600, coins: 100 },   // 1 час
  { time: 36000, coins: 500 },  // 10 часов
  { time: 360000, coins: 1000 },// 100 часов
  { time: 3600000, coins: 5000 },// 1000 часов
];

function App() {
  const [coins, setCoins] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [level, setLevel] = useState(0);
  const [nextLevelCost, setNextLevelCost] = useState(350);
  const [lastVisitDate, setLastVisitDate] = useState(localStorage.getItem('lastVisitDate') || null);
  const [consecutiveDays, setConsecutiveDays] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString();

    if (lastVisitDate !== today) {
      const newConsecutiveDays = (lastVisitDate === null) ? 1 : 
        (new Date(lastVisitDate).getDate() + 1 === new Date(today).getDate()) ? consecutiveDays + 1 : 1;

      if (newConsecutiveDays <= DAILY_REWARDS.length - 1) {
        setCoins((prevCoins) => prevCoins + DAILY_REWARDS[newConsecutiveDays]);
      }
      setConsecutiveDays(newConsecutiveDays);
      setLastVisitDate(today);
      localStorage.setItem('lastVisitDate', today);
    }
  }, [lastVisitDate, consecutiveDays]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1); // Увеличиваем на 1 секунду
    }, 1000); // Проверка каждую секунду

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeSpent % 15 === 0 && timeSpent !== 0) { // Начисляем монеты каждые 15 секунд
      setCoins((prevCoins) => prevCoins + 1 + level);
    }
  }, [timeSpent, level]);

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      // Перенаправление на страницу с сообщением
      window.location.href = '/not-supported'; // или показать сообщение
    }
  }, []);

  const handleLevelUp = () => {
    if (coins >= nextLevelCost) {
      setCoins((prevCoins) => prevCoins - nextLevelCost);
      setLevel((prevLevel) => prevLevel + 1);
      setNextLevelCost((prevCost) => Math.floor(prevCost * 1.5));
    } else {
      alert("Недостаточно монет для повышения уровня!");
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}ч ${minutes}м ${seconds}с`;
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">DigitalCoin</h1>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <img src={myGif} alt="Welcome gif" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '20px' }} />
              <p>Время, проведенное в приложении: {formatTime(timeSpent)}</p>
              <p>Заработанные монеты: {coins}</p>
              {/* Убрали кнопку "Улучшить уровень" */}
            </div>
          }
        />
        <Route path="/earn" element={<Earn coins={coins} timeSpent={timeSpent} consecutiveDays={consecutiveDays} onClaimReward={(index) => setCoins((prevCoins) => prevCoins + TIME_REWARDS[index].coins)} />} />
        <Route path="/boost" element={<Boost level={level} nextLevelCost={nextLevelCost} handleLevelUp={handleLevelUp} />} />
        <Route path="/friends" element={<Friends coins={coins} setCoins={setCoins} />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/not-supported" element={<NotSupported />} /> {/* Добавляем маршрут для страницы "не поддерживается" */}
      </Routes>

      <BottomButtons /> {/* Добавляем компонент кнопок внизу */}
    </div>
  );
}

export default App;