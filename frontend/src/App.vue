<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Autobots</RouterLink>
        <br>
        <RouterLink to="/api_documentaion">api_documentaion</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
body {
  background-color: #2f2f2f;
  color: #ffffff;
}

body a {
  color: #ffffff;
}
</style>