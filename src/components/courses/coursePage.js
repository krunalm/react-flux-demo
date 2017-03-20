"use strict";

var React = require('react');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var CourseList = require('./courseList');
var Link = require('react-router').Link;

var CoursePage = React.createClass({
    getInitialState: function () {
        return {
            courses: CourseStore.getAllCourses()
        };
    },
    componentWillMount: function(){
        CourseStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        CourseStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({courses: CourseStore.getAllCourses()});
    },
    render: function(){
        return (
            <div>
                <h1>Courses</h1>
                <Link to="course" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses} />
            </div>
        );
    }
});

module.exports = CoursePage;