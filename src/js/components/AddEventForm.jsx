import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';

class AddEventForm extends Component {
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
      <div className="input-card">
        <h4>Create New Event</h4>

        <FormControl type="text" placeholder="Name of Event" />
        <FormControl type="date" placeholder="mm/dd/yy" />
        <FormControl type="time" placeholder="--:-- --" />
        <FormControl componentClass="textarea" placeholder="Description" />

        <Button type="submit">
          Submit
        </Button>
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
)(AddEventForm)
