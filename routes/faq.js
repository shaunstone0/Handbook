const express = require('express');
const {
  getFaqs,
  getFaq,
  createFaq,
  updateFaq,
  deleteFaq,
} = require('../controllers/faq/FaqRoutes');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');
const Faq = require('../models/Faq');

router.post('/create', protect, createFaq);
router.get('/', protect, advancedResults(Faq), getFaqs);

router.route('/:id').get(protect, getFaq).put(protect, updateFaq);

module.exports = router;
