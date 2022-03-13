<template>
  <div class="wrapper">
    <default-header />
    <div class="main">
      <Nuxt />
    </div>
    <default-footer />
  </div>
</template>

<script>
import DefaultHeader from '@/components/Header/DefaultHeader.vue'
import DefaultFooter from '@/components/Footer/DefaultFooter.vue'
export default {
  name: 'IndexPage',
  components: {
    DefaultHeader,
    DefaultFooter,
  },
}
</script>

