<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
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
  })
});
</script>
