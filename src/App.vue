<template>
  <v-app>
    <v-main>
      <v-navigation-drawer width="300">

        <!-- Logo Display -->
        <v-list>
          <v-list-item >
            <v-img :src="big_logo" ></v-img>
          </v-list-item>
        </v-list>

         <!-- Create Order Button -->
         <v-list class="mt-0 mb-5">
          <v-list-item class="d-flex justify-center">
            <v-btn class="text-none font-weight-bold text-h6 px-10" prepend-icon="fa-solid fa-plus" color="secondary" size="x-large" >
              Create Order
            </v-btn>
          </v-list-item>
        </v-list>

        <!-- Create Menu -->
        <v-list >
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="secondary">fa-solid fa-house</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-secondary text-subtitle-1">
              Dashboard
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list >
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-suitcase</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-inactive text-subtitle-1">
              Inventory
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list >
          <v-list-item class="ml-6">
            <v-list-item-icon class="mr-8">
              <v-icon color="inactive">fa-solid fa-user</v-icon>
            </v-list-item-icon>
            <v-list-item-content title="Dashboard" class="font-weight-bold text-inactive text-subtitle-1">
              Profile
            </v-list-item-content>
          </v-list-item>
        </v-list>



        <v-list class="ml-6" nav>
          <v-list-item class="text-secondary font-weight-bold text-secondary text-subtitle-1" prepend-icon="fa-solid fa-house">Dashboard</v-list-item>
          <v-list-item class="text-inactive font-weight-bold text-inactive text-subtitle-1" prepend-icon="fa-solid fa-suitcase">Inventory</v-list-item>
          <v-list-item class="text-inactive font-weight-bold text-inactive text-subtitle-1" prepend-icon="fa-solid fa-user">Profile</v-list-item>

        </v-list>



      </v-navigation-drawer>

      <v-container fluid class="bg-block">
        <v-row class="py-7 pl-5">
            <div class="font-weight-bold text-h5">Dashboard</div>
        </v-row>
     </v-container>

    </v-main>
  </v-app>
</template>

<script>
import big_logo  from "@/assets/big_logo.jpeg"

export default {
  name: 'App',

  data: () => ({
    big_logo,
  }),
}
</script>
