const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function createUnit (payLoad, token) {
    const response = await request(config.baseUrl)
        .post("/units")
        .send(payLoad)
        .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createUnit }