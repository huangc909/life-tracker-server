const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const LifeSection = require('../models/lifeSection')

const router = express.Router()

// GET request for one tracking item
router.get('/lifeSections/:lifeSectionId/trackingItems/:trackingItemId', requireToken, (req, res, next) => {
  const lifeSectionId = req.params.lifeSectionId
  const trackingItemId = req.params.trackingItemId

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => {
      let trackingItem = lifeSection.trackingItems.id(trackingItemId)
      trackingItem = handle404(trackingItem)
      res.status(200).json({trackingItem: trackingItem})
    })
    .catch(next)
})

// POST request for new tracking item
router.post('/lifeSections/:lifeSectionId/trackingItems', requireToken, (req, res, next) => {
  req.body.trackingItem.owner = req.user.id
  const lifeSectionId = req.params.lifeSectionId
  const trackingItemData = req.body.trackingItem

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => {
      lifeSection.trackingItems.push(trackingItemData)
      return lifeSection.save()
    })
    .then(lifeSection => res.status(201).json({ lifeSection: lifeSection }))
    .catch(next)
})

// PATCH request for one tracking item
router.patch('/lifeSections/:lifeSectionId/trackingItems/:trackingItemId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.trackingItem.owner
  const lifeSectionId = req.params.lifeSectionId
  const trackingItemId = req.params.trackingItemId
  const trackingItemData = req.body.trackingItem

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => {
      requireOwnership(req, lifeSection)
      lifeSection.trackingItems.id(trackingItemId).set(trackingItemData)
      return lifeSection.save()
    })
    .then(lifeSection => res.status(200).json({ lifeSection: lifeSection }))
    .catch(next)
})

// DELETE request for one tracking item
router.delete('/lifeSections/:lifeSectionId/trackingItems/:trackingItemId', requireToken, (req, res, next) => {
  const lifeSectionId = req.params.lifeSectionId
  const trackingItemId = req.params.trackingItemId

  LifeSection.findById(lifeSectionId)
    .then(handle404)
    .then(lifeSection => {
      requireOwnership(req, lifeSection)
      lifeSection.trackingItems.id(trackingItemId).remove()
      return lifeSection.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
