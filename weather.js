  var currentLat;
  var currentLon;
$(document).ready(function(){
  function loadWeather () {
    var geolocale = navigator.geolocation;
    if (!geolocale) {
      console.log("location is not available.");
    } else {
      geolocale.getCurrentPosition(function(position){
        currentLat = position.coords.latitude;
        currentLon = position.coords.longitude;
        console.log(currentLat);
        console.log(currentLon);
        findCity(currentLat, currentLon);
        return;
      });
    }
  };
  function updateWeather (data) {
    // convert temp in celsius
    console.log(data);
    var weatherIcon = $("<img>").attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    var defaultTemp = Math.round(data.main.temp - 273.15);
    $(".city").html(data.name + " , " + data.sys.country);
    $(".weather-des").html(data.weather[0].description);
    $(".temp").html(defaultTemp)
    $(".weather-wraper").append(weatherIcon);
  };
  function findCity (Lat, Lon) {
    var apikey = "4bfc9dbf7b65e87f36b170c2291adc53";
    var endpoint = "http://api.openweathermap.org/data/2.5/weather?lat=" + Lat + "&lon=" + Lon + "&APPID=" + apikey;
    console.log(endpoint);
    $.ajax({
      crossDomain: true,
      dataType: "json",
      url: endpoint,
      success: updateWeather,
      cache: false
    });
  };
  function convertTemp () {
    var currentUnit = $('.temp').attr("data-temp");
    var currentTemp = $('.temp').html();
    if(currentUnit == "F") {
      // convert C to F
      currentTemp = Math.round((currentTemp * 1.8) + 32);
      $('.temp').html(currentTemp);
      $('.temp-symbol').html("°F");
      return;
    } else {
      // convert F to C
      currentTemp = Math.round((currentTemp -32)/1.8);
      $('.temp').html(currentTemp);
      $('.temp-symbol').html("°C");
      return;
    }
  };
  // event listener to convert unit of temperature
  $(".btn-celsius").on('click', function(e){
    if($('.temp').attr("data-temp") == "C") {
return;
    } else {
      $('.temp').attr("data-temp", "C");
      convertTemp();
    }
  });
  $('.btn-fahrenheit').on('click', function(e){
    if($('.temp').attr("data-temp") == "F") {
      return;
    } else {
      $('.temp').attr("data-temp", "F");
      convertTemp();
    }
  });
  // execution
  loadWeather();
});
