<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view></router-view>
    </v-main>
    <div class="loading-icon" v-if="$store.state.loading">
      <div class="fa-3x">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
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
        timeDifference =
          (timeNow.getTime() -
            new Date(this.$store.state.timeLogged).getTime()) /
          1000;
      console.log("dif - ", timeDifference / 60);
      if (timeDifference / 60 >= 60) {
        this.$store.commit("logout");
        this.backToLogin();
      }
    },
  },
});
</script>

<style lang="scss">
.loading-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(245 245 245 / 0.75);
  z-index: 200;
}
</style>
