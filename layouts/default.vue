<template>
  <div class="container">
    <header class="app-header">
      <b-navbar type="is-black">
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img src="images/web3_logo_horizontal.png" alt="Web Suite 3 logo" />
          </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Home
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/interview/interview-assistant' }"
            v-if="UserConnected"
          >
            Dashboard
          </b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item tag="router-link" :to="{ path: '/about' }">
              About
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/privacy' }">
              Privacy Policy
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
        <template #end>
          <b-navbar-item tag="div">
            <div class="buttons" v-if="MetaMaskEnabled && !UserConnected">
              <a class="button is-primary" @click="connect()">
                <strong>Connect Wallet</strong>
              </a>
            </div>
            <div class="content" v-if="UserConnected">
              <b-tag icon="account-check-outline" type="is-primary">{{
                SelectedAddressTrunc
              }}</b-tag>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </header>
    <div class="container">
      <Nuxt />
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Copyright &copy; 2022 Spero Autem LLC. All Rights Reserved.</p>
        <p><NuxtLink to="/privacy">Privacy Policy</NuxtLink></p>
        <p><NuxtLink to="/about">About</NuxtLink></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "defaultLayout",
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
    SelectedAddressTrunc: function () {
      if (window.ethereum)
        return window.ethereum.selectedAddress.substring(0, 6) + "...";
      return null;
    },
    chainId: function () {
      if (window.ethereum) return window.ethereum.chainId;
      return null;
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

//VERY BASIC handlers TODO -> Make these more Vue like
try {
  ethereum.on("chainChanged", reloadPage);
  ethereum.on("accountsChanged", reloadPage);
} catch {
  console.log("no wallet installed");
}

function reloadPage(_chainId) {
  // reload the page - SUPER BASIC
  window.location.reload();
}
</script>
