<template>
  <div class="header-wrapper">
    <v-app-bar dense dark :height="isMobile ? 50: 75">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

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
    return{
      isMobile: false,
    }
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
    }
  }
});
</script>

<style>
</style>