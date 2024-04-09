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

    <!-- Server Side Table  -->
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :items-per-page-options="[5, 10, 15, 20]"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="Product"
      @update:options="loadItems"
    >
    </v-data-table-server>
  </v-card>

</template>
  
<script>
import { getAllProducts } from '@/tools/api.js';

  export default {
    name: 'OverviewView',
    methods:{
      async loadItems({page, itemsPerPage}){
        this.loading = true;

        await getAllProducts()
        .then((response) => {
          if (response) {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const sliced = response.products.slice(start,end)
            this.serverItems = sliced;
            this.totalItems = response.products.length;
            console.log(response.products);
          } else {
            console.error('Received undefined or null');
          }
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
    },
    data: ()=>({
      itemsPerPage: 10,
      headers: [
        { title: 'Product', key: 'product', sortable: false, align: 'center' },
        { title: 'Category', key: 'category', sortable: false, align: 'center' },
        { title: 'Type', key: 'type', sortable: false, align: 'center' },
        { title: 'Size', key: 'size', sortable: false, align: 'center' },
        { title: 'Last Update', key: 'updated_at', sortable: false, align: 'center' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
    })
    
}
</script>
  