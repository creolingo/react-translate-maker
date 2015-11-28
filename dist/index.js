'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Provider = require('./Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _Translate = require('./Translate');

var _Translate2 = _interopRequireDefault(_Translate);

var _TranslateHTML = require('./TranslateHTML');

var _TranslateHTML2 = _interopRequireDefault(_TranslateHTML);

var _translateMaker = require('translate-maker');

exports.LocaleProvider = _Provider2['default'];
exports.TranslateHTML = _TranslateHTML2['default'];
exports.Plural = _translateMaker.Plural;
exports.Gender = _translateMaker.Gender;
exports['default'] = _Translate2['default'];