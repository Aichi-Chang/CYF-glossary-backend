const mongoose = require('mongoose')
const Users = require('./Users')

const Schema = mongoose.Schema

const termsSchema = new Schema({
  name: { type: String },
  discription: { type: String },
  link: { type: String },
  author: { type: Schema.Types.Object, ref: Users, requrired: true }
})


module.exports = mongoose.model('Terms', termsSchema)