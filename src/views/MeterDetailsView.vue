
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
        <div class="font-weight-bold text-h5">Water Meter Details</div>
      </v-row>
    </v-container>

    <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- button -->
    <v-container grid-list-xs class="d-flex justify-space-between" fluid>
      <p class="text-h6 font-weight-bold">Meter - {{meter.serial_number}}</p>
      <div>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-pencil" class="mr-2">Edit</v-btn>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-download">Download</v-btn>
      </div>
    </v-container>

    <v-tabs
      v-model="activeTab"
      background-color="primary"
      light
      slider-color="secondary"
      >
      <v-tab key="overview" class="text-none px-10 text-subtitle-1"> Overview </v-tab>
      <!-- <v-tab key="adjustments" class="text-none px-10 text-subtitle-1"> Adjustments </v-tab> -->
    </v-tabs>

    <v-divider color="black"></v-divider>

    <!-- Window Items -->
    <v-window v-model="activeTab">
        <!-- Account Summary Tab -->
        <v-window-item key="overview">
          <v-card flat>
            <meter-details :meter="meter" @updateData="loadMeter"/>
          </v-card>
        </v-window-item>
          
        <!-- <v-window-item key="adjustments">
          <v-card flat>
            <v-card-text>
              Content for adjustments goes here.
            </v-card-text>
          </v-card>
        </v-window-item> -->
        
    </v-window>

  </v-card>
    
  </template>
  
  <script>
import MeterDetails from '@/components/meter_details/meterDetails.vue';
import { getAMeter } from '@/tools/api.js';


  export default {
  components: { MeterDetails },
    name: 'MeterDetailsView',
    props: {
        id: {
        type: String,
        required: true,
        },
    },
    data(){
        return{
            showOverlay:false,
            meter:[],
            activeTab: 'overview' 
        }
    },
    created(){
        this.loadMeter()
    },
    methods:{
        async loadMeter(){
            this.showOverlay = true
            const result = await getAMeter( this.id )
            this.meter = result.meter
            this.showOverlay = false
        }
    }

  }
  </script>
  