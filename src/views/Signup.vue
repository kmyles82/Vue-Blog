<template>
  <v-layout justify-center class="mt-5">
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-title class="display-1">Signup</v-card-title>
          <v-card-text>
            <v-text-field v-model="name" label="Name"></v-text-field>
            <div class="errors" v-if="errors.name">
              <small class="red--text" v-for="error in errors.name" :key="error">{{error}}</small>
            </div>
            <v-text-field
              v-model="email"
              label="Email"
              :class="{ 'input-group--focused': errors.email}"
              :rules="emailRules"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
            ></v-text-field>
            <div class="errors" v-if="errors.email">
              <small class="red--text" v-for="error in errors.email" :key="error">{{error}}</small>
            </div>
            <v-text-field
              v-model="password"
              label="Password"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
            ></v-text-field>
            <div class="errors" v-if="errors.password">
              <small class="red--text" v-for="error in errors.password" :key="error">{{error}}</small>
            </div>
            <v-btn class="success" block @click="registerUser()" :disabled="loading">
              <i class="fas fa-spin fa-spinner" v-if="loading"></i> {{ loading ? '' : 'Signup'}}
            </v-btn>
            
          </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import config from '@/config';

export default {
  name: "signup",
  data: () => ({
    name: "",
    email: "",
    password: "",
    errors: {},
    show2: true,
    valid: false,
    submitted: false,
    loading: false,
    passwordRules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),

  computed: {},

  watch: {},

  methods: {
    registerUser() {
      //   console.log(this.name, this.email, this.password);
      this.loading = true
      
      axios
        .post(`${config.apiUrl}/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          // console.log(response)
          this.$noty.success('Succesfully registered')
          this.loading = false
          this.submitted = true
          const { data } = response.data;
          //cache user info locally
          localStorage.setItem("auth", JSON.stringify(data));
          //store user token in root instance in main.js auth object
          this.$root.auth = data;
          //send user to homepage after successful signup
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.$noty.error('Oops, something went wrong.')
          this.loading = false
          this.submitted = true
          this.errors = response.data;
        });
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
.is-invalid {
  color: red;
}
</style>


