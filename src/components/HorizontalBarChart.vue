<template>
  <BarChart :chart-data="simpleData" :options="options" />
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

const simpleData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: props.labels.map(s => props.selected.includes(s) ? '#337ecc' : '#77CEFF')
    }
  ]
}))

const options = {
  indexAxis: 'y',
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

</style>
