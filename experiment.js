$(document).ready(function() {

  // main focus
  var mainFocus = Object.create(List);
  mainFocus.setup("focus-list", "#focus-list");
  $(mainFocus.target).on("click", "li span", mainFocus.handleModifications);

  $("#focus-query").submit(mainFocus.handleSubmit);

  // todo list
  var toDos = Object.create(List);
  toDos.setup("todo-list", "#todo-list");
  $(toDos.target).on("click", "li span", toDos.handleModifications);

  $("#newItem").submit(toDos.handleSubmit);

  $(".expand-todo").on("click", function() {
    $(".todoContainer").toggle();
  });
  
});

var List = {
  setup: function(loc, target) {
    this.loc = loc;
    this.target = target;
    this.list = getList();
    this.updateDisplay();
  },
  getList: function() {
    var lst = localStorage.getItem(this.loc);
    return lst ? JSON.parse(lst) : [];
  },
  addItem: function(task_name) {
    if (task_name.length === 0) {
      return;
    }
    var obj = {};
    obj.name = task_name;
    obj.complete = false;

    this.list.push(obj);
    this.saveList();
    this.updateDisplay();
  },
  toggleComplete: function(index) {
    this.list[index].complete = !this.list[index].complete;
    this.saveList();
    this.updateDisplay();
  },
  deleteItem: function(index) {
    this.list.splice(index, 1);
    this.saveList();
    this.updateDisplay();
  },
  updateDisplay: function() {
    var todos = "", className;
    for (var i = 0; i < this.list.length; i++) {
      className = this.list[i].complete ? "complete" : "";
      todos += "<li class=" + className + ">"
              + "<span class=\"delete\">&#9747</span>"
              + "<span class=\"checkBox\"> &#9634 </span>"
              + "<span class=\"list-item\">" + this.list[i].name + "</span>"
            + "</li>";
    }
    $(this.target).html(todos);
  },
  saveList: function() {
    localStorage.setItem(this.loc, JSON.stringify(this.list));
  },
  handleSubmit: function(evt, obj) {
    event.preventDefault();
    obj.addItem($("input").val());
    $("input").val("");
  },
  handleModifications: function(evt) {
    // Note: "this" refers to clicked span
    var index = $(this).parent().index();

    if ($(this).hasClass("checkBox")) {
      toggleComplete(index);
    }
    else if ($(this).hasClass("deleteTodo")) {
      deleteItem(index);
    }
  }
};
