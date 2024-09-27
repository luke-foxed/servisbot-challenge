const { getWorkersByBotName } = require('../../utils/worker')
const { loadBots } = require('../../utils/bot')
const paginateResults = require('../../utils/pagination')
const filterResults = require('../../utils/filter')

exports.getAllBots = async (req, res) => {
  const bots = await loadBots()
  const filteredBots = filterResults(bots, req.query)
  const paginatedBots = paginateResults(filteredBots, 50, req.query?.page)
  res.status(200).json(paginatedBots)
}

exports.getBotById = async (req, res) => {
  const bots = await loadBots()
  const bot = bots.find((b) => b.id === req.params.id)
  if (bot) {
    const workers = await getWorkersByBotName(bot.name)
    const botWithWorkers = { ...bot, workers: paginateResults(workers, 50, req.query?.workerPage) }
    res.status(200).json(botWithWorkers)
  } else {
    res.status(404).json({ message: 'Bot not found' })
  }
}
