const state = () => ({
  tweets: [],
  tweetIsLoading: false,
});

const mutations = {
  setTweets: (state, tweets) => {
    state.tweets = tweets
  },
  setTweetIsLoading: (state, tweetIsLoading) => {
    state.tweetIsLoading = tweetIsLoading
  }
};

const actions = {
  async fetchTweets(state, query = null) {
    let search = '';
    if (query !== null) {
      search = query.search;
    }
    state.commit('setTweetIsLoading', true);
    let url = `${process.env.FETCH_TWEETS_API}`;

    url = `${url}?search=${search}`


    await this.$axios.get(url, {
      headers: {
        Accept: "application/json",
      }
    })
      .then(res => {
        console.log(res)
        const tweets = res.data.data;
        state.commit('setTweets', tweets);
        state.commit('setTweetIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setTweetIsLoading', false);
      });
  },
};

const getters = {
  tweets: state => state.tweets,
  tweetIsLoading: state => state.tweetIsLoading,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

