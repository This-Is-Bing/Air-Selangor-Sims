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


// Suppliers
const getAllSuppliers = async()=>{
    try {
        const response = await axios.get(apiList.getAllSuppliers);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}



export { getAllProducts, getAllSuppliers }