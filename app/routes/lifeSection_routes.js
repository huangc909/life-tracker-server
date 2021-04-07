const express = require('express')
const passport = require('passport')

const customErrors = require('../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const LifeSection = require('../models/lifeSection')

const router = express.Router()

// GET request for all life sections
router.get('/lifeSections', requireToken, (req, res, next) => {
  LifeSection.find()
    .then(lifeSections => {
      return lifeSections.map(lifeSection => lifeSection.toObject())
    })
    .then(lifeSections => res.status(200).json({ lifeSections: lifeSections }))
    .catch(next)
})

// GET request for one life section
router.get('/lifeSections/:lifeSectionId', requireToken, (req, res, next) => {
  const lifeSectionId = req.params.lifeSectionId

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => res.status(200).json({ lifeSection: lifeSection.toObject() }))
    .catch(next)
})

// POST request for new life section
router.post('/lifeSections', requireToken, (req, res, next) => {
  req.body.lifeSection.owner = req.user.id
  const lifeSectionData = req.body.lifeSection

  LifeSection.create(lifeSectionData)
    .then(lifeSection => {
      res.status(201).json({ lifeSection: lifeSection.toObject() })
    })
    .catch(next)
})

// PATCH request for one life section
router.patch('/lifeSections/:lifeSectionId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.lifeSection.owner
  const lifeSectionId = req.params.lifeSectionId

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => {
      requireOwnership(req, lifeSection)
      return lifeSection.updateOne(req.body.lifeSection)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE request for one life section
router.delete('/lifeSections/:lifeSectionId', requireToken, (req, res, next) => {
  const lifeSectionId = req.params.lifeSectionId

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => {
      requireOwnership(req, lifeSection)
      lifeSection.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
