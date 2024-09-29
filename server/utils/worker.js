const fs = require('fs/promises')
const path = require('path')
const { loadLogs } = require('./log')

const workersPath = path.join(process.cwd(), 'mock_data', 'workers.json')
let workersCache = null

const loadWorkers = async () => {
  if (workersCache) return workersCache
  const rawWorkersContent = await fs.readFile(workersPath, 'utf-8')
  workersCache = JSON.parse(rawWorkersContent)
  return workersCache
}

const getWorkersByBotName = async (botName) => {
  const workers = await loadWorkers()
  return workers.filter((worker) => worker.bot === botName)
}

const getLogsByBotId = async (bot) => {
  const logs = await loadLogs()
  return logs.filter((log) => log.bot === bot)
}

module.exports = { loadWorkers, getWorkersByBotName, getLogsByBotId }
