const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function getUnitId (payLoad, token) {
    const response = await request(config.baseUrl)
        .post(`/units`)
        .send(payLoad)
        .set("Authorization", `Bearer ${token}`)
    const unitId = await response.body.data.unitId
    return unitId
}

module.exports = { getUnitId }