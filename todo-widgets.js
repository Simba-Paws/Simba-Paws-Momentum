$(document).ready(function() {

  // initialize main focus
  var mainFocus = Object.create(Focus);
  mainFocus.setup("focus-list", "#focus-list");

  // set which divs toggle for query/input
  // call updateView to ensure correct div is displayed
  mainFocus.setDivs("#focus-query", "#focus-display");
  mainFocus.updateView();

  // handler to toggle and delete main focus
  $(mainFocus.target).on("click", "li span", function() {
    var span = this;
    mainFocus.handleModifications(span);
    mainFocus.updateView();
  });

  // handler to create new main focus
  $("#focus-query").submit(function(evt) {
    evt.preventDefault();
    if (mainFocus.list.length === 0) {
      mainFocus.addItem($("#focus-input").val());
    }
    $("#focus-input").val("");
    mainFocus.updateView($("#focus-query"), $("#focus-display"));
  });

  // initialize todo list
  var toDos = Object.create(List);
  toDos.setup("todo-list", "#todo-list");

  // handler to toggle and delete list items
  $(toDos.target).on("click", "li span", function() {
    var span = this;
    toDos.handleModifications(span);
  });

  // handler to create new todo
  $("#newItem").submit(function(evt) {
    evt.preventDefault();
    toDos.addItem($("#todo-input").val());
    $("#todo-input").val("");
  });

  // handler to hide and show todo list
  $(".expand-todo").on("click", function() {
    $(".todoContainer").toggle();
  });

});

// methods common to both todo list and main focus list
var List = {
  setup: function(loc, target) {
    this.loc = loc; // name of list key in local storage
    this.target = target; // id of ul in index.html
    this.list = this.getList(); // array of list items
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
              + "<span class=\"checkBox\"><i class=\"fa fa-check-square-o\" aria-hidden=\"true\"></i></span>" /*&#9634<*/
              + "<span class=\"list-item\">" + this.list[i].name + "</span>"
              + "<span class=\"delete\"><i class=\"fa fa-minus-square-o\" aria-hidden=\"true\"></i></span>" /*&#9747*/
            + "</li>";
    }
    $(this.target).html(todos);
  },
  handleModifications: function(span) {
    var index = $(span).parent().index();
    if ($(span).hasClass("checkBox")) { // toggle complete
      this.list[index].complete = !this.list[index].complete;
    }
    else if ($(span).hasClass("delete")) { // delete todo from list
      this.list.splice(index, 1);
    }
    localStorage.setItem(this.loc, JSON.stringify(this.list));
    this.updateDisplay();
  }
};

// additional functions specific to main focus 
var Focus = Object.create(List);
Focus.setDivs = function(query_id, display_id) {
  this.query_id = query_id;
  this.display_id = display_id;
};
Focus.updateView = function() {
  if (this.list.length === 0) {
    $(this.query_id).show();
    $(this.display_id).hide();
  }
  else {
    $(this.query_id).hide();
    $(this.display_id).show();
  }
};
