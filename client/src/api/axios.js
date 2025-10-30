import axios from 'axios'

const api = axios.create({
    baseURL:"https://pretaiassignment.onrender.com/api",
    withCredentials: true,
})

export default api;