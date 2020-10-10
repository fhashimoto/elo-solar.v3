<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="inversorComputed.name"
        label="Nome"
        :rules="[(v) => !!v || 'Campo obrigatório']"
        required
      ></v-text-field>
      <v-text-field
        v-model="inversorComputed.brand"
        label="Marca"
        :rules="[(v) => !!v || 'Campo obrigatório']"
        required
      ></v-text-field>
      <v-select
        v-model="inversorComputed.type"
        label="Tipo"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
        :items="typeEnum"
      ></v-select>
      <v-select
        v-model="inversorComputed.category"
        label="Categoria"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
        :items="categoryEnum"
      ></v-select>
      <v-text-field
        v-model="inversorComputed.numberOfMPPTs"
        label="Número MPPTs"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
        type="number"
      ></v-text-field>
      <div class="output-wrapper">
        <div class="output-wrapper__title d-flex justify-space-between">
          <h2>Potências</h2>
          <v-btn color="primary" @click="addOutput()">Adicionar</v-btn>
        </div>
        <v-card
          v-for="(output, i) in inversorComputed.outputPower"
          :key="i"
          elevation="12"
          class="pa-5"
        >
          <v-text-field
            v-model="output.outputVoltage"
            label="Potência de saída"
            required
            :rules="[(v) => !!v || 'Campo obrigatório']"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="output.nominalPower"
            label="Potência nominal"
            required
            :rules="[(v) => !!v || 'Campo obrigatório']"
            type="number"
          ></v-text-field>
        </v-card>
      </div>
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
import { InversorInterface } from "@/interfaces/engineer-interface";
import Vue from "vue";

export default Vue.extend({
  props: ["inversorProp"],
  computed: {
    inversorComputed(): InversorInterface {
      if (this.inversorProp) {
        return this.inversorProp;
      } else {
        return {
          name: "",
          brand: "",
          type: "",
          category: "",
          numberOfMPPTs: 0,
          outputPower: [
            {
              outputVoltage: 0,
              nominalPower: 0,
            },
          ],
        };
      }
    },
  },
  data: () => ({
    valid: false as boolean,
    saving: false as boolean,
    typeEnum: ["THREE_PHASE", "SINGLE_PHASE"],
    categoryEnum: ["BASIC", "SMART", "PREMIUM"],
  }),
  methods: {
    handleSave() {
      console.log("save -> ", this.inversorComputed);
      if (!this.inversorComputed.id) {
        this.saving = true;
        this.$http
          .post("/inverters", this.inversorComputed)
          .then((resp) => {
            console.log(resp);
            this.$swal({
              title: "Inversor cadastrado com sucesso",
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
          .put(`/inverters/${this.inversorComputed.id}`, this.inversorComputed)
          .then((resp) => {
            console.log(resp);
            this.$swal({
              title: "Inversor atualizado com sucesso",
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
    addOutput() {
      this.inversorProp.outputPower.push({
        outputVoltage: 0,
        nominalPower: 0,
      });
    },
  },
});
</script>

<style lang="scss"></style>
