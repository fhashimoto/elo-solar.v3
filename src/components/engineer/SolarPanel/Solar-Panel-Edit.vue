<template>
  <SolarPanelForm :solarPanelProp.sync="solarPanelData"></SolarPanelForm>
</template>

<script lang="ts">
import { SolarPanelInterface } from '@/interfaces/engineer-interface';
import Vue from 'vue'
import SolarPanelForm from './Solar-Panel-Form.vue'

export default Vue.extend({
  components: { SolarPanelForm },
  mounted() {
    console.log("Edit -> ", this.$route.params);
    this.$store.state.loading = true;
    this.$http
      .get(`/solar-panels/${this.$route.params.id}`)
      .then((resp) => {
        this.solarPanelData = resp.data;
      })
      .finally(() => (this.$store.state.loading = false));
  },
  data: () => ({
    solarPanelData: {} as SolarPanelInterface,
  }),
})
</script>

<style lang="scss">

</style>