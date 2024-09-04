const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() =>
    console.log("database connected successfully"))
    .catch((error) => console.log("database not connected to successfully"+error.message))