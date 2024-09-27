const express = require('express')
const logsController = require('../controllers/logs')

const router = express.Router()

router.get('/', logsController.getAllLogs)
router.get('/:id', logsController.getLogsById)

module.exports = router
