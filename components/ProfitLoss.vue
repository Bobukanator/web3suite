<template>
  <div class="card m-2" v-if="isMounted">
    <header class="card-header">
      <p class="card-header-title">Profit Loss</p>
    </header>
    <div class="container is-fluid">
      <p class="title">Income</p>
      <b-table
        :data="IncomeTransactions"
        :bordered="true"
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
          <span class="tag is-success">
            {{ new Date(props.row.timeStamp * 1000).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column field="value" label="Value" width="40" v-slot="props">
          {{ getEtherFromWei(props.row.value) }} ETH
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
    <div class="container is-fluid">
      <p class="title">Expenses</p>
      <b-table
        :data="ExpenseTransactions"
        :bordered="true"
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
          <span class="tag is-success">
            {{ new Date(props.row.timeStamp * 1000).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column field="value" label="Value" width="40" v-slot="props">
          {{ getEtherFromWei(props.row.value) }} ETH
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
    <div class="container is-fluid">
      <p class="title">Totals</p>
      <B>Total Income</B>${{ calculateTotalIncome() }}
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import { getTransactionTypeFromHex } from "~/utils/cryptoUtils";
import {
  getIncomeTransactions,
  getExpenseTransactions,
  calculateIncomeTotal,
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
    };
  },
  computed: {
    IncomeTransactions: function () {
      return getIncomeTransactions(this.Transactions);
    },
    ExpenseTransactions: function () {
      return getExpenseTransactions(this.Transactions);
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
    calculateTotalIncome() {
      return calculateIncomeTotal(this.IncomeTransactions);
    },
  },
};
</script>