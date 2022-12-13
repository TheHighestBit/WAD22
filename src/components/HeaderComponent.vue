<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link> |
<!--    <router-link to="/signup">Register</router-link> |
    <router-link to="/login">login</router-link>-->
    <button @click="Logout">Logout</button>
  </nav>
</template>

<script>
import auth from "@/auth";

export default {
  name: "HeaderComponent",
  data: function() {
    return {
      authResult: auth.authenticated()
    }
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            //console.log('jwt removed');
            //console.log('jwt removed:' + auth.authenticated());
            this.$router.push("/login");
            //location.assign("/");
          })
          .catch((e) => {
            console.log(e);
            console.log("error logout");
          });
    }
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
