<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="userDataPropComputed.name"
        label="Nome"
        :rules="[(v) => !!v || 'Campo obrigatório']"
        required
      ></v-text-field>
      <v-select
        v-model="userDataPropComputed.roleToShow"
        :items="roles"
        label="Funções"
        required
      ></v-select>
      <v-text-field
        v-model="userDataPropComputed.password"
        label="Senha"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
      ></v-text-field>
      <v-text-field
        v-model="userDataPropComputed.username"
        label="Username"
        required
        :rules="[(v) => !!v || 'Campo obrigatório']"
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
    {{userDataPropComputed}}
  </v-container>
</template>

<script lang="ts">
import { User } from "@/interfaces/user-interface";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    valid: false as boolean,
    userData: { name: "", roles: [], username: "", password: "" } as User,
    roles: ["SELLER", "ENGINNER", "ADMINISTRATOR"],
    saving: false as boolean,
  }),
  methods: {
    handleSave() {
      this.saving = true;
      const data = JSON.parse(JSON.stringify(this.userDataPropComputed))
      if (data.roleToShow) {
        data.roles = [data.roleToShow]
        delete data.roleToShow
      }
      console.log("save -> ", data);
      if (!data.id) {
        this.$http
          .post("/users", data)
          .then((resp) => {
            console.log(resp);
            this.$swal({
              title: "Usuário cadastrado com sucesso",
              icon: "success",
            }).then((resp) => {
              if (resp.isConfirmed) {
                this.$router.push({ name: "ListUser" });
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
      } else {
        this.$http
          .put(`/users/${data.id}`, data)
          .then((resp) => {
            console.log(resp);
            this.$swal({
              title: "Usuário cadastrado com sucesso",
              icon: "success",
            }).then((resp) => {
              if (resp.isConfirmed) {
                this.$router.push({ name: "ListUser" });
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
      }
    },
  },
  props: ["userDataProp"],
  computed: {
    userDataPropComputed(): User {
      if (this.userDataProp) {        
        return this.userDataProp;
      } else {
        return { name: "", roles: [], username: "", password: "" };
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
