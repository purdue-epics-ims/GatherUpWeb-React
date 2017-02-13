import React, { Component } from 'react';
import { Jumbotron, Grid, Col, Table, Panel } from 'react-bootstrap';
import ReactModal from 'react-modal';
import '../../css/App.css';

const props = {};

export default class EventScreen extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Panel header="Current List of Events" bsStyle="primary">
            <Table bordered condensed hover>
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
                  <td>CSV Delete Update</td>
                </tr>
              </tbody>
            </Table>
            <AddEventModal></AddEventModal>
          </Panel>
        </Grid>
      </div>
    );
  }
}

export class AddEventModal extends Component {

  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Add Event</button>
        <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
          <AddEventForm></AddEventForm>
          <button onClick={this.handleCloseModal}>Cancel</button>
        </ReactModal>
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
        <form onSubmit={this.handleSubmit}>
          <label>
            Date:
            <input
              name="date"
              type="text"
              onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Name:
              <input
                name="name"
                type="text"
                onChange={this.handleInputChange} />
              </label>
              <label>
                Time:
                <input
                  name="time"
                  type="text"
                  onChange={this.handleInputChange} />
                </label>
                <label>
                  Description:
                  <input
                    name="description"
                    type="text"
                    onChange={this.handleInputChange} />
                  </label>
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            );
          }
        }
