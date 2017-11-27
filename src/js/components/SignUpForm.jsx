import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';


import '../../css/SignInScreen.css';

class SignUpForm extends Component {
  state = {
    email: '',
    pass: '',
    checkpass: ''
  }

  handleSignUp(event) {
    if(this.state.checkpass === this.state.pass) { //checks if the initial password input matches the retyped password
      this.props.packages.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((userdata) => {
          console.log(userdata);
          alert('Sign Up Successful'); //Notifies admin that the user has now been added
          window.location='/event';
      }).catch(function(error){ //Error catcher
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
  return (
    <div className="input-card">
      <h4>Sign Up</h4>

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

      <FormControl
        type="password"
        value={this.state.checkpass}
        placeholder="Confirm Password"
        onChange={event => this.setState({checkpass: event.target.value})} />

      <Button onClick={this.handleSignUp.bind(this)}>
        Sign Up
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
    export default connect(mapStateToProps)(SignUpForm)
