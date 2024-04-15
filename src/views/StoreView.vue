
<template>
  <!-- Header -->
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Store Management</div>
    </v-row>
  </v-container>
    
  <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- Title & Add Store Button -->
    <v-container grid-list-xs class="d-flex justify-space-between " fluid>
      <p class="text-h6 font-weight-bold">Manage Store</p>
      <add-store-modal></add-store-modal>
    </v-container>

    <!-- Stores -->
    <store-card
    v-for=" store in stores"
      :key="store._id"
      :imageUrl="store.imageUrl"
      :name="store.name"
      :address="store.address"
      :postcode="store.postcode"
      :district="store.district"
      :city="store.city"
      :contact="store.contact"
    />

  </v-card>
      <!-- Notification -->
  <v-snackbar v-model="snackbar" color="primary" >
    <v-icon icon="fa-solid fa-circle-check" color="success" class="mr-3" ></v-icon> New Store Added 
    <template v-slot:actions>
      <v-btn color="secondary" variant="text" @click="snackbar = false" append-icon="fa-regular fa-xmark"></v-btn>
    </template>
  </v-snackbar>
</template>
  
  <script>
  import StoreCard from '@/components/StoreCard.vue';
  import AddStoreModal from '@/components/addStoreModal.vue';
  import { getAllStores } from '@/tools/api'

  export default {
    name: 'StoreView',
    components:{StoreCard, AddStoreModal},
    watch: {
      '$route.query.storeCreated': {
        immediate: true,
        handler(value) {
          if (value === 'true') {
            this.loadStore();
            this.snackbar = true;// Show the snackbar

          }
        }
      }
    },
    created(){
      this.loadStore()
    },
    methods:{

      // Load Stores
      async loadStore(){
        try {
            const response = await getAllStores();
            this.stores = response.stores
            console.log(this.stores);
            } catch (error) {
              console.error('Error fetching Stores:', error);
            }
      },
    },
    data(){
      return{
        snackbar: false, //snackbar
        dataTable: 0, //to remount data table,
        showOverlay: false,
        stores:[]
      }
    }
  }
  </script>
  