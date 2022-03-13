<template>
  <header id="header">
    <page-container>
      <h1 class="header__logo">Covid</h1>
    </page-container>
  </header>
</template>

<script>
import PageContainer from '../Containers/PageContainer.vue'
export default {
  name: 'HeaderPage',
  components: { PageContainer },
}
</script>

<style lang="scss">
#header {
  height: 52px;
  background: var(--color);
  display: flex;
  align-items: center;
  .page-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header__logo {
      font-size: 26px;
      text-transform: uppercase;
      color: var(--primary);
    }
  }
}
</style>
