<template>
  <div v-bind="$props" class="page-container">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    center: Boolean,
    vertical: Boolean,
    dense: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
