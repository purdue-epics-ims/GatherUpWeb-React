import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, FormGroup, ControlLabel, FormControl, Form, Button } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCvIT4NlusJ9YQ_LaxIU-sXBRqqU-8S9GI",
    authDomain: "gatherup-development.firebaseapp.com",
    databaseURL: "https://gatherup-development.firebaseio.com",
    projectId: "gatherup-development",
    storageBucket: "gatherup-development.appspot.com",
    messagingSenderId: "55208332478"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class SignUpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			checkpass: '',
		}
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleNewPassword = this.handleNewPassword.bind(this);
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
		if(this.state.checkpass === this.state.pass) {
			firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
			.then((userdata) =>
				alert('Sign Up Successful'),
				firebaseApp.auth().onAuthStateChanged(function() {window.location='/event';})
		
			).catch(function(error){
				var errorCode = error.code;
				var errorMessage = error.message;
				if(errorCode==='auth/email-already-in-use') {
					alert('Email already in use');
				} else {
					alert(errorMessage);
				}
				console.log(errorCode);
				console.log(errorMessage);
			});
		} else {
			alert('Passwords do not match');
			console.log('Passwords don\'t match')
		}
	}

	render() {
	return(
		<div>
			
			<Grid>
			<Form horizontal>
			
			<FormGroup>
				<Col componentClass={ControlLabel} sm={2}>
				Username
				</Col>
				<Col sm={10}>
					<FormControl type="email" value={this.state.email} placeholder="Email" onChange={this.handleEmail}/>
				</Col>
			</FormGroup>

			<FormGroup>
				<Col componentClass={ControlLabel} sm={2}>
				Password
				</Col>
				<Col sm={10}>
					<FormControl type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePassword}/>
				</Col>
			</FormGroup>
			
			<FormGroup>
				<Col componentClass={ControlLabel} sm={2}>
				Re-Type Password
				</Col>
				<Col sm={10}>
					<FormControl type="password" value={this.state.checkpass} placeholder="Re-Enter Password" onChange={this.handleNewPassword}/>
				</Col>
			</FormGroup>
			
			<FormGroup>
				<Col sm={5}>
					<Button type="button" bsStyle="info" onClick={this.handleSignUp}>
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