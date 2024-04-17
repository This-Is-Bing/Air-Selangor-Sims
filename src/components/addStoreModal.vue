<template>
    <v-dialog max-width="500" >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Add Store"
            variant="flat"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card  title="New Store">

                <v-container grid-list-xs class="px-8 pb-0 pt-6" >
                    <VCol cols="12" sm="12" class="a7ign-center pa-0 ma-0">
                        <v-file-input 
                        v-model = "imageFile"
                        accept="image/*" 
                        prepend-icon="fa-regular fa-images"  
                        label="Browse or Drag Image Here" 
                        placeholder="Pick an image" 
                        variant="outlined"
                        @change="logFile"
                        ></v-file-input>
                    </VCol>
                </v-container>
                

                <v-text-field
                    v-model="storeName"
                    class="px-6 pt-3"
                    label="Store Name"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-text-field
                    v-model="storeAddress"
                    class="px-6 pt-3"
                    label="Address"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-text-field
                    v-model="storePostcode"
                    class="px-6 pt-3"
                    label="Postcode"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-text-field
                    v-model="storeDistrict"
                    class="px-6 pt-3"
                    label="District"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-text-field
                    v-model="storeCity"
                    class="px-6 pt-3"
                    label="City"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-text-field
                    v-model="storeContact"
                    class="px-6 pt-3"
                    label="Contact"
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
                        text="Add Store"
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
import { createStore } from '@/tools/api.js'
import { uploadFile } from '@/tools/imagekit'
export default {
    name: "addStoreModal",
    data(){
        return{
            storeName: null,
            storeDistrict: null,
            storePostcode: null,
            storeCity: null,
            storeContact: "+60",
            storeAddress: null,
            imageFile: null,
            imageUrl: null,
            showOverlay: false
        }
    },
    created(){

    },
    methods:{
        async submitForm(){
            this.showOverlay = true

            const file = this.imageFile[0]

            try {
            const result = await uploadFile(file, '/Stores');
                this.imageUrl = result.url

                const newStore = {
                "name": this.storeName,
                "imageUrl": this.imageUrl,
                "address": this.storeAddress,
                "postcode": this.storePostcode,
                "district": this.storeDistrict,
                "city": this.storeCity,
                "contact": this.storeContact
            }
                await createStore(newStore)
                .then(() => {
                    this.storeName= null,
                    this.storeAddress= null,
                    this.storePostcode= null,
                    this.storeDistrict= null,
                    this.storeCity= null,
                    this.storeContact= "+60",
                    this.imageFile = null,
                    this.$router.push({ name: 'store', query: { storeCreated: 'true' } })
                    .then(() => {
                        this.$router.replace({ name: 'store', query: {} });
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