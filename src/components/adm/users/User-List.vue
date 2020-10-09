<template>
  <v-container grid-list-md>
    <v-row align="center">
      <v-text-field
        :label="'Pesquise...'"
        prepend-inner-icon="fa-search"
        v-model="search"
      ></v-text-field>
      <v-btn color="primary" class="d-none d-md-flex ml-5"
        >Adicione um novo usuário</v-btn
      >
      <v-btn
        fixed
        bottom
        right
        class="mx-2 d-md-none"
        fab
        dark
        color="indigo"
        @click="newUser()"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-data-table
        :items="listClient"
        :headers="listHeader"
        :loading="loadingData"
        loading-text="Carregando... Por favor aguarde"
      >
        <template v-slot:[`item.roles`]="{ item }">
          <div>
            <span v-for="(role, i) in item.roles" :key="i">
              {{ role }}<span v-if="i + 1 > item.roles.length">, </span>
            </span>
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { User } from "@/interfaces/user-interface";
import Vue from "vue";
export default Vue.extend({
  mounted() {
    this.$store.state.loading = true;
    this.$http
      .get("/users")
      .then((resp) => {
        this.listClient = resp.data ? resp.data.data : [];
      })
      .finally(() => {
        this.$store.state.loading = false;
        this.loadingData = false;
      });
  },
  data() {
    return {
      search: "",
      listClient: [] as Array<User>,
      listHeader: [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        {
          text: "Função",
          value: "roles",
          sortable: false,
        },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
        },
      ],
      loadingData: true,
    };
  },
  methods: {
    editUser(item: User) {
      console.log("edit -> ", item);
      if (item.id) {
        this.$router.push({
          name: "EditUser",
          params: { id: item.id },
        });
        console.log("Edit -> ", item);
      }
    },
    deleteUser(item: User) {
      console.log("Deletar - ", item);
    },
    newUser() {
      this.$router.push({ name: "NewUser" });
    },
  },
});
</script>

<style lang="scss" scoped></style>
