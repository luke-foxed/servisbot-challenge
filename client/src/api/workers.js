import apiClient from '../utils/apiClient'

export async function getWorkers() {
  const res = await apiClient.get('/workers')
  return res
}
