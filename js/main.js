$(document).ready(function(){
	// alert(":)");
	
	var d = new Date();
    var	n = d.getDay();
    console.log(n);

	$("#start").click(function(){
		$(".sect-banner").toggle();
		$("#enterValues").toggle();
	});

	function fromCityWeather (fromCity) {
		$.getJSON(
			 "http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: fromCity,
				cnt: 7,
				appid: "4222d4e937e261a81e1d84fa1e3f669c",
				units: "Imperial"
			},
			function(response){
				console.log(response);
				 // If we don't get data back
                if(response.cod != 200){
                    alert(response.message);
                } else {
                	$("#enterValues").toggle();
					$(".result").toggle();
                }
                var day = [];
                var weather = [];
                var temp = [];
                var iconUrl = "";
                var iconName = "";
                var icon = "";

                $("#fromCity h2").html(fromCity);
                // Save the data in vars
                for(var i = 0; i < 7; i++){
                	weather[i] = response.list[i].weather[0].main;
                	temp[i] = response.list[i].temp;
                	day_temp = temp[i].day;
                	night_temp = temp[i].night;
                	day[i] = dayOfTheWeek(n);
                	if( n === 6 ){
                		n = 0;
                	} else {
                		n += 1;
                	}
                	iconUrl = "images/icons/" + response.list[i].weather[0].icon + ".png";
                	icon = response.list[i].weather[0].icon;
					iconName = ".icon" + i;
					console.log(icon);
					console.log(iconName);
					console.log(iconUrl);
					if(i === 0){
						$("#fromCity " + iconName + " p").html("NOW");
					} else {
						$("#fromCity " + iconName + " p").html(day[i]);
					}
					$("#fromCity " + iconName + " img").attr("src" , iconUrl);
					$("#fromCity " + iconName + " #day").html("Day:   " + day_temp.toFixed(0) + "&#176;");
					$("#fromCity " + iconName + " #night").html("Night: " + night_temp.toFixed(0)+ "&#176;");
	                console.log(weather[i]);
	                console.log(day_temp);
	                console.log(night_temp);
	                console.log(day[i]);
                }
                n = 0; 
			}
			 
		);
		
	}

	function toCityWeather (toCity){
		
		$.getJSON(
			"http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: toCity,
				cnt: 7,
				appid: "4222d4e937e261a81e1d84fa1e3f669c",
				units: "Imperial"
			},
			function(response){
				console.log(response);
				 // If we don't get data back
                if(response.cod != 200){
                    alert(response.message);
                }

               	var day2 = [];
                var weather = [];
                var temp = [];
                var iconUrl = "";
                var iconName = "";
                var icon = "";
                var toLon = "";
				var toLat = "";
                $("#toCity h2").html(toCity);
                
                // Save the data in vars
                for(var i = 0; i < 7; i++){
                	weather[i] = response.list[i].weather[0].main;
                	temp[i] = response.list[i].temp;
                	day2[i] = dayOfTheWeek(n);
                	if( n === 6 ){
                		n = 0;
                	} else {
                		n += 1;
                	}
                	
	                day_temp = temp[i].day;
                	night_temp = temp[i].night;

                	iconUrl = "images/icons/" + response.list[i].weather[0].icon + ".png";
                	icon = response.list[i].weather[0].icon;
					iconName = ".icon" + i;
					console.log(icon);
					console.log(iconName);
					console.log(iconUrl);
					if(i === 0){
						$("#toCity " + iconName + " p").html("NOW");
					} else {
						$("#toCity " + iconName + " p").html(day2[i]);
					}
					$("#toCity " + iconName + " img").attr("src" , iconUrl);
					$("#toCity " + iconName + " #day").html("Day: " + day_temp.toFixed(0)+ "&#176;");
					$("#toCity " + iconName + " #night").html("Night: " + night_temp.toFixed(0)+ "&#176;");
	                console.log(weather[i]);
	                console.log(day_temp);
	                console.log(night_temp);
	                console.log(day2[i]);
                }
                
			}
			
		);
	}

	function dayOfTheWeek (n) {
		
        switch (n) {
		    case 0:
		        return day = "SUN";
		        break;
		    case 1:
		        return day = "MON";
		        break;
		    case 2:
		        return day = "TUE";
		        break;
		    case 3:
		        return day = "WED";
		        break;
		    case 4:
		        return day = "THU";
		        break;
		    case 5:
		        return day = "FRI";
		        break;
		    case 6:
		        return day = "SAT";
		        break;
		}

	}

	$("#submit").click(function(event){
		event.preventDefault();
		var fromCity = $("#fromCity").val();
		var toCity = $("#toCity").val();
		fromCityWeather (fromCity);
		toCityWeather (toCity);
		
	});
});