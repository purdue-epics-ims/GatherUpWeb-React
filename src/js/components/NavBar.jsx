import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import logo from '../../img/logo.png';

class NavigationBar extends Component {
  signOut() {
    console.log(this.props.firebase);
  }

  render() {
    return (
      <Navbar className="dark-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <img alt="logo" src={logo} />
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown
            eventKey={1}
            title={`Hi,!`}
            id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)} >Sign out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default compose(
  firebaseConnect([
  ]),
  connect(
    ({ firebase }) => ({})
  )
)(NavigationBar)
