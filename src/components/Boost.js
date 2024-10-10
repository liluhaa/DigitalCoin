import React from 'react';

const Boost = ({ level, nextLevelCost, handleLevelUp }) => {
  return (
    <div>
      <h2>Улучшение уровня</h2>
      <p>Ваш уровень: {level}</p>
      <p>Стоимость следующего уровня: {nextLevelCost} монет</p>
      <button onClick={handleLevelUp} className="btn btn-primary">
        Улучшить уровень
      </button>
      <p>Улучшите свои способности, чтобы зарабатывать больше монет!</p>
    </div>
  );
};

export default Boost;