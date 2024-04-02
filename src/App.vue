<template>
  <v-app>
    <v-main class="bg-main">
      <v-navigation-drawer width="300" class="bg-nav h-screen">
      
        <!-- Logo Display -->
        <v-list class="cursor-pointer">
          <v-list-item >
            <v-img :src="big_logo" ></v-img>
          </v-list-item>
        </v-list>

         <!-- Create Order Button -->
         <v-list class="mt-0 mb-5 ">
          <v-list-item class="d-flex justify-center">
            <v-btn class="text-none font-weight-bold text-h6 px-10" prepend-icon="fa-solid fa-plus" color="secondary" size="x-large" >Create Order</v-btn>
          </v-list-item>
        </v-list>

        <!-- Create Menu -->
        <v-list class="cursor-pointer" rounded="xs"  style="border-right: solid 3px #4EADD6;">
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="secondary">fa-solid fa-house</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-bold text-secondary text-subtitle-1">Dashboard</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="d-flex flex-column">
          <v-list-item class="ml-6 cursor-pointer">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-suitcase</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-bold text-inactive text-subtitle-1">Inventory</v-list-item-content>
          </v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer">Overview</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer">Sales</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer">Certification</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer">Stock Transfer</v-list-item>
          <v-list-item class="text-inactive text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer">Store Management</v-list-item>
        </v-list>

        <v-list class="cursor-pointer">
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-warehouse</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-inactive text-subtitle-1">Partner</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="cursor-pointer">
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-hand-holding-dollar</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-inactive text-subtitle-1">Refund & Return</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="cursor-pointer" @click="console.log('profile');">
          <v-list-item class="ml-6 mb-10">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-user</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-bold text-inactive text-subtitle-1">Profile</v-list-item-content>
          </v-list-item>
        </v-list>

        <v-footer class="mt-16 pt-16 d-flex justify-center text-caption text-inactive bg-nav" >
          <v-btn class="mr-2 ml-n8 cursor-pointer" size="x-large" rounded="xl" variant="plain" @click="toggleTheme" >
              <v-icon color="secondary">fa-solid fa-cloud-sun</v-icon>
          </v-btn>
          © 2024 | TheHackSmith <br>
          Air Selangor Hackathon
        </v-footer>
      </v-navigation-drawer>

      <router-view></router-view>


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
