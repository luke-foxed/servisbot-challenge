const fs = require('fs/promises')
const path = require('path')

const botsPath = path.join(process.cwd(), 'mock_data', 'bots.json')
let botsCache = null

const loadBots = async () => {
  if (botsCache) return botsCache
  const rawbotsContent = await fs.readFile(botsPath, 'utf-8')
  botsCache = JSON.parse(rawbotsContent)
  return botsCache
}

module.exports = { loadBots }
