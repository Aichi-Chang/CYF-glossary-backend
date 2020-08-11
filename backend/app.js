const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

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

app.put('/all-terms/:id', secureRoute, userControl('admin', 'mentor'), term.update)

app.delete('/all-terms/:id', secureRoute, userControl('admin', 'mentor'), term.remove)

app.post('/register', user.register)

app.post('/login', user.login)

app.get('/users', secureRoute, userControl('admin'), user.allUsers)

app.get('/users/:id', secureRoute, userControl('admin'), user.oneUser)


// *************************** listen to port ***************************
app.listen(port, () => console.log(`Up and running on port ${port}`))

module.exports = app