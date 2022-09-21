<template>
  <div class="card m-2">
    <header class="card-header">
      <p class="card-header-title">Profit Loss</p>
    </header>
  </div>
</template>
<script>
export default {
  name: "ProfitLoss",
  props: {
    Transactions: {
      type: Object,
      required: true,
    },
  },
};
</script>