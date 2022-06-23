<template>
  <section class="section">
    <div class="content">Assets Count: {{ assetAmount }}</div>
  </section>
</template>
<script>
export default {
  name: "OpenSeaAssets",
  data() {
    return {
      openSeaAssets: [],
      assetAmount: 0,
    };
  },
  computed: {
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
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