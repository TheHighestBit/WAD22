<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link> |
<!--    <router-link to="/signup">Register</router-link> |
    <router-link to="/login">login</router-link>-->
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
//import auth from "@/auth";

export default {
  name: "HeaderComponent",
  data: function() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .navbar{
    font-size: 2rem;
    width: 100%;
    background: white;
    top: 0;
    margin: 0;
    padding-top: 50px;
  }

  button {
    border: none;
    background-color: white;
    font-size: 31px;
    text-decoration: underline;
  }
</style>
