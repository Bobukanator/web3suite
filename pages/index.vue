<template>
  <section>
    <section>
      <LandingWelcome></LandingWelcome>
    </section>
  </section>
</template>

<script>
import Metamask from "../components/metamask.vue";
import LandingWelcome from "../components/LandingWelcome.vue";
export default {
  name: "MainPage",
  components: { Metamask, LandingWelcome },
  async asyncData() {},
  methods: {},
  head() {
    return {
      title: "Welcome",
      meta: [
        {
          name: "description",
          hid: "description",
          content:
            "The Web3 Suite is designed to enable web3 strategy success!",
        },
      ],
    };
  },
};
</script>
