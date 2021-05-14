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
      location: new window.google.maps.LatLng(center.lat, center.lng),
      radius: '500000',
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

  return (
    <div className="desktop">
      <Header />
      <div className="desktop__body">
        <div className="desktop__list-view">
          {markers.map((place, idx) => <ListItem
             key={idx}
             place={place}
             onMouseEnter={() => {
               setSelected(place);
             }}
             onMouseLeave={() => {
               setSelected(null);
             }}
             isSelected={selected}
          />)}
        </div>
        <div className="desktop__map-view">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
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