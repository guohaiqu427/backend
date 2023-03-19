const express = require("express")
const auth = require("../middleware/auth")
const {Tag, validateTag} = require("../models/tag")
const router = express.Router()

router.post("/", auth,async(req,res)=> {
    const error = validateTag(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    const tag = new Tag({
        name: req.body.name
    })
    await tag.save()
    res.send(tag)
})
router.get("/", async(req,res)=> {
    const tags = await Tag.find()
    res.send(tags)
})
router.get("/:id", async(req,res)=> {
    // todo: validate objectid
    const tag = await Tag.findById(req.params.id)
    if(!tag) return res.status(404).send("tag with the given id was not found")

    res.send(tag)
})
router.put("/:id", auth, async(req,res)=> {
    const tag = await Tag.findById(req.params.id)
    if(!tag) return res.status(404).send("tag with the given id was not found")

    tag.name = req.body.name
    await tag.save()
    res.send(tag)

})
router.delete("/:id", auth, async(req,res)=> {
    const tag = await Tag.findById(req.params.id)
    if(!tag) return res.status(404).send("tag with the given id was not found")

    tag.deleteOne()
    res.send(tag)
})

module.exports = router 