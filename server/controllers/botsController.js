const fs = require('fs/promises')
const path = require('path')

const botsPath = path.join(process.cwd(), 'mock_data', 'bots.json')
let botsCache = null

// PRIVATE
const loadBots = async () => {
  if (botsCache) return botsCache
  const rawBotsContent = await fs.readFile(botsPath, 'utf-8')
  botsCache = JSON.parse(rawBotsContent)
  return botsCache
}

exports.getAllBots = async (req, res) => {
  const bots = await loadBots()
  res.status(200).json(bots)
}

exports.getBotById = async (req, res) => {
  const bots = await loadBots()
  const bot = botsCache.find((bot) => bot.id === parseInt(req.params.id, 10))
  if (bot) {
    res.status(200).json(bot)
  } else {
    res.status(404).json({ message: 'Bot not found' })
  }
}
