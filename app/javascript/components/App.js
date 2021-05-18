import React, { useState, useCallback, useRef } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import Header from './Header';
import ListItem from './ListItem';

import { useViewport, isMobile, markerHighlight } from '../utils';

import './App.scss';

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

const App = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { width } = useViewport();
  const breakpoint = 768;

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    // show nearby places on initial map load
    const request = {
      location: new google.maps.LatLng(center.lat, center.lng),
      radius: 50000,
      type: ['restaurant']
    };

    mapRef.current = map;

    const service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(request, (results, status) => {
      setMarkers(results);
    });

  }, []);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading Maps';

  const handleSearch = (val) => {
    // use text search to find places by input string
    const request = {
      query: `${val} san francisco`, // TODO: fix this workaround when location doesn't work :(
      location: new window.google.maps.LatLng(37.7749, -122.4194),
      radius: 50000,
      openNow: true,
      type: ['restaurant']
    };

    const service = new google.maps.places.PlacesService(mapRef.current);
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        setMarkers(results);
        mapRef.current.setCenter(results[0].geometry.location);
      }
    });
  }

  const handleSortClick = (sortDirection) => {
    console.log('Sort feature coming soon.');
    if (sortDirection === 'high') {
      const currentMarkers = markers.sort((a, b) => b.rating - a.rating);
      console.log('high to low', currentMarkers);
      setMarkers(currentMarkers);
    } else {
      const currentMarkers = markers.sort((a, b) => a.rating - b.rating);
      console.log('low to high', currentMarkers);
      setMarkers(currentMarkers);
    }
  }

  const handleCloseClick = () => {
    markerHighlight(markers, {})
    setSelected(null);
  }

  const handleToggleView = () => {
    setShowMap(!showMap);
  }

  return (
    <div className="app">
      <Header handleSearch={handleSearch} handleSortClick={handleSortClick} />
      <main className="app__body">
        {isMobile(width, breakpoint) && showMap ? '' : <div className="app__list-view">
          {markers.map((place) => <ListItem
            key={place.place_id}
            place={place}
            onMouseEnter={() => {
              markerHighlight(markers, place);
              setSelected(place);
            }}
            onMouseLeave={() => {
              markerHighlight(markers, {})
              setSelected(null)
            }}
            isSelected={selected}
          />)}
        </div>}
        <div className={`app__map-view ${isMobile(width, breakpoint) && !showMap ? ' hide' : ''}`}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            options={options}
            onLoad={onMapLoad}
          >
            {markers.map((marker, idx) => {
              return (<Marker
                  key={marker.place_id}
                  position={{ lat: marker.geometry.location.lat(), lng: marker.geometry.location.lng() }}
                  icon={{
                    path: "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z",
                    scale: 2,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(12, 2),
                    fillOpacity: 1,
                    fillColor: marker.highlight ? '#418A15' :'#999',
                    strokeColor: '#fff'
                  }}

                  onClick={() => {
                    markerHighlight(markers, marker);
                    setSelected(marker);
                  }}
                />
              )
            })}

            {selected ? (<InfoWindow position={{lat: selected.geometry.location.lat(), lng: selected.geometry.location.lng() }}  onCloseClick={handleCloseClick} >
                <ListItem place={selected} tooltip />
              </InfoWindow>) : ''}
          </GoogleMap>
        </div>
      </main>
      {isMobile(width, breakpoint) ? (
        <button className="app__toggle-view" onClick={handleToggleView}>
          {showMap ? 'List' : 'Map'}
        </button>
      ) : ''}
    </div>
  );
};

export default App;