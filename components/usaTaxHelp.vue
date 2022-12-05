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
          <b-input v-model="props.row.Description"></b-input>
        </b-table-column>
        <b-table-column
          field="Date_Acquired"
          label="Date Acquired"
          width="10"
          v-slot="props"
        >
          <b-datetimepicker
            v-model="props.row.Date_Acquired"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDateTime"
            :locale="locale"
            :first-day-of-week="firstDayOfWeek"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            horizontal-time-picker
          >
          </b-datetimepicker>
        </b-table-column>
        <b-table-column
          field="Date_Sold"
          label="Date Sold"
          width="10"
          v-slot="props"
        >
          <b-datetimepicker
            v-model="props.row.Date_Sold"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDateTime"
            :locale="locale"
            :first-day-of-week="firstDayOfWeek"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            horizontal-time-picker
          >
          </b-datetimepicker>
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
          <b-input v-model="props.row.Description"></b-input>
        </b-table-column>
        <b-table-column
          field="Date_Acquired"
          label="Date Acquired"
          width="10"
          v-slot="props"
        >
          <b-datetimepicker
            v-model="props.row.Date_Acquired"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDateTime"
            :locale="locale"
            :first-day-of-week="firstDayOfWeek"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            horizontal-time-picker
          >
          </b-datetimepicker>
        </b-table-column>
        <b-table-column
          field="Date_Sold"
          label="Date Sold"
          width="10"
          v-slot="props"
        >
          <b-datetimepicker
            v-model="props.row.Date_Sold"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            :icon-right="selected ? 'close-circle' : ''"
            icon-right-clickable
            @icon-right-click="clearDateTime"
            :locale="locale"
            :first-day-of-week="firstDayOfWeek"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            horizontal-time-picker
          >
          </b-datetimepicker>
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
    </div>
  </div>
</template>
<script>
export default {
  name: "USATaxHelp",
  data() {
    return {
      isMounted: false,
      shortTermTransactions: [
        {
          Description: "Description of Property",
          Date_Acquired: new Date(),
          Date_Sold: new Date(),
          Proceeds: "Proceeds",
          Cost_Basis: "Cost Basis",
          Gain_Loss: "Gain or loss",
        },
      ],
      longTermTransactions: [
        {
          Description: "Description of Property",
          Date_Acquired: new Date(),
          Date_Sold: new Date(),
          Proceeds: "Proceeds",
          Cost_Basis: "Cost Basis",
          Gain_Loss: "Gain or loss",
        },
      ],
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {},
};
</script>