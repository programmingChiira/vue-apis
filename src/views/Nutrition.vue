<template>
  <div class="recipe-search">
    <h1>Recipe Search</h1>
    <div>
      <select v-model="selectedChoice">
        <option v-for="choice in choiceOptions" :key="choice.name" :value="choice.name">
          {{ choice.name }}
        </option>
      </select>
      <button class="btn btn-sm btn-primary" @click="fetchRecipe">
        Fetch Recipe
      </button>
      <div v-if="isLoading">
        <p>Loading recipe information...</p>
      </div>
      <div v-else-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else>
      </div>
      <div v-else>
        <ul v-if="recipeData.length > 0">
          <li v-for="recipe in recipeData" :key="recipe.place_id">
            <h2>{{ recipe.name }}</h2>
            <p>Calories: {{ recipe.calories }}</p>
            <p>Carbohydrates: {{ recipe.carbohydrates_total_g }}</p>
            <p>Cholesterol: {{ recipe.cholesterol_mg }}</p>
            <p>Saturated fat: {{ recipe.fat_saturated_g }}</p>
            <p>Total fat: {{ recipe.fat_total_g }}</p>
            <p>Fiber: {{ recipe.fiber_g }}</p>
            <p>Potassium: {{ recipe.potassium_mg }}</p>
            <p>Protein: {{ recipe.protein_g }}</p>
            <p>Serving size: {{ recipe.serving_size_g }}</p>
            <p>Sodium: {{ recipe.sodium_mg }}</p>
            <p>Sugar: {{ recipe.sugar_g }}</p>
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
      choiceOptions: [
        { name: '1lb brisket with fries' },
        { name: '1lb rice with chicken' },
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
