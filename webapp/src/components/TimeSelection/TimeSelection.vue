<script>
import { Sun } from '../Icon'

export default {
  name: 'app-time-selection',
  components: {
    'icon-sun': Sun,
  },
  data() {
    return {
      initialHour: null,
      newDay: false
    }
  },
  props: {
    times: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Object],
    }
  },
  methods: {
    verifyNewDay(time) {
      let day = false;
      let initial = null
      if (!initial) {
        initial = parseInt(this.times[0].value)
      }
      return parseInt(time) < initial && !day
    },
    click(value) {
      this.$emit('input', value)
    }
  },
  computed: {
    idSelected() {
      if (this.value) return this.value.id
      return this.times[0].id
    }
  }
}
</script>

<template>
  <div class="time-selection">
    <div
      class="time-selection__container"
      v-for="time in times"
      :key="time.id"
    >
      <icon-sun :width="36" :height="36" v-show="verifyNewDay(time.value)" />
      <button
        :class="`time-selection__container__btn ${time.id === idSelected && '--active'}`"
        @click="click(time)"
      >
        {{ time.value }}h
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  .time-selection {
    display: flex;
    flex-direction: row;

    &__container {
      display: flex;
      flex-direction: row;
      align-items: center;

      &__btn {
        height: 40px;
        width: 50px;
        background-color: transparent;
        color: var(--color-primary);
        font-size: 15px;
        font-weight: 700;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: var(--color-secondary-hover);
        }

        &.--active {
          background-color: var(--color-secondary);
        }
      }

      &__btn, svg {
        margin: 0 10px;
      }

      &__btn:first-child {
        margin-left: 0;
      }
    }
  }
</style>