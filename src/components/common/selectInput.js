"use strict";

var React = require('react');

var SelectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.object,
        items: React.PropTypes.array,
        error: React.PropTypes.string,
        itemTextCallback: React.PropTypes.func
    },
    getItem: function (item) {
        return <option value={item.id} key={item.id}>{this.props.itemTextCallback(item)}</option>;
    },
    render: function () {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " has-error";
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select
                        name={this.props.name}
                        className="form-control"
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        defaultValue={this.props.value.id}>
                        {this
                            .props
                            .items
                            .map(this.getItem, this)}
                    </select>
                    <div className="input">{this.props.error}</div>
                    <br/>
                </div>
            </div>
        );
    }
});

module.exports = SelectInput;