// List of all APIs
const apiList = {
    // Imagekit'
    authenticationEndpoint : "https://sims-server-api.vercel.app/imagekit/auth",

    // Meters
    getAllMeters : "https://sims-server-api.vercel.app/meter/all",
    getMeterByProductID : "https://sims-server-api.vercel.app/meter/product_id/",
    getAMeter : "https://sims-server-api.vercel.app/meter/",
    createMeter: "https://sims-server-api.vercel.app/meter/create",
    updateMeterStatus: "https://sims-server-api.vercel.app/meter/update/",

    // Lab Test
    getAllLabTests : "https://sims-server-api.vercel.app/labtest/all",
    getALabTest: "https://sims-server-api.vercel.app/labtest/",
    updateALabTest: "https://sims-server-api.vercel.app/labtest/update/",
    getALabTestByMeterID: "https://sims-server-api.vercel.app/labtest/meter_id/",
    createLabTest: "https://sims-server-api.vercel.app/labtest/create",

    // Installation
    getAllInstallations : "https://sims-server-api.vercel.app/installation/all",
    getAInstallation: "https://sims-server-api.vercel.app/installation/",
    updateAInstallation: "https://sims-server-api.vercel.app/installation/update/",
    getAInstallationByMeterID: "https://sims-server-api.vercel.app/installation/meter_id/",
    createInstallation: "https://sims-server-api.vercel.app/installation/create",

    // Refunds
    getAllRefunds : "https://sims-server-api.vercel.app/refund/all",
    getARefund: "https://sims-server-api.vercel.app/refund/",
    updateARefund: "https://sims-server-api.vercel.app/refund/update/",
    getARefundByMeterID: "https://sims-server-api.vercel.app/refund/meter_id/",
    createRefund: "https://sims-server-api.vercel.app/refund/create",    

    // History
    getAllHistory : "https://sims-server-api.vercel.app/history/all",
    getAHistory: "https://sims-server-api.vercel.app/history/",
    getAHistoryByMeterID: "https://sims-server-api.vercel.app/history/meter_id/",
    createHistory: "https://sims-server-api.vercel.app/history/create",

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