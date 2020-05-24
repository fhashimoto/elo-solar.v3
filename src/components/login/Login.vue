<template>
  <v-container grid-list-md>
    <v-card raised>
      <v-container grid-list-md>
        <p class="title">Login</p>
        <v-form v-model="valid">
          <v-text-field
            name="user"
            label="Usuário"
            autofocus
            required
            v-model="name"
            :rules="[v => !!v || 'Informe um login']"
          ></v-text-field>
          <v-text-field
            name="password"
            label="Senha"
            required
            v-model="password"
            :rules="[v => !!v || 'Informe uma senha']"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn rounded color="primary" :disabled="!valid" @click="tryLogin">Entrar</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      valid: false,
      name: "",
      password: "",
      showPassword: false
    };
  },

  methods: {
    tryLogin() {
      console.log("TESTE");
    }
  }
});
</script>

<style>
</style>