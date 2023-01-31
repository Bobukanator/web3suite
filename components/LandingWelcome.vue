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
    <section class="section">
      <div class="columns">
        <card title="Web3 Footprint" icon="chart-line" link="/waitlist">
          A digital footprint is a company's, brand's, or influencer's
          distinctive set of traceable digital activities, contributions, and
          communications within the web3 ecosystem.
        </card>
        <card
          title="Web3 Strategic Coach"
          icon="account-tie-voice-outline"
          link="/waitlist"
        >
          The Web3 suite provides guidance, templates, and general direction to
          conceive, implement, and monitor a web3 strategy. We are your digital
          metaverse & web3 coach.
        </card>
        <card title="Web3 Tools" icon="hammer-wrench" link="/tools/tools">
          The Web3 suite provides valuable tools to help you navigate the
          complex crypto environment. Currently, we offer an easy way to change
          your MetaVerse wallet network and a tax form guide to get you ready
          for tax season.
        </card>
        <!--<card
          title="Digital Assets"
          icon="account-question"
          link="/interview/jobskillscanner"
        >
          Digital Assets in web3 include anything that exists in digital form
          and can be owned including crypto currencies and Non-Fungible Tokens
          (NFTs). The Web3 Suite provides a holistic view of your digital
          assets.
        </card>-->
      </div>
      <div class="columns" v-if="UserConnected">
        <card title="Dashboard" icon="view-dashboard" link="/dashboard">
          The Web3 Suite Dashboard provides crypto account information including
          a transaction history and the ability to view those transactions as a
          profit loss statement. More functionality is being added on a regular
          basis!
        </card>
      </div>
    </section>
    <b-notification
      type="is-primary"
      has-icon
      icon="lightbulb-on-outline"
      aria-close-label="Close notification"
      role="alert"
    >
      As web3 matures, companies, brands, and influencers must create,
      implement, and monitor a web3 marking strategy and will need robust
      supporting tools that streamline what would otherwise be a redundant and
      inefficient process. The Web3 Suite is designed to enable web3 strategy
      success!
    </b-notification>
  </div>
</template>
<script>
export default {
  name: "LandingWelcome",
  computed: {
    WalletEnabled: function () {
      return this.$store.state.WalletEnabled;
    },
    UserConnected: function () {
      return this.$store.state.UserConnected;
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