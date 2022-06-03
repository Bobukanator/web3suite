<template>
  <div class="welcomeBackground">
    <b-notification
      v-if="!MetaMaskEnabled || !UserConnected"
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
              <p>
                A digital footprint is a company's, brand's, or influencer's
                distinctive set of traceable digital activities, contributions,
                and communications within the web3 ecosystem.
              </p>
            </div>
          </NuxtLink>
        </div>
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Digital Assets</b></h4>
              <p>
                Digital Assets in web3 include anything that exists in digital
                form and can be owned including crypto currencies and
                Non-Fungible Tokens (NFTs). The Web3 Suite provides a holistic
                view of your digital assets.
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Web3 Strategic Coach</b></h4>
              <p>
                The Web3 suite provides guidance, templates, and general
                direction to conceive, implement, and monitor a web3 strategy.
                We are your digital metaverse & web3 coach.
              </p>
            </div>
          </NuxtLink>
        </div>
        <div class="tile is-parent is-6">
          <NuxtLink to="/">
            <div class="tile is-child notification is-primary">
              <h4><b>Web3 Marketing Tools</b></h4>
              <p>
                The Web3 Suite provides the ability to create and push content
                to other popular web3 platforms so you can manage & create once,
                and publish twice!
              </p>
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
      that streamline what would otherwise be a redundant and inefcient process.
      The Web3 Suite is designed to enable web3 strategy success!
    </b-notification>
  </div>
</template>
<script>
export default {
  name: "LandingWelcome",
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
</script>