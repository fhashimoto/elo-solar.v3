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
          <v-text-field
            v-model="unit.address.city"
            label="Cidade"
          ></v-text-field>
        </v-col>
        <v-col cols="3" md="4">
          <v-text-field
            v-model="unit.address.state"
            label="Estado"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="unit.address.streetAddress"
            label="Rua/Avenida"
          ></v-text-field>
        </v-col>
      </v-row>
      <h2>Contas de Energia</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :items="connectionArray"
            v-model="connectionShow"
            placeholder="Tipo de Conexão"
            class="select-input"
            @change="
              unit.energyBills.connectionType = updateValue(
                connectionEnum,
                connectionShow
              )
            "
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="utilityArray"
            v-model="utilityShow"
            placeholder="Utilidade Elétrica"
            class="select-input"
            @change="
              unit.electricUtility = updateValue(electricEnum, utilityShow)
            "
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="tariffArray"
            v-model="tariffShow"
            placeholder="Modalidade da Tarifa"
            class="select-input"
            @change="
              unit.energyBills.tariffModality = updateValue(
                tariffEnum,
                tariffShow
              )
            "
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Código Unitário"
            v-model="unit.unitNumber"
          ></v-text-field>
        </v-col>
      </v-row>
      <h3>Última Fatura</h3>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            type="number"
            label="Ano"
            @keyup="
              setMonthArray(
                unit.energyBills.referenceMonth.month,
                $event.target.value
              )
            "
            v-model="unit.energyBills.referenceMonth.year"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="allMonth"
            item-text="name"
            item-value="month"
            label="Mês"
            @change="
              setMonthArray(
                unit.energyBills.referenceMonth.month,
                unit.energyBills.referenceMonth.year
              )
            "
            v-model="unit.energyBills.referenceMonth.month"
          ></v-select>
          <!-- <v-text-field label="Mês"></v-text-field> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Consumo de Energia"
            suffix="KWh"
            v-model="unit.energyBills.energyConsumption"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.lazy="unit.energyBills.energyPrice"
            label="Preço de Energia"
            v-money="money"
            suffix="R$"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.lazy="unit.energyBills.totalDue"
            label="Total da Fatura"
            v-money="money"
            suffix="R$"
          ></v-text-field>
        </v-col>
      </v-row>
      <h3>Histórico de Faturas - Consumo</h3>
      <v-row>
        <v-col cols="12" md="3" v-for="month in monthArray" :key="month.value">
          <v-text-field
            :label="month.name + '/' + month.year"
            suffix="KWh"
            v-model="month.consumption"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="my-10 d-flex justify-center">
        <v-btn color="green lighten-2" @click="handleSave()">
          Salvar <i class="fa fa-check" aria-hidden="true"></i>
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { VMoney } from "v-money";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { mask } from "vue-the-mask";
import {
  ConnectionType,
  ElectricUtility,
  TariffModality,
} from "../../../enums/address-enum";
import Vue from "vue";
import { DateValue } from "@/interfaces/date-interface";
import { MonthInterface } from "@/interfaces/month-interface";

