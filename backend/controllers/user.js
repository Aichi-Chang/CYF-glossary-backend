const { check, validationResult } = require('express-validator')
const Users = require('../models/Users')
const { translateAliases } = require('../models/Users')


function register(req, res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
  Users.create(req.body)
    .then(user => res.status(200).json({ message: `User Created, Hello ${user.username}!`}))
    .catch(err => res.stauts(422).json(err))
}


function login(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

  Users
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.validatePassword)) return res.status(401).json({ message: 'Unauthorized' })
      res.status(202).json({ message: `Hello again, ${user.username}`, user})
    })
    .catch(err => res.status(406).json({ massage: 'Something Went Wrong, Did you Enter Ther Correct Information?'}))
}