<template>
    <!-- Meter Details -->
    <v-container class="pt-0 " fluid>
        <v-container fluid>
            <v-row>
                <!-- Details -->
                <v-col cols="7" >
                    
                    <!-- Primary Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-2 pb-5">Meter Details</p>
                    <v-row>
                        <v-col cols="8">
                            <!-- name -->
                            <v-row >
                            <v-col cols="4">Serial Number:</v-col>
                            <v-col cols="8">{{meter.serial_number}}</v-col>
                            </v-row>

                            <!-- category -->
                            <v-row>
                            <v-col cols="4">Category:</v-col>
                            <v-col cols="8" v-if="meter && meter.product_id">{{meter.product_id.category}}</v-col>
                            </v-row>

                            <!-- type -->
                            <v-row>
                            <v-col cols="4">Type:</v-col>
                            <v-col cols="8" v-if="meter && meter.product_id">{{meter.product_id.type}}</v-col>
                            </v-row>

                            <!-- threshold -->
                            <v-row>
                            <v-col cols="4">Size:</v-col>
                            <v-col cols="8" v-if="meter && meter.product_id">{{meter.product_id.size}} mm</v-col>
                            </v-row>

                            <!-- updated -->
                            <v-row>
                            <v-col cols="4">Last Update:</v-col>
                            <v-col cols="8">{{convertDateTime(meter.updated_at)}}</v-col>
                            </v-row>
                        </v-col>
                        
                        <v-col cols="4" class="align-self-center">
                            <v-img
                                v-if="meter && meter.product_id"
                                :src="meter.product_id.imageURL"
                                :width="200"
                                aspect-ratio="1/1"
                                cover
                            ></v-img>
                        </v-col>
                    </v-row>


                    <!-- Supplier Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Supplier Details</p>
                    <v-row>
                        <v-col cols="8">
                            <!-- supplier name -->
                            <v-row>
                                <v-col cols="4">Supplier Name:</v-col>
                                <v-col cols="8" v-if="meter && meter.product_id">{{meter.product_id.supplier_id.name}}</v-col>
                            </v-row>

                            <!-- supplier contact -->
                            <v-row>
                                <v-col cols="4">Contact Number:</v-col>
                                <v-col cols="8" v-if="meter && meter.product_id">{{meter.product_id.supplier_id.contact}}</v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <!-- Inventory Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Inventory Details</p>
                    <v-row>
                        <v-col cols="8">
                            <!-- Inventory Type -->
                            <v-row>
                                <v-col cols="4">Meter Status:</v-col>
                                <v-col cols="8" class="text-capitalize">
                                    <v-chip v-if="meter.status == 'new'" close class="text-subtitle-2 " color="history_blue_border" prepend-icon="fa-solid fa-clock">
                                    Pending Lab Test
                                    </v-chip>
                                    <v-chip v-if="meter.status == 'LT_Done'" close class="text-subtitle-2 " color="history_purple_border" prepend-icon="fa-solid fa-clock">
                                    Lab Test Done
                                    </v-chip>
                                    <v-chip v-if="meter.status == 'installed'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid fa-circle-check">
                                    Installed
                                    </v-chip>
                                    <v-chip v-if="meter.status == 'refund_lab_test_pending'" close class="text-subtitle-2" color="history_red_border" prepend-icon="fa-solid fa-circle-check">
                                    Pending Refund Test
                                    </v-chip>
                                    <v-chip v-if="meter.status == 'refund_LT_Done'" close class="text-subtitle-2" color="history_red_border" prepend-icon="fa-solid fa-circle-check">
                                    Refund Test Done
                                    </v-chip>
                                    <v-chip v-if="meter.status == 'refund_accepted'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid fa-circle-check">
                                    Refund Accepted
                                    </v-chip>
                                    <v-chip v-if="meter.status == 'refund_rejected'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid fa-circle-check">
                                    Refund Rejected
                                    </v-chip>

                                </v-col>
                                
                            </v-row>

                            <!-- Store -->
                            <v-row>
                                <v-col cols="4">Location:</v-col>
                                <v-col cols="8" v-if="meter && meter.store_id">{{ meter.store_id.name }}</v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">Contact:</v-col>
                                <v-col cols="8" v-if="meter && meter.store_id">{{ meter.store_id.contact }}</v-col>
                            </v-row>

                            <!-- Date Added -->
                            <v-row>
                                <v-col cols="4">Date Added:</v-col>
                                <v-col cols="8">{{convertDateTime(meter.date_added)}}</v-col>
                            </v-row>
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

                                    <v-chip v-if="labtestStatus== 'New'" close class="text-subtitle-2 " color="warning" prepend-icon="fa-solid fa-clock">
                                        Pending Lab Test
                                    </v-chip>

                                    <v-chip v-if="labtestStatus == 'Passed'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid fa-circle-check">
                                        Passed
                                    </v-chip>

                                    <v-chip v-if="labtestStatus == 'Failed'" close class="text-subtitle-2" color="error" prepend-icon="fa-solid fa-circle-check">
                                        Failed
                                    </v-chip> 
                                </v-col>
                            </v-row>

                            <!-- Date Tested -->
                            <v-row>
                                <v-col cols="4" v-if="labtestDate">Date Tested:</v-col>
                                <v-col cols="8" v-if="labtestDate" >{{ convertDate(labtestDate) }}</v-col>
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
                                prepend-icon="fa-solid fa-up-right-from-square" 
                                class="text-none"
                                @click="this.$router.push({ name: 'LabTestDetails', query: { id: labtestID } })"
                            >
                                Lab Test
                            </v-btn>
                        </v-col>
                    </v-row>

                     <!-- Installation Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Installation Details</p>
                    <v-row v-if="installationID">
                        <v-col cols="8">

                             <!-- Installation ID -->
                             <v-row>
                                <v-col cols="4">Installation ID:</v-col>
                                <v-col cols="8">{{ installationID }}</v-col>
                            </v-row>

                            <!-- Installation ID -->
                            <v-row>
                                <v-col cols="4">Installation Status:</v-col>
                                <v-col cols="8" class="text-capitalize">
                                    <v-chip v-if="installationStatus== 'New' || installationStatus== 'Uninstalled' " close class="text-subtitle-2 " color="warning" prepend-icon="fa-solid fa-clock">
                                        Not Installed
                                    </v-chip>

                                    <v-chip v-if="installationStatus == 'Installed'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid fa-circle-check">
                                        Installed
                                    </v-chip>

                                </v-col>
                            </v-row>

                            <!-- Region -->
                            <v-row>
                                <v-col cols="4" v-if="Region">Region:</v-col>
                                <v-col cols="8" v-if="Region">{{ Region }}</v-col>
                            </v-row>

                            <!-- Client Name -->
                            <v-row>
                                <v-col cols="4" v-if="clientName">Client:</v-col>
                                <v-col cols="8" v-if="clientName"> {{ clientName }}</v-col>
                            </v-row>

                            <!-- Installer Name -->
                            <v-row>
                                <v-col cols="4" v-if="contractor">Contractor</v-col>
                                <v-col cols="8" v-if="contractor"> {{ contractor }}</v-col>
                            </v-row>

                            <!-- Installation Date -->
                            <v-row>
                                <v-col cols="4" v-if="installationDate">Installation Date:</v-col>
                                <v-col cols="8" v-if="installationDate"> {{ convertDate(installationDate) }}</v-col>
                            </v-row>

                        </v-col>

                        <v-col cols="4">
                            <v-btn 
                            color="secondary" 
                            size="small" 
                            prepend-icon="fa-solid fa-up-right-from-square" 
                            class="text-none" 
                            @click="this.$router.push({ name: 'installationDetails', query: { id: installationID } })"
                            >Installation</v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="8">
                            <p class="text-subtitle-2 text-grey">No Installation found (Complete lab test to create installation)</p>
                        </v-col>
                        <v-col cols="4" v-if="labtestStatus !== 'New'">
                            <v-btn color="history_purple_border" size="small" class="text-none" @click="createInstallation">Create Installation</v-btn>
                        </v-col>
                    </v-row>

                    <!-- Refund Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Refund Details</p>


                    <v-row v-if="refundID">
                        <v-col cols="8">

                             <!-- Refund ID -->
                             <v-row>
                                <v-col cols="4">Refund ID:</v-col>
                                <v-col cols="8">{{ refundID }}</v-col>
                            </v-row>

                            <!-- Request status-->
                            <v-row>
                                <v-col cols="4">Refund Status:</v-col>
                                <v-col cols="8" class="text-capitalize">
                                    <v-chip v-if="refund_status== 'New' " close class="text-subtitle-2 " color="history_red_border" prepend-icon="fa-solid fa-clock">
                                        Pending Refund Test
                                    </v-chip>

                                    <v-chip v-if="refund_status == 'refund_LT_Done'" close class="text-subtitle-2" color="history_red_border" prepend-icon="fa-solid fa-circle-check">
                                        Refund Test Done
                                    </v-chip>
                                    <v-chip v-if="refund_status == 'refund_accepted'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid fa-circle-check">
                                        Refund Accepted
                                    </v-chip>
                                    <v-chip v-if="refund_status == 'refund_rejected'" close class="text-subtitle-2" color="history_red_border" prepend-icon="fa-solid fa-circle-check">
                                        Refund Rejected
                                    </v-chip>

                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4" v-if="requestDate">Request Date:</v-col>
                                <v-col cols="8" v-if="requestDate"> {{ convertDate(requestDate) }}</v-col>
                            </v-row>

                            <v-row v-if="refundDate">
                                <v-col cols="4" v-if="requester">Refund Date:</v-col>
                                <v-col cols="8" v-if="requester">{{ convertDate(refundDate) }}</v-col>
                            </v-row>
                            <!-- Requestor -->
                            <v-row>
                                <v-col cols="4" v-if="requester">Requestor:</v-col>
                                <v-col cols="8" v-if="requester">{{ requester }}</v-col>
                            </v-row>

                            <!-- Defects -->
                            <v-row>
                                <v-col cols="4" v-if="requestDate">Defect:</v-col>
                                <v-col cols="8" v-if="requestDate"> {{ defect }}</v-col>
                            </v-row>

                            

                        </v-col>

                        <v-col cols="4">
                            <v-btn 
                            color="secondary" 
                            size="small" 
                            prepend-icon="fa-solid fa-up-right-from-square" 
                            class="text-none" 
                            @click="this.$router.push({ name: 'refundDetails', query: { id: refundID } })"
                            >Refund</v-btn>
                        </v-col>
                    </v-row>

                    <v-row v-else>
                        <v-col cols="8">
                            <p class="text-subtitle-2 text-grey">No refund found (Complete lab test to create refund)</p>
                        </v-col>
                        <v-col cols="4" v-if="labtestStatus !== 'New'">
                            <add-refund-modal v-if="serialNumber" :meter_id="meter_id" :serial_number="serialNumber"></add-refund-modal>
                        </v-col>
                    </v-row>

                </v-col>



                <!-- Meter Vertical Timeline -->
                <v-col cols="5" style="max-height: max-content;">
                    <p class="text-subtitle-1 font-weight-bold pt-2 pb-5">Meter History</p>
                    <p v-if="history==null">No History Available</p>
                    <div>
                        <v-timeline side="end" align="start" density="compact" class="pa-0 ma-0">
                        <!-- style="min-width: 400px;max-width: 450px; max-height: max-content;" -->
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
                                                <v-icon icon="fa-solid fa-circle-info" color="history_yellow_border"></v-icon>
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
                                                <v-icon icon="fa-solid fa-circle-info" color="history_blue_border"></v-icon>
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
                                                <v-icon icon="fa-solid fa-circle-info" color="history_purple_border"></v-icon>
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
                                                <v-icon icon="fa-solid fa-circle-info" color="history_red_border"></v-icon>
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
                    </div>                
                </v-col>
                
            </v-row>
        </v-container>
    </v-container>

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

    <v-snackbar v-model="snackbar" color="primary" >
      <v-icon icon="fa-solid fa-circle-check" color="success" class="mr-3" ></v-icon> {{ text }} 
      <template v-slot:actions>
        <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-solid fa-xmark"></v-btn>
      </template>
    </v-snackbar>
