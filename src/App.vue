<template>
  <v-app>
    <v-main class="bg-main">
      <v-navigation-drawer width="300" class="bg-nav h-screen">
      
        <v-container grid-list-xl fluid class="pa-0 d-flex flex-column h-screen">
          
        <!-- Logo -->
        <v-list class="cursor-pointer">
          <router-link to="/">
            <v-list-item >
              <v-img :src="big_logo" ></v-img>
            </v-list-item>
          </router-link>
        </v-list>

         <!-- Order Button -->
         <v-list class="mt-0 mb-5 ">
          <v-list-item class="d-flex justify-center">
            <v-btn class="text-none font-weight-bold text-h6 px-10" prepend-icon="fa-solid fa-plus" color="secondary" size="x-large" >Create Order</v-btn>
          </v-list-item>
        </v-list>

        <!-- Menu -->
        <v-list class="cursor-pointer" >
          <router-link class="text-decoration-none font-weight-bold text-inactive text-subtitle-1" to="/">
            <v-list-item class="ml-6" :class="{'active':navigationItems['dashboard'].active, 'text-secondary':navigationItems['dashboard'].active}">
              <v-list-item-icon class="mr-8">
                <v-icon :color="navigationItems['dashboard'].active ? 'active' : 'inactive'" >fa-solid fa-house</v-icon>
              </v-list-item-icon>
              <v-list-item-content >Dashboard</v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>


        <!-- Inventory -->
        <v-list class="cursor-pointer" >
          <router-link class="text-decoration-none font-weight-bold text-subtitle-1 text-inactive" to="/inventory/overview">
            <v-list-item ref="invClassRef" class="ml-6" :class="{'active':navigationItems['inventory'].active, 'text-secondary':navigationItems['inventory'].active}">
              <v-list-item-icon class="mr-8">
                <v-icon :color="navigationItems['inventory'].active ? 'active' : 'inactive'">fa-solid fa-suitcase</v-icon>
              </v-list-item-icon>
              <v-list-item-content >Inventory</v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link class="text-decoration-none text-inactive" to="/inventory/overview">
            <v-list-item class=" text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer" :class="{'text-secondary':navigationItems['overview'].active}">Overview</v-list-item>
          </router-link>

          <router-link class="text-decoration-none text-inactive" to="/inventory/customization">
            <v-list-item class=" text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer" :class="{'text-secondary':navigationItems['customization'].active}">Product Customization</v-list-item>
          </router-link>

          <router-link class="text-decoration-none text-inactive" to="/inventory/installation">
            <v-list-item class=" text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer" :class="{'text-secondary':navigationItems['installation'].active}">Installation</v-list-item>
          </router-link>

          <router-link class="text-decoration-none text-inactive " to="/inventory/certification">
            <v-list-item class="text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer" :class="{'text-secondary':navigationItems['certification'].active}">Certification</v-list-item>
          </router-link>

          <router-link class="text-decoration-none text-inactive" to="/inventory/stock">
            <v-list-item class="text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer" :class="{'text-secondary':navigationItems['stock'].active}">Stock Transfer</v-list-item>
          </router-link>

          <router-link class="text-decoration-none text-inactive" to="/inventory/store">
            <v-list-item class="text-subtitle-2 font-weight-regular pl-16 ml-10 my-n1 cursor-pointer" :class="{'text-secondary':navigationItems['store'].active}">Store Managements</v-list-item>
          </router-link>

        </v-list>

        <!-- meter -->
        <v-list class="cursor-pointer" >
          <router-link class="text-decoration-none font-weight-bold text-inactive text-subtitle-1" to="/meter">
            <v-list-item class="ml-6"  :class="{'active':navigationItems['meter'].active, 'text-secondary':navigationItems['meter'].active}">
              <v-list-item-icon class="mr-8">
                <v-icon :color="navigationItems['meter'].active ? 'active' : 'inactive'" >fa-solid fa-droplet</v-icon>
              </v-list-item-icon>
              <v-list-item-content >Meter</v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>

        <!-- Refund & Return -->
        <v-list class="cursor-pointer" >
          <router-link class="text-decoration-none font-weight-bold text-inactive text-subtitle-1" to="/refund">
            <v-list-item class="ml-6"  :class="{'active':navigationItems['refund'].active, 'text-secondary':navigationItems['refund'].active}">
              <v-list-item-icon class="mr-8">
                <v-icon :color="navigationItems['refund'].active ? 'active' : 'inactive'" >fa-solid fa-hand-holding-dollar</v-icon>
              </v-list-item-icon>
              <v-list-item-content >Refund & Return</v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>

        <!-- Profile -->
        <v-list class="cursor-pointer" >
          <router-link class="text-decoration-none font-weight-bold text-inactive text-subtitle-1" to="/profile">
            <v-list-item class="ml-6"  :class="{'active':navigationItems['profile'].active, 'text-secondary':navigationItems['profile'].active}">
              <v-list-item-icon class="mr-8">
                <v-icon :color="navigationItems['profile'].active ? 'active' : 'inactive'" >fa-solid fa-user</v-icon>
              </v-list-item-icon>
              <v-list-item-content >Profile</v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>

        <!-- <v-spacer></v-spacer> -->

        <!-- Footer & Change Theme -->
        <v-footer class=" d-flex justify-center text-caption text-inactive bg-nav">
          <v-btn class="mr-2 ml-n8 cursor-pointer" size="x-large" rounded="xl" variant="plain" @click="toggleTheme">
            <v-icon color="secondary">fa-solid fa-cloud-sun</v-icon>
          </v-btn>
          <p style="line-height: 16px;">
            © 2024 | TheHackSmith <br>
            Air Selangor Hackathon
          </p>
        </v-footer>
      </v-container>

      </v-navigation-drawer>

      <!-- Router View -->
      <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script setup>
import big_logo  from "@/assets/big_logo.jpeg"
import { useTheme } from 'vuetify'
import { onMounted, reactive, watchEffect } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute();

const theme = useTheme()
function toggleTheme(){
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}


onMounted(() => {
  watchEffect(() => {
    let routeName = route.name;

    // Reset all navigation items to inactive
    Object.keys(navigationItems).forEach(key => {
      navigationItems[key].active = false;
    });

    // Activate the navigation item that matches the route name, if it exists
    if (navigationItems[routeName]) {
      navigationItems[routeName].active = true;
    }

    // Activate Inventory if sub menu choosen
    if (navigationItems["installation"].active ||
        navigationItems["customization"].active ||
        navigationItems["productDetails"].active ||
        navigationItems["certification"].active ||
        navigationItems["stock"].active||
        navigationItems["overview"].active||
        navigationItems["store"].active
        ){
          navigationItems["inventory"].active = true;
        }
  });
});

const navigationItems = reactive({
  dashboard: { active: true },
  overview: { active: false },
  customization: { active: false },
  productDetails: { active: false },
  inventory: { active: false },
  installation: { active: false },
  certification: { active: false },
  stock: { active: false },
  store: { active: false },
  meter: { active: false },
  refund:{ active: false },
  profile: { active: false },
});

</script>

<style >
.active{
  border-right: solid 3px #4EADD6;
}

</style>