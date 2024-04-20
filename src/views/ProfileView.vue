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
			slider-color="secondary"
			align-tabs="center"
		>
			<v-tab class="text-none text-h6" key="account-summary"> Account Summary </v-tab>
			<v-tab class="text-none text-h6" key="manage-users"> Manage Users </v-tab>
		</v-tabs>

		<!-- Tab Items -->
		<div>
			<v-window v-model="tab">
				<!-- Account Summary Tab -->
				<v-window-item
					key="account-summary"
				>
					<v-row >
						<v-col cols="12">
							<v-btn
							:class="{
								'text-none': true,
								'text-subtitle-1': true,
								'ml-5': true,
							}"
							:color="buttonColor"
							@click="toggleEditMode"
							>
							{{ buttonText }}
							</v-btn>
						</v-col>
					</v-row>
					
					<v-row>
						<v-col cols="4">
							<v-card class="d-flex flex-column justify-center align-center py-13	elevation-1">
								<v-row>
									<v-col>
										<v-img
											src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
											width="200"
											height="200"
											aspect-ratio="1/1"
											class="align-self-center"
										></v-img>
									</v-col>
								</v-row>

								<v-row>
									<v-col>
										<text class="font-weight-bold text-h6">@{{username}}</text>
									</v-col>
								</v-row>
								
								<v-row class="mt-n3">
									<v-col>
										<text class="text-subtitle-1 ">Admin</text>
									</v-col>
								</v-row>
							</v-card>
						</v-col>

						<v-col cols="8" >
							<v-card class="elevation-1">
								<v-row class="d-flex flex-column">
									<v-card-text class="font-weight-bold ml-8 mt-5 text-h5">
										Personal Information
									</v-card-text>
									<div
										v-for="(value, name) in formFields"
										:key="name"
										class="my-3 mt-4"
										style="margin-left: 60px; margin-top: 100px"
									>
										<v-row v-if="!editMode" class="mb-5 d-flex flex-column">
											<v-text style="color: grey; font-size: 15px">{{
												name
											}}</v-text>
											<v-text style="color: black; font-size: 20px">{{
												value
											}}</v-text>
										</v-row>

										<v-text-field
											v-else
											v-model="editformFields[name]"
											:label="name"
											variant="outlined"
											size="compact"
											style="width: 550px; height: 60px; margin: -2px; padding-bottom: 2px;"
										></v-text-field>
									</div>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
				</v-window-item>

				<!-- Manage User Tab -->
				<v-window-item key="manage-users">
					<v-card class="mx-5 my-5" elevation="100" height="600">
						<v-table height="600px" fixed-header>
							<thead>
								<tr>
									<th class="text-left" width="300px">User Name</th>
									<th class="text-left" width="300px">Name</th>
									<th class="text-left" width="300px">Email</th>
									<th class="text-left" width="350px">Role</th>
									<th class="text-left" width="150px"></th>
									<th class="text-left" width="100px"></th>
									<th class="text-left" width="100px"></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in user_info" :key="item.name">
									<td>{{ item.username }}</td>
									<td>{{ item.name }}</td>
									<td>{{ item.email }}</td>
									<td>{{ item.role }}</td>
									<td><v-btn color="secondary">Edit</v-btn></td>
									<td><v-btn color="error">Delete</v-btn></td>
								</tr>
							</tbody>
						</v-table>
					</v-card>
				</v-window-item>
			</v-window>
		</div>
	</v-container>
</template>
  
<script>

import userInfo from '@/userInfo';
import profile_picture from "@/assets/profile_picture.png"

export default {
	name: "ProfileView",
	data: () => ({
		username : userInfo.name,
		tab: null,
		items: ["account-summary", "manage-users"],
		// Determines whether the form is in edit mode
		editMode: false,
		// Represents the form fields and their values
		formFields: {
			Name: userInfo.name,
			Email: userInfo.email,
			Department: "Water Meter Unit",
			Password: "********",
		},
		editformFields: {
			Name: "Sarah Lee",
			Email: "sarahlee@gmail.com",
			Department: "Meter Water Unit",
			Password: "********",
			"Confirm Password": "********",
		},
		user_info: [
			{
				username: "sarahlee",
				name: "Sarah Lee",
				email: "sarahlee@gmail.com",
				role: "Admin",
			},
			{
				username: "sarahlee",
				name: "Sarah Lee",
				email: "sarahlee@gmail.com",
				role: "Admin",
			},
			{
				username: "weimin",
				name: "Wei Min Tan",
				email: "weimin123@gmail.com",
				role: "User",
			},
			{
				username: "huiling0203",
				name: "Chan Hui Ling",
				email: "chanhuiling@gmail.com",
				role: "User",
			},
			{
				username: "irfan77",
				name: "Muhammad Irfan bin Razak",
				email: "irfan@gmail.com",
				role: "User",
			},
			{
				username: "anitakrishnan",
				name: "Anita Krishnan",
				email: "anitakrishnan@gmail.com",
				role: "User",
			},
			],
		}),
		return :{
			profile_picture
		},
		methods: {
			// Toggle between edit and display mode
			toggleEditMode() {
				this.editMode = !this.editMode;
			},
		},
		computed: {
			buttonColor() {
				return this.editMode ? "green" : "secondary";
			},
			buttonText() {
				return this.editMode ? "Save Information" : "Edit Information";
			},
		},
	};
</script>
  

