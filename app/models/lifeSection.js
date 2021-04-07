const mongoose = require('mongoose')
const trackingItem = require('./trackingItem')

const lifeSectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  trackingItems: [trackingItem],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('LifeSection', lifeSectionSchema)
