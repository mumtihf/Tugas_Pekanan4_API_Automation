const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function getUnitDetail (unitId, token) {
    const response = await request(config.baseUrl)
        .get(`/units/${unitId}`)
        .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { getUnitDetail }