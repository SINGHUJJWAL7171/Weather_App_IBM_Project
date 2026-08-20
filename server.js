import express from "express";
import path from "path";
import { fileURLToPath } from "url";


// ========================================
// ES MODULE PATH SETUP
// ========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ========================================
// EXPRESS APPLICATION
// ========================================

const app = express();

const PORT = process.env.PORT || 3000;


// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());


// ========================================
// SERVE FRONTEND
// ========================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ========================================
// BACKEND HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        message: "WeatherNow backend is working!"

    });

});


// ========================================
// WEATHER API
// ========================================

app.get("/api/weather", async (req, res) => {

    try {

        const {
            city,
            latitude,
            longitude
        } = req.query;


        let lat;
        let lon;
        let locationName;
        let country;


        // ========================================
        // SEARCH USING CITY
        // ========================================

        if (city) {

            const cityName = city.trim();


            if (!cityName) {

                return res.status(400).json({

                    success: false,

                    message: "Please provide a city name."

                });

            }


            const geocodingURL =
                `https://geocoding-api.open-meteo.com/v1/search?` +
                `name=${encodeURIComponent(cityName)}` +
                `&count=1` +
                `&language=en` +
                `&format=json`;


            const geocodingResponse =
                await fetch(geocodingURL);


            if (!geocodingResponse.ok) {

                throw new Error(
                    "Unable to connect to location service."
                );

            }


            const geocodingData =
                await geocodingResponse.json();


            if (
                !geocodingData.results ||
                geocodingData.results.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        `City "${cityName}" was not found.`

                });

            }


            const location =
                geocodingData.results[0];


            lat = location.latitude;

            lon = location.longitude;

            locationName = location.name;

            country = location.country;

        }


        // ========================================
        // SEARCH USING GPS COORDINATES
        // ========================================

        else if (latitude && longitude) {

            lat = Number(latitude);

            lon = Number(longitude);

            locationName = "Current Location";

            country = "";

        }


        // ========================================
        // NO CITY OR LOCATION
        // ========================================

        else {

            return res.status(400).json({

                success: false,

                message:
                    "Please provide a city or location."

            });

        }


        // ========================================
        // WEATHER API
        // ========================================

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${lat}` +
            `&longitude=${lon}` +
            `&current=` +
            `temperature_2m,` +
            `relative_humidity_2m,` +
            `apparent_temperature,` +
            `weather_code,` +
            `wind_speed_10m,` +
            `surface_pressure,` +
            `visibility` +
            `&daily=` +
            `weather_code,` +
            `temperature_2m_max,` +
            `temperature_2m_min,` +
            `sunrise,` +
            `sunset` +
            `&timezone=auto` +
            `&forecast_days=5`;


        const weatherResponse =
            await fetch(weatherURL);


        if (!weatherResponse.ok) {

            throw new Error(
                "Unable to fetch weather information."
            );

        }


        const weatherData =
            await weatherResponse.json();


        // ========================================
        // SEND DATA TO FRONTEND
        // ========================================

        res.json({

            success: true,

            location: {

                name: locationName,

                country: country,

                latitude: lat,

                longitude: lon

            },

            current: {

                temperature:
                    weatherData.current
                        .temperature_2m,

                humidity:
                    weatherData.current
                        .relative_humidity_2m,

                feelsLike:
                    weatherData.current
                        .apparent_temperature,

                weatherCode:
                    weatherData.current
                        .weather_code,

                windSpeed:
                    weatherData.current
                        .wind_speed_10m,

                pressure:
                    weatherData.current
                        .surface_pressure,

                visibility:
                    weatherData.current
                        .visibility / 1000,

                time:
                    weatherData.current
                        .time

            },

            daily: {

                dates:
                    weatherData.daily.time,

                weatherCodes:
                    weatherData.daily.weather_code,

                maxTemperatures:
                    weatherData.daily
                        .temperature_2m_max,

                minTemperatures:
                    weatherData.daily
                        .temperature_2m_min,

                sunrise:
                    weatherData.daily.sunrise,

                sunset:
                    weatherData.daily.sunset

            }

        });

    }


    catch (error) {

        console.error(
            "Weather API Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to retrieve weather information."

        });

    }

});
// ========================================
// START SERVER
// ========================================

app.listen(
    PORT,
    () => {

    console.log(
    `WeatherNow server running on port ${PORT}`
);
    }
);