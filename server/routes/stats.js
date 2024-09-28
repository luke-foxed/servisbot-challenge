const express = require('express')
const statsController = require('../controllers/stats')

const router = express.Router()

router.get('/', statsController.getPlatformStats)

module.exports = router
