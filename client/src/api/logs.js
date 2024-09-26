import apiClient from '../utils/apiClient'

export async function getLogs() {
  const res = await apiClient.get('/logs')
  return res
}

export async function getLogById(id) {
  const res = await apiClient.get(`/logs/${id}`)
  return res
}
