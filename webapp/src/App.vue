<template>
  <div id="app">
    <login-page />
  </div>
</template>

<script>
import Login from './pages/Login'

export default {
  name: 'App',
  components: {
    'login-page': Login,
  },
  methods: {
    click() {
      alert('Helo')
    }
  },
}
</script>

<style lang="scss">
:root {
  --text-color-dark: #3C3C3C;
  --color-primary: #6C38D3;
  --color-secondary: #FAD53B;
  --color-gray: #848484;
  --color-light: #E7E7E7;
  --color-white: #ffffff;
  --bg-input: rgba(0, 0, 0, 0.1);
  --color-placeholder: rgb(250, 213, 59, 0.7);
}

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body,
input,
select,
button,
a {
  font-family: 'Nunito', sans-serif;
}
</style>>
