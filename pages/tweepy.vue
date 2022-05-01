<template>
  <v-container>
    <v-text-field v-model="query.search" rounded filled append-icon="fa-solid fa-magnifying-glass" autofocus
                  placeholder="Search for keywords..." @click:append="searchTweets()" @change="searchTweets()"
    ></v-text-field>

    <v-data-table
      :class="this.$vuetify.theme.dark  ?'table-dark':'table-light'"
      :headers="headers"
      :items="tweets"
      :loading="tweetIsLoading"
      :items-per-page="10"
    ></v-data-table>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'TwiiterAPIPage',
  data() {
    return {
      headers: [
        {text: "Id", value: "id"},
        {text: "Tweet", value: "text"}
      ],
      query:{
        search: "",
      }
    }
  },
  computed: {
    ...mapGetters("apis", [
      "tweets", "tweetIsLoading",
    ])
  },
  methods: {
    ...mapActions("apis", [
      "fetchTweets"
    ]),
    searchTweets(){
      this.fetchTweets(this.query)
    }
  }
}
</script>

<style scoped lang="scss">
.table-light {
  background-color: #F5F5F5;
  border-radius: 30px;
  padding: 16px;
}

.table-dark {
  background-color: #272727;
  border-radius: 30px;
  padding: 16px;
}
</style>
