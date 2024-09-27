const { getLogsByWorkerId } = require('../../utils/log')
const { loadWorkers } = require('../../utils/worker')
const paginateResults = require('../../utils/pagination')
const filterResults = require('../../utils/filter')

exports.getAllWorkers = async (req, res) => {
  const workers = await loadWorkers()
  const filteredWorkers = filterResults(workers, req.query)
  const paginatedWorkers = paginateResults(filteredWorkers, 50, req.query?.page)
  res.status(200).json(paginatedWorkers)
}

exports.getWorkerById = async (req, res) => {
  const workers = await loadWorkers()
  const worker = workers.find((w) => w.id === req.params.id)
  if (worker) {
    const logs = await getLogsByWorkerId(worker.id)
    const workerWithLogs = { ...worker, logs: paginateResults(logs, 50, req.query?.logsPage)}
    res.status(200).json(workerWithLogs)
  } else {
    res.status(404).json({ message: 'Worker not found' })
  }
}
