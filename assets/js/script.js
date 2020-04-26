var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


// get users username input to send request
var formSubmitHandler = function() {
    // event.preventDefault();
    // get value from input element
    var cityname = cityInputEl.value.trim();
    console.log(cityname);

    // if (username) {
    // getUserRepos(username);
    // nameInputEl.value = "";
    // } else {
    // alert("Please enter a GitHub username");
    // }
    // console.log(event);
};