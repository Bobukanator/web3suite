<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is 8" v-if="UserConnected">
        <b-field label="Current Network">
          <b-select
            :placeholder="Network"
            @input="changeNetwork()"
            v-model="newNetwork"
          >
            <option
              v-for="network in SupportedNetworks"
              :value="network.id"
              :key="network.name"
            >
              {{ network.name }} ({{ network.id }})
            </option>
          </b-select>
        </b-field>
      </div>
    </div>
  </section>
</template>
<script>
import {
  getHumanReadableNetworkFromChainId,
  SupportedNetworks,
  getChainInfoFromId,
} from "~/utils/cryptoUtils";
import Web3 from "web3";
export default {
  name: "ChangeNetwork",
  data() {
    return {
      newNetwork: this.Network,
    };
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
    ChainId: function () {
      return this.$store.state.ChainId;
    },
    Network: function () {
      return getHumanReadableNetworkFromChainId(
        Web3.utils.hexToNumber(this.$store.state.ChainId)
      );
    },
    SupportedNetworks: function () {
      return SupportedNetworks;
    },
  },
  methods: {
    async changeNetwork() {
      try {
        console.log("Network change to: " + this.newNetwork);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(this.newNetwork) }],
        });
        console.log("You have switched to network " + this.newNetwork);
        this.initWeb3();
      } catch (error) {
        if (error.code == 4902) {
          try {
            const NewChain = getChainInfoFromId(this.newNetwork);
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: Web3.utils.toHex(NewChain.id),
                  chainName: NewChain.name,
                  rpcUrls: [NewChain.rpcurl],
                },
              ],
            });
          } catch (addError) {
            console.error("Exception adding network to the wallet", addError);
          }
        } else {
          // User denied account access
          console.error("Exception connect to ethereum", error);
          this.$buefy.dialog.alert({
            title: "Error",
            message:
              "Could not connect to the network with id:" +
              this.newNetwork +
              " It is possible your wallet does not currently support this network.",
            type: "is-danger",
            hasIcon: true,
            icon: "times-circle",
            iconPack: "fa",
            ariaRole: "alertdialog",
            ariaModal: true,
          });
          return;
        }
      }
    },
    initWeb3() {
      try {
        this.$store.commit("set_chain", Web3.utils.toHex(this.newNetwork));
        console.log("changed chainid:" + this.newNetwork);
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