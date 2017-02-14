"use strict";

var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var App = require('./components/app');
var HomePage = require('./components/homePage');
var AboutPage = require('./components/about/aboutPage');
var AuthorPage = require('./components/authors/authorPage.jsx');
var ManageAuthorPage = require('./components/authors/manageAuthorPage');
var NotFoundPage = require('./components/notFoundPage');

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="authors" component={AuthorPage}/>
            <Route path="author" component={ManageAuthorPage}/>
            <Route
                path="about"
                component={AboutPage}
                onEnter={function (location, replaceWith) {
                if (!confirm('Are you sure you want to read a page that\'s this boring?')) {
                    {/*console.log(location); console.log(replaceWith);*/}
                    return replaceWith(location); // this is not working as expected. 
                    } 
                    }} 
                onLeave={function () {
                if (!confirm('Are you sure you want to leave a page that\'s this exciting?')) {
                    return false; // this is not working as expected. 
                    } 
                    }} />
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);

module.exports = routes;