const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');

//mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Categories = new Schema({
    title: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255 }
}, { timestamps: true, });

module.exports = mongoose.model('Categories', Categories);