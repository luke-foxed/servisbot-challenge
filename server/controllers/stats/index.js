const { loadWorkers } = require('../../utils/worker')
const { loadBots } = require('../../utils/bot')
const { loadLogs } = require('../../utils/log')

exports.getPlatformStats = async (req, res) => {
  try {
    const bots = await loadBots()
    const workers = await loadWorkers()
    const logs = await loadLogs()
    res
      .status(200)
      .json({ bots: bots.length, workers: workers.length, logs: logs.length })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
