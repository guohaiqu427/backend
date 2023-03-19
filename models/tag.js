const mongoose = require("mongoose");
const Joi = require("joi")

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 3,
        maxlength: 30,
    }
})

const Tag = mongoose.model("Tag", tagSchema)

function validateTag (tag) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
        })
    return schema.validate(tag);
}

exports.Tag = Tag
exports.validateTag = validateTag
exports.tagSchema = tagSchema