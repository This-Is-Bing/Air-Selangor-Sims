// List of all APIs
const apiList = {
    // Imagekit'
    authenticationEndpoint : "https://sims-server-api.vercel.app/imagekit/auth",

    // Meters
    getAllMeters : "https://sims-server-api.vercel.app/meter/all",
    getAMeter : "https://sims-server-api.vercel.app/meter/",
    createMeter: "https://sims-server-api.vercel.app/meter/create",

    // Certificate
    getAllCertificates : "https://sims-server-api.vercel.app/meter/certificate/all",
    createCertificate: "https://sims-server-api.vercel.app/meter/certificate/create",

    // Products
    getAllProducts : "https://sims-server-api.vercel.app/product/all",
    getAProduct : "https://sims-server-api.vercel.app/product/",
    createProduct : "https://sims-server-api.vercel.app/product/create",

    // Suppliers
    getAllSuppliers : "https://sims-server-api.vercel.app/product_data/supplier/all",
    createSupplier : "https://sims-server-api.vercel.app/product_data/supplier/create",

    // Type
    getAllTypes : "https://sims-server-api.vercel.app/product_data/type/all",
    createType : "https://sims-server-api.vercel.app/product_data/type/create",

    // Category
    getAllCategories : "https://sims-server-api.vercel.app/product_data/category/all",
    createCategory: "https://sims-server-api.vercel.app/product_data/category/create",

    // Stores
    getAllStores : "https://sims-server-api.vercel.app/store/all",
    createStore: "https://sims-server-api.vercel.app/store/create",
}

export default apiList