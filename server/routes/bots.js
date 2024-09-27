const express = require('express')
const botsController = require('../controllers/bots')

const router = express.Router()

router.get('/', botsController.getAllBots)
router.get('/:id', botsController.getBotById)

module.exports = router
