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
                    :items="suppliers"
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


</template>

<script>
import { createProduct, getAllCategories, getAllSuppliers, getAllTypes } from '@/tools/api.js'
export default {
    name: "addProductModal",
    data(){
        return{
            suppliers:[],
            types:[],
            categories:[],
            productName: null,
            productCategory: null,
            productSize: 0,
            productSupplier: null,
            productThreshold: 0,
            productType: null,
        }
    },
    created(){
        this.loadSupplier()
        this.loadType()
        this.loadCategory()
    },
    methods:{
        async loadSupplier(){
            await getAllSuppliers()
            .then((response) => {
                this.suppliers = response.supplier.map(supplier => supplier.name);
            }).catch((error) => {
                console.error('Error fetching suppliers:', error);
            });
        },
        async loadType(){
        await getAllTypes()
        .then((response) => {
            this.types = response.type.map(res => res.type);
        }).catch((error) => {
            console.error('Error fetching product type:', error);
        });
      },
      async loadCategory(){
        await getAllCategories()
        .then((response) => {
            this.categories = response.category.map(res => res.category);
        }).catch((error) => {
            console.error('Error fetching product category:', error);
        });
      },
        async submitForm(){
            const newProduct = {
                "name": this.productName,
                "category": this.productCategory,
                "type": this.productType,
                "size": this.productSize,
                "supplier": this.productSupplier,
                "threshold": this.productThreshold
            }

            await createProduct(newProduct)
            .then((response) => {
                this.productName= null,
                this.productCategory= null,
                this.productSize= 0,
                this.productSupplier= null,
                this.productThreshold= 0,
                this.productType= null,
                console.log(response);
                this.$router.push({ name: 'overview', query: { productCreated: 'true' } })
                .then(() => {
                    this.$router.replace({ name: 'overview', query: {} });
                });
            }).catch((error) => {
                console.log(error.message);
            });

        }
    }
}
</script>

<style>

</style>