import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import LoginScreen from './js/screens/LoginScreen.jsx';
import HomeScreen from './js/screens/HomeScreen.jsx';
import EventScreen from './js/screens/EventScreen.jsx';
import * as firebase from 'firebase';

// webpack-dev-server --progress --inline
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './css/index.css';

const firebaseConfig = {
  apiKey: "AIzaSyBpBEVFlT7PpcPq3ZA_Yj0U6Lq1vQfvq0c",
  authDomain: "dazzling-inferno-9963.firebaseapp.com",
  databaseURL: "https://dazzling-inferno-9963.firebaseio.com",
  storageBucket: "gs://dazzling-inferno-9963.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'MainFirebase');

ReactDOM.render(
	<div>
		<Router history={browserHistory}>
			<Route path="/" component={LoginScreen} />
		  <Route path="/event" component={EventScreen} />
			<Route path="/home" component={HomeScreen} />
		</Router>
	</div>,
  document.getElementById('app')
);
