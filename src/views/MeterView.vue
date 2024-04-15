<template>
  
  <!-- Header -->
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Meter Inventory</div>
    </v-row>
  </v-container>
      
  <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- Title & Action Buttons -->
    <v-container grid-list-xs class="d-flex justify-space-between " fluid>
      <p class="text-h6 font-weight-bold">All Meters</p>
      <div>
        <add-meter-modal/>
        <v-btn color="primary text-none text-subtitle-1 mr-5"  prepend-icon="fa-regular fa-download">Template</v-btn>
        <v-btn color="primary text-none text-subtitle-1 mr-5"  prepend-icon="fa-regular fa-upload">Import</v-btn>
        <v-btn color="primary text-none text-subtitle-1 "  prepend-icon="fa-regular fa-arrow-down-wide-short">Filters</v-btn>
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

      <template v-slot:[`item.installation_date`]="{item}">
        <p v-if="item.installation_date">{{ convertDate(item.installation_date) }}</p>
        <p v-else>N/A</p>
      </template>

      <template v-slot:[`item.warranty`]="{item}">
        <p v-if="item.warranty">{{ convertDate(item.warranty) }}</p>
        <p v-else>N/A</p>
      </template>

      <template v-slot:[`item.updated_at`]="{item}">
        <p v-if="item.updated_at">{{ convertDateTime(item.updated_at) }}</p>
        <p v-else>N/A</p>
      </template>


      <template v-slot:[`item.actions`]="{}">

      </template>
      </v-data-table-server>

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
import AddMeterModal from '@/components/addMeterModal.vue';
import { getAllMeters } from '@/tools/api.js';
import { convertDate, convertDateTime } from '@/tools/convertDateTime';

  export default {
    name: 'MeterView',
    components:{ AddMeterModal },
    watch: {
      '$route.query.meterCreated': {
        immediate: true,
        handler(value) {
          if (value === 'true') {
            this.remountTable();
            this.snackbar = true;// Show the snackbar

          }
        }
      }
    },
    methods:{
      convertDateTime,
      convertDate,
      async loadItems({page, itemsPerPage}){
        this.loading = true;
        this.showOverlay = true  

        await getAllMeters()
        .then((response) => {
          if (response) {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const sliced = response.meters.slice(start,end)
            this.serverItems = sliced;
            this.totalItems = response.meters.length;
          } else {
            console.error('Received undefined or null');
          }
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        })
        .finally(() => {
          this.loading = false;
          this.showOverlay = false 
        });
      },
      remountTable() {
        this.dataTable++;
      },
    },
    data: ()=>({
      itemsPerPage: 10,
      headers: [
        { title: 'Serial Number', key: 'serial_number', sortable: false, align: 'center' },
        { title: 'Product', key: 'product_id.name', sortable: false, align: 'center' },
        { title: 'Region', key: 'region', sortable: false, align: 'center' },
        { title: 'Installation Date', key: 'installation_date', sortable: false, align: 'center' },
        { title: 'Age', key: 'age', sortable: false, align: 'center' },
        { title: 'Mileage', key: 'mileage', sortable: false, align: 'center' },
        { title: 'Warranty', key: 'warranty', sortable: false, align: 'center' },
        { title: 'Last Update', key: 'updated_at', sortable: false, align: 'center' },
        { title: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      snackbar: false, //snackbar
      text: `New Product Added`, //snackbar
      dataTable: 0, //to remount data table,
      showOverlay: false
    })
    
}
</script>
  