<template>
    <v-dialog max-width="500" scrollable max-height="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Edit Status"
            variant="flat"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>
        
        <template v-slot:default="{ isActive }">
            <v-card  title="Installation">
                <v-autocomplete
                    v-model="installationStatus"
                    class="px-6 pt-3"
                    label="Status"
                    density="comfortable"
                    :items="['Installed', 'Uninstalled']"
                    variant="outlined"
                >
                </v-autocomplete>
                <v-autocomplete
                    v-model="region"
                    class="px-6 pt-3"
                    label="Region"
                    density="comfortable"
                    :items="regionOptions"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-text-field
                    v-model="clientName"
                    class="px-6 pt-2"
                    label="Client"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-text-field
                    v-model="contractor"
                    class="px-6 pt-2"
                    label="Contractor"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-container>
                    <p class="text-grey text-subtitle-1 pl-5 pb-4">Installation Date</p>
                    <v-row justify="center">
                        <v-date-picker color="secondary" hide-header v-model:model-value="installationDate" :max="dateToday"></v-date-picker>
                    </v-row>
                </v-container>


                <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Discard"
                        variant="flat"
                        color=" text-none text-subtitle-1" 
                        class="elevation-1"
                        @click="isActive.value = false"
                    >
                    </v-btn>

                    <v-btn
                        text="Save"
                        color="secondary text-none text-subtitle-1" 
                        variant="flat"
                        class="mx-5 elevation-1"
                        @click="submitForm() ; isActive.value = false; "
                    >
                    </v-btn>
                    
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>

    <v-overlay
      :model-value="showOverlay"
      class="align-center justify-center"
      >
        <v-progress-circular
            color="primary"
            size="64"
            indeterminate
        ></v-progress-circular>
      </v-overlay>

</template>

<script>
import { updateAInstallation } from '@/tools/api';
import { convertToISO } from '@/tools/convertDateTime'
export default {
    name: "editTestResult",
    data(){
        return{
            installationID: null,
            installationStatus: "Installed",
            clientName: null,
            contractor: null,
            region: null,
            regionOptions: [
              "Petaling",
              "Klang/Shah Alam",
              "Kuala Langat",
              "Sepang",
              "Gombak",
              "Hulu Langat",
              "Hulu Selangor",
              "Sabak Bernam",
              "Kuala Selangor",
              "Federal Territory of Kuala Lumpur",
              "Federal Territory of Putrajaya",
            ],
            installationDate: new Date(),
            showOverlay: false,
            dateToday: new Date().toISOString().substr(0, 10)
        }
    },
    watch:{

    },
    created(){
         this.installationID = this.$route.query.id;
    },
    methods:{
    
        // Function to convert date time
        convertToISO,

        // submit form action
        async submitForm(){
            this.showOverlay = true

            const updatedInstallation = {
                "installation_status": this.installationStatus,
                "installation_date": convertToISO(this.installationDate),
                "client": this.clientName,
                "region": this.region,
                "contractor": this.contractor,

            }

            try {
                await updateAInstallation(this.installationID, updatedInstallation)
                .then(() => {
                    this.installationStatus= 'Installed',
                    this.installationDate= null,
                    this.clientName= null,
                    this.region= null,
                    this.contractor= null,
                    
                    
                    this.$router.push({ name: 'installationDetails', query: { installationUpdated: 'true', id: this.installationID } })
                    .then(() => {
                        this.$router.replace({ name: 'installationDetails', query: {} });
                    });
                }).catch((error) => {
                    console.log(error.message);
                });
            } catch (error) {
                console.error("Failed to update installation", error);
            } finally{
                this.showOverlay = false
            }

        }
    }
}
</script>
