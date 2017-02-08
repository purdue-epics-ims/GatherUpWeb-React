import React, { Component } from 'react';
import { Jumbotron, Grid, Col } from 'react-bootstrap';
import '../../css/App.css';

export default class EventScreen extends Component {
  render() {
    return (
      <div className="App">
				<Grid>
        <Col md={12} className="main-box">
					<h1>Add an Event</h1>
					<Col xs={12} md={6}>
						<form>
							<input type="text" placeholder="Name of the Event" />
							<input type="text" placeholder="mm/dd/yyyy" />
							<input type="text" placeholder="hh:mm" />
						</form>
					</Col>
					<Col xs={12} md={6}>
						<textarea type="text" placeholder="Description" />
					</Col>
				</Col>
				<Col md={12} className="main-box">
					<h1>Current List of Events</h1>
				</Col>
      </Grid>
		</div>
    );
  }
}
