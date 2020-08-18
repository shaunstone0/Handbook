const asyncHandler = require('../../middleware/async');
const Faq = require('../../models/Faq');
const utf8 = require('utf8');

// @desc      Get all FAQ
// @route     GET /api/v1/faq
// @access    Private
exports.getFaqs = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single FAQ
// @route     GET /api/v1/faq/:id
// @access    Private
exports.getFaq = asyncHandler(async (req, res, next) => {
  let faq = await Faq.findById(req.params.id);

  let views = faq.views++;

  Faq.findByIdAndUpdate(req.params.id, views, {
    new: true,
    runValidators: true,
  });

  await faq.save();

  res.status(200).json({
    success: true,
    data: faq,
  });
});

// @desc      Create FAQ
// @route     POST /api/v1/faq/create
// @access    Private

exports.createFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.create(req.body);

  res.status(201).json({
    success: true,
    data: faq,
  });
});

// @desc      Update FAQ
// @route     PUT /api/v1/faq/:id
// @access    Private
exports.updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: faq,
  });
});

exports.upload;
