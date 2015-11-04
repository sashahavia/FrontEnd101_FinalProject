$(document).ready(function(){
	// alert(":)");
	
	var d = new Date();
    var	n = d.getDay();
    console.log(n);

	$("#start").click(function(){
		$(".sect-banner").toggle();
		$("#enterValues").toggle();
	});

	function dayOfTheWeek (n) {
		
        switch (n) {
		    case 0:
		        return day = "Sunday";
		        break;
		    case 1:
		        return day = "Monday";
		        break;
		    case 2:
		        return day = "Tuesday";
		        break;
		    case 3:
		        return day = "Wednesday";
		        break;
		    case 4:
		        return day = "Thursday";
		        break;
		    case 5:
		        return day = "Friday";
		        break;
		    case 6:
		        return day = "Saturday";
		        break;
		}

	}

	$("#submit").click(function(event){
		event.preventDefault();
		$("#enterValues").toggle();
		$(".result").toggle();
		var fromCity = $("#fromCity").val();
		var toCity = $("#toCity").val();

		$.getJSON(
			 "http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: fromCity,
				cnt: 5,
				appid: "bd82977b86bf27fb59a04b61b657fb6f",
				units: "imperial"
			},
			function(response){
				console.log(response);
				 // If we don't get data back
                if(response.cod != 200){
                    alert(response.message);
                }
                var day = [];
                var weather = [];
                var temp = [];
                var iconUrl = "";
                var iconName = "";
                var icon = "";
                $(".fromCity h2").html(fromCity);
                // Save the data in vars
                for(var i = 0; i < 5; i++){
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
					$("#fromCity " + iconName + " img").attr("src" , iconUrl);
					
	                console.log(weather[i]);
	                console.log(day_temp);
	                console.log(night_temp);
	                console.log(day[i]);
                }
                n = 0;
                
			}
		);

		$.getJSON(
			"http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: toCity,
				cnt: 5,
				appid: "bd82977b86bf27fb59a04b61b657fb6f",
				units: "imperial"
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
                $(".toCity h2").html(toCity);
                // Save the data in vars
                for(var i = 0; i < 5; i++){
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
					$("#toCity " + iconName + " img").attr("src" , iconUrl);
					

	                console.log(weather[i]);
	                console.log(day_temp);
	                console.log(night_temp);
	                console.log(day2[i]);
                }


			}
		);
	});
});