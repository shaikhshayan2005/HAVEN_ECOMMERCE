const express = require("express");
const router = new express.Router();
const Products = require("../model/productsSchema");
const products = require("../constant/productdata");
const USER = require("../model/userSchema");
const bcrypt = require("bcryptjs");




// get product data getproductsdata api
router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        res.status(201).json(productsdata);

    } catch (error) {
        console.log("error" + error.message);

    }

})



//individual details api 
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);

        const individualdata = await Products.findOne({ id: id });
        console.log("this is individual data of " + id);
        // console.log(individualdata);

        res.status(201).json(individualdata);


    } catch (error) {

        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
})



// api to register the user in the database
router.post("/register", async (req, res) => {

    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill the all details" });

    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new USER({
                fname, email, mobile, password, cpassword
            });


            //password hashing is done here using middleware form userSchema


            const storedata = await finaluser.save();
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error" + error.message);
        res.status(422).send(error);
    }

});


// login the user using email and pasword 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "enter the data to login" });
    }

    try {
        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin + "loged in user  ");

        if (userlogin) {
            //compare the password enter by the user and the database
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);


            // auth token generate
            const token = await userlogin.generateAuthToken();
            console.log("this is auth token" + token);


            //generate the cookie with the help of token 
            res.cookie("Havenweb", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });



            if (!isMatch) {
                res.status(400).json({ error: "incorrect password " });
            }
            else {
                res.status(201).json(userlogin);
            }
        }
        else {

            res.status(400).json({ error: "invalid credentials" });

        }

    } catch (error) {

        res.status(400).json({ error: "not able to login" });

    }
})


//api for add to cart 
router.post("/addtocart", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = Products.findOne({ id: id });
        cosole.log(cart);

        //middleware function 

    } catch (error) {

    }
})


module.exports = router;