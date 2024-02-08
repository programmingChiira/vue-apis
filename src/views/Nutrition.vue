<template>
  <div class="recipe-search">
    <h1>Recipe Select</h1>
    <div>
      <div class="row">
        <div class="col-6 col-md-6">
          <select class="form form-control" v-model="selectedChoice">
            <option v-for="choice in choiceOptions" :key="choice.name" :value="choice.name">
              {{ choice.name }}
            </option>
          </select>
        </div>

        <div style="float: right;" class="col-6 col-md-6">
          <button class="btn btn-sm btn-primary" @click="fetchRecipe">
            Fetch Recipe
          </button>
        </div>
      </div>
      <div v-if="isLoading">
        <p>Loading recipe information...</p>
      </div>
      <div v-else-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div style="margin-top: 20px;" v-else>
        <div class="row" v-if="recipeData.length > 0">
          <div class="col-12 col-md-3" v-for="recipe in recipeData" :key="recipe.place_id">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">{{ recipe.name }}</h2>
                <p class="card-text">Calories: {{ recipe.calories }}</p>
                <p class="card-text">Carbohydrates: {{ recipe.carbohydrates_total_g }}</p>
                <p class="card-text">Cholesterol: {{ recipe.cholesterol_mg }}</p>
                <p class="card-text">Saturated fat: {{ recipe.fat_saturated_g }}</p>
                <p class="card-text">Total fat: {{ recipe.fat_total_g }}</p>
                <p class="card-text">Fiber: {{ recipe.fiber_g }}</p>
                <p class="card-text">Potassium: {{ recipe.potassium_mg }}</p>
                <p class="card-text">Protein: {{ recipe.protein_g }}</p>
                <p class="card-text">Serving size: {{ recipe.serving_size_g }}</p>
                <p class="card-text">Sodium: {{ recipe.sodium_mg }}</p>
                <p class="card-text">Sugar: {{ recipe.sugar_g }}</p>
              </div>
            </div>
          </div>
        </div>
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
      choiceOptions: [
        { name: '1lb brisket with fries' },
        { name: '1lb rice with chicken with onions' },
      ],
      selectedChoice: '',
      recipeData: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async fetchRecipe() {
      if (!this.selectedChoice) {
        return; // Do nothing if no choice is selected
      }

      this.isLoading = true;
      this.error = null;

      const options = {
        method: 'GET',
        url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
        params: {
          query: this.selectedChoice,
        },
        headers: {
          'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b',
          'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        this.recipeData = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
