import React, { Fragment, useState, useEffect } from 'react';
import { GoogleMap , LoadScript, Marker } from '@react-google-maps/api';

import EstablishmentsService from './services/google_list_of_establishments';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);

  const { REACT_APP_GOOGLE_KEY } = process.env

  useEffect(() => {
    setCurrentLocation();
  }, [])

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      loadCoffeeShops();
      console.log()
    }, function(error) {
      alert("Habilite a localização para usar esse APP");
    }
    )
  }

  async function loadCoffeeShops() {
    const response = await EstablishmentsService.index(latitude, longitude);
    setLocations(response.data.results);
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_KEY}>
        <GoogleMap mapContainerStyle={{height: "100vh", width: "100%"}} zoom={15} center={{lat: latitude, lng: longitude}}>
          {
            locations.map((item, index) => {
              return (
                <Marker key={index} icon="/images/coffee-pin.png" title={item.name} animation="4" 
                  position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}>
                </Marker>
              )
            })
          }
          <Marker key="my location" icon="/images/my-location-pin.png" title="Seu local" animation="2" 
            position={{lat: latitude, lng: longitude}}>
          </Marker>
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;
