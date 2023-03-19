const express = require("express")
const {User} = require("../models/user")
const Joi = require("joi")
const bcrypt = require("bcrypt")

const router = express.Router() 

function validate (auth) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required()
        })
    return schema.validate(auth);
}

router.post("/", async(req, res) => {
    // validate user input
    const error = validate (req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(404).send("user with the given email was not found")


    // validate crypted password
   const isValid = await bcrypt.compare(req.body.password, user.password);
   if(!isValid) return res.status(400).send("invalid email or password")

   const token = user.generateAuthToken()
   res.header("x-auth-token", token).send(user) // ?

})


module.exports = router 