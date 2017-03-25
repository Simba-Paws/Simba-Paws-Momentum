$(document).ready(function() {



getFocusList();
  $("#focus-list").html(formatToDos(focusList));

  // handle modifications to list item
  $("#focus-list").on("click", "li span", function() {
    var index = $(this).parent().index();

    // if checkbox clicked, toggle complete
    if ($(this).hasClass("checkBox")) {
      toggleFocusComplete(index);
    }
    // if delete button clicked, delete item
    else if ($(this).hasClass("deleteTodo")) {
      deleteFocusItem(index);
    }
    // if text clicked, grab content to update the todo
    else if ($(this).hasClass("list-item")) {
      /*
        insert code to update the todo
      */
    }
  });


  $("#focus-query").submit(function (e) {
  	e.preventDefault();
  	var data = $("input").val();

  	if (data.length <= 0){
  		alert("Please enter a todo");
  	} else {
  		addFocusItem(data);
  		$("input").val("");
  	}
  });

});


var focusList = [];

function getFocusList() {
  var lst = localStorage.getItem("focus-list");
  if (lst)
  {
    focusList = JSON.parse(lst);
  }
}

function addFocusItem(item) {
	if (focusList.length === 0) {
		focusList[0] = {};
		focusList[0].name = item;
		focusList[0].complete = false;

	  localStorage.setItem("focus-list", JSON.stringify(focusList));
	}
	printFocusList();
	console.log(item);
}

function updateFocusItem(index, newName) {
	focusList[index].name = newName;
  localStorage.setItem("focus-list", JSON.stringify(focusList));
	printFocusList();
}

function toggleFocusComplete(index) {
	focusList[index].complete = !focusList[index].complete;
  localStorage.setItem("focus-list", JSON.stringify(focusList));
	printFocusList();
}

function deleteFocusItem(index) {
	focusList.splice(index, 1);
  localStorage.setItem("focus-list", JSON.stringify(focusList));
	printFocusList();
}

function printFocusList() {
	var focus = formatToDos(focusList); // func located in todo.js
	$("#focus-list").html(focus);
}



