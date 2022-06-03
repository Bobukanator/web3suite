<template>
  <div style="text-align: center">
    <img src="https://i.imgur.com/zivxHE1.gif" /><br /><br />
    <h1>Whoops</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Sorry we messed up!",
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>