'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LocaleProvider = require('./LocaleProvider');

var _LocaleProvider2 = _interopRequireDefault(_LocaleProvider);

var Translate = (function (_Component) {
  _inherits(Translate, _Component);

  function Translate() {
    _classCallCheck(this, Translate);

    _get(Object.getPrototypeOf(Translate.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Translate, [{
    key: 'getPath',
    value: function getPath() {
      var path = this.props.path;
      var namespace = this.context.namespace;

      if (!namespace) {
        return path;
      }

      var parentPath = namespace.getPath();
      if (!parentPath) {
        return path;
      }

      return parentPath + '.' + path;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var tagName = _props.tagName;
      var params = _props.params;
      var defaultValue = _props.defaultValue;
      var _props$props = _props.props;
      var props = _props$props === undefined ? {} : _props$props;

      var path = this.getPath();

      var translate = this.context.translate;
      var text = translate.get(path, params || this.props, defaultValue);

      if (typeof tagName !== 'string') {
        return tagName(props, text);
      }

      return _react2['default'].createElement(tagName, props, text);
    }
  }], [{
    key: 'contextTypes',
    value: _extends({}, _LocaleProvider2['default'].childContextTypes, {
      namespace: _react.PropTypes.object
    }),
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      path: _react.PropTypes.string.isRequired,
      tagName: _react.PropTypes.string.isRequired,
      defaultValue: _react.PropTypes.string,
      description: _react.PropTypes.string,
      className: _react.PropTypes.string,
      params: _react.PropTypes.object,
      props: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      tagName: 'span'
    },
    enumerable: true
  }]);

  return Translate;
})(_react.Component);

exports['default'] = Translate;
module.exports = exports['default'];