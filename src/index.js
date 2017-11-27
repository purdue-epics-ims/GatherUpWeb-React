import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import SignInScreen from './js/screens/SignInScreen.jsx';
import EventScreen from './js/screens/EventScreen.jsx';
import rootReducer from './js/redux/reducers/index';

// webpack-dev-server --progress --inline
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './css/index.css';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

// Create store with reducers and initial state
const store = createStore(rootReducer, applyMiddleware(promiseMiddleware(), thunk, ...middlewares));

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
