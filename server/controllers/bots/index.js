const { getWorkersByBotName, getLogsByBotId } = require('../../utils/worker')
const { loadBots } = require('../../utils/bot')
const paginateResults = require('../../utils/pagination')
const filterResults = require('../../utils/filter')

exports.getAllBots = async (req, res) => {
  try {
    const bots = await loadBots()
    const filteredBots = filterResults(bots, req.query)
    const paginatedBots = paginateResults(filteredBots, 50, req.query?.page)
    res.status(200).json(paginatedBots)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

exports.getBotById = async (req, res) => {
  try {
    const bots = await loadBots()
    const bot = bots.find((b) => b.id === req.params.id)
    if (bot) {
      const linkedItems = req.query?.view === 'logs'
        ? await getLogsByBotId(bot.id)
        : await getWorkersByBotName(bot.name)
      const filteredItems = filterResults(linkedItems, req.query)
      const paginatedItems = paginateResults(filteredItems, 50, req.query?.page)
      const botWithLinkedItems = {
        ...bot,
        [req.query?.view ?? 'workers']: paginatedItems,
      }
      res.status(200).json(botWithLinkedItems)
    } else {
      res.status(404).json({ message: 'Bot not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
