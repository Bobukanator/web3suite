<template>
  <div>
    <p class="title">TEST Network (Rinkeby)</p>
    <p><b>Assets Count:</b> {{ assetAmount }}</p>
    <p><b>Total Value by last sale:</b> {{ TotalSaleOfAssets }} RinkebyETH</p>
  </div>
</template>
<script>
export default {
  name: "OpenSeaAssets",
  data() {
    return {
      openSeaAssets: {},
      assetAmount: 0,
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    TotalSaleOfAssets: function () {
      let value = 0;
      if (this.openSeaAssets.assets) {
        this.openSeaAssets.assets.forEach((asset) => {
          value += parseFloat(asset.last_sale.total_price);
        });
      }
      return value / 1000000000000000000;
    },
  },
  mounted() {
    this.getOpenSeaAssets();
  },
  methods: {
    async getOpenSeaAssets() {
      this.openSeaAssets = await this.$dataApi.getAssetsFromOpenSea(
        this.SelectedAddress
      );
      this.assetAmount = this.openSeaAssets.assets.length;
    },
  },
};
</script>