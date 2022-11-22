<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>
  .navbar{
    font-size: 2rem;
    width: 100%;
    background: white;
    top: 0;
    margin: 0;
    padding: 10px;
  }
</style>
