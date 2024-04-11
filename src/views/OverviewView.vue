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
    <v-container grid-list-xs class="d-flex justify-space-between " fluid>
      <p class="text-h6 font-weight-bold">Products</p>
      <div>
        <add-product-modal/>
        <v-btn color="primary text-none text-subtitle-1"  prepend-icon="fa-regular fa-arrow-down-wide-short">Filters</v-btn>
      </div>
    </v-container>

    <!-- Server Side Table  -->
    <v-data-table-server
      :key="dataTable" 
      class="bg-primary border-tertiary"
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
    <template v-slot:[`item.actions`]="{item}">
      <!-- <v-btn size="x-small" color="secondary" class="text-none text-caption mr-2">View</v-btn> -->
      <v-icon icon="fa-solid fa-search" color="secondary mr-2 cursor-pointer" @click="console.log(item._id);"></v-icon>

      <!-- <v-btn size="x-small" color="error" class="text-none text-caption">Edit</v-btn> -->
      <v-icon icon="fa-solid fa-trash" color="quinary cursor-pointer"></v-icon>

    </template>
    </v-data-table-server>

    <!-- Notification -->
    <v-snackbar v-model="snackbar" color="primary" >
      <v-icon icon="fa-solid fa-circle-check" color="success" class="mr-3" ></v-icon> {{ text }} 
      <template v-slot:actions>
        <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-regular fa-xmark"></v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
  
<script>
import { getAllProducts } from '@/tools/api.js';
import addProductModal from '@/components/addProductModal.vue';

  export default {
    name: 'OverviewView',
    components:{ addProductModal },
    watch: {
      '$route.query.productCreated': {
        immediate: true,
        handler(value) {
          if (value === 'true') {
            this.snackbar = true;  // Show the snackbar
            this.remountTable();
          }
        }
      }
    },
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
      },
      remountTable() {
        this.dataTable++;
      },
    },
    data: ()=>({
      itemsPerPage: 10,
      headers: [
        { title: 'Product', key: 'name', sortable: false, align: 'center' },
        { title: 'Category', key: 'category', sortable: false, align: 'center' },
        { title: 'Type', key: 'type', sortable: false, align: 'center' },
        { title: 'Size', key: 'size', sortable: false, align: 'center' },
        { title: 'Supplier', key: 'supplier', sortable: false, align: 'center' },
        { title: 'Threshold', key: 'threshold', sortable: false, align: 'center' },
        { title: 'Last Update', key: 'updated_at', sortable: false, align: 'center' },
        { title: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      snackbar: false, //snackbar
      text: `New Product Added`, //snackbar
      dataTable: 0 //to remount data table
    })
    
}
</script>
  