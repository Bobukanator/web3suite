<template>
  <div>
    <div class="hero">
      <Nuxt />
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Copyright &copy; 2022 Spero Autem LLC. All Rights Reserved.</p>
        <p><NuxtLink to="/privacy">Privacy Policy</NuxtLink></p>
        <p><NuxtLink to="/about">About</NuxtLink></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "defaultLayout",
};
</script>
