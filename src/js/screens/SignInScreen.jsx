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

export default class SignUpScreen extends Component {
	constructor {
		super(props);
		this.state = {
			email: '',
			pass: '',
			checkpass: '',
			user: '',
		}
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleEmail = this.handleSignUp.bind(this);
		this.handlePasswords = this.handlePasswords.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	
	handleEmail(event) {
		this.setState({email: event.target.value})
	}
	
	handlePass(event) {
		this.setState({pass: event.target.psswrd})
		this.setState({checkpass: event.target.chkpss})
	}
	
	handleSubmitSignup(event) {
		if(this.state.checkpass === this.state.pass) {
			firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.chckpass)
			.then((userdata) =>
			alert('Sign Up Successful'),
			this.setState({pass: this.state.chckpass}),
			this.handleSubmitLogin,
		
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
	
	pageChange(event) {
		window.location='/event'
	}
	
	render() {
	return(
		<div className="SignUp">
			<DefaultNavBar/>
			<Grid>
			<Form horizontal>
			<FormGroup controlId="Username">
				<Col componentClass={ControlLabel} sm={2}>
				Username
				</Col>
				<Col sm={10}>
					<FormControl type="email" username={this.state.email} placeholder="Email" onChange={this.handleEmail}/>
				</Col>
			</FormGroup>
			
			<Form horizontal>
			<FormGroup controlId="Username">
				<Col componentClass={ControlLabel} sm={2}>
				Username
				</Col>
				<Col sm={10}>
					<FormControl type="password" psswrd={this.state.pass} placeholder="Passwords" onChange={this.handlePasswords}/>
				</Col>
			</FormGroup>
			
			<FormGroup controlId="Username">
				<Col componentClass={ControlLabel} sm={2}>
				Username
				</Col>
				<Col sm={10}>
					<FormControl type="password" chkpss={this.state.checkpass} placeholder="Re-Enter Pssword" onChange={this.handlePasswords}/>
				</Col>
			</FormGroup>
			
		
	);
}
}