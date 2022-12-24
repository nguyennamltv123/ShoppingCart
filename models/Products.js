const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');

//mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Products = new Schema({
    name: { type: String, maxLength: 300 },
    describe: { type: String, maxLength: 600 },
    price: { type: Number },
    image: { type: String, maxLength: 500 },
    category: { type: String, maxLength: 255 },
}, { timestamps: true, });

module.exports = mongoose.model('Products', Products);