</template>
  
<script>
import { createInstallation, getAHistoryByMeterID, getAInstallationByMeterID, getALabTestByMeterID, getARefundByMeterID } from "@/tools/api";
import { convertDate, convertDateTime, convertTime } from "@/tools/convertDateTime";
import userInfo from "@/userInfo";
import AddRefundModal from "../addRefundModal.vue";

  export default {
    name: "meterDetails",
    components: {  AddRefundModal },
    props: {
      meter: Array,
    },
    watch: {
        // Watch the 'meter._id' for changes
        'meter._id'(newVal) {
            if (newVal) {
                this.showOverlay = true
                this.loadLabtest();
                this.loadHistory();
                this.loadInstallation();
                this.loadRefund()
            }
        },
        '$route.query.refundCreated': {
        immediate: true,
        handler(value) {
          if (value === 'true') {
            this.$emit('updateData')
            this.loadRefund();
            this.loadHistory();
            this.loadLabtest();
            this.snackbar = true;// Show the snackbar

          }
        }
      }
    },
    data(){
        return{
            showOverlay: false,
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
            refund:[],
            refundID: null,
            serialNumber: null,
            meter_id: null,
            productName: null,
            refundStatus: null,
            requester: null,
            requestDate: null,
            defect: null,
            refundDate: null,


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
        await getALabTestByMeterID(this.meter._id)
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
            const result = await getAHistoryByMeterID( this.meter._id )
            this.history = result.history
            this.showOverlay = false
        },
        async loadInstallation(){
        await getAInstallationByMeterID(this.meter._id)
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
        async loadRefund(){
        await getARefundByMeterID(this.meter._id)
        .then((response) => {
            this.refund = response.refund[0]
            this.refundID = this.refund._id
            this.serialNumber = this.refund.serial_number
            this.productName = this.refund.meter_id.product_id.name  
            this.requester = this.refund.requester.name  
            this.requestDate = this.refund.request_date  
            this.refund_status = this.refund.refund_status  
            this.defect = this.refund.defect  
            this.refundDate = this.refund.refund_date  
        }).catch((error) => {
            console.error('Error fetching refund:', error);
        }).finally(()=>{
            this.showOverlay = false
        });
        },
        async createInstallation() {
            this.showOverlay = true; // Show the overlay

            const new_installation = {
                meter_id: this.meter._id
            };

            try {
                const response = await createInstallation(new_installation);

                // Set a timer to hide the overlay after 2 seconds
                setTimeout(() => {
                    this.showOverlay = false; // Hide the overlay after 2 seconds
                }, 2000);

                this.installation = response.data.installation;
                this.installationID = this.installation._id;
                this.installationStatus = this.installation.installation_status;
                this.loadHistory();
            } catch (error) {
                console.error('Failed to create installation:', error);
                this.showOverlay = false; // Ensure overlay is hidden in case of error
            }
        }
}
}
  </script>
