<template>
  <v-container grid-list-md>
    <v-select
      :items="fields"
      v-model="selectedField"
      label="label"
    ></v-select>
    {{this.selectedField}}
    <v-text-field
      label="Pesquise por nome"
      prepend-icon="fa-search"
    ></v-text-field>
  </v-container>
</template>

<script>
import { ClientField } from './ClientFieldSearch'

export default {
  data() {
    return {
      fields: ClientField,
      selectedField: '',
    }
  }
};
</script>

<style>
</style>