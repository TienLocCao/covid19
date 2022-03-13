<template>
  <div class="base-checkbox" :class="[{ hide }]">
    <label>
      <input
        v-model="value"
        v-indeterminate="indeterminate"
        name="abc"
        type="checkbox"
      />
      <span><slot></slot></span>
    </label>
  </div>
</template>

<script>
export default {
  directives: {
    indeterminate(el, binding) {
      el.indeterminate = Boolean(binding.value)
    },
  },
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: String,
      default: '',
    },
    data: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: false,
    }
  },
  watch: {
    data(val) {
      this.value = val
    },
  },
}
</script>

<style lang="scss">
.base-checkbox {
  &.hide {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 0;
      height: 100%;
      width: 100%;
      background: transparent;
    }
  }
}
</style>
