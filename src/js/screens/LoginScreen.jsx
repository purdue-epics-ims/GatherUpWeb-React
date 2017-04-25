import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';
import * as firebase from 'firebase';

//This is to configure firebase database. Should not be here. Delete once Redux has been implemented.
const firebaseConfig = {
  apiKey: "AIzaSyCvIT4NlusJ9YQ_LaxIU-sXBRqqU-8S9GI",
  authDomain: "gatherup-development.firebaseapp.com",
  databaseURL: "https://gatherup-development.firebaseio.com",
  projectId: "gatherup-development",
  storageBucket: "gatherup-development.appspot.com",
  messagingSenderId: "55208332478"
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'MainFirebase'); //allos for firebase calls using firebaseApp

//Code for the Login Screen
export default class LoginScreen extends Component {
  //used to set initial states and defines functions
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };

    this.handleEmail = this.handleEmail.bind(this); //Changes the state of email
    this.handlePass = this.handlePass.bind(this); //Changes the state of pass
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this); //Function that handles login function
    this.checkUser = this.checkUser.bind(this); //Authenticates the login credentials
  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handlePass(event) {
    this.setState({pass: event.target.value})
  }

  handleSubmitLogin(event) {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass) //function call for firebase logins with email and passwords
    .then(
      this.checkUser,

    ).catch(function(error) {
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

  checkUser(event) {
    var user = firebaseApp.auth().currentUser; //Saves the profile of the user trying to log in
    if (user !== null) {
      var uid = user.uid; //saves the Firebase generated, unique user id to uid
      console.log(uid); //development check
      if(uid !== "9gwVCt6ktCNDdrwUOjGdZrnsTtK2") { //Checks the logins id with the admins id
        alert("User does not have Admin permissions. Signing out user.") //Alerts logger that *insert preferred pronoun here* does not have proper credentials
        firebaseApp.auth().signOut() //call to sign out current user
        .then(function() {
          alert('Sign Out Successful')
          console.log(firebaseApp.auth().currentUser) //development check

        }, function(error) { //error output
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage); //Alerts user about the error type
          console.log = (errorCode); //development check
        });
      } else {
        alert("User Accepted")
        firebaseApp.auth().onAuthStateChanged(function() { //listener for a change os authentication
          window.location='/event'; //redirects user to events page after successful log in.
        })
      }
    }
  }
	
    render() {
    return ( //Some stuff that is not fully understood but totally works.
      <div className="App">
        <DefaultNavBar></DefaultNavBar>
        <Grid>
		
          <Form horizontal>
		  //Username
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="email" value={this.state.email} placeholder="Username" onChange={this.handleEmail}/>
              </Col>
            </FormGroup>
			//Password
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePass} />
              </Col>
            </FormGroup>
			//Submit Button
            <FormGroup>
              <Col sm={5}>
                <Button type="button" bsStyle="success" onClick={this.handleSubmitLogin}>
                  Sign in
                </Button>
              </Col>
            </FormGroup>
			
          </Form>
		  
        </Grid>
      </div>
    );
  }
}
