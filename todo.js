$(document).ready(function() {

  $("#todo-list").html(formatToDos());

// $("#todo-list").on("click", "li span", function() {

// 	var index = $(this).parent().index();
// 	if ($(this).hasClass("deleteTodo")) {
// 		deleteItem(index);
// 	}
// 	else {
// 		toggleComplete(index);
// 	}
// })

/*
  // toggle todo
  $("#todo-list").on("click", "li span", function() {

  	var index = $(this).parent().index();
  	if ($(this).hasClass("checkBox")) {
  		toggleComplete(index);
  	}
  });

  // delete todo
  $("#todo-list").on("click", "li span", function() {

  	var index = $(this).parent().index();
  	if ($(this).hasClass("deleteTodo")) {
  		deleteItem(index);
  	}
  });

*/
  // handle modifications list item
  $("#todo-list").on("click", "li span", function() {
    var index = $(this).parent().index();

    // if checkbox clicked, toggle complete
    if ($(this).hasClass("checkbox")) {
      toggleComplete(index);
    }
    else if ($(this).hasClass("deleteTodo")) {
      deleteItem(index);
    }
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

function addItem(item) {
	var obj = {};
	obj.name = item;
	obj.complete = false;

	todoList.push(obj);
	printList();
}

function updateItem(index, newName) {
	todoList[index].name = newName;
	printList();
}

function toggleComplete(index) {
	todoList[index].complete = !todoList[index].complete;
	printList();
}

function deleteItem(index) {
	todoList.splice(index, 1);
	printList();
}

function printList() {
	var todos = formatToDos();
	$("#todo-list").html(todos);
}

function formatToDos() {
  var todos = "";
  var className = "complete";

  for (var i = 0; i < todoList.length; i++) {
  	if (todoList[i].complete) {
  		className = "complete";
  	}
  	else {
  		className = "";
  	}
  	todos += "<li class=" + className + ">" + "<span class=\"deleteTodo\">&#9747</span>    "   +  "<span class=\"checkBox\"> &#9634 </span>    " + "<span class=\"list-item\">" + todoList[i].name  + "</span>" + "</li>";
  }

  return todos;
}
