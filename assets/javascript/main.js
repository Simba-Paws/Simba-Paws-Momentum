// Global vars for weather
var apiKey = "f27a663a728568282620c26af630aefb";
var latitude = 0;
var longitude = 0;
var unitSymbol = "&deg;F";
var units = "imperial";
var weatherDesc = "clear sky";

// Global vars for Clock

var date;
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var day, day_month, month, year;

// for background image
var string;

// for settings
var settings;

$(document).ready(function() {

	// get settings
	initSettings();

	// Display the background
	if (navigator.onLine) {
		string = 'https://source.unsplash.com/category/nature/1920x1080/daily';
		document.body.style.backgroundImage = "url('" + string + "')";
	} else {
		string = './assets/images/momentum-offline.jpg';
		document.body.style.backgroundImage = "url('" + string + "')";
	}

	if (localStorage.getItem('displayName') === null) {
    	getGreeting();
  } else {
		initGreeting();
	}

	// For search links


		$(function(){
	    	$(".expand-links").click(function(){
	        	$(".links").toggle();
	      });
	  });



	// Start the clock
	initClock();

	// Find the user's location and display the weather
	findUserLocation();

quoteDisplay();

initTodoList();

initMainFocus();

});

// Display greeting

function initGreeting() {

	// initialize main Greeter
	 userName = localStorage.getItem('displayName');
	$("#greeting").html("Hello, "+userName);

}

function getGreeting() {

	console.log("Hiding focus");
	// Hid the main focus element
	$("#Greeter-query").show();
	$("#focusContainer").hide();
	$("#greeting").hide();

	console.log("creating form");

	$('#Greeter-query').submit(function(e) {
		e.preventDefault();
		console.log("in click function");
    	localStorage.setItem('displayName', $("#Greeter-input").val());
    	/*$('body').remove($div);*/
    	$("#focusContainer").show();
			$("#greeting").show();
			$("#Greeter-query").hide();
			initGreeting();
  	});

}

// Init and functions for settings
function initSettings() {
	var default_settings = [
		{name: "Links", status: "on", id: "#links-container"},
		{name: "Weather", status: "on", id: "#tempContainer"},
		{name: "Quote", status: "on", id: "#quote-container"},
		{name: "Focus", status: "off", id: "#focusContainer"},
		{name: "To-Do", status: "on", id: "#todo-container"}
	];

	// get settings from local storage
	settings_string = localStorage.getItem("settings");
	if (settings_string) {
		settings = JSON.parse(settings_string);
	}
	else {
		settings = default_settings;
		localStorage.setItem("settings", JSON.stringify(settings));
	}
	$(".setting-toggle").each(function(i) {
		var index = $(this).parent().index();
		if (settings[index].status === "on") {
			$(this).html("<i class='fa fa-check-square-o' aria-hidden='true'></i>");
			$(settings[index].id).show();
		}
		else {
			$(this).html("<i class='fa fa-square-o' aria-hidden='true'></i>");
			$(settings[index].id).hide();
		}
	});

	// initialize button to open div
	$("#expand-settings").on("click", function() {
		$("#settings").toggle();
	});

	// function to turn items on and off
	$(".setting-toggle").on("click", function() {
		var index = $(this).parent().index();
		console.log(settings[index]);
		if (settings[index].status === "on") {
			$(this).html("<i class='fa fa-square-o' aria-hidden='true'></i>");
			settings[index].status = "off";
			$(settings[index].id).hide();
		}
		else {
			$(this).html("<i class='fa fa-check-square-o' aria-hidden='true'></i>");
			settings[index].status = "on";
			$(settings[index].id).show();
		}


		localStorage.setItem("settings", JSON.stringify(settings));
	});
}

// Init and functions fo rmain focus
function initMainFocus() {

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
}

// Init and functions for todo list
function initTodoList() {

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

}

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
			var todos = [];
			for (var i = 0; i < this.list.length; i++) {
				todos[i] = createTodo(i, this.list[i]);
			}

			$(this.target).html(todos);

			function createTodo(i, list_item) {
				var className = '', icon = "fa-square-o";

				if (list_item.complete) {
					className = "complete";
					icon = "fa-check-square-o";
				}
				return "<li class=" + className + ">"
								+ "<span class=\"checkBox\"><i class=\"fa " + icon + "\" aria-hidden=\"true\"></i></span>" /*&#9634<*/
								+ "<span class=\"list-item\">" + list_item.name + "</span>"
								+ "<span class=\"delete\"><i class=\"fa fa-minus-square-o\" aria-hidden=\"true\"></i></span>" /*&#9747*/
							+ "</li>";
			}
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



// Functions for Quote Display

function quoteDisplay() {

	var qod = $.getJSON("https://quotes.rest/qod.json?category=inspire", function(data) {
    	console.log(data);
    	$("#quotes").html(data.contents.quotes[0].quote);
    	$("#quote-author").html(data.contents.quotes[0].author);
  		});

	$("#quote-container").hover(function() {
		$("#quote-citation").toggle();
  		$("#quote-container").css("max-height", "150px");
	});

}

// Functions for the clock

function initClock() {

	date = new Date();
	day = days[date.getDay()];
	day_month = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	month = months[date.getMonth()];
	year = date.getFullYear();

	var dateString = day + ", " + [month, day_month, year].join(" ");
	document.getElementById("date").innerHTML = dateString + "<br>";

	var refresh = window.setInterval(updateClock, 100);
	var timeString;
	var hour, minute, second;

}

function updateClock(){

	date = new Date();
	hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	// second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	timeString = [hour,minute].join(":");
	document.getElementById("clock").innerHTML = timeString;
}

// Functions for the weather

function findUserLocation() {
    // grab user location coords
    var URL = "https://freegeoip.net/json/";
    $.get(URL, function(data) {
      // if coords, assign to variables and pass to getWeatherData();
      if (data) {
        latitude = data.latitude;
        longitude = data.longitude;
        console.log("Lat = "+latitude+" lon = "+longitude);
        getWeather();
      } else {
        var error = "There was an error fetching your location, please try again later.";
        alert(error);
      }
    });
  }

  function getWeather() {
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + units, function(data) {
      console.log("https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + units);
      $("#location-value").html(data.name + ", " + data.sys.country);
      $("#temp-value").html(Math.round(data.main.temp));
      console.log(unitSymbol);
      $("#temp-symbol").html(unitSymbol);
			weatherDesc = data["weather"][0]["description"];
			$("#description-value").html(weatherDesc);
    });
  }


  $("#temp-value").click(function() {

  console.log("chgUnits was clicked Units = " + units + " UnitSymbol = " + unitSymbol);

  if (units == "metric") {
    units = "imperial";
    unitSymbol = "&deg;F";
    // $("#chgUnits").html("Metric");
  } else {
    units = "metric";
    unitSymbol = "&deg;C";
    // $("#chgUnits").html("Farenheit");
  }

  getWeather();

  });
