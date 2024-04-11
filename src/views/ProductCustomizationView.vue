
<template>
  <!-- Header -->
  <v-container fluid class="bg-secondary elevation-2">
    <v-row class="py-7 pl-5">
      <div class="font-weight-bold text-h5">Product Customization</div>
    </v-row>
  </v-container>
    
  <!-- Content -->
  <v-card class="elevation-0 ma-3 bg-primary" >

    <!-- Supplier -->
    <v-card-item>
      <v-container grid-list-xs class="d-flex justify-space-between pb-0" fluid>
        <p class="text-h6">Supplier</p>
        <add-supplier-modal/>
      </v-container>
      <v-container grid-list-xs class="ma-0 pa-0">
        <p v-if="!this.suppliers.length" class="pl-5 text-subtitle-1 font-weight-regular text-quinary">{{ supplierError }}</p>
        <v-chip 
          close 
          class="cursor-pointer ma-2"
          color="secondary"
          v-for="(supplier, index) in suppliers" 
          :key="index"
        >
          {{ supplier }}
        </v-chip>
      </v-container>
    </v-card-item>

    <v-divider></v-divider>

    <!-- Type -->
    <v-card-item>
      <v-container grid-list-xs class="d-flex justify-space-between pb-0" fluid>
        <p class="text-h6">Type</p>
        <add-type-modal/>
      </v-container>
      <v-container grid-list-xs class="ma-0 pa-0">
        <p v-if="!this.types.length" class="pl-5 text-subtitle-1 font-weight-regulars text-quinary ">{{ typeError }}</p>
        <v-chip 
          close 
          class="cursor-pointer ma-2"
          color="secondary"
          v-for="(type, index) in types" 
          :key="index"
        >
          {{ type }}
        </v-chip>
      </v-container>
    </v-card-item>

    <v-divider></v-divider>

    <!-- Category -->
    <v-card-item>
      <v-container grid-list-xs class="d-flex justify-space-between pb-0" fluid>
        <p class="text-h6">Category</p>
        <add-category-modal/>
      </v-container>
      <v-container grid-list-xs class="ma-0 pa-0">
        <p v-if="!this.categories.length" class="pl-5 text-subtitle-1 font-weight-regular text-quinary" >{{ categoryError }}</p>
        <v-chip 
          close 
          class="cursor-pointer ma-2"
          color="secondary"
          v-for="(category, index) in categories" 
          :key="index"
        >
          {{ category }}
        </v-chip>
      </v-container>
    </v-card-item>

  </v-card>
</template>
  
<script>
import AddCategoryModal from '@/components/addCategoryModal.vue';
import AddSupplierModal from '@/components/addSupplierModal.vue';
import AddTypeModal from '@/components/addTypeModal.vue';
import { getAllCategories, getAllSuppliers, getAllTypes } from '@/tools/api';

  export default {
    name: 'ProductCustomizationView',
    components:{ AddSupplierModal, AddTypeModal, AddCategoryModal },
    data(){
      return{
        suppliers:[],
        supplierError: "Loading data...",
        types:[],
        typeError: "Loading data...",
        categories:[],
        categoryError: "Loading data...",
      }
    },
    created(){
        this.loadSupplier()
        this.loadType()
        this.loadCategory()
    },
    methods:{
      async loadSupplier(){
        await getAllSuppliers()
        .then((response) => {
            this.suppliers = response.supplier.map(supplier => supplier.name);
            if(this.suppliers.length == 0){this.supplierError = "No data available"} 
        }).catch((error) => {
            this.supplierError = error.message
            console.error('Error fetching suppliers:', error);
        });
      },
      async loadType(){
        await getAllTypes()
        .then((response) => {
            this.types = response.type.map(res => res.type);
            if(this.types.length == 0){this.typeError = "No data available"} 
        }).catch((error) => {
            this.typeError = error.message
            console.error('Error fetching product type:', error);
        });
      },
      async loadCategory(){
        await getAllCategories()
        .then((response) => {
            this.categories = response.category.map(res => res.category);
            if(this.categories.length == 0){this.categoryError = "No data available"} 
        }).catch((error) => {
            this.categoryError = error.message
            console.error('Error fetching product category:', error);
        });
      },
    }
  }
</script>
  