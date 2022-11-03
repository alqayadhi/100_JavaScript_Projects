// load after our page loaded we can get our locations 
window.addEventListener("load",() => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    // navigator.geolocation 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            // get request and bring info from api
            fetch(api)
                .then(response => {
                    return response.json();
                }).then(data => {
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM Element from the API 
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone
                    //Forumula For celsius  
                    let celsius = (temperature - 32 ) * (5 / 9);
                    // set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // change temperature to Celsius / Farenheit 
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = 'C'
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = 'F'
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        })
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
