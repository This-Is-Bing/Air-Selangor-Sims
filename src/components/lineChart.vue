<template>
    <Chart
      ref="chartRef"
      type="bar"
      :data="data"
      :options="options"
    />
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js'
  import {
    Chart,
  } from 'vue-chartjs'
    
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  export default {
    name: 'App',
    components: {
      Chart
    },
    data(){
        return({
            data : {
                labels: [
                    'May 24',
                    'June 24',
                    'July 24',
                    'August 24',
                    'September 24',
                    'October 24',
                    'November 24',
                    'December 24',
                    'January 25',
                    'February 25',
                    'March 25',
                    'April 25',
                    'May 25',

                ],
                datasets: [
                    {
                    label: 'Total',
                    backgroundColor: '#4EADD6',
                    data: [26968, 26916, 27496, 27332, 27286, 26015, 27162, 27162, 25214, 25214, 25214, 27025,26968]
                    }
                ]
            },
            options : {
            responsive: true,
            maintainAspectRatio: false
            }
        })
    },
        
    
  }
  </script>
  