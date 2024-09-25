import apiClient from '../utils/apiClient'

export async function getBots() {
  const res = await apiClient.get('/bots')
  return res
}