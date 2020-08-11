const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const Users = require('../models/Users')
const { secret } = require('../config/dev')


function register(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
  Users
    .create(req.body)
    .then(user => res.status(200).json({ message: `One User Created, Hello ${user.username}!`}))
    .catch(err => console.log(err))
}


function login(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  Users
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' })
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '12h' })
      res.status(202).json({ message: `Hello Again, ${user.username}`, token, user})
    })
    .catch(err => console.log(err))
}


function allUsers(req, res) {
  Users
    .find()
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err))
}


function oneUser(req, res) {
  Users
    .findById(req.params.id)
    .then(user => {
      if(!user) return res.stauts(404).json({ message: 'User Not Found' })
      return res.status(200).json(user)
    })
    .catch(err => res.json(err))
}



module.exports = {
  register,
  login, 
  allUsers,
  oneUser
}