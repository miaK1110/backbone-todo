console.log('aaaaaaaaaaaa');
alert('aaaaaaaaaaa');

//===========================================
// Model
//==========================================

// task
const ListItem = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false,
  },
  initialize: function (attrs) {
    console.log('attrs', attrs);
  },
  validation: function (attrs) {
    if (!text || attrs.text.length === 0) {
      return 'You need to put something';
    }
  },
});

console.log(ListItem.toJSON());

const listItem1 = new ListItem({ text: 'サンプルTODOタスク', isDone: false });
const listItem2 = new ListItem({ text: 'サンプルTODOタスク', isDone: true });

//===========================================
// Collection
//===========================================

const TODOLIST = Backbone.Collection.extend({
  model: ListItem,
});

const todoList = new TODOLIST([listItem1, listItem2]);

//===========================================
// View
//===========================================

const ListView = Backbone.View.extend({
  initialize: function () {
    _bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.render();
  },
  render: function () {
    const template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  },
});

const listview = new ListView({
  model: ListItem,
  el: $('.js-todo-list'),
  collection: todoList,
});
