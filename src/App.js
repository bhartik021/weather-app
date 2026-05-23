import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';

import Weather from './Component/weather.component';
import Form from './Component/form.component';

const API_key = "8912da1fc439d241a8799d08004a3bc2";

const ICON_MAP = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog",
};

const BG_MAP = {
  Clear: 'bg-clear',
  Clouds: 'bg-clouds',
  Rain: 'bg-rain',
  Drizzle: 'bg-rain',
  Thunderstorm: 'bg-thunder',
  Snow: 'bg-snow',
  Atmosphere: 'bg-fog',
  Mist: 'bg-fog',
  Fog: 'bg-fog',
  Haze: 'bg-fog',
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      feelsLike: undefined,
      humidity: undefined,
      windSpeed: undefined,
      sunrise: undefined,
      sunset: undefined,
      description: "",
      forecast: [],
      unit: 'C',
      error: false,
      loading: false,
    };
  }

  toC(kelvin) {
    return Math.floor(kelvin - 273.15);
  }

  iconForId(id) {
    switch (true) {
      case id >= 200 && id < 300:  return ICON_MAP.Thunderstorm;
      case id >= 300 && id < 400:  return ICON_MAP.Drizzle;
      case id >= 500 && id < 600:  return ICON_MAP.Rain;
      case id >= 600 && id < 700:  return ICON_MAP.Snow;
      case id >= 700 && id < 800:  return ICON_MAP.Atmosphere;
      case id === 800:              return ICON_MAP.Clear;
      default:                     return ICON_MAP.Clouds;
    }
  }

  formatLocalTime(utcSeconds, tzOffsetSeconds) {
    const d = new Date((utcSeconds + tzOffsetSeconds) * 1000);
    const h = d.getUTCHours();
    const m = String(d.getUTCMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${m} ${ampm}`;
  }

  parseForecast(list, tzOffset) {
    const days = {};
    list.forEach(item => {
      const local = new Date((item.dt + tzOffset) * 1000);
      const key = `${local.getUTCFullYear()}-${local.getUTCMonth()}-${local.getUTCDate()}`;
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (!days[key]) {
        days[key] = { day: dayNames[local.getUTCDay()], temps: [], ids: [] };
      }
      days[key].temps.push(item.main.temp);
      days[key].ids.push(item.weather[0].id);
    });

    return Object.values(days).slice(0, 5).map(d => ({
      day: d.day,
      min: this.toC(Math.min(...d.temps)),
      max: this.toC(Math.max(...d.temps)),
      icon: this.iconForId(d.ids[Math.floor(d.ids.length / 2)]),
    }));
  }

  applyWeatherData(weather, forecastList) {
    const tz = weather.timezone;
    this.setState({
      city: `${weather.name}, ${weather.sys.country}`,
      main: weather.weather[0].main,
      celsius: this.toC(weather.main.temp),
      temp_max: this.toC(weather.main.temp_max),
      temp_min: this.toC(weather.main.temp_min),
      feelsLike: this.toC(weather.main.feels_like),
      humidity: weather.main.humidity,
      windSpeed: Math.round(weather.wind.speed * 3.6),
      sunrise: this.formatLocalTime(weather.sys.sunrise, tz),
      sunset: this.formatLocalTime(weather.sys.sunset, tz),
      description: weather.weather[0].description,
      icon: this.iconForId(weather.weather[0].id),
      forecast: this.parseForecast(forecastList, tz),
      error: false,
      loading: false,
    });
  }

  fetchByQuery = async (query) => {
    this.setState({ loading: true, error: false });
    try {
      const [wRes, fRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_key}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${API_key}`),
      ]);
      const weather = await wRes.json();
      const forecast = await fRes.json();
      if (weather.cod !== 200) {
        this.setState({ error: true, loading: false });
        return;
      }
      this.applyWeatherData(weather, forecast.list);
    } catch {
      this.setState({ error: true, loading: false });
    }
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value.trim();
    const country = e.target.elements.country.value.trim();
    if (!city || !country) {
      this.setState({ error: true });
      return;
    }
    await this.fetchByQuery(`q=${encodeURIComponent(city)},${encodeURIComponent(country)}`);
  };

  getLocation = () => {
    if (!navigator.geolocation) return;
    this.setState({ loading: true, error: false });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => this.fetchByQuery(`lat=${coords.latitude}&lon=${coords.longitude}`),
      () => this.setState({ loading: false, error: true }),
    );
  };

  toggleUnit = () => {
    this.setState(prev => ({ unit: prev.unit === 'C' ? 'F' : 'C' }));
  };

  getBgClass() {
    return BG_MAP[this.state.main] || 'bg-default';
  }

  render() {
    const { unit, forecast } = this.state;
    const convert = (c) => {
      if (c == null) return c;
      return unit === 'F' ? Math.round(c * 9 / 5 + 32) : c;
    };

    return (
      <div className={`App ${this.getBgClass()}`}>
        <Form
          loadweather={this.getWeather}
          getLocation={this.getLocation}
          error={this.state.error}
          loading={this.state.loading}
        />
        <Weather
          city={this.state.city}
          temp_celsius={convert(this.state.celsius)}
          temp_max={convert(this.state.temp_max)}
          temp_min={convert(this.state.temp_min)}
          feelsLike={convert(this.state.feelsLike)}
          humidity={this.state.humidity}
          windSpeed={this.state.windSpeed}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          description={this.state.description}
          weatherIcon={this.state.icon}
          forecast={forecast.map(f => ({ ...f, min: convert(f.min), max: convert(f.max) }))}
          unit={unit}
          toggleUnit={this.toggleUnit}
        />
      </div>
    );
  }
}

export default App;
