require("dotenv").config();
require("./db/conn");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Products = require("./model/productsSchema")
const DefaultData = require("./DefaultData");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");


//data has to be parsed in json 
app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router)



const port = 8005;

app.listen(port, () => {
    console.log(`server is connected to ${port}`)
})
DefaultData();