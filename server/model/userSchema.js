const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY



const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        //maintain the spaces form left and right
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("not a valid email ")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],

    carts: Array
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    next();
})


// generate Authentication token
userSchema.methods.generateAuthToken = async function () {

    try {

        //this refer to the current user
        const token = jwt.sign({ _id: this._id }, secretKey);
        // tokens/token stores the value of generated token with sign 
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (error) {

        console.log(error);

    }

}






const USER = new mongoose.model("USER", userSchema);

module.exports = USER;
