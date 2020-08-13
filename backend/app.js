const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { check } = require('express-validator')

const { port, dbURI } = require('./config/dev')

const term = require('./controllers/term')
const user = require('./controllers/user')
const secureRoute = require('./lib/secureRoute')
const userControl = require('./lib/userControl')

const app = express()



// *************************** connect mongo *************************** 
mongoose.connect(dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Mongo is connected'))
    .catch(err => console.log(err)
)

// *************************** middlewhare *************************** 
app.use(cors())

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


// *************************** app ***************************
app.get('/', (req, res) => {
  res.send('it\'s working')
})

app.post('/all-terms', term.create)

app.get('/all-terms', term.readAll)

app.get('/all-terms/:id', term.readOne)

app.put('/all-terms/:id', term.update)

app.delete('/all-terms/:id', term.remove)

app.post('/register', [
  check('username').not().isEmpty().trim().escape(),
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }).trim().escape()
], user.register)

app.post('/login', [
  check('username').not().isEmpty().trim().escape(),
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }).trim().escape()
], user.login)

app.get('/users', user.allUsers)

app.get('/users/:id', user.oneUser)


// *************************** listen to port ***************************
app.listen(port, () => console.log(`Up and running on port ${port}`))

module.exports = app