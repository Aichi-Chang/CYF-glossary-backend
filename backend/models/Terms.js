const mongoose = require("mongoose");
const Users = require("./Users");
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema;

const termsSchema = new Schema({
  // id: { type: Number, unique: true, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  link1: { type: String },
  link2: { type: String },
  tags: [{ type: String }],
});

termsSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Terms", termsSchema);
