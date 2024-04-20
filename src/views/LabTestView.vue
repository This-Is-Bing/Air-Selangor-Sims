<template>
  
  <!-- Header -->
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Lab Test</div>
    </v-row>
  </v-container>
      
  <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- Title & Action Buttons -->
    <v-container grid-list-xs class="d-flex justify-space-between " fluid>
      <p class="text-h6 font-weight-bold">All Lab Tests</p>
      <div>
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

        <template v-slot:[`item.test_status`]="{item}">
          <v-chip close color="warning" v-if="item.test_status == 'New'" prepend-icon="fa-regular fa-clock"> Pending</v-chip>
          <v-chip close color="success" v-if="item.test_status == 'Passed'" prepend-icon="fa-regular fa-circle-check">Passed</v-chip>
          <v-chip close color="error" v-if="item.test_status == 'Failed'" prepend-icon="fa-regular fa-circle-exclamation" class="px-4">Failed</v-chip>
        </template>

        <template v-slot:[`item.test_date`]="{item}">
          <p v-if="item.test_date == null">N/A</p>
          <p v-else>{{ convertDate(item.test_date) }}</p>
        </template>

        <template v-slot:[`item.tester`]="{item}">
          <p v-if="item.tester == null">N/A</p>
          <p v-else>{{ item.tester }}</p>
        </template>
        

        <template v-slot:[`item.actions`]="{item}">
          <v-icon icon="fa-solid fa-search" color="secondary mr-2 cursor-pointer" @click="this.$router.push({ name: 'LabTestDetails', query: { id: item._id } })"></v-icon>
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
        <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-regular fa-xmark"></v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
  
<script>
import { getAllLabTests } from '@/tools/api';
import { convertDate, convertDateTime } from '@/tools/convertDateTime';


  export default {
    name: 'LabTestView',
    watch: {
      '$route.query.productCreated': {
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
      convertDateTime, convertDate,
      async loadItems({page, itemsPerPage}){
        this.loading = true;
        this.showOverlay = true  

        await getAllLabTests()
        .then((response) => {
          if (response) {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const sliced = response.labtests.slice(start,end)
            this.serverItems = sliced;
            this.totalItems = response.labtests.length;
          } else {
            console.error('Received undefined or null');
          }
        })
        .catch((error) => {
          console.error('Error fetching lab tests:', error);
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
        { title: 'Test ID', key: '_id', sortable: false, align: 'center' },
        { title: 'Serial Number', key: 'meter_id.serial_number', sortable: false, align: 'center' },
        { title: 'Tester', key: 'tester', sortable: false, align: 'center' },
        { title: 'Products', key: 'meter_id.product_id.name', sortable: false, align: 'center' },
        { title: 'Tested Date', key: 'test_date', sortable: false, align: 'center' },
        { title: 'Status', key: 'test_status', sortable: false, align: 'center' },
        { title: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      snackbar: false, //snackbar
      text: `New Lab Test Added`, //snackbar
      dataTable: 0, //to remount data table,
      showOverlay: false
    })
    
}
</script>
  