import React, { Component } from 'react';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import favicon from '../../img/favicon.ico';
import '../../css/NavBar.css';

class DefaultNavBar extends Component {

  user = this.props.firebase.auth().currentUser;

  signOut() {
    console.log(this.user);
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
              <a><img alt="logo" src={favicon} /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown
              eventKey={1}
              title={this.user ? <div>{this.user.displayName}</div> : ''}
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
