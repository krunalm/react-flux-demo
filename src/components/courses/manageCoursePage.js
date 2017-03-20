"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var withRouter = ReactRouter.withRouter;
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var manageCoursePage = React.createClass({
    getInitialState: function () {
        return {
            course: {
                id: '',
                title: '',
                watchHref: '',
                author: {},
                length: '',
                category: ''
            },
            errors: {},
            dirty: false
        };
    },
    componentDidMount: function(){
        this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    },
    componentWillMount: function(){
        var courseId=this.props.params.id;
        if(courseId){
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },
    routerWillLeave: function(){
        if(this.state.dirty){
            return 'Leave without saving?';
        }
        return true;
    },
    setCourseState: function(event){
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        if(field==='author'){
            // may be a better way to do this ??
            value = AuthorStore.getAuthorById(value);
        }
        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },
    courseFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};

        if(this.state.course.title.length < 3){
            this.state.errors.title = "Title must be at least 3 characters.";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    saveCourse: function(event){
        event.preventDefault();

        if(!this.courseFormIsValid()){
            return;
        }

        if(this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        }
        else{
            CourseActions.createCourse(this.state.course);
        }

        this.setState({dirty: false}, function(){
            toastr.success('Course Saved.');
            browserHistory.push('/courses');
        });
    },
    getItemText: function(author){
        return AuthorStore.getAuthorFullName(author);
    },
    render: function(){
        return (
            <CourseForm course={this.state.course} authors={AuthorStore.getAllAuthors()} itemTextCallback={this.getItemText} onChange={this.setCourseState} onSave={this.saveCourse} errors={this.state.errors} />
        );
    }
});

module.exports = withRouter(manageCoursePage);