<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="clientForm.name"
            :rules="nameRules"
            label="Nome"
            required
            @keyup="updateClient()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="clientForm.email"
            :rules="emailRules"
            label="E-mail"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="clientForm.phone"
            label="Telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            masked="true"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";

export default Vue.extend({
  data: () => ({
    valid: false,
    nameRules: [(v: string) => !!v || "Nome é obrigatório"],
    emailRules: [(v: string) => /.+@.+/.test(v) || "E-mail deve ser válido"],
    clientForm: {
      name: "",
      email: "",
      phone: "",
      id: "",
      tags: [],
    },
  }),
  props: ["clientData"],
  mounted() {
    this.writeData();
  },
  watch: {
    clientData() {
      this.writeData();
    },
  },
  methods: {
    writeData() {
      if (this.$props.clientData && this.$props.clientData.id) {
        this.clientForm.name = this.$props.clientData.name;
        this.clientForm.id = this.$props.clientData.id;
        this.clientForm.phone =
          this.$props.clientData.phone.areaCode +
          this.$props.clientData.phone.phoneNumber;
        this.clientForm.tags = this.$props.clientData.tags;
        this.clientForm.email = this.$props.clientData.email;
      }
    },
    updateClient() {
      this.$emit("update:clientData", this.clientForm);
    },
  },
  directives: { mask },
});
</script>
