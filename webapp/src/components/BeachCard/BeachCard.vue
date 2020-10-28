<script>
import { Arrow, Star } from '../Icon'
export default {
  name: 'app-beach-card',
  components: {
    'icon-arrow': Arrow,
    'icon-star': Star,
  },
  props: {
    name: { type: String, required: true },
    rating: { type: Number, required: false, default: () => 1 },
    swell: { type: String, required: false },
    wind: { type: String, required: false },
    wave:{ type: String, required: false },
    swellRotation:{ type: Number, required: false, default: () => 70 },
    waveRotation:{ type: Number, required: false, default: () => 70},
    windRotation:{ type: Number, required: false, default: () => 0},
  },
  methods: {
    styleRating(current) {
      return this.rating >= current ? '--active' : ''
    }
  },
}
</script>
<template>
  <div class="beach-card">
    <div class="beach-card__title">
      <span class="beach-card__title__beach">Beach</span>
      <span class="beach-card__title__name">{{ name }}</span>
    </div>
    <div class="beach-card__info">
      <div class="beach-card__info__col">
        <span class="beach-card__info__col__title">Swell</span>
        <div class="beach-card__info__col__value">
          <icon-arrow :rotate="swellRotation" />
          {{ swell }}
        </div>
      </div>
      <div class="beach-card__info__col">
        <span class="beach-card__info__col__title">Wave</span>
        <div class="beach-card__info__col__value">
          <icon-arrow :rotate="waveRotation" />
          {{ wave }}
        </div>
      </div>
      <div class="beach-card__info__col">
        <span class="beach-card__info__col__title">Wind</span>
        <div class="beach-card__info__col__value">
          <icon-arrow :rotate="windRotation" />
          {{ wind }}
        </div>
      </div>
    </div>
    <div class="beach-card__rating">
      <span class="beach-card__rating__title">Rating</span>
      <div class="beach-card__rating__stars">
        <div v-for="i in 5" :key="i" :class="styleRating(i)">
          <icon-star />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.beach-card {
  max-width: 320px;
  height: 160px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  transition: box-shadow 0.2s;
  padding: 16px;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 16px rgba(108, 56, 211, 0.15);
  }

  &__title {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 15px;

    &__beach {
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 4px;
      margin-right: 4px;
      color: var(--color-gray);
    }

    &__name {
      font-size: 22px;
      line-height: 30px;
      color: var(--color-primary);
      font-weight: bold;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    &__col {
      display: flex;
      flex-direction: column;
      &__title {
        font-size: 12px;
        line-height: 16px;
        color: var(--color-gray);
      }
      &__value {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: var(--color-primary);
        display: flex;
        align-items: center;

        svg {
          margin-right: 4px;
        }
      }
    }
  }

  &__rating {
    display: flex;
    flex-direction: column;
    &__title {
      font-size: 12px;
      line-height: 16px;
      color: var(--color-gray);
    }

    &__stars {
      display: flex;
      align-items: center;

      svg {
        color: var(--color-light);
        fill: var(--color-light);
      }

      .--active svg {
        color: var(--color-secondary);
        fill: var(--color-secondary);
      }
    }
  }
}
</style>
