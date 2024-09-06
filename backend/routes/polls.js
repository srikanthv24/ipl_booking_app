const express = require('express');
const router = express.Router();
const poll = require('../controllers').polls;
const middlewares = require('../middlewares');

router.post('/savePollOpinion', [middlewares.validator(['user_id', 'match_id']), poll.saveUserOpinionOnPoll])
router.get('/getPollResults', [middlewares.validator(['match_id']), poll.getPollResults])

module.exports = router;