import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import Header from './Header';
import ListItem from './ListItem';

import './DesktopLayout.scss';

import mapPin from 'images/map_pin.svg';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const center = {
  lat: 37.7749,
  lng: -122.4194
}

const options = {
  disableDefaultUI: true,
  zoomControl: true
}

const DesktopLayout = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    const request = {
      location: new google.maps.LatLng(center.lat, center.lng),
      radius: 50000,
      type: ['restaurant']
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      setMarkers(results)
    });
    mapRef.current = map;
  }, [])

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  const handleOnMouseEnter = () => {
    console.log(this);
    setSelected(this);
  }

  const onMouseLeave = () => {
    setSelected(null);
  }

  const handleClick = (val) => {
    const request = {
      query: val + 'san francisco', // workaround when location doesn't work :(
      location: new window.google.maps.LatLng(37.7749, -122.4194),
      radius: 50000,
      openNow: true,
      type: ['restaurant']
    };

    const service = new google.maps.places.PlacesService(mapRef.current);
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setMarkers(results);
        console.log(results);
        mapRef.current.setCenter(results[0].geometry.location);
      }
    });
  }

  return (
    <div className="desktop">
      <Header handleClick={handleClick} />
      <div className="desktop__body">
        <div className="desktop__list-view">
          {markers.map((place) => <ListItem
             key={place.place_id}
             place={place}
             onMouseEnter={() => setSelected(place)}
             onMouseLeave={() => setSelected(null)}
             isSelected={selected}
          />)}
        </div>
        <div className="desktop__map-view">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => {
            return (<Marker
                key={marker.place_id}
                position={{ lat: marker.geometry.location.lat(), lng: marker.geometry.location.lng() }}
                icon={{
                  url: mapPin ,
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 0)
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            )
          })}

          {selected ? (<InfoWindow position={{lat: selected.geometry.location.lat(), lng: selected.geometry.location.lng() }}  onCloseClick={() => setSelected(null)} >
              <ListItem place={selected} tooltip />
            </InfoWindow>) : ''}
        </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default DesktopLayout;