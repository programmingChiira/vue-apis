<template>
    <div class="weather-search">
        <h1>Weather Select</h1>
        <div>
            <div class="row">
                <div class="col-6 col-md-6">
                    <select class="form form-control" v-model="selectedCity">
                        <option v-for="city in cityOptions" :key="city.name" :value="city.name">
                            {{ city.name }}
                        </option>
                    </select>
                </div>
                <div style="float: right;" class="col-6 col-md-6">
                    <button class="btn btn-sm btn-primary" @click="fetchWeather">
                        Fetch Weather
                    </button>
                </div>

                <div v-if="isLoading">
                    <p>Loading weather information...</p>
                </div>
                <div v-else-if="error">
                    <p>Error: {{ error }}</p>
                </div>
                <div style="margin-top: 20px;margin-bottom: 10px;" v-else>
                    <div class="row" v-if="weatherData.length > 0">
                        <div class="col-12 col-md-3" v-for="place in weatherData" :key="place.place_id">
                            <div class="card">
                                <div class="card-body">
                                    <h2 class="card-title">{{ place.name }}</h2>
                                    <p class="card-text">Place ID: {{ place.place_id }}</p>
                                    <p class="card-text">Administrative Area 1: {{ place.adm_area1 }}</p>
                                    <p class="card-text">Administrative Area 2: {{ place.adm_area2 }}</p>
                                    <p class="card-text">Country: {{ place.country }}</p>
                                    <p class="card-text">Latitude: {{ place.lat }}</p>
                                    <p class="card-text">Longitude: {{ place.lon }}</p>
                                    <p class="card-text">Timezone: {{ place.timezone }}</p>
                                    <p class="card-text">Type: {{ place.type }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-else>No results found</p>
                </div>
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
                { name: 'Accra' },
                { name: 'Tokyo' },
                { name: 'London' },
                { name: 'New York' },
                { name: 'Mwanza' },
                { name: 'Ngong' },
                { name: 'Kenyatta' },
                { name: 'Ouagadougou' },
                { name: 'Garden City' },
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
  