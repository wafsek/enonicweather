/**
 * Created by Baljit Sarai on 29.08.2018.
 */
$(document).ready(function() {
    var cites = ["London", "Oslo", "Minsk"];
    function getCitieWeather(index) {


        $.getJSON( "https://api.openweathermap.org/data/2.5/weather?q="+cites[index]+"&units=metric&appid=ac3e17cf0bdb7b77a12d75c287c609f7", function( data ) {
            var imagename = data.weather[0].description;
            $("#update-text").text("Last updated : "+moment().format('MMMM Do YYYY, HH:mm a'));
            imagename = imagename.replace(/\s/g, '');
            console.log(data);
            index++;
            $( ".weather-widget:nth-of-type("+index+")" ).find(".city-name").text(data.name);
            $( ".weather-widget:nth-of-type("+index+")" ).find(".temp").text("Temperature: "+data.main.temp+"C");
            $( ".weather-widget:nth-of-type("+index+")" ).find(".description").text(data.weather[0].description);

            $( ".weather-widget:nth-of-type("+index+")" ).find(".city-logo").css('background-image', 'url(images/'+imagename+'.jpg)');

        });

    }

    for (var i in cites) {
        getCitieWeather(i);
    }

    setInterval(function() {
        for (var i in cites) {
            getCitieWeather(i);
        }
    },  60 * 1000);
});


