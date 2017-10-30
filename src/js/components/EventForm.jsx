import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';

class EventForm extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    desc: ''
  }

  componentWillMount() {
    if (this.props.event) {
      let date = new Date(this.props.event.dateID);
      this.setState({
        name: this.props.event.name,
        date: this.props.event.dateID,
        time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        desc: this.props.event.description
      });
    }
  }

  handleSubmit(event) {
    alert('Should use bootstrap alert: ' + this.state.name);
    event.preventDefault();
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
          value={this.state.desc}
          onChange={event => this.setState({desc: event.target.value})} />

        <Button type="submit" onClick={this.handleSubmit.bind(this)}>
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
)(EventForm)
