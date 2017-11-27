import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { userLogout } from '../redux/actions';

import logo from '../../img/logo.png';

class NavigationBar extends Component {
  state = {
    username: ''
  }

  componentDidMount() {
    // Using onAuthStateChanged() to get currentUser because
    // firebase.auth().currentUser could be null
    this.props.packages.firebase.auth().onAuthStateChanged(user => {
      if (user.email) {
        this.setState({
          username: user.email.substring(0, user.email.indexOf('@'))
        })
      }
    })
  }

  signOut() {
    this.props.packages.firebase.auth().signOut().then(() => {
      window.location='/'; //redirects user to login page after successful log out.
    });
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
            title={`Hi, ${this.state.username}!`}
            id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} onClick={this.signOut.bind(this)} >Sign out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    packages: state.packages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
