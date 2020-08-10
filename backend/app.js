const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { port, dbURI } = require('./config/dev')

const termsControler = require('./controllers/termsControl')

const app = express()



// *************************** connect mongo *************************** 
mongoose.connect(dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('Mongo is connected'))
    .catch(err => console.log(err)
)

// *************************** middlewhare *************************** 
// app.use(cors)

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept')
  next()
})


// *************************** app ***************************
app.get('/', (req, res) => {
  res.send('it\'s working')
})

app.post('/all-terms', termsControler.create)

app.get('/all-terms', termsControler.readAll)

app.get('/all-terms/:id', termsControler.readOne)

app.put('/all-terms/:id', termsControler.update)

app.delete('/all-terms/:id', termsControler.remove)




// *************************** listen to port ***************************
app.listen(port, () => console.log(`Up and running on port ${port}`))

module.exports = app