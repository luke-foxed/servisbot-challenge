import { apiGet } from '../utils/apiClient'

export const getWorkers = async (queryString) => {
  const res = await apiGet(`/workers${queryString}`)
  return res
}

export const getWorkerById = async (id, logsQueryString) => {
  const res = await apiGet(`/workers/${id}${logsQueryString}`)
  return res
}
