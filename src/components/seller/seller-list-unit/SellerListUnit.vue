<template>
  <v-container grid-list-md>
    <v-row align="center">
      <v-text-field :label="'Pesquise...'" prepend-inner-icon="fa-search" v-model="search"></v-text-field>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-data-table
        :items="listUnits"
        :headers="listHeader"
        :loading="loading"
        loading-text="Carregando... Por favor aguarde"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <template
          v-slot:item.address="{item}"
        >{{item.address.streetAddress}} - {{item.address.zipCode}}, {{item.address.city}} - {{item.address.state}}</template>

        <template v-slot:item.connectionType="{item}">{{connectionEnum[item.connectionType]}}</template>

        <template v-slot:item.averageConsumption="{item}">{{item.averageConsumption}} KWh</template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ConsumerUnit } from "../../../interfaces/consumer-unit-interface";
import { ConnectionType } from "../../../enums/connection-type-enum";
export default Vue.extend({
  data: () => ({
    connectionEnum: ConnectionType,
    search: "",
    listUnits: [] as Array<ConsumerUnit>,
    loading: false,
    listHeader: [
      {
        text: "Número da Unidade",
        align: "start",
        value: "unitNumber",
      },
      {
        text: "Endereço",
        value: "address",
      },
      {
        text: "Tipo de Conexão",
        value: "connectionType",
      },
      {
        text: "Modalidade da Tarifa",
        value: "tariffModality",
      },
      {
        text: "Utilidade Elétrica",
        value: "electricUtility",
      },
      {
        text: "Consumo Médio",
        value: "averageConsumption",
      },
      {
        text: "Ações",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  props: ["clientId"],
  methods: {
    populateList() {
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
      if (this.clientId) {
        this.loading = true;
        fetch(
          `https://cors-anywhere.herokuapp.com/https://elosolar.herokuapp.com/v1/consumer-units?filter=clientId==${this.clientId}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => (this.listUnits = result.data))
          .catch((error) => console.log("error", error))
          .finally(() => (this.loading = false));
      }
    },
    editItem(item: ConsumerUnit) {
      console.log(item);
    },
    deleteItem(item: ConsumerUnit) {
      console.log(item);
    },
  },
  watch: {
    clientId(val) {
      if (val) {
        this.populateList();
      }
    },
  },
  beforeMount() {
    this.populateList();
  },
});
</script>

<style>
</style>