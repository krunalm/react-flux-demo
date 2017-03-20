"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var CourseActions = require('../../actions/courseActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },
    deleteCourse: function (id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        toastr.success('Course Deleted.');
    },
    render: function () {
        var getCourseRow = function (course) {
            return (
                <tr key={course.id}>
                    <td>
                        <a href={course.watchHref} target="_blank">Watch</a>
                    </td>
                    <td>
                        <a
                            href="#"
                            onClick={this
                            .deleteCourse
                            .bind(this, course.id)}>Delete</a>
                    </td>
                    <td>
                        <Link to={"course/" + course.id}>{course.title}</Link>
                    </td>
                    <td>
                        {
                            AuthorStore.getAuthorFullName(course.author)
                        }
                    </td>
                    <td>
                        {course.category}
                    </td>
                    <td>
                        {course.length}
                    </td>
                </tr>
            );
        };

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Length</th>
                    </tr>
                </thead>
                <tbody>
                    {this
                        .props
                        .courses
                        .map(getCourseRow, this)}
                </tbody>
            </table>
        );
    }
});

module.exports = CourseList;