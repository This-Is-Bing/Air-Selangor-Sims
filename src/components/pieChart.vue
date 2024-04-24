<template>
  <Pie :data="data" :options="options" />
</template>

<script>
import { getFaultyProgram } from '@/tools/api'
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
      data :{
          labels: ['Faulty Progam', 'Meter Complaint Program', 'Meter Leak Program'],
          datasets: [
            {
              backgroundColor: ['#4EADD6', '#751DE4', '#D0E2E9'],
              data: [40, 20, 80]
            }
          ]
        },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  },
  created(){
    this.loadData("2024-05")
  },
  methods:{
    async loadData(date){
      await getFaultyProgram(date)
      .then((response)=>{
        console.log(response)
      })
    }

  }
}
</script>
