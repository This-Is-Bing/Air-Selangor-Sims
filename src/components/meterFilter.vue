<template>
    <v-dialog max-width="700" >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Filters"
            variant="flat"
            color="primary text-none text-subtitle-1 "  
            prepend-icon="fa-solid  fa-arrow-down-wide-short"
            class="elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>

        <template v-slot:default="{  }">
            <v-card  prepend-icon="fa-solid fa-filter" title=" Custom Filter" >


                <v-row class="mt-2">
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="serial_number_category"
                            readonly
                            class="pl-2 pt-2"
                            label="Category"
                            density="comfortable"
                            :items="categories"
                            variant="outlined"
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="productCategory"
                            class="pt-2"
                            label="Operator"
                            density="comfortable"
                            :items="categories"
                            variant="outlined"
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">

                        <v-text-field
                            v-model="productSize"
                            class="pt-2 pr-2"
                            type="Value"
                            density="comfortable"
                            variant="outlined"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row class="">
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="model_category"
                            readonly
                            class="pl-2"
                            label="Category"
                            density="comfortable"
                            :items="categories"
                            variant="outlined"
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="productCategory"
                            class=""
                            label="Operator"
                            density="comfortable"
                            :items="categories"
                            variant="outlined"
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">

                        <v-text-field
                            v-model="productSize"
                            class=" pr-2"
                            type="Value"
                            density="comfortable"
                            variant="outlined"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row class="">
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="status_category"
                            readonly
                            class="pl-2"
                            label="Category"
                            density="comfortable"
                            :items="categories"
                            variant="outlined"
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="productCategory"
                            class=""
                            label="Operator"
                            density="comfortable"
                            :items="categories"
                            variant="outlined"
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">

                        <v-text-field
                            v-model="productSize"
                            class=" pr-2"
                            type="Value"
                            density="comfortable"
                            variant="outlined"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                




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
import { createProduct, getAllCategories, getAllSuppliers, getAllTypes } from '@/tools/api.js'
import { uploadFile } from '@/tools/imagekit'
export default {
    name: "addProductModal",
    data(){
        return{
            suppliers:[],
            supplierName:[],
            types:[],
            categories:["Serial Number", "Model", "Supplier", "Status"],
            operator:[''],
            serial_number_category: 'Serial Number',
            model_category: 'Model',
            status_category: 'Status',
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
        productSupplier(newVal){
            this.findSupplierByName(newVal)
        }
    },
    created(){
        this.loadSupplier()
        this.loadType()
        this.loadCategory()
    },
    methods:{

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

        const file = this.imageFile[0]

        try {
        const result = await uploadFile(file, '/Products');
            this.imageUrl = result.url
            const newProduct = {
            "name": this.productName,
            "imageURL": this.imageUrl,
            "category": this.productCategory,
            "type": this.productType,
            "size": this.productSize,
            "supplier_id": this.productSupplierId,
            "threshold": this.productThreshold
        }
            await createProduct(newProduct)
            .then(() => {

                this.productName= null,
                this.productCategory= null,
                this.productSize= 0,
                this.productSupplier= null,
                this.productSupplierId= null,
                this.productThreshold= 0,
                this.productType= null,
                this.imageFile = null,
                
                this.$router.push({ name: 'overview', query: { productCreated: 'true' } })
                .then(() => {
                    this.$router.replace({ name: 'overview', query: {} });
                });
                }).catch((error) => {
                    console.log(error.message);
                });
            } catch (error) {
                console.error("File upload failed:", error);
            } finally{
                this.showOverlay = false
            }

        }
    }
}
</script>

<style>

</style>