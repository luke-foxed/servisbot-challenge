import { apiGet } from '../utils/apiClient'

export const getLogs = async(queryString) => {
  const res = await apiGet(`/logs${queryString}`)
  return res
}

export const getLogById = async(id) => {
  const res = await apiGet(`/logs/${id}`)
  return res
}
