const filterResults = require('../../utils/filter')
const { loadLogs } = require('../../utils/log')
const paginateResults = require('../../utils/pagination')

// need to setup 'mock' pagination with this
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await loadLogs()
    const filteredLogs = filterResults(logs, req.query)
    const paginatedLogs = paginateResults(filteredLogs, 50, req.query?.page)
    res.status(200).json(paginatedLogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

exports.getLogsById = async (req, res) => {
  try {
    const logs = await loadLogs()
    const log = logs.find((l) => l.id === req.params.id)
    if (log) {
      res.status(200).json(log)
    } else {
      res.status(404).json({ message: 'Log not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
