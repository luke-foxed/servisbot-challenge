const { loadLogs } = require('./utils')

// need to setup 'mock' pagination with this
exports.getAllLogs = async (req, res) => {
  const logs = await loadLogs()
  res.status(200).json(logs)
}

exports.getLogsById = async (req, res) => {
  const logs = await loadLogs()
  const log = logs.find((l) => l.id === req.params.id)
  if (log) {
    res.status(200).json(log)
  } else {
    res.status(404).json({ message: 'Log not found' })
  }
}
