<template lang="pug">
el-row(align='middle')
  el-rate(
    v-model='input',
    :max='10',
    show-text,
    :texts='rating.texts',
    :colors='rating.colors',
    @change='emit("change", $event)'
  )
  el-button.ml-1(
    :icon='ElIconClose',
    size='small',
    circle,
    text,
    @click='clear'
  )
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number)
}>()

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const clear = () => {
  input.value = 0
  emit('change', 0)
}
</script>

<style scoped></style>
