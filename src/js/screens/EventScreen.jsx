import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import EventForm from '../components/EventForm';
import DefaultNavBar from '../components/NavBar.jsx';
import CurrentEventPanel from '../components/CurrentEventPanel.jsx';
import plus from '../../img/plus icon.svg';

class EventScreen extends Component {

	state = {
		showModal: false
	}

	render() {
		return (
			<div className="event-screen">
				<DefaultNavBar></DefaultNavBar>
				<div className="container">
					<Row>
						<Col xs={12} sm={10} smOffset={1}>
							<Modal className="event-add-modal" show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
								<Modal.Body>
									<EventForm title="Create New Event" />
								</Modal.Body>
							</Modal>
							<CurrentEventPanel></CurrentEventPanel>
						</Col>
					</Row>
				</div>
				<Button className="event-fab" onClick={() => this.setState({ showModal: true })}>
					<img className="event-fab-icon" alt="Add Event" src={plus} />
				</Button>
			</div>
		);
	}
}

export default compose(
	firebaseConnect([
	]),
	connect(
		({ firebase }) => ({})
	)
)(EventScreen)
