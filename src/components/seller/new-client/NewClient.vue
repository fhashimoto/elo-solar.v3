<template>
  <v-container>
    <Client></Client>
    <ConsumerUnits></ConsumerUnits>
  </v-container>
</template>

<script>
import Client from '../sub-components/Client'
import ConsumerUnits from '../sub-components/ConsumerUnits'

export default {
  components: {
    Client,
    ConsumerUnits,
  }
}
</script>

<style>

</style>