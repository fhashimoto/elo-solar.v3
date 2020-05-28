<template>
  <v-container grid-list-md>
    <v-card raised>
      <v-container grid-list-md>
        <v-alert type="error" dismissible v-if="loginError">Usuário ou senha incorreta</v-alert>
        <p class="title">Login</p>
        <v-form v-model="valid" @submit.prevent="tryLogin">
          <v-text-field
            name="user"
            label="Usuário"
            autofocus
            required
            v-model="user"
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
          <v-btn rounded color="primary" :disabled="!valid" type="submit" v-if="!loading">Entrar</v-btn>
        </v-form>
        <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      user: "",
      password: "",
      loading: false,
      loginError: false,
      valid: false,
      showPassword: false
    };
  },

  methods: {
    tryLogin() {
      const raw = JSON.stringify({ login: this.user, password: this.password }),
        myHeaders = new Headers(),
        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw
        };

      myHeaders.append("Content-Type", "application/json");
      const proxyUrl = "https://cors-anywhere.herokuapp.com/",
        targetUrl = "https://elosolar.herokuapp.com/v1/login";

      fetch(proxyUrl + targetUrl, requestOptions)
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(data => {
                this.$store.state.token = "Bearer " + data.token;
                this.$store.state.userLogged = true;
              })
              .then(() => this.getRole());
          } else {
            console.log("Error ", response);
            this.loading = false;
            this.loginError = true;
          }
        }) //Salvando o token
        .catch(error => {
          console.log("error", error);
          this.loading = false;
          this.loginError = true;
        });

      this.loading = true;
    },
    getRole() {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/",
        targetUrl = "https://elosolar.herokuapp.com/v1/users/" + this.user,
        myHeaders = new Headers();
      myHeaders.append("Authorization", this.$store.state.token);
      const requestOptions = {
        method: "GET",
        headers: myHeaders
      };

      fetch(proxyUrl + targetUrl, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.loading = false;
              this.loginError = false;
              this.$store.state.userName = data.name;
              this.$store.state.userRole = data.roles[0].toLowerCase();
              switch (data.roles[0]) {
                case "SELLER":
                  this.$router.push("/seller");
                  break;
                case "ENGINEER":
                  this.$router.push("/engineer");
                  break;
                default:
                  break;
              }
            });
          } else {
            console.log("Error -> ", response);
          }
        })
        .catch(err => {
          console.log("Error users -> ", err);
        });
    }
  }
});
</script>

<style>
</style>