<template>
  <InversorForm :inversorProp.sync="inversorData"></InversorForm>
</template>

<script lang="ts">
import { InversorInterface } from '@/interfaces/engineer-interface';
import Vue from 'vue'
import InversorForm from './Inversor-Form.vue'

export default Vue.extend({
  components: { InversorForm },
  mounted() {
    console.log("Edit -> ", this.$route.params);
    this.$store.state.loading = true;
    this.$http
      .get(`/inverters/${this.$route.params.id}`)
      .then((resp) => {
        this.inversorData = resp.data;
      })
      .finally(() => (this.$store.state.loading = false));
  },
  data: () => ({
    inversorData: {} as InversorInterface,
  }),
})
</script>

<style lang="scss">

</style>