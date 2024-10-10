import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TIME_REWARDS = [
  { time: 3600, coins: 100 },   // 1 час
  { time: 36000, coins: 500 },  // 10 часов
  { time: 360000, coins: 1000 },// 100 часов
  { time: 3600000, coins: 5000 },// 1000 часов
];

const Earn = ({ coins, timeSpent, onClaimReward, consecutiveDays }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    alert('Вы подписались на канал! Вы получили 100 монет.');
    onClaimReward(0); // Добавляем 100 монет
    handleClose();
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClaimTimeReward = (rewardIndex) => {
    if (timeSpent >= TIME_REWARDS[rewardIndex].time) {
      onClaimReward(rewardIndex);
      alert(`Вы получили ${TIME_REWARDS[rewardIndex].coins} монет за время в игре!`);
    } else {
      alert('Невозможно получить награду: не достигли нужного времени.');
    }
  };

  return (
    <div>
      <h2>Earn Coins</h2>
      <h3>Задания</h3>
      <ul>
        <li>
          Подписаться на Telegram-канал - Награда: 100 монет 
          <button onClick={handleShow}>Выполнить</button>
        </li>
      </ul>

      <h3>Награды за время в игре</h3>
      <ul>
        {TIME_REWARDS.map((reward, index) => (
          <li key={index}>
            {reward.time / 3600} часов: {reward.coins} монет 
            <button onClick={() => handleClaimTimeReward(index)}>Получить награду</button>
          </li>
        ))}
      </ul>

      <h3>Количество дней подряд: {consecutiveDays}</h3>

      {/* Модальное окно для подписки */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Подписка на Telegram-канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Для получения награды в 100 монет, пожалуйста, подпишитесь на наш Telegram-канал.</p>
          <a href="https://t.me/digitalcoin_community" target="_blank" rel="noopener noreferrer">Перейти на канал</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleSubscribe} disabled={isSubscribed}>
            Выполнить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Earn;