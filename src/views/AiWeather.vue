<template>
    <div class="weather-search">
        <h1>Weather Search</h1>
        <div>
            <select v-model="selectedCity">
                <option v-for="city in cityOptions" :key="city.name" :value="city.name">
                    {{ city.name }}
                </option>
            </select>
            <button class="btn btn-sm btn-primary" @click="fetchWeather">
                Fetch Weather
            </button>
            <div v-if="isLoading">
                <p>Loading weather information...</p>
            </div>
            <div v-else-if="error">
                <p>Error: {{ error }}</p>
            </div>
            <div v-else>
            </div>
            <div v-else>
                <ul v-if="weatherData.length > 0">
                    <li v-for="place in weatherData" :key="place.place_id">
                        <h2>{{ place.name }}</h2>
                        <p>Place ID: {{ place.place_id }}</p>
                        <p>Administrative Area 1: {{ place.adm_area1 }}</p>
                        <p>Administrative Area 2: {{ place.adm_area2 }}</p>
                        <p>Country: {{ place.country }}</p>
                        <p>Latitude: {{ place.lat }}</p>
                        <p>Longitude: {{ place.lon }}</p>
                        <p>Timezone: {{ place.timezone }}</p>
                        <p>Type: {{ place.type }}</p>
                    </li>
                </ul>
                <p v-else>No results found</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            cityOptions: [
                { name: 'Accra'},
                { name: 'Tokyo'},
                { name: 'London'},
                { name: 'New York'},
                { name: 'Mwanza'},
                { name: 'Ngong'},
                { name: 'Kenyatta'},
                { name: 'Ouagadougou'},
                { name: 'Garden City'},
            ],
            selectedCity: '',
            weatherData: [],
            isLoading: false,
            error: null,
        };
    },
    methods: {
        async fetchWeather() {
            if (!this.selectedCity) {
                return; // Do nothing if no city is selected
            }

            this.isLoading = true;
            this.error = null;

            const options = {
                method: 'GET',
                url: 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places',
                params: {
                    text: this.selectedCity,
                    language: 'en',
                },
                headers: {
                    'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b',
                    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                this.weatherData = response.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
  