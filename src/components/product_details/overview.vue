<template>
    <!-- Product Details -->
    <v-container class="pt-0 " fluid>
        <p class="text-subtitle-1 font-weight-bold py-2">Primary Details</p>
        <v-container fluid>
            <v-row >
                <v-col>
                    <!-- name -->
                    <v-row >
                    <v-col cols="6">Name:</v-col>
                    <v-col cols="6">{{product.name}}</v-col>
                    </v-row>

                    <!-- category -->
                    <v-row>
                    <v-col cols="6">Category:</v-col>
                    <v-col cols="6">{{product.category}}</v-col>
                    </v-row>

                    <!-- type -->
                    <v-row>
                    <v-col cols="6">Type:</v-col>
                    <v-col cols="6">{{product.type}}</v-col>
                    </v-row>

                    <!-- threshold -->
                    <v-row>
                    <v-col cols="6">Threshold Value:</v-col>
                    <v-col cols="6">{{product.threshold}}</v-col>
                    </v-row>

                    <!-- size -->
                    <v-row>
                    <v-col cols="6">Size:</v-col>
                    <v-col cols="6">{{product.size}}</v-col>
                    </v-row>


                    <!-- updated -->
                    <v-row>
                    <v-col cols="6">Last Update:</v-col>
                    <v-col cols="6">{{product.updated_at}}</v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-img
                        :src="product.imageURL"
                        :width="200"
                         aspect-ratio="1/1"
                        class="bg-grey-lighten-2"
                        cover
                    ></v-img>
                </v-col>
                <v-col>
                </v-col>
        </v-row>
        </v-container>
    </v-container>

     <!-- Product Details -->
     <v-container class="pt-0 " fluid>
        <p class="text-subtitle-1 font-weight-bold py-2">Supplier Details</p>
        <v-container fluid>
            <v-row >
                <v-col>
                    <!-- supplier name -->
                    <v-row >
                    <v-col cols="6">Supplier Name:</v-col>
                    <v-col cols="6" v-if="product && product.supplier_id">{{product.supplier_id.name}}</v-col>
                    </v-row>

                    <!-- category -->
                    <v-row>
                    <v-col cols="6">Contact Number:</v-col>
                    <v-col cols="6" v-if="product && product.supplier_id">{{product.supplier_id.contact}}</v-col>
                    </v-row>

                </v-col>

                <v-col>
                </v-col>

                <v-col>
                </v-col>
        </v-row>
        </v-container>
    </v-container>
  
  </template>
  
  <script>
  export default {
    name: "detailOverview",
    props: {
      product: Array,
    },
    data(){
        return{
        }
    }
  }
  </script>
  