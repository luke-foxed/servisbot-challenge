import apiClient from '../utils/apiClient'

export async function getWorkers(queryString) {
  const res = await apiClient.get(`/workers${queryString}`)
  return res
}

export async function getWorkerById(id, logsQueryString) {
  const res = await apiClient.get(`/workers/${id}${logsQueryString}`)
  return res
}
