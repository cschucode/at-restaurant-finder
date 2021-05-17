import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';
import { useCookies } from 'react-cookie';

import { getPriceLevel, truncateText } from '../utils';

import './ListItem.scss';

const ListItem = ({ ...props }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isFavorite, setIsFavorite] = useState(false)
  const { place, tooltip, onMouseEnter, onMouseLeave, isSelected } = props;

  // update cookie and set is favorite
  const handleClick = (id) => {
    if (cookies[id]) {
      removeCookie(id);
      setIsFavorite(false);
    } else {
      setCookie(id, true);
      setIsFavorite(true);
    }
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={'list-item' + (tooltip ? ' tool-tip' : '') + (isSelected ? ' selected' : '')} >
      <div className="list-item__image" style={{backgroundImage: `url(${place.photos[0].getUrl()})`}}></div>
      <div className="list-item__details">
        <p className="list-item__name">{place.name}</p>
        <div className="list-item__rating">
          <ReactStars
            count={5}
            edit={false}
            value={Math.round(place.rating)}
            size={tooltip ? 12 : 14}
            activeColor="#ffd700"
          />
          <span className="list-item__rating-count">({place.user_ratings_total})</span>
        </div>
        <div>
          {place.price_level ? <span className="list-item__pricing">{getPriceLevel(place.price_level)}<span> &#183; </span></span> : ''}
          <span className="list-item__info">{truncateText(place.vicinity || place.formatted_address)}</span>
        </div>
        <button className={"list-item__favorite-icon" + (isFavorite || cookies[place.place_id] === 'true' ? ' favorite' : '')} onClick={() => handleClick(place.place_id)}/>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  place: PropTypes.shape({
    place_id: PropTypes.string.isRequired,
    photos: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    user_ratings_total: PropTypes.number.isRequired,
    price_level: PropTypes.number,
    vicinity: PropTypes.string,
    formatted_address: PropTypes.string
  }),
  tooltip: PropTypes.bool,
};

export default ListItem;