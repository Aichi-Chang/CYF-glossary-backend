const port = process.env.PORT || 8000
const dbURIPrefix = 'mongodb://localhost/'
const dbName = 'cyf-glossary'
const dbURI = process.env.MONGODB_URI || `${dbURIPrefix}${dbName}`
const secret = 'This is my really secret string that nobody is going to be able to guesssssssss'

module.exports = { 
  port, 
  dbURI, 
  secret
}