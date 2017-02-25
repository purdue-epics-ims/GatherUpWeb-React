import React, { Component, PropTypes as PT } from 'react';
import { Grid, Col, Table, Panel, FormGroup, ControlLabel, FormControl, Button, Form, ButtonGroup, ButtonToolbar, Checkbox } from 'react-bootstrap';
import DefaultNavBar from '../../js/components/NavBar.jsx';
import '../../css/App.css';

export default class LoginScreen extends Component {
  render() {
    return (
      <div className="App">
        <DefaultNavBar></DefaultNavBar>
        <Grid>
          <Form horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm={5}>
                <Button type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Grid>
      </div>
    );
  }
}
