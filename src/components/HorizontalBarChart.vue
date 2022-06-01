<template>
  <BarChart
    :chart-data="simpleData"
    :options="options"
    :styles="chartStyles"
  />
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  selected: {
    type: Array,
    required: true
  }
})

const emit = defineEmits({
  click: null
})

const chartStyles = computed(() => ({
  height: props.labels.length > 5 ? 60 * props.labels.length : 300 + 'px',
  position: 'relative'
}))

const simpleData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: props.labels.map(s => props.selected.includes(s) ? '#004cc7' : '#609eff')
    }
  ]
}))

const options = {
  indexAxis: 'y',
  responsive: true,
  onClick: (e, arr) => {
    if (!arr.length) return
    emit('click', arr[0].index)
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#efefef',
      titleColor: 'dimgray',
      bodyColor: 'black',
      callbacks: {
        beforeBody: function (tooltipItem) {
          const value = tooltipItem[0].formattedValue
          tooltipItem[0].formattedValue = ` ${value}`
        }
      }
    }
  },
  scales: {
    y: {
      grid: {
        color: 'transparent'
      }
    }
  }
}
</script>

<style scoped>
canvas {
  display: flex;
}
</style>
