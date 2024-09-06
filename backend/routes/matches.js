const express = require('express');
const router = express.Router();
const match = require('../controllers').matches;
const middlewares = require('../middlewares');

router.get('/matchList', match.matchesList)
router.get('/matchDetails', [middlewares.validator(['match_id']), match.matchDetails])

module.exports = router;