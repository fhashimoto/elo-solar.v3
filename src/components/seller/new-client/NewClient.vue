<template>
  <v-container>
    <Client :clientData.sync="parentData"></Client>
    <h2>Lista de Unidades Consumidoras</h2>
    <div class="my-2 justify-end d-flex">
      <v-btn color="primary" dark @click.stop="dialog = true">
        <i class="fa fa-plus mr-2" aria-hidden="true"></i>Nova Unidade
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="75vw" v-if="dialog">
      <v-card>
        <ConsumerUnits></ConsumerUnits>
      </v-card>
    </v-dialog>
    <div class="my-10 d-flex justify-center">
      <v-btn color="green lighten-2" @click="handleSave()">
        Salvar <i class="fa fa-check" aria-hidden="true"></i>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Client from "../sub-components/Client.vue";
import ConsumerUnits from "../sub-components/ConsumerUnits.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    Client,
    ConsumerUnits,
  },
  data: () => ({
    dialog: false,
    parentData: null,
  }),
  methods: {
    handleSave() {
      console.log("save - ", this.parentData, this.$store.state.user);
      const dataToSave = this.beforeSave()
      this.$http.post("/clients", dataToSave).then((resp) => {
        console.log(resp);
      });
    },
    beforeSave() {
      const dataCopy = JSON.parse(JSON.stringify(this.parentData))
      const phone = dataCopy.phone.replace(/[()]/g,'').trim().split(' ')
      dataCopy.phone = {
        areaCode: phone[0],
        phoneNumber: phone[1]
      }
      delete dataCopy.id
      return dataCopy
    }
  },
});
</script>

<style></style>
