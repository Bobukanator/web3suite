<template>
  <div class="column">
    <NuxtLink :to="{ path: link }">
      <div class="card has-background-primary has-text-dark">
        <header class="card-header">
          <p class="card-header-title has-text-dark">
            {{ title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content has-text-centered">
            <b-icon :icon="icon" size="is-large" type="is-dark" />
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <span>
              <slot />
            </span>
          </div>
        </footer>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "BuefyCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
};
</script>
