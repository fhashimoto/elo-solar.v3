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
          <v-text-field type="number" v-model="year" label="Ano"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="allMonth"
            item-text="name"
            item-value="month"
            label="Mês"
            v-model="selectMonth"
          ></v-select>
          <!-- <v-text-field label="Mês"></v-text-field> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field label="Consumo de Energia" suffix="KWh"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="energyPrice"
            label="Preço de Energia"
            v-money="this.money"
            suffix="R$"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="totalDue" label="Total da Fatura" v-money="this.money" suffix="R$"></v-text-field>
        </v-col>
      </v-row>
      <h3>Histórico de Faturas - Consumo</h3>
      <v-row>
        <v-col cols="12" md="3" v-for="month in monthArray" :key="month.value">
          <v-text-field :label="month.name+'/'+month.year" suffix="KWh" v-model="month.consumption"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { VMoney } from "v-money";

export default {
  data: () => ({
    valid: false,
    zipCode: "",
    city: "",
    state: "",
    streetAddress: "",
    monthArray: [],
    year: new Date().getFullYear(),
    allMonth: [],
    selectMonth: new Date().getMonth(),
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "",
      suffix: "",
      precision: 2,
      masked: false,
    },
    energyPrice: null,
    totalDue: null,
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
    year(val) {
      this.monthArray = this.setMonthArray(this.selectMonth, val);
    },
    selectMonth(val) {
      this.monthArray = this.setMonthArray(val, this.year);
    },
  },
  mounted() {
    const actualMonth = new Date().getMonth();
    const actualYear = new Date().getFullYear();
    this.monthArray = this.setMonthArray(actualMonth, actualYear);
    this.allMonth = this.getAllMonth();
  },
  methods: {
    setMonthArray(mothValue, yearValue) {
      const resp = [];
      for (let index = 0; index > -12; index--) {
        const date = new Date();
        date.setFullYear(yearValue);
        date.setMonth(mothValue + index);
        const name = date.toLocaleDateString("pt-BR", { month: "long" });

        resp.push({
          year: date.getFullYear(),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          month: date.getMonth(),
          consumption: null,
        });
      }
      return resp;
    },
    getAllMonth() {
      const resp = [];
      for (let index = 0; index < 12; index++) {
        const date = new Date();
        date.setDate(1);
        date.setMonth(index);
        const name = date.toLocaleDateString("pt-BR", { month: "long" });

        resp.push({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          month: date.getMonth(),
        });
      }
      return resp;
    },
  },
  directives: {
    money: VMoney,
  },
  props: ["unitData"],
};
</script>