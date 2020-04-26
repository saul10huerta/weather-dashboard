var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var todaysCardEl = document.querySelector("#todays-card");





// get users username input to send request
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityname = cityInputEl.value.trim();

    console.log(cityname);

    if (cityname) {
        // format the api url
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=8848a37b64a7036def651b38b8efaf49";
        
        //send request for data
        fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                cityInputEl.value = "";
                response.json().then(function(data) {
                displayWeather(data);
                console.log(data);
            });
            } else {
            alert("Error: City" + response.statusText);
            }
        })
        .catch(function(error) {
            console.log(error);
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to Open Weather");
        });
    }
};


//funtion to display weather for that city
var displayWeather = function(data) {

    //city
    var dataCityName = data.name;
    console.log(dataCityName);

    //todays date
    var date = moment().format("MM/DD/YYYY");
    console.log(date);

    //get icon
    var condition = data.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + condition + ".png";
    console.log(iconurl);

    //temperature
    var temperature = JSON.stringify(data.main.temp);
    console.log(temperature);

    //humidity
    var humidity = JSON.stringify(data.main.humidity);
    console.log(humidity);

    //windspeed
    var windSpeed = JSON.stringify(data.wind.speed);
    console.log(windSpeed);

    //uv index
    // var uvIndex = 


    //create a card to hold today's weather info
    var infoEl = document.createElement("div");
    infoEl.className = "card-body";
    infoEl.id = "current"
    infoEl.textContent = date
    todaysCardEl.appendChild(infoEl);





    

}







cityFormEl.addEventListener("submit", formSubmitHandler);