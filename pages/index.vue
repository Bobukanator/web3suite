<template>
  <section>
    <NuxtLink to="/">
      <div class="columns is-centered notification is-primary">
        <div class="column is-3">
          <b-image
            :src="require('@/assets/Web3 Suite-logos.jpeg')"
            alt="The Web3 Suites logo"
            class="is-small"
          ></b-image>
        </div>
      </div>
    </NuxtLink>
    <section>
      <Metamask></Metamask>
    </section>
  </section>
</template>

<script>
import Metamask from "../components/metamask.vue";
export default {
  name: "MainPage",
  components: { Metamask },
  async asyncData() {},
  methods: {},
};
</script>
