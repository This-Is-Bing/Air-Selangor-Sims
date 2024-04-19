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
                                <v-col cols="4">Inventory Type:</v-col>
                                <v-col cols="8" class="text-capitalize">
                                    <v-chip v-if="meter.status == 'new'" close class="text-subtitle-2 " color="warning" prepend-icon="fa-regular fa-clock">
                                        New
                                    </v-chip>

                                    <v-chip v-if="meter.status == 'client'" close class="text-subtitle-2" color="success" prepend-icon="fa-regular fa-circle-check">
                                        Client
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
                            <!-- Inventory Type -->
                            <v-row>
                                <v-col cols="4">Test Result:</v-col>
                                <v-col cols="8" class="text-capitalize">
                                    <!-- <v-chip v-if="labtest && labtest.test_status== 'new'" close class="text-subtitle-2 " color="warning" prepend-icon="fa-regular fa-clock">
                                        Pending
                                    </v-chip> -->

                                    <!-- <v-chip v-if="labtest.test_status&&labtest.test_status == 'Passed'" close class="text-subtitle-2" color="success" prepend-icon="fa-regular fa-circle-check">
                                        Passed
                                    </v-chip>

                                    <v-chip v-if="labtest.test_status&&labtest.test_status == 'Failed'" close class="text-subtitle-2" color="success" prepend-icon="fa-regular fa-circle-check">
                                        Failed
                                    </v-chip> -->
                                </v-col>
                            </v-row>

                            <!-- Date Tested -->
                            <v-row>
                                <v-col cols="4">Date Tested:</v-col>
                                <!-- <v-col cols="8" v-if="labtest.test_date" >{{ labtest.test_date }}</v-col> -->
                            </v-row>

                            <!-- Testing Personel -->
                            <v-row>
                                <v-col cols="4">Tester:</v-col>
                                <!-- <v-col cols="8"  v-if="labtest.tester">{{ labtest.tester }}</v-col> -->
                            </v-row>
                            {{ labtest }}
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

                     <!-- Installation Details -->
                    <p class="text-subtitle-1 font-weight-bold pt-10 pb-5">Installation Details</p>
                    <v-row>
                        <v-col cols="8">
                            <!-- Installation ID -->
                            <v-row>
                                <v-col cols="4">Installation ID:</v-col>
                                <v-col cols="8">{{"TBD"}}</v-col>
                            </v-row>

                            <!-- Region -->
                            <v-row>
                                <v-col cols="4">Region:</v-col>
                                <v-col cols="8">{{"TBD"}}</v-col>
                            </v-row>

                            <!-- Client Name -->
                            <v-row>
                                <v-col cols="4">Contact Name:</v-col>
                                <v-col cols="8"> {{ "TBD" }}</v-col>
                            </v-row>

                            <!-- Installer Name -->
                            <v-row>
                                <v-col cols="4">Installer Name:</v-col>
                                <v-col cols="8"> {{ "TBD" }}</v-col>
                            </v-row>

                            <!-- Installation Date -->
                            <v-row>
                                <v-col cols="4">Installation Date:</v-col>
                                <v-col cols="8"> {{ "TBD" }}</v-col>
                            </v-row>

                        </v-col>

                        <v-col cols="4">
                            <v-btn color="secondary" size="small" prepend-icon="fa-regular fa-up-right-from-square" class="text-none" >Installation</v-btn>
                        </v-col>
                    </v-row>

                </v-col>

                <!-- Meter Vertical Timeline -->
                <v-col cols="5"   >
                    <p class="text-subtitle-1 font-weight-bold pt-2 pb-5">Meter History</p>
                    <v-timeline side="end" align="start" density="compact" style="max-width: 450px;" >
                        <v-timeline-item
                            v-for="item in items"
                            :key="item.id"
                            :dot-color="item.color"
                            size="x-small"
                            density="compact"
                        >
                            <v-row>
                                <v-col cols="2" class="d-flex flex-column align-center">
                                    <p class="font-weight-bold text-caption">12 April</p>
                                    <p class="text-grey text-subtitle-2 ">2024</p>
                                </v-col>
                                <v-col cols="10" class="d-flex">
                                    <v-alert :color="item.color" icon="fa-regular fa-circle-info" :value="true" title="Hello" class="elevation-1 py-8" style="min-width: 200px; border-left: 5px blue solid; border-radius: 10px;" >
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
</template>
  
<script>
import { getALabTestByMeterID } from "@/tools/api";
import { convertDateTime } from "@/tools/convertDateTime";
import userInfo from "@/userInfo";

  export default {
    name: "meterDetails",
    props: {
      meter: Array,
    },
    watch: {
        // Watch the 'meter._id' for changes
        'meter._id'(newVal) {
            if (newVal) {
                this.loadLabtest();
            }
        },
    },
    data(){
        return{
            username: userInfo.name,
            labtest: null,
            labtestID: null,
            items: [
                {
                id: 1,
                color: 'secondary',
                icon: 'mdi-information',
                content:'asdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadads'
                },
                {
                id: 2,
                color: 'secondary',
                icon: 'mdi-alert-circle',
                content:'asdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadads'

                },
                {
                id: 2,
                color: 'error',
                icon: 'mdi-alert-circle',
                content:'asdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadads'

                },
                {
                id: 2,
                color: 'error',
                icon: 'mdi-alert-circle',
                content:'asdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadads'

                },
                {
                id: 2,
                color: 'error',
                icon: 'mdi-alert-circle',
                content:'asdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadads'

                },
                {
                id: 2,
                color: 'error',
                icon: 'mdi-alert-circle',
                content:'asdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadadsasdasdadads'

                },
            ],
        }
    },
    methods:{
        convertDateTime,
        async loadLabtest(){
        await getALabTestByMeterID(this.meter._id)
        .then((response) => {
            this.labtest = response.labtest[0]
            this.labtestID = this.labtest._id
        }).catch((error) => {
            console.error('Error fetching labtest:', error);
        });

    }
}
}
  </script>
  