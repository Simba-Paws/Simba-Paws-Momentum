$(document).ready(function() {

  // initialize main Greeter
  var greeterName = Object.create(Greeter);
  greeterName.setup("Greeter-list", "#Greeter-list");

  // set which divs toggle for query/input
  // call updateView to ensure correct div is displayed
  greeterName.setDivs("#Greeter-query", "#Greeter-display");
  greeterName.updateView();

  // handler to toggle and delete main Greeter
  $(greeterName.target).on("click", "li span", function() {
    var span = this;
    greeterName.handleModifications(span);
    greeterName.updateView();
  });

  // handler to create new main Greeter
  $("#Greeter-query").submit(function(evt) {
    evt.preventDefault();
    if (greeterName.list.length === 0) {
      greeterName.addItem($("#Greeter-input").val());
    }
    $("#Greeter-input").val("");
    greeterName.updateView($("#Greeter-query"), $("#Greeter-display"));
  });

});

// methods common to both todo list and main Greeter list
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
    var todos = "", className = "", icon = "fa-square-o";
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].complete) {
        className = "complete";
        icon = "fa-check-square-o";
      }
      todos += "<li class=" + className + ">"
              + "<span class=\"list-item greeting\">\Hello,\"" + this.list[i].name + "</span>"
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

// additional functions specific to main Greeter
var Greeter = Object.create(List);
Greeter.setDivs = function(query_id, display_id) {
  this.query_id = query_id;
  this.display_id = display_id;
};
Greeter.updateView = function() {
  if (this.list.length === 0) {
    $(this.query_id).show();
    $(this.display_id).hide();
  }
  else {
    $(this.query_id).hide();
    $(this.display_id).show();
  }
};