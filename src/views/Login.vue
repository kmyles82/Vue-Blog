<template>
  <v-layout justify-center class="mt-5">
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-title class="display-1">Login</v-card-title>
        <v-card-text>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <div class="errors" v-if="errors.email">
            <small class="red--text" v-for="error in errors.email" :key="error">{{error}}</small>
          </div>
          <v-text-field label="Password" v-model="password"></v-text-field>
          <div class="errors" v-if="errors.password">
            <small class="red--text" v-for="error in errors.password" :key="error">{{error}}</small>
          </div>
          <v-btn class="success" block @click="loginUser()" :disabled="loading">
            <i class="fas fa-spin fa-spinner" v-if="loading"></i> {{ loading ? '' : 'Login'}}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import config from '@/config'

export default {
  data: () => ({
    email: '',
    password: '',
    errors: {},
    loading: false
  }),
  name: "login",
  computed: {},

  watch: {
  },

  methods: {
    loginUser(){
      this.loading = true
      axios.post(`${config.apiUrl}/auth/login`, {
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.$noty.success('Succesfully logged in')
        this.loading = false
        this.$root.auth = response.data.data
        localStorage.setItem('auth', JSON.stringify(response.data.data))
        this.$router.push('/')
      })
      .catch(({response}) => {
        this.loading = false
        this.$noty.error('Oops, something went wrong')
        if(response.status === 401){
          this.errors = {
            email: ['These credentials do not match our records']
          }
        }else {
          this.errors = response.data
        }
        
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if(localStorage.getItem('auth')){
      return next({ path: '/'})
    } 
    next(); 
  }
};
</script>

<style>
</style>


