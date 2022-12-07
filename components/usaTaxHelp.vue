<template>
  <div class="card m-2" v-if="isMounted">
    <header class="card-header">
      <p class="card-header-title">Crypto Tax Form Help</p>
    </header>
    <div class="content has-text-right">
      <B>Address:</B> {{ SelectedAddress }}
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
      <button class="button" @click="">Add transaction</button>
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
      <button class="button" @click="">Add transaction</button>
    </div>
  </div>
</template>
<script>
import { createEmptyTransactions } from "~/utils/usaTaxUtils";
export default {
  name: "USATaxHelp",
  data() {
    return {
      isMounted: false,
      shortTermTransactions: createEmptyTransactions(),
      longTermTransactions: createEmptyTransactions(),
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {},
};
</script>