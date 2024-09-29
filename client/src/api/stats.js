import { apiGet } from '../utils/apiClient'

export const getStats = async () => {
  const res = await apiGet('/stats')
  return res
}
