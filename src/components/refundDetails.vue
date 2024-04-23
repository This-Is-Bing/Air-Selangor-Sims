<template>
    <!-- refund Details -->
    <v-container class="pt-0 " fluid>
        <v-container fluid>
            <v-row>
                <!-- Details -->
                <v-col cols="7" >
                    <!-- Primary Details -->

                    <p class="text-subtitle-1 font-weight-bold pt-2 pb-5">Refund Particular</p>
                    <v-row>
                        <v-col cols="8">
                            <!-- refund ID -->
                            <v-row >
                            <v-col cols="4">Refund ID:</v-col>
                            <v-col cols="8">{{refund._id}}</v-col>
                            </v-row>

                            <!-- meter ID -->
                            <v-row>
                            <v-col cols="4">Serial Number:</v-col>
                            <v-col cols="8" v-if="refund.meter_id">{{refund.meter_id.serial_number}}</v-col>
                            </v-row>

                            <!-- Product Name -->
                            <v-row>
                            <v-col cols="4">Product Name:</v-col>
                            <v-col cols="8" v-if="refund.meter_id">{{refund.meter_id.product_id.name}}</v-col>
                            </v-row>

                             <!-- Refund Status -->
                            <v-row>
                            <v-col cols="4">Refund Status:</v-col>
                            <v-col>
                                <v-chip close v-if="refund.refund_status == 'New'" color="warning" prepend-icon="fa-regular fa-clock">Pending Lab Test</v-chip>
                                <v-chip close v-if="refund.refund_status == 'refund_LT_Done'" color="history_red_border" prepend-icon="fa-regular fa-clock">Refund Lab Test Done</v-chip>
                            </v-col>
                            </v-row>

                            <!-- Defect -->
                            <v-row>
                                <v-col cols="4">Defect:</v-col>
                                <v-col cols="8">{{ refund.defect }}</v-col>
                            </v-row>

                            <!-- Request Date -->
                            <v-row>
                                <v-col cols="4">Request Date:</v-col>
                                <v-col cols="8">{{ convertDateTime(refund.request_date) }}</v-col>
                            </v-row>

                            <!-- Requestor -->
                            <v-row>
                                <v-col cols="4">Requestor:</v-col>
                                <v-col cols="8" v-if="refund.requester">{{ refund.requester.name }}</v-col>
                            </v-row>

                        </v-col>
                    </v-row>


                    <!-- Client Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Client Details</p>
                    <v-row v-if="clientName">
                        <v-col cols="8">
                            <!-- client name -->
                            <v-row>
                                <v-col cols="4">Client Name:</v-col>
                                <v-col cols="8">{{ clientName }}</v-col>
                            </v-row>

                            <!-- region -->
                            <v-row>
                                <v-col cols="4">Region:</v-col>
                                <v-col cols="8">{{ region }}</v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row v-else >
                        <v-col cols="8">
                           <p class="text-grey text-subtitle-2" >Meter Not Installed</p>
                        </v-col>
                    </v-row>


                    <!-- Lab Test Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Lab Test Details</p>
                    <v-row>
                        <v-col cols="8">
                            <!-- Date Tested -->
                            <v-row>
                                <v-col cols="4">Lab Test ID:</v-col>
                                <v-col cols="8" >{{ labtestID }}</v-col>
                                <!-- <v-col cols="8" v-else >N/A</v-col> -->
                            </v-row>

                            <!-- Test Status -->
                            <v-row>
                                <v-col cols="4">Test Status:</v-col>
                                <v-col cols="8" class="text-capitalize">

                                    <v-chip v-if="labtestStatus== 'New'" close class="text-subtitle-2 " color="warning" prepend-icon="fa-regular fa-clock">
                                        Pending Lab Test
                                    </v-chip>

                                    <v-chip v-if="labtestStatus == 'Passed'" close class="text-subtitle-2" color="success" prepend-icon="fa-regular fa-circle-check">
                                        Passed
                                    </v-chip>

                                    <v-chip v-if="labtestStatus == 'Failed'" close class="text-subtitle-2" color="error" prepend-icon="fa-regular fa-circle-check">
                                        Failed
                                    </v-chip> 
                                </v-col>
                            </v-row>

                            <!-- Date Tested -->
                            <v-row>
                                <v-col cols="4" v-if="labtestDate">Date Tested:</v-col>
                                <v-col cols="8" v-if="labtestDate" >{{ labtestDate }}</v-col>
                                <!-- <v-col cols="8" v-else >N/A</v-col> -->
                            </v-row>

                            <!-- Testing Personel -->
                            <v-row>
                                <v-col cols="4" v-if="labtestTester">Tester:</v-col>
                                <v-col cols="8"  v-if="labtestTester">{{ labtestTester }}</v-col>
                                <!-- <v-col cols="8" v-else >N/A</v-col> -->
                            </v-row>

                            <!-- Comments -->
                            <v-row>
                                <v-col cols="4" v-if="labtestComments">Comments:</v-col>
                                <v-col cols="8" v-if="labtestComments">{{ labtestComments }}</v-col>
                                <!-- <v-col cols="8" v-else >N/A</v-col> -->
                            </v-row>

                        </v-col>
                        <v-col cols="4">
                            <v-btn 
                                color="secondary" 
                                size="small" 
                                prepend-icon="fa-regular fa-up-right-from-square" 
                                class="text-none"
                                @click="this.$router.push({ name: 'LabTestDetails', query: { id: labtestID } })"
                            >
                                Lab Test
                            </v-btn>
                        </v-col>
                    </v-row> 

                </v-col>



                <!-- refund Vertical Timeline -->
                <v-col cols="5" style="max-height: max-content;">
                    <p class="text-subtitle-1 font-weight-bold pt-2 pb-5">Meter History</p>
                    <p v-if="history==null">No History Available</p>
                    <v-timeline side="end" align="start" density="compact" style="min-width: 400px;max-width: 450px; max-height: max-content;">
                        <v-timeline-item
                            v-for="item in history"
                            :key="item.meter_id"
                            dot-color=""
                            hide-dot=""
                            size="x-small"
                            density="compact"
                        >

                            <!-- Item Added: Type:Item Yellow -->
                            <v-row v-if="item.type =='item'">
                                <v-col cols="2" class="d-flex flex-column align-center">
                                    <p class="font-weight-bold text-caption">{{convertDate(item.updated_at)}}</p>
                                </v-col>
                                <v-col cols="10" class="d-flex">
                                    <v-alert color="history_yellow" :value="true" small class=" elevation-1 py-8 text-caption border-s-lg border-history_yellow_border border-opacity-100 " >
                                        <v-row class="mb-1">
                                            <v-col cols="1">
                                                <v-icon icon="fa-regular fa-circle-info" color="history_yellow_border"></v-icon>
                                            </v-col>
                                            <v-col>
                                                <p class="text-subtitle-2 text-history_yellow_border" >{{item.header}}</p> 
                                            </v-col>  
                                        </v-row>
                                        <span class="font-weight-bold">{{convertTime(item.updated_at)}} Hours:</span>       
                                        {{item.content}}
                                    </v-alert>
                                </v-col>
                            </v-row>

                            <!-- Lab Test: Type:labtest blue -->
                            <v-row v-if="item.type =='labtest'">
                                <v-col cols="2" class="d-flex flex-column align-center">
                                    <p class="font-weight-bold text-caption">{{convertDate(item.updated_at)}}</p>
                                </v-col>
                                <v-col cols="10" class="d-flex">
                                    <v-alert color="history_blue" :value="true" small class=" elevation-1 py-8 text-caption border-s-lg border-history_blue_border border-opacity-100 " >
                                        <v-row class="mb-1">
                                            <v-col cols="1">
                                                <v-icon icon="fa-regular fa-circle-info" color="history_blue_border"></v-icon>
                                            </v-col>
                                            <v-col>
                                                <p class="text-subtitle-2 text-history_blue_border" >{{item.header}}</p> 
                                            </v-col>  
                                        </v-row>
                                        <span class="font-weight-bold">{{convertTime(item.updated_at)}} Hours:</span>       
                                        {{item.content}}
                                    </v-alert>
                                </v-col>
                            </v-row>

                            <!-- Installation: Type:installation purple -->
                            <v-row v-if="item.type =='installation'">
                                <v-col cols="2" class="d-flex flex-column align-center">
                                    <p class="font-weight-bold text-caption">{{convertDate(item.updated_at)}}</p>
                                </v-col>
                                <v-col cols="10" class="d-flex">
                                    <v-alert color="history_purple" :value="true" small class=" elevation-1 py-8 text-caption border-s-lg border-history_purple_border border-opacity-100 " >
                                        <v-row class="mb-1">
                                            <v-col cols="1">
                                                <v-icon icon="fa-regular fa-circle-info" color="history_purple_border"></v-icon>
                                            </v-col>
                                            <v-col>
                                                <p class="text-subtitle-2 text-history_purple_border" >{{item.header}}</p> 
                                            </v-col>  
                                        </v-row>
                                        <span class="font-weight-bold">{{convertTime(item.updated_at)}} Hours:</span>       
                                        {{item.content}}
                                    </v-alert>
                                </v-col>
                            </v-row>

                            <!-- Refund: Type:refund red -->
                            <v-row v-if="item.type =='refund'">
                                <v-col cols="2" class="d-flex flex-column align-center">
                                    <p class="font-weight-bold text-caption">{{convertDate(item.updated_at)}}</p>
                                </v-col>
                                <v-col cols="10" class="d-flex">
                                    <v-alert color="history_red" :value="true" small class=" elevation-1 py-8 text-caption border-s-lg border-history_red_border border-opacity-100 " >
                                        <v-row class="mb-1">
                                            <v-col cols="1">
                                                <v-icon icon="fa-regular fa-circle-info" color="history_red_border"></v-icon>
                                            </v-col>
                                            <v-col>
                                                <p class="text-subtitle-2 text-history_red_border" >{{item.header}}</p> 
                                            </v-col>  
                                        </v-row>
                                        <span class="font-weight-bold">{{convertTime(item.updated_at)}} Hours:</span>       
                                        {{item.content}}
                                    </v-alert>
                                </v-col>
                            </v-row>
                        </v-timeline-item>
                    </v-timeline>

                    
                  
                </v-col>
                
            </v-row>
        </v-container>
    </v-container>
    <v-snackbar v-model="snackbar" color="primary" >
      <v-icon icon="fa-solid fa-circle-check" color="success" class="mr-3" ></v-icon> {{ text }} 
      <template v-slot:actions>
        <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-regular fa-xmark"></v-btn>
      </template>
    </v-snackbar>
