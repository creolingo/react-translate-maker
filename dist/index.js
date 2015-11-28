'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _LocaleProvider = require('./LocaleProvider');

var _LocaleProvider2 = _interopRequireDefault(_LocaleProvider);

var _Translate = require('./Translate');

var _Translate2 = _interopRequireDefault(_Translate);

var _TranslateHTML = require('./TranslateHTML');

var _TranslateHTML2 = _interopRequireDefault(_TranslateHTML);

var _translateMaker = require('translate-maker');

exports.LocaleProvider = _LocaleProvider2['default'];
exports.TranslateHTML = _TranslateHTML2['default'];
exports.Plural = _translateMaker.Plural;
exports.Gender = _translateMaker.Gender;
exports['default'] = _Translate2['default'];