<template>
  <div>
    <div class="card m-2" v-if="transactionsExist">
      <header class="card-header">
        <p class="card-header-title">Transaction History</p>
      </header>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="images/etherscan-logo-circle.png"
                alt="Etherscan Logo"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title">
              <a href="https://etherscan.io/">Etherscan.io APIs</a>
            </p>
          </div>
        </div>
        <div>
          <p class="title">Transactions</p>
          <b-table
            :data="parsedEtherTransactions"
            :bordered="true"
            :striped="true"
            npm
            :narrowed="true"
            :hoverable="true"
            :focusable="true"
            :mobile-cards="true"
          >
            <b-table-column
              field="blockNumber"
              label="Block Number"
              width="40"
              numeric
              v-slot="props"
            >
              {{ props.row.blockNumber }}
            </b-table-column>
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
            <b-table-column
              field="methodId"
              label="Type"
              width="40"
              v-slot="props"
            >
              {{ getTransactionType(props.row.methodId) }}
            </b-table-column>
            <b-table-column
              field="value"
              label="Value"
              width="40"
              v-slot="props"
            >
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
          </b-table>
        </div>
        <div v-if="!transactionsExist">
          <p class="title">No transactions found</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import {
  getTransactionTypeFromHex,
  parseTransactions,
} from "~/utils/cryptoUtils";
export default {
  name: "EtherTransactions",
  data() {
    return {
      etherTransactions: {},
      transactionsExist: false,
      etherBalance: 0,
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    parsedEtherTransactions: function () {
      if (this.transactionsExist)
        return parseTransactions(
          this.etherTransactions.result,
          this.SelectedAddress
        );
      return {};
    },
  },
  mounted() {
    this.getEtherTransactions();
    this.getEtherBalance();
  },
  methods: {
    getTransactionType(hex) {
      return getTransactionTypeFromHex(hex);
    },
    async getEtherTransactions() {
      this.etherTransactions = await this.$dataApi.getEtherTransactions(
        this.SelectedAddress
      );
      if (this.etherTransactions.status == "1") this.transactionsExist = true;
    },
    async getEtherBalance() {
      const response = await this.$dataApi.getEtherBalance(
        this.SelectedAddress
      );
      this.etherBalance = response.result;
    },
    getEtherFromWei(value) {
      return Web3.utils.fromWei(value);
    },
  },
};
</script>