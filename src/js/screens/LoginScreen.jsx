import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, Table, Panel, FormGroup, ControlLabel, FormControl, Button, Form, ButtonGroup, ButtonToolbar, Checkbox } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBpBEVFlT7PpcPq3ZA_Yj0U6Lq1vQfvq0c",
  authDomain: "dazzling-inferno-9963.firebaseapp.com",
  databaseURL: "https://dazzling-inferno-9963.firebaseio.com",
  storageBucket: "gs://dazzling-inferno-9963.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'MainFirebase');

export default class LoginScreen extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
		  email: '',
		  pass: '',	
		  chckpass: '',
	  };
	  
	  this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
	  this.handleEmail = this.handleEmail.bind(this);
	  this.handlePass = this.handlePass.bind(this);
	  this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
	  this.handleCheckPass = this.handleCheckPass.bind(this);
  }
	  
  handleEmail(event) {
	  this.setState({email: event.target.value})
  }
  
  handlePass(event) {
	  this.setState({pass: event.target.value})
  }
  
  handleCheckPass(event) {
	  this.setState({chckpass: event.target.value})
  }
  
  handleSubmitLogin(event) {
	  firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
	  .then((userdata) =>
		alert('Successful'),
		
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
  
  handleSubmitSignup(event) {
	if(this.state.chckpass === this.state.pass) {
	  firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
	   .then((userdata) =>
	   alert('Successful'),
		
	  ).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		if(errorCode==='auth/email-already-in-use') {
			alert('Email already in use');
		} else {
			alert(errorMessage);
		}
		console.log(errorCode);
	  });
	} else {
		alert('Passwords do not match');
		console.log('Passwords don\'t match')
	}
  }
  
  render() {
  return (
	<div>
		<div>
		  <form>
		  <Col sm={2}>
		  <label>
		  Email:
			<input type="text" value={this.state.email}  placeholder="Email" onChange={this.handleEmail}></input>
		  </label>
		  </Col>
		  </form>
		  
		  <form>
		  <Col sm={2}>
		  <label>
		  Password:
			<input type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePass}></input>
		  </label>
		  </Col>
		  </form>
		  
		  <ButtonToolbar>
			<Button type="submit" bsStyle="info" onClick={this.handleSubmitLogin}>Login</Button>
		  </ButtonToolbar>
		</div>

		<div>
		  <form>
		  <Col sm={2}>
		  <label>
		  Email:
			<input type="text" value={this.state.email}  placeholder="Email" onChange={this.handleEmail}></input>
		  </label>
		  </Col>
		  </form>
		  
		  <form>
		  <Col sm={2}>
		  <label>
		  Password:
			<input type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePass}></input>
			<input type="password" value={this.state.chckpass} placeholder="RetypePassword" onChange={this.handleCheckPass}/>
		  </label>
		  </Col>
		  </form>
		  
		  <ButtonToolbar>
			<Button type="submit" bsStyle="success" onClick={this.handleSubmitSignup}>Signup</Button>
		  </ButtonToolbar>
		</div>
	</div>

	);
}
}

/*export class LoginElements extends Component {
    render() {
    return (
      <div className="App">
	  <div>
        <DefaultNavBar></DefaultNavBar>
        <Grid>
          <Form horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={5}>
                <Button type="submit">
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

  export class SignUpElements extends Component {
	render() {
	return(
	<div>
        <Grid>
          <Form horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={5}>
                <Button id="btnSignUp" type="submit">
                  Sign Up
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Grid>
	</div>
	);
	}
  }*/
  