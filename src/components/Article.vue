<template>
    <v-card class="my-3">
        <v-card-title id="title">{{article.title}}</v-card-title>
        <v-card-text v-html="article.content.substring(0,200)"></v-card-text>
        <v-card-actions>
            <router-link :to="`/article/${article.slug}`">
            <v-btn class="primary">Read more...</v-btn></router-link>
            
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props:['article'],
    data(){
        return{

        }
    },
    methods: {

    }
}
</script>

<style>
    #title{
        background: #ddd;
        font-weight: bold;
    }
</style>