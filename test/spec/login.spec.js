const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function loginUser (payLoad) {
    const response = await request(config.baseUrl)
        .post("/authentications")
        .send(payLoad)
    return response
}

module.exports = { loginUser }