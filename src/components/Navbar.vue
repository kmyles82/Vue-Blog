<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title>
      <router-link to="/">
      <v-responsive>
        <img src="../assets/logo.png" width="30px" height="30px">
      </v-responsive></router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-if="authUser">
        <router-link to="/articles/create" class="nav-link grey--text text--darken-2">Create new artice</router-link>
      </v-btn>
      <v-btn flat v-if="!authUser">
        <router-link to="/login" class="nav-link grey--text text--darken-2">Login</router-link>
      </v-btn>
      <v-btn flat v-if="!authUser">
        <router-link to="/signup" class="nav-link grey--text text--darken-2">Signup</router-link>
      </v-btn>
      <v-btn flat v-if="authUser">
        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">Hey
            <span>{{authUser.name}}</span>
            <v-icon dark> keyboard_arrow_down</v-icon>
          </v-toolbar-title>

          <v-list>
            <v-list-tile>
              <v-list-tile-title @click="logout()">Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  name: "Navbar",
  components: {
  },
  data: () => ({
    username: "kerry"
  }),
  methods:{
    logout(){
      localStorage.removeItem('auth')
      this.$root.auth = {}
      this.$noty.success('Succesfully logged out')
    }
  },
  mounted(){
    // console.log(this.$root)
  },
  computed: {
    authUser(){
      return this.$root.auth.user
    }
  }
};
</script>

<style>
.nav-link{
  text-decoration: none;
}
</style>
