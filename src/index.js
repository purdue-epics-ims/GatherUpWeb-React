import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import LoginScreen from './js/screens/LoginScreen.jsx';
import HomeScreen from './js/screens/HomeScreen.jsx';
import EventScreen from './js/screens/EventScreen.jsx';

// webpack-dev-server --progress --inline
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './css/index.css';

ReactDOM.render(
	<div>
		<Router history={browserHistory}>
			<Route path="/" component={EventScreen} />
		  <Route path="/login" component={LoginScreen} />
			<Route path="/home" component={HomeScreen} />
		</Router>
	</div>,
  document.getElementById('app')
);
