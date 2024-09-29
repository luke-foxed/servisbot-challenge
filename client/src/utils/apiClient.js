import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiGet = async(endpoint) => {
  try {
    const response = await apiClient.get(endpoint)
    return response.data
  } catch (error) {
    throw new Error(error?.message ?? 'Unknown error')
  }
}
