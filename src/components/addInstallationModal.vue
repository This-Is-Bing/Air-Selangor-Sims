<template>
    <v-dialog max-width="500" scrollable max-height="800">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Create Installation"
            variant="flat"
            size="small"
            color="history_purple_border" 
            class="text-none elevation-1"
            ></v-btn>
        </template>
        
        <template v-slot:default="{ isActive }">
            <v-card  title="Create Refund">

                <v-text-field
                    v-model='a'
                    class="px-6 pt-3"
                    label="Region"
                    density="comfortable"
                    variant="outlined"
                    readonly
                >
                </v-text-field>

                <v-autocomplete
                    v-model="defect"
                    class="px-6 pt-2"
                    label="Defects"
                    density="comfortable"
                    :items="defectOptions"
                    variant="outlined"
                >
                </v-autocomplete>

                <!-- <v-text-field
                    v-model="serialNumber"
                    class="px-6 pt-2"
                    label="Serial Number"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field> -->

                <!-- <v-text-field
                    v-model="region"
                    class="px-6 pt-3"
                    label="Region"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field> -->


                <!-- <v-text-field
                    class="px-6 pt-2"
                    label="Age"
                    density="comfortable"
                    variant="outlined"
                    type="number"
                    v-model="age"
                >
                </v-text-field>

                <v-text-field
                    class="px-6 pt-2"
                    label="Milage"
                    density="comfortable"
                    variant="outlined"
                    type="number"
                    v-model="mileage"
                >
                </v-text-field> -->

                

                <!-- <v-container>
                    <p class="text-grey text-subtitle-1 pl-5 pb-4">Installation Date</p>
                    <v-row justify="center">
                        <v-date-picker color="secondary" hide-header v-model:model-value="installation_date" ></v-date-picker>
                    </v-row>
                </v-container> -->
    
                <!-- <v-container class="mt-n5">
                    <p class="text-grey text-subtitle-1 pl-5 pb-4">Warranty</p>

                    <v-row justify="center">
                        <v-date-picker color="secondary" hide-header v-model:model-value="warranty"></v-date-picker>
                    </v-row>
                </v-container> -->

                <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Discard"
                        variant="flat"
                        color=" text-none text-subtitle-1" 
                        class="elevation-1"
                        @click="isActive.value = false"
                    >
                    </v-btn>

                    <v-btn
                        text="Create Refund"
                        color="secondary text-none text-subtitle-1" 
                        variant="flat"
                        class="mx-5 elevation-1"
                        @click="submitForm() ; isActive.value = false; "
                    >
                    </v-btn>
                    
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>

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
import { createRefund } from '@/tools/api.js'
import { convertToISO } from '@/tools/convertDateTime'
import userInfo from '@/userInfo'
export default {
    name: "addInstallationModal",
    props:{
        meter_id: String,
        serial_number: String
    },
    data(){
        return{
            sn: this.serial_number,
            defect: null,
            defectOptions:[
            "1) Digit jumping at indicating device or totalizer",
            "2) Indicating device/totalizer crack naturally",
            "3) Leaking through indicating device, totalizer or register window",
            "4) No meter serial number",
            "5) Unidentified meter serial number",
            "6) Duplication of meter serial number",
            "7) Gear drive train failure due to manufacturing defect",
            "8) Leaking at any part of meter body and/or indicating device/totalizer",
            "9) Pinch hole at upper and/or lower body of water meter",
            "10) Threading defects",
            "11) Condensation inside counter register",
            "12) Misalignment of the indicating device/totalizer digits",
            "13) Connector and/or nut material and/or thread defects due to manufacturing",
            "14) Unidentified, unreadable and/or damages of QR code sticker due to manufacturing",
            "15) Sticker meter serial no differ from physical body water meter serial no",
            ],
            products:[],
            productNameList:[],
            productName: null,
            productId: null,
            serialNumber: null,
            showOverlay: false,
            menu:false,
        }
    },
    watch:{

    },
    created(){
    },
    methods:{
    
        // Function to convert date time
        convertToISO,

       
        
        // submit form action
        async submitForm(){
            this.showOverlay = true

            const newRefund = {
                "meter_id": this.meter_id,
                "requester": userInfo.store_id,
                "request_date": convertToISO(Date.now()),
                "defect": this.defect,
            }

            try {
                await createRefund(newRefund)
                .then(() => {
                    
                    this.$router.push({ name: 'meterDetails', query: {id:this.meter_id ,refundCreated: 'true' } })
                    .then(() => {
                        this.$router.replace({ name: 'meterDetails', query: {id:this.meter_id} });
                    });
                }).catch((error) => {
                    console.log(error.message);
                });
            } catch (error) {
                console.error("Failed to create meter;", error);
            } finally{
                this.showOverlay = false
            }

        }
    }
}
</script>

<style>

</style>