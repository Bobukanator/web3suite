<template>
  <div>
    <div v-if="testAssetAmount > 0">
      <p class="title">TEST Network (Rinkeby)</p>
      <p><b>Assets Count:</b> {{ testAssetAmount }}</p>
      <p>
        <b>Total Value by last sale:</b> {{ TotalSaleOfTestAssets }} RinkebyETH
      </p>
    </div>
    <div v-if="assetAmount > 0">
      <p class="title">OpenSea Assets</p>
      <p><b>Assets Count:</b> {{ testAssetAmount }}</p>
      <p><b>Total Value by last sale:</b> {{ TotalSaleOfAssets }} wETH</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "OpenSeaAssets",
  data() {
    return {
      openSeaAssets: {},
      assetAmount: 0,
      testAssetAmount: 0,
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    TotalSaleOfAssets: function () {
      let value = 0;
      if (this.openSeaAssets.prod.assets) {
        this.openSeaAssets.prod.assets.forEach((asset) => {
          value += parseFloat(asset.last_sale.total_price);
        });
      }
      return value / 1000000000000000000;
    },
    TotalSaleOfTestAssets: function () {
      let value = 0;
      if (this.openSeaAssets.test.assets) {
        this.openSeaAssets.test.assets.forEach((asset) => {
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
      //this.assetAmount = this.openSeaAssets.prod.assets.length;
      this.testAssetAmount = this.openSeaAssets.test.assets.length;
    },
  },
};
</script>