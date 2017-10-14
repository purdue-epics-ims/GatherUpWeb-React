import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Panel, Button, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase';

class CurrentEventPanel extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
      events: [],
      keys: []
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
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

  updateEvent(event) {

  }

  render() {
    const {events} = this.state;
    const {keys} = this.state;
    var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h4>Current Events</h4></div>;
    var foot = null;
    var style = "primary"

    return (
      <div>
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
                          <Button type="button" bsStyle="info"><Glyphicon glyph="arrow-down" /> CSV</Button>
                          <Button type="button" bsStyle="danger" onClick={()=>this.deleteEvent(keys[index])}><Glyphicon glyph="remove" /> Delete</Button>
                          <Button bsStyle="success"><Glyphicon glyph="pencil" /> Update</Button>
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
