const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    id: { type: String },
    url: { type: String },
    detailUrl: { type: String },
    title: { type: Object },
    price: { type: Object },
    description: { type: String },
    discount: { type: String },
    tagline: { type: String }
});
 
// "products" is the collection name
const Products  = new mongoose.model("products" , productSchema);
module.exports = Products;
