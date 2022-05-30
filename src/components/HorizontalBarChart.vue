<template>
  <BarChart :chart-data="simpleData" :options="options" />
</template>

<script setup>
import { computed, defineProps } from 'vue'
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
  }
})

const simpleData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      backgroundColor: ['#77CEFF']
    }
  ]
}))

const options = {
  indexAxis: 'y',
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
