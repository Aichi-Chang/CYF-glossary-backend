const Terms = require('../models/Terms')

function create(req, res) {
  req.body.user = req.curUser
  Terms
    .create(req.body)
    .then(termCreated => res.status(201).json({ message: 'One Term Created', termCreated }))
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



function findByTags(req, res) {
  Terms
    .find({ tags: req.params.id })
    .then(ters => {
      return res.status(200).json(ters)
    })
    .catch(err => res.json(err))
}


function update(req, res) {
  Terms
    .findById(req.params.id)
    .then((ters) => {
      if(!ters) return res.status(404).json({ message: 'Term Not Found' })
      return ters.set(req.body)
    })
    .then(ters => ters.save())
    .then(ters => res.status(202).json(ters))
    .catch(err => res.json(err))
}


function remove(req, res) {

  Terms
    .findById(req.params.id)
    .then((ters) => {
      if (!ters) return res.status(404).json({ message: 'Term Not Found' })

      // if(ters.author.email !== req.curUser.email && req.curUser.role !== 'admin' && req.curUser.role !== 'mentor') {
      //   return res.status(403).json({ message: 'You Have No Access To Delete This Term' })
      // }

      return ters.remove()
    })
    .then(() => res.status(200).json({ message: 'Term Deleted' }))
    .catch(err => res.json(err))
}


module.exports = {
  create,
  readOne,
  readAll,
  findByTags,
  update,
  remove
}