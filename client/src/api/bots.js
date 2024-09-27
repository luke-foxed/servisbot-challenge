import apiClient from '../utils/apiClient'

export async function getBots(page) {
  const res = await apiClient.get(`/bots?page=${page}`)
  return res
}

export async function getBotById(id, workerPage) {
  const res = await apiClient.get(`/bots/${id}?workerPage=${workerPage}`)
  return res
}
