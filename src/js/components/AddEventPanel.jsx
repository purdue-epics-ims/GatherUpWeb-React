import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import AddEventForm from './AddEventForm';

export default class AddEventPanel extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };

  }

  render() {
    var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h2>Add Event</h2></div>;
    var foot = null;
    var style = "primary";
    return (
      <div>
        <Panel collapsible header={head} footer={foot} bsStyle={style} expanded={this.state.open}>
          <AddEventForm></AddEventForm>
        </Panel>
      </div>
    );
  }
}
