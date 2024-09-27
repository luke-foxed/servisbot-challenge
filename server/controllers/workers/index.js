const { getLogsByWorkerId } = require('../../utils/logUtils')
const { loadWorkers } = require('../../utils/workerUtils')
const paginateResults = require('../../utils/pagination')

exports.getAllWorkers = async (req, res) => {
  const workers = await loadWorkers()
  res.status(200).json(paginateResults(workers, 50, req.query?.page))
}

exports.getWorkerById = async (req, res) => {
  const workers = await loadWorkers()
  const worker = workers.find((w) => w.id === req.params.id)
  if (worker) {
    const logs = await getLogsByWorkerId(worker.id)
    const workerWithLogs = { ...worker, logs: paginateResults(logs, 50, req.query?.logsPage) }
    res.status(200).json(workerWithLogs)
  } else {
    res.status(404).json({ message: 'Worker not found' })
  }
}
