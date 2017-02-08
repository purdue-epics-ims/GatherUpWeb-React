import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../css/NavBar.css';

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar-fixed-top">
				<Link to='/login'>Login</Link>
				<Link to="/">Home</Link>
				<Link to="/events">Events</Link>
      </div>
    );
  }
}
