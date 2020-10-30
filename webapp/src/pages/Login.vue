<script>
import { AppLogo, Input, Button, Form } from '../components'
export default {
  name: 'login-page',
  components: {
    'app-button': Button,
    'app-input': Input,
    'app-form': Form,
    'app-logo': AppLogo,
  },
  methods: {
    onSubmit(e) {
      console.log('Event: ', e)
    }
  },
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__container">
      <app-logo :height="69" :width="69" />
      <app-form @submit="onSubmit" @reset="() => {}">
        <app-input
          name="email"
          placeholder="Informe seu email"
          type="email"
          margin="top"
          :margin-size="32"
        />
        <app-input
          name="password"
          placeholder="Informe sua senha"
          type="password"
          margin="top bottom"
          :margin-size="16"
        />
        <app-button
          block
          type="submit"
          text="Login"
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
