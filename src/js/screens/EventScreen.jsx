import React, { Component } from 'react';
import { Grid, Col, FormGroup, FormControl, Button, ControlLabel, Form, Modal } from 'react-bootstrap';
import {firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AddEventPanel from '../../js/components/AddEventPanel.jsx';
//TODO: Is it best practice to go to /js folder?
import AddEventForm from '../components/AddEventForm';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import CurrentEventPanel from '../../js/components/CurrentEventPanel.jsx';
import '../../css/App.css';

class EventScreen extends Component {

	constructor () {
		super();
		this.state = {
			showModal: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
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
			<div className="App">
				<DefaultNavBar></DefaultNavBar>
				<Grid>
					{/* TODO: How to split up Modal and Button? Need to or not? */}
					<Button onClick={this.handleOpenModal}>Add Event</Button>
					{/* TODO: Ask about onHide? */}
					<Modal show={this.state.showModal} onHide={this.state.handleCloseModal}>
						<Modal.Header closeButton>
							<Modal.Title>Modal Title</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<AddEventForm></AddEventForm>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.handleCloseModal}>Submit</Button>
						</Modal.Footer>
					</Modal>
					<AddEventPanel></AddEventPanel>
					<CurrentEventPanel></CurrentEventPanel>
				</Grid>
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
