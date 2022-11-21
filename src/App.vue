<template>
  <HeaderComponent id="header"></HeaderComponent>
  <router-view id="body"/>
  <FooterComponent id="footer"></FooterComponent>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  display: flex;
  flex-direction: column;
  margin: 0;
}


#header{
  margin-top: 10px;
}
#body {
  flex-grow: 1;
}
#footer {
  margin-top: auto;
}


</style>
<script>
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
export default {
  components: {FooterComponent, HeaderComponent}
}
</script>
