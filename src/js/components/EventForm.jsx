import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';

class EventForm extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    description: '',
    firebaseLocation: ''
  }

  componentWillMount() {
    if (this.props.event) {
      let date = new Date(this.props.event.dateID);
      this.setState({
        name: this.props.event.name,
        date: this.props.event.dateID,
        time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        description: this.props.event.description
      });
    }
  }

  componentDidMount() {
    this.setState({firebaseLocation: `${this.props.packages.firebase.auth().currentUser.uid}/events/`})
  }

  handleSubmit() {
    let obj;

    if (this.props.eventId) {
      // Update event if all fields are filled out
      if (this.state.name && this.state.date && this.state.time && this.state.description) {
        console.log(this.state);
        this.props.packages.firebase.database().ref(this.state.firebaseLocation + this.props.eventId).once('value', snapshot => {
          obj = snapshot.val();
          obj.name = this.state.name ? this.state.name : '';
          obj.dateID = obj.date = this.state.date ? this.state.date : new Date();
          obj.time = this.state.time ? this.state.time : new Date().getTime();
          obj.description = this.state.description ? this.state.description : '';
          console.log(obj);
          this.props.packages.firebase.database().ref(this.state.firebaseLocation + this.props.eventId).set(obj).then(() => {
            // Not the best implementation
            // To make it better, use redux to control the Modal
            // and dismiss the modal with actions once updated the event
            location.reload();
          });
        });
      } else {
        alert('Please fill out all the fields');
      }
    } else {
      // Create new event if all fields are filled out
      if (this.state.name && this.state.date && this.state.time && this.state.description) {
        obj = this.state;
        obj.dateID = this.state.date;
        this.props.packages.firebase.database().ref(this.state.firebaseLocation).push().set(obj).then(() => {
          // Not the best implementation
          // To make it better, use redux to control the Modal
          // and dismiss the modal with actions once updated the event
          location.reload();
        })
      } else {
        alert('Please fill out all the fields');
      }
    }
  }

  render() {
    return (
      <div className="input-card">
        <h4>{this.props.title}</h4>

        <FormControl
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={event => this.setState({name: event.target.value})} />

        <FormControl
          id="event-form-date-input"
          type="date"
          placeholder="Date"
          value={this.state.date}
          onChange={event => this.setState({date: event.target.value})} />

        <FormControl
          id="event-form-time-input"
          type="time"
          placeholder="Time"
          value={this.state.time}
          onChange={event => this.setState({time: event.target.value})} />

        <FormControl
          componentClass="textarea"
          placeholder="Description"
          value={this.state.description}
          onChange={event => this.setState({description: event.target.value})} />

        <Button onClick={this.handleSubmit.bind(this)}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.packages
  }
}
export default connect(mapStateToProps)(EventForm)
