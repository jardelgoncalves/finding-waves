<script>
export default {
  name: 'app-input',
  props: {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: () => 'text'
    },
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    margin: {
      type: String,
      required: false,
      validator: function(value) {
        return value && value.split(' ').every(item => ['top', 'bottom', 'left', 'right'].includes(item))
      }
    },
    marginSize: {
      type: Number,
      required: false,
      default: () => 16
    }
  },
  computed: {
    styles() {
      const margins = this.margin ? this.margin.split(' ') : []
      return {
       ...margins.reduce((acc, orientation) => {
          const name = `margin-${orientation}`;
          return {...acc, [name]: `${this.marginSize}px`}
        }, {})
      }
    },
  }
}
</script>

<template>
  <input
    :style="styles"
    :type="type"
    class="input"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @change="$emit('change')"
  />
</template>
<style lang="scss" scoped>
.input {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background-color: var(--bg-input);
  color: var(--color-secondary);
  font-weight: bold;
  font-size: 18px;
  outline: none;
  &::placeholder {
    color: var(--color-placeholder);
    font-weight: 400;
    font-size: 16px;
  }
  :focus {
    border: none;
  }
}
</style>
