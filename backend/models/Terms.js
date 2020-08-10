const mongoose = require('mongoose')

const Schema = mongoose.Schema

const termSchema = new Schema({
  name: { type: String },
  discription: { type: String },
  link: { type: String }
})


module.exports = mongoose.model('Terms', termsSchema)