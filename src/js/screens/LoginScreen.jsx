import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';
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
	
	checkUser(event) {
		alert("Got to checking user");
		var user = firebaseApp.auth().currentUser;
		if (user !== null) {
			var uid = user.uid;
			if(uid !== "46b99fbe-1da8-4686-a8ac-bcf57d95b065" && uid !== "xx0smfho9LTsUmsRd4KIkVWrUP53") {
				alert("This is signing out")
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