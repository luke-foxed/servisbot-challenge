import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// not sure if I like using this, need to revisit
apiClient.interceptors.response.use(
  (response) => response.data, // so I don't have to use 'data.data' after fetching with react query
  (error) => {
    // If the response has data (like an error message), pass it along
    if (error.response) {
      const errorData = error.response.data || 'An error occurred'
      return Promise.reject(new Error(errorData))
    }

    // If no response, handle it as a network or other error
    return Promise.reject(
      new Error(error.message || 'An unexpected error occurred'),
    )
  },
)

export default apiClient
