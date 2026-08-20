import WeatherAPI from "./api.js";

import UI from "./ui.js";


// ========================================
// APPLICATION
// ========================================

const App = {


    // ========================================
    // INITIALIZE
    // ========================================

    init() {

        this.bindEvents();

        this.updateDate();

        console.log(
            "WeatherNow application started."
        );

    },


    // ========================================
    // EVENTS
    // ========================================

    bindEvents() {


        // Search button

        document
            .getElementById("searchBtn")
            .addEventListener(
                "click",
                () => this.searchCity()
            );


        // Enter key

        document
            .getElementById("cityInput")
            .addEventListener(
                "keypress",
                (event) => {

                    if (
                        event.key === "Enter"
                    ) {

                        this.searchCity();

                    }

                }
            );


        // Location button

        document
            .getElementById("locationBtn")
            .addEventListener(
                "click",
                () => this.getLocation()
            );

    },


    // ========================================
    // SEARCH CITY
    // ========================================

    async searchCity() {

        const input =
            document.getElementById(
                "cityInput"
            );


        const city =
            input.value.trim();


        // Check empty input

        if (!city) {

            UI.showError(
                "Please enter a city name."
            );

            return;

        }


        try {

            UI.hideError();

            UI.showLoading();


            // Get weather

            const data =
                await WeatherAPI
                    .getWeatherByCity(city);


            // Update UI

            UI.updateWeather(data);

        }


        catch (error) {

            console.error(error);


            UI.showError(
                error.message
            );

        }


        finally {

            UI.hideLoading();

        }

    },


    // ========================================
    // CURRENT LOCATION
    // ========================================

    getLocation() {


        // Check browser support

        if (
            !navigator.geolocation
        ) {

            UI.showError(
                "Geolocation is not supported by your browser."
            );

            return;

        }


        UI.showLoading();

        UI.hideError();


        navigator.geolocation.getCurrentPosition(


            // SUCCESS

            async (position) => {

                try {

                    const latitude =
                        position.coords.latitude;


                    const longitude =
                        position.coords.longitude;


                    // Get weather

                    const data =
                        await WeatherAPI
                            .getWeatherByCoordinates(
                                latitude,
                                longitude
                            );


                    // Update UI

                    UI.updateWeather(data);

                }


                catch (error) {

                    console.error(error);


                    UI.showError(
                        error.message
                    );

                }


                finally {

                    UI.hideLoading();

                }

            },


            // ERROR

            () => {

                UI.hideLoading();


                UI.showError(
                    "Location permission was denied."
                );

            }

        );

    },


    // ========================================
    // DATE
    // ========================================

    updateDate() {

        const date =
            new Date();


        document.getElementById(
            "dateTime"
        ).textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",

                    year: "numeric",

                    month: "long",

                    day: "numeric"

                }
            );

    }

};


// ========================================
// START APPLICATION
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => App.init()
);