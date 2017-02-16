"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var withRouter = ReactRouter.withRouter;
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	getInitialState: function(){
		return {
			author: {id:'', firstName:'', lastName:''},
			errors: {},
			dirty: false
		};
	},
	componentDidMount: function(){
		this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
	},
	componentWillMount: function(){
		var authorId = this.props.params.id; //from the path '/author:id'
		if(authorId){
			this.setState({author: AuthorApi.getAuthorById(authorId)});
		}
	},
	routerWillLeave: function(){
		// Return false to prevent a transition w/o prompting the user,
		// or return a string to allow the user to decide:
		if(this.state.dirty){
			return 'Leave without saving?';
		}
		return true;
	},
	setAuthorState: function(event){
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},
	authorFormIsValid: function(){
		var formIsValid = true;
		this.state.errors = {};

		if(this.state.author.firstName.length < 3){
			this.state.errors.firstName = "First name must be at least 3 characters.";
			formIsValid = false;
		}
		
		if(this.state.author.lastName.length < 3){
			this.state.errors.lastName = "Last name must be at least 3 characters.";
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},
	saveAuthor: function(event){
		event.preventDefault();

		if(!this.authorFormIsValid()){
			return;
		}

		AuthorApi.saveAuthor(this.state.author);
		this.setState({dirty: false}, function(){
			toastr.success('Author saved.');
			browserHistory.push('/authors');
		});
	},
	render: function() {
		return (
			<AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor} errors={this.state.errors} />
		);
	}
});

module.exports = withRouter(ManageAuthorPage);