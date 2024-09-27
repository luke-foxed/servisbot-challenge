import apiClient from '../utils/apiClient'

export async function getWorkers(queryString) {
  const res = await apiClient.get(`/workers${queryString}`)
  return res
}

export async function getWorkerById(id, logsPage) {
  const res = await apiClient.get(`/workers/${id}?logsPage=${logsPage}`)
  return res
}
