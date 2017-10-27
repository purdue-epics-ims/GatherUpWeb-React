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

  handleSubmit(event) {
    alert('Should use bootstrap alert: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="input-card">
        <h4>{this.props.title}</h4>

        <FormControl type="text" placeholder="Name" onChange={event => this.setState({name: event.target.value})} />
        <FormControl type="date" placeholder="Date" onChange={event => this.setState({date: event.target.value})} />
        <FormControl type="time" placeholder="Time" onChange={event => this.setState({time: event.target.value})} />
        <FormControl componentClass="textarea" placeholder="Description" onChange={event => this.setState({desc: event.target.value})} />

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
