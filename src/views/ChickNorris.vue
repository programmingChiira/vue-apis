<template>
  <div class="chuck-norris-jokes">
    <h1>Chuck Norris Jokes</h1>
    <div>
      <button class="btn btn-sm btn-primary" @click="fetchJokes(1)">Fetch Jokes</button>
      <div v-if="isLoading">
        <p>Loading jokes...</p>
      </div>
      <div v-else-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="(joke, index) in displayedJokes" :key="index">{{ joke.value }}</li>
        </ul>
        <div class="navigation">
          <button v-if="currentPage > 1" @click="fetchJokes(currentPage - 1)">Previous</button>
          <button v-if="currentPage < totalPages" @click="fetchJokes(currentPage + 1)">Next</button>
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
      jokes: [], // Store all fetched jokes
      displayedJokes: [], // Jokes to be displayed on current page
      currentPage: 1,
      totalPages: 0,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchJokes(pageNumber = 1) {
      this.isLoading = true;
      this.error = null;

      const options = {
        method: 'GET',
        url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search',
        params: {
          query: 'Chuck Norris',
          limit: 20,
          page: pageNumber,
        },
        headers: {
          accept: 'application/json',
          'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b', // Replace with your actual API key
          'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        this.jokes = this.jokes.concat(response.data.result); // Accumulate all jokes
        this.totalPages = Math.ceil(response.data.total / 20); // Calculate total pages
        this.displayedJokes = this.jokes.slice((pageNumber - 1) * 20, pageNumber * 20); // Slice jokes for current page
        this.currentPage = pageNumber;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    // Remove pageNumbers computation as it's not needed
  },
};
</script>

<style scoped>
.chuck-norris-jokes {
  padding-top: 20px;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.navigation button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
