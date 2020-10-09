<template>
  <UserForm :userDataProp.sync="userData"></UserForm>
</template>

<script lang="ts">
import { User } from "@/interfaces/user-interface";
import Vue from "vue";
import UserForm from "./User-Form.vue";

export default Vue.extend({
  mounted() {
    console.log("Edit -> ", this.$route.params);
    this.$store.state.loading = true;
    this.$http
      .get(`/users/${this.$route.params.id}`)
      .then((resp) => {
        this.userData = resp.data;
        if (this.userData.roles) {
          this.userData.roleToShow = this.userData.roles[0];
        }
      })
      .finally(() => (this.$store.state.loading = false));
  },
  data: () => ({
    userData: {} as User,
  }),
  components: { UserForm },
});
</script>

<style lang="scss" scoped></style>
