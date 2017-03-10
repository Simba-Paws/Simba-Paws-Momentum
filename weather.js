  var apiKey = "f27a663a728568282620c26af630aefb";
  var latitude = 0;
  var longitude = 0;
  var unitSymbol = "C";
  var units = "metric";
  var weatherDesc = "clear sky";

$(document).ready(function() {

    findUserLocation();

  });

function findUserLocation() {
    // grab user location coords
    var URL = "http://ip-api.com/json";
    $.get(URL, function(data) {
      // if coords, assign to variables and pass to getWeatherData();
      if (data) {
        latitude = data.lat;
        longitude = data.lon;
        console.log("Lat = "+latitude+" lon = "+longitude);
        getWeather();
      } else {
        var error = "There was an error fetching your location, please try again later.";
        alert(error);
      }
    });
  }


function getWeather() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + units, function(data) {
      console.log("https://crossorigin.me/https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + units);
      $("#location-value").html(data.name + ", " + data.sys.country);
      $("#temp-value").html(Math.round(data.main.temp) + unitSymbol);
			weatherDesc = data["weather"][0]["description"];
			$("#description-value").html(weatherDesc);
    });
  }

 
  $("#chgUnits").click(function() {

  console.log("chgUnits was clicked Units = " + units + " UnitSymbol = " + unitSymbol);

  if (units == "metric") {
    units = "imperial";
    unitSymbol = "F";
    $("#chgUnits").html("Metric");
  } else {
    units = "metric";
    unitSymbol = "C";
    $("#chgUnits").html("Farenheit");
  }

  getWeather();

  });

weatherDesc = data["weather"][0]["description"];