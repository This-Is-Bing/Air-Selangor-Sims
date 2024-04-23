<template>
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
            <v-chip v-if="item.status == 'new'" close class="text-subtitle-2 " color="warning" prepend-icon="fa-regular fa-clock">
            Pending Lab Test
            </v-chip>

            <v-chip v-if="item.status == 'client'" close class="text-subtitle-2" color="success" prepend-icon="fa-regular fa-circle-check">
            Client
            </v-chip>
        </template>

        <template v-slot:[`item.updated_at`]="{item}">
            <p v-if="item.updated_at">{{ convertDateTime(item.updated_at) }}</p>
            <p v-else>N/A</p>
        </template>

        <template v-slot:[`item.actions`]="{item}">
            <v-icon icon="fa-solid fa-search" color="secondary mr-2 cursor-pointer" @click="this.$router.push({ name: 'meterDetails', query: { id: item._id } })"></v-icon>
            <v-icon icon="fa-solid fa-trash" color="quinary cursor-pointer"></v-icon>
        </template>    
    </v-data-table-server>

</template>
  
<script>
import { getMeterByProductID } from '@/tools/api';
import { convertDateTime } from '@/tools/convertDateTime';


  export default {
    name: "productInventory",
    props: {
      product_id: String,
    },
    watch: {
        // Watch the 'meter._id' for changes
        'meter._id'(newVal) {
            if (newVal) {
                this.showOverlay = true

            }
        },
        
    },
    data(){
        return{
            headers: [
              { title: 'Serial Number', key: 'serial_number', sortable: false, align: 'center' },
              { title: 'Model', key: 'product_id.name', sortable: false, align: 'center' },
              { title: 'Type', key: 'product_id.type', sortable: false, align: 'center' },
              { title: 'Size', key: 'product_id.size', sortable: false, align: 'center' },
              { title: 'Supplier', key: 'product_id.supplier_id.name', sortable: false, align: 'center' },
              { title: 'Status', key: 'status', sortable: false, align: 'center' },
              { title: 'Last Update', key: 'updated_at', sortable: false, align: 'center' },
              { title: 'Actions', value: 'actions', sortable: false, align: 'center' },
            ],
            itemsPerPage: 10,
            search: '',
            serverItems: [], 
            totalItems: 0,
            loading: true,

        }
    },
    methods:{
        convertDateTime,
        async loadItems({page, itemsPerPage}){
        this.loading = true;
        this.showOverlay = true  

        await getMeterByProductID(this.product_id)
        .then((response) => {
          if (response) {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const sliced = response.meter.slice(start,end)
            this.serverItems = sliced;
            this.totalItems = response.meter.length;
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
}
}
</script>
