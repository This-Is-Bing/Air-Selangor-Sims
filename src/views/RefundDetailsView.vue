
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
        <div class="font-weight-bold text-h5">Refund Details</div>
      </v-row>
    </v-container>

    <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- button -->
    <v-container grid-list-xs class="d-flex justify-space-between" fluid>
      <p class="text-h6 font-weight-bold">Refund - {{refund._id}}</p>
      <!-- <div>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-pencil" class="mr-2">Edit</v-btn>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-download">Download</v-btn>
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
            <refund-details-modal :refund="refund"/>
          </v-card>
        </v-window-item>
          
        <v-window-item key="action">
          <v-card flat>
            <v-container class="pt-0" fluid>
              <v-container grid-list-xs>
                <!-- Refund Actions -->
                <v-row>
                  <v-col cols="7">
                      <p class="text-subtitle-1 font-weight-bold pt-2">Refund Actions</p>
                  </v-col>
                </v-row>

                <v-row v-if="this.refund.refund_status == 'New'">
                  <v-col cols="12">
                      <p class="text-inactive font-weight-bold">Actions can only be made after completing refund lab test</p>
                  </v-col>
                </v-row>


                <v-row v-else>
                  <v-col cols="12">

                    <v-row>
                      <v-col cols="2">
                        <p class="">ID:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="">{{ this.refund._id }}</p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="2">
                        <p class="">Serial Number:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="">{{ this.refund.meter_id.serial_number }}</p>
                      </v-col>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="2">
                        <p class="">Model:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="">{{ this.refund.meter_id.product_id.name }}</p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="2">
                        <p class="">Defect:</p>
                      </v-col>
                      <v-col cols="10">
                        <p class="">{{ this.refund.defect }}</p>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="10">
                        <v-textarea
                            v-model="comments"
                            label="Comments"
                            density="comfortable"
                            variant="outlined"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="10" class="d-flex justify-end">
                        <v-btn color="error" class="mx-3">Reject</v-btn>
                        <v-btn color="success">Approve</v-btn>
                      </v-col>
                    </v-row>
                    


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
import { getARefund } from '@/tools/api';
import RefundDetailsModal from "../components/refundDetails.vue";



  export default {
  components: { RefundDetailsModal },
    name: 'RefundDetailsView',
    props: {
        id: {
        type: String,
        required: true,
        },
    },
    data(){
        return{
            showOverlay:false,
            refund:[],
            activeTab: 'overview' 
        }
    },
    created(){
        this.loadRefund()
    },
    methods:{
        async loadRefund(){
            this.showOverlay = true
            const result = await getARefund( this.id )
            this.refund = result.refund
            this.showOverlay = false
        }
    }

  }
  </script>
  