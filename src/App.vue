<template>
  <v-app>
    <Header></Header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Header from "./components/fixed/Header.vue";
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: { Header },

  data: () => ({
    //
  }),

  beforeUpdate() {
    this.userTimeout();
  },
  mounted() {
    this.userTimeout();
  },
  methods: {
    backToLogin() {
      if (!this.$store.state.logged && this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    userTimeout() {
      const timeNow = new Date(),
        timeDifference = (timeNow.getTime() - new Date(this.$store.state.timeLogged).getTime())/1000
      console.log('dif - ',timeDifference/60);
      if ((timeDifference/60) >= 60) {
        this.$store.commit("logout");
        this.backToLogin();
      }
    }
  }
});
</script>
