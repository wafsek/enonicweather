/**
 * Created by Baljit Sarai on 29.08.2018.
 */
$(document).ready(function() {
    var cites = ["London", "Oslo", "Minsk"];


    /**
     * Gets the weather for the given city name and edits the dom.
     * @param cityname - The name of the city to get the weather of.
     * @param index - The index of the city in both the cities and in the elements in the dom.
     */
    function getCitisWeather(cityname, index) {
        $.getJSON( "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&units=metric&appid=ac3e17cf0bdb7b77a12d75c287c609f7", function( data ) {
            var imagename = data.weather[0].description;
            $("#update-text").text("Last updated : "+moment().format('MMMM Do YYYY, HH:mm a'));
            imagename = imagename.replace(/\s/g, '');
            index++;
            $( ".weather-widget:nth-of-type("+index+")" ).find(".city-name").text(data.name);
            $( ".weather-widget:nth-of-type("+index+")" ).find(".temp").text("Temperature: "+data.main.temp+"C");
            $( ".weather-widget:nth-of-type("+index+")" ).find(".description").text(data.weather[0].description);
            $( ".weather-widget:nth-of-type("+index+")" ).find(".city-logo").css('background-image', 'url(images/'+imagename+'.jpg)');
        });
    }

    /**
     * Adds a new city.
     * @param cityname - The name of the city to be added.
     * @param index - The index of the city. NOTE. The index HAS to be the last one and CANNOT be any other.
     */
    function addNewCity(cityname, index){
        console.log(cityname);
        $( ".weather-widget" ).first().clone().appendTo( "#weather-widgets" );
        getCitisWeather(cityname,index);
    }

    /**
     * Setting up for the initial cities.
     */
    function addInitialCities() {
        getCitisWeather("London",0);
        for (i = 1; i < cites.length; i++) {
            addNewCity(cites[i],i);
        }
    }

    addInitialCities();

    /**
     * Updates the weather for all the cities every minute.
     */
    setInterval(function() {
        for (var i in cites) {
            getCitieWeather(cites[i],i);
        }
    },  60 * 1000);

});


