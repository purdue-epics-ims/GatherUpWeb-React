import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import '../../css/NavBar.css';

export default class DefaultNavBar extends Component {
  render() {
    return (
      <div className="navbar-fixed-top">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">GatherUp</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">Home</NavItem>
              <NavItem eventKey={2} href="./event">Event</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
