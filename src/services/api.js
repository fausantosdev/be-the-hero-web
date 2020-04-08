import axios from 'axios'

const api = axios.create({
    baseURL: 'https://be-the-hero-api-1.herokuapp.com'
})

export default api