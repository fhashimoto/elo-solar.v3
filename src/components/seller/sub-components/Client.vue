<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="name" :rules="nameRules" label="Nome" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="phone"
            label="Telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            masked="true"
          ></v-text-field>
        </v-col>
        {{phone.replace(`(`,``).replace(` `,``).split(`)`)}}
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: "",
    nameRules: [v => !!v || "Nome é obrigatório"],
    email: "",
    emailRules: [v => /.+@.+/.test(v) || "E-mail deve ser válido"],
    phone: ""
  }),
};
</script>