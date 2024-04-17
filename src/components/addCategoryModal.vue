<template>
    <v-dialog max-width="500" >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            variant="flat"
            text="Add"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            prepend-icon="fa-regular fa-plus"

            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card  title="Add Product Category">
                <v-text-field
                    v-model="productCategory"
                    class="px-6 pt-3"
                    label="Category"
                    density="comfortable"
                    variant="outlined"
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
                        text="Add"
                        color="secondary text-none text-subtitle-1" 
                        variant="flat"
                        class="mx-5 elevation-1"
                        @click="submitForm"
                    >
                    </v-btn>
                    
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { createCategory } from '@/tools/api.js'
export default {
    name: "addCategoryModal",
    data(){
        return{
            productCategory: null,
        }
    },

    methods:{
        async submitForm(){
            const newCategory = {
                "category": this.productCategory,
            }

            await createCategory(newCategory)
            .then((response) => {
                console.log(response);
                this.$router.go('');
            }).catch((error) => {
                console.log(error.message);
            });

        }
    }
}
</script>

<style>

</style>