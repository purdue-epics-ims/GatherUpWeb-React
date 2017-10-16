import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

import logo from '../../img/logo.png'
import '../../css/SignInScreen.css';

//Code for the Login Screen
export default class SignInScreen extends Component {

  state = {
    isShowSignIn: true
  }

  render() {
    return ( //Some stuff that is not fully understood but totally works.
      <div className="App">

        <img className="sign-in-screen-logo" alt="Logo" src={logo} />

        <div className="container-fluid">
          <Row>
            <Col xs={12} sm={6} smOffset={3}>

              <Form className="card" horizontal>
                {this.state.isShowSignIn ? <SignInForm /> : <SignUpForm />}
                <Button
                  className="sign-in-switch"
                  onClick={() => this.setState({isShowSignIn: !this.state.isShowSignIn})}>
                  {this.state.isShowSignIn ? "Don't have an account?" : "Sign in instead"}
                </Button>
              </Form>

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
