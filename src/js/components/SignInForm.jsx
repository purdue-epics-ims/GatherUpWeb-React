import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

import '../../css/SignInScreen.css';

class SignInForm extends Component {
  state = {
    email: '',
    pass: ''
  }

  handleSubmitLogin(event) {
    this.props.packages.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass) //function call for firebase logins with email and passwords
    .then(user => {
      if (user !== null) {
        let email = user.email.substring(0, user.email.indexOf('@'));
        user = user.uid ? user.uid : user; // sometimes user would be an object, sometimes it would be a string, but all we need is the uid
        if(user !== "9gwVCt6ktCNDdrwUOjGdZrnsTtK2") { //Checks the logins id with the admins id
          alert("User does not have Admin permissions. Signing out user.") //Alerts logger that *insert preferred pronoun here* does not have proper credentials
          this.props.firebase.logout() //call to sign out current user
          .then(function() {
            alert('Sign Out Successful')
          }, function(error) { //error output
            var errorMessage = error.message;
            alert(errorMessage); //Alerts user about the error type
          });
        } else {
          alert("User Accepted")
          console.log(user);
          this.props.userLogin(user);
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
      <div className="input-card">
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
          Sign In
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.packages
  }
}
const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => dispatch(userLogin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
