<script>
export default {
  name: 'app-beach-card',
  props: {
    name: { type: String, required: true },
    rating: { type: Number, required: false, default: () => 1 },
    swell: { type: String, required: false },
    wind: { type: String, required: false },
    wave:{ type: String, required: false }
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
        <div class="beach-card__info__col__value">1.21m</div>
      </div>
      <div class="beach-card__info__col">
        <span class="beach-card__info__col__title">Wave</span>
        <div class="beach-card__info__col__value">1.21m</div>
      </div>
      <div class="beach-card__info__col">
        <span class="beach-card__info__col__title">Wind</span>
        <div class="beach-card__info__col__value">1.21m</div>
      </div>
    </div>
    <div class="beach-card__rating">
      <span class="beach-card__rating__title">Rating</span>
      <div class="beach-card__rating__stars">
        <div v-for="i in 5" :key="i" :class="styleRating(i)">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
            <path d="M8.10314 0.6258L6.06251 5.28049L1.49689 6.02932C0.67814 6.16291 0.350015 7.29846 0.943765 7.94885L4.24689 11.5699L3.46564 16.6852C3.32501 17.6098 4.19064 18.3024 4.91564 17.8699L9.00002 15.4547L13.0844 17.8699C13.8094 18.2988 14.675 17.6098 14.5344 16.6852L13.7531 11.5699L17.0563 7.94885C17.65 7.29846 17.3219 6.16291 16.5031 6.02932L11.9375 5.28049L9.89689 0.6258C9.53127 -0.203888 8.47189 -0.214435 8.10314 0.6258Z" />
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="18" height="18" fill="white"/>
            </clipPath>
            </defs>
          </svg>
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
    margin-bottom: 18px;

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
