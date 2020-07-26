<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <h2>Endereço</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="zipCode" label="CEP" v-mask="'#####-###'" masked="false"></v-text-field>
          </v-col>
          <v-col cols="9" md="4">
            <v-text-field v-model="city" label="Cidade"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="state" label="Estado"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="streetAddress" label="Rua/Avenida"></v-text-field>
          </v-col>
        </v-row>
      </v-row>
      <v-row>
        <h2>Contas de Energia</h2>
        <v-col cols="12" md="4"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    zipCode: "",
    city: "",
    state: "",
    streetAddress: ""
  }),
  watch: {
    zipCode(val) {
      if (val.length == 9) {
        try {
          fetch(`https://viacep.com.br/ws/${val.replace("-", "")}/json/`)
            .then(resp => resp.json())
            .then(data => {
              if (!data.erro) {
                this.city = data.localidade;
                this.state = data.uf;
                this.streetAddress = data.logradouro+`, `;
              } else {
                console.log(`deu erro`);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>