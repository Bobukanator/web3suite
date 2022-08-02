<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is 8 has-text-centered" v-if="!WalletEnabled">
        <a href="https://metamask.io/download/"
          >Please install MetaMask to connect.</a
        >
      </div>
      <div
        class="column is 8 has-text-centered"
        v-if="WalletEnabled && !UserConnected"
      >
        <b-button type="is-primary" @click="connect()"
          >Connect to MetaMask</b-button
        >
      </div>
      <div class="column is 8 has-text-centered" v-if="UserConnected">
        <h1 class="title">Account: {{ SelectedAddress }}</h1>
        <h2 class="subtitle">ChainId: {{ ChainId }}</h2>
      </div>
    </div>
  </section>
</template>
<script>
import Web3 from "web3";
export default {
  name: "MetaMask",
  computed: {
    WalletEnabled: function () {
      return this.$store.state.WalletEnabled;
    },
    UserConnected: function () {
      return this.$store.state.UserConnected;
    },
    SelectedAddress: function () {
      return this.$store.state.SelectedAddress;
    },
    ChainId: function () {
      return Web3.utils.hexToNumber(this.$store.state.ChainId);
    },
  },
  methods: {
    async connect() {
      try {
        this.initWeb3();
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (error) {
        // User denied account access
        console.error("Exception connect to ethereum", error);
        return;
      }
      this.initWeb3();
    },
    initWeb3() {
      try {
        if (window.ethereum.selectedAddress) {
          this.$store.commit("set_userconnected", true);
          this.$store.commit("set_address", window.ethereum.selectedAddress);
        }
        if (window.ethereum.chainId)
          this.$store.commit("set_chain", window.ethereum.chainId);
        // Save it to store
      } catch (error) {
        // User denied account access
        console.error("initWeb3", error);
        return;
      }
    },
  },
};
</script>