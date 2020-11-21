<script>
export default {
  name: 'app-avatar',
  props: {
    text: { type: String, required: true },
    color: {type: String, required: false, default: () => 'var(--color-secondary)'},
    bg: { type: String, required: false, default: () => 'var(--color-primary)' }
  },
  computed: {
    textFinally() {
      return this.text ? this.text.toUpperCase().slice(0,2) : 'SN'
    },
    styles() {
      return {
        backgroundColor: this.bg,
        color: this.color
      }
    }
  },
}
</script>

<template>
  <div class="avatar" :style="styles">
    {{ textFinally }}
  </div>
</template>

<style lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: bold;
}
</style>
