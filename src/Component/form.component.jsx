import React from "react";
import "./form.style.css";

const Form = ({ loadweather, getLocation, error, loading }) => {
  return (
    <div className="form-wrapper">
      <div className="app-header">
        <span className="app-logo">
          <i className="wi wi-day-sunny" />
        </span>
        <h1 className="app-title">WeatherNow</h1>
        <p className="app-subtitle">Real-time weather forecasts worldwide</p>
      </div>

      <form onSubmit={loadweather} className="search-form">
        {error && (
          <div className="error-banner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Please enter a valid city and country code.
          </div>
        )}

        <div className="input-stack">
          <div className="input-pill">
            <span className="input-prefix">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="City name"
              name="city"
              autoComplete="off"
            />
          </div>

          <div className="input-pill">
            <span className="input-prefix">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Country code (e.g. US, IN, UK)"
              name="country"
              autoComplete="off"
            />
          </div>

          <div className="btn-row">
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  <span>Get Weather</span>
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            <button
              type="button"
              className="location-btn"
              onClick={getLocation}
              disabled={loading}
              title="Use my location"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
