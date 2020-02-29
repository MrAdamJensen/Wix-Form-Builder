'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicField2 = require('./BasicField');

var _BasicField3 = _interopRequireDefault(_BasicField2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
TelField component for picking a telephone number
*/
var TelField = function (_BasicField) {
    _inherits(TelField, _BasicField);

    /*
    Component constructor
    */
    function TelField(props) {
        _classCallCheck(this, TelField);

        // Calling meta class constructor
        return _possibleConstructorReturn(this, (TelField.__proto__ || Object.getPrototypeOf(TelField)).call(this, props));
    }

    /*
    Rendering component
    */

    // Setting the default values for the properties 


    _createClass(TelField, [{
        key: 'render',
        value: function render() {
            // Rendering with check if the field is in read only mode so that it can render
            // not an input if possible
            return this._renderWithReadOnlyCheck(_react2.default.createElement('input', _extends({
                type: 'tel' // Setting the required type for this input
            }, this.props, { // Setting all given properties to input
                onChange: this._onChange.bind(this) // Setting callback to update state on each change
            })));
        }
    }]);

    return TelField;
}(_BasicField3.default);

TelField.defaultProps = {
    defaultValue: "123-45-678",
    readOnly: false
};
exports.default = TelField;