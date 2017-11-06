import React, { Component } from 'react';
import { Table, Panel, Button, ButtonGroup, ButtonToolbar, Glyphicon, Modal, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import EventForm from './EventForm';

class CurrentEventPanel extends Component {

  constructor(args) {
    super(args);
    this.state = {
      open: true,
      events: {},
      showModal: false,
      eventToModify: null,
      eventIdToModify: null
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.generateCSVEvent = this.generateCSVEvent.bind(this);
  }

  componentDidMount(){
    this.props.firebase.database().ref('event').once('value', (snapshot) => {
      this.setState({events: snapshot.val()});
    });
  }

  deleteEvent(key) {
    this.props.firebase.database().ref('event').child(key).remove();
  }

  updateEvent(eventIdToModify, eventToModify) {
    this.setState({ showModal: true, eventToModify, eventIdToModify });
  }

  generateCSVEvent(id, event) {
    this.props.firebase.database().ref('event/' + id +'/attendees').once("value", snapshot => {
      if (snapshot.numChildren() === 0) {
        window.alert('No data to download');
        return;
      }

      let res = snapshot.val();
      let csv = 'puid,firstname,lastname,email,domestic/int,year\n';

      Object.keys(res).map((key, index) => {
        csv += res[key].puid + ","
        + res[key].firstname + ","
        + res[key].lastname+","
        + res[key].email + ","
        + res[key].intstatus + ","
        + res[key].year + '\n';
        return null;
      })

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }

      let link = document.createElement('a');
      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', event.name + '.csv');
      link.click();
    });
  };

  render() {
    const { events } = this.state;
    let event = {};
    var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h4>Current Events</h4></div>;
    var foot = null;
    var style = "primary"

    return (
      <div>
        <Modal className="event-add-modal"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}>
          <Modal.Body>
            <EventForm title="Modify Event" event={this.state.eventToModify} eventId={this.state.eventIdToModify} />
          </Modal.Body>
        </Modal>
		
		{/*<Panel collapsible header={head} footer={foot} bsStyle={style} expanded={this.state.open}>
          <Table fill bordered condensed hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(events).map((key, index) => {
                event = events[key];
                return(
                  <tr key={key}>
                    <td>{new Date(event.dateID).toDateString()}.</td>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="small">
                          <Button type="button" bsStyle="info" onClick={() => this.generateCSVEvent(key, event)}><Glyphicon glyph="arrow-down" /> CSV</Button>
                          <Button type="button" bsStyle="danger" onClick={()=>this.deleteEvent(key)}><Glyphicon glyph="remove" /> Delete</Button>
                          <Button bsStyle="success" onClick={() => this.updateEvent(key, event)}><Glyphicon glyph="pencil" /> Update</Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </td>
                  </tr>
                );}
              )}
            </tbody>
          </Table>
		</Panel>*/}
        
		<Row>
        {Object.keys(events).map((key, index) => {
          event = events[key];
          return(
            <Col xs={12} sm={6}>
				<div className="event-card">
					<h6>{new Date(event.dateID).toDateString()}</h6>
					<h4>{event.name}</h4>
					<h5>{event.description}</h5>
					
					
				</div>
            </Col>
          )})}
		</Row>
      </div>
    );
  }
}

export default compose(
  firebaseConnect([]),
  connect(
    ({ firebase }) => ({})
  )
)(CurrentEventPanel)
