import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, Table, Panel, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBpBEVFlT7PpcPq3ZA_Yj0U6Lq1vQfvq0c",
    authDomain: "dazzling-inferno-9963.firebaseapp.com",
    databaseURL: "https://dazzling-inferno-9963.firebaseio.com",
    storageBucket: "dazzling-inferno-9963.appspot.com",
    messagingSenderId: "1046404833099"
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'MainFirebase');

export default class LoginScreen extends Component {
		constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			user: '',
		};
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
		this.userChange = this.userChange.bind(this);
	}
	
	handleEmail(event) {
		this.setState({email: event.target.value})
	}
	
	handlePass(event) {
		this.setState({pass: event.target.value})
	}
	
  handleSubmitLogin(event) {
	  firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
	  .then(
		this.userChange,
		console.log("User Logged in"),
		
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
	
	userChange(event) {
		firebaseApp.auth().onAuthStateChanged(function(currentUser) {
			window.location = '/event';
			alert("State Change");
		})
	}
	
    render() {
    return (
      <div className="App">
        <DefaultNavBar></DefaultNavBar>
        <Grid>
          <Form horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="email" value={this.state.email} placeholder="Username" onChange={this.handleEmail}/>
			  </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
			  <FormControl type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePass} />
              </Col>
            </FormGroup>

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