<template>
  <div>
    <div style="margin: 10px;">
      <a href="/" class="navbar-brand">
        <i class="fa fa-envelope"></i>
      </a>
    </div>
    <hr style="margin-top: -1px;" />
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
                <router-link @click.native="collapseNavbar" to="/jokes" class="nav-link">Jokes</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/kenyanews" class="nav-link">Kenyan News</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/weather" class="nav-link">AI Weather</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/nutrition" class="nav-link">Nutrition</router-link>
              </li>
              <li class="nav-item">
                <router-link @click.native="collapseNavbar" to="/chuckNorris" class="nav-link">Chuck Norris</router-link>
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

<style scoped>/* Add your custom styles here */</style>
