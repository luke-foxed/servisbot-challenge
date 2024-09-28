import apiClient from '../utils/apiClient'

export async function getStats() {
  const res = await apiClient.get('/stats')
  return res
}
