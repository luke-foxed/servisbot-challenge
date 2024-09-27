import apiClient from '../utils/apiClient'

export async function getBots(queryString) {
  const res = await apiClient.get(`/bots${queryString}`)
  return res
}

export async function getBotById(id, workerPage) {
  const res = await apiClient.get(`/bots/${id}?workerPage=${workerPage}`)
  return res
}
