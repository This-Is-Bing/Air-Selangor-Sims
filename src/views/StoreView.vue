
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
    <v-container grid-list-xs class="d-flex justify-space-between pb-8 pl-6">
      <p class="text-h6 font-weight-bold">Manage Store</p>
      <v-btn color="secondary text-none text-subtitle-1">Add Store</v-btn>
    </v-container>

    <!-- Stores -->
    <StoreCard></StoreCard>
    <StoreCard></StoreCard>
    <StoreCard></StoreCard>
    <StoreCard></StoreCard>
    <StoreCard></StoreCard>

  </v-card>
</template>
  
  <script>
  import StoreCard from '@/components/StoreCard.vue';
  export default {
    name: 'StoreView',
    components:{StoreCard}
  }
  </script>
  