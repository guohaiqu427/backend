const mongoose = require("mongoose");
const { tagSchema } = require("./tag")
const { categorySchema } = require("./category");
const Joi = require("joi");



const deckerSchema = new mongoose.Schema({
    question: {
        type: String,
        minlength: 10,
        maxlength: 100,
        required: true
    },
    answer: {
        type: String,
        minlength: 10,
        maxlength: 300,
        required: true
    },
    tag: {
        type: tagSchema,
        ref: "Tag",
        required:true
    },
    category: {
        type: categorySchema,
        ref: "Category",
        required:true
    }
})

const Decker = mongoose.model ("Decker", deckerSchema)

function validateDecker (decker) {
    const schema = Joi.object({
        question: Joi.string().min(3).max(30).required(),
        answer: Joi.string().min(3).max(30).required(),
        tag: Joi.objectId().required(),
        category: Joi.objectId().required()
        })
    
        return schema.validate(decker)
}

exports.Decker = Decker
exports.validateDecker = validateDecker