<script>
import { AppLogo, Input, Button, Form } from '../components'
export default {
  name: 'register-page',
  components: {
    'app-form': Form,
    'app-button': Button,
    'app-input': Input,
    'app-logo': AppLogo,
  },
  methods: {
    onSubmit(data) {
      console.log(data)
    }
  },
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__container">
      <app-logo :height="69" :width="69" />
      <app-form @submit="onSubmit">
        <app-input
          name="name"
          placeholder="First Name"
          margin="top"
          :margin-size="32"
        />
        <app-input
          name="email"
          placeholder="Your Email"
          type="email"
          margin="top"
          :margin-size="16"
        />
        <app-input
          name="password"
          placeholder="New Password"
          type="password"
          margin="top bottom"
          :margin-size="16"
        />
        <app-button
          block text="Create account"
          margin="top bottom"
          :margin-size="24"
        />
      </app-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login-page {
    background-color: var(--color-primary);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    &__container {
      max-width: 640px;
      padding: 40px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
