const express = require('express')

const passport = require('passport')

const LifeSection = require('../models/lifeSection')

const customErrors = require('../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/lifeSections', requireToken, (req, res, next) => {
  LifeSection.find()
    .then(lifeSections => {
      return lifeSections.map(lifeSection => lifeSection.toObject())
    })
    .then(lifeSections => res.status(200).json({ lifeSections: lifeSections }))
    .catch(next)
})

router.get('/lifeSections/:id', requireToken, (req, res, next) => {
  LifeSection.findById(req.params.id)
    .then(handle404)
    .then(lifeSection => res.status(200).json({ lifeSection: lifeSection.toObject() }))
    .catch(next)
})

router.post('/lifeSections', requireToken, (req, res, next) => {
  req.body.lifeSection.owner = req.user.id

  LifeSection.create(req.body.lifeSection)
    .then(lifeSection => {
      res.status(201).json({ lifeSection: lifeSection.toObject() })
    })
    .catch(next)
})

router.patch('/lifeSections/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.lifeSection.owner

  LifeSection.findById(req.params.id)
    .then(handle404)
    .then(lifeSection => {
      requireOwnership(req, lifeSection)
      return lifeSection.updateOne(req.body.lifeSection)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/lifeSections/:id', requireToken, (req, res, next) => {
  LifeSection.findById(req.params.id)
    .then(handle404)
    .then(lifeSection => {
      requireOwnership(req, lifeSection)
      lifeSection.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
