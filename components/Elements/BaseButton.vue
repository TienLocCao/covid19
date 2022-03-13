<template>
  <button v-bind="buttonProps" v-on="on"><slot></slot></button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    color: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonClasses() {
      return {
        [`btn btn--${this.color}`]: true,
        [`fs--font-basic`]: true,
      }
    },
    buttonProps() {
      return {
        disabled: this.disabled,
        class: this.buttonClasses,
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    on() {
      return {
        ...this.$listeners,
      }
    },
  },
}
</script>
