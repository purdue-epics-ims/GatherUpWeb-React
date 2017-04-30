import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, Table, Panel, FormGroup, ControlLabel, FormControl, Button, Form, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCvIT4NlusJ9YQ_LaxIU-sXBRqqU-8S9GI",
  authDomain: "gatherup-development.firebaseapp.com",
  databaseURL: "https://gatherup-development.firebaseio.com",
  projectId: "gatherup-development",
  storageBucket: "gatherup-development.appspot.com",
  messagingSenderId: "55208332478"
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'Firebase');

export default class EventScreen extends Component {
	render() {
    return (
      <div className="App">
        <DefaultNavBar></DefaultNavBar>
        <Grid>
          <AddEventPanel></AddEventPanel>
          <CurrentEventPanel></CurrentEventPanel>
        </Grid>
      </div>
    );
  }
}

export class AddEventPanel extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };

  }

  render() {
    var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h4>Add Event</h4></div>;
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

export class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Should use bootstrap alert: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Name of Event" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalDate">
            <Col componentClass={ControlLabel} sm={2}>
              Date
            </Col>
            <Col sm={10}>
              <FormControl type="date" placeholder="mm/dd/yy" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTime">
            <Col componentClass={ControlLabel} sm={2}>
              Time
            </Col>
            <Col sm={10}>
              <FormControl type="time" placeholder="--:-- --" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalTextarea">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" placeholder="Description" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export class CurrentEventPanel extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true,
	  events: []
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.listDisplay = this.listDisplay.bind(this);

	var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h4>Current Events</h4></div>;
    var foot = null;
    var style = "primary"
}

  componentDidMount(){
		var x = this
		firebaseApp.database().ref('event').on('child_added', (snapshot) => {
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
			{events.map(function(event){
				return(
				<tr>
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
