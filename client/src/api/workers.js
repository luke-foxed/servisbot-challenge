import apiClient from '../utils/apiClient'

export async function getWorkers() {
  const res = await apiClient.get('/workers')
  return res
}

export async function getWorkerById(id) {
  const res = await apiClient.get(`/workers/${id}`)
  return res
}
