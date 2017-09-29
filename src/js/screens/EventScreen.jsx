import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Col, FormGroup, FormControl, Button, ControlLabel, Form } from 'react-bootstrap';
import AddEventPanel from '../../js/components/AddEventPanel.jsx';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import CurrentEventPanel from '../../js/components/CurrentEventPanel.jsx';
import ReactModal from 'react-modal';
import {firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
	  }

	  handleCloseModal () {
	    this.setState({ showModal: false });
	  }

	render() {
    return (
      <div className="App">
        <DefaultNavBar></DefaultNavBar>
        <Grid>
					<button onClick={this.handleOpenModal}>Add Event</button>
						 <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
							 <div><Col md={12} className="main-box">
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
							 </Col></div>
							 <button onClick={this.handleCloseModal}>Submit</button>
						 </ReactModal>
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
