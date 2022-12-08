<template>
  <div class="aboutBackground">
    <section class="section">
      <div class="columns is-multiline">
        <div class="content column is-half is-offset-one-quarter">
          <NuxtLink :to="{ path: '/waitlist' }">
          <div class="box">
              <p>As web3 matures, companies, brands, and influencers must create,
              implement, and monitor a web3 marking strategy and will need robust
              supporting tools that streamline what would otherwise be a redundant and
              inefficient process. The Web3 Suite is designed to enable web3 strategy
              success!</p>
              <p>We are a small team with a big vision but limited time. If you have an 
              idea for a feature that would help you or want to be notified of new 
              features as they are added - please add yourself to our waiting list.</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
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