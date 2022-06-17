<template>
  <div class="welcomeBackground">
    <b-notification
      v-if="!WalletEnabled || !UserConnected"
      type="is-dark"
      has-icon
      icon="account"
      aria-close-label="Close notification"
      role="alert"
    >
      <Metamask></Metamask>
    </b-notification>
    <section class="section is-large">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Web3 Footprint</b></h4>
              <p>Account: {{ SelectedAddress }}</p>
              <p>Network: {{ Network }}</p>
            </div>
          </NuxtLink>
        </div>
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Digital Assets</b></h4>
              <p>Overview of NFTs</p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Web3 Strategic Coach</b></h4>
              <p>Connect Now !</p>
            </div>
          </NuxtLink>
        </div>
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Web3 Marketing Tools</b></h4>
              <p>Create Content</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <b-notification
      type="is-primary"
      has-icon
      icon="lightbulb-on-outline"
      aria-close-label="Close notification"
      role="alert"
    >
      As web3 matures, companies, brands, and infuencers must create, implement,
      and monitor a web3 marking strategy and will need robust supporting tools
      that streamline what would otherwise be a redundant and inefficient
      process. The Web3 Suite is designed to enable web3 strategy success!
    </b-notification>
  </div>
</template>
<script>
import { getHumanReadableNetworkFromChainId } from "~/utils/cryptoUtils";
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
};
</script>