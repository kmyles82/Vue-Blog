<template>
    <v-container>
        <v-card v-if="!loading">
        <v-img :src="article.imageUrl"></v-img>
        <v-card-title center>{{article.title}}</v-card-title>
        <v-card-text v-html="article.content"></v-card-text>
        <vue-disqus shortname="vue-blog" :identifier="article.slug" :url="url"></vue-disqus>
    </v-card>
    <div class="loader" v-else>
        <i class="fas fa-spin fa-5x fa-spinner" ></i> 
    </div>
    </v-container>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
    data(){
        return {
            article: {},
            loading: true,
            url: window.location.href
        }
    },
    mounted(){
        this.getArticle();
    },
    methods:{
        getArticle(){
            this.loading = false
            axios.get(`${config.apiUrl}/article/${this.$route.params.id}`)
            
            .then(response => {
                this.article = response.data.data
                
                console.log('get article ',response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }  
}
</script>