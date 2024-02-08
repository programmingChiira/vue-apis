<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <h3><i>Combo.</i></h3>
          </router-link>
          <button class="navbar-toggler" type="button" @click="toggleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div :class="{ 'collapse': !isNavbarOpen, 'navbar-collapse': true }" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/jokes" class="nav-link" exact>Jokes</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/kenyanews" class="nav-link" exact>Kenyan
                  News</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/tvshows" class="nav-link" exact>Kenyan Live
                  Tv</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/weather" class="nav-link" exact>AI Weather</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/nutrition" class="nav-link" exact>Food Nutrition Content</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/memes" class="nav-link" exact>Memes</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/chuckNorris" class="nav-link" exact>Chuck
                  Norris</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <hr />
    <router-view style="margin-left: 20px;" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isNavbarOpen = ref(false)

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value
}

function collapseNavbar() {
  isNavbarOpen.value = false
}
</script>

<style scoped>
.router-link-active {
  color: rgb(16, 150, 38);
  /* Change color to red when the link is active */
  font-weight: bold;
  /* Make the active link bold */
}</style>
