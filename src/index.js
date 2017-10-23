import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'

import SignInScreen from './js/screens/SignInScreen.jsx';
import EventScreen from './js/screens/EventScreen.jsx';
import rootReducer from './js/redux/reducers/index';

// webpack-dev-server --progress --inline
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './css/index.css';


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvIT4NlusJ9YQ_LaxIU-sXBRqqU-8S9GI",
  authDomain: "gatherup-development.firebaseapp.com",
  databaseURL: "https://gatherup-development.firebaseio.com",
  projectId: "gatherup-development",
  storageBucket: "gatherup-development.appspot.com",
  messagingSenderId: "55208332478"
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, { userProfile: 'users' }),
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, {})

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={SignInScreen}/>
			<Route path="/event" component={EventScreen}/>
			<Route path="/signup" component={SignInScreen}/>
		</Router>
	</Provider>,
  document.getElementById('app')
);
