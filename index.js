"use strict";

var moment = require('moment');
var React = require('react');

function isNumber(value) {
  return toString.call(value) === '[object Number]';
}

var Time = React.createClass({

  displayName: 'Time',
  ticker: null,

  getDefaultProps: function() {
    return {
      autoUpdate: false
    };
  },

  componentDidMount: function() {
    if (this.props.autoUpdate) {
      var delay = isNumber(this.props.autoUpdate) ? this.props.autoUpdate * 1000 : 2600;

      this.ticker = setInterval(this.invalidate, delay);
    }
  },

  componentWillUnmount: function() {
    if (this.ticker) {
      clearInterval(this.ticker);
    }
  },

  invalidate: function() {
    this.forceUpdate()
  },

  render: function() {
    var value = this.props.value;

    if (Object.prototype.toString.call(value) == '[object String]') {
      value = new Date(value);
    }

    value = moment(value);

    var machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ');

    var props = {};
    for (var k in this.props) {
      if (this.props.hasOwnProperty(k) &&
          k !== 'value' &&
          k !== 'relative' &&
          k !== 'format')
        props[k] = this.props[k];
    }

    if (this.props.relative || this.props.format) {
      var humanReadable = this.props.relative ? value.fromNow() : value.format(this.props.format);
      props.dateTime = machineReadable;
      return React.DOM.time(props, humanReadable);
    } else {
      return React.DOM.time(props, machineReadable);
    }
  }
});

module.exports = Time;
