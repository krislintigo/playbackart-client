<template lang="pug">
el-row(align='middle')
  .flex.flex-col
    el-rate(
      ref='refRate',
      v-model='rating',
      :max='10',
      show-text,
      :texts='RATING.texts',
      :colors='RATING.colors',
      @change='emit("change", $event)'
    )
    span.text-xs.text-center(ref='refText')
  el-button.ml-1(
    :icon='ElIconClose',
    size='small',
    circle,
    text,
    @click='clear'
  )
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', value: number): void
}>()

const rating = defineModel<number>({ required: true })

const refRate = ref<any>(null)
const refText = ref<any>(null)

onMounted(() => {
  if (!refRate.value || !refRate.value!.$el) return

  const text = refRate.value.$el.querySelector('span.el-rate__text')
  refText.value.append(text)
})

const clear = () => {
  rating.value = 0
  emit('change', 0)
}
</script>

<style scoped></style>
