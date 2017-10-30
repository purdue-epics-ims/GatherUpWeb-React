import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Panel, Button, ButtonGroup, ButtonToolbar, Glyphicon, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase';

import EventForm from './EventForm';

class CurrentEventPanel extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
      events: [],
      keys: [],
      showModal: false,
      eventToModify: null
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.generateCSVEvent = this.generateCSVEvent.bind(this);
  }

  componentDidMount(){
    var x = this;
    this.props.firebase.database().ref('event').on('child_added', (snapshot) => {
      var newEvents = x.state.events.slice();
      var testboy = x.state.keys;
      newEvents.push(snapshot.val());
      testboy.push(snapshot.key);
      console.log(x.state.keys);
      x.setState({events: newEvents});
    });
  }

  generateCSV() {

  }

  deleteEvent(key) {
    console.log(key);
    this.props.firebase.database().ref('event').child(key).remove();
  }

  generateCSVEvent(event) {
    var csv = '';
    var myDataRef= this.props.firebase.database().ref('event')
    let firebase = this.props.firebase;

    myDataRef.orderByChild("dateID").on('child_added', function(snapshot){
      var eventMessage = snapshot.val();
      var myDataRef3= firebase.database().ref('event/' +snapshot.getKey()+'/attendees');
  updateEvent(event) {
    this.setState({ showModal: true, eventToModify: event });
  }

      if(snapshot.val().name == event.name){
        myDataRef3.once("value", function(snapshot3){
          if (snapshot3.numChildren() === 0) {
            window.alert('No data to download');
            return;
          }

          let res = snapshot3.val();

          csv = 'puid,firstname,lastname,email,domestic/int,year\n';

          Object.keys(res).map((key, index) => {
            csv += res[key].puid + ","
            + res[key].firstname + ","
            + res[key].lastname+","
            + res[key].email + ","
            + res[key].intstatus + ","
            + res[key].year + '\n';
            return;
          })

          if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
          }

          let link = document.createElement('a');
          link.setAttribute('href', encodeURI(csv));
          link.setAttribute('download', event.name + '.csv');
          link.click();
        });
      }
    });
  };

  render() {
    const {events} = this.state;
    const {keys} = this.state;
    var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h4>Current Events</h4></div>;
    var foot = null;
    var style = "primary"

    return (
      <div>
        <Modal className="event-add-modal" show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Body>
            <EventForm title="Modify Event" event={this.state.eventToModify} />
          </Modal.Body>
        </Modal>
        <Panel collapsible header={head} footer={foot} bsStyle={style} expanded={this.state.open}>
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
              {events.map((event, index) => {
                return(
                  <tr key={event.dateID + index}>
                    <td>{new Date(event.dateID).toDateString()}.</td>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="small">
                          <Button type="button" bsStyle="info" onClick={() => this.generateCSVEvent(event)}><Glyphicon glyph="arrow-down" /> CSV</Button>
                          <Button type="button" bsStyle="danger" onClick={()=>this.deleteEvent(keys[index])}><Glyphicon glyph="remove" /> Delete</Button>
                          <Button bsStyle="success" onClick={() => this.updateEvent(event)}><Glyphicon glyph="pencil" /> Update</Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </td>
                  </tr>
                );}
              )}
            </tbody>
          </Table>
        </Panel>
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
