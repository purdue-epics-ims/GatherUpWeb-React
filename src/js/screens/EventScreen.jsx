import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, Table, Panel, FormGroup, ControlLabel, FormControl, Button, Form, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';

const props = {};
const propTypes = {
    firebaseApp: PT.object.isRequired,
    title: PT.string.isRequired,
    onForward: PT.func,
    onBack: PT.func
  }

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
      open: true
    };
  }

  render() {
    var head = <div onClick={ ()=> this.setState({ open: !this.state.open })}><h4>Current Events</h4></div>;
    var foot = null;
    var style = "primary";
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
              <tr>
                <td>Wed Apr 27 2016 15:00:00 GMT-0400 (Eastern Daylight Time)</td>
                <td>De-stress Fest</td>
                <td>Take a break from studying and join us at Destress Fest! Destress Fest will take place on Wednesday April 27 from 3:00-6:00 p.m. in the Union North Ballroom. We will have free food, crafts, massages, and an oxygen bar. Free with PUID.</td>
                <td>
                  <ButtonToolbar>
                    <ButtonGroup bsSize="small">
                      <Button bsStyle="info"><Glyphicon glyph="arrow-down" /> CSV</Button>
                      <Button bsStyle="danger"><Glyphicon glyph="remove" /> Delete</Button>
                      <Button bsStyle="success"><Glyphicon glyph="pencil" /> Update</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      </div>
    );
  }
}
