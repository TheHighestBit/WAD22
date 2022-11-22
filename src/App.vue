<template>
  <HeaderComponent></HeaderComponent>
  <router-view/>
  <FooterComponent></FooterComponent>
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
  margin: 0;
}


</style>


<script>
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
export default {
  components: {FooterComponent, HeaderComponent}
}
</script>
