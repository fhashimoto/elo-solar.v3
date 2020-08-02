<template>
  <v-container>
    <Client :clientData.sync="clientData" v-if="!loading"></Client>
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw" v-else></i>
    <div class="list-top">
      <h2>Lista de Unidades Consumidoras</h2>
      <div class="my-2 justify-end d-flex">
        <v-btn color="primary" dark @click.stop="dialog = true">
          <i class="fa fa-plus mr-2" aria-hidden="true"></i>Nova Unidade
        </v-btn>
      </div>
    </div>
    <SellerListUnit :clientId.sync="clientData && clientData.id"></SellerListUnit>
    <v-dialog v-model="dialog" max-width="75vw">
      <v-card>
        <ConsumerUnits></ConsumerUnits>
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
    clientData: null,
    loading: false,
  }),
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
    this.loading = true;
    fetch(
      "https://cors-anywhere.herokuapp.com/https://elosolar.herokuapp.com/v1/clients/" +
        this.$route.params.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => (this.clientData = result))
      .catch((error) => console.log("error", error))
      .finally(() => (this.loading = false));
    console.log("fetch client - ", this.$route.params.id, this.clientData);
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