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
      <v-data-table
        :items="listClient"
        :headers="listHeader"
        :loading="loadingData"
        loading-text="Carregando... Por favor aguarde"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Client } from "../../../interfaces/client-interface";
export default Vue.extend({
  data() {
    return {
      search: "",
      listClient: [] as Array<object>,
      listHeader: [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
        },
      ],
      loadingData: true,
    };
  },
  mounted() {
    console.log(this.listClient);
  },
  methods: {
    editItem(item: Client) {
      if (item.id) {
        this.$router.push({ name: "EditClient", params: { id: item.id } });
      }
    },
    deleteItem(item: Client) {
      console.log("Deletar - ", item);
    },
  },
  beforeMount() {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer jQkQpOoKaXhpkHjFF8XmD5wgov61GEl9njiydhw7NoAPP5MfVQVmF0rbjCyPR35M"
    );

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://cors-anywhere.herokuapp.com/https://elosolar.herokuapp.com/v1/clients",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (this.listClient = result.data))
      .catch((error) => console.log("error", error))
      .finally(() => (this.loadingData = false));
  },
});
</script>

<style>
</style>