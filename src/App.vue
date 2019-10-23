<template>
  <v-app>
    <Navbar/>
    <v-container>
      <v-content>
        <router-view>
        </router-view>
      </v-content>
    </v-container>
    
  </v-app>
</template>

<script>
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Login,
    Signup,
    Navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
body{
  background: #f5f3ef;
}

.container{
  max-width: 800px;
  width: 100%;
}

</style>

