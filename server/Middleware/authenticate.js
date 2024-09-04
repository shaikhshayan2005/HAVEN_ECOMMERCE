const jwt = require("jsonwebtoken");
const USER = require("../model/userSchema");
const secretKey = process.env.KEY;

//defining a middleware function
const authenticate = (req, res, next) => {
    try {

        //store the cookies in token 
        const token = req.cookies.Havenweb;
        //verify the auth token and cookie data
        const verifyToken = jwt.verify(token, secretKey);
        console.log(verifyToken);

    } catch (error) {

        

    }
}
