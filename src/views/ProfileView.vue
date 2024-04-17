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
			slider-color="blue"
			align-tabs="center"
		>
			<v-tab key="account-summary"> Account Summary </v-tab>
			<v-tab key="manage-users"> Manage Users </v-tab>
		</v-tabs>

		<!-- Tab Items -->
		<div>
			<v-window v-model="tab">
				<!-- Account Summary Tab -->
				<v-window-item
					key="account-summary"
					style="margin-left: 170px; margin-right: 230px; margin-top: 55px"
				>
					<v-btn
						:class="{
							'position-relative': true,
							'text-none': true,
							'text-subtitle-1': true,
							'ml-5':true,
						}"
						:color="buttonColor"
						@click="toggleEditMode"
						>{{buttonText}}</v-btn
					>
					<v-row>
						<v-col cols="2">
							<v-card
								class="mx-5 my-5 d-flex justify-center"
								elevation="100"
								height="480"
								width="350"
							>
								<v-row class="d-flex flex-column justify-center align-center">
									<svg
										width="200"
										height="200"
										xmlns="http://www.w3.org/2000/svg"
									>
										<!-- Circle -->
										<circle cx="100" cy="100" r="80" fill="lightblue" />
									</svg>
									<text style="color: blue; font-weight: bold; font-size: 20px"
										>@sarahlee</text
									>
									<text>Admin</text>
								</v-row>
							</v-card>
						</v-col>

						<v-col cols="2" style="margin-left: 240px">
							<v-card
								class="mx-5 my-5"
								elevation="100"
								height="480"
								width="800"
							>
								<v-row class="d-flex flex-column">
									<v-card-text
										style="
											margin-left: 25px;
											margin-top: 25px;
											font-weight: bold;
											font-size: 25px;
										"
									>
										Personal Information
									</v-card-text>
									<div
										v-for="(value, name) in formFields"
										:key="name"
										class="my-3 mt-5"
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
											dense
											style="width: 550px; height: 50px; margin: 5px"
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
									<td><button style="color: blue">Edit</button></td>
									<td><button style="color: red">Delete</button></td>
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
export default {
	name: "ProfileView",
	data: () => ({
		tab: null,
		items: ["account-summary", "manage-users"],
		// Determines whether the form is in edit mode
		editMode: false,
		// Represents the form fields and their values
		formFields: {
			Name: "Sarah Lee",
			Email: "sarahlee@gmail.com",
			Department: "Meter Water Unit",
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
	methods: {
		// Toggle between edit and display mode
		toggleEditMode() {
			this.editMode = !this.editMode;
		},
	},
	computed:{
		buttonColor(){
			return this.editMode? 'green':'secondary'
		},
		buttonText(){
			return this.editMode? 'Save Information':'Edit Information'
		}
	},
};
</script>
  

