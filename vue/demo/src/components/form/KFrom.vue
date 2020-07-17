<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this // 这里传递的是表单组件的实例
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  methods: {
    validate() {}
  }
};
</script>

<style scoped></style>
