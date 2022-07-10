import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Weather from './Component/weather.component';

// https://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid={API key}
const API_key = "8912da1fc439d241a8799d08004a3bc2";

class App extends React.Component{
constructor() {
  super();
  this.state = {
    city : undefined,
    country : undefined,
    icon : undefined,
    main : undefined,
    celsius : undefined,
    temp_max : undefined,
    temp_min : undefined,
    description : "",
    error : false
  };
  this.getWeather();

  this.weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
  };
}

calCelsius(temp) {
  let cell = Math.floor(temp - 273.15);
  return cell;
}

getWeather = async () => {
  const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);

  const response = await api_call.json();

  console.log(response);

  this.setState({
    city : response.name,
    country : response.sys.country,
    celsius: this.calCelsius(response.main.temp),
    temp_max: this.calCelsius(response.main.temp_max),
    temp_min: this.calCelsius(response.main.temp_min),
    description : response.weather[0].description,
    icon : this.weatherIcon.Thunderstorm
  })
};

  render() {
    return(
      <div className="App">
      <Weather 
      city={this.state.city} 
      country={this.state.country}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weatherIcon={this.state.icon}
      />
      </div>
     );
  }
}

export default App;
