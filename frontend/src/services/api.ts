import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config.url === '/auth/token') {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default api
