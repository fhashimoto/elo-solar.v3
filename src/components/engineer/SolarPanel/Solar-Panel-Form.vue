<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="solarPanelComputed.name"
        label="Nome"
        :rules="[(v) => !!v || 'Campo obrigatório']"
        required
      ></v-text-field>
      <v-text-field
        v-model="solarPanelComputed.brand"
        label="Marca"
        :rules="[(v) => !!v || 'Campo obrigatório']"
        required
      ></v-text-field>
      <v-select
        v-if="solarPanelComputed.id"
        v-model="solarPanelComputed.status"
        label="Status"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
        :items="statusEnum"
      ></v-select>
      <v-select
        v-model="solarPanelComputed.cellType"
        label="Tipo de célula"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
        :items="cellTypeEnum"
      ></v-select>
      <v-text-field
        v-model="solarPanelComputed.nominalPower"
        label="Potência nominal"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
        type="number"
      ></v-text-field>
    </v-form>
    <div class="my-10 d-flex justify-center">
      <v-btn
        color="green lighten-2"
        @click="handleSave()"
        :disabled="saving || !valid"
      >
        <div v-if="saving">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div v-else>Salvar <i class="fa fa-check" aria-hidden="true"></i></div>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { SolarPanelInterface } from "@/interfaces/engineer-interface";
import Vue from "vue";

export default Vue.extend({
  props: ["solarPanelProp"],
  computed: {
    solarPanelComputed(): SolarPanelInterface {
      if (this.solarPanelProp) {
        return this.solarPanelProp;
      } else {
        return {
          name: "",
          brand: "",
          cellType: "",
          nominalPower: 0,
        };
      }
    },
  },
  data: () => ({
    valid: false as boolean,
    saving: false as boolean,
    cellTypeEnum: ["MONOCRYSTALLINE", "POLYCRYSTALLINE"],
    statusEnum: ["VETOED", "SANCTIONED"],
  }),
  methods: {
    handleSave() {
      console.log("save -> ", this.solarPanelComputed);
      if (!this.solarPanelComputed.id) {
        this.saving = true;
        this.$http
          .post("/solar-panels", this.solarPanelComputed)
          .then((resp) => {
            console.log(resp);
            this.$swal({
              title: "Painel solar cadastrado com sucesso",
              icon: "success",
            }).then((resp) => {
              if (resp.isConfirmed) {
                this.$router.push({ name: "SolarPanel" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
            this.$swal({
              title: err.response.data.message,
              icon: "error",
            });
          })
          .finally(() => (this.saving = false));
      } else {
        this.saving = true;
        this.$http
          .put(`/solar-panels/${this.solarPanelComputed.id}`, this.solarPanelComputed)
          .then((resp) => {
            console.log(resp);
            this.$swal({
              title: "Painel solar atualizado com sucesso",
              icon: "success",
            }).then((resp) => {
              if (resp.isConfirmed) {
                this.$router.push({ name: "SolarPanel" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
            this.$swal({
              title: err.response.data.message,
              icon: "error",
            });
          })
          .finally(() => (this.saving = false));
      }
    },
  },
});
</script>

<style lang="scss"></style>
