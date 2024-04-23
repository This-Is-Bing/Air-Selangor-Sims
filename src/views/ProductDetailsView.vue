
<template>
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

    <v-container fluid class="bg-secondary elevation-2 ">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Product Details</div>
      </v-row>
    </v-container>

    <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- button -->
    <v-container grid-list-xs class="d-flex justify-space-between" fluid>
      <p class="text-h6 font-weight-bold">{{product.name}}</p>
      <div>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-pencil" class="mr-2">Edit</v-btn>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-download">Download</v-btn>
      </div>
    </v-container>

    <v-tabs
      v-model="activeTab"
      background-color="primary"
      light
      slider-color="secondary"
      >
      <v-tab key="overview" class="text-none px-10 text-subtitle-1"> Overview </v-tab>
      <v-tab key="inventory" class="text-none px-10 text-subtitle-1"> Inventory </v-tab>

    </v-tabs>

    <v-divider color="black"></v-divider>

    <!-- Window Items -->
    <v-window v-model="activeTab">
        <!-- Account Summary Tab -->
        <v-window-item key="overview">
          <v-card flat>
            <detail-overview :product="product"/>
          </v-card>
        </v-window-item>
        
        <v-window-item key="inventory">
          <v-card flat>
            <v-card-text>
              <product-inventory :product_id="product._id"></product-inventory>
            </v-card-text>
          </v-card>
        </v-window-item>
        

    </v-window>

  </v-card>
    
  </template>
  
  <script>
import { getAProduct } from '@/tools/api';
import DetailOverview from '@/components/product_details/overview.vue';
import ProductInventory from '@/components/product_details/productInventory.vue';


  export default {
  components: { DetailOverview, ProductInventory },
    name: 'ProductDetailsView',
    props: {
        id: {
        type: String,
        required: true,
        },
    },
    data(){
        return{
            showOverlay:false,
            product:[],
            activeTab: 'overview',
        }
    },
    created(){
        this.loadProduct()
    },
    methods:{
      async loadProduct(){
        console.log(this.id);
          this.showOverlay = true
          const result = await getAProduct( this.id )
          this.product = result.product
          this.showOverlay = false
      },
      async loadMeter(){
        console.log(this.id);
          this.showOverlay = true
          const result = await getAProduct( this.id )
          this.product = result.product
          this.showOverlay = false
      },
      
    }

  }
  </script>
  