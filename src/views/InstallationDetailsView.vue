
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
        <div class="font-weight-bold text-h5">Installation Details</div>
      </v-row>
    </v-container>

    <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- button -->
    <v-container grid-list-xs class="d-flex justify-space-between" fluid>
      <p class="text-h6 font-weight-bold">Installation - {{installation._id}}</p>
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
            <v-col cols="3" v-if="installation.meter_id">{{installation.meter_id.serial_number}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Model:</v-col>
            <v-col cols="3" v-if="installation.meter_id">{{installation.meter_id.product_id.category}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Type:</v-col>
            <v-col cols="3" v-if="installation.meter_id">{{installation.meter_id.product_id.type}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Size:</v-col>
            <v-col cols="3" v-if="installation.meter_id">{{installation.meter_id.product_id.size}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Date Added:</v-col>
            <v-col cols="3" v-if="installation.meter_id">{{convertDateTime(installation.meter_id.date_added)}}</v-col>
        </v-row>

        <!-- Test Details -->
        <p class="text-subtitle-1 font-weight-bold pt-8 pb-4">Installation Details</p>

        <!-- Test Status -->
        <v-row>
            <v-col cols="2">
                <p>Installation Status:</p>
            </v-col>
            <v-col cols="3" v-if="installation">{{installation.installation_status}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Client Name:</v-col>
            <v-col cols="3" v-if="installation">{{installation.client}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Region:</v-col>
            <v-col cols="3" v-if="installation">{{installation.region}}</v-col>
        </v-row>

        <v-row >
            <v-col cols="2">Transaction Date:</v-col>
            <v-col cols="3" v-if="installation">{{convertDate(installation.transaction_date)}}</v-col>
        </v-row>

        <!-- Lab Test Date -->
        <v-row v-if="installation.test_date">
            <v-col cols="2">
                <p >Test Date:</p>
            </v-col>
            <v-col cols="">
                <p v-if="installation.test_date">{{ convertDate(installation.test_date) }}</p>
            </v-col>
        </v-row>

        <!-- installation Date -->
        <v-row v-if="installation.test_date" >
            <v-col cols="2" >
                <p>Tester:</p>
            </v-col>
            <v-col cols="2">
                <p v-if="installation.tester">{{ installation.tester }}</p>
            </v-col>
        </v-row>

        <!-- installation Comments -->
        <v-row v-if="installation.comments" >
            <v-col cols="2">
                <p>Comments:</p>
            </v-col>
            <v-col cols="5">
                <p v-if="installation.comments">{{ installation.comments }}</p>
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
    import { getAInstallation } from '@/tools/api.js';
    import { convertDate, convertDateTime } from '@/tools/convertDateTime';
    import editTestResultModal from '@/components/editTestResultModal.vue';



  export default {
    name: 'InstallationDetailsView',
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
            installation:[],
            history:[],
            labResult: null,
            testDate: null,
            tester: null,
            snackbar: false,
            text: "Lab Test Updated"
        }
    },
    created(){
        this.loadInstallation()
    },
    watch: {
      '$route.query.installationUpdated': {
        immediate: true,
        handler(value) {
          if (value === 'true') {
            this.loadinstallation()
            this.snackbar = true;// Show the snackbar
          }
        }
      }
    },
    methods:{
        convertDate,convertDateTime,
        async loadInstallation(){
            this.showOverlay = true
            const result = await getAInstallation( this.id )
            this.installation = result.installation
            this.showOverlay = false
        },
    }

  }
  </script>
  