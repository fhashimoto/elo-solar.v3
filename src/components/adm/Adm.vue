<template>
  <v-container grid-list-md>
    <v-spacer></v-spacer>
    <v-row dense class="menu-row">
      <v-col cols="12" md="4" sm="4">
        <v-card hover class="menu-row__card" @click="goToPage('ListUser')">
          <i class="fas fa-users"></i>
          <v-toolbar-title>Usuários</v-toolbar-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    goToPage(page: string) {
      this.$router.push({ name: page });
    },
  },
});
</script>

<style lang="scss" scoped>
.menu-row {
  text-align: center;
  &__card {
    margin: 20px 20px 0;
    padding: 25px;
  }
  .fas {
    font-size: 40px;
    margin-bottom: 10px;
  }
}
</style>
