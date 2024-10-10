// components/BottomButtons.js
import React from 'react';
import { Link } from 'react-router-dom';

const BottomButtons = () => {
  return (
    <div className="button-container">
      <Link to="/" className="button flex-fill mx-1">Home</Link>
      <Link to="/earn" className="button flex-fill mx-1">Earn</Link>
      <Link to="/boost" className="button flex-fill mx-1">Boost</Link>
      <Link to="/friends" className="button flex-fill mx-1">Friends</Link>
      <Link to="/airdrop" className="button flex-fill mx-1">Airdrop</Link>
    </div>
  );
};

export default BottomButtons;