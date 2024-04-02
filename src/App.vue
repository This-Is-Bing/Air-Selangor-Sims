<template>
  <v-app>
    <v-main class="bg-main">
      <v-navigation-drawer width="300" class="bg-nav h-screen">
      
        <!-- Logo Display -->
        <v-list>
          <v-list-item >
            <v-img :src="big_logo" ></v-img>
          </v-list-item>
        </v-list>

         <!-- Create Order Button -->
         <v-list class="mt-0 mb-5">
          <v-list-item class="d-flex justify-center">
            <v-btn class="text-none font-weight-bold text-h6 px-10" prepend-icon="fa-solid fa-plus" color="secondary" size="x-large" >Create Order</v-btn>
          </v-list-item>
        </v-list>

        <!-- Create Menu -->
        <v-list >
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="secondary">fa-solid fa-house</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-bold text-secondary text-subtitle-1">Dashboard</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="d-flex flex-column">

          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-suitcase</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-bold text-inactive text-subtitle-1">Inventory</v-list-item-content>
          </v-list-item>

          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1">Overview</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1">Sales</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1">Certification</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1">Stock Transfer</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1">Store Management</v-list-item>

        </v-list>

        <v-list >
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-warehouse</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-inactive text-subtitle-1">Partner</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list >
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-hand-holding-dollar</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-inactive text-subtitle-1">Refund & Return</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list >
          <v-list-item class="ml-6 mb-10">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-user</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-bold text-inactive text-subtitle-1">Profile</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-footer class="mt-16 pt-16 d-flex justify-center text-caption text-inactive" >
          © 2024 | TheHackSmith <br>
          Air Selangor Hackathon
        </v-footer>
      </v-navigation-drawer>

    <v-container fluid class="bg-block ">
        <v-row class="py-7 pl-5">
            <div class="font-weight-bold text-h5">Dashboard</div>
        </v-row>
    </v-container>

    <v-btn class="ma-8" color="primary" @click="toggleTheme">Theme: {{theme.global.name.value}}</v-btn>

 

    </v-main>
  </v-app>
</template>

<script setup>
import big_logo  from "@/assets/big_logo.jpeg"
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
