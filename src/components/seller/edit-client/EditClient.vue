<template>
  <v-container>
    <template v-if="!loading">
      <Client :clientData.sync="clientData"></Client>
    </template>
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw" v-else></i>
    <div class="list-top">
      <h2>Lista de Unidades Consumidoras</h2>
      <div class="my-2 justify-end d-flex">
        <v-btn color="primary" dark @click.stop="dialog = true">
          <i class="fa fa-plus mr-2" aria-hidden="true"></i>Nova Unidade
        </v-btn>
      </div>
    </div>
    <SellerListUnit
      :clientId.sync="clientData && clientData.id"
      :unitData.sync="unitData"
      :dialog.sync="dialog"
    ></SellerListUnit>
    <v-dialog v-model="dialog" max-width="75vw">
      <v-card>
        <ConsumerUnits :unitData.sync="unitData"></ConsumerUnits>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Client from "../sub-components/Client.vue";
import ConsumerUnits from "../sub-components/ConsumerUnits.vue";
import SellerListUnit from "../seller-list-unit/SellerListUnit.vue";
export default Vue.extend({
  components: {
    Client,
    ConsumerUnits,
    SellerListUnit,
  },
  data: () => ({
    dialog: false,
    clientData: {},
    loading: false,
    unitData: null,
  }),
  beforeMount() {
    this.$http
      .get(`/clients/${this.$route.params.id}`)
      .then((result) => (this.clientData = result.data))
      .catch((error) => console.log("error", error))
      .finally(() => (this.loading = false));
  },
  watch: {
    unitData(val) {
      console.log(val);
    },
  },
});
</script>

<style lang="scss">
.list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>