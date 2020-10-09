<template>
  <div>
    <div class="d-flex justify-end">
    <v-btn @click="goToList()">Voltar para lista</v-btn>
    </div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="clientProp.name"
              :rules="nameRules"
              label="Nome"
              required
              @keyup="updateClient()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="clientProp.email"
              :rules="emailRules"
              label="E-mail"
              @keyup="updateClient()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="clientProp.fullPhone"
              label="Telefone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              masked="true"
              @keyup="updateClient()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { ClientInterface } from '@/interfaces/client-interface';
import Vue from "vue";
import { mask } from "vue-the-mask";

export default Vue.extend({
  data: () => ({
    valid: false,
    nameRules: [(v: string) => !!v || "Nome é obrigatório"],
    emailRules: [(v: string) => /.+@.+/.test(v) || "E-mail deve ser válido"],
    // clientForm: {
    //   name: "",
    //   email: "",
    //   phone: "",
    //   id: "",
    //   tags: [],
    //   fullPhone: ""
    // } as ClientInterface,
  }),
  props: ["clientData"],
  methods: {
    updateClient() {
      console.log(this.clientProp)
      this.$emit("update:clientData", this.clientProp);
    },
    goToList() {
      this.$router.push({name: 'ListClient'})
    },    
  },
  directives: { mask },
  computed: {
    clientProp(): ClientInterface {
      let data = this.clientData as ClientInterface
      if (!data) {
        data = {
          name: "",
          email: "",
          phone: {
            areaCode: "",
            phoneNumber: ""
          },
          tags: [],
          fullPhone: ""
        }
      }
      if (data && data.phone) {
        data.fullPhone = `(${data.phone.areaCode}) ${data.phone.phoneNumber}`      
      }
      return data
    }
  }
});
</script>
