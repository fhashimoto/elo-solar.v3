<template>
  <v-container>
    <Client :clientData.sync="parentData"></Client>
    <div v-if="parentData">
      <h2>Lista de Unidades Consumidoras</h2>
      <div class="my-2 justify-end d-flex">
        <v-btn color="primary" dark @click.stop="dialog = true">
          <i class="fa fa-plus mr-2" aria-hidden="true"></i>Nova Unidade
        </v-btn>
      </div>
      <v-dialog v-model="dialog" max-width="75vw" v-if="dialog">
        <v-card>
          <ConsumerUnits :dialog.sync="dialog"></ConsumerUnits>
        </v-card>
      </v-dialog>
      <div class="my-10 d-flex justify-center">
        <v-btn color="green lighten-2" @click="handleSave()" :disabled="saving">
          <div v-if="saving">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <div v-else>
            Salvar <i class="fa fa-check" aria-hidden="true"></i>
          </div>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Client from "../sub-components/Client.vue";
import ConsumerUnits from "../sub-components/ConsumerUnits.vue";
import Vue from "vue";
import { ClientInterface } from "@/interfaces/client-interface";

export default Vue.extend({
  components: {
    Client,
    ConsumerUnits,
  },
  data: () => ({
    dialog: false,
    parentData: null,
    saving: false as boolean,
  }),
  methods: {
    handleSave() {
      console.log("save - ", this.parentData, this.$store.state.user);
      const dataToSave = this.beforeSave();
      this.saving = true;

      this.$http
        .post("/clients", dataToSave)
        .then((resp) => {
          console.log(resp);
          this.$swal({
            title: "Cliente cadastrado com sucesso",
            icon: "success",
          }).then((resp) => {
            if (resp.isConfirmed) {
              this.$router.push({ name: "ListClient" });
            }
          });
        })
        .catch((err) => {
          this.$swal({
            title: err.response.data.message,
            icon: "error",
          });
        })
        .finally(() => (this.saving = false));
    },
    beforeSave() {
      const dataCopy = JSON.parse(
        JSON.stringify(this.parentData)
      ) as ClientInterface;
      if (dataCopy.fullPhone) {
        const phone = dataCopy.fullPhone
          .replace(/[()]/g, "")
          .trim()
          .split(" ");
        dataCopy.phone = {
          areaCode: phone[0],
          phoneNumber: phone[1],
        };
      }
      delete dataCopy.id;
      delete dataCopy.fullPhone;
      return dataCopy;
    },
  },
});
</script>

<style></style>
