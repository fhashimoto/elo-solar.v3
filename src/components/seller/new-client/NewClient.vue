<template>
  <v-container>
    <Client></Client>
    <h2>Lista de Unidades Consumidoras</h2>
    <div class="my-2 justify-end d-flex">
      <v-btn color="primary" dark @click.stop="dialog = true">
        <i class="fa fa-plus mr-2" aria-hidden="true"></i>Nova Unidade
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="75vw">
      <v-card>
        <ConsumerUnits></ConsumerUnits>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Client from "../sub-components/Client";
import ConsumerUnits from "../sub-components/ConsumerUnits";

export default {
  components: {
    Client,
    ConsumerUnits,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
</style>