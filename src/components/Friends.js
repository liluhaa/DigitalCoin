import React, { useState, useEffect } from 'react';

// Пример функции для получения количества приглашенных пользователей из базы данных
const fetchInvitedCount = async (userId) => {
  // Здесь должен быть код для запроса к вашей базе данных
  // Пример с использованием fetch:
  const response = await fetch(`/api/invitedCount?userId=${userId}`);
  const data = await response.json();
  return data.count;
};

const Friends = ({ userId, coins, setCoins }) => {
  const [referralLink, setReferralLink] = useState('');
  const [invitedCount, setInvitedCount] = useState(0);

  useEffect(() => {
    // Генерируем реферальную ссылку
    setReferralLink(`https://t.me/coindigitalbot?start=${userId}`);

    // Получаем количество приглашенных пользователей из базы данных
    const getInvitedCount = async () => {
      const count = await fetchInvitedCount(userId);
      setInvitedCount(count);
    };

    getInvitedCount();
  }, [userId]);

  const handleShare = () => {
    alert('Ссылка на приглашение скопирована в буфер обмена!');
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div>
      <h2>Пригласите друзей</h2>
      <p>Пригласите своих друзей и получайте 50 монет за каждого!</p>
      <button onClick={handleShare}>Поделиться ссылкой</button>
      <p>Ваша реферальная ссылка: {referralLink}</p>
      <p>Вы пригласили {invitedCount} пользователей.</p>
    </div>
  );
};

export default Friends;