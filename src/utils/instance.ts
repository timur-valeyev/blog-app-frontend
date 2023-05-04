import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:8800',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
    },
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})