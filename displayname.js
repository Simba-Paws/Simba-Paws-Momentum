
$(document).ready(function() {

console.log("Hi from Document ready in displayname");
    displayUserName();

function displayUserName() {
    // See if user name is in local storage

    $('#nameModal').modal('hide');

    console.log("Hi from displayUserName");

    localStorage.removeItem('displayName');

    if (!localStorage.displayName)
    {
      $("#greeting").html("Hello");
      console.log("displayname is null, going to show modal");
    	// Display the modal to get the username
    	$('#nameModal').modal('show');
    }
  
    userName = localStorage.getItem('displayName');
	$("#greeting").html("Hello, "+userName);

  }
  
 $("#closeModal").click(function() {

  var thisName = $('#name-input');
  console.log("Hi from enter name, name entered is "+thisName);

 	localStorage.setItem('displayName',thisName);
  $('#nameModal').modal('hide');
  console.log("Returning from enterName");
 });
 
  });