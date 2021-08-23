/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('aaaaaaaaaaaa');
alert('aaaaaaaaaaa');

//===========================================
// Model
//==========================================

// task
var ListItem = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false
  },
  initialize: function initialize(attrs) {
    console.log('attrs', attrs);
  },
  validation: function validation(attrs) {
    if (!text || attrs.text.length === 0) {
      return 'You need to put something';
    }
  }
});

console.log(ListItem.toJSON());

var listItem1 = new ListItem({ text: 'サンプルTODOタスク', isDone: false });
var listItem2 = new ListItem({ text: 'サンプルTODOタスク', isDone: true });

//===========================================
// Collection
//===========================================

var TODOLIST = Backbone.Collection.extend({
  model: ListItem
});

var todoList = new TODOLIST([listItem1, listItem2]);

//===========================================
// View
//===========================================

var ListView = Backbone.View.extend({
  initialize: function initialize() {
    _bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.render();
  },
  render: function render() {
    var template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  }
});

var listview = new ListView({
  model: ListItem,
  el: $('.js-todo-list'),
  collection: todoList
});

/***/ })
/******/ ]);