const request = require('supertest')
const config = require('../../data/base.url.data.json')
const userData = require('../../data/user.data.json')

async function getLoginToken () {
    const response = await request(config.baseUrl)
        .post("/authentications")
        .send(userData)
    const token = await response.body.data.accessToken
    return token
}

module.exports = { getLoginToken }