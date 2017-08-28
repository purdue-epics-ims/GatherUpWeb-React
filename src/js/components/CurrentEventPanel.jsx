import React, { Component } from 'react';
import { Table, Panel, Button, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';

export default class CurrentEventPanel extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
      events: []
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.listDisplay = this.listDisplay.bind(this);
  }

  componentDidMount(){
    var x = this
    this.props.firebaseApp.database().ref('event').on('child_added', (snapshot) => {
      console.log(x.state.events);
      var newEvents = x.state.events.slice();
      newEvents.push(snapshot.val())
      x.setState({events: newEvents});
    });
  }


  deleteEvent() {

  }

  updateEvent(event) {

  }

  listDisplay(event) {
    /*
    firebaseApp.database().ref('event').on('value', function(snapshot) {
    console.log(snapshot);
    this.setState({eventArray: snapshot.val()})
    console.log(eventArray);
    this.setState({eventKeys: Object.keys(eventArray)});
    console.log(eventKeys);
    eventKeys.map(eventKeys => {
    return(
    <div>
    <Table fill bordered condensed hover>
    <thead>
    <tr>
    <th>eventKeys.dateID.toDateString()</th>
    <th>eventKeys.name</th>
    <th>Description</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
<tr>
<td>Thur Apr 24 (Eastern Daylight Time)</td>
<td>De-stress Fest</td>
<td>Take a break from studying and join us at Destress Fest! Destress Fest will take place on Wednesday April 27 from 3:00-6:00 p.m. in the Union North Ballroom. We will have free food, crafts, massages, and an oxygen bar. Free with PUID.</td>
<td>
<ButtonToolbar>
<ButtonGroup bsSize="small">
<Button type="button" bsStyle="info"><Glyphicon glyph="arrow-down" /> CSV</Button>
<Button type="button" bsStyle="danger"><Glyphicon glyph="remove" /> Delete</Button>
<Button bsStyle="success"><Glyphicon glyph="pencil" /> Update</Button>
</ButtonGroup>
</ButtonToolbar>
</td>
</tr>
</tbody>
</Table>
</div>
);
});
}); */
}

render() {
  const {events} = this.state;
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
                        <Button type="button" bsStyle="danger"><Glyphicon glyph="remove" /> Delete</Button>
                        <Button bsStyle="success"><Glyphicon glyph="pencil" /> Update</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </td>
                </tr>
              );}
            )}
          </tbody>
        </Table>
        {/*<Button type="button" bsStyle="danger" onClick={this.listDisplay}><Glyphicon glyph="remove" /> Delete</Button>*/}
      </Panel>
    </div>
  );
}
}
