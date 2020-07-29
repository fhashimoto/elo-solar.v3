<template>
  <v-form v-model="valid">
    <v-container>
      <h2>Endereço</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="zipCode" label="CEP" v-mask="'#####-###'" masked="false"></v-text-field>
        </v-col>
        <v-col cols="9" md="4">
          <v-text-field v-model="city" label="Cidade"></v-text-field>
        </v-col>
        <v-col cols="3" md="4">
          <v-text-field v-model="state" label="Estado"></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="streetAddress" label="Rua/Avenida"></v-text-field>
        </v-col>
      </v-row>
      <h2>Contas de Energia</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field label="Unidade Consumidora"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Código Unitário"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Tipo de Conexão"></v-text-field>
        </v-col>
      </v-row>
      <h3>Última Fatura</h3>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field label="Ano"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Mês"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field  label="Consumo de Energia"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field  label="Preço de Energia"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field  label="Total da Fatura"></v-text-field>
        </v-col>
      </v-row>
      <h3>Histórico de faturas</h3>
      <v-row>
        <v-col cols="12" md="3" v-for="month in months" :key="month.value">
          <v-text-field :label="month.name+'/'+month.year"></v-text-field>
        </v-col>
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
    streetAddress: "",
    months: [],
    year: new Date().getFullYear(),
  }),
  watch: {
    zipCode(val) {
      if (val.length == 9) {
        try {
          fetch(`https://viacep.com.br/ws/${val.replace("-", "")}/json/`)
            .then((resp) => resp.json())
            .then((data) => {
              if (!data.erro) {
                this.city = data.localidade;
                this.state = data.uf;
                this.streetAddress = data.logradouro + `, `;
              } else {
                console.log(`deu erro`);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  beforeMount() {
    const actualMonth = new Date().getMonth();
    const actualYear = new Date().getFullYear();
    this.setMonthArray(actualMonth, actualYear);
  },
  methods: {
    setMonthArray(mothValue, yearValue) {
      for (let index = 0; index > -12; index--) {
        const date = new Date();
        date.setFullYear(yearValue);
        date.setMonth(mothValue + index);
        const name = date.toLocaleDateString("pt-BR", { month: "long" });

        this.months.push({
          year: date.getFullYear(),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          month: date.getMonth(),
          consumption: 0,
        });
      }
    },
  },
};
</script>