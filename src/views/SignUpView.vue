<template>
  <div class="login">
    <form>
      <label class="login-label">Email</label>
      <input class="text-input" type="email" name="email" required v-model="email">
      <label class="login-label">Password </label>
      <input class="text-input" type="password" name="password" required v-model="password" minlength="8" maxlength="14" pattern="(?=^.*[A-Z].*$)(?=^.*[a-z].*[a-z].*$)(?=^.*\d+.*$)(?=^[A-Z].*$)(?=^.*_.*$).*" oninvalid="this.setCustomValidity('Must have at least 8 chars and less than 15 chars, at least one uppercase character, at least two lowercase alphabet characters, at least one numeric value, start with an uppercase character, include the character _')"
  oninput="this.setCustomValidity('')">
      <button @click="SignUp" id="submit-button">Signup</button>
    </form>

  </div>
</template>

<script>

export default {
  name: "SignUpView",
  data() {
    return { /*not required yet, for future usage*/
      email: '',
      password: ''
    }
  },
  methods: {
    SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
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

#submit-button {
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
