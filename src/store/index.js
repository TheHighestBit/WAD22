import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: [
      {
        "id": 0,
        "content": "Took this in Ihaste",
        "date": "2022-10-22 23:19",
        "image": 'tartu2022.jpg',
        "likes": 0
      },
      {
        "id": 1,
        "content": "Anybody know which room the lab is in today?",
        "date": "2022-10-24 15:19",
        "image": null,
        "likes": 0
      },
      {
        "id": 2,
        "content": "Sometimes I just feel like a slice of bread.",
        "date": "2022-10-29 03:42",
        "image": null,
        "likes": 0
      },
      {
        "id": 3,
        "content": null,
        "date": "2022-10-20 15:19",
        "image": 'InkMan.jpg',
        "likes": 0
      },
      {
        "id": 4,
        "content": "If I’m not back in five minutes, just wait longer.",
        "date": "2022-10-26 11:19",
        "image": null,
        "likes": 0
      },
      {
        "id": 5,
        "content": "Why do they call it rush hour when nothing moves?",
        "date": "2022-10-27 05:19",
        "image": null,
        "likes": 0
      },
      {
        "id": 6,
        "content": "I prefer not to think before speaking. I like being as surprised as everyone else by what comes out of my mouth.",
        "date": "2022-11-01 16:42",
        "image": null,
        "likes": 0
      },
      {
        "id": 7,
        "content": "Woke up today. It was terrible.",
        "date": "2022-11-02 06:01",
        "image": null,
        "likes": 0
      },
      {
        "id": 8,
        "content": "The worst part of online shopping is having to get up and get your credit card from your wallet.",
        "date": "2022-11-05 22:07",
        "image": null,
        "likes": 0
      },
      {
        "id": 9,
        "content": "Money cannot buy health, but I'd settle for a diamond-studded wheelchair.",
        "date": "2022-11-07 12:37",
        "image": null,
        "likes": 0
      }
    ]
  },
  getters: {
    getPostByID: (state) => (id) => {
      return state.posts.find(post => post.id === id);
    },

    getPostIDs: (state) => {
      let ids = [];

      state.posts.forEach(element => {
        ids.push(element.id);
      });

      return ids;
    },

    getPostLikesByID: (state) => (id) => {
      return state.posts.find(post => post.id === id).likes;
    }
  },
  mutations: {
    resetAllLikes (state) {
      state.posts.forEach((x) => {x.likes = 0});
    },
    addLike (state, id) {
      state.posts.find(post => post.id === id).likes++;
    }
  },
  actions: {
  },
  modules: {
  }
})
