<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is 8 has-text-centered" v-if="!MetaMaskEnabled">
          <a href="https://metamask.io/download/"
            >Please install MetaMask to connect.</a
          >
        </p>
      </div>
      <div class="column is 8 has-text-centered" v-if="MetaMaskEnabled && !UserConnected">
        <b-button type="is-primary" @click="connect()">Connect to MetaMask</b-button>
      </div>
      <div class="column is 8 has-text-centered" v-if="UserConnected">
        <h1 class="title">Account: {{SelectedAddress}}</h1>
        <h2 class="subtitle">ChainId: {{chainId}}</h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "MetaMask",
  computed: {
    MetaMaskEnabled: function () {
      if (window.ethereum !== undefined) return true;
      return false;
    },
    UserConnected: function () {
      if (window.ethereum && window.ethereum.selectedAddress) return true;
      return false;
    },
    SelectedAddress: function () {
      if (window.ethereum) return window.ethereum.selectedAddress;
      return null;
    },
    chainId: function () {
      return window.ethereum.chainId;
    },
  },
  methods: {
    connect() {
      window.ethereum.request({
        method: "eth_requestAccounts",
      });
    },
    handleAccountsChanged() {
      alert("CHANGED");
    },
  },
};

//VERY BASIC handlers TODO -> Make these more Vue like
ethereum.on("chainChanged", reloadPage);
ethereum.on("accountsChanged", reloadPage);

function reloadPage(_chainId) {
  // reload the page - SUPER BASIC
  window.location.reload();
}
</script>