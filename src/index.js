import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowComments from './ShowComments';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" component={App} exact />
        <Route path="/showcomments" component={ShowComments} exact />
    </Switch>
</BrowserRouter>, document.getElementById('root'));