export default Vue.extend({
  data: () => ({
    unit: {
      address: {
        city: "",
        state: "",
        streetAddress: "",
        zipCode: "",
      },
      unitNumber: "",
      electricUtility: "",
      energyBills: {
        referenceMonth: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
        },
        totalDue: 0.0,
        energyPrice: 0.0,
        connectionType: "",
        tariffModality: "",
        energyConsumption: 0,
        consumptionHistory: [] as Array<{ month: number; consumption: number }>,
      },
    },
    connectionType: "",
    tariffModality: "",
    valid: false,
    monthArray: [] as Array<{
      year: number;
      name: string;
      month: number;
      consumption: number;
    }>,
    year: new Date().getFullYear(),
    allMonth: [] as Array<{ name: string; month: number }>,
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
    connectionArray: Object.values(ConnectionType),
    connectionShow: "",
    tariffArray: Object.values(TariffModality),
    tariffShow: "",
    utilityArray: Object.values(ElectricUtility),
    utilityShow: "",
    connectionEnum: ConnectionType,
    tariffEnum: TariffModality,
    electricEnum: ElectricUtility,
  }),
  computed: {
    zipCode() {
      return this.unit.address.zipCode;
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
    // year(val) {
    //   this.monthArray = this.setMonthArray(this.selectMonth, val);
    // },
    // selectMonth(val) {
    //   this.monthArray = this.setMonthArray(val, this.year);
    // },
    // connectionShow() {
    //   this.unit.energyBills.connectionType = this.changeEnum(
    //     ConnectionType,
    //     this.connectionShow
    //   );
    // },
    // tariffShow() {
    //   this.unit.energyBills.tariffModality = this.changeEnum(
    //     TariffModality,
    //     this.tariffShow
    //   );
    // },
    // utilityShow() {
    //   this.unit.electricUtility = this.changeEnum(
    //     ElectricUtility,
    //     this.utilityShow
    //   );
    // },
  },
  methods: {
    setMonthArray(mothValue: number, yearValue: number) {
      if (yearValue.toString().length == 4) {
        const resp = [];
        for (let index = -1; index > -12; index--) {
          const date = new Date();
          date.setFullYear(yearValue);
          date.setMonth(mothValue + index);
          const name = date.toLocaleDateString("pt-BR", { month: "long" });

          resp.push({
            year: date.getFullYear(),
            name: name.charAt(0).toUpperCase() + name.slice(1),
            month: date.getMonth(),
            consumption: 0,
          });
        }
        this.monthArray = resp;
      }
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
    changeEnum(enumType: never, value: string) {
      return Object.keys(enumType).find((el) => enumType[el] == value);
    },
    updateValue(enumType: never, value?: string) {
      return Object.keys(enumType).find((el) => enumType[el] == value);
    },
    handleSave() {
      const stringToFloat = (value: string) => {
        return +value.replace(",", ".");
      };

      const unitCopy = JSON.parse(JSON.stringify(this.unit));

      unitCopy.energyBills.consumptionHistory = this.monthArray;

      unitCopy.clientId = this.$props.clientId;

      unitCopy.energyBills.totalDue = unitCopy.energyBills.totalDue
        ? stringToFloat(unitCopy.energyBills.totalDue)
        : 0;
      unitCopy.energyBills.energyPrice = unitCopy.energyBills.energyPrice
        ? stringToFloat(unitCopy.energyBills.energyPrice)
        : 0;
      unitCopy.energyBills.energyConsumption = unitCopy.energyBills
        .energyConsumption
        ? stringToFloat(unitCopy.energyBills.energyConsumption)
        : 0;

      unitCopy.energyBills.consumptionHistory.forEach(
        (el: DateValue) =>
          (el.consumption = el.consumption ? +el.consumption : 0)
      );

      const historyObj = {} as { [key: string]: number };

      unitCopy.energyBills.consumptionHistory.forEach((el: DateValue) => {
        if (
          (el.month || el.month == 0) &&
          MonthInterface[el.month] &&
          (el.consumption || el.consumption == 0)
        ) {
          historyObj[MonthInterface[el.month]] = el.consumption;
        }
      });

      unitCopy.energyBills.consumptionHistory = historyObj;

      unitCopy.energyBills.referenceMonth.month =
        MonthInterface[unitCopy.energyBills.referenceMonth.month];

      console.log("enum -> ", MonthInterface);
      console.log("unit -> ", unitCopy);

      this.$http
        .post("/consumer-units", unitCopy)
        .then((resp) => console.log(resp));
    },
  },
  mounted() {
    const setMonthArray = (mothValue: number, yearValue: number) => {
      const resp = [];
      for (let index = -1; index > -12; index--) {
        const date = new Date();
        date.setFullYear(yearValue);
        date.setMonth(mothValue + index);
        const name = date.toLocaleDateString("pt-BR", { month: "long" });

        resp.push({
          year: date.getFullYear(),
          name: name.charAt(0).toUpperCase() + name.slice(1),
          month: date.getMonth(),
          consumption: 0,
        });
      }
      return resp;
    };

    const getAllMonth = () => {
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
    };

    const actualMonth = new Date().getMonth();
    const actualYear = new Date().getFullYear();
    this.monthArray = setMonthArray(actualMonth, actualYear);
    this.allMonth = getAllMonth();
  },
  directives: {
    money: VMoney,
    mask,
  },
  props: ["unitData", "clientId"],
});
</script>

<style lang="scss">
.select-input {
  input {
    &::placeholder {
      color: rgba(0, 0, 0, 0.75) !important;
    }
  }
}
</style>
