const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');

//mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Users = new Schema({
    username: { type: String, maxLength: 300 },
    normalname: { type: String, maxLength: 300 },
    password: { type: String, maxLength: 300 },
    role: { type: Boolean }
}, { timestamps: true, });

module.exports = mongoose.model('Users', Users);