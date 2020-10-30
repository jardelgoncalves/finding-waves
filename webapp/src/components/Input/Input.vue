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
    error: {
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
    },
  },
  methods: {
    onChange(e) {
      this.$emit('input', e)
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
<div class="input" :style="styles">
  <input
    :type="type"
    class="input__element"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @input="onChange"
  />
  <div
    :class="`input__error ${error && '--visible'}`"
  >
    {{ error }}
  </div>
</div>
</template>
<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__element {
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


  &__error {
    opacity: 0;
    color: #f87979;
    padding: 4px;
    transition: opacity 0.4s;

    &.--visible {
      opacity: 1;
    }
  }
}
</style>
