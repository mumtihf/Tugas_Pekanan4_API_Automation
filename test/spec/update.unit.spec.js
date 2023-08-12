const request = require('supertest')
const config = require('../../data/base.url.data.json')
const updateUnitData = require('../../data/update.unit.json')

async function updateUnit (unitId, token) {
    const response = await request(config.baseUrl)
        .put(`/units/${unitId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateUnitData)
    return response
}

module.exports = { updateUnit }