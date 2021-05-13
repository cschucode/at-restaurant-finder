import React, { useState, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader"

import Header from './Header';
import ListItem from './ListItem';

import './DesktopLayout.scss';

const DesktopLayout = () => {
  const [places, setPlaces] = useState([]);

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ['places'],
  });

  useEffect(() => {
    loader.load().then(() => {
      const SF = new google.maps.LatLng(37.7749, -122.4194); // center of SF
      const map = new google.maps.Map(document.getElementById("map"), {
        center: SF,
        zoom: 14,
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
          setPlaces(results);
          console.log(results);
          results.forEach((place) => {
            const infowindow = new google.maps.InfoWindow({
              content: '<div>Info Window</div>',
            });
            const marker = new google.maps.Marker({
              position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
              map: map,
              title: place.name,
            });

            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });
          })
        }
      });
    });
  }, [])

  return (
    <div className="desktop">
      <Header />
      <div className="desktop__body">
        <div className="desktop__list-view">
          {places.map((place, idx) => <ListItem key={idx} place={place}/>)}
        </div>
        <div id="map" className="desktop__map-view"></div>
      </div>
    </div>
  );
}

export default DesktopLayout;