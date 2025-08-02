//This is the JavaScript code for the weather dashboard , this contains the functionalities of the webpage like getWeather()
const apiKey='ae0b540c9081f5db64047836b4a2cfcd';

async function getWeather(){
    const city=document.getElementById("cityInput").value.trim();
    const errorDiv=document.getElementById("error");
    const weatherCard=document.getElementById("weatherCard");

    errorDiv.textContent="";
    weatherCard.style.display="none";

    if (!city||city.length<2){
        errorDiv.textContent="Please enter a valid city name";
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try{
        console.log("Fetching : ",url);
        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City not found or invalid API key");
            return;
        }

        const data=await response.json();

        //Extract data
        const location=`${data.name},${data.sys.country}`;
        const timezoneOffset=data.timezone;
        const localTime=new Date((data.dt+timezoneOffset)*1000)
            .toUTCString()
            .replace("GMT","")
            .trim();

        const temp=data.main.temp;
        const feelsLike=data.main.feels_like;
        const weatherDescription=data.weather[0].description;
        const humidity=data.main.humidity;
        const windSpeedKmh=(data.wind.speed*3.6).toFixed(1);
        const iconCode=data.weather[0].icon;

        document.getElementById("location").textContent=location;
        document.getElementById("datetime").textContent=localTime;
        document.getElementById("temperature").textContent=`${temp}°C`;
        document.getElementById("feelsLike").textContent=feelsLike;
        document.getElementById("description").textContent=weatherDescription;
        document.getElementById("humidity").textContent=humidity;
        document.getElementById("wind").textContent=windSpeedKmh;
        document.getElementById("weatherIcon").src=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
0

     weatherCard.style.display="block";
    }
    catch(error){
        console.error("Error fetching weather: ",error);
        errorDiv.textContent=`Unable to fetch weather data. (${error.message})`;
    }

}


