<template>
    <div class="weather-search">
        <h1>Weather Search</h1>
        <div>
            <button class="btn btn-sm btn-primary" @click="fetchWeather">Fetch Weather</button>
            <div v-if="isLoading">
                <p>Loading weather information...</p>
            </div>
            <div v-else-if="error">
                <p>Error: {{ error }}</p>
            </div>
            <div v-else>
                <p>Name: {{ weatherData.name }}</p>
                <p>Place ID: {{ weatherData.place_id }}</p>
                <p>Administrative Area 1: {{ weatherData.adm_area1 }}</p>
                <p>Administrative Area 2: {{ weatherData.adm_area2 }}</p>
                <p>Country: {{ weatherData.country }}</p>
                <p>Latitude: {{ weatherData.lat }}</p>
                <p>Longitude: {{ weatherData.lon }}</p>
                <p>Timezone: {{ weatherData.timezone }}</p>
                <p>Type: {{ weatherData.type }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            weatherData: [], // Store weather information as an array
            isLoading: false,
            error: null,
        };
    },
    methods: {
        async fetchWeather() {
            this.isLoading = true;
            this.error = null;

            const options = {
                method: 'GET',
                url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
                params: {
                    text: 'California', // Replace with user's input
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': 'YOUR_AP4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373bI_KEY', // Replace with your actual API key
                    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                for (const place of response.data) {
                    console.log(`Name: ${place.name}`);
                    console.log(`Place ID: ${place.place_id}`);
                }
            } catch (error) {
                console.error(error);
            }


            try {
                const response = await axios.request(options);
                this.weatherData = response.data[0]; // Access the first (and only) object
            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
  