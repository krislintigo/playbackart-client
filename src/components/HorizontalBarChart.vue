<template>
  <BarChart :chart-data="simpleData" :options="options" />
</template>

<script setup>
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const simpleData = {
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ['#77CEFF']
    }
  ]
}

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
      },
      ticks: {
        maxTicksLimit: 7
      }
    }
  }
}
</script>

<style scoped>

</style>
