const fs = require('fs/promises')
const path = require('path')

const workersPath = path.join(process.cwd(), 'mock_data', 'workers.json')
let workersCache = null

// PRIVATE
const loadWorkers = async () => {
  if (workersCache) return workersCache
  const rawWorkersContent = await fs.readFile(workersPath, 'utf-8')
  workersCache = JSON.parse(rawWorkersContent)
  return workersCache
}

exports.getAllWorkers = async (req, res) => {
  const workers = await loadWorkers()
  res.status(200).json(workers)
}

exports.getWorkerById = async (req, res) => {
  const workers = await loadWorkers()
  const worker = workers.find((w) => w.id === parseInt(req.params.id, 10))
  if (worker) {
    res.status(200).json(worker)
  } else {
    res.status(404).json({ message: 'Worker not found' })
  }
}