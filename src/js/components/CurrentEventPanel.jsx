import React, { Component } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import EventForm from './EventForm';

import form from '../../img/forms icon.svg';
import pencil from '../../img/pencil icon.svg';
import clear from '../../img/clear icon.svg';

class CurrentEventPanel extends Component {

  constructor(args) {
    super(args);
    this.state = {
      open: true,
      events: {},
      showModal: false,
      eventToModify: null,
      eventIdToModify: null,
      location: ''
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.generateCSVEvent = this.generateCSVEvent.bind(this);
  }

  componentDidMount(){
    // Using onAuthStateChanged() to get currentUser because
    // firebase.auth().currentUser could be null
    this.props.packages.firebase.auth().onAuthStateChanged(user => {
      if (user.email) {
        this.setState({
          username: user.email.substring(0, user.email.indexOf('@')),
          location: `${user.uid}/events`
        })
      }

      this.props.packages.firebase.database().ref(`${user.uid}/events`).on('value', snapshot => {
        if (snapshot.val()) {
          this.setState({events: snapshot.val()});
        } else {
          this.setState({events: {}});
        }
      })
    })
  }

  deleteEvent(key) {
    this.props.packages.firebase.database().ref(this.state.location).child(key).remove();
  }

  updateEvent(eventIdToModify, eventToModify) {
    this.setState({ showModal: true, eventToModify, eventIdToModify });
  }

  generateCSVEvent(id, event) {
    this.props.packages.firebase.database().ref(this.state.location + id +'/attendees').once("value", snapshot => {
      if (snapshot.numChildren() === 0) {
        window.alert('No data to download');
        return;
      }

      let res = snapshot.val();
      let csv = 'puid,firstname,lastname,email,domestic/int,year\n';

      Object.keys(res).map((key, index) => {
        csv += res[key].puid + ","
        + res[key].firstname + ","
        + res[key].lastname+","
        + res[key].email + ","
        + res[key].intstatus + ","
        + res[key].year + '\n';
        return null;
      })

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }

      let link = document.createElement('a');
      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', event.name + '.csv');
      link.click();
    });
  };

  render() {
    const { events } = this.state;

    return (
      <div>
        <Modal className="event-add-modal"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}>
          <Modal.Body>
            <EventForm title="Modify Event" event={this.state.eventToModify} eventId={this.state.eventIdToModify} />
          </Modal.Body>
        </Modal>
        <Row>
          {Object.keys(events).map((key, index) => {
            let event = events[key];
            let date = new Date(event.dateID);

            return(
              <Col xs={12} sm={6} key={index}>
                <div className="event-card">
                  <h6>{event.dateID ? date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() : ''}</h6>
                  <h4>{event.name}</h4>
                  <h5>{event.description ? (event.description.length > 60 ? event.description.substring(0,60) + '...' : event.description) : null}</h5>

                  <div className="event-card-buttons-wrapper">
                    <div className="event-card-button" onClick={() => this.generateCSVEvent(key, event)}>
                      <img alt="Download CSV icon" src={form} /><span>CSV</span>
                    </div>
                    <div className="event-card-button" onClick={() => this.updateEvent(key, event)}>
                      <img alt="Update icon" src={pencil} /><span>Update</span>
                    </div>
                    <div className="event-card-button" onClick={() => this.deleteEvent(key)}>
                      <img alt="Delete icon" src={clear} /><span>Delete</span>
                    </div>
                  </div>
                </div>
              </Col>
            )})}
          </Row>
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      packages: state.packages
    }
  }
  export default connect(mapStateToProps)(CurrentEventPanel);
