function getWeather(){
  navigator.geolocation.getCurrentPosition(location);
  function location(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
  api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=a2ae677a9a46aa036297763878b218d3';
    $.ajax({
      url: api_url,
      method: 'GET',
      success: function(data){
        var tempr = data.main.temp;
        var city = data.name;
        var country = data.sys.country;
        var description = data.weather[0].description;
		var condition = data.weather[0].main;
		var sunset = data.sys.sunset;
		  console.log("sunset is " + sunset);
		var curTime = $.now();
		  curTime = curTime.toString();
		  curTime = curTime.slice(0, 10);
		  curTime = Number(curTime);
		  console.log("time is " + curTime);
		  console.log(typeof(curTime));
		   console.log(typeof(sunset));
		   console.log(sunset > curTime);
		  
        var clouds = data.clouds.all;
    //    var color = function(cl){
	//		cl = clouds;
    //    if(cl > 0){
    //        return 'grey';
    //      }
    //      else {
    //        return 'lightblue';
    //      }
    //    }
		
		var cond = condition.toLowerCase();
		 var back = getBack(cond);
		function getBack(c){
			if (curTime < sunset){
				return 'img/backs/night-sky.jpg';
			}
			else 
				{
			switch(c){
			case "rain":
					return 'img/backs/rain.jpg';
					break;
			case "clouds":
					if (clouds <= 50) {
					return 'img/backs/slightly-cloudy.jpg';
					}
					else {
						return 'img/backs/very-cloudy.jpg';
					}
					break;
			case "thunderstorm":
					return 'img/backs/thunderstorm.jpg';
					break;
			default:
				return 'img/backs/clear-sky.jpg';
			}
				}
        
        }
		  
     //   $("body").css("background-color", color);
	  // $("#wrapper").css("background-image",'url('+ back +')');
		   $("body").css("background-image",'url('+ back +')');
		  console.log('url('+ back +')');
		 
        var wind = data.wind.speed;
       var iconCode = data.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
$("#icon").prepend("<img src='" + iconURL +  "'/>");       $("#temperature").html(Math.round(tempr) + ' &deg;F' );
  $("#location").text(city + ', ' + country);
//         $("#cloudy").text(function(num){
//           num = clouds;
//          if (clouds > 0){
//            return "It is " + num + "% cloudy right now";
//          }
//          else {
//           }
//        });
        $("#description").text(description);
$("#wind").text("Wind " + Math.round(wind) + " mph");
      }
    });

// getting sunset info for the night sky background
sunset_api_url = 'http://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lon';


  }
  
}

$(document).ready(function(){
  var lat, lon, api_url;
  
  if("geolocation" in navigator) {
    getWeather();
    
  } else {
    alert("Your browser doesn't support geolocation.");
  }
 
	
});