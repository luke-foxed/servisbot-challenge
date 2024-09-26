const fs = require('fs/promises')
const path = require('path')

const logsPath = path.join(process.cwd(), 'mock_data', 'logs.json')
let logsCache = null

const loadLogs = async () => {
  if (logsCache) return logsCache
  const rawLogsContent = await fs.readFile(logsPath, 'utf-8')
  logsCache = JSON.parse(rawLogsContent)
  return logsCache
}

const getLogsByWorkerId = async (workerId) => {
  const logs = await loadLogs()
  return logs.filter((log) => log.worker === workerId)
}

module.exports = { loadLogs, getLogsByWorkerId }
