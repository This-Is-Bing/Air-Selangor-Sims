<template>
  <!-- Header -->
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Inventory Overview</div>
    </v-row>
  </v-container>
      
  <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- Title & Action Buttons -->
    <v-container grid-list-xs class="d-flex justify-space-between px-10" fluid>
      <p class="text-h6 font-weight-bold">Products</p>
      <div>
        <v-btn color="secondary text-none text-subtitle-1" class="mx-5">Add Product</v-btn>
        <v-btn color="primary text-none text-subtitle-1" prepend-icon="fa-regular fa-arrow-down-wide-short">Filters</v-btn>
      </div>
    </v-container>
    <v-btn color="success" @click="getAllProducts">text</v-btn>
    <!-- Server Side Table  -->
    <v-data-table-server>
    </v-data-table-server>
  </v-card>

</template>
  
<script>
import { getAllProducts } from '@/tools/api.js';

  export default {
    name: 'OverviewView',
    methods:{
      getAllProducts
    }
    
}
</script>
  