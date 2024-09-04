const Products = require("./model/productsSchema");
const productdata = require("./constant/productdata");

const DefaultData = async () => {
    try {
        //donot save the porducts after starting or saving file
        await Products.deleteMany({});

        // added because there are several items in array to store 
        const storeData = await Products.insertMany(productdata);
        console.log(storeData);
    }
    catch (error) {
        console.log("error" + error.message);
    }
}

module.exports = DefaultData;