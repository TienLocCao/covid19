<template>
  <div modal="true">
    <div>
      <div v-if="visible" :data-modal="name" class="modal">
        <div v-if="loading" class="loading__dialog">
          <span class="center-loading-dialog">
            <icon-loading />
          </span>
        </div>
        <div
          v-else
          aria-modal="true"
          data-reach-dialog-content="true"
          tabindex="-1"
          class="modal__mask"
        >
          <div class="modal__body">
            <div class="close" @click="close()">
              <img src="~/assets/icons/close.svg" />
            </div>
            <slot :payload="payload" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VModal from './handle'
import IconLoading from '@/components/Common/Icon/IconLoading'
export default {
  components: {
      IconLoading
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      payload: null,
      visible: false,
    }
  },
  beforeMount() {
    VModal.EventBus.$on('open', (params) => {
      if (this.name === params.name) {
        this.open(params)
      }
    })

    VModal.EventBus.$on('close', (params) => {
      if (this.name === params.name) {
        this.close(params)
      }
    })

    VModal.EventBus.$on('loading', (params) => {
      this.loading = params;
    })
  },
  methods: {
    open(params) {
      this.loading = params.loading
      this.payload = params.payload
      this.visible = true
    },
    close() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  max-width: unset;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(18, 18, 18, 0.8);
    z-index: 999;
    padding-top: 10px;
    padding-bottom: 10px;
  &__mask {
    height: auto;
  }
  &__body {
    background: #fff;
    width: 600px;
    position: relative;
    padding: 16px;
    .close {
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;
    }
  }
}
</style>
