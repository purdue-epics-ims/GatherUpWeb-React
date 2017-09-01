import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import AddEventPanel from '../../js/components/AddEventPanel.jsx';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import CurrentEventPanel from '../../js/components/CurrentEventPanel.jsx';
import '../../css/App.css';

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
