import React, { Component } from 'react';
import { Col, FormGroup, FormControl, Button, ControlLabel, Form } from 'react-bootstrap';

export default class AddEventForm extends Component {
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
