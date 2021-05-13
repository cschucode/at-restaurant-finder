import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img src="https://cdn-assets.alltrails.com/assets/shared/AT_Main_Logo-da354e8947c2636e86fb27f60cbb037b.png" alt="All Trails Logo" className="header__logo-image" />
        <span>at Lunch</span>
      </div>
      <div className="header__search">
        <button className="header__search-button">Filter</button>
        <input className="header__search-input" type="text" placeholder="Search for a restaurant" />
      </div>
    </div>
  )
}

export default Header;