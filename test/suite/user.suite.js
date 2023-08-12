const { expect } = require('chai')
const unitData = require('../../data/unit.data.json')
const userData = require('../../data/user.data.json')
const userInvalidData = require('../../data/user.invalid.data.json')
const registerData = require('../../data/register.data.json')
const registerInvalidData = require('../../data/register.invalid.data.json')
const updateUnitData = require('../../data/update.unit.json')
const { getUnitDetail } = require('../spec/get.unit.detail.spec')
const { getUnitId } = require('../spec/get.unit.id.spec')
const { getLoginToken } = require('../spec/get.login.token.spec')
const { createUnit } = require('../spec/create.unit.spec')
const { registerUser } = require('../spec/register.spec')
const { loginUser } = require('../spec/login.spec')
const { updateUnit } = require('../spec/update.unit.spec')
const { getUnitList } = require('../spec/get.unit.list.spec')
const { deleteUnit } = require('../spec/delete.unit.spec')
const invalidUnit = require('../../data/invalid.unit.data.json')

describe('Registration Feature', () => {
    it('Success Register', async () => {
        const response = await registerUser(registerData)

        //Assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.message).to.equal("Toko berhasil didaftarkan")
    })
    it('Failed Register', async () => {
        const response = await registerUser(registerInvalidData)

        //Assertion
        expect((await response).status).to.equal(400)
        expect((await response).body.message).to.equal('"password" is not allowed to be empty')
    })
})

describe('Login Feature', () => {
    it('Success Login', async () => {
        const response = await loginUser(userData)

        //Assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.data.user.email).to.equal("sanber47@gmail.com")
    })
    it('Failed Login', async () => {
        const response = await loginUser(userInvalidData)

        //Assertion
        expect((await response).status).to.equal(401)
    })
})

describe('Create Unit', () => {
    it('Success Create New Unit', async () => {
        //Get Token
        const token = await getLoginToken()

        //Create Unit
        const response = await createUnit(unitData, token)

        //Assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.data.name).to.equal(unitData.name)
    })
    it('Failed Create New Unit', async () => {
        //Get Token
        const token = await getLoginToken()

        //Create Invalid Unit
        const response = await createUnit(invalidUnit, token)

        //Assertion
        expect((await response).status).to.equal(400)
        expect((await response).body.message).to.equal("name is required, description is optional")
    })
})

describe('Get Unit Detail', () => {
    it('Success Get Unit Detail', async () => {
        //Get Token
        const token = await getLoginToken()

        //Get Unit ID
        const unitId = await getUnitId(unitData, token)

        //Get Unit Detail
        const response = await getUnitDetail(unitId, token)

        //Assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.data.unit.description).to.equal("weight measurement")
    })
    it('Failed Get Unit Detail', async () => {
        //Get Token
        const token = await getLoginToken()

        //Get Invalid Unit Detail
        const response = await getUnitDetail(token)

        //Assertion
        expect((await response).status).to.equal(401)
        expect((await response).body.message).to.equal("Invalid token structure")
    })
})

describe('Update Unit', () => {
    it('Success Update Unit', async () => {
        //Get Token
        const token = await getLoginToken()

        //Get Unit ID
        const unitId = await getUnitId(unitData, token)

        //Update Unit 
        const response = await updateUnit(unitId, token)

        //Assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.data.name).to.equal(updateUnitData.name)
    })
    it('Failed Update Unit', async () => {
        //Get Token
        const token = await getLoginToken()

        //Update Unit 
        const response = await updateUnit(token)

        //Assertion
        expect((await response).status).to.equal(401)
        expect((await response).body.attributes.error).to.equal("Invalid token structure")
    })
})

describe('Get Unit List', () => {
    it('Get Unit List Status is equal to 200', async () => {
        //Get Token
        const token = await getLoginToken()

        //Get Unit List
        const response = await getUnitList(token)

        //Assertion
        expect((await response).status).to.equal(200)
    })
    it('Get Unit List Status is equal to 401', async () => {
        //Get Token
        const token = 1

        //Get Unit List
        const response = await getUnitList(token)

        //Assertion
        expect((await response).status).to.equal(401)
    })
})

describe('Delete Unit', () => {
    it('Succes Delete Unit', async () => {
        //Get Token
        const token = await getLoginToken()

        //Get Unit ID
        const unitId = await getUnitId(unitData, token)

        //Delete Unit 
        const response = await deleteUnit(unitId, token)

        //Assertion
        expect((await response).status).to.equal(200)
    })
    it('Succes Delete Unit', async () => {
        //Get Token
        const token = await getLoginToken()

        //Get Unit ID
        const unitId = 1

        //Delete Unit 
        const response = await deleteUnit(unitId, token)

        //Assertion
        expect((await response).status).to.equal(404)
        expect((await response).body.message).to.equal("id tidak valid")
    })
})