import React, { Component } from 'react';
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import logo from '../../img/logo.png'
import '../../css/SignInScreen.css';

//Code for the Login Screen
class LoginScreen extends Component {
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
  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handlePass(event) {
    this.setState({pass: event.target.value})
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
    return ( //Some stuff that is not fully understood but totally works.
      <div className="App">

        <img className="sign-in-screen-logo" alt="Logo" src={logo} />

        <Row>
          <Col xs={12} sm={6} smOffset={3}>

            <Form className="card sign-in-card" horizontal>
              <h4>Sign In</h4>
              <FormControl type="email" value={this.state.email} placeholder="Username" onChange={this.handleEmail}/>
              <FormControl type="password" value={this.state.pass} placeholder="Password" onChange={this.handlePass} />
              <Button type="button" bsStyle="success" onClick={this.handleSubmitLogin}>
                Sign in
              </Button>
            </Form>

          </Col>
        </Row>
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
)(LoginScreen)
