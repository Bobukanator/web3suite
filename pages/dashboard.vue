<template>
  <section>
    <section>
      <Dashboard></Dashboard>
    </section>
  </section>
</template>
<script>
import Dashboard from "../components/Dashboard.vue";

export default {
  components: { Dashboard },
  data() {
    return {};
  },
  head() {
    return {
      title: "Dashboard",
      meta: [
        {
          name: "description",
          hid: "description",
          content:
            "The Web3 Suite dashboard provides a holistic view of your digital assets.",
        },
      ],
    };
  },
};
</script> 