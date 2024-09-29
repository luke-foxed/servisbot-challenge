import { apiGet } from '../utils/apiClient'

export const getBots = async(queryString) => {
  const res = await apiGet(`/bots${queryString}`)
  return res
}

export const getBotById = async(id, workersQueryString) => {
  const res = await apiGet(`/bots/${id}${workersQueryString}`)
  return res
}
