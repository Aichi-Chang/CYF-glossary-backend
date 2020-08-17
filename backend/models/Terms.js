const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema;

const termsSchema = new Schema({
  // id: { type: Number, unique: true, required: true },
  name: { type: String, required: true, unique: true },
  discription: { type: String },
  link: { type: String },
  tags: [{ type: String }]
});

termsSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Terms", termsSchema);
