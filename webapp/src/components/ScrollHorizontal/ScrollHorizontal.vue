<script>
export default {
  name: 'app-scroll-horizontal',
  mounted() {
    const scroll = this.$refs.scroll;
    let isDown = false;
    let startX;
    let scrollLeft;


    scroll.addEventListener('mousedown', (e) => {
      isDown = true
      scroll.classList.add('active')
      startX = e.pageX - scroll.offsetLeft
      scrollLeft = scroll.offsetLeft
    })
    scroll.addEventListener('mouseup', () => {
      isDown = false
      scroll.classList.remove('active')
    })
    scroll.addEventListener('mouseleave', () => {
      isDown = false
      scroll.classList.remove('active')
    })
    scroll.addEventListener('mousemove', (e) => {
      if (!isDown) return

      e.preventDefault()
      const x = e.pageX - scroll.offsetLeft
      const walk = (x - startX) * 2
      scroll.scrollLeft = scrollLeft - walk
    })
  },
}
</script>

<template>
  <div class="scroll" ref="scroll">
    <slot />
  </div>
</template>

<style lang="scss">
.scroll {
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
  padding: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
