<template>
  <!-- Stores -->
  <v-container class="pt-0 px-10 pb-10"  fluid>
    <v-row class="pt-0 border border-secondary border-opacity pa-0 ma-0 rounded">
      <v-col class="pa-0 ma-0 rounded" cols="12" sm="6" md="4">
        <v-card class="elevation-0 d-flex rounded" width="100%">
          <v-img class="rounded" aspect-ratio="16/9" cover :src="imageUrl" ></v-img>
        </v-card>
      </v-col>

      <v-col class="justify-center d-flex flex-column pl-6" cols="12" sm="6" md="4">
        <p class="text-h6 font-weight-bold pb-5">{{ name }}</p>
        <p class="text-subtitle-1 font-weight-light pb-0">{{  address  }}</p>
        <p class="text-subtitle-1 font-weight-light pb-0"> {{ postcode }} {{  district }}, {{ city }}</p>
        <p class="text-subtitle-1 font-weight-light pb-0">{{ contact }}</p>
      </v-col>

      <v-col class="justify-start align-end d-flex flex-column pl-6" cols="12" sm="6" md="4">
        <v-btn class="border-solid border-secondary text-secondary" variant="outlined">Edit</v-btn>
      </v-col>
          
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: 'StoreCard',
  props: {
    imageUrl: String,
    name: String,
    address: String,
    postcode: Number,
    district: String,
    city: String,
    contact: String,
  },
}
</script>
