'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
Button component which displays a button than can be clicked
If using href then it will be as a link
otherwise using a handler for interactions
*/


/*
Special properties for Button
-------------------------------
href: using href will transform button to a link
className: extra class names for css
*/
var Button = function Button(props) {
  return props.href ? _react2.default.createElement('a', _extends({}, props, { className: (0, _classnames2.default)('Button', props.className) })) : _react2.default.createElement('button', _extends({}, props, { className: (0, _classnames2.default)('Button', props.className) }));
};

exports.default = Button;