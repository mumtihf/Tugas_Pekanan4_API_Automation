const request = require('supertest')
const config = require('../../data/base.url.data.json')

async function deleteUnit (unitId, token) {
    const response = await request(config.baseUrl)
        .delete(`/units/${unitId}`)
        .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { deleteUnit }