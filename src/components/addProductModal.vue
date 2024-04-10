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
                    class="px-6 pt-3"
                    label="Product Name"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-autocomplete
                    class="px-6 pt-2"
                    label="Category"
                    density="comfortable"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-autocomplete
                    class="px-6 pt-2"
                    label="Type"
                    density="comfortable"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-autocomplete
                    class="px-6 pt-2"
                    label="Size"
                    suffix="mm"
                    density="comfortable"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-autocomplete
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
                    model-value="0"
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
                ></v-btn>
                <v-btn
                text="Add Product"
                color="secondary text-none text-subtitle-1" 
                variant="flat"
                class="mx-5 elevation-1"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { getAllSuppliers } from '@/tools/api.js'
export default {
    name: "addProductModal",
    data(){
        return{
            suppliers:[]
        }
    },
    created(){
        this.loadSupplier()
    },
    methods:{
        async loadSupplier(){
            await getAllSuppliers()
            .then((response) => {
                this.suppliers = response.supplier.map(supplier => supplier.name);
            }).catch((error) => {
                console.error('Error fetching suppliers:', error);
            });
        }
    }
}
</script>

<style>

</style>