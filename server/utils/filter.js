const { cloneDeep } = require('lodash')

// fields that only need partial matches when filtering
const LOOSE_FIELDS = ['name']
// fields who's values will be strictly compared when filtering
const FIXED_FIELDS = ['id', 'bot', 'worker', 'status']

const filterByVal = (results, key, val) => results.filter((result) => result?.[key] === val)

const filterLikeVal = (results, key, val) => results.filter((result) => result?.[key]?.toLowerCase().includes(val.toLowerCase()))

const filterResults = (results, queries) => {
  let filteredResults = cloneDeep(results)

  Object.entries(queries).forEach(([key, val]) => {
    if (LOOSE_FIELDS.includes(key)) filteredResults = filterLikeVal(filteredResults, key, val)
    if (FIXED_FIELDS.includes(key)) filteredResults = filterByVal(filteredResults, key, val)
  })
  return filteredResults
}

module.exports = filterResults
