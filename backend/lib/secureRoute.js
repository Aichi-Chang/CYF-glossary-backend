const Users = require('../models/Users')
const { secret } = require('../config/dev')
const jwt = require('jsonwebtoken')


function secureRoute(req, res, next) {
  if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No Header / Wrong Header Format' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json({ messgae: 'Seems Like Your Login Credential Is Not Correct' })
  
    Users
      .findById(payload.sub)
      .then(user => {
        if(!user) return res.status(401).json({ message: 'No User Found' })

        // assign our user in the user collection to req.curUser
        req.curUser = user

        next()
      })
      .catch(err => console.log(err))
  })
}



module.exports = secureRoute