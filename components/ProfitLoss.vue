<template>
  <div class="card m-2">
    <header class="card-header">
      <p class="card-header-title">Profit Loss</p>
    </header>
    <div class="container is-fluid">
      <p class="title">Statement</p>
      <b-table
        :data="Transactions"
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
        <b-table-column field="methodId" label="Type" width="40" v-slot="props">
          {{ getTransactionType(props.row.methodId) }}
        </b-table-column>
        <b-table-column field="value" label="Value" width="40" v-slot="props">
          {{ getEtherFromWei(props.row.value) }}
        </b-table-column>
        <b-table-column
          field="in_out"
          label="INCOME/EXPENSE"
          width="3"
          v-slot="props"
        >
          {{ props.row.in_out }}
        </b-table-column>
        <b-table-column
          field="txn_fee"
          label="TXN FEE"
          width="10"
          v-slot="props"
        >
          {{ getEtherFromWei(props.row.txn_fee) }}
        </b-table-column>
        <b-table-column
          field="historicEthPrice"
          label="Value (Time of Transaction)"
          width="10"
          v-slot="props"
        >
          ${{ props.row.historicEthPrice * getEtherFromWei(props.row.value) }}
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import { getTransactionTypeFromHex } from "~/utils/cryptoUtils";
export default {
  name: "ProfitLoss",
  props: {
    Transactions: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getTransactionType(hex) {
      return getTransactionTypeFromHex(hex);
    },
    getEtherFromWei(value) {
      return Web3.utils.fromWei(Web3.utils.toBN(value));
    },
  },
};
</script>