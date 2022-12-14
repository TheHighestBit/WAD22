<template>
  <div class="post">
    <div class="postheader">
      {{post.date}}

    </div>
    <p class="posttext">
      {{ post.content }}
    </p>
    <div class="id">Post id: {{ post.id }}</div>

  </div>
</template>

<script>

let post;
export default {
  name: 'HelloWorld',
  props: {
    post : post
  },
  data: function() {

    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.id {
  text-align: right;
  color: gray;
  font-size: 13px;
}
.post {
    padding: 20px;
    margin: 20px;
    background-color: rgb(227, 230, 238);
    border-radius: 12px;
    text-align: left;
}

.postheader {
    display: inline-block;
    margin-bottom: 7px;
    background-color: rgb(196, 196, 196);
    color: black;
    font-size: 13px;
    padding: 3px 10px;
    margin-left: -20px;
  }

.postheader > img {
    width: 100%;
    max-width: 40px;
}

img + span {
    margin-left: auto;
}

.postheader ~ img {
    width: 100%;
}

.posttext {
    padding: 1em 2em;
}

.likebutton > img {
    width: 100%;
    max-width: 20px;
}

.likebutton:hover::after {
    content: "like";
}
</style>
