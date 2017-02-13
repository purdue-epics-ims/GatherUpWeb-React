import React, { Component } from 'react';
import { Jumbotron, Grid, Col, Table, Panel } from 'react-bootstrap';
import ReactModal from 'react-modal';
import '../../css/App.css';

const formInstance = (
  <Col md={12} className="main-box">
    <h1>Add an Event</h1>
    <Col xs={12} md={6}>
      <form>
        <input type="text" placeholder="Name of the Event" />
        <input type="text" placeholder="mm/dd/yyyy" />
        <input type="text" placeholder="hh:mm" />
      </form>
    </Col>
    <Col xs={12} md={6}>
      <textarea type="text" placeholder="Description" />
    </Col>
  </Col>
);

const props = {};

export default class EventScreen extends Component {

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
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
            <div>
              <button onClick={this.handleOpenModal}>Add Event</button>
              <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                <div><Col md={12} className="main-box">
                  <h1>Add an Event</h1>
                  <Col xs={12} md={6}>
                    <form>
                      <input type="text" placeholder="Name of the Event" />
                      <input type="text" placeholder="mm/dd/yyyy" />
                      <input type="text" placeholder="hh:mm" />
                    </form>
                  </Col>
                  <Col xs={12} md={6}>
                    <textarea type="text" placeholder="Description" />
                  </Col>
                </Col></div>
                <button onClick={this.handleCloseModal}>Submit</button>
              </ReactModal>
            </div>
          </Panel>
        </Grid>
      </div>
    );
  }
}
