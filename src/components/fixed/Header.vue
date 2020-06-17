<template>
  <div class="header-wrapper">
    <v-app-bar dense dark :height="isMobile ? 50: 75">
      <v-menu offset-y v-if="$store.state.logged">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
          <span>{{$store.state.name}}</span>
        </template>
        <v-list>
          <v-list-item @click="redirectHome()">
            <i class="fa fa-home" aria-hidden="true"></i>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()">
            <i class="fas fa-sign-out-alt"></i>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span></span>

      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          src="../../assets/elo-solar-logo.png"
          :max-height="isMobile ? 40 : 65"
          contain
          position="center center"
        ></v-img>
      </template>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isMobile: false
    };
  },

  beforeDestroy() {
    if (typeof window !== undefined) {
      window.removeEventListener("resize", this.onResize);
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 960;
    },
    redirectHome() {
      switch (this.$store.state.role) {
        case "SELLER":
          if (this.$route.path !== `/seller`) {
            this.$router.push("/seller");
          }
          break;
        case "ENGINEER":
          if (this.$route.path !== `/engineer`) {
            this.$router.push("/engineer");
          }
          break;
        default:
          break;
      }
    },
    logout() {
      this.$store.commit("logout");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.v-list-item__title {
  padding-left: 5px;
}
</style>