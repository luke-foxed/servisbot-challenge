const express = require('express')
const workerController = require('../controllers/workers')

const router = express.Router()

router.get('/', workerController.getAllWorkers)
router.get('/:id', workerController.getWorkerById)

module.exports = router
