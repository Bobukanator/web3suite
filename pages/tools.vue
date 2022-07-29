<template>
  <section>
    <section>
      <Metamask></Metamask>
      <ChangeNetwork></ChangeNetwork>
    </section>
  </section>
</template>
<script>
import ChangeNetwork from "../components/ChangeNetwork.vue";
import Metamask from "../components/metamask.vue";

export default {
  components: { ChangeNetwork, Metamask },
  data() {
    return {};
  },
  head() {
    return {
      title: "Tools",
      meta: [
        {
          name: "description",
          hid: "description",
          content:
            "The Web3 Suite Tools provides helpful utilities to manage in the web3 world.",
        },
      ],
    };
  },
};
</script> 