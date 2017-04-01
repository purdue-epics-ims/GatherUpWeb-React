import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';
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
const firebaseApp = firebase.initializeApp(firebaseConfig, 'MainFirebase');

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
		};
		
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
		this.checkUser = this.checkUser.bind(this);
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
		var user = firebaseApp.auth().currentUser;
		if (user !== null) {
			var uid = user.uid;
			console.log(uid);
			if(uid !== "46b99fbe-1da8-4686-a8ac-bcf57d95b065" && uid !== "xx0smfho9LTsUmsRd4KIkVWrUP53") {
				alert("User does not have Admin permissions. Signing out user.")
				firebaseApp.auth().signOut()
				.then(function() {
					alert('Sign Out Successful')
					console.log(firebaseApp.auth().currentUser)
					
				}, function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					alert(errorMessage);
					console.log = (errorCode);
				});
			} else {
				alert("User Accepted")
				firebaseApp.auth().onAuthStateChanged(function() {
					window.location='/event';
				})
			}
		}
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