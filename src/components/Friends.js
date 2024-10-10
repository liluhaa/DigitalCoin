// src/components/Friends.js
import React, { useState } from 'react';

const Friends = ({ coins, setCoins }) => {
  const referralLink = "https://example.com/referral"; // Здесь должен быть твой реферальный линк
  const [friendCode, setFriendCode] = useState('');
  const [invitationSent, setInvitationSent] = useState(false);

  const handleShare = () => {
    alert('Ссылка на приглашение скопирована в буфер обмена!');
    navigator.clipboard.writeText(referralLink);
  };

  const handleInviteFriend = () => {
    setCoins((prevCoins) => prevCoins + 500); // Награда за приглашение
    alert('Вы получили 500 монет за приглашение друга!');
    setInvitationSent(true);
  };

  const handleFriendJoin = () => {
    setCoins((prevCoins) => prevCoins + 250); // Награда для приглашенного друга
    alert('Вы получили 250 монет за присоединение к приложению!');
  };

  return (
    <div>
      <h2>Invite Friends</h2>
      <p>Пригласите своих друзей и получайте бонусы!</p>
      <button onClick={handleShare}>Поделиться ссылкой</button>
      <p>Ваша реферальная ссылка: {referralLink}</p>
      
      <h3>Введите код приглашения</h3>
      <input
        type="text"
        placeholder="Введите код приглашения"
        value={friendCode}
        onChange={(e) => setFriendCode(e.target.value)}
      />
      <button onClick={handleInviteFriend} disabled={invitationSent}>
        Пригласить друга
      </button>
      {invitationSent && <p>Приглашение отправлено!</p>}
      <button onClick={handleFriendJoin}>
        Я присоединился по коду
      </button>
    </div>
  );
};

export default Friends;