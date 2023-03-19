const express = require("express")
const auth = require("../middleware/auth")

const {Category, validateCategory} = require("../models/category")
const router = express.Router()

router.post("/", auth, async(req,res)=> {
    const error = validateCategory(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    const category = new Category({
        name: req.body.name
    })
    await category.save()
    res.send(category)
})
router.get("/", async(req,res)=> {
    const category = await Category.find()
    res.send(category)
})
router.get("/:id", async(req,res)=> {
    // todo: validate objectid
    const category = await Category.findById(req.params.id)
    if(!category) return res.status(404).send("category with the given id was not found")

    res.send(category)
})
router.put("/:id",auth, async(req,res)=> {
    const category = await Category.findById(req.params.id)
    if(!category) return res.status(404).send("category with the given id was not found")

    category.name = req.body.name
    await category.save()
    res.send(category)

})
router.delete("/:id",auth, async(req,res)=> {
    const category = await Category.findById(req.params.id)
    if(!category) return res.status(404).send("category with the given id was not found")

    category.deleteOne()
    res.send(category)
})

module.exports = router 

