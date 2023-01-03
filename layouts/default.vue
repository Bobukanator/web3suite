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
            :to="{ path: '/dashboard' }"
            v-if="UserConnected"
          >
            Dashboard
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/tools' }"
            v-if="UserConnected"
          >
            Tools
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
            <div class="buttons" v-if="WalletEnabled && !UserConnected">
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
        <p>Copyright &copy; 2023 Spero Autem LLC. All Rights Reserved.</p>
        <p><NuxtLink to="/privacy">Privacy Policy</NuxtLink></p>
        <p><NuxtLink to="/about">About</NuxtLink></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "defaultLayout",
  mounted() {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener("ethereum#initialized", handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 3000); // 3 seconds
    }
  },
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
    SelectedAddressTrunc: function () {
      if (this.$store.state.SelectedAddress)
        return this.$store.state.SelectedAddress.substring(0, 6) + "...";
      return null;
    },
    chainId: function () {
      return this.$store.state.ChainId;
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

//Window.ethereum event handlers as defined here:
//https://docs.metamask.io/guide/ethereum-provider.html#events
try {
  window.ethereum.on("accountsChanged", accountsChanged);
} catch {
  console.log("no wallet installed");
}

function accountsChanged(ArrayOfAccounts) {
  if (ArrayOfAccounts.length == 0) {
    //if the user disconnects from our site, reload the site
    console.log("reload invoked by ethereum wallet");
    window.location.reload();
  }
}

function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log("Ethereum successfully detected!");
    $nuxt.$store.commit("set_walletenabled", true);
  } else {
    console.log("Please install MetaMask!");
  }
}
</script>
