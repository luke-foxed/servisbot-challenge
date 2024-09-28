import apiClient from '../utils/apiClient'

export async function getLogs(queryString) {
  const res = await apiClient.get(`/logs${queryString}`)
  return res
}

export async function getLogById(id) {
  const res = await apiClient.get(`/logs/${id}`)
  return res
}
