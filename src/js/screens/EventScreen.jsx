import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import firebase from 'firebase';
import { connect } from 'react-redux';

import EventForm from '../components/EventForm';
import DefaultNavBar from '../components/NavBar.jsx';
import CurrentEventPanel from '../components/CurrentEventPanel.jsx';
import plus from '../../img/plus icon.svg';
import { setFirebase } from '../redux/actions'

class EventScreen extends Component {

	state = {
		showModal: false
	}

	componentWillMount() {
    if (!this.props.packages.firebase) {
			this.props.setFirebase(firebase.initializeApp({
		    apiKey: "AIzaSyCvIT4NlusJ9YQ_LaxIU-sXBRqqU-8S9GI",
		    authDomain: "gatherup-development.firebaseapp.com",
		    databaseURL: "https://gatherup-development.firebaseio.com",
		    projectId: "gatherup-development",
		    storageBucket: "gatherup-development.appspot.com",
		    messagingSenderId: "55208332478"
		  }));
		}
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

const mapStateToProps = state => {
  return {
    packages: state.packages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFirebase: firebase => dispatch(setFirebase(firebase)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
