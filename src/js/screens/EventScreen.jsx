import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AddEventForm from '../components/AddEventForm';
import DefaultNavBar from '../components/NavBar.jsx';
import CurrentEventPanel from '../components/CurrentEventPanel.jsx';
import plus from '../../img/plus icon.svg';

class EventScreen extends Component {

	state = {
		showModal: false
	}

	handleOpenModal () {
		this.setState({ showModal: true });
		console.log(this.props.firebase);
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<div className="event-screen">
				<DefaultNavBar></DefaultNavBar>
				<div className="container">
					<Row>
						<Col xs={12} sm={10} smOffset={1}>
							<Modal show={this.state.showModal} onHide={this.handleCloseModal.bind(this)}>
								<Modal.Header closeButton>
									<Modal.Title>Create New Event</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<AddEventForm></AddEventForm>
								</Modal.Body>
							</Modal>
							<CurrentEventPanel></CurrentEventPanel>
						</Col>
					</Row>
				</div>
				<Button className="event-fab" onClick={this.handleOpenModal.bind(this)}>
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
