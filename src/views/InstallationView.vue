<template>
  
  <!-- Header -->
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Installation</div>
    </v-row>
  </v-container>
      
  <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- Title & Action Buttons -->
    <v-container grid-list-xs class="d-flex justify-space-between " fluid>
      <p class="text-h6 font-weight-bold">All Installations</p>
      <div>
        <!-- <add-meter-modal/>
        <v-btn color="primary text-none text-subtitle-1 mr-5"  prepend-icon="fa-solid  fa-download">Template</v-btn>
        <v-btn color="primary text-none text-subtitle-1 mr-5"  prepend-icon="fa-solid  fa-upload">Import</v-btn> -->
        <v-btn color="primary text-none text-subtitle-1 "  prepend-icon="fa-solid  fa-arrow-down-wide-short">Filters</v-btn>
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

      <template v-slot:[`item.status`]="{item}">
        <v-chip v-if="item.status == 'new'" close class="text-subtitle-2 " color="warning" prepend-icon="fa-solid  fa-clock">
          New
        </v-chip>


        <v-chip v-if="item.status == 'Installed'" close class="text-subtitle-2" color="success" prepend-icon="fa-solid  fa-circle-check">
          Installed
        </v-chip>
      </template>

      <!-- <template v-slot:[`item.transaction_date`]="{item}">
        <p v-if="item.transaction_date">{{ convertDate(item.transaction_date) }}</p>
        <p v-else>N/A</p>
      </template> -->


      <template v-slot:[`item.updated_at`]="{item}">
        <p v-if="item.updated_at">{{ convertDateTime(item.updated_at) }}</p>
        <p v-else>N/A</p>
      </template>


      <template v-slot:[`item.actions`]="{item}">
        <v-icon icon="fa-solid fa-search" color="secondary mr-2 cursor-pointer" @click="this.$router.push({ name: 'installationDetails', query: { id: item._id } })"></v-icon>
        <v-icon icon="fa-solid fa-trash" color="quinary cursor-pointer"></v-icon>
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
        <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-solid  fa-xmark"></v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
  
<script>
// import AddMeterModal from '@/components/addMeterModal.vue';
import { getAllInstallations } from '@/tools/api.js';
import { convertDate, convertDateTime } from '@/tools/convertDateTime';

  export default {
    name: 'InstallationView',
    // components:{ AddMeterModal },
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

        await getAllInstallations()
        .then((response) => {
          if (response) {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const sliced = response.installations.slice(start,end)
            this.serverItems = sliced;
            this.totalItems = response.installations.length;
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
        { title: 'Installation ID', key: '_id', sortable: false, align: 'center' },
        { title: 'Client', key: 'client', sortable: false, align: 'center' },
        { title: 'Serial Number', key: 'meter_id.serial_number', sortable: false, align: 'center' },
        { title: 'Model', key: 'meter_id.product_id.name', sortable: false, align: 'center' },
        { title: 'Region', key: 'region', sortable: false, align: 'center' },
        { title: 'Installation Status', key: 'installation_status', sortable: false, align: 'center' },
        { title: 'Installation Date', key: 'installlation_date', sortable: false, align: 'center' },
        { title: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ], 
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      snackbar: false, //snackbar
      text: `New Installation Added`, //snackbar
      dataTable: 0, //to remount data table,
      showOverlay: false
    })
    
}
</script>
  