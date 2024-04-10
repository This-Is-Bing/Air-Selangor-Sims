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
        console.error("Error Creating product:", error.message);
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



export { getAllProducts, createProduct, getAllSuppliers }