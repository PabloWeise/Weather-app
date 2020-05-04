var searchBtn = $("#search-btn")
var searchInput = $("#search-input")

searchBtn.click(function(){
    // 1. Declare variables
    var cityname = searchInput.val();
    var lat = 50;
    var lon = 50;
    
    // 2. Ajax Call # 1
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=a139a4f2114427e983f86dfecfe6af4b",
        method:"GET"

    })
    // 3. Ajax Call #1 Callback
    .then(function(response){
        console.log(response)
        lat = response.coord.lat
        lon = response.coord.lon

        $.ajax({ // 4.
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=a139a4f2114427e983f86dfecfe6af4b&units=imperial",
            method:"GET"
   
        })
        .then(function(response){  // 5. Call #2 Callback
            console.log(response)
            var currentTemp = response.current.temp
            $("#current-temp").text("Current Temperature: " + currentTemp + " " + "F")  

            var currentHumidity = response.current.humidity
            $("#current-humidity").text("Current Humidity: " + currentHumidity + "%")  

            var windSpeed = response.current.wind_speed
            $("#wind-sp").text("Wind Speed: " + windSpeed +" MPH")  





             //if response.current is less than, change the background to (X)
             if(response.current.weather[0].main === "Clouds"){$('.card-body').css('background-image', 'url(assets/partiallyCloudy.jpg');} 

             else if(response.current.weather[0].main === "Haze"){$('.card-body').css('background-image', 'url(assets/haze.jpg');}


             else if(response.current.weather[0].main === "Rain"){$('.card-body').css('background-image', 'url(assets/rainy.jpg');}

             else if(response.current.weather[0].main === "Snow"){$('.card-body').css('background-image', 'url(assets/snowy.jpg');}

             else if(response.current.weather[0].main === "Sun"){$('.card-body').css('background-image', 'url(assets/sunny.jpg');}

             else if(response.current.weather[0].main === "Clear"){$('.card-body').css('background-image', 'url(assets/clear.jpg');}






             
            
            // for loop  to obtain the temp, humidity and wind speed for comming days

            for (let index = 0; index < 4; index++) {
                var temp = response.daily[index + 1].temp.day
                $("#day" + (index + 1)).text("Temp: " + temp +" F")  


                var wind = response.daily[index + 1].wind_speed
                $("#wind" + (index + 1)).text("Wind Speed: " + wind +"MPH")  


                var humidity = response.daily[index + 1].humidity
                $("#humid" + (index + 1)).text("Humidity: " + humidity +"%")  



           
                
            }



            










        })
   
    })




    

     

  });