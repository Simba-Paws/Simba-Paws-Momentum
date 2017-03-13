$(document).ready(function() {


$("#todo-list").html(formatToDos());

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
for (var i = 0; i < todoList.length; i++) {
	todos += "<li>" + todoList[i].name + " " + todoList[i].complete.toString() + "</li>";
}
return todos;
}