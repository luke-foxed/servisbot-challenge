const express = require('express')
const cors = require('cors')
const workerRoutes = require('./routes/workers')
const botRoutes = require('./routes/bots')
const logRoutes = require('./routes/logs')
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/bots', botRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/logs', logRoutes)

module.exports = app
