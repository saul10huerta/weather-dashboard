var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var todaysCardEl = document.querySelector("#todays-card");

var liEl = document.querySelector("#addbutton");





// get users username input to send request
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityname = cityInputEl.value.trim();


    var buttonEl = document.createElement("button");
    buttonEl.type = "button";
    buttonEl.className = "btn border bg-light w-100 p-2";
    buttonEl.id = "buttonnumber";
    buttonEl.textContent = cityname;
    cityFormEl.appendChild(buttonEl);


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




    //create a card to hold today's weather info
    var infoEl = document.createElement("div");
    infoEl.className = "card-header border border-secondary bg-light mb-3";
    infoEl.id = "current-date";
    infoEl.textContent = date;
    todaysCardEl.appendChild(infoEl);

    var CardEl = document.querySelector("#current-date");

    var nameEl = document.createElement("p");
    nameEl.id = "citys-name";
    nameEl.textContent = dataCityName;
    CardEl.appendChild(nameEl);

    var iconEl = document.createElement("img");
    iconEl.id = "citys-name";
    iconEl.src = iconurl;
    CardEl.appendChild(iconEl);

    var tempEl = document.createElement("p");
    tempEl.id = "citys-temp";
    tempEl.textContent = "Temperature: " + temperature + " °F";
    CardEl.appendChild(tempEl);

    var humiEl = document.createElement("p");
    humiEl.id = "citys-humidity";
    humiEl.textContent = "Humidity: " + humidity + "%";
    CardEl.appendChild(humiEl);

    var windEl = document.createElement("p");
    windEl.id = "citys-windspeed";
    windEl.textContent = "Wind Speed: " + windSpeed + " MPH";
    CardEl.appendChild(windEl);



    //uv index
    var lat = JSON.stringify(data.coord.lat);
    var lon = JSON.stringify(data.coord.lon);

    var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=8848a37b64a7036def651b38b8efaf49&lat=" + lat + "&lon=" + lon
    fetch(uvIndexURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            UVData(data);
            console.log(data);
    });

    var UVData = function(data) {
        var finalIndex = JSON.stringify(data.value);
        console.log(finalIndex);

        var indexEL = document.createElement("div");
        indexEL.id = "citys-uvindex";
        indexEL.textContent = "UV Index: " + finalIndex;

        if(finalIndex >= 6) {
            indexEL.className = "bg-danger text-white";
        } else if (finalIndex > 2 & finalIndex < 6) {
            indexEL.className = "bg-warning text-dark";
        } else {
            indexEL.className = "bg-success text-white";
        }

        CardEl.appendChild(indexEL);
    }    

    
    

}





cityFormEl.addEventListener("submit", formSubmitHandler);