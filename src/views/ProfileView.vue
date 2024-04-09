<template>
	<v-container fluid class="bg-secondary elevation-2">
		<v-row class="py-7 pl-5">
			<div class="font-weight-bold text-h5">Profile</div>
		</v-row>
	</v-container>

	<!-- Tab buttons -->
	<v-container>
		<v-tabs v-model="tab" background-color="white" light slider-color="blue" align-tabs="center">
			<v-tab key="account-summary"> Account Summary </v-tab>
			<v-tab key="manage-users"> Manage Users </v-tab>
		</v-tabs>

		<!-- Tab Items -->
    <div>
      <v-window v-model="tab">
        <!-- Account Summary Tab -->
        <!-- Problem encoutered: how to set the margins or alignment of component is more dynamic or flexi way -->
        <v-window-item key="account-summary" style="margin-left: 170px; margin-right:230px; margin-top:55px;">
          <v-row>
            <v-col cols="2" >
              <v-card class="mx-5 my-5" elevation="100" height=450 width=350>
                <v-card-text> Username </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="2" style="margin-left:240px;">
              <v-card class="mx-5 my-5" elevation="100" height=450 width=800>
                <v-card-text> Personal Information </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- Manage User Tab -->
        <v-window-item key="manage-users">
          <v-card class="mx-5 my-5" elevation="100" height="600">
            
          </v-card>
        </v-window-item>
      </v-window>
    </div>
	</v-container>
</template>
  
<script>
export default {
	name: "ProfileView",
	data: () => ({
		tab: null,
		items: ["account-summary", "manage-users"],
	}),
};
</script>
  