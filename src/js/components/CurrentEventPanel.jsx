import React, { Component } from 'react';
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
      events: []
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  componentDidMount(){
    var x = this;
    this.props.firebase.database().ref('event').on('child_added', (snapshot) => {
      var newEvents = x.state.events.slice();
      newEvents.push(snapshot.val());
      x.setState({events: newEvents});
    });
  }


  deleteEvent() {

  }

 generateCSVEvent(eventID) {

      var csv = '';
      var myDataRef = new Firebase('https://dazzling-inferno-9963.firebaseio.com/event');
      var totalCount = 0;
      var count = 0;

      var a = document.createElement('a');

      myDataRef.orderByChild("dateID").on('child_added', function(snapshot) {
        var eventMessage = snapshot.val();
        a.download = "AttendanceFor_"+eventMessage.name + ".csv";
        var myDataRef2 = new Firebase('https://dazzling-inferno-9963.firebaseio.com/event/'+snapshot.name()+"/attendees");
        var myDataRef3 = new Firebase('https://dazzling-inferno-9963.firebaseio.com/event/'+snapshot.name()+"/attendees");

        if(snapshot.name() == eventID){
          myDataRef3.once("value", function(snapshot3) {
            totalCount = snapshot3.numChildren();
            if (totalCount==0){
              window.alert('No data to download');
              return;
            }
            csv = 'puid,firstname,lastname,email,domestic/int,year\n';
            count = 0;
            myDataRef2.on('child_added', function(snapshot2){
              if(snapshot2.val().email.indexOf("@purdue.edu")>-1 && snapshot2.val().puid==""){
                csv += "**********,"+ snapshot2.val().firstname + ","+ snapshot2.val().lastname+","+snapshot2.val().email + "," + "," + '\n';
              }else{
                csv += ""+snapshot2.val().puid + ","+ snapshot2.val().firstname + ","+ snapshot2.val().lastname+","+snapshot2.val().email + "," + snapshot2.val().intstatus + "," + snapshot2.val().year + '\n';
              }
              count++;
              if(count == totalCount){
                a.href='data:text/csv;base64,' + btoa(csv);
                a.click();
              }
            });
          });
        }
      });


    };
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
                          <Button bsStyle="warning"><Glyphicon glyph="pencil" /> Update</Button>
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
