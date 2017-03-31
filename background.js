
if (navigator.onLine) {
	var string = 'https://source.unsplash.com/category/nature/1920x1080/daily';
	document.body.style.backgroundImage = "url('" + string + "')";
} else {
	var string = './assets/images/momentum-offline.jpg';
	document.body.style.backgroundImage = "url('" + string + "')";
}



