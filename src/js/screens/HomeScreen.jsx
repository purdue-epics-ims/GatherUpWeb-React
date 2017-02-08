import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../css/App.css';

export default class HomeScreen extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>GatherUp Home Screen</h2>
					<img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To modify this screen, edit <code>js/screens/HomeScreen.jsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
