<script>
export default {
  name: 'app-input',
  props: {
    name: { type: String },
    value: { type: String }
  }
}
</script>

<template>
  <input class="input" :name="name" :value="value" @change="$emit('change')" />
</template>
<style lang="scss" scoped>
.input {
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
  ::placeholder {
    color: var(--color-placeholder);
    font-weight: normal;
    font-size: 16px;
  }
  :focus {
    border: none;
  }
}
</style>
