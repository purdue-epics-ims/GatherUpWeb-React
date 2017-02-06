import React, { Component } from 'react';

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
				<a onClick={this.goToLogin.bind(this)}></a>
				<a onClick={this.goHome.bind(this)}></a>
				<a onClick={this.goToEvents.bind(this)}></a>
      </div>
    );
  }
}

export default LoginScreen;
