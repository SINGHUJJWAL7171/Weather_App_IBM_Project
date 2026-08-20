const UI = {

    cityName:
        document.getElementById("cityName"),

    temperature:
        document.getElementById("temperature"),

    temperatureUnit:
        document.getElementById("temperatureUnit"),

    weatherCondition:
        document.getElementById("weatherCondition"),

    feelsLike:
        document.getElementById("feelsLike"),

    humidity:
        document.getElementById("humidity"),

    windSpeed:
        document.getElementById("windSpeed"),

    pressure:
        document.getElementById("pressure"),

    visibility:
        document.getElementById("visibility"),

    errorMessage:
        document.getElementById("errorMessage"),

    errorText:
        document.getElementById("errorText"),

    loading:
        document.getElementById("loading"),


    // ========================================
    // SHOW LOADING
    // ========================================

    showLoading() {

        this.loading.classList.remove(
            "hidden"
        );

    },


    // ========================================
    // HIDE LOADING
    // ========================================

    hideLoading() {

        this.loading.classList.add(
            "hidden"
        );

    },


    // ========================================
    // SHOW ERROR
    // ========================================

    showError(message) {

        this.errorText.textContent =
            message;

        this.errorMessage.classList.remove(
            "hidden"
        );

    },


    // ========================================
    // HIDE ERROR
    // ========================================

    hideError() {

        this.errorMessage.classList.add(
            "hidden"
        );

    },


    // ========================================
    // UPDATE WEATHER
    // ========================================

    updateWeather(data) {

        const current =
            data.current;

        const location =
            data.location;


        // Location

        this.cityName.textContent =
            `${location.name}${
                location.country
                    ? ", " + location.country
                    : ""
            }`;


        // Temperature

        this.temperature.textContent =
            Math.round(
                current.temperature
            );


        // Celsius only

        this.temperatureUnit.textContent =
            "°C";


        // Feels like

        this.feelsLike.textContent =
            Math.round(
                current.feelsLike
            );


        // Humidity

        this.humidity.textContent =
            current.humidity;


        // Wind

        this.windSpeed.textContent =
            Math.round(
                current.windSpeed
            );


        // Pressure

        this.pressure.textContent =
            Math.round(
                current.pressure
            );


        // Visibility

        this.visibility.textContent =
            Number(
                current.visibility
            ).toFixed(1);


        // Weather condition

        this.weatherCondition.textContent =
            getWeatherDescription(
                current.weatherCode
            );


        // Main weather icon

        updateWeatherIcon(
            current.weatherCode
        );


        // Forecast

        updateForecast(
            data.daily
        );

    }

};


// ========================================
// WEATHER DESCRIPTION
// ========================================

function getWeatherDescription(code) {

    const weatherCodes = {

        0: "Clear Sky",

        1: "Mainly Clear",

        2: "Partly Cloudy",

        3: "Overcast",

        45: "Foggy",

        48: "Rime Fog",

        51: "Light Drizzle",

        53: "Moderate Drizzle",

        55: "Heavy Drizzle",

        61: "Light Rain",

        63: "Moderate Rain",

        65: "Heavy Rain",

        71: "Light Snow",

        73: "Moderate Snow",

        75: "Heavy Snow",

        80: "Rain Showers",

        81: "Moderate Rain Showers",

        82: "Heavy Rain Showers",

        95: "Thunderstorm",

        96: "Thunderstorm with Hail",

        99: "Thunderstorm with Heavy Hail"

    };


    return (
        weatherCodes[code] ||
        "Unknown Weather"
    );

}


// ========================================
// WEATHER ICON
// ========================================

function getWeatherIcon(code) {

    if (code === 0) {

        return "fa-sun";

    }


    if (
        code === 1 ||
        code === 2
    ) {

        return "fa-cloud-sun";

    }


    if (code === 3) {

        return "fa-cloud";

    }


    if (
        code === 45 ||
        code === 48
    ) {

        return "fa-smog";

    }


    if (
        code >= 51 &&
        code <= 57
    ) {

        return "fa-cloud-rain";

    }


    if (
        code >= 61 &&
        code <= 67
    ) {

        return "fa-cloud-showers-heavy";

    }


    if (
        code >= 71 &&
        code <= 77
    ) {

        return "fa-snowflake";

    }


    if (
        code >= 80 &&
        code <= 82
    ) {

        return "fa-cloud-showers-heavy";

    }


    if (code >= 95) {

        return "fa-cloud-bolt";

    }


    return "fa-cloud";

}


// ========================================
// UPDATE MAIN ICON
// ========================================

function updateWeatherIcon(code) {

    const icon =
        document.querySelector(
            ".weather-icon i"
        );


    if (!icon) return;


    icon.className =
        "fa-solid " +
        getWeatherIcon(code);

}


// ========================================
// UPDATE FORECAST
// ========================================

function updateForecast(daily) {

    const cards =
        document.querySelectorAll(
            ".forecast-card"
        );


    cards.forEach(
        (card, index) => {

            const date =
                new Date(
                    daily.dates[index]
                );


            const day =
                index === 0
                    ? "Today"
                    : date.toLocaleDateString(
                        "en-IN",
                        {
                            weekday: "short"
                        }
                    );


            const code =
                daily.weatherCodes[index];


            const max =
                Math.round(
                    daily.maxTemperatures[index]
                );


            const min =
                Math.round(
                    daily.minTemperatures[index]
                );


            card.querySelector(
                ".forecast-day"
            ).textContent =
                day;


            card.querySelector(
                ".forecast-icon i"
            ).className =
                "fa-solid " +
                getWeatherIcon(code);


            card.querySelector(
                ".forecast-condition"
            ).textContent =
                getWeatherDescription(code);


            card.querySelector(
                ".forecast-temp"
            ).textContent =
                `${max}° / ${min}°C`;

        }
    );

}


// ========================================
// EXPORT
// ========================================

export default UI;