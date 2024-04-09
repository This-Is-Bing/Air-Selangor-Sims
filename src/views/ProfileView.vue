<template>
    <v-container fluid class="bg-secondary elevation-2">
      <v-row class="py-7 pl-5">
        <div class="font-weight-bold text-h5">Profile</div>
      </v-row>
    </v-container>

    <!-- Tab buttons -->
    <v-container>
      <v-tabs
        v-model="tab"
        background-color="white"
        light
        slider-color="blue">
        <v-tab key="account-summary"> Account Summary </v-tab>
        <v-tab key="manage-users"> Manage Users </v-tab>
      </v-tabs>

      <!-- Tab Items -->
      <v-window v-model="tab">
          
          <!-- Account Summary Tab -->
          <v-window-item key="account-summary">
            <v-card class="mx-5 my-5" elevation="100" height=120>
              <v-card-text>
                Username
              </v-card-text>
            </v-card>
            <v-card class="mx-5 my-5" elevation="100" height=350>
              <v-card-text>
                Personal Information
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Manage User Tab -->
          <v-window-item key="manage-users">
            <v-card class="mx-5 my-5" elevation="100" height=600>
              <v-card-text>
                Content for Manage Users goes here.
              </v-card-text>
            </v-card>
            
          </v-window-item>
      </v-window>
    </v-container>
</template>
  
<script>
  export default {
    name: 'ProfileView',
    data: () => ({
      tab: null,
      items: [
          'account-summary', 'manage-users',
      ],
    }),
  };
</script>
  