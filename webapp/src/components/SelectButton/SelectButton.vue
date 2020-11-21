<script>
export default {
  name: 'app-select-button',
  data() {
    return {
      selected: {}
    }
  },
  props: {
    label: { type: String },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    click(value) {
      this.selected = value;
      this.$emit('input', value);
    }
  }
}
</script>

<template>
  <div class="select-button">
    <span v-show="!!label" class="select-button__label">
      {{ label }}
    </span>
    <div class="select-button__group">
      
      <button
        v-for="option in options"
        :key="option.value"
        :class="`select-button__group__btn ${option.value === selected.value && '--active'}`"
        @click="click(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.select-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__label {
    color: var(--color-placeholder);
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 8px;
    margin-left: 4px;
  }

  &__group {
    display: flex;

    &__btn {
      height: 50px;
      width: 80px;
      margin: 0 8px;
      outline: none;
      border: none;
      border-radius: 12px;
      background-color: rgba(255,255,255, 0.1);
      color: var(--color-secondary);
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      transition: all 0.2s;
      
      &:hover {
        background-color: var(--color-secondary-hover);
      }

      &.--active {
        background-color: var(--color-secondary);
        color: var(--text-color-dark);
      }
    }
  }

}
</style>