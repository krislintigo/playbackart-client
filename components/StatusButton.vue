<template lang="pug">
el-radio-group(v-model='status')
  template(v-if='width > itemFormBreakpoints.form.status')
    el-radio-button.status-radio-button(
      v-for='st in statuses',
      :key='st.value',
      :label='st.value',
      :class='[st.value]',
      :style='{ "--el-radio-button-checked-bg-color": st.color }'
    ) {{ st.title }}
  .flex.flex-col(v-else)
    el-radio.status-radio-button(
      v-for='st in statuses',
      :key='st.value',
      :label='st.value',
      :class='[st.value]'
    ) {{ st.title }}
</template>

<script setup lang="ts">
const status = defineModel<Item['status']>({ required: true })

const { width } = useWindowSize()
</script>

<style scoped lang="scss"></style>
<style lang="scss">
@import '../assets/css/main.scss';

.status-radio-button,
.el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-color: transparent;
  box-shadow: none;
}

@each $status, $color in $statuses {
  .status-radio-button.#{$status}
    > .el-radio-button__original-radio:not(:checked)
    + .el-radio-button__inner:hover {
    color: map-get($color, 'normal');
  }

  .status-radio-button.#{$status}
    .el-radio__input.is-checked
    + .el-radio__label {
    color: map-get($color, 'normal');
  }

  .status-radio-button.#{$status} .el-radio__input.is-checked .el-radio__inner {
    border-color: map-get($color, 'normal');
    background: map-get($color, 'normal');
  }
}
</style>
