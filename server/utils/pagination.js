const paginateResults = (results, limit = 50, page = 1) => {
  const offset = (page - 1) * limit
  const paginatedResults = results.slice(offset, offset + limit)
  const totalResults = results.length

  return { currentPage: page, totalResults, results: paginatedResults }
}

module.exports = paginateResults
