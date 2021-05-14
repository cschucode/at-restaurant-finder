import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Loader } from "@googlemaps/js-api-loader"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import usePlacesAutoComplete, {
  getGeoCode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css';

import Header from './Header';
import ListItem from './ListItem';

import './DesktopLayout.scss';

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

  // const onMapClick = useCallback((event) => {
  //   setMarkers((current) => [
  //     ...current,
  //      {
  //        lat: event.latLng.lat(),
  //        lng: event.latLng.lng(),
  //        time: new Date()
  //      }
  //   ])
  // }, []);

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

  return (
    <div className="desktop">
      <Header />
      <div className="desktop__body">
        <div className="desktop__list-view">
          {markers.map((place, idx) => <ListItem key={idx} place={place}/>)}
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