</template>
  
<script>
import { getAHistoryByMeterID, getAInstallationByMeterID, getALabTestByMeterID } from "@/tools/api";
import { convertDate, convertDateTime, convertTime } from "@/tools/convertDateTime";
import userInfo from "@/userInfo";

  export default {
    name: "refundDetailsModal",
    components: {   },
    props: {
      refund: Array,
    },
    watch: {
        // Watch the 'refund._id' for changes
        'refund._id'(newVal) {
            if (newVal) {
                this.showOverlay = true
                this.loadLabtest();
                this.loadHistory();
                this.loadInstallation();
                // this.loadRefund()
            }
        },
    //     '$route.query.refundCreated': {
    //     immediate: true,
    //     handler(value) {
    //       if (value === 'true') {
    //         this.loadRefund();
    //         this.loadHistory();
    //         this.loadLabtest();
    //         this.snackbar = true;// Show the snackbar

    //       }
    //     }
    //   }
    },
    data(){
        return{
            username: userInfo.name,

            // labtest Info
            labtest: null,
            labtestID: null,
            labtestComments: null,
            labtestTester: null,
            labtestDate: null,
            labtestStatus: null,

            // Installation
            installation: null,
            installationID: null,
            installationStatus: null,
            installationDate: null,
            clientName: null,
            region: null,
            contractor: null,

            // Refund
            // refund:[],
            refundID: null,
            serialNumber: null,
            meter_id: null,
            productName: null,
            refundStatus: null,
            requester: null,
            requestDate: null,
            defect: null,


            // history
            history:null,

            snackbar:false,
            text: "Refund created"
        }
    },
    methods:{
        convertDateTime,
        convertDate,
        convertTime,

        async loadLabtest(){
        await getALabTestByMeterID(this.refund.meter_id._id)
        .then((response) => {
            this.labtest = response.labtest[0]
            this.labtestID = this.labtest._id
            this.serialNumber = this.labtest.meter_id.serial_number
            this.meter_id = this.labtest.meter_id._id
            this.labtestComments = this.labtest.comments
            this.labtestTester = this.labtest.tester
            this.labtestDate = this.labtest.test_date
            this.labtestStatus = this.labtest.test_status
        }).catch((error) => {
            console.error('Error fetching labtest:', error);
        }).finally(()=>{
            this.showOverlay = false
        });
        },
        async loadHistory(){
            const result = await getAHistoryByMeterID( this.refund.meter_id._id )
            this.history = result.history
            this.showOverlay = false
        },
        async loadInstallation(){
        await getAInstallationByMeterID(this.refund.meter_id._id)
        .then((response) => {
            this.installation = response.installation[0]
            this.installationID = this.installation._id
            this.installationStatus = this.installation.installation_status
            this.installationDate = this.installation.installation_date  
            this.clientName = this.installation.client  
            this.region = this.installation.region  
            this.contractor = this.installation.contractor  
        }).catch((error) => {
            console.error('Error fetching installation:', error);
        }).finally(()=>{
            this.showOverlay = false
        });
        },
        // async loadRefund(){
        // await getARefundByMeterID(this.refund.meter_id._id)
        // .then(() => {
        //     this.refund = response.refund[0]
        //     this.refundID = this.refund._id
        //     this.serialNumber = this.refund.serial_number
        //     this.productName = this.refund.meter_id.product_id.name  
        //     this.requester = this.refund.requester.name  
        //     this.requestDate = this.refund.request_date  
        //     this.refund_status = this.refund.refund_status  
        //     this.defect = this.refund.defect  
        // }).catch((error) => {
        //     console.error('Error fetching refund:', error);
        // }).finally(()=>{
        //     this.showOverlay = false
        // });
        // },
}
}
  </script>
