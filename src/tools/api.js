import axios from "axios";
import apiList from "./apiList.js"

// Labtest
const getAllLabTests = async()=>{
    try {
        const response = await axios.get(apiList.getAllLabTests);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getALabTest = async( id )=>{
    const url = apiList.getALabTest + id
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const updateALabTest = async( id, labtest )=>{
    const url = apiList.updateALabTest + id
    try {
        const response = await axios.put(url, labtest);
        return response.data;
    } catch (error) {
        console.error("Error udpating data:", error.message);
    }
}

const getALabTestByMeterID = async( id )=>{
    const url = apiList.getALabTestByMeterID + id
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createLabTest = async(labtest)=>{
    try{
        const response = await axios.post(apiList.createLabTest,labtest)
        return response
    }catch (error){
        console.error("Error Creating data:", error.message);
    }
}

// History
const getAllHistory = async()=>{
    try {
        const response = await axios.get(apiList.getAllHistory);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getAHistory = async( id )=>{
    const url = apiList.getAHistory + id
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getAHistoryByMeterID = async( id )=>{
    const url = apiList.getAHistoryByMeterID + id
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Error"
    }
}

const createHistory = async(history)=>{
    try{
        const response = await axios.post(apiList.createHistory,history)
        return response
    }catch (error){
        console.error("Error Creating data:", error.message);
    }
}

// Meters
const getAllMeters = async()=>{
    try {
        const response = await axios.get(apiList.getAllMeters);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getAMeter = async( id )=>{
    const url = apiList.getAMeter + id
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createMeter = async(meter)=>{
    try{
        const response = await axios.post(apiList.createMeter,meter)
        return response
    }catch (error){
        console.error("Error Creating data:", error.message);
    }
}




// Products
const getAllProducts = async()=>{
    try {
        const response = await axios.get(apiList.getAllProducts);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const getAProduct = async( id )=>{
    const url = apiList.getAProduct + id
    try {
        const response = await axios.get(url);
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

// Stores
const getAllStores = async()=>{
    try {
        const response = await axios.get(apiList.getAllStores);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

const createStore= async(store)=>{
    try{
        const response = await axios.post(apiList.createStore,store)
        return response
    }catch (error){
        console.error("Error Creating Store:", error.message);
    }
}


export { 
        getAllLabTests, getALabTest, createLabTest, getALabTestByMeterID,updateALabTest,
        getAHistory, getAllHistory,createHistory, getAHistoryByMeterID,
        getAllMeters,getAMeter,createMeter,
        getAllProducts, getAProduct, createProduct, 
        getAllSuppliers, createSupplier,
        getAllTypes, createType,
        getAllCategories,createCategory ,
        getAllStores, createStore
        }