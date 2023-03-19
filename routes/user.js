const express = require("express")
const bcrypt = require("bcrypt")
const auth = require("../middleware/auth")
const {User, validateUser} = require("../models/user")
const router = express.Router()

router.post("/", async(req,res)=> {
    const error = validateUser(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    })
    await user.save()
    const token = user.generateAuthToken()
    res.header("x-auth-token", token).send(user)
})
router.get("/", auth, async(req,res)=> {
    const users = await User.find()
    res.send(users)
})
router.get("/:id", auth, async(req,res)=> {
    // todo: validate objectid
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("user with the given id was not found")

    res.send(user)
})
router.put("/:id",auth, async(req,res)=> {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("user with the given id was not found")

    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password 
    await user.save()
    res.send(user)

})
router.delete("/:id", auth, async(req,res)=> {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("user with the given id was not found")

    user.deleteOne()
    res.send(user)
})

module.exports = router 