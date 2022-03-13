<template>
  <v-modal name="delete-item" class="dialog__delete-item">
    <p class="dialog__delete-item__header mb-3">
      Are you sure you want to delete?
    </p>
    <div class="dialog__delete-item__action">
      <base-button color="error" @click="deleteItems">Delete</base-button>
      <base-button @click="$modal.close({ name: 'delete-item' })"
        >Cancel</base-button
      >
    </div>
  </v-modal>
</template>

<script>
import BaseButton from '@/components/Elements/BaseButton.vue'
export default {
  components: { BaseButton },
  props: {
    loadingDelete: {
      type: Boolean,
    },
  },
  computed: {
    computedLoadingDelete: {
      get() {
        return this.loadingDelete
      },
      set(value) {
        this.$emit('update:loadingDelete', value)
      },
    },
  },
  methods: {
    deleteItems() {
      this.$modal.close({ name: 'delete-item' })
      this.computedLoadingDelete = true
      this.$emit('delete-item')
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog__delete-item {
  &__header {
    font-size: 22px;
    font-weight: bold;
  }
  &__action {
    display: flex;
    justify-content: flex-end;
    margin-top: 26px;
  }
}
</style>
