<template>
  <div v-if="this.faulty && this.meterComplaint && this.meterLeak">
    <Pie :data="chartData" :options="options"/>
  </div>
</template>

<script>
import { getComplaintProgram, getFaultyProgram, getLeakProgram } from '@/tools/api'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Pie
  },
  data() {
    return ({
      faulty: 8588,
      meterComplaint: 1569,
      meterLeak: 16811,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  },
  computed:{
    chartData(){
      return {
        labels: ['Faulty Program', 'Meter Complaint Program', 'Meter Leak Program'],
        datasets: [{
          backgroundColor: ['#4EADD6', '#751DE4', '#D0E2E9'],
          data: [this.faulty, this.meterComplaint, this.meterLeak] // Dynamically assigned data
        }]
      }
    }
  },
  created(){
    // this.loadData("2025-05")
  },
  methods:{
    async loadData(date){
      await getFaultyProgram(date)
      .then((response) => {
        this.faulty = response.message || 0
      }).catch(error => console.error('Error loading faulty data:', error))

      await getLeakProgram(date)
      .then((response) => {
        this.meterLeak = response.message || 0
      }).catch(error => console.error('Error loading leak data:', error))

      await getComplaintProgram(date)
      .then((response) => {
        this.meterComplaint = response.message || 0
      }).catch(error => console.error('Error loading complaint data:', error))
    },
  }
}
</script>
