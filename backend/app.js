const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { port, dbURI } = require('./config/dev')

const terms = require('./controllers/terms')

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

app.post('/all-terms', terms.create)

app.get('/all-terms', terms.readAll)

app.get('/all-terms/:id', terms.readOne)

app.put('/all-terms/:id', terms.update)

app.delete('/all-terms/:id', terms.remove)




// *************************** listen to port ***************************
app.listen(port, () => console.log(`Up and running on port ${port}`))

module.exports = app