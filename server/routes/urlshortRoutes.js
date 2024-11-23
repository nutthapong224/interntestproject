const express = require('express');
const router = express.Router();
const { handleRedirect } = require('../controllers/shorturlcontroller');

// Dynamic route for shortened URLs
router.get('/:shortUrl', handleRedirect);

module.exports = router;
