<template>
    <div class="tv-shows">
      <h1>TV Shows</h1>
      <button style="margin-bottom: 10px;" class="btn btn-primary" @click="fetchTvShows">Fetch TV Shows</button>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12 col-md-4" v-for="(tvShow, index) in displayedTvShows" :key="index">
            <div class="card">
              <img class="card-img-top" :src="tvShow.thumbnail" alt="Thumbnail">
              <div class="card-body">
                <h5 class="card-title">{{ tvShow.name }}</h5>
                <p class="card-text">{{ tvShow.description }}</p>
                <p>Status: {{ tvShow.status }}</p>
                <p>Views: {{ tvShow.views }}</p>
                <div v-if="tvShow.streamUrls.length > 0">
                  <h6>Stream URLs:</h6>
                  <ul>
                    <li v-for="(url, index) in tvShow.streamUrls" :key="index">
                      <a :href="url" target="_blank">{{ url }}</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6>Social Media:</h6>
                  <ul>
                    <li v-for="(link, platform) in tvShow.social" :key="platform">
                      <a :href="link" target="_blank">{{ platform }}</a>: {{ link }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isLoading && tvShows.length > 0" class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tvShows: [],
        displayedTvShows: [],
        currentPage: 1,
        totalPages: 0,
        itemsPerPage: 21,
        isLoading: false,
        error: null
      };
    },
    methods: {
      async fetchTvShows() {
        this.isLoading = true;
        this.error = null;
  
        const options = {
          method: 'GET',
          url: 'https://live-tv-api1.p.rapidapi.com/tv',
          headers: {
            'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b',
            'X-RapidAPI-Host': 'live-tv-api1.p.rapidapi.com'
          }
        };
  
        try {
          const response = await axios.request(options);
          this.tvShows = response.data;
          this.totalPages = Math.ceil(this.tvShows.length / this.itemsPerPage);
          this.displayedTvShows = this.paginate(this.tvShows, this.currentPage, this.itemsPerPage);
        } catch (error) {
          this.error = error.message;
        } finally {
          this.isLoading = false;
        }
      },
      paginate(items, page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.displayedTvShows = this.paginate(this.tvShows, this.currentPage, this.itemsPerPage);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.displayedTvShows = this.paginate(this.tvShows, this.currentPage, this.itemsPerPage);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tv-show {
    margin-bottom: 20px;
  }
  
  .pagination {
    margin-top: 10px;
  }
  
  .pagination button {
    margin-right: 5px;
  }
  </style>
  