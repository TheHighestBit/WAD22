<template>
  <div class="post">
    <div class="postheader">
      {{post.date}}

    </div>
    <p class="posttext">
      {{ post.content }}
    </p>
    <p>Post id: {{ post.id }}</p>

  </div>
</template>

<script>

let post;
export default {
  name: 'HelloWorld',
  props: {
    post :post
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
.post {
    padding: 20px;
    margin: 20px;
    background-color: rgb(248, 248, 248);
    border-radius: 3px;
    text-align: left;
}

.postheader {
    display: flex;
    width: 100%;
    margin-bottom: 7px;
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
