<template>
  <v-container grid-list-md>
    <v-row align="center">
      <v-text-field
        :label="'Pesquise...'"
        prepend-inner-icon="fa-search"
        v-model="search"
      ></v-text-field>
      <v-btn color="primary" class="d-none d-md-flex ml-5" @click="newClient()"
        >Adicione um novo cliente</v-btn
      >
      <v-btn
        fixed
        bottom
        right
        class="mx-2 d-md-none"
        fab
        dark
        color="indigo"
        @click="newClient()"
      >
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ClientInterface } from "../../../interfaces/client-interface";
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
  methods: {
    editItem(item: ClientInterface) {
      if (item.id) {
        this.$router.push({ name: "EditClient", params: { id: item.id } });
      }
    },
    deleteItem(item: ClientInterface) {
      console.log("Deletar - ", item);
    },
    newClient() {
      this.$router.push({ name: "NewClient" });
    },
  },
  beforeMount() {
    this.$store.state.loading = true;
    this.$http
      .get("/clients")
      .then((result) => (this.listClient = result.data.data))
      .catch((error) => console.log("error", error))
      .finally(() => {
        this.$store.state.loading = false;
        this.loadingData = false;
      });
  },
});
</script>

<style></style>
