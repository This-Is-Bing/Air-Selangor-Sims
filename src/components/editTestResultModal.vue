<template>
    <v-dialog max-width="500" scrollable max-height="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Edit Result"
            variant="flat"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>
        
        <template v-slot:default="{ isActive }">
            <v-card  title="Lab Test">

                <v-autocomplete
                    v-model="testResult"
                    class="px-6 pt-3"
                    label="Test Result"
                    density="comfortable"
                    :items="testResultOptions"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-text-field
                    v-model="tester"
                    class="px-6 pt-2"
                    label="Tester"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-container>
                    <p class="text-grey text-subtitle-1 pl-5 pb-4">Test Date</p>
                    <v-row justify="center">
                        <v-date-picker color="secondary" hide-header v-model:model-value="testDate"></v-date-picker>
                    </v-row>
                </v-container>

                <v-textarea
                    v-model="comments"
                    class="px-6 pt-2"
                    label="Comments"
                    density="comfortable"
                    variant="outlined"
                >
                </v-textarea>

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
                        text="Save"
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
import { createMeter, getAllProducts } from '@/tools/api.js'
import { convertToISO } from '@/tools/convertDateTime'
import userInfo from '@/userInfo'
export default {
    name: "editTestResult",
    data(){
        return{
            testResultOptions:["Passed", "Failed", "New"],
            testResult: null,
            tester: null,
            testDate: new Date(),
            comments: null,
            products:[],
            productNameList:[],
            productName: null,
            productId: null,
            serialNumber: null,
            showOverlay: false,
            menu:false
        }
    },
    watch:{
        productName(newVal){
            this.findProductByName(newVal)
        }
    },
    created(){
        this.loadProduct()
    },
    methods:{
    
        // Function to convert date time
        convertToISO,

        // Loading product for option
        async loadProduct(){
            try {
                const response = await getAllProducts();
                this.products = response.products.map(product => ({
                    id: product._id ,
                    name: product.name, 
                    }));
                    } catch (error) {
                        console.error('Error fetching suppliers:', error);
                }
                this.productNameList = this.products.map(product =>product.name)
        },
        
        // Get product id by name
        findProductByName(name) {
            const product = this.products.find(product => product.name === name);
            if (product) {
                this.productId = product.id;
            } else {
                console.error('Supplier not found for the name:', name);
                this.productId = null; // Handle the case where no supplier is found
            }
        },

        // submit form action
        async submitForm(){
            this.showOverlay = true

            const newMeter = {
                "serial_number": this.serialNumber,
                "product_id": this.productId,
                "store_id": userInfo.store_id,
  
            }

            try {
                await createMeter(newMeter)
                .then(() => {
                    this.serialNumber= null,
                    this.productId= 0,
                    
                    this.$router.push({ name: 'meter', query: { meterCreated: 'true' } })
                    .then(() => {
                        this.$router.replace({ name: 'meter', query: {} });
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
