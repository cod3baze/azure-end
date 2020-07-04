const axios = require('axios')

const api = axios.create({
  baseURL: 'https://www.api.github.com'
})

module.exports = api
