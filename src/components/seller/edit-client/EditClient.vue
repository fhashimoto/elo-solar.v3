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
      :clientId.sync="clientData"
      :unitData.sync="unitData"
      :dialog.sync="dialog"
    ></SellerListUnit>
    <v-dialog v-model="dialog" max-width="90vw">
      <v-card>
        <ConsumerUnits
          :unitData.sync="unitData"
          :clientId="clientData.id"
          :dialog.sync="dialog"
        ></ConsumerUnits>
      </v-card>
    </v-dialog>
    <div class="my-10 d-flex justify-center">
      <v-btn color="green lighten-2" @click="handleSave()" :disabled="saving">
        <div v-if="saving">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div v-else>Salvar <i class="fa fa-check" aria-hidden="true"></i></div>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Client from "../sub-components/Client.vue";
import ConsumerUnits from "../sub-components/ConsumerUnits.vue";
import SellerListUnit from "../seller-list-unit/SellerListUnit.vue";
import { ClientInterface } from "@/interfaces/client-interface";

export default Vue.extend({
  components: {
    Client,
    ConsumerUnits,
    SellerListUnit,
  },
  data: () => ({
    dialog: false,
    clientData: {} as ClientInterface,
    loading: false,
    unitData: null,
    saving: false as boolean,
  }),
  beforeMount() {
    this.$store.state.loading = true;
    this.$http
      .get(`/clients/${this.$route.params.id}`)
      .then((result) => (this.clientData = result.data))
      .catch((error) => console.log("error", error))
      .finally(() => {
        console.log("beforeMount -> ", this.clientData);
        this.loading = false;
        this.$store.state.loading = false;
      });
  },
  watch: {
    unitData(val) {
      console.log(val);
    },
  },
  methods: {
    handleSave() {
      console.log(this.clientData);
      this.saving = true;
      const body = this.beforeSave();

      this.$http
        .put(`/clients/${this.$route.params.id}`, body)
        .then((resp) => {
          console.log(resp);
          this.$swal({
            title: "Cliente atualizado com sucesso",
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
      const data = JSON.parse(
        JSON.stringify(this.clientData)
      ) as ClientInterface;
      if (data.phone && data.fullPhone) {
        const phone = data.fullPhone
          .replace(/[()]/g, "")
          .trim()
          .split(" ");
        data.phone = {
          areaCode: phone[0],
          phoneNumber: phone[1],
        };
      }
      delete data.fullPhone;
      delete data.id;
      return data;
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
