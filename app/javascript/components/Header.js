import React, { useState, useRef } from 'react';

import './Header.scss';

const Header = ({ ...props }) => {
  const { handleSearch, handleSortClick } = props;
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false); // TODO:  sort feature
  const [sortValue, setSortValue] = useState('high'); // TODO: sort feature

  return (
    <div className="header">
      <div className="header__logo">
        <img src="https://cdn-assets.alltrails.com/assets/shared/AT_Main_Logo-da354e8947c2636e86fb27f60cbb037b.png" alt="All Trails Logo" className="header__logo-image" />
        <span>at Lunch</span>
      </div>
      <div className="header__search">
        <div className="header__sort">
          <button className="header__sort-btn" onClick={() => setShowModal(true)}>Sort</button>
          {showModal ? (<div className="header__sort-modal" onMouseLeave={() => setShowModal(false)}>
              <input type="radio" id="high" name="rating-group" value="high" onClick={(e) => setSortValue(e.target.value)} /><label htmlFor="high">Ratings high to low</label><br />
              <input type="radio" id="low" name="rating-group" value="low" onClick={(e) => setSortValue(e.target.value)} /><label htmlFor="low">Ratings low to high</label><br />
              <button className="header__apply-btn" onClick={(e) => {
                handleSortClick(sortValue);
                setShowModal(false);
              }} disabled>Comming Soon</button>
            </div>) : ''}
        </div>
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