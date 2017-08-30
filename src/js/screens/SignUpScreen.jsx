import React, { Component } from 'react';
import { Grid, Col, FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase';
import '../../css/App.css';

//Code for SignUp Screen. Possibly rename to Add User
class SignUpScreen extends Component {
  //used to set initial states and defines functions
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      checkpass: '',
    }
    this.handleSignUp = this.handleSignUp.bind(this); //Fuction to add user to Firebase Database
    this.handleEmail = this.handleEmail.bind(this); //Function to change state of email
    this.handlePassword = this.handlePassword.bind(this); //Function to change state of pass
    this.handleNewPassword = this.handleNewPassword.bind(this); //Function to change state of checkpass
  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handlePassword(event) {
    this.setState({pass: event.target.value})
  }

  handleNewPassword(event) {
    this.setState({checkpass: event.target.value})
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
  return( //Some stuff that is not fully understood but totally works. May need to change the look for more pleasant aesthetics
    <div>

      <Grid>
        <Form horizontal>
		      {/* Username */}
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl type="email" value={this.state.email} placeholder="Email" onChange={this.handleEmail}/>
            </Col>
          </FormGroup>
		      {/* Passwrod */}
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePassword}/>
            </Col>
          </FormGroup>
		      {/* Confirm Password */}
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Confirm Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" value={this.state.checkpass} placeholder="Re-Enter Password" onChange={this.handleNewPassword}/>
            </Col>
          </FormGroup>
		      {/* Signup Button */}
          <FormGroup>
            <Col sm={5}>
              <Button type="button" bsStyle="info" onClick={this.handleSignUp}>
                Sign Up
              </Button>
            </Col>
          </FormGroup>

        </Form>
      </Grid>
    </div>

  );
}
}


export default compose(
  firebaseConnect([
  ]),
  connect(
    ({ firebase }) => ({ // state.firebase
      auth: pathToJS(firebase, 'auth')
    })
  )
)(SignUpScreen)
