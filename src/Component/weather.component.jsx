import React from "react";
import "./weather.style.css";

const Weather = ({
  city,
  temp_celsius,
  temp_max,
  temp_min,
  feelsLike,
  humidity,
  windSpeed,
  sunrise,
  sunset,
  description,
  weatherIcon,
  forecast,
  unit,
  toggleUnit,
}) => {
  if (!city) return null;

  return (
    <div className="weather-card">

      {/* Location + unit toggle */}
      <div className="card-top-row">
        <div className="weather-location">
          <svg className="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="location-name">{city}</span>
        </div>
        <button className="unit-toggle" onClick={toggleUnit}>
          °C / °F
        </button>
      </div>

      {/* Main icon + temperature */}
      <div className="weather-main">
        <div className="weather-icon-wrap">
          <i className={`wi ${weatherIcon}`} />
        </div>
        <div className="temp-display">
          <span className="temp-value">{temp_celsius}</span>
          <span className="temp-unit">°{unit}</span>
        </div>
      </div>

      <p className="weather-description">{description}</p>

      {/* Stats: feels like, humidity, wind */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
            </svg>
          </span>
          <span className="stat-label">Feels like</span>
          <span className="stat-value">{feelsLike}°{unit}</span>
        </div>
        <div className="stat-sep" />
        <div className="stat-item">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </span>
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{humidity}%</span>
        </div>
        <div className="stat-sep" />
        <div className="stat-item">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </span>
          <span className="stat-label">Wind</span>
          <span className="stat-value">{windSpeed} km/h</span>
        </div>
      </div>

      {/* Sunrise / Sunset */}
      <div className="sun-row">
        <div className="sun-item">
          <i className="wi wi-sunrise sun-wi-icon" />
          <div className="sun-text">
            <span className="sun-label">Sunrise</span>
            <span className="sun-value">{sunrise}</span>
          </div>
        </div>
        <div className="stat-sep" />
        <div className="sun-item">
          <i className="wi wi-sunset sun-wi-icon" />
          <div className="sun-text">
            <span className="sun-label">Sunset</span>
            <span className="sun-value">{sunset}</span>
          </div>
        </div>
      </div>

      {/* Min / Max */}
      <div className="card-divider" />
      <div className="temp-range">
        <div className="range-item low">
          <span className="range-label">↓ Min</span>
          <span className="range-value">{temp_min}°</span>
        </div>
        <div className="range-divider" />
        <div className="range-item high">
          <span className="range-label">↑ Max</span>
          <span className="range-value">{temp_max}°</span>
        </div>
      </div>

      {/* 5-day forecast */}
      {forecast && forecast.length > 0 && (
        <>
          <div className="card-divider" />
          <p className="forecast-heading">5-Day Forecast</p>
          <div className="forecast-strip">
            {forecast.map((day, i) => (
              <div key={i} className="forecast-day">
                <span className="fc-day-name">{day.day}</span>
                <i className={`wi ${day.icon} fc-icon`} />
                <span className="fc-max">{day.max}°</span>
                <span className="fc-min">{day.min}°</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
