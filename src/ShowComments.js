import React from 'react';
import './App.css';
import { Container, Row, Col, Media, Jumbotron} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import socketIOClient from "socket.io-client";

class ShowComments extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
        endpoint: "http://localhost:3001"
      };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit("initial_data");
        socket.on("commentsFeed", data => {
            console.log('commentsFeed coming in -----', data);
            this.setState({ comments: data })
        });
    }

    render() {
    const {comments} = this.state;
      return (
    <Container className="p-3" fluid="sm">
      <Row>
        <Col>
        <Jumbotron>
        {
          comments.length ?
          comments.map(comment => {
            return(
              <Media key={comment.id} className="commentbox mb-2">
              <span className="author-image">{comment.name.substring(0,1)}</span>
              <Media.Body>
                <h5>{comment.name} <span className="created-at"><FontAwesomeIcon icon={faClock} /> {comment.created}</span></h5>
                <p>
                  {comment.message}
                </p>
              </Media.Body>
            </Media>
            )
          }) :
          <h5>Sorry, no comments found... </h5>
        }
      </Jumbotron>
      </Col>
      </Row>
      </Container>
      );
    }
  }
 
  export default ShowComments;