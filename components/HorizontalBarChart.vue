<template lang="pug">
BarChart(:chart-data='simpleData', :options='options', :styles='chartStyles')
</template>

<script setup lang="ts">
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps<{
  labels: Array<string | number>
  data: Array<number>
  selected: Array<string | number>
}>()

const emit = defineEmits({
  click: null,
})

const chartStyles = computed(() => ({
  height: '300px',
  position: 'relative',
}))

const simpleData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: props.labels.map((s) =>
        props.selected.includes(s) ? '#004cc7' : '#609eff'
      ),
      maxBarThickness: 40,
    },
  ],
}))

const options = {
  indexAxis: 'y',
  maintainAspectRatio: false,
  onClick: (_, arr) => {
    if (!arr.length) return
    emit('click', arr[0].index)
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#efefef',
      titleColor: 'dimgray',
      bodyColor: 'black',
      callbacks: {
        beforeBody: (tooltipItem) => {
          const value = tooltipItem[0].formattedValue
          tooltipItem[0].formattedValue = ` ${value}`
        },
      },
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        lineWidth: 0.1,
        color: 'white',
      },
    },
  },
}
</script>

<style scoped>
canvas {
  display: flex;
}
</style>
