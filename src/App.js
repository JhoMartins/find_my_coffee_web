import React, { Fragment } from 'react';
import { GoogleMap , LoadScript } from '@react-google-maps/api';

function App() {
  const { REACT_APP_GOOGLE_KEY } = process.env

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_KEY}>
        <GoogleMap mapContainerStyle={{height: "100vh", width: "100%"}} zoom={15} center={{lat: -22.773982, lng: -47.4160998}}>

        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;
