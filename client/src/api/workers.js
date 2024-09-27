import apiClient from '../utils/apiClient'

export async function getWorkers() {
  const res = await apiClient.get('/workers')
  return res
}

export async function getWorkerById(id, logsPage) {
  const res = await apiClient.get(`/workers/${id}?logsPage=${logsPage}`)
  return res
}
