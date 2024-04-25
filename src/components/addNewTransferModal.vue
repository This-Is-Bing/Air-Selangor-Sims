<template>
    <v-dialog max-width="500" >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Add Transfer"
            variant="flat"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card  title="New Transfer">
                
                <v-text-field
                    v-model="self_store_name"
                    readonly
                    class="px-6 pt-3"
                    label="Departure"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>
                

                <v-autocomplete
                    v-model="destination"
                    class="px-6 pt-2"
                    label="Destination"
                    density="comfortable"
                    :items="storeName"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-autocomplete
                    v-model="selectedMeter"
                    class="px-6 pt-2"
                    label="Select Meter"
                    density="comfortable"
                    :items="meterSerialNumber"
                    variant="outlined"
                    chips
                    closable-chips
                    multiple
                >
                </v-autocomplete>

                

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
                        text="Add Transfer"
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
import { createStockTransfer, getAllCategories, getAllMeters, getAllStores, getAllSuppliers, getAllTypes } from '@/tools/api.js'
import userInfo from '@/userInfo'
export default {
    name: "addNewTransfer",
    data(){
        return{
            self_store_name: userInfo.store_name,
            store:[],
            storeName:[],
            destinationID:null,
            departureID: null,
            destination: null,
            selectedMeter:null,
            meter:[],
            meterSerialNumber:[],


            suppliers:[],
            supplierName:[],
            types:[],
            categories:[],
            productName: null,
            productCategory: null,
            productSize: 0,
            productSupplier: null,
            productSupplierId: null,
            productThreshold: 0,
            productType: null,
            imageFile: null,
            imageUrl: null,
            showOverlay: false
        }
    },
    watch:{
        destination(newVal){
            this.findStoreByName(newVal)
            this.findStoreByNameForDeparture(this.self_store_name)
        },
        
    },
    created(){
        this.loadSupplier()
        this.loadType()
        this.loadCategory()
        this.loadStore()
        this.loadMeters()
    },
    methods:{
        async loadStore(){
        try {
            const response = await getAllStores();
            this.store = response.stores.map(store => ({
                id: store._id,
                name: store.name, 
                }));
                } catch (error) {
                    console.error('Error fetching stores:', error);
            }
            this.storeName = this.store.map(store =>store.name)

        },

        // Get supplier id from the name
        findStoreByName(name) {
        const store = this.store.find(store => store.name === name);
        if (store) {
            this.destinationID = store.id;
        } else {
            console.error('destinationID not found for the name:', name);
            this.destinationID = null; // Handle the case where no supplier is found
        }
        },
        // Get supplier id from the name
        findStoreByNameForDeparture(name) {
        const store = this.store.find(store => store.name === name);
        if (store) {
            this.departureID = store.id;
        } else {
            console.error('departureID not found for the name:', name);
            this.departureID = null; // Handle the case where no supplier is found
        }

        },

        async loadMeters(){
        try {
            const response = await getAllMeters();
            this.meter = response.meters.map(meter => ({
                serialNumber: meter.serial_number, 
                }));
                } catch (error) {
                    console.error('Error fetching meters:', error);
            }
            this.meterSerialNumber = this.meter.map(meter =>meter.serialNumber)

        },
    // Loading supplier for options
    async loadSupplier(){
        try {
            const response = await getAllSuppliers();
            this.suppliers = response.supplier.map(supplier => ({
                id: supplier._id ,
                name: supplier.name, 
                }));
                } catch (error) {
                    console.error('Error fetching suppliers:', error);
            }
            this.supplierName = this.suppliers.map(supplier =>supplier.name)
        },

    // Loading type for options
    async loadType(){
        await getAllTypes()
        .then((response) => {
            this.types = response.type.map(res => res.type);
        }).catch((error) => {
            console.error('Error fetching product type:', error);
        });
    },

    // Loading catergory for options
    async loadCategory(){
        await getAllCategories()
        .then((response) => {
            this.categories = response.category.map(res => res.category);
        }).catch((error) => {
            console.error('Error fetching product category:', error);
        });
    },

    // Get supplier id from the name
    findSupplierByName(name) {
    const supplier = this.suppliers.find(supplier => supplier.name === name);
    if (supplier) {
        this.productSupplierId = supplier.id;
    } else {
        console.error('Supplier not found for the name:', name);
        this.productSupplierId = null; // Handle the case where no supplier is found
    }
    },


    
    async submitForm(){
        this.showOverlay = true

        const new_stock = {
            "departure": this.departureID,
            "destination": this.destinationID,
            "meters": this.selectedMeter
        }

            await createStockTransfer(new_stock)
            .then(() => {

                this.departureID= null,
                this.destinationID= null,
                this.selectedMeter= [],
                
                this.$router.push({ name: 'stock', query: { stockCreated: 'true' } })
                .then(() => {
                    this.$router.replace({ name: 'stock', query: {} });
                });
                }).catch((error) => {
                    console.log(error.message);
                });
                this.showOverlay = false

        }
    }
}
</script>

<style>

</style>