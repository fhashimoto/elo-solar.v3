<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="name" :rules="nameRules" label="Nome" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="phone"
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

export default Vue.extend({
  data: () => ({
    valid: false,
    name: "",
    nameRules: [(v: string) => !!v || "Nome é obrigatório"],
    email: "",
    emailRules: [(v: string) => /.+@.+/.test(v) || "E-mail deve ser válido"],
    phone: "",
    id: "",
    tags: [],
  }),
  props: ["clientData"],
  mounted() {
    console.log(this.$props.clientData);
    this.writeData();
  },
  watch: {
    clientData() {
      this.writeData();
    },
  },
  methods: {
    writeData() {
      console.log(this.$props.clientData)
      if (this.$props.clientData && this.$props.clientData.id) {
        this.name = this.$props.clientData.name;
        this.id = this.$props.clientData.id;
        this.phone =
          this.$props.clientData.phone.areaCode +
          this.$props.clientData.phone.phoneNumber;
        this.tags = this.$props.clientData.tags;
        this.email = this.$props.clientData.email;
      }
    },
  },
});
</script>