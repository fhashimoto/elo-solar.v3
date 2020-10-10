<template>
  <v-container grid-list-md>
    <v-row align="center">
      <v-text-field
        :label="'Pesquise...'"
        prepend-inner-icon="fa-search"
        v-model="search"
      ></v-text-field>
      <v-btn color="primary" class="d-none d-md-flex ml-5"
        >Adicione um novo inversor</v-btn
      >
    </v-row>
    <v-spacer></v-spacer>
    <v-row class="mb-15">
      <v-data-table
        :items="listInversor"
        :headers="listHeader"
        :loading="loadingData"
        loading-text="Carregando... Por favor aguarde"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editInversor(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteInversor(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>

    <v-btn
      bottom
      class="mx-2 d-md-none"
      fab
      dark
      color="indigo"
      @click="newInversor()"
      fixed
      right
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { InversorInterface } from "@/interfaces/engineer-interface";
import Vue from "vue";

export default Vue.extend({
  mounted() {
    this.$store.state.loading = true;
    this.$http
      .get("/inverters")
      .then((resp) => {
        console.log("resp -> ", resp.data);
        this.listInversor = resp.data ? resp.data.data : [];
      })
      .finally(() => {
        this.$store.state.loading = false;
        this.loadingData = false;
      });
  },
  data() {
    return {
      search: "",
      listInversor: [] as Array<InversorInterface>,
      listHeader: [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        {
          text: "Marca",
          align: "start",
          value: "brand",
        },
        {
          text: "Categoria",
          align: "start",
          value: "category",
        },
        {
          text: "Tipo",
          align: "start",
          value: "type",
        },
        {
          text: "Status",
          align: "start",
          value: "status",
        },
        {
          text: "Número MPPT",
          align: "start",
          value: "numberOfMPPTs",
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
    editInversor(item: InversorInterface) {
      if (item.id) {
        this.$router.push({
          name: "EditInversor",
          params: { id: item.id },
        });
      }
    },
    deleteInversor(item: InversorInterface) {
      console.log("Deletar - ", item);
    },
    newInversor() {
      this.$router.push({ name: "NewInversor" });
    },
  },
});
</script>

<style lang="scss" scoped></style>
