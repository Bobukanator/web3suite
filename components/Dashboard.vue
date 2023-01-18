<template>
  <div class="welcomeBackground">
    <section class="section">
      <div class="container">
        <div class="card m-2">
          <header class="card-header">
            <p class="card-header-title">Web3 Footprint</p>
          </header>
          <div class="card-content">
            <p><b>Account:</b> {{ SelectedAddress }}</p>
            <p><b>Network:</b> {{ Network }}</p>
          </div>
        </div>

        <OpenSeaAssets></OpenSeaAssets>
        <EtherTransactions></EtherTransactions>
      </div>
    </section>
  </div>
</template>
<script>
import Web3 from "web3";
import { getHumanReadableNetworkFromChainId } from "~/utils/cryptoUtils";
import OpenSeaAssets from "./OpenSeaAssets.vue";
import EtherTransactions from "./EtherTransactions.vue";
export default {
  name: "Dashboard",
  computed: {
    WalletEnabled: function () {
      return this.$store.state.WalletEnabled;
    },
    UserConnected: function () {
      return this.$store.state.UserConnected;
    },
    chainId: function () {
      return this.$store.state.ChainId;
    },
    Network: function () {
      return getHumanReadableNetworkFromChainId(
        Web3.utils.hexToNumber(this.$store.state.ChainId)
      );
    },
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
  },
  methods: {
    connect() {
      window.ethereum.request({
        method: "eth_requestAccounts",
      });
    },
  },
  components: { OpenSeaAssets, EtherTransactions },
};
</script>