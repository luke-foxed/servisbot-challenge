const { getWorkersByBotName } = require('../../utils/workerUtils')
const { loadBots } = require('../../utils/botUtils')
const paginateResults = require('../../utils/pagination')

exports.getAllBots = async (req, res) => {
  const bots = await loadBots()
  res.status(200).json(paginateResults(bots, 50, req.query?.page))
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
