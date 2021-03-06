const mongoose = require('mongoose')
const { dbURI } = require('../config/dev')
const Terms = require('../models/Terms')


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return Terms.create([
          {
            name: 'http 200 OK',
            description: 'The HTTP 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200',
            tags: ['http', 'status']
          }, {
            name: 'http 201 Created',
            description: 'The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource. The new resource is effectively created before this response is sent back and the new resource is returned in the body of the message, its location being either the URL of the request, or the content of the Location header.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201',
            tags: ['http', 'status']
          }, {
            name: 'http 300 Multiple Choices',
            description: 'The HTTP 300 Multiple Choices redirect status response code indicates that the request has more than one possible responses. The user-agent or the user should choose one of them. As there is no standardized way of choosing one of the responses, this response code is very rarely used.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300',
            tags: ['http', 'stauts']
          }, {
            name: 'http 401 Unauthorized',
            description: 'The HTTP 401 Unauthorized client error status response code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401',
            tags: ['http', 'error', 'status'] 
          },{
            name: 'http 404 Not Found',
            description: 'The HTTP 404 Not Found client error response code indicates that the server can\'t find the requested resource. Links that lead to a 404 page are often called broken or dead links and can be subject to link rot.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404',
            tags: ['http', 'error', 'status']
          }, {
            name: 'http 406 Not Acceptable',
            description: 'The HyperText Transfer Protocol (HTTP) 406 Not Acceptable client error response code indicates that the server cannot produce a response matching the list of acceptable values defined in the request\'s proactive content negotiation headers, and that the server is unwilling to supply a default representation.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406',
            tags: ['http', 'error', 'status'] 
          }, {
            name: 'http 500 Internal Server Error',
            description: 'The HyperText Transfer Protocol (HTTP) 500 Internal Server Error server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
            link1: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500',
            link2: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500',
            tags: ['http', 'error', 'status'] 
          }          
        ])
      })
      .then(ters => {
        console.log(`${ters.length} Terms Created`)
      })
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())

  })


