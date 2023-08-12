const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function registerUser (payLoad) {
    const response = await request(config.baseUrl)
        .post("/registration")
        .send(payLoad)
    return response
}

module.exports = { registerUser }