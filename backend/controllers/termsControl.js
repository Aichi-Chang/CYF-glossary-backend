const Terms = require('../models/Terms')

function create(req, res) {
  Terms
    .create(req.body)
    .then(() => res.status(201).json({ message: 'One Term Created' }))
    .catch(err => res.json(err))
}

function readAll(req, res) {
  Terms
    .find()
    .then(ters => res.status(200).json(ters))
    .catch(err => res.json(err))
}

function readOne(req, res) {
  Terms
    .findById(req.params.id)
    .then(ters => {
      if (!ters) res.status(404).json({ message: 'Term Not Found' })
      else res.status(200).json(ters)
    })
    .catch(err => res.json(err))
}

function update(req, res) {
  Terms
    .findById(req.params.id)
    .then(ters => {
      if (!ters) return res.status(404).json({ message: 'Term Not Found' })
      return ters.set(req.body)
    })
    .then(ters => ters.save())
    .then(ters => ters.status(202).json(ters))
    .catch(errr => res.json(err))
}


function remove(req, res) {
  Terms
    .findById(req.params.id)
    .then(ters => {
      if (!ters) return res.status(404).json({ message: 'Term Not Found' })
      return ters.remove()
    })
    .then(() => res.status(200).json({ message: 'Term Deleted' }))
    .catch(errr => res.json(err))
}