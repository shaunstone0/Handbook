const express = require('express');
const {
  createUser,
  deleteUser,
  deleteFaq,
  getUsers,
} = require('../controllers/admin/adminRoutes');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

router.use(protect);
router.use(authorize('admin'));

router.route('/users').get(advancedResults(User), getUsers);
router.route('/user/create').post(createUser);
router.route('/user/delete/:id').delete(deleteUser);
router.route('/faq/delete/:id').delete(deleteFaq);

// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
