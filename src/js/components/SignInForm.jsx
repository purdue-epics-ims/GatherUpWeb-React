import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import '../../css/SignInScreen.css';

class SignInForm extends Component {
  state = {
    email: '',
    pass: ''
  }

  handleSubmitLogin(event) {
    this.props.firebase.login({email: this.state.email, password: this.state.pass}) //function call for firebase logins with email and passwords
    .then((uid, user) => {
      if (user !== null) {
        if(uid !== "9gwVCt6ktCNDdrwUOjGdZrnsTtK2") { //Checks the logins id with the admins id
          alert("User does not have Admin permissions. Signing out user.") //Alerts logger that *insert preferred pronoun here* does not have proper credentials
          this.props.firebase.logout() //call to sign out current user
          .then(function() {
            alert('Sign Out Successful')
            console.log(this.props.auth.currentUser) //development check

          }, function(error) { //error output
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage); //Alerts user about the error type
            console.log = (errorCode); //development check
          });
        } else {
          alert("User Accepted")
          window.location='/event'; //redirects user to events page after successful log in.
        }
      }
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode==='auth/user-not-found'){
        alert('User not found');
      } else {
        alert(errorMessage);
      }
      console.log(errorCode);
    });
  }

  render() {
    return (
      <div className="sign-in-card">
        <h4>Sign In</h4>

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

        <Button onClick={this.handleSubmitLogin.bind(this)}>
          Sign in
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
)(SignInForm)
