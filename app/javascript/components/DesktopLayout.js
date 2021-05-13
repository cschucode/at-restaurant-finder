import React, { useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader"

import Header from './Header';

import './DesktopLayout.scss';

const DesktopLayout = () => {
  const [places, setPlaces] = useState([]);

  console.log(places);

  const additionalOptions = {
    libraries: ['places']
  };

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    ...additionalOptions,
  });

  loader.load().then(() => {
    const SF = new google.maps.LatLng(37.7749, -122.4194);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: SF, // center of SF
      zoom: 10,
      disableDefaultUI: true,
    });

    const request = {
      location: SF,
      radius: 500 * 1000,
      type: ['restaurant']
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // for (var i = 0; i < results.length; i++) {
        //   createMarker(results[i]);
        // }
        setPlaces(results);
      }
    });
  });

  return (
    <div className="desktop">
      <Header />
      <div className="desktop__body">
        <div className="desktop__list-view">
          {places.map(place => <div>{place.name}</div>)}
        </div>
        <div id="map" className="desktop__map-view">Map View</div>
      </div>
    </div>
  );
}

export default DesktopLayout;