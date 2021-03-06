'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Utils = require('./Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Dialog component which displays a dialog
*/


/*
Special properties for Dialog
-------------------------------
header: Dialog title
confirmLabel: dialog confirmation button label
modal: is dialog is a modal dialog
onAction: dialog confirmation callback
hasCancel: is dialog includes a cancel button
children: dialog body
*/
var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
  }

  _createClass(Dialog, [{
    key: 'componentWillUnmount',


    /*
    Executed before component is inserted into the DOM
    */

    /*
    Fields types definitions 
    */
    value: function componentWillUnmount() {
      // If dialog is a modal dialog, remove class to remove render body not in focus
      _Utils2.default.retrieveDocBodyWithInv().classList.remove('DialogModalOpen');
    }

    /*
    Executed after component was inserted into the DOM
    */


    /*
    Default properties of component
    */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // If dialog is a modal dialog, add class to render body not in focus
      if (this.props.modal) {
        _Utils2.default.retrieveDocBodyWithInv().classList.add('DialogModalOpen');
      }
    }

    /*
    Dialog component render
    */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.modal ? 'Dialog DialogModal' : 'Dialog' },
        ' ',
        _react2.default.createElement(
          'div',
          { className: this.props.modal ? 'DialogModalWrap' : null },
          ' ',
          _react2.default.createElement(
            'div',
            { className: 'DialogHeader' },
            this.props.header
          ),
          ' ',
          _react2.default.createElement(
            'div',
            { className: 'DialogBody' },
            this.props.children
          ),
          ' ',
          _react2.default.createElement(
            'div',
            { className: 'DialogFooter' },
            '                          ',

            // If cancel button requested, create it
            this.props.hasCancel ? _react2.default.createElement(
              'span',
              {
                className: 'DialogDismiss',
                onClick: this.props.onAction.bind(this, 'dismiss') },
              'Cancel'
            ) : null,
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.props.onAction.bind(this, this.props.hasCancel ? 'confirm' : 'dismiss') },
              this.props.confirmLabel
            )
          )
        )
      );
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.defaultProps = {
  confirmLabel: 'ok',
  modal: false,
  onAction: function onAction() {},
  hasCancel: true
};
exports.default = Dialog;