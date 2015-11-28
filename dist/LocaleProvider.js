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

var Provider = (function (_Component) {
  _inherits(Provider, _Component);

  _createClass(Provider, null, [{
    key: 'propTypes',
    value: {
      locale: _react.PropTypes.string.isRequired,
      locales: _react.PropTypes.object.isRequired,
      onLoadLocale: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      translate: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      locale: 'en'
    },
    enumerable: true
  }]);

  function Provider(props, context) {
    _classCallCheck(this, Provider);

    _get(Object.getPrototypeOf(Provider.prototype), 'constructor', this).call(this, props, context);

    this.state = this._prepareLocale(props);
  }

  _createClass(Provider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState(this._prepareLocale(newProps));
    }
  }, {
    key: '_prepareLocale',
    value: function _prepareLocale(props) {
      var locale = props.locale;
      var locales = props.locales;
      var onLoadLocale = props.onLoadLocale;

      var messages = locales[locale];
      if (messages) {
        var translate = new _translateMaker2['default']();
        translate.set(messages);

        return { translate: translate };
      }

      if (!onLoadLocale) {
        throw new Error('Locale is not defined. For async load use onLoadLocale');
      }

      onLoadLocale(locale);

      return {};
    }
  }, {
    key: 'get',
    value: function get(path, attrs) {
      var translate = this.state.translate;

      if (!translate) {
        return void 0;
      }

      return translate.get(path, attrs);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        translate: this
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return Provider;
})(_react.Component);

exports['default'] = Provider;
module.exports = exports['default'];