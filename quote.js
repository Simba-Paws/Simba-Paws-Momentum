$(document).ready(function() {
  var qod = $.getJSON("http://quotes.rest/qod.json?category=inspire", function(data) {
    console.log(data);
  });
});
