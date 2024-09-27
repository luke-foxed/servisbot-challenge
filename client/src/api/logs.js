import apiClient from '../utils/apiClient'

export async function getLogs(page) {
  const res = await apiClient.get(`/logs?page=${page}`)
  return res
}

export async function getLogById(id) {
  const res = await apiClient.get(`/logs/${id}`)
  return res
}
