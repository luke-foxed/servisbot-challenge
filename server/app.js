const express = require('express')
const cors = require('cors')
const workerRoutes = require('./routes/workers')
const botRoutes = require('./routes/bots')
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/workers', workerRoutes)
app.use('/api/bots', botRoutes)

module.exports = app
