const mongoose = require('mongoose')

const Schema = mongoose.Schema

const termsSchema = new Schema({
  name: { type: String },
  discription: { type: String },
  link: { type: String }
})


module.exports = mongoose.model('Terms', termsSchema)