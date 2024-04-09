
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
    <v-container grid-list-xs class="d-flex justify-space-between px-10" fluid>
      <p class="text-h6 font-weight-bold">Manage Store</p>
      <v-btn color="secondary text-none text-subtitle-1">Add Store</v-btn>
    </v-container>

    <!-- Stores -->
    <StoreCard 
    :imageUrl="require('@/assets/stores_images/kuala_selangor.png')" 
    name="Kuala Selangor Store" 
    address="Jalan Bendahara 1/2B, Taman Bendahara" 
    district="45000 Kuala Selangor, Selangor" 
    phone="603-61262500"
    />

    <StoreCard 
    :imageUrl="require('@/assets/stores_images/gombak.png')" 
    name="Gombak Store" 
    address="Persiaran Pegawai, Baru Selayang, " 
    district="68100 Selayang, Selangor" 
    phone="603-61262500"
    />

    <StoreCard 
    :imageUrl="require('@/assets/stores_images/kuala_langat.png')" 
    name="Kuala Langat Store" 
    address="Pengurusan Air Selangor Sdn Bhd,Region, Telok Datok" 
    district="42700 42700Banting, Selangor" 
    phone="603-31841300"
    />

  </v-card>
</template>
  
  <script>
  import StoreCard from '@/components/StoreCard.vue';

  export default {
    name: 'StoreView',
    components:{StoreCard}
  }
  </script>
  