<template>
    <v-container fluid class="bg-secondary elevation-2">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Dashboard</div>
      </v-row>
    </v-container>

    <v-card class="ma-2 pa-2 mt-4 mb-4 elevation-0 bg-primary">
      <p class="text-h6 font-weight-bold text-secondary">Welcome {{ username }}</p>
    </v-card>

    <v-card class="ma-2 pa-2 elevation-0 bg-primary">
      <p class="text-subtitle-1 font-weight-bold text-secondary pb-3">Overall Inventory</p>
      
      <v-row class="ml-2">
        <!-- total new inventory -->
        <v-col cols="3">
          <p class="text-subtitle-1 text-warning font-weight-bold">Total Inventory</p>
          <v-row class="ml-1 mt-1 pb-5">
            <!-- <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">3</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Sizes</p>
              </v-row>
            </v-col> -->
            
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1" >{{total_meter}} units</p>
              </v-row>
              <!-- <v-row>
                <p class="text-inactive text-caption">Last 7 Days</p>
              </v-row> -->
            </v-col>
          </v-row>

        </v-col>

        <v-col cols="3">
          <p class="text-subtitle-1 text-warning font-weight-bold">Total Inventory Last 7 Days</p>
          <v-row class="ml-1 mt-1 pb-5">
            <!-- <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">3</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Sizes</p>
              </v-row>
            </v-col> -->
            
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1" >{{total_new_added}} units</p>
              </v-row>
              <!-- <v-row>
                <p class="text-inactive text-caption">Last 7 Days</p>
              </v-row> -->
            </v-col>
          </v-row>

        </v-col>

        <!-- total installation -->
        <v-col cols="3">
          <p class="text-subtitle-1 text-history_purple_border font-weight-bold">Total Installed</p>
          <v-row class="ml-1 mt-1 pb-5">
            <!-- <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">3</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Sizes</p>
              </v-row>
            </v-col>
             -->
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">{{total_ins}} units</p>
              </v-row>
              <!-- <v-row>
                <p class="text-inactive text-caption">Last 7 Days</p>
              </v-row> -->
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="3">
          <p class="text-subtitle-1 text-history_purple_border font-weight-bold">Total Installed Last 7 Days</p>
          <v-row class="ml-1 mt-1 pb-5">
            <!-- <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">3</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Sizes</p>
              </v-row>
            </v-col>
             -->
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">{{total_new_ins}} units</p>
              </v-row>
              <!-- <v-row>
                <p class="text-inactive text-caption">Last 7 Days</p>
              </v-row> -->
            </v-col>
          </v-row>
        </v-col>

        <!-- low inventory -->
        <!-- <v-col cols="3">
          <p class="text-subtitle-1 text-history_red_border font-weight-bold">Low Inventory</p>
          <v-row class="ml-1 mt-1 pb-5">
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">3</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Sizes</p>
              </v-row>
            </v-col>
            
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">330 units</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Last 7 Days</p>
              </v-row>
            </v-col>
          </v-row>
        </v-col> -->

        <!-- inventory forecast -->
        <!-- <v-col cols="3">
          <p class="text-subtitle-1 text-secondary font-weight-bold">Inventory Forecast</p>
          <v-row class="ml-1 mt-1 pb-5">
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">3</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Sizes</p>
              </v-row>
            </v-col>
            
            <v-col>
              <v-row>
                <p class="font-weight-bold  text-subtitle-1">330 units</p>
              </v-row>
              <v-row>
                <p class="text-inactive text-caption">Last 7 Days</p>
              </v-row>
            </v-col>
          </v-row>
        </v-col> -->
        
      </v-row>
    </v-card>

     <v-row class="mx-2 mt-4">
      <v-card width="100%" class="elevation-0 " style="background-color: transparent;">
        <v-row>
          <v-col cols="6">
            <!-- Lab Test Statistics -->
            <v-card class="pa-2  elevation-0 bg-primary">
                <v-row class="d-flex justify-space-between">
                    <v-col cols="9" class="pl-5">
                        <p class="text-subtitle-1 font-weight-bold pt-2" >Lab Test Statistics</p>
                        <p class="text-caption pa-0 ma-0" >Last 7 Days</p>
                    </v-col>
                    <v-col class="d-flex align-center justify-start" cols="3">
                      <v-btn color="secondary text-none" size="small" prepend-icon="fa-regular fa-up-right-from-square" @click="this.$router.push({ name: 'labtest' })" >Lab Test</v-btn>
                    </v-col>
                </v-row>

                <v-row class="pl-2">
                  <v-col cols="7">
                    <p class="text-subtitle-2 font-weight-bold">Complete Cases</p>
                    <v-row>
                      <v-col cols="5">
                        <p class="text-subtitle-1 font-weight-bold text-success">{{ total_labtest_passed }}</p>
                        <p class="text-caption ">Pass for last 7 days</p>
                      </v-col>
                      <v-col cols="1">
                        <v-divider vertical class="border-opacity-100" color="inactive"></v-divider>
                      </v-col>
                      <v-col cols="5">
                        <p class="text-subtitle-1 font-weight-bold text-history_red_border">{{ total_labtest_failed }}</p>
                        <p class="text-caption f">Fail for last 7 days</p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="5">
                    <p class="text-subtitle-2 font-weight-bold">Incomplete Cases</p>
                    <v-row>
                      <v-col>
                        <p class="text-subtitle-1 font-weight-bold text-warning">{{ total_labtest_pending + total_refund_labtest_pending }}</p>
                        <p class="text-caption">Created and pending</p>
                      </v-col>
                    </v-row>
                  </v-col>

                </v-row>
              </v-card>

              <!-- stock demand -->
              <v-card class="pa-2 mt-5 mb-8 elevation-0 bg-primary">
                <v-row class="d-flex justify-space-between">
                    <v-col cols="2" class="d-flex align-center justify-center">
                        <v-icon class="fa-regular fa-wand-magic-sparkles"></v-icon>
                    </v-col>
                    <v-col cols="7">
                        <v-tooltip text="Total = FP + MC + ML" location="top">
                        <template v-slot:activator="{ props }">
                            <p class="text-subtitle-1 font-weight-bold pt-2" v-bind="props">Stock Demand Prediction ⓘ</p>
                        </template>
                        </v-tooltip>
                        <p class="text-caption pa-0 ma-0" >As of {{ convertDateTime(Date.now()) }}</p>
                    </v-col>
                    <v-col class="d-flex align-center justify-start" cols="3">
                      <v-btn color="secondary text-none" size="small" prepend-icon="fa-regular fa-up-right-from-square">Demand</v-btn>
                    </v-col>
                </v-row>
                <!-- graph -->
                <v-row class="pb-4 mt-n5">
                    <v-col cols="12" class="align-center justify-center d-flex custom-img-container" >
                      <!-- <v-img
                          :src="graph"
                          :width="450"
                          aspect-ratio="1/1"
                          cover
                      ></v-img> -->
                      <div class="mt-5" style="position: relative; width: 500px; height: 300px;">
                      <line-chart></line-chart>
                      </div>

                    </v-col>
                </v-row>
              </v-card>
          </v-col>

          <v-col cols="6">
            <v-card class="pa-2 elevation-0 bg-primary">
              <v-row class="d-flex justify-space-between">
                    <v-col cols="9" class="pl-5">
                        <p class="text-subtitle-1 font-weight-bold pt-2" >Return & Refund Overview</p>
                        <p class="text-caption pa-0 ma-0" >Last 7 Days</p>
                    </v-col>
                    <v-col class="d-flex align-center justify-start" cols="3">
                      <v-btn color="secondary text-none"  size="small" prepend-icon="fa-regular fa-up-right-from-square" @click="this.$router.push({ name: 'refund' })">Refunds</v-btn>
                    </v-col>
              </v-row>

              <v-row class="d-flex ">
                    <v-col cols="1" class="d-flex align-center justify-center ml-3">
                        <v-icon class="fa-regular fa-chart-simple"></v-icon>
                    </v-col>
                    <v-col cols="7">
                        
                        <p class="text-subtitle-1 font-weight-bold pt-2" >Reasons of Returns & Refund </p>
                        <p class="text-caption pa-0 ma-0" >As of {{ convertDateTime(Date.now()) }}</p>
                    </v-col>

                </v-row>
                <v-row class="pb-4">
                    <v-col cols="12" class="align-center justify-center d-flex custom-img-container" >
                      
                      <div style="position: relative; width: 400px; height: 285px;">
                        <pie-chart></pie-chart>
                      </div>
                    </v-col>
                </v-row>

                <v-row class="d-flex ">
                    <v-col cols="1" class="d-flex align-center justify-center ml-3">
                        <v-icon class="fa-regular fa-chart-simple"></v-icon>
                    </v-col>
                    <v-col cols="7">
                        <p class="text-subtitle-1 font-weight-bold pt-2" >Pending Refund Cases</p>
                        <p class="text-h4 text-warning font-weight-bold" >{{ total_pending_refund }}</p>
                        <p class="text-caption text-inactive font-weight-bold"> Waiting for lab test & actions</p>
                    </v-col>
                </v-row>

         </v-card>
          </v-col>
        </v-row>
      </v-card>
     </v-row>

     <v-overlay
      :model-value="showOverlay"
      class="align-center justify-center"
      >
        <v-progress-circular
            color="primary"
            size="64"
            indeterminate
        ></v-progress-circular>
      </v-overlay>
  </template>
  
  <script>
