<template>
    <v-dialog max-width="500" scrollable max-height="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Edit Result"
            variant="flat"
            color="secondary text-none text-subtitle-1" 
            class="mx-5 elevation-1 text-h6 text-bold"
            ></v-btn>
        </template>
        
        <template v-slot:default="{ isActive }">
            <v-card  title="Lab Test">

                <v-autocomplete
                    v-model="testResult"
                    class="px-6 pt-3"
                    label="Test Result"
                    density="comfortable"
                    :items="testResultOptions"
                    variant="outlined"
                >
                </v-autocomplete>

                <v-text-field
                    v-model="tester"
                    class="px-6 pt-2"
                    label="Tester"
                    density="comfortable"
                    variant="outlined"
                >
                </v-text-field>

                <v-container>
                    <p class="text-grey text-subtitle-1 pl-5 pb-4">Test Date</p>
                    <v-row justify="center">
                        <v-date-picker color="secondary" hide-header v-model:model-value="testDate" :max="dateToday"></v-date-picker>
                    </v-row>
                </v-container>

                <v-textarea
                    v-model="comments"
                    class="px-6 pt-2"
                    label="Comments"
                    density="comfortable"
                    variant="outlined"
                >
                </v-textarea>

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
import { updateALabTest } from '@/tools/api.js'
import { convertToISO } from '@/tools/convertDateTime'
export default {
    name: "editTestResult",
    data(){
        return{
            testResultOptions:["Passed", "Failed"],
            testResult: "Passed",
            tester: null,
            testDate: new Date(),
            comments: null,
            labtestId: null,
            showOverlay: false,
            dateToday: new Date().toISOString().substr(0, 10)

        }
    },
    watch:{

    },
    created(){
         this.labtestId = this.$route.query.id;
    },
    methods:{
    
        // Function to convert date time
        convertToISO,

        // submit form action
        async submitForm(){
            this.showOverlay = true

            const updatedLabtest = {
                "tester": this.tester,
                "test_date": convertToISO(this.testDate),
                "test_status": this.testResult,
                "comments": this.comments
            }

            try {
                await updateALabTest(this.labtestId, updatedLabtest)
                .then(() => {
                    this.tester= null,
                    this.testDate= null,
                    this.testResult= null,
                    this.comments= null,
                    
                    
                    this.$router.push({ name: 'LabTestDetails', query: { labtestUpdated: 'true', id: this.labtestId } })
                    .then(() => {
                        this.$router.replace({ name: 'LabTestDetails', query: {} });
                    });
                }).catch((error) => {
                    console.log(error.message);
                });
            } catch (error) {
                console.error("Failed to update labtest", error);
            } finally{
                this.showOverlay = false
            }

        }
    }
}
</script>
