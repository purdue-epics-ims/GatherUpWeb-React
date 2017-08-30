import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import AddEventPanel from '../../js/components/AddEventPanel.jsx';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import CurrentEventPanel from '../../js/components/CurrentEventPanel.jsx';
import '../../css/App.css';

// const firebaseConfig = {
//   apiKey: "AIzaSyCvIT4NlusJ9YQ_LaxIU-sXBRqqU-8S9GI",
//   authDomain: "gatherup-development.firebaseapp.com",
//   databaseURL: "https://gatherup-development.firebaseio.com",
//   projectId: "gatherup-development",
//   storageBucket: "gatherup-development.appspot.com",
//   messagingSenderId: "55208332478"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig, 'Firebase');

export default class EventScreen extends Component {
	render() {
    return (
      <div className="App">
        <DefaultNavBar></DefaultNavBar>
        <Grid>
          <AddEventPanel></AddEventPanel>
          <CurrentEventPanel></CurrentEventPanel>
        </Grid>
      </div>
    );
  }
}
