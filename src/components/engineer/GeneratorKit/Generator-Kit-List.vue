<template>
  <v-container grid-list-md>
    <v-row align="center">
      <v-text-field
        :label="'Pesquise...'"
        prepend-inner-icon="fa-search"
        v-model="search"
      ></v-text-field>
      <v-btn color="primary" class="d-none d-md-flex ml-5"
        >Adicione um novo kit gerador</v-btn
      >
    </v-row>
    <v-spacer></v-spacer>
    <v-row class="mb-15">
      <v-data-table
        :items="listGeneratorKit"
        :headers="listHeader"
        :loading="loadingData"
        loading-text="Carregando... Por favor aguarde"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editGeneratorKit(item)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteGeneratorKit(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>

    <v-btn
      bottom
      class="mx-2 d-md-none"
      fab
      dark
      color="indigo"
      @click="newGeneratorKit()"
      fixed
      right
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { GeneratorKitInterface } from "@/interfaces/engineer-interface";
import Vue from "vue";

export default Vue.extend({
  mounted() {
    this.$store.state.loading = true;
    this.$http
      .get("/generator-kits")
      .then((resp) => {
        console.log("resp -> ", resp.data);
        this.listGeneratorKit = resp.data ? resp.data.data : [];
      })
      .finally(() => {
        this.$store.state.loading = false;
        this.loadingData = false;
      });
  },
  data() {
    return {
      search: "",
      listGeneratorKit: [] as Array<GeneratorKitInterface>,
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
          text: "Tipo de célula",
          align: "start",
          value: "cellType",
        },
        {
          text: "Status",
          align: "start",
          value: "status",
        },
        {
          text: "Potência nominal",
          align: "start",
          value: "nominalPower",
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
    editGeneratorKit(item: GeneratorKitInterface) {
      if (item.id) {
        this.$router.push({
          name: "EditGeneratorKit",
          params: { id: item.id },
        });
      }
    },
    deleteGeneratorKit(item: GeneratorKitInterface) {
      console.log("Deletar - ", item);
    },
    newGeneratorKit() {
      this.$router.push({ name: "NewGeneratorKit" });
    },
  },
});
</script>

<style lang="scss" scoped></style>
