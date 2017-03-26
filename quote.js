$(document).ready(function() {
  var qod = $.getJSON("http://quotes.rest/qod.json?category=inspire", function(data) {
    console.log(data);
    $("#quotes").html(data.contents.quotes[0].quote);
    $("#quote-author").html(data.contents.quotes[0].author);
  });

$("#quotes").hover(function() {
	$("#quote-citation").toggle();
});

});

		
