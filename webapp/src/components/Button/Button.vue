<script>
export default {
  name: 'app-button',
  props: {
    text: { type: String, required: true },
    loading: { type: Boolean },
    block: { type: Boolean },
  },
  computed: {
    styles() {
      return {
        ...(this.block && { width: '100%' })
      }
    },
    isLoading() {
      return this.loading ? '--loading' : ''
    }
  },
}
</script>
<template>
  <button
    @click="$emit('click')"
    :style="styles"
    :class="`button ${isLoading}`"
    :disabled="loading"
  >
    <template v-if="!loading">
      {{ text }}
    </template>
    <template v-else>
      <div class="lds-ring"><div /><div /><div /><div/></div>
    </template>
  </button>
</template>

<style lang="scss">
.button {
  height: 50px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-secondary);
  color: var(--text-color-dark);
  font-weight: bold;
  font-size: 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &.--loading {
    opacity: 0.5;
    cursor: default;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    border: 2px solid var(--text-color-dark);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--text-color-dark) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
