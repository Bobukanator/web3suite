<template>
  <section class="section" v-if="UserConnected">
    <div class="content has-text-centered" v-if="importedTransaction">
      <h1 class="title">Welcome to the Taxable Event Wizard</h1>
      <i
        >NOTE THIS FUNCTIONALITY IS PARTIALLY COMPLETE - Please enter
        transactions manually for now</i
      >
      <div class="content has-text-left">
        We found transactions spanning from
        {{ new Date(StatementDateRange.start * 1000).toLocaleDateString() }} to
        {{ new Date(StatementDateRange.end * 1000).toLocaleDateString() }}.
      </div>

      <b-steps :label-position="bottom" vertical>
        <b-step-item label="Verify Taxable Event" icon="cash">
          <div class="section">
            <div class="content has-text-centered">
              {{ getEtherFromWei(CurrentExpenseTransactions.value) }}
              ETH was transferred on
              {{
                new Date(
                  CurrentExpenseTransactions.timeStamp * 1000
                ).toLocaleDateString()
              }}. <br /><br />
              <b>Is this a taxable event?</b><br /><br />

              <b-switch v-model="taxableEventSwitch"> Yes </b-switch>
            </div>
          </div>
        </b-step-item>

        <b-step-item label="Choose date acquired" icon="calendar-range">
          <div v-if="taxableEventSwitch">
            Please select YES if this is the transaction in which you acquired
            the ether. <br />

            <div class="section">
              <b-table
                :data="IncomeTransactions"
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
                    {{
                      new Date(props.row.timeStamp * 1000).toLocaleDateString()
                    }}
                  </div>
                  <div v-if="props.row.timeStamp == 'Total'">
                    <B>{{ props.row.timeStamp }}</B>
                  </div>
                </b-table-column>
                <b-table-column
                  field="value"
                  label="Value"
                  width="100"
                  v-slot="props"
                >
                  <div v-if="props.row.timeStamp != 'Total'">
                    {{ getEtherFromWei(props.row.value) }} ETH
                  </div>
                </b-table-column>
                <b-table-column label="Acquired?" width="10" v-slot="props">
                  <b-switch v-model="props.row.taxableEventAcquired">
                    Yes
                  </b-switch>
                </b-table-column>
              </b-table>
            </div>
          </div>
          <div v-if="!taxableEventSwitch">
            <br /><br /><br /><b>No taxable events found.</b> <br />
          </div>
        </b-step-item>

        <b-step-item label="Review" icon="marker-check" disabled>
          <div v-if="!taxableEventSwitch">
            <br /><br /><br /><b
              >No taxable events found. There are no transactions to import.</b
            >
            <br />
          </div>
        </b-step-item>
      </b-steps>
    </div>
    <div class="content has-text-centered" v-if="!importedTransaction">
      <h1 class="title">Loading Transactions...</h1>
      <b-progress type="is-info"></b-progress>
    </div>
  </section>
</template>
<script>
import Web3 from "web3";
import {
  getTransactionDateRange,
  getIncomeTransactions,
  getExpenseTransactions,
} from "~/utils/plUtils";
export default {
  name: "TaxableEventWizard",
  data() {
    return {
      importedTransaction: false,
      expenseIndex: 0,
      taxableEventSwitch: false,
      taxableEventAcquired: false,
    };
  },
  computed: {
    WalletEnabled: function () {
      return this.$store.state.WalletEnabled;
    },
    UserConnected: function () {
      return this.$store.state.UserConnected;
    },
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    StatementDateRange: function () {
      if (this.importedTransaction)
        return getTransactionDateRange(this.allTransactions);
      return false;
    },
    IncomeTransactions: function () {
      let incomeTransactions = getIncomeTransactions(this.allTransactions);
      incomeTransactions.forEach((transaction) => {
        transaction.taxableEventAcquired = false;
      });
      return incomeTransactions;
    },
    ExpenseTransactions: function () {
      return getExpenseTransactions(this.allTransactions);
    },
    CurrentExpenseTransactions: function () {
      return getExpenseTransactions(this.allTransactions)[this.expenseIndex];
    },
  },
  mounted() {
    this.getParsedTransactions();
  },
  methods: {
    async getParsedTransactions() {
      const response = await this.$dataApi.getParsedEtherTransactions(
        this.$store.state.SelectedAddress
      );
      this.allTransactions = response;
      this.importedTransaction = true;
    },
    getEtherFromWei(value) {
      return Web3.utils.fromWei(Web3.utils.toBN(value));
    },
  },
};
</script>1