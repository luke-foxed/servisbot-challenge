const { getWorkersByBotName } = require("../workers/utils")
const { loadBots } = require("./utils")

exports.getAllBots = async (req, res) => {
  const bots = await loadBots()
  res.status(200).json(bots)
}

exports.getBotById = async (req, res) => {
  const bots = await loadBots()
  const bot = bots.find((b) => b.id === req.params.id)
  if (bot) {
    const workers = await getWorkersByBotName(bot.name)
    const botWithWorkers = { ...bot, workers }
    res.status(200).json(botWithWorkers)
  } else {
    res.status(404).json({ message: 'Bot not found' })
  }
}
