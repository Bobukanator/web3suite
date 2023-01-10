<template>
  <div class="card m-2" v-if="isMounted">
    <header class="card-header">
      <p class="card-header-title">Crypto Tax Form Help</p>
    </header>
    <div class="section">
      <div class="content has-text-left">
        <p>
          In many countries, including the United States, taxpayers must report
          and pay taxes on any gains from cryptocurrency transactions. Reporting
          must include profits from selling cryptocurrency and income from using
          cryptocurrency to pay for goods or services.
        </p>
        <p>
          You should keep track of all of your cryptocurrency transactions,
          including the transaction's date, the cryptocurrency's value at the
          time, and whether the transaction resulted in a gain or loss. The
          transaction may be considered a taxable event if you sell or dispose
          of your cryptocurrency or use it to pay for goods or services.
        </p>
        <p>
          For example, if you buy one bitcoin for $1,000 and later sell it for
          $5,000, you will have a capital gain of $4,000. Selling the bitcoin is
          a taxable event. You must report the event on your tax return.
        </p>
        <p>
          Similarly, if you use bitcoin to pay for goods or services, the value
          you receive will be taxable as income. For example, if you use bitcoin
          to pay for a $100 pizza, you will need to report $100 of income on
          your tax return.
        </p>
        <p>
          In the United States, you will generally use Form 8949. The following
          is an exact reproduction of this form. Our system enables the
          automatic import of cryptocurrency transactions directly from your
          cryptocurrency wallet.
        </p>
      </div>
    </div>
    <div class="content has-text-right" v-if="UserConnected">
      <B>Address:</B> {{ SelectedAddress }}
      <button class="button" @click="getParsedTransactions()">
        Import Transactions
      </button>
    </div>
    <div class="content has-text-right" v-if="!UserConnected">
      <B>Please connect your wallet to import transactions.</B>
    </div>
    <div class="content has-text-right">January 1 to December 31</div>
    <div class="section">
      <h2 class="subtitle">Crypto Transactions Short-Term</h2>
      <b-table
        :data="shortTermTransactions"
        :bordered="false"
        :striped="true"
        npm
        :narrowed="true"
        :hoverable="true"
        :focusable="true"
        :mobile-cards="true"
      >
        <b-table-column
          field="Description"
          label="Description"
          width="10"
          v-slot="props"
        >
          <div v-if="props.row.Description != 'Totals'">
            <b-input v-model="props.row.Description"></b-input>
          </div>
          <div v-if="props.row.Description == 'Totals'">
            <B>{{ props.row.Description }}</B>
          </div>
        </b-table-column>
        <b-table-column
          field="Date_Acquired"
          label="Date Acquired"
          width="10"
          v-slot="props"
        >
          <b-datepicker
            v-model="props.row.Date_Acquired"
            :show-week-number="showWeekNumber"
            :locale="locale"
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDate"
            trap-focus
            v-if="props.row.Description != 'Totals'"
          >
          </b-datepicker>
        </b-table-column>
        <b-table-column
          field="Date_Sold"
          label="Date Sold"
          width="10"
          v-slot="props"
        >
          <b-datepicker
            v-model="props.row.Date_Sold"
            :show-week-number="showWeekNumber"
            :locale="locale"
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDate"
            trap-focus
            v-if="props.row.Description != 'Totals'"
          >
          </b-datepicker>
        </b-table-column>
        <b-table-column
          field="Proceeds"
          label="Proceeds"
          width="10"
          v-slot="props"
        >
          <b-input v-model="props.row.Proceeds" icon="currency-usd"></b-input>
        </b-table-column>
        <b-table-column
          field="Cost_Basis"
          label="Cost Basis"
          width="10"
          v-slot="props"
        >
          <b-input v-model="props.row.Cost_Basis" icon="currency-usd"></b-input>
        </b-table-column>
        <b-table-column
          field="Gain_Loss"
          label="Gain or Loss"
          width="10"
          v-slot="props"
        >
          <b-input v-model="props.row.Gain_Loss" icon="currency-usd"></b-input>
        </b-table-column>
      </b-table>
      <button class="button" @click="addNewRowShort()">Add transaction</button>
      <button class="button" @click="calculateTotalsShort()">
        Calculate Totals
      </button>
    </div>
    <div class="section">
      <h2 class="subtitle">Crypto Transactions Long-Term</h2>
      <b-table
        :data="longTermTransactions"
        :bordered="false"
        :striped="true"
        npm
        :narrowed="true"
        :hoverable="true"
        :focusable="true"
        :mobile-cards="true"
      >
        <b-table-column
          field="Description"
          label="Description"
          width="10"
          v-slot="props"
        >
          <div v-if="props.row.Description != 'Totals'">
            <b-input v-model="props.row.Description"></b-input>
          </div>
          <div v-if="props.row.Description == 'Totals'">
            <B>{{ props.row.Description }}</B>
          </div>
        </b-table-column>
        <b-table-column
          field="Date_Acquired"
          label="Date Acquired"
          width="10"
          v-slot="props"
        >
          <b-datepicker
            v-model="props.row.Date_Acquired"
            :show-week-number="showWeekNumber"
            :locale="locale"
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDate"
            trap-focus
            v-if="props.row.Description != 'Totals'"
          >
          </b-datepicker>
        </b-table-column>
        <b-table-column
          field="Date_Sold"
          label="Date Sold"
          width="10"
          v-slot="props"
        >
          <b-datepicker
            v-model="props.row.Date_Sold"
            :show-week-number="showWeekNumber"
            :locale="locale"
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDate"
            trap-focus
            v-if="props.row.Description != 'Totals'"
          >
          </b-datepicker>
        </b-table-column>
        <b-table-column
          field="Proceeds"
          label="Proceeds"
          width="10"
          v-slot="props"
        >
          <b-input v-model="props.row.Proceeds" icon="currency-usd"></b-input>
        </b-table-column>
        <b-table-column
          field="Cost_Basis"
          label="Cost Basis"
          width="10"
          v-slot="props"
        >
          <b-input v-model="props.row.Cost_Basis" icon="currency-usd"></b-input>
        </b-table-column>
        <b-table-column
          field="Gain_Loss"
          label="Gain or Loss"
          width="10"
          v-slot="props"
        >
          <b-input v-model="props.row.Gain_Loss" icon="currency-usd"></b-input>
        </b-table-column>
      </b-table>
      <button class="button" @click="addNewRowLong()">Add transaction</button>
      <button class="button" @click="calculateTotalsLong()">
        Calculate Totals
      </button>
    </div>
  </div>
</template>
<script>
import {
  createEmptyTransactions,
  updateTransactionTotals,
  addNewTransaction,
} from "~/utils/usaTaxUtils";
export default {
  name: "USATaxHelp",
  data() {
    return {
      isMounted: false,
      shortTermTransactions: createEmptyTransactions(),
      longTermTransactions: createEmptyTransactions(),
      allTransactions: createEmptyTransactions(),
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    UserConnected: function () {
      return this.$store.state.UserConnected;
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    addNewRowShort() {
      this.shortTermTransactions = addNewTransaction(
        this.shortTermTransactions
      );
    },
    addNewRowLong() {
      this.longTermTransactions = addNewTransaction(this.longTermTransactions);
    },
    calculateTotalsShort() {
      this.shortTermTransactions = updateTransactionTotals(
        this.shortTermTransactions
      );
    },
    calculateTotalsLong() {
      this.longTermTransactions = updateTransactionTotals(
        this.longTermTransactions
      );
    },
    async getParsedTransactions() {
      const response = await this.$dataApi.getParsedEtherTransactions(
        this.$store.state.SelectedAddress
      );
      this.allTransactions = response;
    },
  },
};
</script>