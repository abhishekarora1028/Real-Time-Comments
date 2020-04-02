import React, { Component, Fragment } from 'react';
import { Api } from './api';
import './App.css';
import { Button, Container, Form, Row, Col, Jumbotron} from 'react-bootstrap';
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:3001');

const DEFAULT_FORM_STATE = {
  name: '',
  message: '',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_FORM_STATE,
      comments: [],
    };
  }

  componentWillMount() {
    this.getComments();
  }

  getComments = () => {
    Api.get('/getComments').then(response => {
      this.setState({ comments: response });
    });
  }

  onChange = event => {
    const { currentTarget } = event;
    const { name, value } = currentTarget;
    const input = {};
    input[name] = value;
    this.setState(input);
  }

  onSubmit = event => {
    const { name, message } = this.state;
    event.preventDefault();
    Api.post('/createComment', {
      name,
      message,
    }).then(() => {
      this.setState(DEFAULT_FORM_STATE);
      socket.emit("initial_data");
      this.getComments();
    });
  }

  deleteComments = () => {
    if (window.confirm('Are you sure you want to delete all the comments?')) {
      Api.delete('/deleteComments').then(() => {
        this.setState({ comments: [] });
        socket.emit("initial_data");
      });
    }
  }

  hasCommentsTemplate = () => {
    const { comments } = this.state;
    return (
      <Fragment>
        <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <Button variant="danger" className="float-right" onClick={this.deleteComments}>Delete {comments.length} Comment{comments.length > 1 && 's'}</Button>
        </Col>
      </Row>
      </Fragment>
    );
  }

  render() {
    const { name, message, comments } = this.state;
    return (
      <Container className="p-3" fluid="sm">
        <Jumbotron>
        <Row>
          <h3 className="mx-auto">Post Your Comments</h3>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name"  value={name} required onChange={this.onChange} placeholder="Enter name" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="4" name="message" required  value={message} onChange={this.onChange} placeholder="Enter Message" />
              </Form.Group>
              <Button variant="primary" type="submit"> Post Comment</Button>
            </Form>
          </Col>
        </Row>
        </Jumbotron>
        {comments.length > 0 && this.hasCommentsTemplate()}
      </Container>
    );
  }
}

export default App;
