import React, { useState } from 'react';

import ReactStars from 'react-rating-stars-component';

import './ListItem.scss';

const ListItem = ({ ...props }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { place } = props;

  return (
    <div className="list-item">
      <div className="list-item__image" style={{backgroundImage: `url(${place.icon})`}}></div>
      <div className="list-item__details">
        <p className="list-item__name">{place.name}</p>
        <div className="list-item__rating">
          <ReactStars
            count={5}
            edit={false}
            value={Math.round(place.rating)}
            size={16}
            activeColor="#ffd700"
          />
          <span className="list-item__rating-count">({place.user_ratings_total})</span>
        </div>
        <div>
          {place.price_level ? <span className="list-item__pricing">{getPriceLevel(place.price_level)}<span> &#183; </span></span> : ''}
          <span className="list-item__info">{place.vicinity}</span>
        </div>
        <button className={"list-item__favorite-icon" + (isSelected ? ' selected' : '')} onClick={() => setIsSelected(!isSelected)} />
      </div>
    </div>
  );
}

const getPriceLevel = (level) => {
  const dollars = ['', '$', '$$', '$$$', '$$$$', '$$$$$'];
  return dollars[level];
}

export default ListItem;