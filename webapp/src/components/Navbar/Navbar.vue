<script>
import { mapGetters, mapActions }  from 'vuex'

import { AppLogo, Button, Avatar, } from '../'
  export default {
    name: 'app-navbar',
    components: {
      'app-logo': AppLogo,
      'app-button': Button,
      'app-avatar': Avatar,
    },
    computed: {
      ...mapGetters('auth', ['isLoading', 'user'])
    },
    methods: {
      ...mapActions('auth', ['fetchUser', 'logout'])
    },
    async created() {
      await this.fetchUser()
    }
  }
</script>

<template>
  <nav class="navbar__header">
    <app-logo :height="49" :width="49" />
    <div class="navbar__header__avatar-container" >
      <span class="navbar__header__avatar-container__name">{{ user && user.name }}</span>
      <app-avatar :text="user && user.name" />
      <app-button  text="Log out" @click="logout" :width="90" :height="40" margin="left" :margin-size="8" />
    </div>
  </nav>
</template>

<style lang="scss">
.navbar__header {
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
</style>
