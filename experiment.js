$(document).ready(function() {

  // main focus
  var mainFocus = Object.create(List);
  mainFocus.setup("focus-list", "#focus-list");

  $(mainFocus.target).on("click", "li span", function() {
    var span = this;
    mainFocus.handleModifications(span);
  });

  $("#focus-query").submit(function(evt) {
    evt.preventDefault();
    if (mainFocus.list.length === 0) {
      mainFocus.addItem($("#focus-input").val());
    }
    $("#focus-input").val("");
  });

  // todo list
  var toDos = Object.create(List);
  toDos.setup("todo-list", "#todo-list");

  $(toDos.target).on("click", "li span", function() {
    var span = this;
    toDos.handleModifications(span);
  });

  $("#newItem").submit(function(evt) {
    evt.preventDefault();
    toDos.addItem($("#todo-input").val());
    $("#todo-input").val("");
  });

  $(".expand-todo").on("click", function() {
    $(".todoContainer").toggle();
  });

});

var List = {
  setup: function(loc, target) {
    this.loc = loc;
    this.target = target;
    this.list = this.getList();
    this.updateDisplay();
  },
  getList: function() {
    var lst = localStorage.getItem(this.loc);
    return lst ? JSON.parse(lst) : [];
  },
  addItem: function(task_name) {
    if (task_name.length > 0) {
      var obj = {};
      obj.name = task_name;
      obj.complete = false;

      this.list.push(obj);
      localStorage.setItem(this.loc, JSON.stringify(this.list));
      this.updateDisplay();
    }
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
  handleModifications: function(span) {
    var index = $(span).parent().index();
    if ($(span).hasClass("checkBox")) {
      this.list[index].complete = !this.list[index].complete;
    }
    else if ($(span).hasClass("delete")) {
      this.list.splice(index, 1);
    }
    localStorage.setItem(this.loc, JSON.stringify(this.list));
    this.updateDisplay();
  }
};
