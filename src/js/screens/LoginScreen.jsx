import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../css/App.css';
import {Jumbotron} from 'react-bootstrap';

export default class LoginScreen extends Component {
  render() {
    return (
	<div className="LoginElements">
		<h1> Login </h1>
		<form>
			<input type="text" placeholder="email"/>
			<input type="text" placeholder="password"/>
		</form>
		<button>
			Login
		</button>
	</div>
    );
  }
}

