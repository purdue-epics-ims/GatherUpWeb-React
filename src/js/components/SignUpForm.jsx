import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import '../../css/SignInScreen.css';

class SignUpForm extends Component {
  state = {
    email: '',
    pass: '',
    checkpass: ''
  }

  handleSignUp(event) {
    if(this.state.checkpass === this.state.pass) { //checks if the initial password input matches the retyped password
      this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass) //function call to crete new authentication credentials and user
      .then((userdata) =>
      alert('Sign Up Successful'), //Notifies admin that the user has now been added
      this.props.firebase.auth().onAuthStateChanged(function() {window.location='/event';}) //redirects admin back to events pageX
      //**Note: possibly need to keep admin on signup page for multiple users. If so, need to add code to clear text fields once user has been added.

    ).catch(function(error){ //Error catcher
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode==='auth/email-already-in-use') {
        alert('Email already in use');
      } else {
        alert(errorMessage);
      }
      console.log(errorCode); //Development check
      console.log(errorMessage); //Development check
    });
  } else {
    alert('Passwords do not match'); //alerts user that the two text password text fields do not match each other
    console.log('Passwords don\'t match') //Development check
  }
}

  render() {
    return (
      <div className="sign-in-card">
        <h4>Sign Up</h4>

        <FormControl
          type="email"
          value={this.state.email}
          placeholder="Username"
          onChange={event => this.setState({email: event.target.value})}/>

        <FormControl
          type="password"
          value={this.state.pass}
          placeholder="Password"
          onChange={event => this.setState({pass: event.target.value})} />

        <FormControl
          type="password"
          value={this.state.checkpass}
          placeholder="Confirm Password"
          onChange={event => this.setState({checkpass: event.target.value})} />

        <Button onClick={this.handleSignUp.bind(this)}>
          Sign Up
        </Button>
      </div>
    );
  }
}

export default compose(
  firebaseConnect([
  ]),
  connect(
    ({ firebase }) => ({})
  )
)(SignUpForm)
