setInterval("setDate()", 1000);

const icon = document.getElementById('icon');
var temperature;

function setDate() {
  var now = new Date();
  const t = now.toLocaleTimeString('en-US');
  document.getElementById('time').innerText = t;
}

window.onload = getLocation;

var loc = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    loc.innerHTML = 'Geolocation is not supported by the browser';
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;


  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=d0769cf4ca29e4fed1db6a1803334822')
    .then(function(r) {
         return r.json();
    })
    .then(function(j) {
        console.log(j);

        let condition = j.weather[0].id;
        $('.wi').addClass("wi-owm-" + condition);
        document.getElementById('name').innerText = j.name;

        let t = Number(j.main.temp).toFixed();
        let celsius = (t - 273.15).toFixed();
        document.getElementById('temp').innerText = celsius.toString() + "\u00B0" + "C";
        let fahrenheit = (celsius * 1.8 + 32).toFixed();
        toggleC = true;
        document.getElementById("slider").classList.remove('hider');

        $("span").on("click",function() {
				toggleC = !toggleC;
			    if (toggleC) {
          document.getElementById('temp').innerText = celsius.toString() + "\u00B0" + "C";
				  } else {
          document.getElementById('temp').innerText = fahrenheit.toString() + "\u00B0" + "F";
          }
        });
    })
}
