const { loadLogs } = require('../../utils/logUtils')
const paginateResults = require('../../utils/pagination')

// need to setup 'mock' pagination with this
exports.getAllLogs = async (req, res) => {
  const logs = await loadLogs()
  const paginatedLogs = paginateResults(logs, 50, req?.query?.page)
  res.status(200).json(paginatedLogs)
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
