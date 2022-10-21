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
        <div class="container is-fluid">
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
            <b-table-column
              field="historicEthPrice"
              label="Historic Price"
              width="10"
              v-slot="props"
            >
              ${{ props.row.historicEthPrice }}
            </b-table-column>
          </b-table>
        </div>
        <div class="container is-fluid">
          <br />
          <p>
            <b>Current Ether Balance:</b> {{ getEtherFromWei(etherBalance) }}
          </p>
          <p>
            <b>Current Token Balance:</b> {{ getEtherFromWei(tokenBalance) }}
          </p>
          <p>
            <b>Total Balance (ETH/USD):</b> {{ TotalFunds }} / ${{
              TotalFundsUSD
            }}
          </p>
          <p><b>Current ETH Price (1 ETH):</b> ${{ currentEthPriceUSD }}</p>
        </div>
        <div class="container is-fluid">
          <button
            class="button"
            @click="
              if (showProfitLoss) showProfitLoss = false;
              else showProfitLoss = true;
            "
          >
            Show Profit Loss Statement
          </button>
        </div>
        <div v-if="!transactionsExist">
          <p class="title">No transactions found</p>
        </div>
      </div>
    </div>
    <ProfitLoss
      v-show="showProfitLoss"
      :Transactions="parsedEtherTransactions"
    ></ProfitLoss>
  </div>
</template>
<script>
import Web3 from "web3";
import {
  getTransactionTypeFromHex,
  parseTransactions,
  addHistoricEthPriceToTransaction,
} from "~/utils/cryptoUtils";
import ProfitLoss from "~/components/ProfitLoss.vue";
export default {
  name: "EtherTransactions",
  components: { ProfitLoss },
  data() {
    return {
      etherTransactions: {},
      transactionsExist: false,
      priceExists: false,
      etherBalance: 0,
      tokenBalance: 0,
      currentEthPriceUSD: 0,
      showProfitLoss: false,
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    parsedEtherTransactions: function () {
      if (this.transactionsExist) {
        return parseTransactions(
          this.etherTransactions.result,
          this.SelectedAddress
        );
      }
      return {};
    },
    TotalFunds: function () {
      return Web3.utils.fromWei(
        Web3.utils.toBN(
          Web3.utils
            .toBN(this.etherBalance)
            .add(Web3.utils.toBN(this.tokenBalance))
        )
      );
    },
    TotalFundsUSD: function () {
      return this.TotalFunds * this.currentEthPriceUSD;
    },
  },
  mounted() {
    this.getEtherTransactions();
    this.getEtherBalance();
    this.getEthPrice();
  },
  methods: {
    getTransactionType(hex) {
      return getTransactionTypeFromHex(hex);
    },
    async getEtherTransactions() {
      let transactions = await this.$dataApi.getEtherTransactions(
        this.SelectedAddress
      );
      if (transactions.status == "1") {
        this.etherTransactions.result = await Promise.all(
          transactions.result.map((transaction) =>
            this.addHistoricEtherPrice(
              transaction,
              new Date(transaction.timeStamp * 1000).toLocaleDateString()
            )
          )
        );
        this.transactionsExist = true;
      }
      this.getTokenBalance();
    },
    async getEtherBalance() {
      if (!this.$store.state.EtherBalance) {
        const response = await this.$dataApi.getEtherBalance(
          this.SelectedAddress
        );
        this.etherBalance = response.result;
        this.$store.commit("set_ether_balance", this.etherBalance);
      } else this.etherBalance = this.$store.state.EtherBalance;
    },
    async addHistoricEtherPrice(transaction, date) {
      const price = await this.$dataApi.getHistoricEtherBalance(date);
      return addHistoricEthPriceToTransaction(transaction, price);
    },
    async getTokenBalance() {
      if (this.transactionsExist && !this.$store.state.TokenBalance) {
        this.etherTransactions.result.forEach(async (transaction) => {
          if (this.getTransactionType(transaction.methodId) == "Deposit") {
            //IF DEPOSIT -> money put into token
            const responseValue = await this.$dataApi.getTokenBalance(
              this.SelectedAddress,
              transaction.to
            );
            this.tokenBalance += Web3.utils.toBN(responseValue.result);
            this.$store.commit("set_token_balance", this.tokenBalance);
          }
        });
      } else this.tokenBalance = this.$store.state.TokenBalance;
    },
    async getEthPrice() {
      const response = await this.$dataApi.getCurrentEthPrice();
      this.currentEthPriceUSD = response.result.ethusd;
    },
    getEtherFromWei(value) {
      return Web3.utils.fromWei(Web3.utils.toBN(value));
    },
  },
};
</script>