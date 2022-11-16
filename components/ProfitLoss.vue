<template>
  <div class="card m-2" v-if="isMounted">
    <header class="card-header">
      <p class="card-header-title">Web3 Suite Profit Loss Statement</p>
    </header>
    <div class="content has-text-right">
      <B>Address:</B> {{ SelectedAddress }}
    </div>
    <div class="content has-text-right">
      {{ new Date(StatementDateRange.start * 1000).toLocaleDateString() }} to
      {{ new Date(StatementDateRange.end * 1000).toLocaleDateString() }}
    </div>
    <div class="section">
      <h2 class="subtitle">Investment Transactions</h2>
      <b-table
        :data="IncomeTransactionsWTotal"
        :bordered="false"
        :striped="true"
        npm
        :narrowed="true"
        :hoverable="true"
        :focusable="true"
        :mobile-cards="true"
      >
        <b-table-column
          field="timeStamp"
          label="Date"
          width="10"
          v-slot="props"
        >
          <div v-if="props.row.timeStamp != 'Total'">
            {{ new Date(props.row.timeStamp * 1000).toLocaleDateString() }}
          </div>
          <div v-if="props.row.timeStamp == 'Total'">
            <B>{{ props.row.timeStamp }}</B>
          </div>
        </b-table-column>
        <b-table-column field="value" label="Value" width="100" v-slot="props">
          <div v-if="props.row.timeStamp != 'Total'">
            {{ getEtherFromWei(props.row.value) }} ETH
          </div>
        </b-table-column>
        <b-table-column
          field="txn_feeUSD"
          label="TXN FEE"
          width="10"
          v-slot="props"
        >
          ${{ props.row.txn_feeUSD }}
        </b-table-column>
        <b-table-column
          field="valueUSD"
          label="Market Value (Time of Transaction)"
          width="10"
          v-slot="props"
        >
          ${{ props.row.valueUSD }}
        </b-table-column>
      </b-table>
    </div>
    <div class="section">
      <h2 class="subtitle">Expenses Transactions</h2>
      <b-table
        :data="ExpenseTransactionsWTotal"
        :bordered="false"
        :striped="true"
        npm
        :narrowed="true"
        :hoverable="true"
        :focusable="true"
        :mobile-cards="true"
      >
        <b-table-column
          field="timeStamp"
          label="Date"
          width="10"
          v-slot="props"
        >
          <div v-if="props.row.timeStamp != 'Total'">
            {{ new Date(props.row.timeStamp * 1000).toLocaleDateString() }}
          </div>
          <div v-if="props.row.timeStamp == 'Total'">
            <B>{{ props.row.timeStamp }}</B>
          </div>
        </b-table-column>
        <b-table-column field="value" label="Value" width="100" v-slot="props">
          <div v-if="props.row.timeStamp != 'Total'">
            {{ getEtherFromWei(props.row.value) }} ETH
          </div>
        </b-table-column>
        <b-table-column
          field="txn_feeUSD"
          label="TXN FEE"
          width="10"
          v-slot="props"
        >
          ${{ props.row.txn_feeUSD }}
        </b-table-column>
        <b-table-column
          field="valueUSD"
          label="Market Value (Time of Transaction)"
          width="10"
          v-slot="props"
        >
          ${{ props.row.valueUSD }}
        </b-table-column>
      </b-table>
    </div>
    <div class="section">
      <h2 class="subtitle">Account Summary</h2>
      <div class="columns">
        <div class="column">
          <b-field label="Opening Balance">
            <b-input v-model="openingBalance" icon="currency-usd"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Closing Balance">
            <b-input v-model="closingBalance" icon="currency-usd"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Fiat Invested">
            <b-input v-model="fiatInvested" icon="currency-usd"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Sold Fiat">
            <b-input v-model="fiatSold" icon="currency-usd"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field label="Realized Profit">
            <b-input v-model="realizedProfit" icon="currency-usd"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Potential Profit">
            <b-input v-model="unrealizedProfit" icon="currency-usd"></b-input>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import { getTransactionTypeFromHex } from "~/utils/cryptoUtils";
import {
  getIncomeTransactions,
  getExpenseTransactions,
  calculateTotal,
  calculateFeeTotal,
  addTotalToTransactions,
  getTransactionDateRange,
} from "~/utils/plUtils";
export default {
  name: "ProfitLoss",
  props: {
    Transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMounted: false,
      openingBalance: 0,
      closingBalance: 0,
      fiatInvested: 0,
      fiatSold: 0,
      realizedProfit: 0,
      unrealizedProfit: 0,
    };
  },
  computed: {
    IncomeTransactions: function () {
      return getIncomeTransactions(this.Transactions);
    },
    IncomeTransactionsWTotal: function () {
      return addTotalToTransactions(getIncomeTransactions(this.Transactions));
    },
    ExpenseTransactions: function () {
      return getExpenseTransactions(this.Transactions);
    },
    ExpenseTransactionsWTotal: function () {
      return addTotalToTransactions(getExpenseTransactions(this.Transactions));
    },
    StatementDateRange: function () {
      return getTransactionDateRange(this.Transactions);
    },
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    EtherBalance: function () {
      if (!this.$store.state.EtherBalance) return 0;
      else
        return Web3.utils.fromWei(
          Web3.utils.toBN(this.$store.state.EtherBalance)
        );
    },
    TokenBalance: function () {
      if (!this.$store.state.TokenBalance) return 0;
      else
        return Web3.utils.fromWei(
          Web3.utils.toBN(this.$store.state.TokenBalance)
        );
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    getTransactionType(hex) {
      return getTransactionTypeFromHex(hex);
    },
    getEtherFromWei(value) {
      return Web3.utils.fromWei(Web3.utils.toBN(value));
    },
    toTwoDecimalPoints(value) {
      return value.toFixed(2);
    },
    calculateTotalValue(transactions) {
      return calculateTotal(transactions);
    },
    calculateFees(transactions) {
      return calculateFeeTotal(transactions);
    },
  },
};
</script>