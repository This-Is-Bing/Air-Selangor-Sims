<template>
    <v-container fluid class="bg-secondary elevation-2">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Dashboard</div>
      </v-row>
    </v-container>

    <v-card class="ma-2 pa-2 elevation-0 bg-primary">
      <p class="text-h6 text-secondary">Welcome {{ username }}</p>
    </v-card>

    <v-card class="ma-2 pa-2 elevation-0 bg-primary">
      <p class="text-subtitle-1 font-weight-bold text-secondary pb-3">Overall Inventory</p>
      
      <v-row class="ml-2">
        <!-- total new inventory -->
        <v-col cols="3">
          <p class="text-subtitle-1 text-warning font-weight-bold">Total New Inventory</p>
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

        </v-col>

        <!-- total installation -->
        <v-col cols="3">
          <p class="text-subtitle-1 text-history_purple_border font-weight-bold">Total Installation</p>
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
        </v-col>

        <!-- low inventory -->
        <v-col cols="3">
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
        </v-col>

        <!-- inventory forecast -->
        <v-col cols="3">
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
        </v-col>
        
      </v-row>
    </v-card>

     <v-row class="mx-2 mt-4">
      <v-card width="100%" class="elevation-0 " style="background-color: transparent;">
        <v-row>
          <v-col cols="6">
              <!-- stock demand -->
              <v-card class="pa-2 elevation-0 bg-primary">
                <v-row class="d-flex justify-space-between">
                    <v-col cols="2" class="d-flex align-center justify-center">
                        <v-icon class="fa-regular fa-wand-magic-sparkles"></v-icon>
                    </v-col>
                    <v-col cols="7">
                        <v-tooltip text="A Tip For You <3" location="top">
                        <template v-slot:activator="{ props }">
                            <p class="text-subtitle-1 font-weight-bold pt-2" v-bind="props">Stock Demand Prediction ⓘ</p>
                        </template>
                        </v-tooltip>
                        <p class="text-caption pa-0 ma-0" >As of {{ convertDateTime(Date.now()) }}</p>
                    </v-col>
                    <v-col class="d-flex align-center justify-start" cols="3">
                      <v-btn color="secondary text-none">Demand</v-btn>
                    </v-col>
                </v-row>
                <!-- graph -->
                <v-row class="pb-4 mt-n5">
                    <v-col cols="12" class="align-center justify-center d-flex custom-img-container" >
                      <v-img
                          :src="graph"
                          :width="450"
                          aspect-ratio="1/1"
                          cover
                      ></v-img>
                    </v-col>
                </v-row>
              </v-card>

              <!-- Lab Test Statistics -->
              <v-card class="pa-2 mt-5 mb-8 elevation-0 bg-primary">
                <v-row class="d-flex justify-space-between">
                    <v-col cols="9" class="pl-5">
                        <p class="text-subtitle-1 font-weight-bold pt-2" >Lab Test Statistics</p>
                        <p class="text-caption pa-0 ma-0" >Last 7 Days</p>
                    </v-col>
                    <v-col class="d-flex align-center justify-start" cols="3">
                      <v-btn color="secondary text-none">Lab Test</v-btn>
                    </v-col>
                </v-row>

                <v-row class="pl-2">
                  <v-col cols="7">
                    <p class="text-subtitle-2 font-weight-bold">Complete Cases</p>
                    <v-row>
                      <v-col cols="5">
                        <p class="text-subtitle-1 font-weight-bold text-success">500</p>
                        <p class="text-caption ">Pass for last 7 days</p>
                      </v-col>
                      <v-col cols="1">
                        <v-divider vertical class="border-opacity-100" color="inactive"></v-divider>
                      </v-col>
                      <v-col cols="5">
                        <p class="text-subtitle-1 font-weight-bold text-history_red_border">35</p>
                        <p class="text-caption f">Fail for last 7 days</p>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="5">
                    <p class="text-subtitle-2 font-weight-bold">Incomplete Cases</p>
                    <v-row>
                      <v-col>
                        <p class="text-subtitle-1 font-weight-bold text-warning">15</p>
                        <p class="text-caption">Created and pending for last 7 days</p>
                      </v-col>
                    </v-row>
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
                      <v-btn color="secondary text-none">Refunds</v-btn>
                    </v-col>
              </v-row>

              <v-row class="d-flex ">
                    <v-col cols="1" class="d-flex align-center justify-center ml-3">
                        <v-icon class="fa-regular fa-chart-simple"></v-icon>
                    </v-col>
                    <v-col cols="7">
                        <v-tooltip text="A Tip For You <3" location="top">
                        <template v-slot:activator="{ props }">
                            <p class="text-subtitle-1 font-weight-bold pt-2" v-bind="props">Reasons of Returns & Refund ⓘ</p>
                        </template>
                        </v-tooltip>
                        <p class="text-caption pa-0 ma-0" >As of {{ convertDateTime(Date.now()) }}</p>
                    </v-col>

                </v-row>
                <v-row class="pb-4">
                    <v-col cols="12" class="align-center justify-center d-flex custom-img-container" >
                      <v-img
                          :src="chart"
                          :width="437"
                          aspect-ratio="1/1"
                          cover
                      ></v-img>
                    </v-col>
                </v-row>

                <v-row class="d-flex ">
                    <v-col cols="1" class="d-flex align-center justify-center ml-3">
                        <v-icon class="fa-regular fa-chart-simple"></v-icon>
                    </v-col>
                    <v-col cols="7">
                        <v-tooltip text="A Tip For You <3" location="top">
                        <template v-slot:activator="{ props }">
                            <p class="text-subtitle-1 font-weight-bold pt-2" v-bind="props">Pending Cases ⓘ</p>
                        </template>
                        </v-tooltip>
                        <p class="text-h4 text-warning font-weight-bold" >500</p>
                        <p class="text-caption text-inactive font-weight-bold"> Waiting for processing</p>
                    </v-col>
                </v-row>

         </v-card>
          </v-col>
        </v-row>
      </v-card>
     </v-row>

  </template>
  
  <script>
import userInfo from '@/userInfo';
import graph from "@/assets/demo_graph.png"
import chart from "@/assets/demo_chart.png"

import { convertDateTime } from '@/tools/convertDateTime';


  export default {
    name: 'DashboardView',
    data(){
      return{
         username: userInfo.name,
         graph,
         chart

      }
    },
    methods:{
      convertDateTime
    }
  }
  </script>
  
  <style>
  .custom-img-container > .v-img {
    flex: 0 0 auto; /* Do not grow, do not shrink, and use 'auto' as the basis */
    width: 400px; /* Force width */
  }
</style>