const WeatherAPI = {

    async getWeatherByCity(city) {

        const response = await fetch(
            `/api/weather?city=${encodeURIComponent(city)}`
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to get weather data."
            );

        }


        return data;

    },


    async getWeatherByCoordinates(
        latitude,
        longitude
    ) {

        const response = await fetch(
            `/api/weather?latitude=${latitude}&longitude=${longitude}`
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to get weather data."
            );

        }


        return data;

    }

};


export default WeatherAPI;