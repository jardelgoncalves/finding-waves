<script>
export default {
  name: 'app-form',
  props: {
    row: {
      type: Boolean,
      required: false,
    }
  },
  computed: {
    styles() {
      return {
        'flex-direction': this.row ? 'row' : 'column'
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const { form } = this.$refs;

      let data = {}
      form.children.forEach(div => {
        const el = div.querySelector('input')
        if (el && el.name && el.value) {
          const values = el.name && el.value && ({ [el.name]: el.value  })
          data = { ...data, ...values }
        }
      });

      this.$emit('submit', data)
    },
  },
}
</script>
<template>
  <form
    :style="styles"
    class="form"
    ref="form"
    @submit="onSubmit"
  >
    <slot />
  </form>
</template>

<style lang="scss">
.form {
  display: flex;
  width: 100%;
}
</style>
