'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _translateMaker = require('translate-maker');

var _translateMaker2 = _interopRequireDefault(_translateMaker);

var LocaleProvider = (function (_Component) {
  _inherits(LocaleProvider, _Component);

  _createClass(LocaleProvider, null, [{
    key: 'propTypes',
    value: {
      locale: _react.PropTypes.string,
      locales: _react.PropTypes.array,
      namespace: _react.PropTypes.string,
      fallbacks: _react.PropTypes.object,
      cache: _react.PropTypes.object,
      adapter: _react.PropTypes.object,
      defaultAdapter: _react.PropTypes.object,
      dotNotation: _react.PropTypes.bool,
      mode: _react.PropTypes.string,
      references: _react.PropTypes.bool,
      variables: _react.PropTypes.bool,
      combinations: _react.PropTypes.bool,
      filters: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      translate: _react.PropTypes.object.isRequired,
      t: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  function LocaleProvider(props, context) {
    var _this = this;

    _classCallCheck(this, LocaleProvider);

    _get(Object.getPrototypeOf(LocaleProvider.prototype), 'constructor', this).call(this, props, context);

    this.t = function (path, attrs, defaultValue) {
      return _this.get(path, attrs, defaultValue);
    };

    this.state = {
      translate: new _translateMaker2['default'](props)
    };
  }

  _createClass(LocaleProvider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.state.translate.setLocale(newProps.locale);
    }
  }, {
    key: 'get',
    value: function get(path, attrs, defaultValue) {
      var translate = this.state.translate;

      return translate.get(path, attrs, defaultValue);
    }
  }, {
    key: 'set',
    value: function set(path, value) {
      var translate = this.state.translate;

      return translate.set(path, value);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        translate: this,
        t: this.t
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return LocaleProvider;
})(_react.Component);

exports['default'] = LocaleProvider;
module.exports = exports['default'];