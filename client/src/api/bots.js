import apiClient from '../utils/apiClient'

export async function getBots() {
  const res = await apiClient.get('/bots')
  return res
}

export async function getBotById(id) {
  const res = await apiClient.get(`/bots/${id}`)
  return res
}
