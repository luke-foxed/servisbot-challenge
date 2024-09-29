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
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'An error occurred with the request.';
      throw new Error(message);
    }
    throw new Error(error.message || 'Unknown error occurred.');
  }
}
