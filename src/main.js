"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

ReactDOM.render(routes, document.getElementById('app'));