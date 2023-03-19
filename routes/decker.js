const express = require("express")
const { Category } = require("../models/category")
const { Tag } = require("../models/tag")
const {Decker, validateDecker} = require("../models/decker")
const router = express.Router()




router.post("/", async(req,res)=> {
    const error = validateDecker(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.category)
    const tag = await Tag.findById(req.body.tag)

    const decker = new Decker({
        question: req.body.question,
        answer:req.body.answer,
        tag: {
            _id: tag._id,
            name: tag.name
        },
        category: {
            _id: category._id,
            name: category.name
        }
    })
    await decker.save()
    res.send(decker)
})
router.get("/", async(req,res)=> {
    const deckers = await Decker.find()
    res.send(deckers)
})
router.get("/:id", async(req,res)=> {
    // todo: validate objectid
    const decker = await Decker.findById(req.params.id)
    if(!decker) return res.status(404).send("decker with the given id was not found")

    res.send(decker)
})
router.put("/:id", async(req,res)=> {
    const decker = await Decker.findById(req.params.id)
    if(!decker) return res.status(404).send("decker with the given id was not found")

    const category = await Category.findById(req.body.category)
    const tag = await Tag.findById(req.body.tag)


    decker.question = req.body.question
    decker.answer = req.body.answer 
    decker.tag = {
        _id : tag._id,
        name: tag.name
    }
    decker.category = {
        _id : tag._id,
        name: category.name
    }
    await decker.save()
    res.send(decker)

})
router.delete("/:id", async(req,res)=> {
    const decker = await Decker.findById(req.params.id)
    if(!decker) return res.status(404).send("decker with the given id was not found")

    decker.deleteOne()
    res.send(decker)
})

module.exports = router 
