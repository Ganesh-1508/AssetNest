const express = require('express');
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all property routes
router.use(protect);

router.route('/')
  .post(createProperty)
  .get(getProperties);

router.route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;
