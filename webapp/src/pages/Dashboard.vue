<script>

import {
  AppLogo,
  Input,
  Button,
  Form,
  SelectButton,
  Avatar,
  TimeSelection,
  ScrollHorizontal,
  BeachCard,
  Maps,
} from '../components'

export default {
  name: 'dashboard-page',
  components: {
    'app-logo': AppLogo,
    'app-button': Button,
    'app-input': Input,
    'app-form': Form,
    'app-avatar': Avatar,
    'app-select-button': SelectButton,
    'app-time-selection': TimeSelection,
    'app-scroll-horizontal': ScrollHorizontal,
    'app-beach-card': BeachCard,
    'app-maps': Maps,
  },
  data() {

    return {
      selectOptions: [
        { label: 'N', value: 'N' },
        { label: 'S', value: 'S' },
        { label: 'E', value: 'E' },
        { label: 'W', value: 'W' },
      ],
      selected: null,
      timeSelected: null,
    }
  },
  methods: {
    onSubmit() {},
    getCurrentScroll() {
      return this.$refs.listBeaches.pageYOffset || this.$refs.listBeaches.scrollTop
    }
  },
  mounted() {
    this.$refs.listBeaches.addEventListener('scroll', () => {
      const scroll = this.getCurrentScroll();
      const shink = 50;
      if (scroll > shink) {
        this.$refs.header.classList.add('--shink');
        return;
      }
        this.$refs.header.classList.remove('--shink')
    })
  }
}
</script>

<template>
  <div class="dashboard-page">
    <nav class="dashboard-page__header" ref="header">
      <app-logo :height="49" :width="49" />
      <div class="dashboard-page__header__avatar-container" >
        <span class="dashboard-page__header__avatar-container__name">Jardel</span>
        <app-avatar text="Jardel" />
        <app-button  text="Log out" :width="90" :height="40" margin="left" :margin-size="8" />
      </div>
    </nav>
    <section class="dashboard-page__add-beach">
      <div class="dashboard-page__add-beach__content">
        <h3 class="dashboard-page__add-beach__content__title">Add new beach</h3>
        <app-form @submit="onSubmit" @reset="() => {}">
          <app-input
            name="name"
            placeholder="Beach name"
            type="text"
            margin="top"
            :margin-size="32"
          />
          <div class="dashboard-page__add-beach__content__row">
            <div class="dashboard-page__add-beach__content__col">
              <app-input
                name="latitude"
                placeholder="Latitude"
                type="text"
                margin="top bottom"
                :margin-size="16"
              />
            </div>
            <div class="dashboard-page__add-beach__content__col">
              <app-input
                name="longitude"
                placeholder="Longitude"
                type="text"
                margin="top bottom"
                :margin-size="16"
              />
            </div>
          </div>
          <app-select-button
            label="Position"
            :options="selectOptions"
            v-model="selected"
          />
          <app-button
            block
            type="submit"
            text="Add beach"
            margin="top bottom"
            :margin-size="24"
          />
        </app-form>
      </div>
    </section>
    <section class="dashboard-page__list-beaches" ref="listBeaches">
      <div class="dashboard-page__list-beaches__content">
        <div class="dashboard-page__list-beaches__content__times">
          <h2 class="dashboard-page__list-beaches__content__title">
            Forecast by hour
          </h2>
          <app-time-selection
            v-model="timeSelected"
            :times="[
              { value: '12', id: '1' },
              { value: '18', id: '2' },
              { value: '06', id: '3' },
              { value: '12', id: '4' },
              { value: '18', id: '5' },
            ]"
          />
        </div>
        <app-scroll-horizontal>
          <app-beach-card
            name="Manly"
            swell="0.71m 9.41s"
            wave="1.21m"
          />
          <app-beach-card
            name="Manly"
            swell="0.71m 9.41s"
            wave="1.21m"
          />
          <app-beach-card
            name="Manly"
            swell="0.71m 9.41s"
            wave="1.21m"
          />
          <app-beach-card
            name="Manly"
            swell="0.71m 9.41s"
            wave="1.21m"
          />
          <app-beach-card
            name="Manly"
            swell="0.71m 9.41s"
            wave="1.21m"
          />
        </app-scroll-horizontal>
        <app-maps />
      </div>
    </section>
    
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;

  &__header {
    z-index: 999;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: relative;

    transition: all 0.2s;

    &.--shink {
      background-color: var(--color-primary-opacity);
      position: fixed;
    }

    &__avatar-container {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;

      &__name {
        font-size: 20px;
        color: var(--color-primary);
        font-weight: bold;
        margin-right: 8px;
      }

      button {
        font-size: 16px;
      }
    }
  }

  &__add-beach {
    max-width: 490px;
    width: 100%;
    height: 100vh;
    background-color: var(--color-primary);
    position: fixed;
    left: 0;
    top: 0;

    &__content {
      margin-top: 100px;
      padding: 0 90px 0 30px;

      &__title {
        font-size: 28px;
        color: var(--color-secondary);
        font-weight: 700;
        text-align: center;
      }

      &__row {
        display: flex;
      }

      &__col {
        flex: 1;
        &:first-child {
          padding-right: 8px;
        }
        &:last-child {
          padding-left: 8px;
        }
      }
    }
  }

  &__list-beaches {
    position: fixed;
    right: 0;
    top: 0;
    background-color: white;
    overflow-y: auto;

    width: calc(100% - 435px);
    max-height: 100vh;
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;    

    &__content {
      min-height: 100vh;
      padding: 80px 0 0 0;

      &__times {
      padding: 0 30px;
      }

      &__title {
        font-size: 24px;
        font-weight: bold;
        color: var(--text-color-dark);
      }
    }
  }
}
</style>