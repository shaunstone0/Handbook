const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please enter a FAQ question'],
  },
  answer: {
    type: String,
    required: [true, 'Please enter an answer to the question'],
  },
  category: [
    {
      type: String,
      required: [true, 'please choose a category'],
      enum: [
        'Mobile Cancellations',
        'Internet Cancellations',
        'Customer Info',
        'Cash Register/Banking',
        'Insurance',
        'Suspensions',
        'Contracts',
        'Upgrades',
        'Sapphire',
        'Prepaid',
        'Devices',
        'Store Supplies',
      ],
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Faq', FaqSchema);
