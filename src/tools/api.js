import axios from "axios";
import apiList from "./apiList.js"

const getAllProducts = async()=>{
    axios.get(apiList.getAllProducts)
    .then((allProducts) => {
        console.log(allProducts.data.products);
    }).catch((error) => {
        console.log("Error fetching data: ", error.message);
    });
}

export { getAllProducts }