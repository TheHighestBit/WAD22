<template>
  <div class="login">
    <form>
      <label class="login-label">Email</label>
      <input class="text-input" type="email" required v-model="email">
      <label class="login-label">Password </label>
      <input class="text-input" type="password" required v-model="password">
    </form>
    <button id="submit-button">Signup</button>

  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 6em;
  background-color: lightgrey;
  border-radius: 8px;
  width: 35%;
  gap: 0.5em;
  padding: 0.5em;
  margin-left: auto;
  margin-right: auto;
}

.login-label {

  width: 100%;
  border: none;
  height: 2em;
  margin: 0.3em;
}

.text-input {
  border-radius: 5px;
  width: 100%;
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
