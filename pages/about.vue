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
    <section class="section">
      <div class="columns is-multiline">
        <div class="content column is-half is-offset-one-quarter">
          <p>Information about Web3 Suite here.</p>
        </div>
      </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: "About",
      meta: [
        {
          name: "description",
          hid: "description",
          content: "Information about the Web3 Suite.",
        },
      ],
    };
  },
};
</script> 