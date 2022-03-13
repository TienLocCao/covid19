import axios from 'axios'

const baseURL = process.env.baseApiUrl

const MainApi = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default MainApi
