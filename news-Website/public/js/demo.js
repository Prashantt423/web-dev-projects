const https = require("https");

$(function() {
  // aos animation initialisation
  AOS.init({
    duration: 2000,
    once: true
  });

  // scroll header script here
  // window.onscroll = function() {
  //   scrollHeader();
  // };
  // // Get the header
  // var header = $(".navbar-bottom");
  // var body = $("body");
  // function scrollHeader() {
  //   // adding sticky class
  //   if (window.pageYOffset > 130) {
  //     $(header).addClass("sticky");
  //   } else {
  //     // removing sticky class
  //     $(header).removeClass("sticky");
  //   }
  // }

  //add sticky on scroll down
  var lastScrollTop = 0;

// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
// window.addEventListener("scroll", function(){ 
//    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
//    if (st > lastScrollTop ){
//       // downscroll code
//       $(header).removeClass("sticky");
//    } else  {
//       // upscroll code
//       $(header).addClass("sticky");
     
//    }
//    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// }, false);

  // navbar toggler script
  $(".navbar-toggler").on("click", function() {
    $(".collapse").toggleClass("show");
    $("body").toggleClass("layer-open");
    // $(header).toggleClass("sticky-not");
    $(".navbar-close").show();
  });
  $(".navbar-close").on("click", function() {
    $(".collapse").toggleClass("show");
    $(".navbar-close").hide();
    $("body").toggleClass("layer-open");
    // $(header).toggleClass("sticky-not");
    $(".dark-overlay").click(function() {
      $(".collapse").removeClass("show");
      $("body").removeClass("layer-open");
    });
  });

  // $(".navbar-bottom  .navbar-nav a").on("click", function() {
  //   $(".navbar-bottom  .navbar-nav")
  //     .find("li.active")
  //     .removeClass("active");
  //   $(this)
  //     .parent("li")
  //     .addClass("active");
  // });

  $("html").easeScroll({
    frameRate: 60,
    animationTime: 1000,
    stepSize: 40,
    pulseAlgorithm: 1,
    pulseScale: 8,
    pulseNormalize: 1,
    accelerationDelta: 100,
    accelerationMax: 1,
    keyboardSupport: true,
    arrowScroll: 50,
    touchpadSupport: true,
    fixedBackground: true
  });
});


//city name,date,  and temp
const url="api.openweathermap.org/data/2.5/weather?q=";
const appid="&appid=f34cc5af67261a3596c2221502246a9b";
const rest_url= "&units=metric";
const city="";
//client's own city
// Step 1: Get user coordinates
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		// console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.103efaacd44bfa4c2d838010bd5f9e45&lat=" +
	lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			 city = response.address.city;
			return;
		}
	}
}

getCoordintes();
const urlfinal= "https:\\"+url+`${city}`+appid+ rest_url;

  https.get(urlfinal,function(response){
      console.log(response.statuscode);
      response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp= weatherData.main.temp;
        console.log(`<h1 styles="color: blue;">the temperature of ${city} city is ${temp} degrees celsius</h1>`);

      });
    });

// console.log(`Temp of ${city} is `)

//end client getCity
