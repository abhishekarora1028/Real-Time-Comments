#Real Time Comments Feed

Simple Application for comments feed that displays all comments and notifies a user in real-time when new comments are added.

Here is the data schema for a Comment:
* id: INTEGER
* name: TEXT
* created: DATETIME
* message: TEXT

Here are the API endpoints:
* Create a comment: /createComment (POST)
* Retrieve all comments: /getComments (GET)
* Retrieve a comment: /getComment (GET)
* Delete all comments: /deleteComments (DELETE)
* This is useful for purging data

## Usage

### Run in Development

```
$ npm install
$ npm run dev
```

### Run Tests

```
$ npm run test
```