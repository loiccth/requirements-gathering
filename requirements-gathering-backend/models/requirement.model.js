const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requirementSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    priority: { type: Number, require: true, min: 1, max: 100 },
    moscow: { type: Number, require: true, min: 1, max: 4 },
    status: { type: String, enum: ['inprogress', 'completed', 'obsolete'], default: 'inprogress' },
    img: { type: String, required: false, trim: true }
}, { timestamps: true })

const Post = mongoose.model('Requirements', requirementSchema)

module.exports = Post