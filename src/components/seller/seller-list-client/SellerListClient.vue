<template>
  <v-container grid-list-md>
    <v-row align="center">
      <v-text-field :label="'Pesquise...'" prepend-inner-icon="fa-search" v-model="search"></v-text-field>
      <v-btn color="primary" class="d-none d-md-flex ml-5">Adicione um novo cliente</v-btn>
      <v-btn fixed bottom right class="mx-2 d-md-none" fab dark color="indigo">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-data-table></v-data-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style>
</style>