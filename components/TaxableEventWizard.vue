<template>
  <section class="section" v-if="UserConnected">
    <div class="content has-text-centered" v-if="importedTransaction">
      <h1 class="title">Welcome to the Taxable Event Wizard</h1>
      <div class="content has-text-left">
        We found transactions spanning from
        {{ new Date(StatementDateRange.start * 1000).toLocaleDateString() }} to
        {{ new Date(StatementDateRange.end * 1000).toLocaleDateString() }}.
      </div>
      <b-steps :label-position="bottom" vertical>
        <b-step-item label="Verify Taxable Event" icon="cash">
          <div class="section">
            <div class="content has-text-centered">
              <i>WORK IN PROGRESS</i>
              0.13 was transferred out on July 4th, 2021. <br />
              Is this a taxable event?
              <b-switch
                v-model="position"
                true-value="is-right"
                false-value="is-left"
              >
                Yes
              </b-switch>
            </div>
          </div>
        </b-step-item>

        <b-step-item label="Choose date acquired" icon="calendar-range">
          Profile: Lorem ipsum dolor sit amet. <br />
          Profile: Lorem ipsum dolor sit amet.? <br />
          Profile: Lorem ipsum dolor sit amet. <br />
          Profile: Lorem ipsum dolor sit amet.
        </b-step-item>

        <b-step-item label="Review" icon="marker-check" disabled>
          Social: Lorem ipsum dolor sit amet. <br />
          Social: Lorem ipsum dolor sit amet. <br />
          Social: Lorem ipsum dolor sit amet. <br />
          Social: Lorem ipsum dolor sit amet. <br />
          Social: Lorem ipsum dolor sit amet.
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
import { getTransactionDateRange } from "~/utils/plUtils";
export default {
  name: "TaxableEventWizard",
  data() {
    return {
      importedTransaction: false,
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
  },
};
</script>