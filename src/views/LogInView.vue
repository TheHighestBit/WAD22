<template>
  <div class="login">
    <form onsubmit="return false">
      <label class="login-label">Email</label>
      <input class="text-input" type="email" required v-model="email">
      <label class="login-label">Password </label>
      <input class="text-input" type="password" required v-model="password">
      <button @click="LogIn" id="login-button">Login</button>
      <button @click="this.$router.push('/signup')" id="signup-button">Signup</button>
    </form>

  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return { /*not required yet, for future usage*/
      email: '',
      password: ''
    }
  },
  methods: {
    async LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      this.$router.push("/");
      //location.assign("/");
      console.log("successful login");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }
}
</script>

<style scoped>
body {
  height: 100%;
  position:relative;
}
.login {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6em;
  background-color: lightgrey;
  border-radius: 8px;
  gap: 0.5em;
  padding: 0.5em;

}



.login-label {


  border: none;
  height: 2em;
  margin: 0.3em;
}

.text-input {
  border-radius: 5px;

  border: none;
  height: 2em;
  margin: 0.3em;
}

.text-input:focus { /*Gets rid of the ugly black border when entering text*/
  outline: none;
}

.login form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  text-align: center;
}

#login-button, #signup-button {
  border-radius: 5px;
  background-color: rgba(150, 198, 246, 0.99);
  color: white;
  border: 0;
  padding-inline: 1em;
  padding-block: 0.3em;
  margin: 0.6em;
}

::placeholder { /*This affects the placeholder text in the input fields*/
  opacity: 0.5;
}

</style>
