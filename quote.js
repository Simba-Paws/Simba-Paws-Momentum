$(document).ready(function() {
  var qod = $.getJSON("http://quotes.rest/qod.json?category=inspire", function(data) {
    console.log(data);
    $("#quotes").html(/*data.contents.quotes[0].quote*/ "That's my last duchess painted on the wall / looking as if she were alive. I call / that piece a wonder now. Fra Pandolf's hand / worked busily a day and there she stands. Will it please you sit and look at her? I said...");
    $("#quote-author").html(data.contents.quotes[0].author);
  });

$("#quote-container").hover(function() {
	$("#quote-citation").toggle();
  $("#quote-container").toggleClass("onhover");
});

});
