import axios from "axios";
import apiList from "./apiList.js"

// Products
const getAllProducts = async()=>{
    try {
        const response = await axios.get(apiList.getAllProducts);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createProduct = async(product)=>{
    try{
        const response = await axios.post(apiList.createProduct,product)
        return response
    }catch (error){
        console.error("Error Creating Product:", error.message);
    }
}


// Suppliers
const getAllSuppliers = async()=>{
    try {
        const response = await axios.get(apiList.getAllSuppliers);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createSupplier = async(supplier)=>{
    try{
        const response = await axios.post(apiList.createSupplier,supplier)
        return response
    }catch (error){
        console.error("Error Creating Supplier:", error.message);
    }
}


// Product Type
const getAllTypes = async()=>{
    try {
        const response = await axios.get(apiList.getAllTypes);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createType = async(type)=>{
    try{
        const response = await axios.post(apiList.createType,type)
        return response
    }catch (error){
        console.error("Error Creating Product Type:", error.message);
    }
}


// Product Category
const getAllCategories = async()=>{
    try {
        const response = await axios.get(apiList.getAllCategories);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createCategory = async(category)=>{
    try{
        const response = await axios.post(apiList.createCategory,category)
        return response
    }catch (error){
        console.error("Error Creating Category:", error.message);
    }
}


export { 
        getAllProducts, createProduct, 
        getAllSuppliers, createSupplier,
        getAllTypes, createType,
        getAllCategories,createCategory  
        }