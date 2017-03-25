$(document).ready(function() {

  $(function(){
      $('.expand-todo').click(function(){
          $('.todoContainer').toggle();
      });
  });

  getTodoList();
  $("#todo-list").html(formatToDos(todoList));

  // handle modifications to list item
  $("#todo-list").on("click", "li span", function() {
    var index = $(this).parent().index();

    // if checkbox clicked, toggle complete
    if ($(this).hasClass("checkBox")) {
      toggleComplete(index);
    }
    // if delete button clicked, delete item
    else if ($(this).hasClass("deleteTodo")) {
      deleteItem(index);
    }
    // if text clicked, grab content to update the todo
    else if ($(this).hasClass("list-item")) {
      /*
        insert code to update the todo
      */
    }
  });

  $("#newItem").submit(function (e) {
  	e.preventDefault();
  	var data = $("input").val();

  	if (data.length <= 0){
  		alert("Please enter a todo");
  	} else {
  		addItem(data);
  		$("input").val("");
  	}
  });

});

var todoList = [{name: "First todo", complete: false}];

function getTodoList() {
  var lst = localStorage.getItem("todo-list");
  if (lst)
  {
    todoList = JSON.parse(lst);
  }
}

function addItem(item) {
	var obj = {};
	obj.name = item;
	obj.complete = false;

	todoList.push(obj);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
	printList();
}

function updateItem(index, newName) {
	todoList[index].name = newName;
  localStorage.setItem("todo-list", JSON.stringify(todoList));
	printList();
}

function toggleComplete(index) {
	todoList[index].complete = !todoList[index].complete;
  localStorage.setItem("todo-list", JSON.stringify(todoList));
	printList();
}

function deleteItem(index) {
	todoList.splice(index, 1);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
	printList();
}

function printList() {
	var todos = formatToDos(todoList);
	$("#todo-list").html(todos);
}

function formatToDos(lst) {
  var todos = "";
  var className = "complete";

  for (var i = 0; i < lst.length; i++) {
  	if (lst[i].complete) {
  		className = "complete";
  	}
  	else {
  		className = "";
  	}
  	todos += "<li class=" + className + ">" + "<span class=\"deleteTodo\">&#9747</span>    "   +  "<span class=\"checkBox\"> &#9634 </span>    " + "<span class=\"list-item\">" + lst[i].name  + "</span>" + "</li>";
  }

  return todos;
}
