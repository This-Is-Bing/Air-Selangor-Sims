<template>
    <v-container fluid class="bg-secondary elevation-2">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Dashboard</div>
      </v-row>
    </v-container>

    <v-card class="ma-2 pa-2">
      <p class="text-h6 text-tertiary">Welcome {{ username }}</p>
    </v-card>

  </template>
  
  <script>
import userInfo from '@/userInfo';

  export default {
    name: 'DashboardView',
    data(){
      return{
         username: userInfo.name

      }
    }
  }
  </script>
  