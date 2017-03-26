$(document).ready(function() {

  // initialize main focus
  var mainFocus = Object.create(List);
  mainFocus.setup("focus-list", "#focus-list");

  // load focus-query if no focus 
  if (mainFocus.list.length === 0) {
    $("#focus-query").show();
  }

  // handler to toggle and delete main focus
  // $(mainFocus.target).on("click", "li span", function() {
  //   var span = this;
  //   mainFocus.handleModifications(span);
  //   $("#focus-query").show();
  // });

  // handler for delete
  $(mainFocus.target).on("click", ".delete", function() {
    var span = this;
    mainFocus.handleModifications(span);
    $("#focus-query").show();
  });

  // Handler for toggle complete
    $(mainFocus.target).on("click", ".checkBox", function() {
    var span = this;
    mainFocus.handleModifications(span);
  });


  // handler to create new main focus
  $("#focus-query").submit(function(evt) {
    evt.preventDefault();
    if (mainFocus.list.length === 0) {
      mainFocus.addItem($("#focus-input").val());
    }
    $("#focus-input").val("");
    $('#focus-query').hide();
  });

  // handler to show display / unhide focus input
  // $(".delete").on("click", function() {
  //   $("#focus-query").show();
  // });  

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
              + "<span class=\"delete glyphicon glyphicon-remove\"></span>"
              + "<span class=\"checkBox glyphicon glyphicon-unchecked \"></span>"
              + "<span class=\"list-item\">" + this.list[i].name + "</span>"
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
