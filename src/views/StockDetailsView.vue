
<template>
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

    <v-container fluid class="bg-secondary elevation-2 ">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Transfer Details</div>
      </v-row>
    </v-container>

    <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- button -->
    <v-container grid-list-xs class="d-flex justify-space-between" fluid>
      <p class="text-h6 font-weight-bold">Transfer - {{stock._id}}</p>
      <!-- <div>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-solid fa-pencil" class="mr-2">Edit</v-btn>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-solid fa-download">Download</v-btn>
      </div> -->
    </v-container>

    <v-tabs
      v-model="activeTab"
      background-color="primary"
      light
      slider-color="secondary"
      >
      <v-tab key="overview" class="text-none px-10 text-subtitle-1"> Overview </v-tab>
      <v-tab key="action" class="text-none px-10 text-subtitle-1"> Action </v-tab>
    </v-tabs>

    <v-divider color="black"></v-divider>

    <!-- Window Items -->
    <v-window v-model="activeTab">
        <!-- Account Summary Tab -->
        <v-window-item key="overview">
          <v-card flat>
            <v-container class="pt-0" fluid>
              <v-container grid-list-xs>
                <!-- Refund Actions -->
                <v-row>
                  <v-col cols="7">
                      <p class="text-subtitle-1 font-weight-bold pt-2">Transfer Details</p>
                  </v-col>
                </v-row>

                

                <v-row>
                  <v-col cols="12">

                    <v-row>
                      <v-col cols="2">
                        <p class="">Departure:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="" v-if="this.stock.departure">{{ this.stock.departure.name }}</p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="2">
                        <p class="">Destination:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="" v-if="this.stock.destination">{{ this.stock.destination.name}}</p>
                      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="2">
                        <p class="">Total Stock Transfer:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="" v-if="this.stock.meters">{{ this.stock.meters.length}}</p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="7">
                          <p class="text-subtitle-1 font-weight-bold pt-2">Stock Lists</p>
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="2">
                        <p class="">Serial Numbers:</p>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="10">
                        <v-chip 
                            v-for="meter in stock.meters" 
                            :key="meter"
                            class="ma-2"
                            color="secondary"
                            outlined>
                            {{ meter }}
                        </v-chip>
                      </v-col>
                  </v-row>

                  </v-col>
                </v-row>

              </v-container>

            </v-container>
          </v-card>


        </v-window-item>
          
        <v-window-item key="action">
          <v-card flat>
            <v-container class="pt-0" fluid>
              <v-container grid-list-xs>
                <p class="text-subtitle-1 font-weight-bold pt-2 mb-5">Transfer Action</p>

                    <v-row>
                      <v-col cols="10" class="d-flex">
                        <v-btn color="success" class="">Stock Received</v-btn>
                        <v-btn color="error" class="mx-3">Stock Cancelled</v-btn>
                      </v-col>
                    </v-row>

              </v-container>

            </v-container>
          </v-card>
        </v-window-item>
        
    </v-window>

  </v-card>
    
  </template>
  
  <script>
import { getAStock } from '@/tools/api';



  export default {
    name: 'StockDetailsView',
    props: {
        id: {
        type: String,
        required: true,
        },
    },
    data(){
        return{
            showOverlay:false,
            stock:[],
            activeTab: 'overview' ,
            comments: null
        }
    },
    created(){
        this.laodStock()
    },
    methods:{
        async laodStock(){
            this.showOverlay = true
            const result = await getAStock( this.id )
            this.stock = result.stock
            this.showOverlay = false
        },
        
    }

  }
  </script>
  