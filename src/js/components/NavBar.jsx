import React, { Component } from 'react';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import logo from '../../img/logo.png';
import '../../css/NavBar.css';

var user = this.props.firebase.auth().currentUser;

class DefaultNavBar extends Component {

  signOut() {
    this.props.firebase.auth().signOut().then(function() {
      console.log("Signed Out");
    }, function(error) {
      console.error('Sign Our Error', error);
    });
  }

  render() {
    return (
      <div className="navbar-fixed-top">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a><img alt="logo" src={logo} /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown
              eventKey={1}
              title={user ? <div>{user.displayName}</div> : ''}
              id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)} >Sign out</MenuItem>
            </NavDropdown>
            </Nav>
          </Navbar>
        </div>
      );
    }
}


export default compose(
  firebaseConnect([]),
  connect(
    ({ firebase }) => ({})
  )
)(DefaultNavBar)
