
<template>
    <!-- Loading Overlay -->
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

    <!-- Header -->
    <v-container fluid class="bg-secondary elevation-2 ">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Lab Test Details</div>
      </v-row>
    </v-container>

    <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- button -->
    <v-container grid-list-xs class="d-flex justify-space-between" fluid>
      <p class="text-h6 font-weight-bold">Lab Test - {{labtest._id}}</p>
      <div>
        <editTestResultModal></editTestResultModal>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-download">Download</v-btn>
      </div>
    </v-container>

    <v-container grid-list-xs fluid>

        <!-- Meter Details -->
        <p class="text-subtitle-1 font-weight-bold pt-2 pb-4">Meter Details</p>
        <v-row >
            <v-col cols="2">Serial Number:</v-col>
            <v-col cols="3" v-if="labtest.meter_id">{{labtest.meter_id.serial_number}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Category:</v-col>
            <v-col cols="3" v-if="labtest.meter_id">{{labtest.meter_id.product_id.name}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Date Added:</v-col>
            <v-col cols="3" v-if="labtest.meter_id">{{convertDateTime(labtest.meter_id.date_added)}}</v-col>
        </v-row>

        <!-- Test Details -->
        <p class="text-subtitle-1 font-weight-bold pt-8 pb-4">Test Details</p>

        <!-- Test Status -->
        <v-row>
            <v-col cols="2">
                <p>Test Status:</p>
            </v-col>
            <v-col cols="3">
                <v-chip close color="warning" v-if="labtest.test_status == 'New'">New</v-chip>
                <v-chip close color="success" v-if="labtest.test_status == 'Passed'">Passed</v-chip>
                <v-chip close color="error" v-if="labtest.test_status == 'Failed'">Failed</v-chip>
            </v-col>
        </v-row>

        <!-- Lab Test Date -->
        <v-row v-if="labtest.test_date">
            <v-col cols="2">
                <p >Test Date:</p>
            </v-col>
            <v-col cols="">
                <p v-if="labtest.test_date">{{ convertDate(labtest.test_date) }}</p>
            </v-col>
        </v-row>

        <!-- Labtest Date -->
        <v-row v-if="labtest.test_date" >
            <v-col cols="2" >
                <p>Tester:</p>
            </v-col>
            <v-col cols="2">
                <p v-if="labtest.tester">{{ labtest.tester }}</p>
            </v-col>
        </v-row>

        <!-- Labtest Comments -->
        <v-row v-if="labtest.comments" >
            <v-col cols="2">
                <p>Comments:</p>
            </v-col>
            <v-col cols="2">
                <p v-if="labtest.comments">{{ labtest.comments }}</p>
            </v-col>
        </v-row>

    </v-container>
    
    <!-- Notification -->
    <v-snackbar v-model="snackbar" color="primary" >
      <v-icon icon="fa-solid fa-circle-check" color="success" class="mr-3" ></v-icon> {{ text }} 
      <template v-slot:actions>
        <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-regular fa-xmark"></v-btn>
      </template>
    </v-snackbar>

  </v-card>
    
  </template>
  
  <script>
    import { getALabTest } from '@/tools/api.js';
    import { convertDate, convertDateTime } from '@/tools/convertDateTime';
    import editTestResultModal from '@/components/editTestResultModal.vue';



  export default {
    name: 'LabTestDetailsView',
    components:{editTestResultModal},
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data(){
        return{
            showOverlay:false,
            labtest:[],
            history:[],
            labResult: null,
            testDate: null,
            tester: null,
            snackbar: false,
            text: "Lab Test Updated"
        }
    },
    created(){
        this.loadLabtest()
    },
    watch: {
      '$route.query.labtestUpdated': {
        immediate: true,
        handler(value) {
          if (value === 'true') {
            this.loadLabtest()
            this.snackbar = true;// Show the snackbar
          }
        }
      }
    },
    methods:{
        convertDate,convertDateTime,
        async loadLabtest(){
            this.showOverlay = true
            const result = await getALabTest( this.id )
            this.labtest = result.labtest
            this.showOverlay = false
        },
    }

  }
  </script>
  