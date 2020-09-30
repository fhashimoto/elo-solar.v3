<template>
  <v-form v-model="valid">
    <v-container>
      <h2>Endereço</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="unit.address.zipCode"
            label="CEP"
            v-mask="'#####-###'"
            masked="false"
          ></v-text-field>
        </v-col>
        <v-col cols="9" md="4">
          <v-text-field v-model="unit.address.city" label="Cidade"></v-text-field>
        </v-col>
        <v-col cols="3" md="4">
          <v-text-field v-model="unit.address.state" label="Estado"></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field v-model="unit.address.streetAddress" label="Rua/Avenida"></v-text-field>
        </v-col>
      </v-row>
      <h2>Contas de Energia</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field label="Tipo de Conexão" v-model="unit.connectionType"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Utilidade Elétrica" v-model="unit.electricUtility"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Modalidade da Tarifa" v-model="unit.tariffModality"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="Código Unitário" v-model="unit.unitNumber"></v-text-field>
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
import { ConnectionType } from "../../../enums/connection-type-enum";

export default {
  data: () => ({
    unit: {
      address: {
        city: "",
        state: "",
        streetAddress: "",
        zipCode: "",
      },
      connectionType: "",
      electricUtility: "",
      tariffModality: "",
      unitNumber: "",
    },
    valid: false,
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
  computed: {
    zipCode() {
      return this.unit.address.zipCode;
    },
    connectionType() {
      return this.unit.connectionType;
    },
  },
  watch: {
    zipCode(val) {
      if (val.length == 9) {
        try {
          fetch(`https://viacep.com.br/ws/${val.replace("-", "")}/json/`)
            .then((resp) => resp.json())
            .then((data) => {
              if (!data.erro) {
                this.unit.address.city = data.localidade;
                this.unit.address.state = data.uf;
                this.unit.address.streetAddress = data.logradouro + `, `;
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
    connectionType(val) {
      console.log('loop? - ',this.unit, ConnectionType)
      this.unit.connectionType = ConnectionType[this.unit.connectionType];
    },
    unitData(val) {
      console.log('changeUnitData')
    }
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