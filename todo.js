$(document).ready(function() {

$("#todo-list").html(formatToDos());
 
$("#todo-list").on("click", "li span", function() {

	var index = $(this).parent().index();
	if ($(this).hasClass("deleteTodo")) {
		deleteItem(index);
	} 
	else {
		toggleComplete(index);
	}
})

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




})




var todoList = [{name: "get this working", complete: false}];

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
	todos += "<li class=" + className + ">" + "<span class=\"deleteTodo\">X</span>    " + "<span class=\"list-item\">" + todoList[i].name  + "</span>" + "</li>";
}

return todos;
}