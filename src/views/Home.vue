<template>
  <div>
    <div class="d-flex justify-space-between">
      <v-btn class="warning" id="prev" @click="getPrevArticles()" :disabled="articles.prev_page_url === null">Prev Page</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="warning" id="next" @click="getNextArticles()" :disabled="articles.next_page_url === null">Next Page</v-btn>
    </div>
    <v-container>
      <v-layout row wrap justify-center v-if="!loading">
        <v-flex xs12 v-for="article in articles.data" :key="article.id" >
          <Article v-if="articles.data" :article="article" />
        </v-flex>
        
      </v-layout>
      <div v-else class="mx-auto" style="width: 10%">
        <i class="fas fa-spin fa-3x fa-spinner mx-auto" ></i> 
        </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import Article from "@/components/Article.vue";

export default {
  name: "home",
  components: {
    Article
  },
  data() {
    return {
      articles: {},
      loading: true
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles(url = `${config.apiUrl}/articles`) {
        this.loading = true
      axios
        .get(url)
        .then(response => {
            this.loading = false
          this.articles = response.data.data;

          // console.log('home page',response)
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNextArticles(){
        this.getArticles(this.articles.next_page_url)
    },
    getPrevArticles(){
        this.getArticles(this.articles.prev_page_url)
    }
  }
};
</script>

<style>
#prev,
#next {
  max-width: 10px;
}
</style>