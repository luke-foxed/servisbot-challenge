const { getLogsByWorkerId } = require('../logs/utils')
const { loadWorkers } = require('./utils')

exports.getAllWorkers = async (req, res) => {
  const workers = await loadWorkers()
  res.status(200).json(workers)
}

exports.getWorkerById = async (req, res) => {
  const workers = await loadWorkers()
  const worker = workers.find((w) => w.id === req.params.id)
  if (worker) {
    const logs = await getLogsByWorkerId(worker.id)
    const workerWithLogs = { ...worker, logs }
    res.status(200).json(workerWithLogs)
  } else {
    res.status(404).json({ message: 'Worker not found' })
  }
}
