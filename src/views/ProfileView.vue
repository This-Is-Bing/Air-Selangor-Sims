<template>
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Profile</div>
    </v-row>
  </v-container>

  <!-- Tab buttons -->
  <v-container>
    <v-tabs
      v-model="activeTab"
      background-color="white"
      light
      slider-color="blue">
      <v-tab key="account-summary"> Account Summary </v-tab>
      <v-tab key="manage-users"> Manage Users </v-tab>
    </v-tabs>

    <!-- Window Items -->
    <v-window v-model="activeTab">
        <!-- Account Summary Tab -->
        <v-window-item key="account-summary">
          <v-card flat>
            <v-card-text>
              Content for Account Summary goes here.
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Manage User Tab -->
        <v-window-item key="manage-users">
          <v-card flat>
            <v-card-text>
              Content for Manage Users goes here.
            </v-card-text>
          </v-card>
        </v-window-item>

    </v-window>

    <v-tabs-items v-model="activeTab">



      </v-tabs-items>
    
  </v-container>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      activeTab: 'account-summary' // Controls which tab is active
    };
  }
};
</script>