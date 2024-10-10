// src/pages/Home.js
import React from 'react';

function Home({ coins, timeSpent }) {
  return (
    <div>
      <h2>Home</h2>
      <p>Stay AFK to earn coins!</p>
      <p>Time spent in the app: {timeSpent} seconds</p>
      <p>Coins earned: {coins}</p>
    </div>
  );
}

export default Home;