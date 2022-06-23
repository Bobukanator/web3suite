<template>
  <div class="welcomeBackground">
    <section class="section is-large">
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

        <div class="card m-2">
          <header class="card-header">
            <p class="card-header-title">Digital Assets</p>
          </header>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png"
                    alt="OpenSea Logo"
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">OpenSea</p>
              </div>
            </div>

            <div class="content">
              <OpenSeaAssets></OpenSeaAssets>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { getHumanReadableNetworkFromChainId } from "~/utils/cryptoUtils";
import OpenSeaAssets from "./OpenSeaAssets.vue";
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
      return getHumanReadableNetworkFromChainId(this.$store.state.ChainId);
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
  components: { OpenSeaAssets },
};
</script>