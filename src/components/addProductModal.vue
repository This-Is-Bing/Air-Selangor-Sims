<template>
    <v-dialog max-width="500" >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Add Product"
            variant="flat"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card  title="New Product">

                <v-container grid-list-xs class="px-8 pb-0 pt-6" >
                    <VCol cols="12" sm="12" class="a7ign-center pa-0 ma-0">
                        <v-file-input 
                        v-model = "imageFile"
                        accept="image/*" 
                        prepend-icon="fa-solid fa-images"  
                        label="Browse or Drag Image Here" 
                        placeholder="Pick an image" 
                        variant="outlined"
                        @change="logFile"
                        ></v-file-input>
                    </VCol>
                </v-container>
                

                <v-text-field
                    v-model="productName"
                    class="px-6 pt-3"
                    label="Product Name"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-autocomplete
                    v-model="productCategory"
                    class="px-6 pt-2"
                    label="Category"
                    density="comfortable"
                    :items="categories"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-autocomplete
                    v-model="productType"
                    class="px-6 pt-2"
                    label="Type"
                    density="comfortable"
                    :items="types"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-text-field
                    v-model="productSize"
                    class="px-6 pt-2"
                    label="Size"
                    type="number"
                    suffix="mm"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-autocomplete
                    v-model="productSupplier"
                    class="px-6 pt-2"
                    label="Supplier"
                    density="comfortable"
                    :items="supplierName"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-text-field
                    class="px-6 pt-2"
                    label="Threshold Value"
                    density="comfortable"
                    variant="outlined"
                    type="number"
                    v-model="productThreshold"
                >
                </v-text-field>

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
                        text="Add Product"
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
import { createProduct, getAllCategories, getAllSuppliers, getAllTypes } from '@/tools/api.js'
import { uploadFile } from '@/tools/imagekit'
export default {
    name: "addProductModal",
    data(){
        return{
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