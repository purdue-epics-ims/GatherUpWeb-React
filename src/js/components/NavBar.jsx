import React, { Component } from 'react';
import Link from 'react-router';

class LoginScreen extends Component {
	goToLogin() {

	}
	goHome() {

	}
	goToEvents() {

	}
  render() {
    return (
      <div className="App">
				<Link to='/'>Home</Link>
				<Link to=''></Link>
				<Link to=''>Logout</Link>
      </div>
    );
  }
}

export default LoginScreen;
