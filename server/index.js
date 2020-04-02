const express = require('express');
const bodyParser = require('body-parser');
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const http = require("http");
const socketIO = require("socket.io");
var cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIO(server);

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {    
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});


io.on("connection", socket => {
//  console.log("New client connected" + socket.id);
  //console.log(socket);
  socket.on("initial_data", () => {
    comment.getComments().then(result => {
      io.sockets.emit("commentsFeed", result);
    });
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});
// our server instance

server.listen(port, () => console.log(`Listening on port ${port}`));
