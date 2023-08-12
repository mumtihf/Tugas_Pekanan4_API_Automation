const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function getUnitList (token) {
    const response = await request(config.baseUrl)
        .get(`/units`)
        .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { getUnitList }