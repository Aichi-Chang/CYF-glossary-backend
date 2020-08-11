const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, reuqired: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['students', 'mentor', 'admin'],
    default: 'students'
  },
  createdTerms: [{
    type: Schema.Types.ObjectId,
    ref: 'Terms'
  }]
}, {
  timestamps: true,
  toJSON: {
    transform(user, json) {
      return {
        username: json.username,
        email: json.email,
        id: json._id,
        role: json.role,
        createdTerms: json.createdTerms
      }
    }
  }
})

userSchema.plugin(uniqueValidator)


userSchema
  .virtual('passwordConfirmation')
  .get(function() {
    return this._passwordConfirmation
  })
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })


userSchema
  .pre('validate', function checkPassowrd(next) {
    if (this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Your Password Confirmaiotn Does Not Match')
    }
    next()
  })

 
userSchema
  .pre('save', function hashPassword(next) {
    if(this.password) {
      this.password = bcypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })


  userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}



module.exports = mongoose.model('User', userSchema)