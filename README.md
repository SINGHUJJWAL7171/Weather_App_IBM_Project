#  WeatherNow — Full Stack Weather Application

A responsive full-stack weather application that provides real-time weather information and a 5-day forecast for cities around the world.

The project is built using HTML, CSS, JavaScript, Node.js and Express.js, with Open-Meteo APIs used to retrieve weather and location data.

##  Live Demo

🌐 **Live Application:**  
https://weather-app-ibm-project.onrender.com/

💻 **GitHub Repository:**  
https://github.com/SINGHUJJWAL7171/Weather_App_IBM_Project

---

## 📌 Project Overview

WeatherNow is a full-stack weather application developed as part of the **IBM PBEL Web Development Course**.

The application allows users to:

- Search for weather information by city
- Get weather information using their current location
- View current temperature and weather conditions
- View humidity, wind speed, pressure and visibility
- View a 5-day weather forecast
- Use a responsive interface on desktop, tablet and mobile devices

The project follows a frontend-backend architecture where the frontend communicates with an Express.js backend, and the backend retrieves weather information from the Open-Meteo API.

---

## ✨ Features

### 🌍 City Weather Search

Users can enter a city name and retrieve its current weather information.

### 📍 Current Location

The application can use the browser's geolocation feature to retrieve weather information for the user's current location.

### 🌡️ Current Weather

Displays:

- Temperature
- Weather condition
- Feels-like temperature
- Humidity
- Wind speed
- Surface pressure
- Visibility

### 📅 5-Day Forecast

Displays:

- Date/day
- Weather condition
- Weather icon
- Maximum temperature
- Minimum temperature

### 📱 Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

### ⚠️ Error Handling

The application handles situations such as:

- Empty city search
- City not found
- API errors
- Invalid location requests

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome

### Backend

- Node.js
- Express.js

### APIs

- Open-Meteo Geocoding API
- Open-Meteo Weather Forecast API
- Browser Geolocation API

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

### Deployment

- Render

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Frontend       │
                    │ HTML/CSS/JS      │
                    └────────┬─────────┘
                             │
                             │ HTTP Request
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │    Node.js       │
                    └────────┬─────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │    Open-Meteo APIs    │
                 └───────────┬───────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Weather Data     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Frontend Display │
                    └──────────────────┘
