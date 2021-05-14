import React, { useState, useRef } from 'react';

import PlacesAutocomplete from './PlacesAutocomplete';

import './Header.scss';

const Header = ({ ...props }) => {
  const { handleSearch } = props;
  const [value, setValue] = useState('');

  return (
    <div className="header">
      <div className="header__logo">
        <img src="https://cdn-assets.alltrails.com/assets/shared/AT_Main_Logo-da354e8947c2636e86fb27f60cbb037b.png" alt="All Trails Logo" className="header__logo-image" />
        <span>at Lunch</span>
      </div>
      <div className="header__search">
        <button className="header__filter-btn">Filter</button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value);
              setValue('');
            }
          }}
          className="header__search-input"
          placeholder="Search for a restaurant" />
        <button className='header__search-btn' onClick={() => {
          handleSearch(value);
          setValue('');
        }} ></button>
      </div>
    </div>
  )
}

export default Header;