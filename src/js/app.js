import $ from 'jquery';
import _, { template } from 'underscore';
import Backbone from 'backbone';

//=============================================
// Model
//=============================================
const Item = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false,
    forSearchResult: true,
  },
});

const Form = Backbone.Model.extend({
  defaults: {
    val: '',
    hasError: false,
    errorMsg: '',
  },
});

const form = new Form();

const SearchItem = Backbone.Model.extend({
  default: {
    val: '',
  },
});

const searchItem = new SearchItem();

//=============================================
// Model + View
//=============================================

const ItemView = Backbone.View.extend({
  template: _.template($('#template-list-item').html()),
  events: {
    'click .js-click-done': 'toggleDone',
    'click .js-click-delete': 'remove',
    'click .js-todo_list-text': 'showEdit',
    'keyup .js-todo_list-editForm': 'closeEdit',
    'focus .js-todo_list-editForm': 'selectText',
    'blur .js-todo_list-editForm': 'blurFocus',
  },
  initialize: function () {
    _.bindAll(
      this,
      'toggleDone',
      'render',
      'remove',
      'showEdit',
      'selectText',
      'blurFocus',
      'closeEdit'
    );
    this.model.bind('change', this.render);
  },
  // isDone:true ↔ false:p-listItem ↔ p-listItem--done/icon
  toggleDone: function () {
    this.model.set({ editMode: false });
    this.model.set({ isDone: !this.model.get('isDone') });
  },
  remove: function () {
    $(this.el).fadeOut('slow', function () {
      this.remove();
    });
    return this;
  },
  // editMode:true ↔ false:p-listItem__text → p-listItem__editText
  showEdit: function () {
    this.model.set({ editMode: true });
    $('.js-todo_list-editForm').show().focus();
    // console.log('editmode: ' + JSON.stringify(this.model({ editMode })));
  },
  selectText: function () {
    $('.js-todo_list-editForm').select();
  },
  blurFocus: function () {
    this.model.set({ editMode: false });
  },
  closeEdit: function (e) {
    // 13 = enter key
    if (e.which === 13) {
      this.model.set({ text: e.currentTarget.value, editMode: false });
    }
  },
  render: function () {
    console.log('render item');
    const template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  },
});

//=============================================
// Collection
//=============================================

const LIST = Backbone.Collection.extend({
  model: Item,
});

const item1 = new Item({ text: 'sample todo1' });
const item2 = new Item({ text: 'sample todo2' });
const list = new LIST([item1, item2]);

const list2 = new LIST([{ text: 'sample todo3' }, { text: 'sample todo4' }]);
// console.log(list);
// console.log(list2);

// list.each(function (e, i) {
//   console.log('[' + i + '] ' + e.get('text'));
// });

//=============================================
// Collection + Model + View
//=============================================

const ListView = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render', 'addItem', 'appendItem');
    this.collection.bind('add', this.appendItem);
    this.render();
  },
  addItem: function (text) {
    const model = new Item({ text: text });
    this.collection.add(model);
  },
  appendItem: function (model) {
    const itemView = new ItemView({ model: model });
    this.$el.prepend(itemView.render().el);
    // console.log(itemView);
    // console.log(itemView.el);
  },
  render: function () {
    console.log('render list');
    const that = this;
    this.collection.each(function (model, i) {
      that.appendItem(model);
    });
    return this;
  },
});
const listView = new ListView({ el: $('.js-todo_list'), collection: list });

const FormView = Backbone.View.extend({
  el: $('#js-form'),
  template: _.template($('#template-form').html()),
  model: form,
  events: {
    'click .js-add-todo': 'addTodo',
  },
  initialize: function () {
    _.bindAll(this, 'render', 'addTodo');
    this.model.bind('change', this.render);
    this.render();
  },
  addTodo: function (e) {
    e.preventDefault();

    if ($('.js-get-val').val() === '') {
      this.model.set({ hasError: true, errorMsg: 'you need to put something' });
      $('.js-toggle-error').show();
    } else {
      $('.js-toggle-error').hide();
      this.model.set({
        val: $('.js-get-val').val(),
        hasError: false,
        errorMsg: '',
      });
      listView.addItem(this.model.get('val'));
    }
  },
  render: function () {
    const template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  },
});
new FormView();

const SearchView = Backbone.View.extend({
  collection: list,
  initialize: function () {
    this.render;
  },
  events: {
    'keyup .js-search': 'search',
  },
  search: function () {
    // e.preventDefault();
    this.model.set({ val: $('.js-search').val() });
    const searchVal = this.model.escape('val');

    this.collection.each(function (model, i) {
      model.set({ forSearchResult: true });
      const text = model.escape('text');
      // console.log('search word:' + searchVal);
      // console.log('model text:' + text);

      if (text.match(searchVal)) {
        // console.log('data exist');
        return this;
      }
      model.set({ forSearchResult: false });
    });
  },
  render: function () {
    this.render();
  },
});

const serchView = new SearchView({
  el: $('#js-search'),
  model: searchItem,
});
