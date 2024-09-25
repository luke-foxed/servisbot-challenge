const { loadWorkers } = require("./utils")

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