import userInfo from '@/userInfo';
import graph from "@/assets/demo_graph.png"
import chart from "@/assets/demo_chart.png"


import { convertDateTime } from '@/tools/convertDateTime';
import { getDashboardData } from '@/tools/api';
import PieChart from '@/components/pieChart.vue';
import LineChart from '@/components/lineChart.vue';


export default {
    name: 'DashboardView',
    components:{
      PieChart, LineChart
    },
    data(){
      return{
        showOverlay: false,
        username: userInfo.name,
        graph,
        chart,
        data: null,
        total_meter: 0,
        total_new_added: 0,
        total_new_ins: 0,
        total_ins: 0,
        total_labtest_pending: 0,
        total_refund_labtest_pending: 0,
        total_labtest_passed: 0,
        total_labtest_failed: 0,
        total_pending_refund: 0
      }
    },
    created(){
      this.loadData()
    },
    methods:{
      convertDateTime,
      async loadData(){
        this.showOverlay = true
        await getDashboardData()
        .then((response)=>{

          this.total_meter= response.total_meter,
          this.total_new_added= response.total_new_added,
          this.total_new_ins= response.total_new_ins,
          this.total_ins= response.total_ins
          this.total_labtest_pending= response.total_labtest_pending,
          this.total_refund_labtest_pending= response.total_refund_labtest_pending,
          this.total_labtest_passed= response.total_labtest_passed,
          this.total_labtest_failed= response.total_labtest_failed,
          this.total_pending_refund= response.total_pending_refund
          this.showOverlay = false
        }
      )

      }
    }
  }
  </script>
  
  <style>
  .custom-img-container > .v-img {
    flex: 0 0 auto; /* Do not grow, do not shrink, and use 'auto' as the basis */
    width: 400px; /* Force width */
  }
</style>