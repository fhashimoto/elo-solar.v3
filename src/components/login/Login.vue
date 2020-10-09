<template>
  <v-container grid-list-md>
    <v-card raised>
      <v-container grid-list-md>
        <v-alert type="error" dismissible v-if="loginError"
          >Usuário ou senha incorreta</v-alert
        >
        <p class="title">Login</p>
        <v-form v-model="valid" @submit.prevent="tryLogin">
          <v-text-field
            name="user"
            label="Usuário"
            autofocus
            required
            v-model="user"
            :rules="[(v) => !!v || 'Informe um login']"
          ></v-text-field>
          <v-text-field
            name="password"
            label="Senha"
            required
            v-model="password"
            :rules="[(v) => !!v || 'Informe uma senha']"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn
            rounded
            color="primary"
            :disabled="!valid"
            type="submit"
            v-if="!loading"
            >Entrar</v-btn
          >
        </v-form>
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-circular>
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
      showPassword: false,
    };
  },

  methods: {
    tryLogin() {
      const raw = JSON.stringify({
        username: this.user,
        password: this.password,
      });
      this.loading = true;
      delete this.$http.defaults.headers.post["Authorization"];
      this.$http
        .post("/login", raw, {})
        .then((response) => {
          this.$store.commit("setUser", response.data);
          this.$store.commit("setLogged", true);
          this.$store.commit("timeLog", new Date());
          this.redirectType();
        })
        .catch((error) => {
          console.log("error", error);
          this.loginError = true;
        })
        .finally(() => {
          this.loading = false;
          this.$http.defaults.headers.post[
            "Authorization"
          ] = `Bearer ${this.$store.state.user.token}`;
        });
    },
    redirectType() {
      const user = this.$store.state.user;
      if (user.roles && user.roles.length) {
        switch (this.$store.state.user.roles[0]) {
          case "SELLER":
            if (this.$route.path !== "/seller") {
              this.$router.push("/seller");
            }
            break;
          case "ENGINEER":
            if (this.$route.path !== "/engineer") {
              this.$router.push("/engineer");
            }
            break;
          case "ADMINISTRATOR":
            if (this.$route.path !== "/administrator") {
              this.$router.push("/administrator");
            }
            break;
          default:
            break;
        }
      }
    },
  },

  mounted() {
    if (this.$store.state.logged) {
      this.redirectType();
    }
  },
});
</script>

<style></style>
